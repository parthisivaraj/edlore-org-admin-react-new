import * as type from './types';

// Get all Manuals Action ===============================
export function getAllManuals(data) {
  return {
    type: type.GET_ALL_MANUALS_REQUESTED,
    payload: data,
  }
}

// Add a Manual Action (where sketch_type = 1)
export function addManual(data) {
  return {
    type: type.ADD_MANUAL_REQUESTED,
    payload: data,
  }
}

// Get a Manual Detail Action (where sketch_type = 1)
export function manualDetails(data) {
  return {
    type: type.MANUAL_DETAILS_REQUESTED,
    payload: data,
  }
}

// Update a Manual Detail Action (where sketch_type = 1)
export function updateManual(data) {
  return {
    type: type.UPDATE_MANUAL_REQUESTED,
    payload: data,
  }
}

// Delete a Manual Action (where skectch_type = 1)
export function deleteManual(data) {
  return {
    type: type.DELETE_MANUAL_REQUESTED,
    payload: data,
  }
}




// Get all Drawings Action ===============================
export function getAllDrawings(data) {
  return {
    type: type.GET_ALL_DRAWINGS_REQUESTED,
    payload: data,
  }
}

// Add a Drawing Action  (where sketch_type = 2)
export function addDrawing(data) {
  return {
    type: type.ADD_DRAWING_REQUESTED,
    payload: data,
  }
}

// Get a Drawing Details Action  (where sketch_type = 2)
export function drawingDetails(data) {
  return {
    type: type.DRAWING_DETAILS_REQUESTED,
    payload: data,
  }
}

// Update a Drawing Details Action  (where sketch_type = 2)
export function updateDrawing(data) {
  return {
    type: type.UPDATE_DRAWING_REQUESTED,
    payload: data,
  }
}

// Delete a Drawing (where sketch_type = 2)
export function deleteDrawing(data) {
  return {
    type: type.DELETE_DRAWING_REQUESTED,
    payload: data,
  }
}




// Get all Animations Action ====================================
export function getAllAnimations(data) {
  return {
    type: type.GET_ALL_ANIMATIONS_REQUESTED,
    payload: data,
  }
}

// Add an Animation (sketch_type = 3)
export function addAnimation(data) {
  return {
    type: type.ADD_ANIMATION_REQUESTED,
    payload: data,
  }
}

// Get an Animation Details (sketch_type = 3)
export function animationDetails(data) {
  return {
    type: type.ANIMATION_DETAILS_REQUESTED,
    payload: data,
  }
}

// Update an Animation Details (sketch_type = 3)
export function updateAnimation(data) {
  return {
    type: type.UPDATE_ANIMATION_REQUESTED,
    payload: data,
  }
}

// Delete an Animation (sketch_type =3)
export function deleteAnimation(data) {
  return {
    type: type.DELETE_ANIMATION_REQUESTED,
    payload: data,
  }
}

// ==================== ERROR MESSAGES

// RESET MANUALS ERRORS MESSAGES
export function resetManualsErrors(data) {
  return {
    type: type.RESET_MANUALS_ERRORS_REQUESTED,
    payload: data,
  }
}

// RESET DRAWINGS ERRORS MESSAGES
export function resetDrawingsErrors(data) {
  return {
    type: type.RESET_DRAWINGS_ERRORS_REQUESTED,
    payload: data,
  }
}

// RESET ANIMATIONS ERRORS MESSAGES
export function resetAnimationsErrors(data) {
  return {
    type: type.RESET_ANIMATIONS_ERRORS_REQUESTED,
    payload: data,
  }
}


// ========================== SKETCHES MODAL

// MANUALS MODAL
export function setManualsModal(data) {
  return {
    type: type.SET_MANUALS_MODAL,
    payload: data,
  }
}

// DRAWINGS MODAL
export function setDrawingsModal(data) {
  return {
    type: type.SET_DRAWINGS_MODAL,
    payload: data,
  }
}

// ANIMATIONS MODAL
export function setAnimationsModal(data) {
  return {
    type: type.SET_ANIMATIONS_MODAL,
    payload: data,
  }
}

// ANIMATIONS MODAL
export function setUpdateGroupModal(data) {
  return {
    type: type.SET_UPDATE_GROUP_MODAL,
    payload: data,
  }
}


// CHANGE SEARCH
export function changeSketchesSearch(data) {
  return {
    type: type.CHANGE_SKETCHES_SEARCH_REQUESTED,
    payload: data,
  }
}