import * as type from './types';

const initialState = {

  // Get All User Groups
  userGroupsList: [],
  allUserGroupsLoading: false,
  allUserGroupsError: null,
  allUserGroupsPagination: {},
  filters: {},

  // Active User Groups
  activeUserGroupsList: [],
  activeUserGroupsLoading: false,
  activeUserGroupsError: null,
  activeUserGroupsPagination: {},

  // InActive User Groups
  inActiveUserGroupsList: [],
  inActiveUserGroupsLoading: false,
  inActiveUserGroupsError: null,
  inActiveUserGroupsPagination: {},

  // Add an User Group
  addUserGroupLoading: false,
  addUserGroupError: [],

  // Get an User Group Details
  userGroupDetails: {},
  userGroupDetailsLoading: false,
  userGroupDetailsError: null,

  // Update an User Group
  updateUserGroupLoading: false,
  updateUserGroupError: null,

  // Delete an User Group
  deleteUserGroupLoading: false,
  deleteUserGroupError: null,

  // selected users of User Group
  selectedUsersOfGroupLoading: false,
  selectedUsersOfGroupError: null,
  theUsers: [],
  groupUserFilter: {},
  groupUserPagination: {},

  // Search Query
  searchUserGroupsQuery: "",
}

export default function user_groups(state = initialState, action) {
  switch (action.type) {

    // GET ALL USER GROUPS
    case type.GET_ALL_USER_GROUPS_REQUESTED:
      return {
        ...state,
        allUserGroupsLoading: true,
      }
    case type.GET_ALL_USER_GROUPS_SUCCESS:
      return {
        ...state,
        allUserGroupsLoading: false,
        userGroupsList: action.userGroupsList.groups,
        allUserGroupsPagination: action.userGroupsList.pagination,
        filters: action.userGroupsList.filters,
      }
    case type.GET_ALL_USER_GROUPS_FAILED:
      return {
        ...state,
        allUserGroupsLoading: false,
        allUserGroupsError: action.message,
      }


    // GET ALL ACTIVE USER GROUPS
    case type.ACTIVE_USER_GROUPS_REQUESTED:
      return {
        ...state,
        activeUserGroupsLoading: true,
      }
    case type.ACTIVE_USER_GROUPS_SUCCESS:
      return {
        ...state,
        activeUserGroupsLoading: false,
        activeUserGroupsList: action.activeUserGroupsList.groups,
        activeUserGroupsPagination: action.activeUserGroupsList.pagination,
        filters: action.activeUserGroupsList.filters,
      }
    case type.ACTIVE_USER_GROUPS_FAILED:
      return {
        ...state,
        activeUserGroupsLoading: false,
        activeUserGroupsError: action.message,
      }


    // GET ALL INACTIVE USER GROUPS
    case type.INACTIVE_USER_GROUPS_REQUESTED:
      return {
        ...state,
        inActiveUserGroupsLoading: true,
      }
    case type.INACTIVE_USER_GROUPS_SUCCESS:
      return {
        ...state,
        inActiveUserGroupsLoading: false,
        inActiveUserGroupsList: action.inActiveUserGroupsList.groups,
        inActiveUserGroupsPagination: action.inActiveUserGroupsList.pagination,
        filters: action.inActiveUserGroupsList.filters,
      }
    case type.INACTIVE_USER_GROUPS_FAILED:
      return {
        ...state,
        inActiveUserGroupsLoading: false,
        inActiveUserGroupsError: action.message,
      }


    // ADD AN USER GROUP
    case type.ADD_USER_GROUP_REQUESTED:
      return {
        ...state,
        addUserGroupLoading: true,
      }
    case type.ADD_USER_GROUP_SUCCESS:
      return {
        ...state,
        addUserGroupLoading: false,
        userGroupsList: action.userGroupsList,
      }
    case type.ADD_USER_GROUP_FAILED:
      return {
        ...state,
        addUserGroupLoading: false,
        addUserGroupError: action.message,
      }


    // GET AN USER GROUP DETAILS
    case type.USER_GROUP_DETAILS_REQUESTED:
      return {
        ...state,
        userGroupDetailsLoading: true,
      }
    case type.USER_GROUP_DETAILS_SUCCESS:
      return {
        ...state,
        userGroupDetailsLoading: false,
        userGroupDetails: action.userGroupDetails.group,
        searchUserGroupsQuery: "",
      }
    case type.USER_GROUP_DETAILS_FAILED:
      return {
        ...state,
        userGroupDetailsLoading: false,
        userGroupDetailsError: action.message,
      }


    // UPDATE AN USER GROUP
    case type.UPDATE_USER_GROUP_REQUESTED:
      return {
        ...state,
        updateUserGroupLoading: true,
      }
    case type.UPDATE_USER_GROUP_SUCCESS:
      return {
        ...state,
        updateUserGroupLoading: false,
        searchUserGroupsQuery: "",
      }
    case type.UPDATE_USER_GROUP_FAILED:
      return {
        ...state,
        updateUserGroupLoading: false,
        updateUserGroupError: action.message,
        addUserGroupError: action.message,
      }


    // DELETE AN USER GROUP
    case type.DELETE_USER_GROUP_REQUESTED:
      return {
        ...state,
        deleteUserGroupLoading: true,
      }
    case type.DELETE_USER_GROUP_SUCCESS:
      return {
        ...state,
        deleteUserGroupLoading: false,
        searchUserGroupsQuery: "",
      }
    case type.DELETE_USER_GROUP_FAILED:
      return {
        ...state,
        deleteUserGroupLoading: false,
        deleteUserGroupError: action.message,
      }


    // SELECTED USERS IN GROUP
    case type.GET_ALL_USERS_GROUP_REQUESTED:
      return {
        ...state,
        selectedUsersOfGroupLoading: true,
      }
    case type.GET_ALL_USERS_GROUP_SUCCESS:
      return {
        ...state,
        selectedUsersOfGroupLoading: false,
        theUsers: action.userGroupsList.users,
        groupUserFilter: action.userGroupsList.filters,
        groupUserPagination: action.userGroupsList.pagination,
      }
    case type.GET_ALL_USERS_GROUP_FAILED:
      return {
        ...state,
        selectedUsersOfGroupLoading: false,
        selectedUsersOfGroupError: action.message,
      }


    // RESET ERROR MESSAGES
    case type.RESET_USER_GROUP_REQUESTED:
      return {
        ...state,
        addUserGroupError: [],
      }

    // CHANGE SEARCH
    case type.CHANGE_USER_GROUPS_SEARCH_REQUESTED:
      return {
        ...state,
        searchUserGroupsQuery: action.payload,
      }

    default:
      return state;
  }
}