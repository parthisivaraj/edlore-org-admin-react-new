import * as type from './types';

const initialState = {
  // Profile Details
  profileDetails: {},
  profileDetailsLoading: false,
  profileDetailsError: null,

  // Update Profile
  updateProfileLoading: false,
  updateProfileError: [],
  showManagePasswordModal: false,

  // Update Availability status
  updateAvailabilityLoading: false,
  updateAvailabilityError: [],

}

export default function profile(state = initialState, action) {
  switch (action.type) {

    // Get Profile Details
    case type.GET_PROFILE_DETAILS_REQUESTED:
      return {
        ...state,
        profileDetailsLoading: true,
      }
    case type.GET_PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        profileDetailsLoading: false,
        profileDetails: action.data,
      }
    case type.GET_PROFILE_DETAILS_FAILED:
      return {
        ...state,
        profileDetailsLoading: false,
        profileDetailsError: action.message,
      }

    // Update the Profile
    case type.UPDATE_PROFILE_REQUESTED:
      return {
        ...state,
        updateProfileLoading: true,
      }
    case type.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileLoading: false,
        showManagePasswordModal: false,
      }
    case type.UPDATE_PROFILE_FAILED:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileError: action.message,
      }

    // Update availability status
    case type.AVAILABILITY_STATUS_UPDATE_REQUESTED:
      return {
        ...state,
        updateAvailabilityLoading: true,
      }
    case type.AVAILABILITY_STATUS_UPDATE_SUCCESS:
      return {
        ...state,
        updateAvailabilityLoading: false,
      }
    case type.AVAILABILITY_STATUS_UPDATE_FAILED:
      return {
        ...state,
        updateAvailabilityLoading: false,
        updateAvailabilityError: action.message,
      }

    // Reset the Form on Close
    case type.SET_PASSWORD_MODAL_REQUESTED:
      return {
        ...state,
        showManagePasswordModal: action.payload,
      }
    // Reset  error message
    case type.RESET_PROFILE_UPDATE_ERROR:
      return {
        ...state,
        updateProfileError: [],
      }

    default:
      return state
  }
}