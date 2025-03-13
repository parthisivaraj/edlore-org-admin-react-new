import * as type from './types';

export function stopToaster(data) {
  return {
    type: type.SET_TOASTER_CLOSED,
    payload: data,
  }
}
export function addToaster(data) {
  return {
    type: type.ADD_LOCAL_TOASTER_SUCCESS,
    payload: data,
  }
}



