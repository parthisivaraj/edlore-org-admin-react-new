import * as type from './/types';

const initialState = {
  // error_codes = 1 ===========

  // Get all eCodes
  errorCodesList: [],
  errorCodesLoading: false,
  errorCodesError: null,
  errorCodesPagination: {},
  errorCodesFilters: {},

  // Add an eCode
  addErrorCodeLoading: false,
  addErrorCodeError: [],
  errorCodeModal: false,
  errorCodeType: "",
  errorCodeId: "",

  // eCode Details
  errorCodeDetails: {},
  errorCodeDetailsLoading: false,
  errorCodeDetailsError: null,

  // Update an eCode
  updateErrorCodeLoading: false,
  updateErrorCodeError: null,

  // Delete an eCode
  deleteErrorCodeLoading: false,
  deleteErrorCodeError: null,

  // mcodes = 2 =============

  // Get all mCodes
  mCodesList: [],
  mCodesLoading: false,
  mCodesError: null,
  mCodesPagination: {},
  mCodesFilters: {},

  // alarm_codes = 3 ===========

  // Get all aCodes
  alarmCodesList: [],
  alarmCodesLoading: false,
  alarmCodesError: null,
  alarmCodesPagination: {},
  alarmCodesFilters: {},


  // Get All Procedures for Error Codes
  proceduresList: [],
  allProceduresLoading: false,
  allProceduresError: null,

  // get al linked device
  linkedErrorCodeListingLoading: false,
  linkedErrorCodeListingError: null,

  //get all linked procedure to error
  linkedProcedureList: [],
  linkedProcedureListLoading: false,
  linkedProcedureListError: null,
  linkedProcedureListPagination: {},

  //get all linked TS to error
  linkedTroubleshootList: [],
  linkedTroubleshootListLoading: false,
  linkedTroubleshootListError: null,
  linkedTroubleshootListPagination: {},

  // Search Query
  searchErrorCodesQuery: "",
  searchAlarmCodesQuery: "",
  searchMCodesQuery: "",
}

