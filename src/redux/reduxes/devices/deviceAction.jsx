import * as type from './types';

// Get All Devices
export function getAllDevices(data) {
    return {
        type: type.GET_ALL_DEVICES_REQUESTED,
        payload: data,
    }
}

// Get Active Devices
export function getActiveDevices(data) {
    return {
        type: type.GET_ACTIVE_DEVICES_REQUESTED,
        payload: data,
    }
}

// Get Draft Devices
export function getDraftDevices(data) {
    return {
        type: type.GET_DRAFT_DEVICES_REQUESTED,
        payload: data,
    }
}

// Get Device Details
export function getDeviceDetails(data) {
    return {
        type: type.DEVICE_DETAILS_REQUESTED,
        payload: data,
    }
}

// Post - Add Device
export function addDevice(data) {
    return {
        type: type.POST_DEVICE_REQUESTED,
        payload: data,
    }
}

// Put - Edit Device
export function editDevice(data) {
    return {
        type: type.EDIT_DEVICE_REQUESTED,
        payload: data,
    }
}

// Put - status Update
export function deviceStatusUpdate(data) {
    return {
        type: type.DEVICE_STATUS_CHANGE_REQUESTED,
        payload: data,
    }
}

// Put - Delete device
export function deleteDevice(data) {
    return {
        type: type.DELETE_DEVICE_REQUESTED,
        payload: data,
    }
}

// Put - Delete device
export function resetErrorMessage(data) {
    return {
        type: type.ADD_DEVICE_ERROR_RESET_REQUESTED,
        payload: data,
    }
}

// Change Search
export function changeDevicesSearch(data) {
    return {
        type: type.CHANGE_DEVICES_SEARCH_REQUESTED,
        payload: data,
    }
}

// Change Model Device Search
export function changeModelDevicesSearch(data) {
    return {
        type: type.CHANGE_MODEL_DEVICES_SEARCH_REQUESTED,
        payload: data,
    }
}
