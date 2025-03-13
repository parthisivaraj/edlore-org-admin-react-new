import * as type from './types';

const initialState = {
  troubleshootList: [],
  allTroubleshootLoading: false,
  allTroubleshootError: null,
  troubleshootPagination: {},

  troubleshootModal: false,
  troubleshootEdit: false,
  editingId: "",
  troubleshootName: "",
  addTroubleshootError: [],

  // Add Troubleshoot
  addTroubleshootLoading: false,
  createdNewTroubleshoot: false,
  createdTroubleshootDetails: {},


  // Troubleshoot Details
  troubleshootDetails: {},
  troubleshootDetailsLoading: false,
  troubleshootDetailsError: null,
  troubleshootDetailModal: false,

  // Update Troubleshoot
  updateTroubleshootLoading: false,
  updateTroubleshootError: null,

  // Delete Troubleshoot
  deleteTroubleshootLoading: false,
  deleteTroubleshootError: null,

  // STEPS ======================

  // Add a Troubleshoot Step
  addTroubleshootStepLoading: false,
  addTroubleshootStepError: null,

  // Update a Troubleshoot Step
  updateTroubleshootStepLoading: false,
  updateTroubleshootStepError: null,

  // Delete a Troubleshoot Step
  deleteTroubleshootStepLoading: false,
  deleteTroubleshootStepError: null,

  // Update Troubleshoot Step Order
  updateTroubleshootStepOrderLoading: false,
  updateTroubleshootStepOrderError: null,

  // Approve Troubleshoot Step
  approveTroubleshootStepLoading: false,
  approveTroubleshootStepError: null,

  // Change Search Query
  searchTroubleshootQuery: "",
}

