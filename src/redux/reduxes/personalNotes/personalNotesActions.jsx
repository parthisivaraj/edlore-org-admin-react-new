import * as type from './types';

// GET ALL NOTES ACTION
export function getAllPersonalNotes(data) {
  return {
    type: type.GET_ALL_PERSONAL_NOTES_REQUESTED,
    payload: data,
  }
}

// CREATE A NOTE ACTION
export function createPersonalNote(data) {
  return {
    type: type.CREATE_PERSONAL_NOTE_REQUESTED,
    payload: data,
  }
}

// GET NOTE DETAILS ACTION
export function getPersonalNoteDetails(data) {
  return {
    type: type.GET_PERSONAL_NOTE_DETAILS_REQUESTED,
    payload: data,
  }
}

// UPDATE A NOTE ACTION
export function updatePersonalNote(data) {
  return {
    type: type.UPDATE_PERSONAL_NOTE_REQUESTED,
    payload: data,
  }
}

// DELETE A NOTE ACTION
export function deletePersonalNote(data) {
  return {
    type: type.DELETE_PERSONAL_NOTE_REQUESTED,
    payload: data,
  }
}

// RESET THE FORM ON CLOSE MODAL
export function setPersonalNotesModal(data) {
  return {
    type: type.SET_PERSONAL_NOTES_MODAL_REQUESTED,
    payload: data,
  }
}

// RESET THE NOTES ERROR MESSAGES
export function resetPersonalNotesErrors(data) {
  return {
    type: type.RESET_PERSONAL_NOTES_ERROR_REQUESTED,
    payload: data,
  }
}

// Change Search
export function changePersonalNotesSearch(data) {
  return {
    type: type.CHANGE_PERSONAL_NOTES_SEARCH_REQUESTED,
    payload: data,
  }
}