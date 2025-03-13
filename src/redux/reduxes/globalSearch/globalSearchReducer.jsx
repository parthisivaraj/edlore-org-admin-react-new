import * as type from './types';

const initialState = {
  allSearchList: {},
  allSearchLoading: false,
  allSearchError: null,
}

export default function globalsearch(state = initialState, action) {
  switch (action.type) {
    // Get all Search
    case type.GET_ALL_SEARCH_REQUESTED:
      return {
        ...state,
        allSearchLoading: true,
      }
    case type.GET_ALL_SEARCH_SUCCESS:
      return {
        ...state,
        allSearchLoading: false,
        allSearchList: action.all,
      }
    case type.GET_ALL_SEARCH_FAILED:
      return {
        ...state,
        allSearchLoading: false,
        allSearchError: action.message,
      }

    default:
      return state;
  }
}