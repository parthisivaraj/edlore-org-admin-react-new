import * as type from "./types";

const initialState = {
  // Create a Sync
  machines: [],
  machineError: "",
  machinesLoading: false,
  processing: "",
  success: false,
  processingError: "",
  showSyncModal: false,
};

export default function sync(state = initialState, action) {
  switch (action.type) {
    case type.GET_SLAVE_MACHINES_REQUESTED:
      return {
        ...state,
        machinesLoading: true,
      };
    case type.GET_SLAVE_MACHINES_SUCCESS:
      return {
        ...state,
        machinesLoading: false,
        machines: action.slaveMachines,
      };
    case type.GET_SLAVE_MACHINES_FAILED:
      return {
        ...state,
        machinesLoading: false,
        machineError: action.message,
      };

    // OPEN Modal
    case type.SET_SYNC_MODAL_REQUESTED:
      return {
        ...state,
        showSyncModal: action.payload,
        processing: "",
        success: false,
        processingError: "",
      };

    // DELETE A DOCUMENT
    case type.SYNC_REQUESTED:
      return {
        ...state,
        processing: "Syncing",
        success: false,
        processingError: "",
      };
    case type.SYNC_SUCCESS:
      return {
        ...state,
        processing: "",
        success: true,
        processingError: "",
      };
    case type.SYNC_FAILED:
      return {
        ...state,
        processing: "",
        success: false,
        processingError: action.message,
      };

    default:
      return state;
  }
}
