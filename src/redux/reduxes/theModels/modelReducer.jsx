import * as type from './types';

const initialState = {
  createModelsLoading: false,
  createModelsError: [],
  modelPopup: false,

  //====================== update model
  updateModelsLoading: false,
  updateModelsError: [],

  //------------------------
  allModels: {},
  allModelsPagination: {},
  allModelsLoading: false,
  allModelsError: null,
  allModelsFilters: {},

  //------------------------
  modelDetails: {},
  modelDetailsLoading: false,
  modelDetailsError: null,

  //------------------------
  modelDevices: [],
  modelDevicesPagination: {},
  modelDevicesLoading: false,
  modelDevicesError: null,
  filters: {},

  //------------------------
  deleteModelsLoading: false,
  deleteModelsError: null,

  //------------------------
  searchModelsQuery: "",
}

export default function models(state = initialState, action) {
  switch (action.type) {
    //---------------------------------------------- ALL MODELS
    case type.GET_ALL_MODELS_REQUESTED:
      return {
        ...state,
        allModelsLoading: true,
      }
    case type.GET_ALL_MODELS_SUCCESS:
      return {
        ...state,
        allModelsLoading: false,
        allModels: action.allModels.models,
        allModelsPagination: action.allModels.pagination,
        allModelsFilters: action.allModels.filters,
      }
    case type.GET_ALL_MODELS_FAILED:
      return {
        ...state,
        allModelsLoading: false,
        allModelsError: action.message,
      }
    //---------------------------------------------- CREATE MODEL
    case type.CREATE_MODEL_REQUESTED:
      return {
        ...state,
        createModelsLoading: true,
      }
    case type.CREATE_MODEL_SUCCESS:
      return {
        ...state,
        createModelsLoading: false,
        modelPopup: false,
      }
    case type.CREATE_MODEL_FAILED:
      return {
        ...state,
        createModelsLoading: false,
        createModelsError: action.message,
      }

    //---------------------------------------------- Update MODEL
    case type.UPDATE_MODEL_REQUESTED:
      return {
        ...state,
        updateModelsLoading: true,
      }
    case type.UPDATE_MODEL_SUCCESS:
      return {
        ...state,
        updateModelsLoading: false,
        modelPopup: false,
      }
    case type.UPDATE_MODEL_FAILED:
      return {
        ...state,
        updateModelsLoading: false,
        updateModelsError: action.message,
      }

    //---------------------------------------------- MODEL DETAILS
    case type.MODEL_DETAILS_REQUESTED:
      return {
        ...state,
        modelDetailsLoading: true,
      }
    case type.MODEL_DETAILS_SUCCESS:
      return {
        ...state,
        modelDetails: action.modalDetails,
        modelDetailsLoading: false
      }
    case type.MODEL_DETAILS_FAILED:
      return {
        ...state,
        modelDetailsLoading: false,
        modelDetailsError: action.message,
      }

    //---------------------------------------------- MODEL devices
    case type.MODEL_DEVICES_REQUESTED:
      return {
        ...state,
        modelDevicesLoading: true,
      }
    case type.MODEL_DEVICES_SUCCESS:
      return {
        ...state,
        modelDevices: action.modelDevices.devices,
        modelDevicesPagination: action.modelDevices.pagination,
        modelDevicesLoading: false,
        filters: action.modelDevices.filters,
      }
    case type.MODEL_DEVICES_FAILED:
      return {
        ...state,
        modelDevicesLoading: false,
        modelDevicesError: action.message,
      }
    //---------------------------------------------- DELETE MODEL
    case type.DELETE_MODEL_REQUESTED:
      return {
        ...state,
        deleteModelsLoading: true,
      }
    case type.DELETE_MODEL_SUCCESS:
      return {
        ...state,
        deleteModelsLoading: false,
        searchModelsQuery: "",
      }
    case type.DELETE_MODEL_FAILED:
      return {
        ...state,
        deleteModelsLoading: false,
        deleteModelsError: action.message,
      }

    // --------------------------------- MODEL POPUP
    case type.SET_MODEL_MODAL:
      return {
        ...state,
        modelPopup: action.payload,
      }

    // ------------------------------ RESET ERROR MESSAGES
    case type.RESET_MODEL_ERRORS_REQUESTED:
      return {
        ...state,
        createModelsError: [],
      }

    // CHANGE SEARCH
    case type.CHANGE_MODELS_SEARCH_REQUESTED:
      return {
        ...state,
        searchModelsQuery: action.payload,
      }

    default:
      return state
  }
}