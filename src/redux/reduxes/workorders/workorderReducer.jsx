import * as type from './types';

const initialState = {
  activeTab: 0,

  category_id: null,
  device_id: null,
  id: null,
  model_id: null,
  title: "",
  work_order_number: "",
  attached_medias: [],
  task_type: {},
  note: "",
  due_date: "",
  assigned_to: 1,
  assigned_to_type: 1,
  status: "draft",
  tasks: [],
  repetition: null,
  repeat: false,
  note: null,
  priority: "low",
  workOrderDetails: {},
  showWorkOrderUploadModal: false,

  //add tab one
  addTabOneLoading: false,
  addTabOneError: null,

  //add tab two
  addTabTwoLoading: false,
  addTabTwoError: null,

  //add tab three
  addTabThreeLoading: false,
  addTabThreeError: null,

  // // Device Tab
  // storeInDeviceTab: {},
  // storeInDeviceTabLoading: false,
  // storeInDeviceTabError: null,

  // // Workorder Tab
  // storeInWorkorderTab: {},
  // storeInWorkorderTabLoading: false,
  // storeInWorkorderTabError: null,

  // // Assign Tab
  // storeInAssignTab: {},
  // storeInAssignTabLoading: false,
  // storeInAssignTabError: null,


  // Get All Active Workorders
  activeWorkordersList: [],
  activeWorkordersLoading: false,
  activeWorkordersError: null,
  activeWorkordersPagination: {},
  activeWorkordersFilters: {},

  // Get All Draft Workorders
  draftWorkordersList: [],
  draftWorkordersLoading: false,
  draftWorkordersError: null,
  draftWorkordersPagination: {},
  draftWorkordersFilters: {},

  // Get all Completed Workorders
  completedWorkordersList: [],
  completedWorkordersLoading: false,
  completedWorkordersError: null,
  completedWorkordersPagination: {},
  completedWorkordersFilters: {},

  // Add a Workorder
  addWorkorderLoading: false,
  addWorkorderError: null,

  // Get Workorder Details
  workorderDetails: {},
  workorderDetailsLoading: false,
  workorderDetailsError: null,

  // Cancel Workorder Repeat
  cancelWorkorderRepeatLoading: false,
  cancelWorkorderRepeatError: null,

  // Update a Workorder
  updateWorkorderLoading: false,
  updateWorkorderError: null,

  // Delete a Workorder
  deleteWorkorderLoading: false,
  deleteWorkorderError: null,

  // Get all Models using Category
  allModelsList: [],
  allModelsLoading: false,
  allModelsError: null,

  // workorder update device tab
  updateDeviceTabLoading: false,
  updateDeviceTabError: null,

  // workorder update device tab
  uploadWoLoading: false,
  uploadWoError: "",
  uploadWoDetails: {},

  // Get All Active Workorder Users
  activeWorkorderUsersList: [],
  activeWorkorderEnrolledUser: {},
  activeWorkorderUsersLoading: false,
  activeWorkorderUsersError: null,
  activeWorkorderUsersPagination: {},
  activeWorkorderUsersFilters: {},

  // Change Active Users Status
  changeActiveUserStatusLoading: false,
  changeActiveUserStatusError: null,

  // update WO step 2
  updateWoStepTwoLoading: false,
  updateWoStepTwoError: null,

  // update WO step 3
  updateWoStepThreeLoading: false,
  updateWoStepThreeError: null,

  // get all submitted wo pdf
  getSubmittedWoPdfLoading: false,
  getSubmittedWoPdfError: null,
  submittedWoPdf: [],
  submittedWoPdfPagination: {},

  // Device Workorders List
  deviceWorkordersList: [],
  deviceWorkordersLoading: false,
  deviceWorkordersError: null,

  // Workorder History Log
  deviceWorkorderHistoryLog: [],
  deviceWorkorderHistoryLogLoading: false,
  deviceWorkorderHistoryLogFailed: null,

  // update workorder Active user
  updateworkorderActiveUserLoading: false,
  updateworkorderActiveUserErrors: null,

  // publish WO
  publishDraftLoading: false,
  publishDraftErrors: null,
  editConfirmation: false,
  confirmationMessage: "",

  // Change Search
  searchWorkordersQuery: "",

  // Change Search in Active WO Users
  searchActiveWOUsersQuery: "",
}

