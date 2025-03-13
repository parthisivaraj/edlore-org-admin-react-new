import * as type from "./types";

const initialState = {
  // Get all Anaglyphs
  anaglyph: false,
  anaglyphList: {},
  allAnaglyphLoading: false,
  allAnaglyphError: null,
  allAnaglyphPagination: {},

  // Add an Anaglyph
  addAnaglyphLoading: false,
  addAnaglyphError: [],
  setShowAnaglyphModal: false,

  // Anaglyph Details
  anaglyphDetails: {},
  anaglyphDetailsLoading: false,
  anaglyphDetailsError: null,

  // Update an Anaglyph
  updateAnaglyphLoading: false,
  updateAnaglyphError: null,

  // Delete an Anaglyph
  deleteAnaglyphLoading: false,
  deleteAnaglyphError: null,

  // Search Query
  searchAnaglyphQuery: "",

  // =========== PART =================

  // Get all Parts
  allPartsList: [],
  allPartsLoading: false,
  allPartsError: null,
  allPartsPagination: {},

  // Add a Part
  addPartLoading: false,
  addPartError: null,

  // Part Details
  partDetails: {},
  partDetailsLoading: false,
  partDetailsError: null,

  // Update a Part
  updatePartLoading: false,
  updatePartError: null,

  // Delete a Part
  deletePartLoading: false,
  deletePartError: null,

  // Delete All Parts
  deleteAllPartsLoading: false,
  deleteAllPartsError: null,

  // Update Purchase URL
  updatePurchaseUrlLoading: false,
  updatePurchaseUrlError: null,

  // unlink anaglyph
  unlinkAnaglyphLoading: false,
  unlinkAnaglyphError: null,

  // Search Query
  searchPartsQuery: "",

  // ======== PART NOTES ==========

  // Get all Part Notes
  allPartNotesList: [],
  allPartNotesLoading: false,
  allPartNotesError: null,
  allPartNotesPagination: {},

  // Create a Note for a Part
  addPartNoteLoading: false,
  addPartNoteError: null,

  // Get a Note Details of a Part
  partNoteDetails: {},
  partNoteDetailsLoading: false,
  partNoteDetailsError: null,

  // Update a Note of a Part
  updatePartNoteLoading: false,
  updatePartNoteError: null,

  // Delete a Note of a Part
  deletePartNoteLoading: false,
  deletePartNoteError: null,

  // Search Query
  searchPartNotesQuery: "",

  // ======== CSV UPLOAD ==========

  // upload csv anaglyph
  csvPartUplaoadAnaglyphLoading: false,
  csvPartUplaoadAnaglyphError: "",
  uploadCsvUrlModal: false,
  uploadCsvMediaModal: false,

  // uploading CSV part anaglyph
  csvUploadAvailable: false,
  uploadingCsvsStatus: {},
  getUploadingCsvLoading: false,
  getUploadingCsvError: "",
  showCsvUploadButton: true,

  // update anaglyph thumbnail
  updateAnaglyphThumbnailLoading: false,
  updateAnaglyphThumbnailError: "",
  thumbnailUpdateModel: false,
  deleteAnaglyphThumbnailLoading: false,
  deleteAnaglyphThumbnailError: "",
};

