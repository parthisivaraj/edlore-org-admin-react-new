import * as type from './types';

const initialState = {
    // Active Users
    activeUsers: [],
    activeUsersLoading: false,
    activeUsersError: null,
    activeUsersPagination: {},

    // In Active Users
    inActiveUsers: [],
    inActiveUsersLoading: false,
    inActiveUsersError: null,
    inActiveUsersPagination: {},

    // Get All Users
    usersList: [],
    loading: false,
    error: null,
    pagination: {},
    filters: {},

    // Get All Users including current
    usersWithCurrentList: [],
    usersWithCurrentloading: false,
    usersWithCurrenterror: null,
    usersWithCurrentpagination: {},
    usersWithCurrentfilters: {},

    // Add a User
    addUserLoading: false,
    addUserError: [],
    showManagePasswordModal: false,

    // Update A User
    editUserLoading: false,
    editUserError: [],

    // User Details
    userDetails: {},
    userDetailsLoading: false,
    userDetailsError: null,

    // Manage/Update Password
    managePasswordLoading: false,
    managePasswordError: null,

    // Update User Role
    updateRoleLoading: false,
    updateRoleError: [],

    // Get All Users by Role
    allUsersByRoleList: [],
    allUsersByRoleLoading: false,
    allUsersByRoleError: null,

    // Update User Availability Status
    userAvailabilityStatusLoading: false,
    userAvailabilityStatusError: [],

    // Change Search
    searchUsersQuery: "",
}

export default function users(state = initialState, action) {
    switch (action.type) {
        // Active Users
        case type.ACTIVE_USERS_REQUESTED:
            return {
                ...state,
                activeUsersLoading: true,
            }
        case type.ACTIVE_USERS_SUCCESS:
            return {
                ...state,
                activeUsersLoading: false,
                activeUsers: action.activeUsers.users,
                activeUsersPagination: action.activeUsers.pagination,
                filters: action.activeUsers.filters,
            }
        case type.ACTIVE_USERS_FAILED:
            return {
                ...state,
                activeUsersLoading: false,
                activeUsersError: action.message,
            }


        // Inactive Users
        case type.INACTIVE_USERS_REQUESTED:
            return {
                ...state,
                inActiveUsersLoading: true,
            }
        case type.INACTIVE_USERS_SUCCESS:
            return {
                ...state,
                inActiveUsersLoading: false,
                inActiveUsers: action.inActiveUsers.users,
                inActiveUsersPagination: action.inActiveUsers.pagination,
                filters: action.inActiveUsers.filters,
            }
        case type.INACTIVE_USERS_FAILED:
            return {
                ...state,
                inActiveUsersLoading: false,
                inActiveUsersError: action.message,
            }


        // Get All Users
        case type.GET_ALL_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                usersList: action.users,
                users_pagination: action.users.pagination,
                filters: action.users.filters,
            }
        case type.GET_ALL_USERS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }

        // Get All Users with current
        case type.GET_ALL_USERS_WITH_CURRENT_REQUESTED:
            return {
                ...state,
                usersWithCurrentloading: true,
            }
        case type.GET_ALL_USERS_WITH_CURRENT_SUCCESS:
            return {
                ...state,
                usersWithCurrentloading: false,
                usersWithCurrentList: action.users.users,
                usersWithCurrentpagination: action.users.pagination,
                usersWithCurrentfilters: action.users.filters,
            }
        case type.GET_ALL_USERS_WITH_CURRENT_FAILED:
            return {
                ...state,
                usersWithCurrentloading: false,
                usersWithCurrenterror: action.message,
            }

        // Add a User
        case type.ADD_USER_REQUESTED:
            return {
                ...state,
                addUserLoading: true,
            }
        case type.ADD_USER_SUCCESS:
            return {
                ...state,
                addUserLoading: false,
                usersList: action.users,
                showManagePasswordModal: false,
            }
        case type.ADD_USER_FAILED:
            return {
                ...state,
                addUserLoading: false,
                addUserError: action.message,
            }

        // Edit a User
        case type.EDIT_USER_REQUESTED:
            return {
                ...state,
                editUserLoading: true,
            }
        case type.EDIT_USER_SUCCESS:
            return {
                ...state,
                editUserLoading: false,
                usersList: action.users,
                showManagePasswordModal: false,
            }
        case type.EDIT_USER_FAILED:
            return {
                ...state,
                editUserLoading: false,
                editUserError: action.message,
            }

        // Get a User Details
        case type.USER_DETAILS_REQUESTED:
            return {
                ...state,
                userDetailsLoading: true,
            }
        case type.USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetailsLoading: false,
                userDetails: action.userDetails,
                searchUsersQuery: "",
            }
        case type.USER_DETAILS_FAILED:
            return {
                ...state,
                userDetailsLoading: false,
                userDetailsError: action.message,
            }

        // Manage password
        case type.MANAGE_PASSWORD_REQUESTED:
            return {
                ...state,
                managePasswordLoading: true,
            }
        case type.MANAGE_PASSWORD_SUCCESS:
            return {
                ...state,
                managePasswordLoading: false,
            }
        case type.MANAGE_PASSWORD_FAILED:
            return {
                ...state,
                managePasswordLoading: false,
                managePasswordError: action.message,
            }

        // role update
        case type.EDIT_USER_ROLE_REQUESTED:
            return {
                ...state,
                updateRoleLoading: true,
            }
        case type.EDIT_USER_ROLE_SUCCESS:
            return {
                ...state,
                updateRoleLoading: false,
            }
        case type.EDIT_USER_ROLE_FAILED:
            return {
                ...state,
                updateRoleLoading: false,
                updateRoleError: action.message,
            }

        // Reset the Form On Close
        case type.SET_PASSWORD_MODAL_REQUESTED:
            return {
                ...state,
                showManagePasswordModal: action.payload,
            }

        // Reset Error Message
        case type.USER_RESET_ERRORS:
            return {
                ...state,
                addUserError: [],
                editUserError: [],
                updateRoleError: [],
            }

        // Get All Users By Role
        case type.GET_ALL_USERS_BY_ROLE_REQUESTED:
            return {
                ...state,
                allUsersByRoleLoading: true,
            }
        case type.GET_ALL_USERS_BY_ROLE_SUCCESS:
            return {
                ...state,
                allUsersByRoleLoading: false,
                allUsersByRoleList: action.allUsersByRoleList.users,
            }
        case type.GET_ALL_USERS_BY_ROLE_FAILED:
            return {
                ...state,
                allUsersByRoleLoading: false,
                allUsersByRoleError: action.message,
            }

        // User Availability Status
        case type.USER_AVAILABILITY_STATUS_UPDATE_REQUESTED:
            return {
                ...state,
                userAvailabilityStatusLoading: true,
            }
        case type.USER_AVAILABILITY_STATUS_UPDATE_SUCCESS:
            return {
                ...state,
                userAvailabilityStatusLoading: false,
            }
        case type.USER_AVAILABILITY_STATUS_UPDATE_FAILED:
            return {
                ...state,
                userAvailabilityStatusLoading: false,
                userAvailabilityStatusError: action.message,
            }

        // Change Search
        case type.CHANGE_USERS_SEARCH_REQUESTED:
            return {
                ...state,
                searchUsersQuery: action.payload,
            }

        default:
            return state
    }
}