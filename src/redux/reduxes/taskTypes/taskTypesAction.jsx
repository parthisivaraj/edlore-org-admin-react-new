import * as type from './types';


// GET ALL TASK TYPES ACTION
export function getAllTaskTypes(data) {
  return {
    type: type.GET_ALL_TASK_TYPES_REQUESTED,
    payload: data,
  }
}


// CREATE/ADD A TASK TYPE ACTION
export function addTaskType(data) {
  return {
    type: type.ADD_TASK_TYPE_REQUESTED,
    payload: data,
  }
}


// GET A TASK TYPE DETAILS ACTION
export function taskTypeDetails(data) {
  return {
    type: type.TASK_TYPE_DETAILS_REQUESTED,
    payload: data,
  }
}


// UPDATE A TASK TYPE ACTION
export function updateTaskType(data) {
  return {
    type: type.UPDATE_TASK_TYPE_REQUESTED,
    payload: data,
  }
}


// DELETE A TASK TYPE ACTION
export function deleteTaskType(data) {
  return {
    type: type.DELETE_TASK_TYPE_REQUESTED,
    payload: data,
  }
}

// SET_ADD_TASK_TYPE_MODAL
export function setAddTypeModal(data) {
  return {
    type: type.SET_ADD_TASK_TYPE_MODAL,
    payload: data,
  }
}
// SET_ADD_TASK_ error message
export function setErrorMessage(data) {
  return {
    type: type.SET_ADD_TASK_ERROR_MESSAGE,
    payload: data,
  }
}


// CHANGE SEARCH
export function changeTaskTypesSearch(data) {
  return {
    type: type.CHANGE_TASK_TYPES_SEARCH_REQUESTED,
    payload: data,
  }
}