export default function error_codes(state = initialState, action) {
  switch (action.type) {
    // ERROR CODES ======= error_type: error_codes = 1 ====================
    //  GET ALL ERROR CODES
    case type.GET_ALL_ERROR_CODES_REQUESTED:
      return {
        ...state,
        errorCodesLoading: true,
      }
    case type.GET_ALL_ERROR_CODES_SUCCESS:
      return {
        ...state,
        errorCodesLoading: false,
        errorCodesList: action.errorCodesList.errors,
        errorCodesPagination: action.errorCodesList.pagination,
        errorCodesFilters: action.errorCodesList.filters,
      }
    case type.GET_ALL_ERROR_CODES_FAILED:
      return {
        ...state,
        errorCodesLoading: false,
        errorCodesError: action.message,
      }

    // ADD AN ERROR CODE
    case type.ADD_ERROR_CODE_REQUESTED:
      return {
        ...state,
        addErrorCodeLoading: true,
      }
    case type.ADD_ERROR_CODE_SUCCESS:
      return {
        ...state,
        addErrorCodeLoading: false,
        // errorCodesList: action.errorCodesList,
        errorCodeModal: false,
      }
    case type.ADD_ERROR_CODE_FAILED:
      return {
        ...state,
        addErrorCodeLoading: false,
        addErrorCodeError: action.message,
      }

    // ERROR & ALARM CODE DETAILS
    case type.ERROR_CODE_DETAILS_REQUESTED:
      return {
        ...state,
        errorCodeDetailsLoading: true,
      }
    case type.ERROR_CODE_DETAILS_SUCCESS:
      return {
        ...state,
        errorCodeDetailsLoading: false,
        errorCodeDetails: action.errorCodeDetails.error,
      }
    case type.ERROR_CODE_DETAILS_FAILED:
      return {
        ...state,
        errorCodeDetailsLoading: false,
        errorCodeDetailsError: action.message,
      }

    // UPDATE AN ERROR CODE
    case type.UPDATE_ERROR_CODE_REQUESTED:
      return {
        ...state,
        updateErrorCodeLoading: true,
      }
    case type.UPDATE_ERROR_CODE_SUCCESS:
      return {
        ...state,
        updateErrorCodeLoading: false,
        errorCodeModal: false,
        searchErrorCodesQuery: "",
      }
    case type.UPDATE_ERROR_CODE_FAILED:
      return {
        ...state,
        updateErrorCodeLoading: false,
        addErrorCodeError: action.message,
      }

    // DELETE AN ERROR CODE
    case type.DELETE_ERROR_CODE_REQUESTED:
      return {
        ...state,
        deleteErrorCodeLoading: true,
      }
    case type.DELETE_ERROR_CODE_SUCCESS:
      return {
        ...state,
        deleteErrorCodeLoading: false,
        searchErrorCodesQuery: "",
      }
    case type.DELETE_ERROR_CODE_FAILED:
      return {
        ...state,
        deleteErrorCodeLoading: false,
        deleteErrorCodeError: action.message,
      }


    // mCODES ======= error_type: mCode = 2 ====================

    // GET ALL mCODES
    case type.GET_ALL_MCODES_REQUESTED:
      return {
        ...state,
        mCodesLoading: true,
      }
    case type.GET_ALL_MCODES_SUCCESS:
      return {
        ...state,
        mCodesLoading: false,
        mCodesList: action.mCodesList.errors,
        mCodesPagination: action.mCodesList.pagination,
        mCodesFilters: action.mCodesList.filters,
      }
    case type.GET_ALL_MCODES_FAILED:
      return {
        ...state,
        mCodesLoading: false,
        mCodesError: action.message,
      }



    // ALARM CODES ======= error_type: alarm_codes = 3 ====================

    // GET ALL ALARM CODES
    case type.GET_ALL_ALARM_CODES_REQUESTED:
      return {
        ...state,
        alarmCodesLoading: true,
      }
    case type.GET_ALL_ALARM_CODES_SUCCESS:
      return {
        ...state,
        alarmCodesLoading: false,
        alarmCodesList: action.alarmCodesList.errors,
        alarmCodesPagination: action.alarmCodesList.pagination,
        alarmCodesFilters: action.alarmCodesList.filters,
      }
    case type.GET_ALL_ALARM_CODES_FAILED:
      return {
        ...state,
        alarmCodesLoading: false,
        alarmCodesError: action.message,
      }



    // GET ALL ERROR CODE PROCEDURES =========================
    case type.GET_ALL_EC_PROCEDURES_REQUESTED:
      return {
        ...state,
        allProceduresLoading: true,
      }
    case type.GET_ALL_EC_PROCEDURES_SUCCESS:
      return {
        ...state,
        allProceduresLoading: false,
        proceduresList: action.proceduresList.procedures,
      }
    case type.GET_ALL_EC_PROCEDURES_FAILED:
      return {
        ...state,
        allProceduresLoading: false,
        allProceduresError: action.message,
      }

    // GET ALL ERROR CODE PROCEDURES =========================
    case type.GET_ALL_ERROR_CODE_LISTING_LINK_REQUESTED:
      return {
        ...state,
        linkedErrorCodeListingLoading: true,
      }
    case type.GET_ALL_ERROR_CODE_LISTING_LINK_SUCCESS:
      return {
        ...state,
        linkedErrorCodeListingLoading: false,
      }
    case type.GET_ALL_ERROR_CODE_LISTING_LINK_FAILED:
      return {
        ...state,
        linkedErrorCodeListingLoading: false,
        linkedErrorCodeListingError: action.message,
      }

    // GET ALL ERROR CODE LINKED TROUBLESHOOT =========================
    case type.GET_ALL_TROUBLESHOOT_LINKED_TO_ERROR_REQUESTED:
      return {
        ...state,
        linkedTroubleshootListLoading: true,
      }
    case type.GET_ALL_TROUBLESHOOT_LINKED_TO_ERROR_SUCCESS:
      return {
        ...state,
        linkedTroubleshootList: action.linkedTroubleshootList,
        linkedTroubleshootListLoading: false,
        linkedTroubleshootListPagination: action.linkedTroubleshootList.pagination,
      }
    case type.GET_ALL_TROUBLESHOOT_LINKED_TO_ERROR_FAILED:
      return {
        ...state,
        linkedTroubleshootListLoading: false,
        linkedProcedureListError: action.message,
      }

    // GET ALL ERROR CODE LINKED PROCEDURES =========================
    case type.GET_ALL_PROCEDURE_LINKED_TO_ERROR_REQUESTED:
      return {
        ...state,
        linkedProcedureListLoading: true,
      }
    case type.GET_ALL_PROCEDURE_LINKED_TO_ERROR_SUCCESS:
      return {
        ...state,
        linkedProcedureList: action.linkedProcedureList,
        linkedProcedureListLoading: false,
        linkedProcedureListPagination: action.linkedProcedureList.pagination,
      }
    case type.GET_ALL_PROCEDURE_LINKED_TO_ERROR_FAILED:
      return {
        ...state,
        linkedProcedureListLoading: false,
        linkedProcedureListError: action.message,
      }


    // ERROR CODE MODAL
    case type.SET_ERROR_CODE_MODAL:
      return {
        ...state,
        errorCodeModal: action.payload.show,
        errorCodeType: action.payload.error_type,
        errorCodeId: action.payload.codeId,
      }
    // ERROR CODE TYPE
    // case type.SET_ERROR_CODE_TYPE:
    //   return {
    //     ...state,
    //     errorCodeType: action.payload,
    //   }

    // RESET ERROR MESSAGES
    case type.RESET_ERROR_CODE_ERRORS_REQUESTED:
      return {
        ...state,
        addErrorCodeError: [],
      }

    // CHANGE SEARCH
    case type.CHANGE_ERROR_CODES_SEARCH_REQUESTED:
      return {
        ...state,
        searchErrorCodesQuery: action.payload,
      }
    case type.CHANGE_M_CODES_SEARCH_REQUESTED:
      return {
        ...state,
        searchMCodesQuery: action.payload,
      }
    case type.CHANGE_ALARM_CODES_SEARCH_REQUESTED:
      return {
        ...state,
        searchAlarmCodesQuery: action.payload,
      }

    default:
      return state;
  }
}