import * as type from './types';

const initialState = {
  // Show Model Secondary Categories
  showEditCategoriesModal: false,
  showEditSecondartCategoriesModal: false,
  pCateId: "",

  // Get all Categories
  allCategories: [],
  allCategoriesLoading: false,
  allCategoriesError: null,

  // Get all Primary Categories
  primaryCategories: [],
  primaryCategoriesPagination: {},
  primaryCategoriesLoading: false,
  primaryCategoriesError: [],

  // Get all Secondary Categories
  secondaryCategories: [],
  secondaryCategoriesLoading: false,
  secondaryCategoriesError: [],

  // Get all Secondary Categories In Dropdown
  secondaryCategoriesInDropDown: [],
  secondaryCategoriesInDropDownLoading: false,
  secondaryCategoriesInDropDownError: [],

  // Create a Category
  createCategoryLoading: false,
  createCategoryError: null,

  // Edit a Category
  editCategoriesLoading: false,
  editCategoriesError: [],

  // Edit Model Secondary Categories
  editSecondaryCategoriesLoading: false,
  editSecondaryCategoriesError: null,

  // Assign to a Model while deleting a category
  deleteCategoriesLoading: false,
  deleteCategoriesError: null,
  showAssignAndDelete: false,
  primary_category: true,
  deletingModelsCount: 0,
  deletingCategoryId: null,
  deletingPrimaryCategoryId: null,
  secondary_category_count: 0,
  categoryName: "",
  secondaryCategoriesList:[],


  // Get Every Category (Primary & Secondary)
  everyCategoryList: [],
  everyCategoryLoading: false,
  everyCategoryError: null,

  // Change SearchQuery
  searchCategoriesQuery: "",
}

