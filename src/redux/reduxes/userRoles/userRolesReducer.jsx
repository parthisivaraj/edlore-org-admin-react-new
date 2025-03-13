import * as type from './types';

const initialState = {
    // User Roles Listing
    user_roles: [],
    adminRoleId: null,
    loading: false,
    error: null,
    filters: {},
    sort_applied: false,

    // Permissions Listing
    permission: [],
    permissionLoading: false,
    permissionError: null,
    pagination: {},

    // Add User Role
    addedUserRole: {},
    addUserRoleLoading: false,
    addUserRoleError: [],

    // Get a User Role Details
    userRoleDetails: {},
    userRoleDetailsLoading: false,
    userRoleDetailsError: null,

    // Update User Role
    updateUserRoleLoading: false,
    updateUserRoleError: null,

    // Change Search in User Roles
    searchUserRolesQuery: "",

    // Change Search of User Roles in User
    searchUserRolesQueryInUser: "",
}

export default function user_roles(state = initialState, action) {
    switch (action.type) {
        // All User Roles Listing
        case type.GET_ALL_USERS_ROLES_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_ALL_USERS_ROLES_SUCCESS:
            return {
                ...state,
                loading: false,
                user_roles: action.userRoles.roles,
                user_roles_pagination: action.userRoles.pagination,
                filters: action.userRoles.filters,
                sort_applied: action.userRoles.sort_applied,
            }
        case type.GET_ALL_USERS_ROLES_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }

        // Permissions Listing
        case type.GET_ALL_PERMISSIONS_REQUESTED:
            return {
                ...state,
                permissionLoading: true,
            }
        case type.GET_ALL_PERMISSIONS_SUCCESS:
            return {
                ...state,
                permissionLoading: false,
                permission: action.permissions.permissions,
                adminRoleId: action.permissions.admin_id,
                pagination: action.permissions.pagination,
                searchUserRolesQuery:"",
            }
        case type.GET_ALL_PERMISSIONS_FAILED:
            return {
                ...state,
                permissionLoading: false,
                permissionError: action.message,
            }

        // Add User Role
        case type.ADD_USER_ROLES_REQUESTED:
            return {
                ...state,
                addUserRoleLoading: true,
            }
        case type.ADD_USER_ROLES_SUCCESS:
            return {
                ...state,
                addedUserRole: action.roles,
                addUserRoleLoading: false,
            }
        case type.ADD_USER_ROLES_FAILED:
            return {
                ...state,
                addUserRoleLoading: false,
                addUserRoleError: action.message,
            }

        // User Role Details
        case type.GET_USER_ROLE_DETAILS_REQUESTED:
            return {
                ...state,
                userRoleDetailsLoading: true,
            }
        case type.GET_USER_ROLE_DETAILS_SUCCESS:
            return {
                ...state,
                userRoleDetailsLoading: false,
                userRoleDetails: action.userRoleDetails,
                searchUserRolesQuery: "",
                searchUserRolesQueryInUser: "",
            }
        case type.GET_USER_ROLE_DETAILS_FAILED:
            return {
                ...state,
                userRoleDetailsLoading: false,
                userRoleDetailsError: action.message,
            }

        // Update User Role
        case type.UPDATE_USER_ROLES_REQUESTED:
            return {
                ...state,
                updateUserRoleLoading: true,
            }
        case type.UPDATE_USER_ROLES_SUCCESS:
            return {
                ...state,
                updateUserRoleLoading: false,
            }
        case type.UPDATE_USER_ROLES_FAILED:
            return {
                ...state,
                updateUserRoleLoading: false,
                updateUserRoleError: action.message,
                addUserRoleError: action.message,
            }

        // RESET USER ROLE ERROR MESSAGES
        case type.RESET_USER_ROLE_ERRORS_REQUESTED:
            return {
                ...state,
                addUserRoleError: [],
            }

        // Change Search in User Roles
        case type.CHANGE_USER_ROLES_SEARCH_REQUESTED:
            return {
                ...state,
                searchUserRolesQuery: action.payload,
            }

        // Change Search of User Roles in Users
        case type.CHANGE_USER_ROLE_SEARCH_IN_USERS_REQUESTED:
            return {
                ...state,
                searchUserRolesQueryInUser: action.payload,
            }

        default:
            return state
    }
}