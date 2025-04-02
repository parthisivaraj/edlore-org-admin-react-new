import * as type from "./types";

const initialState = {
  // GET ALL SLAVE MACHINES LIST
  allPartFieldsList: [],
  allPartFieldsLoading: false,
  allPartFieldsError: null,
  allPartFieldsPagination: {},

  // ADD A SLAVE MACHINE
  addPartFieldsLoading: false,
  addPartFieldsError: [],
  showPartFieldsModal: false,

  // GET A SLAVE MACHINE DETAILS
  partFieldsDetails: {},
  partFieldsDetailsLoading: false,
  partFieldsDetailsError: null,

  // UPDATE A SLAVE MACHINE
  updatePartFieldsLoading: false,
  updatePartFieldsError: null,

  // DELETE A SLAVE MACHINE
  deletePartFieldsLoading: false,
  deletePartFieldsError: null,

  // CHANGE SEARCH
  searchQuery: "",
};

export default function part_fields(state = initialState, action) {
  switch (action.type) {
    // GET ALL SLAVE MACHINES
    case type.GET_ALL_PART_FIELDS_REQUESTED:
      return {
        ...state,
        allPartFieldsLoading: true,
      };
    case type.GET_ALL_PART_FIELDS_SUCCESS:
      return {
        ...state,
        allPartFieldsLoading: false,
        allPartFieldsList: action.allPartFieldsList.machines,
        allPartFieldsPagination: action.allPartFieldsList.pagination,
      };
    case type.GET_ALL_PART_FIELDS_FAILED:
      return {
        ...state,
        allPartFieldsLoading: false,
        allPartFieldsError: action.message,
      };

    // ADD A SLAVE MACHINE
    case type.ADD_PART_FIELDS_REQUESTED:
      return {
        ...state,
        addPartFieldsLoading: true,
      };
    case type.ADD_PART_FIELDS_SUCCESS:
      return {
        ...state,
        addPartFieldsLoading: false,
        allPartFieldsList: action.allPartFieldsList.machines,
        showPartFieldsModal: false,
      };
    case type.ADD_PART_FIELDS_FAILED:
      return {
        ...state,
        addPartFieldsLoading: false,
        addPartFieldsError: action.message,
      };

    // GET A SLAVE MACHINE DETAILS
    case type.GET_PART_FIELDS_DETAILS_REQUESTED:
      return {
        ...state,
        partFieldsDetailsLoading: true,
      };
    case type.GET_PART_FIELDS_DETAILS_SUCCESS:
      return {
        ...state,
        partFieldsDetailsLoading: false,
        partFieldsDetails: action.partFieldsDetails.machine,
      };
    case type.GET_PART_FIELDS_DETAILS_FAILED:
      return {
        ...state,
        partFieldsDetailsLoading: false,
        partFieldsDetailsError: action.message,
      };

    // UPDATE A SLAVE MACHINE
    case type.UPDATE_PART_FIELDS_REQUESTED:
      return {
        ...state,
        updatePartFieldsLoading: true,
      };
    case type.UPDATE_PART_FIELDS_SUCCESS:
      return {
        ...state,
        updatePartFieldsLoading: false,
        showPartFieldsModal: false,
        searchQuery: "",
      };
    case type.UPDATE_PART_FIELDS_FAILED:
      return {
        ...state,
        updatePartFieldsLoading: false,
        updatePartFieldsError: action.message,
      };

    // DELETE A SLAVE MACHINE
    case type.DELETE_PART_FIELDS_REQUESTED:
      return {
        ...state,
        deletePartFieldsLoading: true,
      };
    case type.DELETE_PART_FIELDS_SUCCESS:
      return {
        ...state,
        deletePartFieldsLoading: false,
        showPartFieldsModal: "",
        searchQuery: "",
      };
    case type.DELETE_PART_FIELDS_FAILED:
      return {
        ...state,
        deletePartFieldsLoading: false,
        deletePartFieldsError: action.message,
      };

    // RESET THE FORM ON CLOSE MODAL
    case type.SET_PART_FIELDS_MODAL_REQUESTED:
      return {
        ...state,
        showPartFieldsModal: action.payload,
      };

    // RESET THE ERROR MESSAGES
    case type.RESET_PART_FIELDS_ERRORS_REQUESTED:
      return {
        ...state,
        addPartFieldsError: [],
      };

    // CHANGE SEARCH
    case type.CHANGE_PART_FIELDS_SEARCH_REQUESTED:
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
}
