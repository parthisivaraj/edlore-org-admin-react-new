import * as type from "./types";

// SYNC Data
export function syncData(data) {
  return {
    type: type.SYNC_REQUESTED,
    payload: data,
  };
}

// RESET THE FORM ON CLOSE
export function setSyncModal(data) {
  return {
    type: type.SET_SYNC_MODAL_REQUESTED,
    payload: data,
  };
}

export function getSlaveMachines(data) {
  return {
    type: type.GET_SLAVE_MACHINES_REQUESTED,
    payload: data,
  };
}