export default function workorders(state = initialState, action) {
  switch (action.type) {

    // Device Tab
    // case type.STORE_DEVICE_TAB_REQUESTED:
    //   return {
    //     ...state,
    //     storeInDeviceTabLoading: true,
    //   }
    // case type.STORE_DEVICE_TAB_SUCCESS:
    //   return {
    //     ...state,
    //     storeInDeviceTabLoading: false,
    //     storeInDeviceTab: action.storeInDeviceTab,
    //     activeTab: 1,
    //   }
    // case type.STORE_DEVICE_TAB_FAILED:
    //   return {
    //     ...state,
    //     storeInDeviceTabLoading: false,
    //     storeInDeviceTabError: action.message,
    //   }

    // Workorder Tab
    // case type.STORE_WORKORDER_TAB_REQUESTED:
    //   return {
    //     ...state,
    //     storeInWorkorderTabLoading: true,
    //   }
    // case type.STORE_WORKORDER_TAB_SUCCESS:
    //   return {
    //     ...state,
    //     storeInWorkorderTabLoading: false,
    //     storeInWorkorderTab: action.storeInWorkorderTab,
    //     activeTab: 2,
    //   }
    // case type.STORE_WORKORDER_TAB_FAILED:
    //   return {
    //     ...state,
    //     storeInWorkorderTabLoading: false,
    //     storeInWorkorderTabError: action.message,
    //   }

    // Assign Tab
    // case type.STORE_ASSIGN_TAB_REQUESTED:
    //   return {
    //     ...state,
    //     storeInAssignTabLoading: true,
    //   }
    // case type.STORE_ASSIGN_TAB_SUCCESS:
    //   return {
    //     ...state,
    //     storeInAssignTabLoading: false,
    //     storeInAssignTab: action.storeInAssignTab,
    //   }
    // case type.STORE_ASSIGN_TAB_FAILED:
    //   return {
    //     ...state,
    //     storeInAssignTabLoading: false,
    //     storeInAssignTabError: action.message,
    //   }


    // Get all Active Workorders
    case type.GET_ALL_ACTIVE_WORKORDERS_REQUESTED:
      return {
        ...state,
        activeWorkordersLoading: true,
      }
    case type.GET_ALL_ACTIVE_WORKORDERS_SUCCESS:
      return {
        ...state,
        activeWorkordersLoading: false,
        activeWorkordersList: action.activeWorkordersList.work_orders,
        activeWorkordersPagination: action.activeWorkordersList.pagination,
        activeWorkordersFilters: action.activeWorkordersList.filters,
      }
    case type.GET_ALL_ACTIVE_WORKORDERS_FAILED:
      return {
        ...state,
        activeWorkordersLoading: false,
        activeWorkordersError: action.message,
      }

    // Get all Draft Workorders
    case type.GET_ALL_DRAFT_WORKORDERS_REQUESTED:
      return {
        ...state,
        draftWorkordersLoading: true,
      }
    case type.GET_ALL_DRAFT_WORKORDERS_SUCCESS:
      return {
        ...state,
        draftWorkordersLoading: false,
        draftWorkordersList: action.draftWorkordersList.work_orders,
        draftWorkordersPagination: action.draftWorkordersList.pagination,
        draftWorkordersFilters: action.draftWorkordersList.filters,
      }
    case type.GET_ALL_DRAFT_WORKORDERS_FAILED:
      return {
        ...state,
        draftWorkordersLoading: false,
        draftWorkordersError: action.message,
      }

    // Get all Completed Workorders
    case type.GET_ALL_COMPLETED_WORKORDERS_REQUESTED:
      return {
        ...state,
        completedWorkordersLoading: true,
      }
    case type.GET_ALL_COMPLETED_WORKORDERS_SUCCESS:
      return {
        ...state,
        completedWorkordersLoading: false,
        completedWorkordersList: action.completedWorkordersList.work_orders,
        completedWorkordersPagination: action.completedWorkordersList.pagination,
        completedWorkordersFilters: action.completedWorkordersList.filters,
      }
    case type.GET_ALL_COMPLETED_WORKORDERS_FAILED:
      return {
        ...state,
        completedWorkordersLoading: false,
        completedWorkordersError: action.message,
      }

    // Get Workorder Details
    case type.WORKORDER_DETAILS_REQUESTED:
      return {
        ...state,
        workorderDetailsLoading: true,
      }
    case type.WORKORDER_DETAILS_SUCCESS:
      return {
        ...state,
        workorderDetailsLoading: false,
        workorderDetails: action.workorderDetails,
      }
    case type.WORKORDER_DETAILS_FAILED:
      return {
        ...state,
        workorderDetailsLoading: false,
        workorderDetailsError: action.message,
      }

    // Cancel Workorder Repeat
    case type.CANCEL_WORKORDER_REPEAT_REQUESTED:
      return {
        ...state,
        cancelWorkorderRepeatLoading: true,
      }
    case type.CANCEL_WORKORDER_REPEAT_SUCCESS:
      return {
        ...state,
        cancelWorkorderRepeatLoading: false,
      }
    case type.CANCEL_WORKORDER_REPEAT_FAILED:
      return {
        ...state,
        cancelWorkorderRepeatLoading: false,
        cancelWorkorderRepeatError: action.message,
      }

    // Update a Workorder
    case type.UPDATE_WORKORDER_REQUESTED:
      return {
        ...state,
        updateWorkorderLoading: true,
      }
    case type.UPDATE_WORKORDER_SUCCESS:
      return {
        ...state,
        updateWorkorderLoading: false,
        searchActiveWOUsersQuery: "",
      }
    case type.UPDATE_WORKORDER_FAILED:
      return {
        ...state,
        updateWorkorderLoading: false,
        updateWorkorderError: action.message,
      }

    // Delete a Workorder
    case type.DELETE_WORKORDER_REQUESTED:
      return {
        ...state,
        deleteWorkorderLoading: true,
      }
    case type.DELETE_WORKORDER_SUCCESS:
      return {
        ...state,
        deleteWorkorderLoading: false,
      }
    case type.DELETE_WORKORDER_FAILED:
      return {
        ...state,
        deleteWorkorderLoading: false,
        deleteWorkorderError: action.message,
      }


    // Get all Models using Category
    case type.GET_ALL_CATEGORY_MODELS_REQUESTED:
      return {
        ...state,
        allModelsLoading: true,
      }
    case type.GET_ALL_CATEGORY_MODELS_SUCCESS:
      return {
        ...state,
        allModelsLoading: false,
        allModelsList: action.allModelsList.models,
      }
    case type.GET_ALL_CATEGORY_MODELS_FAILED:
      return {
        ...state,
        allModelsLoading: false,
        allModelsError: action.message,
      }

    // Create workorder tab one
    case type.ADD_DEVICE_TAB_REQUESTED:
      return {
        ...state,
        addTabOneLoading: true,
      }
    case type.ADD_DEVICE_TAB_SUCCESS:
      return {
        ...state,
        addTabOneLoading: false,

        category_id: action.stepOneData.category_id,
        device_id: action.stepOneData.device_id,
        id: action.stepOneData.id,
        model_id: action.stepOneData.model_id,
        title: action.stepOneData.title,
        work_order_number: action.stepOneData.work_order_number,
        activeTab: 1
      }
    case type.ADD_DEVICE_TAB_FAILED:
      return {
        ...state,
        addTabOneLoading: false,
        addTabOneError: action.message,
      }

    // Create workorder tab Two
    case type.ADD_TSAK_TAB_REQUESTED:
      return {
        ...state,
        addTabTwoLoading: true,
      }
    case type.ADD_TSAK_TAB_SUCCESS:
      return {
        ...state,
        addTabTwoLoading: false,
        activeTab: 2,
        task_type: action.stepTwoData.task_type,
        repeat: action.stepTwoData.repeat,
        repetition: action.stepTwoData.repetition,
        due_date: action.stepTwoData.due_date,
        assigne_details: action.stepTwoData.assigne_details,
      }
    case type.ADD_TSAK_TAB_FAILED:
      return {
        ...state,
        addTabTwoLoading: false,
        addTabTwoError: action.message,
      }

    // Create workorder tab Three
    case type.ADD_ASSIGN_TAB_REQUESTED:
      return {
        ...state,
        addTabThreeLoading: true,
      }
    case type.ADD_ASSIGN_TAB_SUCCESS:
      return {
        ...state,
        addTabThreeLoading: false,
      }
    case type.ADD_ASSIGN_TAB_FAILED:
      return {
        ...state,
        addTabThreeLoading: false,
        addTabThreeError: action.message,
      }

    // Workorder Details
    case type.GET_WORKORDER_DETAILS_REQUESTED:
      return {
        ...state,
        workorderDetailsLoading: true,
      }
    case type.GET_WORKORDER_DETAILS_SUCCESS:
      return {
        ...state,
        workorderDetailsLoading: false,
        workOrderDetails: action.details

      }
    case type.GET_WORKORDER_DETAILS_FAILED:
      return {
        ...state,
        workorderDetailsLoading: false,
        workorderDetailsError: action.message,
      }

    // Update Workorder device tab
    case type.UPDATE_DEVICE_TAB_REQUESTED:
      return {
        ...state,
        updateDeviceTabLoading: true,
      }
    case type.UPDATE_DEVICE_TAB_SUCCESS:
      return {
        ...state,
        updateDeviceTabLoading: false,
        category_id: action.stepOneData.category_id,
        device_id: action.stepOneData.device_id,
        id: action.stepOneData.id,
        model_id: action.stepOneData.model_id,
        title: action.stepOneData.title,
        work_order_number: action.stepOneData.work_order_number,
        activeTab: 1
      }
    case type.UPDATE_DEVICE_TAB_FAILED:
      return {
        ...state,
        updateDeviceTabLoading: false,
        updateDeviceTabError: action.message,
      }

    // UPLOAD Workorder device tab
    case type.UPLOAD_WO_REQUESTED:
      return {
        ...state,
        uploadWoLoading: true,
      }
    case type.UPLOAD_WO_SUCCESS:
      return {
        ...state,
        uploadWoLoading: false,
        uploadWoDetails: action.uploadWoDetails,
        showWorkOrderUploadModal: false,
      }
    case type.UPLOAD_WO_FAILED:
      return {
        ...state,
        uploadWoLoading: false,
        uploadWoError: action.message,
      }

    // Create workorder tab Three
    case type.CHANGE_STEP_IN_CREATION:
      return {
        ...state,
        activeTab: action.payload,
      }

    // Get All Active Workorder Users
    case type.GET_ALL_ACTIVE_WORKORDER_USERS_REQUESTED:
      return {
        ...state,
        activeWorkorderUsersLoading: true,
      }
    case type.GET_ALL_ACTIVE_WORKORDER_USERS_SUCCESS:
      return {
        ...state,
        activeWorkorderUsersLoading: false,
        activeWorkorderUsersList: action.activeWorkorderUsersList.users,
        activeWorkorderEnrolledUser: action.activeWorkorderUsersList.enrolled_user,
        activeWorkorderUsersPagination: action.activeWorkorderUsersList.pagination,
        activeWorkorderUsersFilters: action.activeWorkorderUsersList.filters,
      }
    case type.GET_ALL_ACTIVE_WORKORDER_USERS_FAILED:
      return {
        ...state,
        activeWorkorderUsersLoading: false,
        activeWorkorderUsersError: action.message,
      }

    // CHANGE ACTIVE USERS STATUS
    // case type.UPDATE_WORKORDER_TAB_TWO_REQUESTED:
    //   return {
    //     ...state,
    //     changeActiveUserStatusLoading: true,
    //   }
    // case type.UPDATE_WORKORDER_TAB_TWO_SUCCESS:
    //   return {
    //     ...state,
    //     changeActiveUserStatusLoading: false,

    //   }
    // case type.UPDATE_WORKORDER_TAB_TWO_FAILED:
    //   return {
    //     ...state,
    //     changeActiveUserStatusLoading: false,
    //     changeActiveUserStatusError: action.message,
    //   }

    // UPDATE WORKORDER STEP 3
    case type.UPDATE_WORKORDER_TAB_THREE_REQUESTED:
      return {
        ...state,
        updateWoStepThreeLoading: true,
      }
    case type.UPDATE_WORKORDER_TAB_THREE_SUCCESS:
      return {
        ...state,
        updateWoStepThreeLoading: false,
      }
    case type.UPDATE_WORKORDER_TAB_THREE_FAILED:
      return {
        ...state,
        updateWoStepThreeLoading: false,
        updateWoStepThreeError: action.message,
      }


    // UPDATE WORKORDER STEP 2
    case type.UPDATE_WORKORDER_TAB_TWO_REQUESTED:
      return {
        ...state,
        updateWoStepTwoLoading: true,
      }
    case type.UPDATE_WORKORDER_TAB_TWO_SUCCESS:
      return {
        ...state,
        updateWoStepTwoLoading: false,
        activeTab: 2,
        task_type: action.stepTwoData.task_type,
        repeat: action.stepTwoData.repeat,
        repetition: action.stepTwoData.repetition,
        due_date: action.stepTwoData.due_date,
        assigne_details: action.stepTwoData.assigne_details,
      }
    case type.UPDATE_WORKORDER_TAB_TWO_FAILED:
      return {
        ...state,
        updateWoStepTwoLoading: false,
        updateWoStepTwoError: action.message,
      }

    // get all submitted wo pdf
    case type.GET_ALL_SUBMITTED_WO_PDF_REQUESTED:
      return {
        ...state,
        getSubmittedWoPdfLoading: true,
      }
    case type.GET_ALL_SUBMITTED_WO_PDF_SUCCESS:
      return {
        ...state,
        getSubmittedWoPdfLoading: false,
        submittedWoPdf: action.response.tasks,
        submittedWoPdfPagination: action.response.pagination,
      }
    case type.GET_ALL_SUBMITTED_WO_PDF_FAILED:
      return {
        ...state,
        getSubmittedWoPdfLoading: false,
        getSubmittedWoPdfError: action.message,
      }

    // ------------------- Get all Workorders for a Device
    case type.GET_ALL_DEVICE_WORKORDERS_REQUESTED:
      return {
        ...state,
        deviceWorkordersLoading: true,
      }
    case type.GET_ALL_DEVICE_WORKORDERS_SUCCESS:
      return {
        ...state,
        deviceWorkordersLoading: false,
        activeWorkordersList: action.deviceWorkordersList.active_work_orders,
      }
    case type.GET_ALL_DEVICE_WORKORDERS_FAILED:
      return {
        ...state,
        deviceWorkordersLoading: false,
        deviceWorkordersError: action.message,
      }

    // ------------------- Get Device WO History Log
    case type.GET_WO_HISTORY_LOG_REQUESTED:
      return {
        ...state,
        deviceWorkorderHistoryLogLoading: true,
      }
    case type.GET_WO_HISTORY_LOG_SUCCESS:
      return {
        ...state,
        deviceWorkorderHistoryLogLoading: false,
        completedWorkordersList: action.deviceWorkorderHistoryLog.work_order_history,
      }
    case type.GET_WO_HISTORY_LOG_FAILED:
      return {
        ...state,
        deviceWorkorderHistoryLogLoading: false,
        deviceWorkorderHistoryLogFailed: action.message,
      }

    // ------------------- update workorder active status
    case type.CHANGE_ACTIVE_WORKORDER_USER_STATUS_REQUESTED:
      return {
        ...state,
        updateworkorderActiveUserLoading: true,
      }
    case type.CHANGE_ACTIVE_WORKORDER_USER_STATUS_SUCCESS:
      return {
        ...state,
        updateworkorderActiveUserLoading: false,
      }
    case type.CHANGE_ACTIVE_WORKORDER_USER_STATUS_FAILED:
      return {
        ...state,
        updateworkorderActiveUserLoading: false,
        updateworkorderActiveUserErrors: action.message,
      }

    // ------------------- publish the draft
    case type.PUBLISH_THE_DRAFT_PROJECT_REQUESTED:
      return {
        ...state,
        publishDraftLoading: true,
      }
    case type.PUBLISH_THE_DRAFT_PROJECT_SUCCESS:
      return {
        ...state,
        publishDraftLoading: false,
      }
    case type.PUBLISH_THE_DRAFT_PROJECT_FAILED:
      return {
        ...state,
        publishDraftLoading: false,
        publishDraftErrors: action.message,
        editConfirmation: true,
        confirmationMessage: action.message.message,
        activeTab: action.message.redirect_page - 1,
      }

    // UPLOAD WORKORDER MODAL
    case type.SET_WORKODR_UPLOAD_MODAL:
      return {
        ...state,
        showWorkOrderUploadModal: action.payload,
      }

    // UPLOAD WORKORDER MODAL
    case type.SET_CONFIRM_EDIT_POPUP:
      return {
        ...state,
        editConfirmation: action.payload,
      }

    // UPLOAD WORKORDER MODAL
    case type.RESET_WO_ERRORS:
      return {
        ...state,
        uploadWoError: "",
      }

    // UPLOAD WORKORDER MODAL
    case type.RESET_WO_DETAILS:
      return {
        ...state,
        workOrderDetails: {},
      }

    // CHANGE SEARCH
    case type.CHANGE_WORKORDERS_SEARCH_REQUESTED:
      return {
        ...state,
        searchWorkordersQuery: action.payload,
      }

    // CHANGE SEARCH IN ACTIVE WO USERS
    case type.CHANGE_ACTIVE_WO_USERS_SEARCH_REQUESTED:
      return {
        ...state,
        searchActiveWOUsersQuery: action.payload,
      }

    default:
      return state;
  }
}