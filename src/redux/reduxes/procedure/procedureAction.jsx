import * as type from './types';

// Get model procedure
export function getModelProcedure(data) {
    return {
        type: type.GET_MODEL_PROCEDURE_REQUESTED,
        payload: data,
    }
}

// Get procedure details
export function getProcedureDetails(data) {
    return {
        type: type.PROCEDURE_DETAILS_REQUESTED,
        payload: data,
    }
}
// Get All procedure
export function getAllProcedure(data) {
    return {
        type: type.ALL_PROCEDURE_REQUESTED,
        payload: data,
    }
}

// Delete procedure
export function deleteProcedure(data) {
    return {
        type: type.DELETE_PROCEDURE_REQUESTED,
        payload: data,
    }
}

// Delete procedure
export function createProcedure(data) {
    return {
        type: type.ADD_PROCEDURE_REQUESTED,
        payload: data,
    }
}
// Update procedure step
export function updateProcedureSteps(data) {
    return {
        type: type.UPDATE_PROCEDURE_STEP_REQUESTED,
        payload: data,
    }
}
// Update procedure step order
export function updateProcedureStepOrder(data) {
    return {
        type: type.UPDATE_PROCEDURE_STEP_ORDER_REQUESTED,
        payload: data,
    }
}
// add procedure step
export function addProcedureSteps(data) {
    return {
        type: type.ADD_PROCEDURE_STEP_REQUESTED,
        payload: data,
    }
}
// Delete procedure step
export function deleteProcedureSteps(data) {
    return {
        type: type.DELETE_PROCEDURE_STEP_REQUESTED,
        payload: data,
    }
}
// Set to default
export function setToDefault(data) {
    return {
        type: type.SET_TO_DEFAULT_REQUESTED,
        payload: data,
    }
}

// Update procedure
export function updateProcedure(data) {
    return {
        type: type.UPDATE_PROCEDURE_REQUESTED,
        payload: data,
    }
}

// stop showing the toast
// export function stopShowingAlert(data) {
//     return {
//         type: type.STOP_SHOW_TOAST_SUCCESS,
//         payload: data,
//     }
// }

// RESET ERROR MESSAGES
export function resetProceduresErrors(data) {
    return {
        type: type.RESET_PROCEDURE_ERROR_REQUESTED,
        payload: data,
    }
}

// PROCEDURE MODAL
export function setProcedureModal(data) {
    return {
        type: type.SET_PROCEDURE_MODAL,
        payload: data,
    }
}

// PROCEDURE DETAIL MODAL
export function setProcedureDetailModal(data) {
    return {
        type: type.SET_PROCEDURE_DETAIL_MODAL,
        payload: data,
    }
}

// CHANGE SEARCH
export function changeProceduresSearch(data) {
    return {
        type: type.CHANGE_PROCEDURES_SEARCH_REQUESTED,
        payload: data,
    }
}
// CHANGE MODEL PROCEDURE SEARCH
export function changeModelProceduresSearch(data) {
    return {
        type: type.CHANGE_MODEL_PROCEDURES_SEARCH_REQUESTED,
        payload: data,
    }
}