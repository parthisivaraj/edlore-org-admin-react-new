import * as type from './types';

const initialState = {
  // GET ALL ASSET NOTES LIST
  allAssetNotesList: [],
  allAssetNotesLoading: false,
  allAssetNotesError: null,
  allAssetNotesPagination: {},

  // ADD AN ASSET NOTE
  addAssetNoteLoading: false,
  addAssetNoteError: [],
  showAssetNotesModal: false,

  // GET AN ASSET NOTE DETAILS
  assetNoteDetails: {},
  assetNoteDetailsLoading: false,
  assetNoteDetailsError: null,

  // UPDATE AN ASSET NOTE
  updateAssetNoteLoading: false,
  updateAssetNoteError: null,

  // DELETE AN ASSET NOTE
  deleteAssetNoteLoading: false,
  deleteAssetNoteError: null,

  // CHANGE SEARCH
  searchQuery: '',
}

export default function asset_notes(state = initialState, action) {
  switch (action.type) {
    // GET ALL ASSET NOTES
    case type.GET_ALL_ASSET_NOTES_REQUESTED:
      return {
        ...state,
        allAssetNotesLoading: true,
      }
    case type.GET_ALL_ASSET_NOTES_SUCCESS:
      return {
        ...state,
        allAssetNotesLoading: false,
        allAssetNotesList: action.allAssetNotesList.notes,
        allAssetNotesPagination: action.allAssetNotesList.pagination
      }
    case type.GET_ALL_ASSET_NOTES_FAILED:
      return {
        ...state,
        allAssetNotesLoading: false,
        allAssetNotesError: action.message,
      }

    // ADD AN ASSET NOTE
    case type.ADD_ASSET_NOTE_REQUESTED:
      return {
        ...state,
        addAssetNoteLoading: true,
      }
    case type.ADD_ASSET_NOTE_SUCCESS:
      return {
        ...state,
        addAssetNoteLoading: false,
        allAssetNotesList: action.allAssetNotesList.notes,
        showAssetNotesModal: false,
      }
    case type.ADD_ASSET_NOTE_FAILED:
      return {
        ...state,
        addAssetNoteLoading: false,
        addAssetNoteError: action.message,
      }

    // GET AN ASSET NOTE DETAILS
    case type.GET_ASSET_NOTE_DETAILS_REQUESTED:
      return {
        ...state,
        assetNoteDetailsLoading: true,
      }
    case type.GET_ASSET_NOTE_DETAILS_SUCCESS:
      return {
        ...state,
        assetNoteDetailsLoading: false,
        assetNoteDetails: action.assetNoteDetails.note,
      }
    case type.GET_ASSET_NOTE_DETAILS_FAILED:
      return {
        ...state,
        assetNoteDetailsLoading: false,
        assetNoteDetailsError: action.message,
      }

    // UPDATE AN ASSET NOTE
    case type.UPDATE_ASSET_NOTE_REQUESTED:
      return {
        ...state,
        updateAssetNoteLoading: true,
      }
    case type.UPDATE_ASSET_NOTE_SUCCESS:
      return {
        ...state,
        updateAssetNoteLoading: false,
        showAssetNotesModal: false,
        searchQuery: "",
      }
    case type.UPDATE_ASSET_NOTE_FAILED:
      return {
        ...state,
        updateAssetNoteLoading: false,
        updateAssetNoteError: action.message,
      }


    // DELETE AN ASSET NOTE
    case type.DELETE_ASSET_NOTE_REQUESTED:
      return {
        ...state,
        deleteAssetNoteLoading: true,
      }
    case type.DELETE_ASSET_NOTE_SUCCESS:
      return {
        ...state,
        deleteAssetNoteLoading: false,
        showAssetNotesModal: "",
        searchQuery: "",
      }
    case type.DELETE_ASSET_NOTE_FAILED:
      return {
        ...state,
        deleteAssetNoteLoading: false,
        deleteAssetNoteError: action.message,
      }

    // RESET THE FORM ON CLOSE MODAL
    case type.SET_ASSET_NOTES_MODAL_REQUESTED:
      return {
        ...state,
        showAssetNotesModal: action.payload,
      }

    // RESET THE ERROR MESSAGES
    case type.RESET_ASSET_NOTES_ERRORS_REQUESTED:
      return {
        ...state,
        addAssetNoteError: [],
      }

    // CHANGE SEARCH
    case type.CHANGE_ASSET_NOTES_SEARCH_REQUESTED:
      return {
        ...state,
        searchQuery: action.payload,
      }

    default:
      return state;
  }
}