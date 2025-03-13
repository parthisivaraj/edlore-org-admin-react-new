import * as type from './types';

const initialState = {
  // Get all Issues
  writtenIssuesList: [],
  writtenIssuesPagination: {},
  writtenIssuesLoading: false,
  writtenIssuesError: null,
  filters: {},

  writtenIssuesModal: false,
  addWrittenIssueError: [],

  // Add a Written Issue
  addWrittenIssueLoading: false,
  createdNewWrittenIssue: false,
  createdWrittenIssueDetails: {},


  // Get a Written Issue Detail
  writtenIssueDetails: {},
  writtenIssueDetailsLoading: false,
  writtenIssueDetailsError: null,
  writtenIssuesDetailModal: false,

  // Update a Written Issue
  updateWrittenIssueLoading: false,
  updateWrittenIssueError: null,

  // Delete a Written Issue
  deleteWrittenIssueLoading: false,
  deleteWrittenIssueError: null,


  // STEPS ======================

  // Add a WI Step
  addWrittenIssueStepLoading: false,
  addWrittenIssueStepError: null,

  // Update a WI Step
  updateWrittenIssueStepLoading: false,
  updateWrittenIssueStepError: null,

  // Delete a WI Step
  deleteWrittenIssueStepLoading: false,
  deleteWrittenIssueStepError: null,

  // Update Step Order
  updateWrittenIssueStepOrderLoading: false,
  updateWrittenIssueStepOrderError: null,

  // Search Query
  searchWrittenIssuesQuery: "",
}

