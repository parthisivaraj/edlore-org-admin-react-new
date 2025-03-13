import * as type from './types';

// GET ALL PRIMARY CATEGORIES
export function getPrimaryCategories(data) {
  return {
    type: type.GET_PRIMARY_CATEGORIES_REQUESTED,
    payload: data,
  }
}

// GET ALL SECONDARY CATEGORIES
export function getSecondaryCategories(data) {
  return {
    type: type.GET_SECONDARY_CATEGORIES_REQUESTED,
    payload: data,
  }
}
// GET ALL SECONDARY CATEGORIES
export function getSecondaryCategoriesInDropDown(data) {
  return {
    type: type.GET_SECONDARY_CATEGORIES_IN_DROPDOWN_REQUESTED,
    payload: data,
  }
}

// GET ALL CATEGORIES LIST
export function getAllCategories(data) {
  return {
    type: type.ALL_CATEGORIES_REQUESTED,
    payload: data,
  }
}

// CREATE A CATEGORY
export function createCategories(data) {
  return {
    type: type.CREATE_CATEGORIES_REQUESTED,
    payload: data,
  }
}

// EDIT A CATEGORY
export function editCategories(data) {

  return {
    type: type.EDIT_CATEGORIES_REQUESTED,
    payload: data,
  }
}

// EDIT SECONDARY CATEGORIES
export function editSecondaryCategories(data) {
  return {
    type: type.EDIT_SECONDARY_CATEGORIES_REQUESTED,
    payload: data,
  }
}

// DELETE A CATEGORY
export function deleteCategories(data) {
  return {
    type: type.DELETE_CATEGORIES_REQUESTED,
    payload: data,
  }
}

// EDIT MODEL PRIMARY CATEGORIES
export function setShowCategoryModal(data) {
  return {
    type: type.EDIT_MODAL_CATEGORIES_REQUESTED,
    payload: data,
  }
}

// ASSIGN TO MODEL WHILE DELETING
export function moveModelAndDeleteModal(data) {
  return {
    type: type.CHANGE_MODEL_AND_DELETE,
    payload: data,
  }
}

// EDIT MODEL SECONDARY CATEGORY
export function setShowSecondaryCategoryModal(data) {
  return {
    type: type.EDIT_MODAL_SECONDARY_CATEGORIES_REQUESTED,
    payload: data,
  }
}

// RESET FORM ON CLOSE
export function resetErrors(data) {
  return {
    type: type.RESET_ERROR_REQUESTED,
    payload: data,
  }
}

// GET EVERY CATEGORY (PRIMARY & SECONDARY)
export function getEveryCategory(data) {
  return {
    type: type.GET_EVERY_CATEGORY_REQUESTED,
    payload: data,
  }
}

// CHANGE SEARCH
export function changeCategoriesSearch(data) {
  return {
    type: type.CHANGE_CATEGORIES_SEARCH_REQUESTED,
    payload: data,
  }
}