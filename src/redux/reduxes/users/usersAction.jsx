import * as type from './types';

// Get All Users Action
export function getUsers(users) {
    return {
        type: type.GET_ALL_USERS_REQUESTED,
        payload: users,
    }
}

// Get All Users with current Action
export function getUsersWithCurrent(users) {
    return {
        type: type.GET_ALL_USERS_WITH_CURRENT_REQUESTED,
        payload: users,
    }
}

// Active Users
export function getActiveUsers(data) {

    return {
        type: type.ACTIVE_USERS_REQUESTED,
        payload: data,
    }
}

// InActive Users
export function getInActiveUsers(data) {

    return {
        type: type.INACTIVE_USERS_REQUESTED,
        payload: data,
    }
}
// Create a User Action
export function addUsers(users) {
    return {
        type: type.ADD_USER_REQUESTED,
        payload: users,
    }
}

// Edit a User Action
export function editUser(data) {
    return {
        type: type.EDIT_USER_REQUESTED,
        payload: data,
    }
}

//  Get a User Details
export function userDetails(data) {
    return {
        type: type.USER_DETAILS_REQUESTED,
        payload: data,
    }
}

// Manage password Action
export function managePassword(data) {
    return {
        type: type.MANAGE_PASSWORD_REQUESTED,
        payload: data,
    }
}

// update role
export function updateRole(data) {
    return {
        type: type.EDIT_USER_ROLE_REQUESTED,
        payload: data,
    }
}

// Reset the Form on Close
export function setManagePasswordModal(data) {
    return {
        type: type.SET_PASSWORD_MODAL_REQUESTED,
        payload: data,
    }
}

// Reset errors
export function resetUserErrors(data) {
    return {
        type: type.USER_RESET_ERRORS,
        payload: data,
    }
}

// Get All Users by Role
export function getAllUsersByRole(data) {
    return {
        type: type.GET_ALL_USERS_BY_ROLE_REQUESTED,
        payload: data,
    }
}

// Update the User Availability Status
export function updateUserAvailabilityStatus(data) {
    return {
        type: type.USER_AVAILABILITY_STATUS_UPDATE_REQUESTED,
        payload: data,
    }
}

// Change Search for All Users
export function changeUsersSearch(data) {
    return {
        type: type.CHANGE_USERS_SEARCH_REQUESTED,
        payload: data,
    }
}

export function deleteUserModal(data) {
    return {
        type: type.DELETE_USER_REQUESTED,
        payload: data,
    }
}


