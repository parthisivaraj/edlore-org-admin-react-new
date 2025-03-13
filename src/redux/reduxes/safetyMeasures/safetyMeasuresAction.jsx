import * as type from './types';

// GET ALL SAFETY MEASURES ACTION
export function getAllSafetyMeasures(data) {
  return {
    type: type.GET_ALL_SAFETY_MEASURES_REQUESTED,
    payload: data,
  }
}

// GET ALL CLONE SAFETY MEASURES ACTION
export function getAllCloneSafetyMeasures(data) {
  return {
    type: type.GET_ALL_CLONE_SAFETY_MEASURES_REQUESTED,
    payload: data,
  }
}

// ADD SAFETY MEASURE ACTION
export function addSafetyMeasure(data) {
  return {
    type: type.ADD_SAFETY_MEASURE_REQUESTED,
    payload: data,
  }
}

// GET A SAFETY MEASURES DETAILS ACTION
export function safetyMeasuresDetails(data) {
  return {
    type: type.SAFETY_MEASURES_DETAILS_REQUESTED,
    payload: data,
  }
}

// UPDATE A SAFETY MEASURE ACTION
export function updateSafetyMeasure(data) {
  return {
    type: type.UPDATE_SAFETY_MEASURE_REQUESTED,
    payload: data,
  }
}

// DELETE A SAFETY MEASURE ACTION
export function deleteSafetyMeasure(data) {
  return {
    type: type.DELETE_SAFETY_MEASURE_REQUESTED,
    payload: data,
  }
}


// SAFETY MEASURES MODAL
export function setSafetyMeasuresModal(data) {
  return {
    type: type.SET_SAFETY_MEASURES_MODAL,
    payload: data,
  }
}

// RESET SAFETY MEASURES ERROR MESSAGES
export function resetSafetyMeasuresErrors(data) {
  return {
    type: type.RESET_SAFETY_MEASURES_ERRORS_REQUESTED,
    payload: data,
  }
}
// set cloning
export function setCloning(data) {
  return {
    type: type.SET_CLONING_REQUESTED,
    payload: data,
  }
}

// set updating
export function setUpdating(data) {
  return {
    type: type.SET_UPDATING_REQUESTED,
    payload: data,
  }
}

// Change Search
export function changeSafetyMeasuresSearch(data) {
  return {
    type: type.CHANGE_SAFETY_MEASURES_SEARCH_REQUESTED,
    payload: data,
  }
}