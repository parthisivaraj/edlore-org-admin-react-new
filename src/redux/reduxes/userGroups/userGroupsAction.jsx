import * as type from './types';

// GET ALL USER GROUPS ACTION
export function getAllUserGroups(data) {
  return {
    type: type.GET_ALL_USER_GROUPS_REQUESTED,
    payload: data,
  }
}


// ACTIVE USER GROUPS ACTION
export function getActiveUserGroups(data) {
  return {
    type: type.ACTIVE_USER_GROUPS_REQUESTED,
    payload: data,
  }
}


// INACTIVE USER GROUPS ACTION
export function getInActiveUserGroups(data) {
  return {
    type: type.INACTIVE_USER_GROUPS_REQUESTED,
    payload: data,
  }
}


// ADD AN USER GROUP ACTION
export function addUserGroup(data) {
  return {
    type: type.ADD_USER_GROUP_REQUESTED,
    payload: data,
  }
}


// GET AN USER GROUP DETAILS
export function userGroupDetails(data) {
  return {
    type: type.USER_GROUP_DETAILS_REQUESTED,
    payload: data,
  }
}

// GET THE SELECTED USERS IN GROUP
export function selectedUsersOfGroup(data) {
  return {
    type: type.GET_ALL_USERS_GROUP_REQUESTED,
    payload: data,
  }
}


// UPDATE AN USER GROUP ACTION
export function updateUserGroup(data) {
  return {
    type: type.UPDATE_USER_GROUP_REQUESTED,
    payload: data,
  }
}


// DELETE AN USER GROUP ACTION
export function deleteUserGroup(data) {
  return {
    type: type.DELETE_USER_GROUP_REQUESTED,
    payload: data,
  }
}


// RESET ERROR MESSAGES
export function resetUserGroupErrors(data) {
  return {
    type: type.RESET_USER_GROUP_REQUESTED,
    payload: data,
  }
}

// CHANGE SEARCH IN USER GROUPS
export function changeUserGroupsSearch(data) {
  return {
    type: type.CHANGE_USER_GROUPS_SEARCH_REQUESTED,
    payload: data,
  }
}