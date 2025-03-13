import * as type from './types';

// GET ALL MODELS
export function getAllModels(data) {
  return {
    type: type.GET_ALL_MODELS_REQUESTED,
    payload: data,
  }
}

// CREATE A MODEL
export function createModel(data) {
  return {
    type: type.CREATE_MODEL_REQUESTED,
    payload: data,
  }
}

// UPDATE A MODEL
export function updateModel(data) {
  return {
    type: type.UPDATE_MODEL_REQUESTED,
    payload: data,
  }
}

// MODEL DETAILS
export function modelDetails(data) {
  return {
    type: type.MODEL_DETAILS_REQUESTED,
    payload: data,
  }
}

// MODEL DEVICES
export function getModelDevices(data) {
  return {
    type: type.MODEL_DEVICES_REQUESTED,
    payload: data,
  }
}

// DELETE A MODEL
export function deleteModel(data) {
  return {
    type: type.DELETE_MODEL_REQUESTED,
    payload: data,
  }
}


// RESET ERROR MESSAGES
export function resetModelErrors(data) {
  return {
    type: type.RESET_MODEL_ERRORS_REQUESTED,
    payload: data,
  }
}

// SET MODEL MODAL
export function setModelModal(data) {
  return {
    type: type.SET_MODEL_MODAL,
    payload: data,
  }
}

// CHANGE SEARCH
export function changeModelsSearch(data) {
  return {
    type: type.CHANGE_MODELS_SEARCH_REQUESTED,
    payload: data,
  }
}