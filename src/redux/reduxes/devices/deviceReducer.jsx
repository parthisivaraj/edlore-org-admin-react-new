import * as type from "./types";

const initialState = {
	allDevices: [],
	allDevicePagination: {},
	primaryCategory: [],
	secondaryCategory: [],
	allDevicesLoading: false,
	allDevicesError: null,
	filters: {},

	activeDevices: [],
	activeDevicePagination: {},
	activeDevicesLoading: false,
	activeDevicesError: null,

	draftDevices: [],
	draftDevicePagination: {},
	draftDevicesLoading: false,
	draftDevicesError: null,

	// Device Details States
	deviceDetails: {},
	deviceDetailsLoading: false,
	deviceDetailsError: null,

	// Add a Device States
	addDeviceData: {},
	addDeviceLoading: false,
	addDeviceError: [],

	editDeviceLoading: false,
	editDeviceError: [],

	deviceStatusUpdateLoading: false,
	deviceStatusUpdateError: null,

	deleteDeviceLoading: false,
	deleteDeviceError: null,

	// Change Search
	searchDevicesQuery: "",
	searchModelDevicesQuery: "",
}

export default function devices(state = initialState, action) {
	switch (action.type) {
		//----------------------------All device
		case type.GET_ALL_DEVICES_REQUESTED:
			return {
				...state,
				allDevicesLoading: true,
			}
		case type.GET_ALL_DEVICES_SUCCESS:
			return {
				...state,
				allDevicesLoading: false,
				allDevices: action.allDevices.devices,
				allDevicePagination: action.allDevices.pagination,
				filters: action.allDevices.filters,
				// primaryCategory: action.allDevices.allData.primary_categories,
				// secondaryCategory: action.allDevices.allData.secondary_categories,
				// activeDevices: action.allDevices.active,
				// draftDevices: action.allDevices.draft
			}
		case type.GET_ALL_DEVICES_FAILED:
			return {
				...state,
				allDevicesLoading: false,
				allDevicesError: action.message,
			}

		//---------------------------- Active devices
		case type.GET_ACTIVE_DEVICES_REQUESTED:
			return {
				...state,
				activeDevicesLoading: true,
			}
		case type.GET_ACTIVE_DEVICES_SUCCESS:
			return {
				...state,
				activeDevicesLoading: false,
				activeDevices: action.activeDevices.devices,
				activeDevicePagination: action.activeDevices.pagination,
				filters: action.activeDevices.filters,
			}
		case type.GET_ACTIVE_DEVICES_FAILED:
			return {
				...state,
				activeDevicesLoading: false,
				activeDevicesError: action.message,
			}

		//---------------------------- draft devices
		case type.GET_DRAFT_DEVICES_REQUESTED:
			return {
				...state,
				draftDevicesLoading: true,
			}
		case type.GET_DRAFT_DEVICES_SUCCESS:
			return {
				...state,
				draftDevicesLoading: false,
				draftDevices: action.draftDevices.devices,
				draftDevicePagination: action.draftDevices.pagination,
				filters: action.draftDevices.filters,
			}
		case type.GET_DRAFT_DEVICES_FAILED:
			return {
				...state,
				draftDevicesLoading: false,
				draftDevicesError: action.message,
			}

		//----------------------------details
		case type.DEVICE_DETAILS_REQUESTED:
			return {
				...state,
				deviceDetailsLoading: true,
			}
		case type.DEVICE_DETAILS_SUCCESS:
			return {
				...state,
				deviceDetailsLoading: false,
				deviceDetails: action.deviceDetails,
				searchDevicesQuery: "",
				searchModelDevicesQuery: "",
			}
		case type.DEVICE_DETAILS_FAILED:
			return {
				...state,
				deviceDetailsLoading: false,
				deviceDetailsError: action.message,
			}

		// --------------------------- create device
		case type.POST_DEVICE_REQUESTED:
			return {
				...state,
				addDeviceLoading: true,
			}
		case type.POST_DEVICE_SUCCESS:
			return {
				...state,
				addDeviceLoading: false,
				addDeviceData: action.deviceData,
			}
		case type.POST_DEVICE_FAILED:
			return {
				...state,
				addDeviceLoading: false,
				addDeviceError: action.message,
			}

		// ---------------------------edit device
		case type.EDIT_DEVICE_REQUESTED:
			return {
				...state,
				editDeviceLoading: true,
			}
		case type.EDIT_DEVICE_SUCCESS:
			return {
				...state,
				editDeviceLoading: false,
			}
		case type.EDIT_DEVICE_FAILED:
			return {
				...state,
				editDeviceLoading: false,
				editDeviceError: action.message,
			}

		// ---------------------------status update
		case type.DEVICE_STATUS_CHANGE_REQUESTED:
			return {
				...state,
				deviceStatusUpdateLoading: true,
			}
		case type.DEVICE_STATUS_CHANGE_SUCCESS:
			return {
				...state,
				deviceStatusUpdateLoading: false,
			}
		case type.DEVICE_STATUS_CHANGE_FAILED:
			return {
				...state,
				deviceStatusUpdateLoading: false,
				deviceStatusUpdateError: action.message,
			}
		// ---------------------------Delete device
		case type.DELETE_DEVICE_REQUESTED:
			return {
				...state,
				deleteDeviceLoading: true,
			}
		case type.DELETE_DEVICE_SUCCESS:
			return {
				...state,
				deleteDeviceLoading: false,
			}
		case type.DELETE_DEVICE_FAILED:
			return {
				...state,
				deleteDeviceLoading: false,
				deleteDeviceError: action.message,
			}

		// ---------------------------Reset error message
		case type.ADD_DEVICE_ERROR_RESET_REQUESTED:
			return {
				...state,
				addDeviceError: [],
				editDeviceError: []
			}

		// Change Search
		case type.CHANGE_DEVICES_SEARCH_REQUESTED:
			return {
				...state,
				searchDevicesQuery: action.payload,
			}

		// Change Search
		case type.CHANGE_MODEL_DEVICES_SEARCH_REQUESTED:
			return {
				...state,
				searchModelDevicesQuery: action.payload,
			}

		default:
			return state
	}
}
