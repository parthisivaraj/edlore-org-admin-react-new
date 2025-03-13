import * as type from './types';

const initialState = {
  // Get all Safety Measures
  safetyMeasuresList: [],
  allSafetyMeasuresLoading: false,
  allSafetyMeasuresError: null,
  allSafetyMeasuresPagination: {},
  filters: {},
  cloning: false,
  updating: false,

  // Get all Clone Safety Measures
  cloneSafetyMeasuresList: [],
  allCloneSafetyMeasuresLoading: false,
  allCloneSafetyMeasuresError: null,
  allCloneSafetyMeasuresPagination: {},

  // Add a Safety Measure
  addSafetyMeasureLoading: false,
  addSafetyMeasureError: [],
  safetyMeasuresModal: false,

  // Safety Measure Details
  safetyMeasuresDetails: {},
  safetyMeasuresDetailsLoading: false,
  safetyMeasuresDetailsError: null,

  // Update Safety Measure
  updateSafetyMeasureLoading: false,
  updateSafetyMeasureError: null,

  // Delete Safety Measure
  deleteSafetyMeasureLoading: false,
  deleteSafetyMeasureError: null,

  // Search Query
  searchSafetyMeasuresSearch: "",
}

export default function safety_measures(state = initialState, action) {
  switch (action.type) {
    // GET ALL SAFETY MEASURES
    case type.GET_ALL_SAFETY_MEASURES_REQUESTED:
      return {
        ...state,
        allSafetyMeasuresLoading: true,
      }
    case type.GET_ALL_SAFETY_MEASURES_SUCCESS:
      return {
        ...state,
        allSafetyMeasuresLoading: false,
        safetyMeasuresList: action.safetyMeasuresList.safety_measures,
        allSafetyMeasuresPagination: action.safetyMeasuresList.pagination,
        filters: action.safetyMeasuresList.filters,
      }
    case type.GET_ALL_SAFETY_MEASURES_FAILED:
      return {
        ...state,
        allSafetyMeasuresLoading: false,
        allSafetyMeasuresError: action.message,
      }

    // GET ALL CLONE SAFETY MEASURES
    case type.GET_ALL_CLONE_SAFETY_MEASURES_REQUESTED:
      return {
        ...state,
        allCloneSafetyMeasuresLoading: true,
      }
    case type.GET_ALL_CLONE_SAFETY_MEASURES_SUCCESS:
      return {
        ...state,
        allCloneSafetyMeasuresLoading: false,
        cloneSafetyMeasuresList: action.cloneSafetyMeasuresList.safety_measures,
        allCloneSafetyMeasuresPagination: action.cloneSafetyMeasuresList.pagination,
      }
    case type.GET_ALL_CLONE_SAFETY_MEASURES_FAILED:
      return {
        ...state,
        allCloneSafetyMeasuresLoading: false,
        allCloneSafetyMeasuresError: action.message,
      }


    // ADD A SAFETY MEASURE
    case type.ADD_SAFETY_MEASURE_REQUESTED:
      return {
        ...state,
        addSafetyMeasureLoading: true,
      }
    case type.ADD_SAFETY_MEASURE_SUCCESS:
      return {
        ...state,
        addSafetyMeasureLoading: false,
        safetyMeasuresList: action.safetyMeasuresList,
        safetyMeasuresModal: false,
        cloning: false,
      }
    case type.ADD_SAFETY_MEASURE_FAILED:
      return {
        ...state,
        addSafetyMeasureLoading: false,
        addSafetyMeasureError: action.message,
      }

    // SAFETY MEASURE DETAILS
    case type.SAFETY_MEASURES_DETAILS_REQUESTED:
      return {
        ...state,
        safetyMeasuresDetailsLoading: true,
      }
    case type.SAFETY_MEASURES_DETAILS_SUCCESS:
      return {
        ...state,
        safetyMeasuresDetailsLoading: false,
        safetyMeasuresDetails: action.safetyMeasuresDetails.safety_measure,
      }
    case type.SAFETY_MEASURES_DETAILS_FAILED:
      return {
        ...state,
        safetyMeasuresDetailsLoading: false,
        safetyMeasuresDetailsError: action.message,
      }

    // UPDATE SAFETY MEASURE
    case type.UPDATE_SAFETY_MEASURE_REQUESTED:
      return {
        ...state,
        updateSafetyMeasureLoading: true,
      }
    case type.UPDATE_SAFETY_MEASURE_SUCCESS:
      return {
        ...state,
        updateSafetyMeasureLoading: false,
        safetyMeasuresModal: false,
        updating: false,
        searchSafetyMeasuresSearch: "",
      }
    case type.UPDATE_SAFETY_MEASURE_FAILED:
      return {
        ...state,
        updateSafetyMeasureLoading: false,
        updateSafetyMeasureError: action.message,
      }

    // DELETE SAFETY MEASURE
    case type.DELETE_SAFETY_MEASURE_REQUESTED:
      return {
        ...state,
        deleteSafetyMeasureLoading: true,
      }
    case type.DELETE_SAFETY_MEASURE_SUCCESS:
      return {
        ...state,
        deleteSafetyMeasureLoading: false,
        searchSafetyMeasuresSearch: "",
      }
    case type.DELETE_SAFETY_MEASURE_FAILED:
      return {
        ...state,
        deleteSafetyMeasureLoading: false,
        deleteSafetyMeasureError: action.message,
      }

    // SAFETY MEASURES MODAL
    case type.SET_SAFETY_MEASURES_MODAL:
      return {
        ...state,
        safetyMeasuresModal: action.payload,
      }

    // RESET SAFETY MEASURES ERRORS
    case type.RESET_SAFETY_MEASURES_ERRORS_REQUESTED:
      return {
        ...state,
        addSafetyMeasureError: [],
      }

    // set cloning
    case type.SET_CLONING_REQUESTED:
      return {
        ...state,
        cloning: true,
        id: action.payload.id
      }

    // set updating
    case type.SET_UPDATING_REQUESTED:
      return {
        ...state,
        updating: action.payload,
      }

    // Change Search
    case type.CHANGE_SAFETY_MEASURES_SEARCH_REQUESTED:
      return {
        ...state,
        searchSafetyMeasuresSearch: action.payload,
      }

    default:
      return state;
  }
}