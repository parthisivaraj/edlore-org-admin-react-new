import * as type from "./types";

export function getAllSlaveMachines(data) {
  return {
    type: type.GET_ALL_SLAVE_MACHINES_REQUESTED,
    payload: data,
  };
}

export function addSlaveMachine(data) {
  return {
    type: type.ADD_SLAVE_MACHINE_REQUESTED,
    payload: data,
  };
}

// GET A SLAVE MACHINE'S DETAILS
export function getSlaveMachineDetails(data) {
  return {
    type: type.GET_SLAVE_MACHINE_DETAILS_REQUESTED,
    payload: data,
  };
}

export function updateSlaveMachine(data) {
  return {
    type: type.UPDATE_SLAVE_MACHINE_REQUESTED,
    payload: data,
  };
}

export function deleteSlaveMachine(data) {
  return {
    type: type.DELETE_SLAVE_MACHINE_REQUESTED,
    payload: data,
  };
}

// RESET THE FORM ON CLOSE MODAL
export function setSlaveMachineModal(data) {
  return {
    type: type.SET_SLAVE_MACHINE_MODAL_REQUESTED,
    payload: data,
  };
}

// RESET THE SLAVE MACHINE ERROR MESSAGES
export function resetSlaveMachineErrors(data) {
  return {
    type: type.RESET_SLAVE_MACHINE_ERRORS_REQUESTED,
    payload: data,
  };
}

// CHANGE SEARCH
export function changeSlaveMachinesSearch(data) {
  return {
    type: type.CHANGE_SLAVE_MACHINES_SEARCH_REQUESTED,
    payload: data,
  };
}
