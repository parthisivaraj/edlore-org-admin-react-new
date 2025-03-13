import * as type from './types';

export function getAllGlobalSearch(data) {
  return {
    type: type.GET_ALL_SEARCH_REQUESTED,
    payload: data,
  }
}