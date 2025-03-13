import * as type from './types';

// CREATE VERSION CONTROL ACTION
export function createVersionControl(data) {
  return {
    type: type.CREATE_VERSION_CONTROL_REQUESTED,
    payload: data,
  }
}


// GET VERSION CONTROL DETAILS ACTION
export function getVersionControlDetails(data) {
  return {
    type: type.GET_VERSION_CONTROL_DETAILS_REQUESTED,
    payload: data,
  }
}


// UPDATE VERSION CONTROL ACTION
export function updateVersionControl(data) {
  return {
    type: type.UPDATE_VERSION_CONTROL_REQUESTED,
    payload: data,
  }
}