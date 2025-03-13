import * as type from "./types";

const initialState = {
  // GET ALL SLAVE MACHINES LIST
  allSlaveMachinesList: [],
  allSlaveMachinesLoading: false,
  allSlaveMachinesError: null,
  allSlaveMachinesPagination: {},

  // ADD A SLAVE MACHINE
  addSlaveMachineLoading: false,
  addSlaveMachineError: [],
  showSlaveMachinesModal: false,

  // GET A SLAVE MACHINE DETAILS
  slaveMachineDetails: {},
  slaveMachineDetailsLoading: false,
  slaveMachineDetailsError: null,

  // UPDATE A SLAVE MACHINE
  updateSlaveMachineLoading: false,
  updateSlaveMachineError: null,

  // DELETE A SLAVE MACHINE
  deleteSlaveMachineLoading: false,
  deleteSlaveMachineError: null,

  // CHANGE SEARCH
  searchQuery: "",
};

export default function slave_machines(state = initialState, action) {
  switch (action.type) {
    // GET ALL SLAVE MACHINES
    case type.GET_ALL_SLAVE_MACHINES_REQUESTED:
      return {
        ...state,
        allSlaveMachinesLoading: true,
      };
    case type.GET_ALL_SLAVE_MACHINES_SUCCESS:
      return {
        ...state,
        allSlaveMachinesLoading: false,
        allSlaveMachinesList: action.allSlaveMachinesList.machines,
        allSlaveMachinesPagination: action.allSlaveMachinesList.pagination,
      };
    case type.GET_ALL_SLAVE_MACHINES_FAILED:
      return {
        ...state,
        allSlaveMachinesLoading: false,
        allSlaveMachinesError: action.message,
      };

    // ADD A SLAVE MACHINE
    case type.ADD_SLAVE_MACHINE_REQUESTED:
      return {
        ...state,
        addSlaveMachineLoading: true,
      };
    case type.ADD_SLAVE_MACHINE_SUCCESS:
      return {
        ...state,
        addSlaveMachineLoading: false,
        allSlaveMachinesList: action.allSlaveMachinesList.machines,
        showSlaveMachinesModal: false,
      };
    case type.ADD_SLAVE_MACHINE_FAILED:
      return {
        ...state,
        addSlaveMachineLoading: false,
        addSlaveMachineError: action.message,
      };

    // GET A SLAVE MACHINE DETAILS
    case type.GET_SLAVE_MACHINE_DETAILS_REQUESTED:
      return {
        ...state,
        slaveMachineDetailsLoading: true,
      };
    case type.GET_SLAVE_MACHINE_DETAILS_SUCCESS:
      return {
        ...state,
        slaveMachineDetailsLoading: false,
        slaveMachineDetails: action.slaveMachineDetails.machine,
      };
    case type.GET_SLAVE_MACHINE_DETAILS_FAILED:
      return {
        ...state,
        slaveMachineDetailsLoading: false,
        slaveMachineDetailsError: action.message,
      };

    // UPDATE A SLAVE MACHINE
    case type.UPDATE_SLAVE_MACHINE_REQUESTED:
      return {
        ...state,
        updateSlaveMachineLoading: true,
      };
    case type.UPDATE_SLAVE_MACHINE_SUCCESS:
      return {
        ...state,
        updateSlaveMachineLoading: false,
        showSlaveMachinesModal: false,
        searchQuery: "",
      };
    case type.UPDATE_SLAVE_MACHINE_FAILED:
      return {
        ...state,
        updateSlaveMachineLoading: false,
        updateSlaveMachineError: action.message,
      };

    // DELETE A SLAVE MACHINE
    case type.DELETE_SLAVE_MACHINE_REQUESTED:
      return {
        ...state,
        deleteSlaveMachineLoading: true,
      };
    case type.DELETE_SLAVE_MACHINE_SUCCESS:
      return {
        ...state,
        deleteSlaveMachineLoading: false,
        showSlaveMachinesModal: "",
        searchQuery: "",
      };
    case type.DELETE_SLAVE_MACHINE_FAILED:
      return {
        ...state,
        deleteSlaveMachineLoading: false,
        deleteSlaveMachineError: action.message,
      };

    // RESET THE FORM ON CLOSE MODAL
    case type.SET_SLAVE_MACHINE_MODAL_REQUESTED:
      return {
        ...state,
        showSlaveMachinesModal: action.payload,
      };

    // RESET THE ERROR MESSAGES
    case type.RESET_SLAVE_MACHINE_ERRORS_REQUESTED:
      return {
        ...state,
        addSlaveMachineError: [],
      };

    // CHANGE SEARCH
    case type.CHANGE_SLAVE_MACHINES_SEARCH_REQUESTED:
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
}