export default function anaglyph(state = initialState, action) {
  switch (action.type) {
    // Get all Anaglyphs
    case type.GET_ALL_ANAGLYPH_REQUESTED:
      return {
        ...state,
        allAnaglyphLoading: true,
      };
    case type.GET_ALL_ANAGLYPH_SUCCESS:
      return {
        ...state,
        allAnaglyphLoading: false,
        anaglyphList: action.anaglyphList.anaglyph,
        allAnaglyphPagination: action.anaglyphList.pagination,
      };
    case type.GET_ALL_ANAGLYPH_FAILED:
      return {
        ...state,
        allAnaglyphLoading: false,
        allAnaglyphError: action.message,
        anaglyphList: false,
      };

    // Add an Anaglyph
    case type.ADD_ANAGLYPH_REQUESTED:
      return {
        ...state,
        addAnaglyphLoading: true,
      };
    case type.ADD_ANAGLYPH_SUCCESS:
      return {
        ...state,
        addAnaglyphLoading: false,
        anaglyphList: action.anaglyphList.anaglyph,
        setShowAnaglyphModal: false,
      };
    case type.ADD_ANAGLYPH_FAILED:
      return {
        ...state,
        addAnaglyphLoading: false,
        addAnaglyphError: action.message,
      };

    // Get an Anaglyph Details
    case type.ANAGLYPH_DETAILS_REQUESTED:
      return {
        ...state,
        anaglyphDetailsLoading: true,
      };
    case type.ANAGLYPH_DETAILS_SUCCESS:
      return {
        ...state,
        anaglyphDetailsLoading: false,
        anaglyphDetails: action.anaglyphDetails.anaglyph,
      };
    case type.ANAGLYPH_DETAILS_FAILED:
      return {
        ...state,
        anaglyphDetailsLoading: false,
        anaglyphDetailsError: action.message,
      };

    // Update an Anaglyph
    case type.UPDATE_ANAGLYPH_REQUESTED:
      return {
        ...state,
        updateAnaglyphLoading: true,
      };
    case type.UPDATE_ANAGLYPH_SUCCESS:
      return {
        ...state,
        updateAnaglyphLoading: false,
        anaglyphList: action.anaglyphList,
        searchAnaglyphQuery: "",
        setShowAnaglyphModal: false,
      };
    case type.UPDATE_ANAGLYPH_FAILED:
      return {
        ...state,
        updateAnaglyphLoading: false,
        addAnaglyphError: action.message,
      };

    // Update purchase URL
    case type.UPDATE_PURCHSE_URL_REQUESTED:
      return {
        ...state,
        updatePurchaseUrlLoading: true,
      };
    case type.UPDATE_PURCHSE_URL_SUCCESS:
      return {
        ...state,
        updatePurchaseUrlLoading: false,
      };
    case type.UPDATE_PURCHSE_URL_FAILED:
      return {
        ...state,
        updatePurchaseUrlLoading: false,
        updatePurchaseUrlError: action.message,
      };

    // Delete an Anaglyph
    case type.DELETE_ANAGLYPH_REQUESTED:
      return {
        ...state,
        deleteAnaglyphLoading: true,
      };
    case type.DELETE_ANAGLYPH_SUCCESS:
      return {
        ...state,
        deleteAnaglyphLoading: false,
        searchAnaglyphQuery: "",
      };
    case type.DELETE_ANAGLYPH_FAILED:
      return {
        ...state,
        deleteAnaglyphLoading: false,
        deleteAnaglyphError: action.message,
      };

    // Change Search
    case type.CHANGE_ANAGLYPH_SEARCH_REQUESTED:
      return {
        ...state,
        searchAnaglyphQuery: action.payload,
      };

    // ===================== PARTS ============================

    // Get All Parts
    case type.GET_ALL_PARTS_REQUESTED:
      return {
        ...state,
        allPartsLoading: true,
      };
    case type.GET_ALL_PARTS_SUCCESS:
      return {
        ...state,
        allPartsLoading: false,
        allPartsList: action.allPartsList.parts,
        allPartsPagination: action.allPartsList.pagination,
      };
    case type.GET_ALL_PARTS_FAILED:
      return {
        ...state,
        allPartsLoading: false,
        allPartsError: action.message,
      };

    // Add a Part
    case type.ADD_PART_REQUESTED:
      return {
        ...state,
        addPartLoading: true,
      };
    case type.ADD_PART_SUCCESS:
      return {
        ...state,
        addPartLoading: false,
        allPartsList: action.allPartsList.parts,
      };
    case type.ADD_PART_FAILED:
      return {
        ...state,
        addPartLoading: false,
        addPartError: action.message,
      };

    // Get a Part Details
    case type.PART_DETAILS_REQUESTED:
      return {
        ...state,
        partDetailsLoading: true,
      };
    case type.PART_DETAILS_SUCCESS:
      return {
        ...state,
        partDetailsLoading: false,
        partDetails: action.partDetails.part,
      };
    case type.PART_DETAILS_FAILED:
      return {
        ...state,
        partDetailsLoading: false,
        partDetailsError: action.message,
      };

    // Update a Part
    case type.UPDATE_PART_REQUESTED:
      return {
        ...state,
        updatePartLoading: true,
      };
    case type.UPDATE_PART_SUCCESS:
      return {
        ...state,
        updatePartLoading: false,
        searchPartsQuery: "",
      };
    case type.UPDATE_PART_FAILED:
      return {
        ...state,
        updatePartLoading: false,
        updatePartError: action.message,
      };

    // Delete a Part
    case type.DELETE_PART_REQUESTED:
      return {
        ...state,
        deletePartLoading: true,
      };
    case type.DELETE_PART_SUCCESS:
      return {
        ...state,
        deletePartLoading: false,
        searchPartsQuery: "",
      };
    case type.DELETE_PART_FAILED:
      return {
        ...state,
        deletePartLoading: false,
        deletePartError: action.message,
      };

    // Delete All Parts
    case type.DELETE_ALL_PARTS_REQUESTED:
      return {
        ...state,
        deleteAllPartsLoading: true,
      };
    case type.DELETE_ALL_PARTS_SUCCESS:
      return {
        ...state,
        deleteAllPartsLoading: false,
      };
    case type.DELETE_ALL_PARTS_FAILED:
      return {
        ...state,
        deleteAllPartsLoading: false,
        deleteAllPartsError: action.message,
      };

    // Change Search
    case type.CHANGE_PARTS_SEARCH_REQUESTED:
      return {
        ...state,
        searchPartsQuery: action.payload,
      };

    // ================ PART NOTES ==========================

    // Get all Notes of a Part
    case type.GET_ALL_PART_NOTES_REQUESTED:
      return {
        ...state,
        allPartNotesLoading: true,
      };
    case type.GET_ALL_PART_NOTES_SUCCESS:
      return {
        ...state,
        allPartNotesLoading: false,
        allPartNotesList: action.allPartNotesList.notes,
        allPartNotesPagination: action.allPartNotesList.pagination,
      };
    case type.GET_ALL_PART_NOTES_FAILED:
      return {
        ...state,
        allPartNotesLoading: false,
        allPartNotesError: action.message,
      };

    // Create a Note for a Part
    case type.ADD_PART_NOTE_REQUESTED:
      return {
        ...state,
        addPartNoteLoading: true,
      };
    case type.ADD_PART_NOTE_SUCCESS:
      return {
        ...state,
        addPartNoteLoading: false,
      };
    case type.ADD_PART_NOTE_FAILED:
      return {
        ...state,
        addPartNoteLoading: false,
        addPartNoteError: action.message,
      };

    // Get Note Details of a Part
    case type.GET_PART_NOTE_DETAILS_REQUESTED:
      return {
        ...state,
        partNoteDetailsLoading: true,
      };
    case type.GET_PART_NOTE_DETAILS_SUCCESS:
      return {
        ...state,
        partNoteDetailsLoading: false,
        partNoteDetails: action.partNoteDetails.note,
      };
    case type.GET_PART_NOTE_DETAILS_FAILED:
      return {
        ...state,
        partNoteDetailsLoading: false,
        partNoteDetailsError: action.message,
      };

    // Update a Note of a Part
    case type.UPDATE_PART_NOTE_REQUESTED:
      return {
        ...state,
        updatePartLoading: true,
      };
    case type.UPDATE_PART_NOTE_SUCCESS:
      return {
        ...state,
        updatePartNoteLoading: false,
        searchPartNotesQuery: "",
      };
    case type.UPDATE_PART_NOTE_FAILED:
      return {
        ...state,
        updatePartNoteLoading: false,
        updatePartNoteError: action.message,
      };

    // Delete Part of a Note
    case type.DELETE_PART_NOTE_REQUESTED:
      return {
        ...state,
        deletePartLoading: true,
      };
    case type.DELETE_PART_NOTE_SUCCESS:
      return {
        ...state,
        deletePartNoteLoading: false,
        searchPartNotesQuery: "",
      };
    case type.DELETE_PART_NOTE_FAILED:
      return {
        ...state,
        deletePartNoteLoading: false,
        deletePartNoteError: action.message,
      };

    // Change Search
    case type.CHANGE_PART_NOTES_SEARCH_REQUESTED:
      return {
        ...state,
        searchPartNotesQuery: action.payload,
      };

    // ============== CSV UPLOAD ============================

    // CSV Part Upload
    case type.CSV_PART_UPLOAD_REQUESTED:
      return {
        ...state,
        csvPartUplaoadAnaglyphLoading: true,
      };
    case type.CSV_PART_UPLOAD_SUCCESS:
      return {
        ...state,
        csvPartUplaoadAnaglyphLoading: false,
        uploadCsvUrlModal: false,
        uploadCsvMediaModal: false,
      };
    case type.CSV_PART_UPLOAD_FAILED:
      return {
        ...state,
        csvPartUplaoadAnaglyphLoading: false,
        csvPartUplaoadAnaglyphError: action.message,
      };

    // UPLOADING CSV PARTS
    case type.GET_UPLOADING_CSV_PARTS_REQUESTED:
      return {
        ...state,
        getUploadingCsvLoading: true,
      };
    case type.GET_UPLOADING_CSV_PARTS_SUCCESS:
      return {
        ...state,
        getUploadingCsvLoading: false,
        uploadingCsvsStatus: action.data,
        csvUploadAvailable: true,
        showCsvUploadButton: action.data.completed,
      };
    case type.GET_UPLOADING_CSV_PARTS_FAILED:
      return {
        ...state,
        getUploadingCsvLoading: false,
        getUploadingCsvError: action.message,
        csvUploadAvailable: false,
        showCsvUploadButton: true,
      };

    // SET SHOW ANAGLYPH MODAL
    case type.SET_SHOW_ANAGLYPH_MODAL:
      return {
        ...state,
        setShowAnaglyphModal: action.payload,
      };

    // Update anaglyph thumbnail
    case type.UPDATE_THUMBNAIL_REQUESTED:
      return {
        ...state,
        updateAnaglyphThumbnailLoading: true,
      };
    case type.UPDATE_THUMBNAIL_SUCCESS:
      return {
        ...state,
        updateAnaglyphThumbnailLoading: false,
        thumbnailUpdateModel: false,
      };
    case type.UPDATE_THUMBNAIL_FAILED:
      return {
        ...state,
        updateAnaglyphThumbnailLoading: false,
        updateAnaglyphThumbnailError: action.message,
      };

    // Delete anaglyph thumbnail
    case type.DELETE_THUMBNAIL_REQUESTED:
      return {
        ...state,
        deleteAnaglyphThumbnailLoading: true,
      };
    case type.DELETE_THUMBNAIL_SUCCESS:
      return {
        ...state,
        deleteAnaglyphThumbnailLoading: false,
      };
    case type.DELETE_THUMBNAIL_FAILED:
      return {
        ...state,
        deleteAnaglyphThumbnailLoading: false,
        deleteAnaglyphThumbnailError: action.message,
      };

    // RESET ERROR MESSAGES
    case type.RESET_ERRORS_REQUESTED:
      return {
        ...state,
        getUploadingCsvError: "",
        csvPartUplaoadAnaglyphError: "",
        addAnaglyphError: [],
      };

    // upload csv pdf modal
    case type.SET_CSV_UPLOAD_URL_MODAL:
      return {
        ...state,
        uploadCsvUrlModal: action.payload,
      };
    // upload thumbnail modal
    case type.SET_THUMBNAIL_UPDATE_MODAL_REQUESTED:
      return {
        ...state,
        thumbnailUpdateModel: action.payload,
      };
    // upload csv MEDIA modal
    case type.SET_CSV_UPLOAD_MEDIA_MODAL:
      return {
        ...state,
        uploadCsvMediaModal: action.payload,
      };
    default:
      return state;
  }
}
