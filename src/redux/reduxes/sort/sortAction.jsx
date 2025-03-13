import * as type from './types';

export function updateSort(data) {
  return {
    type: type.UPDATE_SORT_REQUESTED,
    payload: data,
  }
}