import * as type from './types';

// Get All Medias
export function getAllMedias(data) {
    return {
        type: type.ALL_MEDIAS_REQUESTED,
        payload: data,
    }
}

// Update Media Action
export function updateMedia(data) {
    return {
        type: type.UPDATE_MEDIA_REQUESTED,
        payload: data,
    }
}

// Delete Media Action
export function deleteMedia(data) {
    return {
        type: type.DELETE_MEDIA_REQUESTED,
        payload: data,
    }
}

// Change Search
export function changeMediaSearch(data) {
    return {
        type: type.CHANGE_MEDIA_SEARCH_REQUESTED,
        payload: data,
    }
}