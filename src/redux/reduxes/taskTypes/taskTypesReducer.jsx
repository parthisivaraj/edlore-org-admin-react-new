import * as type from './types';

const initialState = {
  // Get all Task Types
  taskTypesList: [],
  allTaskTypesLoading: false,
  allTaskTypesError: null,
  allTaskTypesPagination: {},
  filters: {},

  // editTaskType
  editTaskType: false,

  // Add a Task Type
  addTaskTypeLoading: false,
  addTaskTypeError: [],

  // Task Type Details
  taskTypeDetails: {},
  taskTypeDetailsLoading: false,
  taskTypeDetailsError: null,

  // Update a Task Type
  updateTaskTypeLoading: false,
  updateTaskTypeError: [],

  // Delete a Task Type
  deleteTaskTypeLoading: false,
  deleteTaskTypeError: null,

  // Change Search
  searchTaskTypesQuery: "",
}

export default function tasktypes(state = initialState, action) {
  switch (action.type) {
    // Get all Task Types
    case type.GET_ALL_TASK_TYPES_REQUESTED:
      return {
        ...state,
        allTaskTypesLoading: true,
      }
    case type.GET_ALL_TASK_TYPES_SUCCESS:
      return {
        ...state,
        allTaskTypesLoading: false,
        taskTypesList: action.taskTypesList.task_types,
        allTaskTypesPagination: action.taskTypesList.pagination,
        filters: action.taskTypesList.filters,
      }
    case type.GET_ALL_TASK_TYPES_FAILED:
      return {
        ...state,
        allTaskTypesLoading: false,
        allTaskTypesError: action.message,
      }

    // Add a Task Type
    case type.ADD_TASK_TYPE_REQUESTED:
      return {
        ...state,
        addTaskTypeLoading: true,
      }
    case type.ADD_TASK_TYPE_SUCCESS:
      return {
        ...state,
        addTaskTypeLoading: false,
        editTaskType: false,
      }
    case type.ADD_TASK_TYPE_FAILED:
      return {
        ...state,
        addTaskTypeLoading: false,
        addTaskTypeError: action.message,
      }

    // Get Task Type Details
    case type.TASK_TYPE_DETAILS_REQUESTED:
      return {
        ...state,
        taskTypeDetailsLoading: true,
      }
    case type.TASK_TYPE_DETAILS_SUCCESS:
      return {
        ...state,
        taskTypeDetailsLoading: false,
        taskTypeDetails: action.taskTypeDetails,
      }
    case type.TASK_TYPE_DETAILS_FAILED:
      return {
        ...state,
        taskTypeDetailsLoading: false,
        taskTypeDetailsError: action.message,
      }

    // Update a Task Type
    case type.UPDATE_TASK_TYPE_REQUESTED:
      return {
        ...state,
        updateTaskTypeLoading: true,
      }
    case type.UPDATE_TASK_TYPE_SUCCESS:
      return {
        ...state,
        updateTaskTypeLoading: false,
        editTaskType: false,
        searchTaskTypesQuery:"",
      }
    case type.UPDATE_TASK_TYPE_FAILED:
      return {
        ...state,
        updateTaskTypeLoading: false,
        // updateTaskTypeError: action.message,
        addTaskTypeError: action.message,
      }

    // Delete a Task Type
    case type.DELETE_TASK_TYPE_REQUESTED:
      return {
        ...state,
        deleteTaskTypeLoading: true,
      }
    case type.DELETE_TASK_TYPE_SUCCESS:
      return {
        ...state,
        deleteTaskTypeLoading: false,
        searchTaskTypesQuery:"",
      }
    case type.DELETE_TASK_TYPE_FAILED:
      return {
        ...state,
        deleteTaskTypeLoading: false,
        deleteTaskTypeError: action.message,
      }

    // set Task Type modal
    case type.SET_ADD_TASK_TYPE_MODAL:
      return {
        ...state,
        editTaskType: action.payload,
      }


    // set Task Type ERROR MESSAGE
    case type.SET_ADD_TASK_ERROR_MESSAGE:
      return {
        ...state,
        addTaskTypeError: [],
      }

    // Change Search
    case type.CHANGE_TASK_TYPES_SEARCH_REQUESTED:
      return {
        ...state,
        searchTaskTypesQuery: action.payload,
      }

    default:
      return state
  }
}
