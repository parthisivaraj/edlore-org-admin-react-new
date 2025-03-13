import * as type from "./types";

export function getAllRealiseNote(data) {
  return {
    type: type.GET_ALL_REALISE_NOTE,
    payload: data,
  };
}

export function addRealiseNote(data) {
  return {
    type: type.ADD_REALISE_NOTE_REQUESTED,
    payload: data,
  };
}

// GET AN ASSET NOTE DETAILS
export function getSlaveMachineDetails(data) {
  return {
    type: type.GET_SLAVE_MACHINE_DETAILS_REQUESTED,
    payload: data,
  };
}

export function updateRealiseNote(data) {
  return {
    type: type.UPDATE_REALISE_NOTE_REQUESTED,
    payload: data,
  };
}

export function deleteRealiseNote(data) {
  return {
    type: type.DELETE_REALISE_NOTE_REQUESTED,
    payload: data,
  };
}

// RESET THE FORM ON CLOSE MODAL
export function setRealiseNotesModal(data) {
  return {
    type: type.SET_REALISE_NOTE_MODAL_REQUESTED,
    payload: data,
  };
}

// RESET THE NOTES ERROR MESSAGES
export function resetRealiseNotesErrors(data) {
  return {
    type: type.RESET_REALISE_NOTE_ERRORS_REQUESTED,
    payload: data,
  };
}

// CHANGE SEARCH
export function changeRealiseNotesSearch(data) {
  return {
    type: type.CHANGE_REALISE_NOTE_SEARCH_REQUESTED,
    payload: data,
  };
}
