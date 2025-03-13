import * as type from "./types";

const initialState = {
	// Procedures in a Model
	modelProcedures: [],
	modelProceduresPagination: {},
	modelProceduresLoading: false,
	modelProceduresError: null,
	procedureCount: 0,

	// Procedure Modal
	procedureModal: false,
	procedureEdit: false,
	editingId: "",
	procedureName: "",
	procedureDetailsModel: false,
	addProcedureError: [],

	// Get all Procedures
	allProcedures: [],
	allProceduresPagination: {},
	allProceduresLoading: false,
	allProceduresError: null,
	filters: {},

	// Procedures Details
	proceduresDetails: {},
	procedureDetailsLoading: false,
	procedureDetailsError: null,
	procedureDetailModal: false,

	// Delete Procedure
	deleteProcedureLoading: false,
	deleteProcedureError: null,

	// Create a Procedure
	addProcedureLoading: false,
	createdNewProcedure: false,
	createdProcedure: {},

	// Update a Procedure Status
	updationSuccess: false,
	updationText: "",
	updateStatus: "",
	updateProcedureStepLoading: false,
	updateProcedureStepError: null,

	// Add Procedure Step
	AddProcedureStepLoading: false,
	AddProcedureStepError: null,

	// Delete Procedure Step
	deleteProcedureStepLoading: false,
	deleteProcedureStepError: null,

	// Update Procedure Step Order
	updateProcedureStepOrderLoading: false,
	updateProcedureStepOrderError: null,

	// Update Procedure
	updateProcedureLoading: false,
	updateProcedureError: null,

	// Change Search
	searchProceduresQuery: "",
	searchModelProceduresQuery: "",
}

