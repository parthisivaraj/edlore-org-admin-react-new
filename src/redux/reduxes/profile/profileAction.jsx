import * as type from './types';

// GET THE PROFILE DETAILS
export function getProfileDetails(data) {
  return {
    type: type.GET_PROFILE_DETAILS_REQUESTED,
    payload: data,
  }
}

// UPDATE THE DETAILS
export function updateProfile(data) {
  return {
    type: type.UPDATE_PROFILE_REQUESTED,
    payload: data,
  }
}

// AVAILABILITY_STATUS_UPDATE
export function updateAvailabilityStatus(data) {
  return {
    type: type.AVAILABILITY_STATUS_UPDATE_REQUESTED,
    payload: data,
  }
}

// RESET_PROFILE_UPDATE_ERROR
export function resetError(data) {
  return {
    type: type.RESET_PROFILE_UPDATE_ERROR,
    payload: data,
  }
}

// RESET THE FORM ON CLOSE
export function setManagePasswordModal(data) {
  return {
    type: type.SET_PASSWORD_MODAL_REQUESTED,
    payload: data,
  }
}