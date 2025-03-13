import * as type from './types';

const initialState = {
  // Create Version Control
  createVersionControlLoading: false,
  createVersionControlError: null,

  // Get Version Control Details
  versionControlDetails: {},
  versionControlDetailsLoading: false,
  versionControlDetailsError: null,

  // Update Version Control
  updateVersionControlLoading: false,
  updateVersionControlError: null,
}

export default function versionControl(state=initialState, action) {
  switch (action.type) {
    // Create Version Control
    case type.CREATE_VERSION_CONTROL_REQUESTED:
      return {
        ...state,
        createVersionControlLoading: true,
      }
    case type.CREATE_VERSION_CONTROL_SUCCESS:
      return {
        ...state,
        createVersionControlLoading: false,
      }
    case type.CREATE_VERSION_CONTROL_FAILED:
      return {
        ...state,
        createVersionControlLoading: false,
        createVersionControlError: action.message,
      }

    // Get Version Control Details
    case type.GET_VERSION_CONTROL_DETAILS_REQUESTED:
      return {
        ...state,
        versionControlDetailsLoading:true,
      }
    case type.GET_VERSION_CONTROL_DETAILS_SUCCESS:
      return {
        ...state,
        versionControlDetailsLoading: false,
        versionControlDetails: action.versionControlDetails.tablet_version,
      }
    case type.GET_VERSION_CONTROL_DETAILS_FAILED:
      return {
        ...state,
        versionControlDetailsLoading: false,
        versionControlDetailsError: action.message,
      }

    // Update Version Control
    case type.UPDATE_VERSION_CONTROL_REQUESTED:
      return {
        ...state,
        updateVersionControlLoading: true,
      }
    case type.UPDATE_VERSION_CONTROL_SUCCESS:
      return {
        ...state,
        updateVersionControlLoading: false,
      }
    case type.UPDATE_VERSION_CONTROL_FAILED:
      return {
        ...state,
        updateVersionControlLoading: false,
        updateVersionControlError: action.message,
      }

    default:
      return state;
  }
}