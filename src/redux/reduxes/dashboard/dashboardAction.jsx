import * as type from './types';

// Get All Dashboard Data
export  function dashboardDetails(data) {
  return {
    type: type.GET_DASHBOARD_DETAILS_REQUESTED,
    payload: data,
  }
}