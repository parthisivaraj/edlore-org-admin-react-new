import * as type from './types';

// // DEVICE TAB ACTION
// export function storeDeviceTab(data) {
//   return {
//     type: type.STORE_DEVICE_TAB_REQUESTED,
//     payload: data,
//   }
// }

// // WORKORDER TAB ACTION
// export function storeWorkorderTab(data) {
//   return {
//     type: type.STORE_WORKORDER_TAB_REQUESTED,
//     payload: data,
//   }
// }

// // ASSIGN TAB ACTION
// export function storeAssignTab(data) {
//   return {
//     type: type.STORE_ASSIGN_TAB_REQUESTED,
//     payload: data,
//   }
// }

// GET ALL ACTIVE WORKORDERS ACTION
export function getAllActiveWorkorders(data) {
  return {
    type: type.GET_ALL_ACTIVE_WORKORDERS_REQUESTED,
    payload: data,
  }
}

// GET ALL DRAFT WORKORDERS ACTION
export function getAllDraftWorkorders(data) {
  return {
    type: type.GET_ALL_DRAFT_WORKORDERS_REQUESTED,
    payload: data,
  }
}

// GET ALL COMPLETED WORKORDERS ACTION
export function getAllCompletedWorkorders(data) {
  return {
    type: type.GET_ALL_COMPLETED_WORKORDERS_REQUESTED,
    payload: data,
  }
}

// ADD WORKORDER ACTION
// export function addWorkorder(data) {
//   return {
//     type: type.ADD_WORKORDER_REQUESTED,
//     payload: data,
//   }
// }

// GET WORKORDER DETAILS ACTION
export function workorderDetails(data) {
  return {
    type: type.WORKORDER_DETAILS_REQUESTED,
    payload: data,
  }
}

// CANCEL WORKORDER REPEAT
export function cancelWorkorderRepeat(data) {
  return {
    type: type.CANCEL_WORKORDER_REPEAT_REQUESTED,
    payload: data,
  }
}

// UPDATE WORKORDER ACTION
export function updateWorkorder(data) {
  return {
    type: type.UPDATE_WORKORDER_REQUESTED,
    payload: data,
  }
}

// DELETE WORKORDER ACTION
export function deleteWorkorder(data) {
  return {
    type: type.DELETE_WORKORDER_REQUESTED,
    payload: data
  }
}


// GET ALL MODELS USING CATEGORY ACTION
export function getAllCategoryModels(data) {
  return {
    type: type.GET_ALL_CATEGORY_MODELS_REQUESTED,
    payload: data,
  }
}

// CREATE WO FIRST STEP
export function createWorkorderTabOne(data) {
  return {
    type: type.ADD_DEVICE_TAB_REQUESTED,
    payload: data,
  }
}

// CREATE WO SECOND STEP
export function createWorkorderTabTwo(data) {
  return {
    type: type.ADD_TSAK_TAB_REQUESTED,
    payload: data,
  }
}

// CREATE WO THIRD STEP
export function createWorkorderTabThree(data) {
  return {
    type: type.ADD_ASSIGN_TAB_REQUESTED,
    payload: data,
  }
}
// CREATE STEP CHANGE
export function changeStepInCreation(data) {
  return {
    type: type.CHANGE_STEP_IN_CREATION,
    payload: data,
  }
}
// WORKORDER DETAILS
export function getWorkorderDetails(data) {
  return {
    type: type.GET_WORKORDER_DETAILS_REQUESTED,
    payload: data,
  }
}
// UPDATE_DEVICE_TAB
export function updateDeviceTab(data) {
  return {
    type: type.UPDATE_DEVICE_TAB_REQUESTED,
    payload: data,
  }
}

// UPLOAD WO
export function uploadWorkOrder(data) {
  return {
    type: type.UPLOAD_WO_REQUESTED,
    payload: data,
  }
}


// GET ALL ACTIVE WORKORDER USERS
export function getAllActiveWorkorderUsers(data) {
  return {
    type: type.GET_ALL_ACTIVE_WORKORDER_USERS_REQUESTED,
    payload: data,
  }
}


// CHANGE ACTIVE USERS STATUS
export function changeActiveWorkorderUserStatus(data) {
  return {
    type: type.CHANGE_ACTIVE_WORKORDER_USER_STATUS_REQUESTED,
    payload: data,
  }
}

// UPDATE WORKORDER STEP 2
export function updateWorkOrderStep2(data) {
  return {
    type: type.UPDATE_WORKORDER_TAB_TWO_REQUESTED,
    payload: data,
  }
}

// UPDATE WORKORDER STEP 3
export function updateWorkOrderStep3(data) {
  return {
    type: type.UPDATE_WORKORDER_TAB_THREE_REQUESTED,
    payload: data,
  }
}

// UPDATE WORKORDER STEP 3
export function setUploadWorkorderModal(data) {
  return {
    type: type.SET_WORKODR_UPLOAD_MODAL,
    payload: data,
  }
}

// UPDATE WORKORDER STEP 3
export function resetUploadWoError(data) {
  return {
    type: type.RESET_WO_ERRORS,
    payload: data,
  }
}

// RESET WO DETAILS
export function resetWoDetails(data) {
  return {
    type: type.RESET_WO_DETAILS,
    payload: data,
  }
}
// GET ALL SUBMITTED WO PDF
export function getAllsubmittedWoPdf(data) {
  return {
    type: type.GET_ALL_SUBMITTED_WO_PDF_REQUESTED,
    payload: data,
  }
}

// Get Workorders for a Device
export function getAllDeviceWorkorders(data) {
  return {
    type: type.GET_ALL_DEVICE_WORKORDERS_REQUESTED,
    payload: data,
  }
}

// Get Workorder History Log
export function getDeviceWorkorderHistoryLog(data) {
  return {
    type: type.GET_WO_HISTORY_LOG_REQUESTED,
    payload: data,
  }
}

// publish the draft
export function publishTheDraft(data) {
  return {
    type: type.PUBLISH_THE_DRAFT_PROJECT_REQUESTED,
    payload: data,
  }
}

// publish the draft
export function setConfirmEditPopup(data) {
  return {
    type: type.SET_CONFIRM_EDIT_POPUP,
    payload: data,
  }
}

// Change Search
export function changeWorkordersSearch(data) {
  return {
    type: type.CHANGE_WORKORDERS_SEARCH_REQUESTED,
    payload: data,
  }
}

// Change Search in Active WO Users
export function changeActiveWOUsersSearch(data) {
  return {
    type: type.CHANGE_ACTIVE_WO_USERS_SEARCH_REQUESTED,
    payload: data,
  }
}