export default function written_issues(state = initialState, action) {
  switch (action.type) {
    // GET ALL WRITTEN ISSUES
    case type.GET_ALL_WRITTEN_ISSUES_REQUESTED:
      return {
        ...state,
        writtenIssuesLoading: true,
      }
    case type.GET_ALL_WRITTEN_ISSUES_SUCCESS:
      return {
        ...state,
        writtenIssuesLoading: false,
        writtenIssuesList: action.writtenIssuesList.written_issues,
        allWrittenIssuesPagination: action.writtenIssuesList.pagination,
        filters: action.writtenIssuesList.filters,
      }
    case type.GET_ALL_WRITTEN_ISSUES_FAILED:
      return {
        ...state,
        writtenIssuesLoading: false,
        writtenIssuesError: action.message,
      }


    // ADD A WRITTEN ISSUE
    case type.ADD_WRITTEN_ISSUE_REQUESTED:
      return {
        ...state,
        addWrittenIssueLoading: true,
      }
    case type.ADD_WRITTEN_ISSUE_SUCCESS:
      return {
        ...state,
        addWrittenIssueLoading: false,
        // writtenIssuesList: action.writtenIssuesList,
        createdNewWrittenIssue: true,
        createdWrittenIssueDetails: action.writtenIssuesList,
        writtenIssuesModal: false,
      }
    case type.ADD_WRITTEN_ISSUE_FAILED:
      return {
        ...state,
        addWrittenIssueLoading: false,
        addWrittenIssueError: action.message,
      }


    // GET A WRITTEN ISSUE DETAIL
    case type.WRITTEN_ISSUE_DETAILS_REQUESTED:
      return {
        ...state,
        writtenIssueDetailsLoading: true,
      }
    case type.WRITTEN_ISSUE_DETAILS_SUCCESS:
      return {
        ...state,
        writtenIssueDetailsLoading: false,
        writtenIssueDetails: action.data.written_issues,
        writtenIssuesDetailModal: false,
        searchWrittenIssuesQuery: "",
      }
    case type.WRITTEN_ISSUE_DETAILS_FAILED:
      return {
        ...state,
        writtenIssueDetailsLoading: false,
        writtenIssueDetailsError: action.message,
      }


    // UPDATE A WRITTEN ISSUE
    case type.UPDATE_WRITTEN_ISSUE_REQUESTED:
      return {
        ...state,
        updateWrittenIssueLoading: true,
      }
    case type.UPDATE_WRITTEN_ISSUE_SUCCESS:
      return {
        ...state,
        updateWrittenIssueLoading: false,
        writtenIssuesModal: false,
        searchWrittenIssuesQuery: "",
      }
    case type.UPDATE_WRITTEN_ISSUE_FAILED:
      return {
        ...state,
        updateWrittenIssueLoading: false,
        addWrittenIssueError: action.message,
      }


    // DELETE A WRITTEN ISSUE
    case type.DELETE_WRITTEN_ISSUE_REQUESTED:
      return {
        ...state,
        deleteWrittenIssueLoading: true,
      }
    case type.DELETE_WRITTEN_ISSUE_SUCCESS:
      return {
        ...state,
        deleteWrittenIssueLoading: false,
        searchWrittenIssuesQuery: "",
      }
    case type.DELETE_WRITTEN_ISSUE_FAILED:
      return {
        ...state,
        deleteWrittenIssueLoading: false,
        deleteWrittenIssueError: action.message,
      }


    // WI STEPS ===============================================

    // SET TO DEFAULT
    case type.SET_TO_DEFAULT_STEP_REQUESTED:
      return {
        ...state,
      }
    case type.SET_TO_DEFAULT_STEP_SUCCESS:
      return {
        ...state,
        createdNewWrittenIssue: false,
        createdWrittenIssueDetails: {},
      }
    case type.SET_TO_DEFAULT_STEP_FAILED:
      return {
        ...state,
      }

    // ADD WI STEP
    case type.ADD_WRITTEN_ISSUE_STEP_REQUESTED:
      return {
        ...state,
        addWrittenIssueStepLoading: true,
      }
    case type.ADD_WRITTEN_ISSUE_STEP_SUCCESS:
      return {
        ...state,
        addWrittenIssueStepLoading: false,
      }
    case type.ADD_WRITTEN_ISSUE_STEP_FAILED:
      return {
        ...state,
        addWrittenIssueStepLoading: false,
        addWrittenIssueStepError: action.message,
      }

    // UPDATE WI STEP
    case type.UPDATE_WRITTEN_ISSUE_STEP_REQUESTED:
      return {
        ...state,
        updateWrittenIssueStepLoading: true,
      }
    case type.UPDATE_WRITTEN_ISSUE_STEP_SUCCESS:
      return {
        ...state,
        updateWrittenIssueStepLoading: false,
      }
    case type.UPDATE_WRITTEN_ISSUE_STEP_FAILED:
      return {
        ...state,
        updateWrittenIssueStepLoading: false,
        updateWrittenIssueStepError: action.message,
      }

    // DELETE WI STEP
    case type.DELETE_WRITTEN_ISSUE_STEP_REQUESTED:
      return {
        ...state,
        deleteWrittenIssueStepLoading: true,
      }
    case type.DELETE_WRITTEN_ISSUE_STEP_SUCCESS:
      return {
        ...state,
        deleteWrittenIssueStepLoading: false,
      }
    case type.DELETE_WRITTEN_ISSUE_STEP_FAILED:
      return {
        ...state,
        deleteWrittenIssueStepLoading: false,
        deleteWrittenIssueStepError: action.message,
      }

    // UPDATE WI STEP ORDER
    case type.UPDATE_WRITTEN_ISSUE_STEP_ORDER_REQUESTED:
      return {
        ...state,
        updateWrittenIssueStepOrderLoading: true,
      }
    case type.UPDATE_WRITTEN_ISSUE_STEP_ORDER_SUCCESS:
      return {
        ...state,
        updateWrittenIssueStepOrderLoading: false,
      }
    case type.UPDATE_WRITTEN_ISSUE_STEP_ORDER_FAILED:
      return {
        ...state,
        updateWrittenIssueStepOrderLoading: false,
        updateWrittenIssueStepOrderError: action.message,
      }


    // WRITTEN ISSUES MODAL
    case type.SET_WRITTEN_ISSUES_MODAL:
      return {
        ...state,
        writtenIssuesModal: action.payload,
      }

    // WRITTEN ISSUES DETAIL MODAL
    case type.SET_WRITTEN_ISSUES_DETAIL_MODAL:
      return {
        ...state,
        writtenIssuesDetailModal: action.payload,
      }

    // WRITTEN ISSUES ERRORS
    case type.RESET_WRITTEN_ISSUES_ERRORS_REQUESTED:
      return {
        ...state,
        addWrittenIssueError: [],
      }

    // CHANGE SEARCH
    case type.CHANGE_WRITTEN_ISSUES_SEARCH_REQUESTED:
      return {
        ...state,
        searchWrittenIssuesQuery: action.payload,
      }

    default:
      return state;
  }
}