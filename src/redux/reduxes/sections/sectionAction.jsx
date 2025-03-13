import * as type from './types';

// GET ALL SECTIONS
export function getAllSections(data) {
  return {
    type: type.GET_ALL_SECTIONS_REQUESTED,
    payload: data,
  }
}


// CREATE A SECTION
export function addSection(data) {
  return {
    type: type.ADD_SECTION_REQUESTED,
    payload: data,
  }
}

// GET A SECTION DETAILS
export function sectionDetails(data) {
  return {
    type: type.SECTION_DETAILS_REQUESTED,
    payload: data,
  }
}


// UPDATE A SECTION
export function updateSection(data) {
  return {
    type: type.UPDATE_SECTION_REQUESTED,
    payload: data,
  }
}


// DELETE A SECTION
export function deleteSection(data) {
  return {
    type: type.DELETE_SECTION_REQUESTED,
    payload: data,
  }
}

// GET ALL SECTION
export function getAllSectionsNoPaginate(data) {
  return {
    type: type.NO_PAGINATE_SECTIONS_REQUESTED,
    payload: data,
  }
}

// RESET THE FORM ON CLOSE
export function setSectionModal(data) {
  return {
    type: type.SET_SECTION_MODAL_REQUESTED,
    payload: data,
  }
}

// RESET THE DUPLICATE ERROR MESSAGE
export function resetErrors(data) {
  return {
    type: type.RESET_SECTIONS_ERRORS_REQUESTED,
    payload: data,
  }
}

// CHANGE SEARCH
export function changeSectionsSearch(data) {
  return {
    type: type.CHANGE_SECTIONS_SEARCH_REQUESTED,
    payload: data,
  }
}