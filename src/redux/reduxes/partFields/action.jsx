import * as type from "./types";

export function getAllPartFields(data) {
  return {
    type: type.GET_ALL_PART_FIELDS_REQUESTED,
    payload: data,
  };
}

export function addPartFields(data) {
  return {
    type: type.ADD_PART_FIELDS_REQUESTED,
    payload: data,
  };
}

// GET A SLAVE MACHINE'S DETAILS
export function getPartFieldsDetails(data) {
  return {
    type: type.GET_PART_FIELDS_DETAILS_REQUESTED,
    payload: data,
  };
}

export function updatePartFields(data) {
  return {
    type: type.UPDATE_PART_FIELDS_REQUESTED,
    payload: data,
  };
}

export function deletePartFields(data) {
  return {
    type: type.DELETE_PART_FIELDS_REQUESTED,
    payload: data,
  };
}

// RESET THE FORM ON CLOSE MODAL
export function setPartFieldsModal(data) {
  return {
    type: type.SET_PART_FIELDS_MODAL_REQUESTED,
    payload: data,
  };
}

// RESET THE SLAVE MACHINE ERROR MESSAGES
export function resetPartFieldsErrors(data) {
  return {
    type: type.RESET_PART_FIELDS_ERRORS_REQUESTED,
    payload: data,
  };
}

// CHANGE SEARCH
export function changePartFieldsSearch(data) {
  return {
    type: type.CHANGE_PART_FIELDS_SEARCH_REQUESTED,
    payload: data,
  };
}
