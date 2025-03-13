import * as type from "./types";

// ADD AN ERROR CODE ACTION
export function addErrorCode(data) {
  return {
    type: type.ADD_ERROR_CODE_REQUESTED,
    payload: data,
  };
}

// GET ERROR & ALARM CODE DETAILS ACTION
export function errorCodeDetails(data) {
  return {
    type: type.ERROR_CODE_DETAILS_REQUESTED,
    payload: data,
  };
}

// EDIT/UPDATE AN ERROR CODE ACTION
export function updateErrorCode(data) {
  return {
    type: type.UPDATE_ERROR_CODE_REQUESTED,
    payload: data,
  };
}

// DELETE AN ERROR CODE ACTION
export function deleteErrorCode(data) {
  return {
    type: type.DELETE_ERROR_CODE_REQUESTED,
    payload: data,
  };
}

// ERROR CODES =============================
// GET ALL ERROR CODES ACTION (error_type = 1)
export function getAllErrorCodes(data) {
  return {
    type: type.GET_ALL_ERROR_CODES_REQUESTED,
    payload: data,
  };
}

// GET ALL ERROR CODES ACTION (error_type = 2)
export function getAllmCodes(data) {
  return {
    type: type.GET_ALL_MCODES_REQUESTED,
    payload: data,
  };
}

// GET ALL ALARM CODES ACTION (error_type = 3)
export function getAllAlarmCodes(data) {
  return {
    type: type.GET_ALL_ALARM_CODES_REQUESTED,
    payload: data,
  };
}

// GET ALL PROCEDURES ACTION FOR ERROR CODES ==================
export function getAllProcedureLinkedErrorCode(data) {
  return {
    type: type.GET_ALL_PROCEDURE_LINKED_TO_ERROR_REQUESTED,
    payload: data,
  };
}

// GET ALL PROCEDURES ACTION FOR ERROR CODES ==================
export function getAllTroubleshootLinkedErrorCode(data) {
  return {
    type: type.GET_ALL_TROUBLESHOOT_LINKED_TO_ERROR_REQUESTED,
    payload: data,
  };
}

// RESET ERROR MESSAGES
export function resetErrorCodeErrors(data) {
  return {
    type: type.RESET_ERROR_CODE_ERRORS_REQUESTED,
    payload: data,
  };
}

// SET ERROR CODE MODAL
export function setErrorCodeModal(data) {
  return {
    type: type.SET_ERROR_CODE_MODAL,
    payload: data,
  };
}
// // SET ERROR CODE TYPE
// export function setErrorCodeType(data) {
//   return {
//     type: type.SET_ERROR_CODE_MODAL,
//     payload: data,
//   }
// }

// CHANGE SEARCH
export function changeErrorCodesSearch(data) {
  return {
    type: type.CHANGE_ERROR_CODES_SEARCH_REQUESTED,
    payload: data,
  };
}
export function changeMCodesSearch(data) {
  return {
    type: type.CHANGE_M_CODES_SEARCH_REQUESTED,
    payload: data,
  };
}
export function changeAlarmCodesSearch(data) {
  return {
    type: type.CHANGE_ALARM_CODES_SEARCH_REQUESTED,
    payload: data,
  };
}