export default function categories(state = initialState, action) {
  switch (action.type) {
    // Get all Primary Categories
    case type.GET_PRIMARY_CATEGORIES_REQUESTED:
      return {
        ...state,
        primaryCategoriesLoading: true
      }
    case type.GET_PRIMARY_CATEGORIES_SUCCESS:
      return {
        ...state,
        primaryCategoriesLoading: false,
        primaryCategories: action.primaryCategories.categories,
        primaryCategoriesPagination: action.primaryCategories.pagination,
      }
    case type.GET_PRIMARY_CATEGORIES_FAILED:
      return {
        ...state,
        primaryCategoriesLoading: false,
        primaryCategoriesError: action.message
      }

    // Get all Secondary Categories
    case type.GET_SECONDARY_CATEGORIES_REQUESTED:
      return {
        ...state,
        secondaryCategoriesLoading: true
      }
    case type.GET_SECONDARY_CATEGORIES_SUCCESS:
      return {
        ...state,
        secondaryCategoriesLoading: false,
        secondaryCategories: action.secondaryCategories.secondary_categories
      }
    case type.GET_SECONDARY_CATEGORIES_FAILED:
      return {
        ...state,
        secondaryCategoriesLoading: false,
        secondaryCategoriesError: action.message
      }

    // Get all Secondary Categories in dropdown
    case type.GET_SECONDARY_CATEGORIES_IN_DROPDOWN_REQUESTED:
      return {
        ...state,
        secondaryCategoriesInDropDownLoading: true
      }
    case type.GET_SECONDARY_CATEGORIES_IN_DROPDOWN_SUCCESS:
      return {
        ...state,
        secondaryCategoriesInDropDownLoading: false,
        secondaryCategoriesInDropDown: action.secondaryCategories.secondary_categories
      }
    case type.GET_SECONDARY_CATEGORIES_IN_DROPDOWN_FAILED:
      return {
        ...state,
        secondaryCategoriesInDropDownLoading: false,
        secondaryCategoriesInDropDownError: action.message
      }

    // Create a Category
    case type.CREATE_CATEGORIES_REQUESTED:
      return {
        ...state,
        createCategoryLoading: true
      }
    case type.CREATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        creatCategoryLoading: false,
        showEditCategoriesModal: false,
      }
    case type.CREATE_CATEGORIES_FAILED:
      return {
        ...state,
        createCategoryLoading: false,
        createCategoryError: action.message
      }

    // Get all Categories
    case type.ALL_CATEGORIES_REQUESTED:
      return {
        ...state,
        allCategoriesLoading: true
      }
    case type.ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        allCategoriesLoading: false,
        allCategories: action.categories.categories
      }
    case type.ALL_CATEGORIES_FAILED:
      return {
        ...state,
        allCategoriesLoading: false,
        allCategoriesError: action.message
      }

    // Edit a Category
    case type.EDIT_CATEGORIES_REQUESTED:
      return {
        ...state,
        editCategoriesLoading: true
      }
    case type.EDIT_CATEGORIES_SUCCESS:
      return {
        ...state,
        editCategoriesLoading: false,
        showEditCategoriesModal: false,
        editCategoriesError: [],
        searchCategoriesQuery: "",
      }
    case type.EDIT_CATEGORIES_FAILED:
      return {
        ...state,
        editCategoriesLoading: false,
        editCategoriesError: action.message
      }

    // Edit Secondary Category
    case type.EDIT_SECONDARY_CATEGORIES_REQUESTED:
      return {
        ...state,
        editSecondaryCategoriesLoading: true
      }
    case type.EDIT_SECONDARY_CATEGORIES_SUCCESS:
      return {
        ...state,
        editSecondaryCategoriesLoading: false,
        editingSecondaryCategories: false,
        showEditSecondartCategoriesModal: false,
      }
    case type.EDIT_SECONDARY_CATEGORIES_FAILED:
      return {
        ...state,
        editSecondaryCategoriesLoading: false,
        editSecondaryCategoriesError: action.message,
        editCategoriesError: action.message,
        editingSecondaryCategories: false,
      }


    // Delete a Category
    case type.DELETE_CATEGORIES_REQUESTED:
      return {
        ...state,
        deleteCategoriesLoading: true
      }
    case type.DELETE_CATEGORIES_SUCCESS:
      return {
        ...state,
        deleteCategoriesLoading: false,
        showAssignAndDelete: false,
        deletingModelsCount: 0,
        searchCategoriesQuery: "",
      }
    case type.DELETE_CATEGORIES_FAILED:
      return {
        ...state,
        deleteCategoriesLoading: false,
        deleteCategoriesError: action.message,
        showAssignAndDelete: true,
        primary_category: action.data.primary_category,
        deletingModelsCount: action.data.models_count,
        deletingCategoryId: action.data.deletingCategoryId,
        secondary_category_count: action.data.secondary_category_count,
        deletingPrimaryCategoryId: action.data.deletingPrimaryCategoryId,
        categoryName: action.data.category_name,
        secondaryCategoriesList:action.data.secondary_categories,
      }

    // Edit Primary Category popup
    case type.EDIT_MODAL_CATEGORIES_REQUESTED:
      return {
        ...state,
        showEditCategoriesModal: action.payload.show,
        pCateId: action.payload.pCateId,
        secondaryCategories: [],
      }

    //Edit Secondary Category popup
    case type.EDIT_MODAL_SECONDARY_CATEGORIES_REQUESTED:
      return {
        ...state,
        showEditSecondartCategoriesModal: action.payload,
      }

    // Reset error messages
    case type.RESET_ERROR_REQUESTED:
      return {
        ...state,
        editCategoriesError: []
      }

    // Set change model Category and delete moadl
    case type.CHANGE_MODEL_AND_DELETE:
      return {
        ...state,
        showAssignAndDelete: action.payload,
      }

    // ====== GET EVERY CATEGORY (PRIMARY & SECONDARY)
    case type.GET_EVERY_CATEGORY_REQUESTED:
      return {
        ...state,
        everyCategoryLoading: true,
      }
    case type.GET_EVERY_CATEGORY_SUCCESS:
      return {
        ...state,
        everyCategoryLoading: false,
        everyCategoryList: action.everyCategoryList.categories,
      }
    case type.GET_EVERY_CATEGORY_FAILED:
      return {
        ...state,
        everyCategoryLoading: false,
        everyCategoryError: action.message,
      }

    // Change Search
    case type.CHANGE_CATEGORIES_SEARCH_REQUESTED:
      return {
        ...state,
        searchCategoriesQuery: action.payload,
      }

    default:
      return state
  }
}