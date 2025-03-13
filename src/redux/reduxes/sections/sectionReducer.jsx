import * as type from './types';

const initialState = {
  // Get all Sections
  sectionsList: [],
  sectionsListNoPage: [],
  allSectionsLoading: false,
  allSectionsError: null,
  allSectionsPagination: {},

  // Create a Section
  addSectionLoading: false,
  addSectionError: [],
  showSectionModal: false,

  // Get a Individual Section
  sectionDetails: {},
  sectionDetailsLoading: false,
  sectionDetailsError: null,

  // Update a Section
  updateSectionLoading: false,
  updateSectionError: null,

  // Delete a Section
  deleteSectionLoading: false,
  deleteSectionError: null,

  // Search Query
  searchSectionsQuery: "",

}

export default function sections(state = initialState, action) {
  switch (action.type) {
    // GET ALL SECTIONS
    case type.GET_ALL_SECTIONS_REQUESTED:
      return {
        ...state,
        allSectionsLoading: true,
      }
    case type.GET_ALL_SECTIONS_SUCCESS:
      return {
        ...state,
        allSectionsLoading: false,
        sectionsList: action.sectionsList.sections,
        allSectionsPagination: action.sectionsList.pagination,
      }
    case type.GET_ALL_SECTIONS_FAILED:
      return {
        ...state,
        allSectionsLoading: false,
        allSectionsError: action.message,
      }

    // ADD A SECTION
    case type.ADD_SECTION_REQUESTED:
      return {
        ...state,
        addSectionLoading: true,
      }
    case type.ADD_SECTION_SUCCESS:
      return {
        ...state,
        addSectionLoading: false,
        sectionsList: action.sectionsList,
        showSectionModal: false,
      }
    case type.ADD_SECTION_FAILED:
      return {
        ...state,
        addSectionLoading: false,
        addSectionError: action.message,
      }

    // SECTION DETAILS
    case type.SECTION_DETAILS_REQUESTED:
      return {
        ...state,
        sectionDetailsLoading: true,
      }
    case type.SECTION_DETAILS_SUCCESS:
      return {
        ...state,
        sectionDetailsLoading: false,
        sectionDetails: action.sectionDetails.section,
      }
    case type.SECTION_DETAILS_FAILED:
      return {
        ...state,
        sectionDetailsLoading: false,
        sectionDetailsError: action.message,
      }

    // UPDATE A SECTION
    case type.UPDATE_SECTION_REQUESTED:
      return {
        ...state,
        updateSectionLoading: true,
      }
    case type.UPDATE_SECTION_SUCCESS:
      return {
        ...state,
        updateSectionLoading: false,
        showSectionModal: false,
        searchSectionsQuery: "",
      }
    case type.UPDATE_SECTION_FAILED:
      return {
        ...state,
        updateSectionLoading: false,
        updateSectionError: action.message,
      }

    // DELETE A SECTION
    case type.DELETE_SECTION_REQUESTED:
      return {
        ...state,
        deleteSectionLoading: true,
      }
    case type.DELETE_SECTION_SUCCESS:
      return {
        ...state,
        deleteSectionLoading: false,
        searchSectionsQuery: "",
      }
    case type.DELETE_SECTION_FAILED:
      return {
        ...state,
        deleteSectionLoading: false,
        deleteSectionError: action.message,
      }

    // NON PAGINATE SECTIONS
    case type.NO_PAGINATE_SECTIONS_REQUESTED:
      return {
        ...state,
        deleteSectionLoading: true,
      }
    case type.NO_PAGINATE_SECTIONS_SUCCESS:
      return {
        ...state,
        deleteSectionLoading: false,
        sectionsListNoPage: action.sectionsList.sections,
      }
    case type.NO_PAGINATE_SECTIONS_FAILED:
      return {
        ...state,
        deleteSectionLoading: false,
        deleteSectionError: action.message,
      }

    // RESET THE FORM ON CLOSE
    case type.SET_SECTION_MODAL_REQUESTED:
      return {
        ...state,
        showSectionModal: action.payload,
      }

    // RESET THE DUPLICATE ERRORS
    case type.RESET_SECTIONS_ERRORS_REQUESTED:
      return {
        ...state,
        addSectionError: [],
      }

    // CHANGE SEARCH
    case type.CHANGE_SECTIONS_SEARCH_REQUESTED:
      return {
        ...state,
        searchSectionsQuery: action.payload,
      }

    default:
      return state;
  }
}