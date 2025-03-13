import * as type from "./types";
const initialState = {
  // GET ALL REALISE NOTES LIST
  allRealiseNotesList: [],
  allRealiseNotesLoading: false,
  allRealiseNotesError: null,
  allRealiseNotesPagination: {},

  // ADD A REALISE NOTE
  addRealiseNoteLoading: false,
  addRealiseNoteError: [],
  showRealiseNotesModal: false,

  // GET A REALISE NOTE DETAILS
  realiseNoteDetails: {},
  realiseNoteDetailsLoading: false,
  realiseNoteDetailsError: null,

  // UPDATE A REALISE NOTE
  updateRealiseNoteLoading: false,
  updateRealiseNoteError: null,

  // DELETE A REALISE NOTE
  deleteRealiseNoteLoading: false,
  deleteRealiseNoteError: null,

  // CHANGE SEARCH
  searchQuery: "",
};

export default function realise_note(state = initialState, action) {
  switch (action.type) {
    // GET ALL REALISE NOTES
    case type.GET_ALL_REALISE_NOTE_REQUESTED:
      return {
        ...state,
        allRealiseNotesLoading: true,
      };
    case type.GET_ALL_REALISE_NOTE_SUCCESS:
      return {
        ...state,
        allRealiseNotesLoading: false,
        allRealiseNotesList: action.allRealiseNotesList.notes,
        allRealiseNotesPagination: action.allRealiseNotesList.pagination,
      };
    case type.GET_ALL_REALISE_NOTE_FAILED:
      return {
        ...state,
        allRealiseNotesLoading: false,
        allRealiseNotesError: action.message,
      };

    // ADD A REALISE NOTE
    case type.ADD_REALISE_NOTE_REQUESTED:
      return {
        ...state,
        addRealiseNoteLoading: true,
      };
    case type.ADD_REALISE_NOTE_SUCCESS:
      return {
        ...state,
        addRealiseNoteLoading: false,
        allRealiseNotesList: action.allRealiseNotesList.notes,
        showRealiseNotesModal: false,
      };
    case type.ADD_REALISE_NOTE_FAILED:
      return {
        ...state,
        addRealiseNoteLoading: false,
        addRealiseNoteError: action.message,
      };

    // GET A REALISE NOTE DETAILS
    case type.GET_REALISE_NOTE_DETAILS_REQUESTED:
      return {
        ...state,
        realiseNoteDetailsLoading: true,
      };
    case type.GET_REALISE_NOTE_DETAILS_SUCCESS:
      return {
        ...state,
        realiseNoteDetailsLoading: false,
        realiseNoteDetails: action.realiseNoteDetails.note,
      };
    case type.GET_REALISE_NOTE_DETAILS_FAILED:
      return {
        ...state,
        realiseNoteDetailsLoading: false,
        realiseNoteDetailsError: action.message,
      };

    // UPDATE A REALISE NOTE
    case type.UPDATE_REALISE_NOTE_REQUESTED:
      return {
        ...state,
        updateRealiseNoteLoading: true,
      };
    case type.UPDATE_REALISE_NOTE_SUCCESS:
      return {
        ...state,
        updateRealiseNoteLoading: false,
        showRealiseNotesModal: false,
        searchQuery: "",
      };
    case type.UPDATE_REALISE_NOTE_FAILED:
      return {
        ...state,
        updateRealiseNoteLoading: false,
        updateRealiseNoteError: action.message,
      };

    // DELETE A REALISE NOTE
    case type.DELETE_REALISE_NOTE_REQUESTED:
      return {
        ...state,
        deleteRealiseNoteLoading: true,
      };
    case type.DELETE_REALISE_NOTE_SUCCESS:
      return {
        ...state,
        deleteRealiseNoteLoading: false,
        showRealiseNotesModal: "",
        searchQuery: "",
      };
    case type.DELETE_REALISE_NOTE_FAILED:
      return {
        ...state,
        deleteRealiseNoteLoading: false,
        deleteRealiseNoteError: action.message,
      };

    // RESET THE FORM ON CLOSE MODAL
    case type.SET_REALISE_NOTE_MODAL_REQUESTED:
      return {
        ...state,
        showRealiseNotesModal: action.payload,
      };

    // RESET THE ERROR MESSAGES
    case type.RESET_REALISE_NOTE_ERRORS_REQUESTED:
      return {
        ...state,
        addRealiseNoteError: [],
      };

    // CHANGE SEARCH
    case type.CHANGE_REALISE_NOTE_SEARCH_REQUESTED:
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
}
