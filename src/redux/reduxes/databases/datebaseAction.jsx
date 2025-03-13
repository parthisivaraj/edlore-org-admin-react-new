import * as type from "./types";

// GET ALL DATABASES
export function getAllDatabases(data) {
  return {
    type: type.GET_ALL_DATABASES_REQUESTED,
    payload: data,
  };
}

// RUN AI Query
export function runAIQuery(data) {
  return {
    type: type.AI_QUERY_REQUESTED,
    payload: data,
  };
}

// CREATE A DATABASE
export function addDatabase(data) {
  return {
    type: type.ADD_DATABASE_REQUESTED,
    payload: data,
  };
}

// GET A DATABASE DETAILS
export function setDatabaseDetails(data) {
  return {
    type: type.DATABASE_SET_DETAILS,
    payload: data,
  };
}

// UPDATE A DATABASE
export function updateDatabase(data) {
  return {
    type: type.UPDATE_DATABASE_REQUESTED,
    payload: data,
  };
}

// UPDATE A DATABASE DOCUMENT
export function deleteDatabaseDocument(data) {
  return {
    type: type.DELETE_DATABASE_DOCUMENT_REQUESTED,
    payload: data,
  };
}

// DELETE A DATABASE
export function deleteDatabase(data) {
  return {
    type: type.DELETE_DATABASE_REQUESTED,
    payload: data,
  };
}

// RESET THE FORM ON CLOSE
export function setDatabaseModal(data) {
  return {
    type: type.SET_DATABASE_MODAL_REQUESTED,
    payload: data,
  };
}

// RESET THE DUPLICATE ERROR MESSAGE
export function resetErrors(data) {
  return {
    type: type.RESET_DATABASES_ERRORS_REQUESTED,
    payload: data,
  };
}

// CHANGE SEARCH
export function changeDatabasesSearch(data) {
  return {
    type: type.CHANGE_DATABASES_SEARCH_REQUESTED,
    payload: data,
  };
}
