import * as type from './types';

// GET ALL ASSET NOTES
export function getAllAssetNotes(data) {
  return {
    type: type.GET_ALL_ASSET_NOTES_REQUESTED,
    payload: data,
  }
}

// ADD AN ASSET NOTE
export function addAssetNote(data) {
  return {
    type: type.ADD_ASSET_NOTE_REQUESTED,
    payload: data,
  }
}

// GET AN ASSET NOTE DETAILS
export function getAssetNoteDetails(data) {
  return {
    type: type.GET_ASSET_NOTE_DETAILS_REQUESTED,
    payload: data,
  }
}

// UPDATE AN ASSET NOTE
export function updateAssetNote(data) {
  return {
    type: type.UPDATE_ASSET_NOTE_REQUESTED,
    payload: data,
  }
}

// DELETE AN ASSET NOTE
export function deleteAssetNote(data) {
  return {
    type: type.DELETE_ASSET_NOTE_REQUESTED,
    payload: data,
  }
}

// RESET THE FORM ON CLOSE MODAL
export function setAssetNotesModal(data) {
  return {
    type: type.SET_ASSET_NOTES_MODAL_REQUESTED,
    payload: data,
  }
}

// RESET THE NOTES ERROR MESSAGES
export function resetAssetNotesErrors(data){
  return {
    type: type.RESET_ASSET_NOTES_ERRORS_REQUESTED,
    payload: data,
  }
}

// CHANGE SEARCH
export function changeAssetNotesSearch(data) {
  return {
    type: type.CHANGE_ASSET_NOTES_SEARCH_REQUESTED,
    payload: data,
  }
}