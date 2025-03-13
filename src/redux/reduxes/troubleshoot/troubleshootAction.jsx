import * as type from './types';

// GET ALL TROUBLESHOOT ACTION
export function getAllTroubleshoot(data) {
  return {
    type: type.GET_ALL_TROUBLESHOOT_REQUESTED,
    payload: data,
  }
}

// ADD A TROUBLESHOOT ACTION
export function addTroubleshoot(data) {
  return {
    type: type.ADD_TROUBLESHOOT_REQUESTED,
    payload: data,
  }
}

// GET TROUBLESHOOT DETAILS
export function troubleshootDetails(data) {
  return {
    type: type.TROUBLESHOOT_DETAILS_REQUESTED,
    payload: data,
  }
}

//  UPDATE TROUBLESHOOT
export function updateTroubleshoot(data) {
  return {
    type: type.UPDATE_TROUBLESHOOT_REQUESTED,
    payload: data,
  }
}

// DELETE TROUBLESHOOT
export function deleteTroubleshoot(data) {
  return {
    type: type.DELETE_TROUBLESHOOT_REQUESTED,
    payload: data,
  }
}



// TROUBLESHOOT STEPS ======================================

// ADD A TROUBLESHOOT STEP
export function addTroubleshootStep(data) {
  return {
    type: type.ADD_TROUBLESHOOT_STEP_REQUESTED,
    payload: data,
  }
}

// UPDATE A TROUBLESHOOT STEP
export function updateTroubleshootStep(data) {
  return {
    type: type.UPDATE_TROUBLESHOOT_STEP_REQUESTED,
    payload: data,
  }
}

// DELTE A TROUBLESHOOT STEP
export function deleteTroubleshootStep(data) {
  return {
    type: type.DELETE_TROUBLESHOOT_STEP_REQUESTED,
    payload: data,
  }
}

// UPDATE TROUBLESHOOT STEP ORDER
export function updateTroubleshootStepOrder(data) {
  return {
    type: type.UPDATE_TROUBLESHOOT_STEP_ORDER_REQUESTED,
    payload: data,
  }
}

// SET TO DEFAULT STEP
export function setToDefaultTroubleshootStep(data) {
  return {
    type: type.SET_TO_DEFAULT_TROUBLESHOOT_STEP_REQUESTED,
    payload: data,
  }
}

// APPROVE STEP
export function approveTroubleshootStep(data) {
  return {
    type: type.APPROVE_TROUBLESHOOT_STEP_REQUESTED,
    payload: data,
  }
}

// TROUBLESHOOT MODAL
export function setTroubleshootModal(data) {
  return {
    type: type.SET_TOUBLESHOOT_MODAL,
    payload: data,
  }
}

// TROUBLESHOOT DETAIL MODAL
export function troubleshootDetailModal(data) {
  return {
    type: type.SET_TROUBLESHOOT_DETAIL_MODAL,
    payload: data,
  }
}

// RESET TROUBLESHOOT ERRORS
export function resetTroubleshootErrors(data) {
  return {
    type: type.RESET_TROUBLESHOOT_ERRORS_REQUESTED,
    payload: data,
  }
}

// CHANGE SEARCH
export function changeTroubleshootSearch(data) {
  return {
    type: type.CHANGE_TROUBLESHOOT_SEARCH_REQUESTED,
    payload: data,
  }
}