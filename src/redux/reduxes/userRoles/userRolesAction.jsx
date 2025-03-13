import * as type from './types';

// GET ALL USER ROLES
export function getUserRoles(data) {
    return {
        type: type.GET_ALL_USERS_ROLES_REQUESTED,
        payload: data,
    }
}

// GET USER ROLES PERMISSION
export function getUserRolesPermission(data) {
    return {
        type: type.GET_ALL_PERMISSIONS_REQUESTED,
        payload: data,
    }
}

// ADD AN USER ROLE
export function addUserRoles(data) {
    return {
        type: type.ADD_USER_ROLES_REQUESTED,
        payload: data,
    }
}

// GET A USER ROLE DETAILS
export function getUserRoleDetails(data) {
    return {
        type: type.GET_USER_ROLE_DETAILS_REQUESTED,
        payload: data,
    }
}

// UPDATE AN USER ROLE
export function updateUserRoles(data) {
    return {
        type: type.UPDATE_USER_ROLES_REQUESTED,
        payload: data,
    }
}

// USER ROLE ERROR MESSAGES
export function resetUserRoleErrors(data) {
    return {
        type: type.RESET_USER_ROLE_ERRORS_REQUESTED,
        payload: data,
    }
}

// CHANGE SEARCH IN USER ROLES
export function changeUserRolesSearch(data) {
    return {
        type: type.CHANGE_USER_ROLES_SEARCH_REQUESTED,
        payload: data,
    }
}

// CHANGE SEARCH FOR USER ROLES IN USERS
export function changeUserRolesSearchInUser(data) {
    return {
        type: type.CHANGE_USER_ROLE_SEARCH_IN_USERS_REQUESTED,
        payload: data,
    }
}