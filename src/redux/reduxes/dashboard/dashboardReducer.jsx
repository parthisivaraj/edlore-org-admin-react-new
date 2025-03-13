import * as type from './types';

const initialState = {
  dashboardDetails:{},
  dashboardDetailsLoading: false,
  dashboardDetailsError: null,
}

export default function dashboard(state = initialState, action) {
  switch (action.type) {
    case type.GET_DASHBOARD_DETAILS_REQUESTED:
      return {
        ...state,
        dashboardLoading: true,
      }
    case type.GET_DASHBOARD_DETAILS_SUCCESS:
      return {
        ...state,
        dashboardDetailsLoading: false,
        dashboardDetails: action.dashboardDetails
      }
    case type.GET_DASHBOARD_DETAILS_FAILED:
      return {
        ...state,
        dashboardDetailsLoading: false,
        dashboardDetailsError: action.message,
      }

    default:
      return state
  }
}