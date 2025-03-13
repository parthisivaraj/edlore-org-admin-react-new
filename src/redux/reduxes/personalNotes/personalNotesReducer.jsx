import * as type from "./types";

const initialState = {
  // Get All Notes
  allPersonalNotesList: [],
  allPersonalNotesLoading: false,
  allPersonalNotesError: null,
  allPersonalNotesPagination: {},

  // Create a Note
  createPersonalNoteLoading: false,
  createPersonalNoteError: [],
  showPersonalNotesModal: false,

  // Get Note Details
  personalNoteDetails: {},
  personalNoteDetailsLoading: false,
  personalNoteDetailsError: null,

  // Update a Note
  updatePersonalNoteLoading: false,
  updatePersonalNoteError: null,

  // Delete a Note
  deletePersonalNoteLoading: false,
  deletePersonalNoteError: null,

  // Change Search
  searchPersonalNotesQuery: "",
};

export default function notes(state = initialState, action) {
  switch (action.type) {
    // GET ALL NOTES
    case type.GET_ALL_PERSONAL_NOTES_REQUESTED:
      return {
        ...state,
        allPersonalNotesLoading: true,
      };
    case type.GET_ALL_PERSONAL_NOTES_SUCCESS:
      return {
        ...state,
        allPersonalNotesLoading: false,
        allPersonalNotesList: action.allPersonalNotesList.Notes,
        allPersonalNotesPagination: action.allPersonalNotesList.pagination,
      };
    case type.GET_ALL_PERSONAL_NOTES_FAILED:
      return {
        ...state,
        allPersonalNotesLoading: false,
        allPersonalNotesError: action.message,
      };

    // CREATE A NOTE
    case type.CREATE_PERSONAL_NOTE_REQUESTED:
      return {
        ...state,
        createPersonalNoteLoading: true,
      };
    case type.CREATE_PERSONAL_NOTE_SUCCESS:
      return {
        ...state,
        createPersonalNoteLoading: false,
        allPersonalNotesList: action.allPersonalNotesList,
        showPersonalNotesModal: false,
      };
    case type.CREATE_PERSONAL_NOTE_FAILED:
      return {
        ...state,
        createPersonalNoteLoading: false,
        createPersonalNoteError: action.message,
      };

    // GET NOTE DETAILS
    case type.GET_PERSONAL_NOTE_DETAILS_REQUESTED:
      return {
        ...state,
        personalNoteDetailsLoading: true,
      };
    case type.GET_PERSONAL_NOTE_DETAILS_SUCCESS:
      return {
        ...state,
        personalNoteDetailsLoading: false,
        personalNoteDetails: action.personalNoteDetails.note,
      };
    case type.GET_PERSONAL_NOTE_DETAILS_FAILED:
      return {
        ...state,
        personalNoteDetailsLoading: false,
        personalNoteDetailsError: action.message,
      };

    // UPDATE A NOTE
    case type.UPDATE_PERSONAL_NOTE_REQUESTED:
      return {
        ...state,
        updatePersonalNoteLoading: true,
      };
    case type.UPDATE_PERSONAL_NOTE_SUCCESS:
      return {
        ...state,
        updatePersonalNoteLoading: false,
        showPersonalNotesModal: false,
        searchPersonalNotesQuery: "",
      };
    case type.UPDATE_PERSONAL_NOTE_FAILED:
      return {
        ...state,
        updatePersonalNoteLoading: false,
        updatePersonalNoteError: action.message,
      };

    // DELETE A NOTE
    case type.DELETE_PERSONAL_NOTE_REQUESTED:
      return {
        ...state,
        deletePersonalNoteLoading: true,
      };
    case type.DELETE_PEROSNAL_NOTE_SUCCESS:
      return {
        ...state,
        deletePersonalNoteLoading: false,
        searchPersonalNotesQuery: "",
      };
    case type.DELETE_PERSONAL_NOTE_FAILED:
      return {
        ...state,
        deletePersonalNoteLoading: false,
        deletePersonalNoteError: action.message,
      };

    // RESET THE FORM ON CLOSE MODAL
    case type.SET_PERSONAL_NOTES_MODAL_REQUESTED:
      return {
        ...state,
        showPersonalNotesModal: action.payload,
      };

    // RESET THE ERROR MESSAGES
    case type.RESET_PERSONAL_NOTES_ERROR_REQUESTED:
      return {
        ...state,
        createPersonalNoteError: [],
      };

    // CHANGE SEARCH
    case type.CHANGE_PERSONAL_NOTES_SEARCH_REQUESTED:
      return {
        ...state,
        searchPersonalNotesQuery: action.payload,
      };

    default:
      return state;
  }
}
