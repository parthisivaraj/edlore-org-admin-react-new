import * as type from "./types";

const initialState = {
  // All Medias
  allMedias: [],
  allMediasPagination: {},
  allMediasLoading: false,
  allMediasError: null,
  filters: {},

  // Update Media
  updateMediaLoading: false,
  updateMediaError: null,

  // Delete Media
  deleteMediaLoading: false,
  deleteMediaError: null,

  // Change Search
  searchMediaQuery: "",
};

export default function medias(state = initialState, action) {
  switch (action.type) {
    // GET ALL MEDIAS  ==========================
    case type.ALL_MEDIAS_REQUESTED:
      return {
        ...state,
        allMediasLoading: true,
      };
    case type.ALL_MEDIAS_SUCCESS:
      return {
        ...state,
        allMediasLoading: false,
        allMedias: action.data.infinite
          ? [...(state.allMedias || []), ...action.data.medias]
          : action.data.medias,
        allMediasPagination: action.data.pagination,
        filters: action.data.filters,
      };
    case type.ALL_MEDIAS_FAILED:
      return {
        ...state,
        allMediasLoading: false,
        allMediasError: action.message,
      };

    // UPDATE MEDIA ================================
    case type.UPDATE_MEDIA_REQUESTED:
      return {
        ...state,
        updateMediaLoading: true,
      };
    case type.UPDATE_MEDIA_SUCCESS:
      return {
        ...state,
        updateMediaLoading: false,
        searchMediaQuery: "",
      };
    case type.UPDATE_MEDIA_FAILED:
      return {
        ...state,
        updateMediaLoading: false,
        updateMediaError: action.message,
      };

    // DELETE MEDIA ==================================
    case type.DELETE_MEDIA_REQUESTED:
      return {
        ...state,
        deleteMediaLoading: true,
      };
    case type.DELETE_MEDIA_SUCCESS:
      return {
        ...state,
        deleteMediaLoading: false,
        searchMediaQuery: "",
      };
    case type.DELETE_MEDIA_FAILED:
      return {
        ...state,
        deleteMediaLoading: false,
        deleteMediaError: action.message,
      };

    // Change Search
    case type.CHANGE_MEDIA_SEARCH_REQUESTED:
      return {
        ...state,
        searchMediaQuery: action.payload,
      };

    default:
      return state;
  }
}