export default function procedure(state = initialState, action) {
	switch (action.type) {
		//================== model procedures
		case type.GET_MODEL_PROCEDURE_REQUESTED:
			return {
				...state,
				modelProceduresLoading: true,
			}
		case type.GET_MODEL_PROCEDURE_SUCCESS:
			return {
				...state,
				modelProceduresLoading: false,
				modelProcedures: action.data.procedures,
				modelProceduresPagination: action.data.pagination,
				procedureCount: action.data.pagination && action.data.pagination.total_entries && action.data.pagination.total_entries ? action.data.pagination.total_entries : 0,
			}
		case type.GET_MODEL_PROCEDURE_FAILED:
			return {
				...state,
				modelProceduresLoading: false,
				allProceduresError: action.message,
			}


		//==================  procedures details
		case type.PROCEDURE_DETAILS_REQUESTED:
			return {
				...state,
				procedureDetailsLoading: true,
			}
		case type.PROCEDURE_DETAILS_SUCCESS:
			return {
				...state,
				procedureDetailsLoading: false,
				proceduresDetails: action.data.procedure,
				procedureDetailModal: false,
				searchProceduresQuery: "",
				searchModelProceduresQuery: "",
			}
		case type.PROCEDURE_DETAILS_FAILED:
			return {
				...state,
				procedureDetailsLoading: false,
				procedureDetailsError: action.message,
			}

		//==================  All procedures
		case type.ALL_PROCEDURE_REQUESTED:
			return {
				...state,
				allProceduresLoading: true,
			}
		case type.ALL_PROCEDURE_SUCCESS:
			return {
				...state,
				allProceduresLoading: false,
				allProceduresPagination: action.data.pagination,
				allProcedures: action.data.procedures,
				filters: action.data.filters,
			}
		case type.ALL_PROCEDURE_FAILED:
			return {
				...state,
				allProceduresLoading: false,
				procedureDetailsError: action.message,
			}

		//==================  Delete procedures
		case type.DELETE_PROCEDURE_REQUESTED:
			return {
				...state,
				deleteProcedureLoading: true,
			}
		case type.DELETE_PROCEDURE_SUCCESS:
			return {
				...state,
				deleteProcedureLoading: false,
				searchProceduresQuery: "",
				searchModelProceduresQuery: "",
			}
		case type.DELETE_PROCEDURE_FAILED:
			return {
				...state,
				deleteProcedureLoading: false,
				deleteProcedureError: action.message,
			}

		//==================  Create procedures
		case type.ADD_PROCEDURE_REQUESTED:
			return {
				...state,
				addProcedureLoading: true,
			}
		case type.ADD_PROCEDURE_SUCCESS:
			return {
				...state,
				addProcedureLoading: false,
				createdProcedure: action.data,
				createdNewProcedure: true,
				procedureModal: false,
				procedureEdit: false,
				editingId: "",
				procedureName: "",
			}
		case type.ADD_PROCEDURE_FAILED:
			return {
				...state,
				addProcedureLoading: false,
				addProcedureError: action.message,
			}
		//==================  update Procedure step
		case type.UPDATE_PROCEDURE_STEP_REQUESTED:
			return {
				...state,
				updateProcedureStepLoading: true,
			}
		case type.UPDATE_PROCEDURE_STEP_SUCCESS:
			return {
				...state,
				updateProcedureStepLoading: false,
				updationSuccess: true,
				updationText: "updated the step",
				updateStatus: "success"
			}
		case type.UPDATE_PROCEDURE_STEP_FAILED:
			return {
				...state,
				updateProcedureStepLoading: false,
				updateProcedureStepError: action.message,
			}
		//==================  add Procedure step
		case type.ADD_PROCEDURE_STEP_REQUESTED:
			return {
				...state,
				AddProcedureStepLoading: true,
			}
		case type.ADD_PROCEDURE_STEP_SUCCESS:
			return {
				...state,
				AddProcedureStepLoading: false,
			}
		case type.ADD_PROCEDURE_STEP_FAILED:
			return {
				...state,
				AddProcedureStepLoading: false,
				procedureDetailsError: action.message,
			}
		//==================  delete Procedure step
		case type.DELETE_PROCEDURE_STEP_REQUESTED:
			return {
				...state,
				deleteProcedureStepLoading: true,
			}
		case type.DELETE_PROCEDURE_STEP_SUCCESS:
			return {
				...state,
				deleteProcedureStepLoading: false,
			}
		case type.DELETE_PROCEDURE_STEP_FAILED:
			return {
				...state,
				deleteProcedureStepLoading: false,
				deleteProcedureStepError: action.message,
			}
		//==================  Set to default
		case type.SET_TO_DEFAULT_REQUESTED:
			return {
				...state,
			}
		case type.SET_TO_DEFAULT_SUCCESS:
			return {
				...state,
				createdNewProcedure: false,
				createdProcedure: {},
			}
		case type.SET_TO_DEFAULT_FAILED:
			return {
				...state,
			}
		//==================  Update procedure step Order
		case type.UPDATE_PROCEDURE_STEP_ORDER_REQUESTED:
			return {
				...state,
				updateProcedureStepOrderLoading: true,
			}
		case type.UPDATE_PROCEDURE_STEP_ORDER_SUCCESS:
			return {
				...state,
				updateProcedureStepOrderLoading: true,
			}
		case type.UPDATE_PROCEDURE_STEP_ORDER_FAILED:
			return {
				...state,
				updateProcedureStepOrderLoading: false,
				updateProcedureStepOrderError: action.message,
			}
		//==================  Update procedure
		case type.UPDATE_PROCEDURE_REQUESTED:
			return {
				...state,
				updateProcedureLoading: true,
			}
		case type.UPDATE_PROCEDURE_SUCCESS:
			return {
				...state,
				updateProcedureLoading: false,
				procedureModal: false,
				searchProceduresQuery: "",
				searchModelProceduresQuery: "",
				procedureEdit: false,
				editingId: "",
				procedureName: "",
			}
		case type.UPDATE_PROCEDURE_FAILED:
			return {
				...state,
				updateProcedureLoading: false,
				updateProcedureError: action.message,
			}
		//==================  stop show toast
		// case type.STOP_SHOW_TOAST_SUCCESS:
		// 	return {
		// 		...state,
		// 		updationSuccess: false,
		// 		updationText: "",
		// 		updateStatus: ""
		// 	}

		// PROCEDURE MODAL
		case type.SET_PROCEDURE_MODAL:
			return {
				...state,
				procedureModal: action.payload.show,
				procedureEdit: action.payload.edit,
				editingId: action.payload.id,
				procedureName: action.payload.name,
			}

		// PROCEDURE DETAIL MODAL
		case type.SET_PROCEDURE_DETAIL_MODAL:
			return {
				...state,
				procedureDetailModal: action.payload,
			}

		// RESET PROCEDURE ERROR MESSAGES
		case type.RESET_PROCEDURE_ERROR_REQUESTED:
			return {
				...state,
				addProcedureError: [],
			}

		// SEARCH CHANGE
		case type.CHANGE_PROCEDURES_SEARCH_REQUESTED:
			return {
				...state,
				searchProceduresQuery: action.payload,
			}

		// SEARCH MODEL PROCEDURE CHANGE
		case type.CHANGE_MODEL_PROCEDURES_SEARCH_REQUESTED:
			return {
				...state,
				searchModelProceduresQuery: action.payload,
			}

		default:
			return state
	}
}