export default function troubleshoot(state = initialState, action) {
  switch (action.type) {
    // GET ALL TROUBLESHOOT
    case type.GET_ALL_TROUBLESHOOT_REQUESTED:
      return {
        ...state,
        allTroubleshootLoading: true,
      }
    case type.GET_ALL_TROUBLESHOOT_SUCCESS:
      return {
        ...state,
        allTroubleshootLoading: false,
        troubleshootList: action.troubleshootList.troubleshoots,
        troubleshootPagination: action.troubleshootList.pagination,
      }
    case type.GET_ALL_TROUBLESHOOT_FAILED:
      return {
        ...state,
        allTroubleshootLoading: false,
        allTroubleshootError: action.message,
      }

    // ADD TROUBLESHOOT
    case type.ADD_TROUBLESHOOT_REQUESTED:
      return {
        ...state,
        addTroubleshootLoading: true,
      }
    case type.ADD_TROUBLESHOOT_SUCCESS:
      return {
        ...state,
        addTroubleshootLoading: false,
        // troubleshootList: action.troubleshootList,
        createdNewTroubleshoot: true,
        createdTroubleshootDetails: action.troubleshootList,
        troubleshootModal: false,
        troubleshootEdit: false,
        editingId: "",
        troubleshootName: "",
      }
    case type.ADD_TROUBLESHOOT_FAILED:
      return {
        ...state,
        addTroubleshootLoading: false,
        addTroubleshootError: action.message,
      }

    // TROUBLESHOOT DETAILS
    case type.TROUBLESHOOT_DETAILS_REQUESTED:
      return {
        ...state,
        troubleshootDetailsLoading: true,
      }
    case type.TROUBLESHOOT_DETAILS_SUCCESS:
      return {
        ...state,
        troubleshootDetailsLoading: false,
        troubleshootDetails: action.data.troubleshoot,
        troubleshootDetailModal: false,
        searchTroubleshootQuery: "",
      }
    case type.TROUBLESHOOT_DETAILS_FAILED:
      return {
        ...state,
        troubleshootDetailsLoading: false,
        troubleshootDetailsError: action.message,
      }

    // UPDATE TROUBLESHOOT
    case type.UPDATE_TROUBLESHOOT_REQUESTED:
      return {
        ...state,
        updateTroubleshootLoading: true,
      }
    case type.UPDATE_TROUBLESHOOT_SUCCESS:
      return {
        ...state,
        updateTroubleshootLoading: false,
        troubleshootModal: false,
        troubleshootEdit: false,
        editingId: "",
        troubleshootName: "",
        searchTroubleshootQuery: "",
      }
    case type.UPDATE_TROUBLESHOOT_FAILED:
      return {
        ...state,
        updateTroubleshootLoading: false,
        updateTroubleshootError: action.messaage,
      }

    // DELETE TROUBLESHOOT
    case type.DELETE_TROUBLESHOOT_REQUESTED:
      return {
        ...state,
        deleteTroubleshootLoading: true,
      }
    case type.DELETE_TROUBLESHOOT_SUCCESS:
      return {
        ...state,
        deleteTroubleshootLoading: false,
        troubleshootModal: false,
        searchTroubleshootQuery: "",
      }
    case type.DELETE_TROUBLESHOOT_FAILED:
      return {
        ...state,
        deleteTroubleshootLoading: false,
        deleteTroubleshootError: action.message,
      }

    // TROUBLESHOOT STEPS ===========================================

    // SET TO DEFAULT
    case type.SET_TO_DEFAULT_TROUBLESHOOT_STEP_REQUESTED:
      return {
        ...state,
      }
    case type.SET_TO_DEFAULT_TROUBLESHOOT_STEP_SUCCESS:
      return {
        ...state,
        createdNewTroubleshoot: false,
        createdTroubleshootDetails: {},
      }
    case type.SET_TO_DEFAULT_TROUBLESHOOT_STEP_FAILED:
      return {
        ...state,
      }

    // ADD A TROUBLESHOOT STEP
    case type.ADD_TROUBLESHOOT_STEP_REQUESTED:
      return {
        ...state,
        addTroubleshootStepLoading: true,
      }
    case type.ADD_TROUBLESHOOT_STEP_SUCCESS:
      return {
        ...state,
        addTroubleshootStepLoading: false,
      }
    case type.ADD_TROUBLESHOOT_STEP_FAILED:
      return {
        ...state,
        addTroubleshootStepLoading: false,
        addTroubleshootStepError: action.message,
      }

    // UPDATE A TROUBLESHOOT STEP
    case type.UPDATE_TROUBLESHOOT_STEP_REQUESTED:
      return {
        ...state,
        updateTroubleshootStepLoading: true,
      }
    case type.UPDATE_TROUBLESHOOT_STEP_SUCCESS:
      return {
        ...state,
        updateTroubleshootStepLoading: false,
      }
    case type.UPDATE_TROUBLESHOOT_STEP_FAILED:
      return {
        ...state,
        updateTroubleshootStepLoading: false,
        updateTroubleshootStepError: action.message,
      }

    // DELETE A TROUBLESHOOT STEP
    case type.DELETE_TROUBLESHOOT_STEP_REQUESTED:
      return {
        ...state,
        deleteTroubleshootStepLoading: true,
      }
    case type.DELETE_TROUBLESHOOT_STEP_SUCCESS:
      return {
        ...state,
        deleteTroubleshootStepLoading: false,
      }
    case type.DELETE_TROUBLESHOOT_STEP_FAILED:
      return {
        ...state,
        deleteTroubleshootStepLoading: false,
        deleteTroubleshootStepError: action.message,
      }

    // UPDATE TROUBLESHOOT STEP ORDER
    case type.UPDATE_TROUBLESHOOT_STEP_ORDER_REQUESTED:
      return {
        ...state,
        updateTroubleshootStepOrderLoading: true,
      }
    case type.UPDATE_TROUBLESHOOT_STEP_ORDER_SUCCESS:
      return {
        ...state,
        updateTroubleshootStepOrderLoading: false,
      }
    case type.UPDATE_TROUBLESHOOT_STEP_ORDER_FAILED:
      return {
        ...state,
        updateTroubleshootStepOrderLoading: false,
        updateTroubleshootStepOrderError: action.message,
      }

    // APPROVE TROUBLESHOOT STEP
    case type.APPROVE_TROUBLESHOOT_STEP_REQUESTED:
      return {
        ...state,
        approveTroubleshootStepLoading: true,
      }
    case type.APPROVE_TROUBLESHOOT_STEP_SUCCESS:
      return {
        ...state,
        approveTroubleshootStepLoading: false,
      }
    case type.APPROVE_TROUBLESHOOT_STEP_FAILED:
      return {
        ...state,
        approveTroubleshootStepLoading: false,
        approveTroubleshootStepError: action.message,
      }


    // TROUBLESHOOT MODAL
    case type.SET_TOUBLESHOOT_MODAL:
      return {
        ...state,
        troubleshootModal: action.payload.show,
        troubleshootEdit: action.payload.edit,
        editingId: action.payload.id,
        troubleshootName: action.payload.name,
      }

    // TROUBLESHOOT DETAIL MODAL
    case type.SET_TROUBLESHOOT_DETAIL_MODAL:
      return {
        ...state,
        troubleshootDetailModal: action.payload,
      }

    // RESET TROUBLESHOOT ERRORS
    case type.RESET_TROUBLESHOOT_ERRORS_REQUESTED:
      return {
        ...state,
        addTroubleshootError: [],
      }

    // CHANGE SEARCH
    case type.CHANGE_TROUBLESHOOT_SEARCH_REQUESTED:
      return {
        ...state,
        searchTroubleshootQuery: action.payload,
      }

    default:
      return state;
  }
}