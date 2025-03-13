import * as type from './types';

const initialState = {
  // Get all Notifications
  olderNotificationsList: [],
  todayNotificationsList: [],
  yesterdayNotificationsList: [],
  allNotifications: [],
  allNotificationsLoading: false,
  allNotificationsError: null,
  pagination: {},
  allNotificationsPagination: {},
  type: "all",

  // Clear Notifications
  clearAllNotificationsLoading: false,
  clearAllNotificationsError: null,

  // save client token
  saveClientTokenLoading: false,
  saveClientTokenError: null,

  // Unread Notifications
  unreadNotificationCount: 0,
  unreadNotificationsLoading: false,
  unreadNotificationsError: null,
}

export default function notifications(state = initialState, action) {
  switch (action.type) {
    // Get all Notifications
    case type.GET_ALL_NOTIFICATIONS_REQUESTED:
      return {
        ...state,
        allNotificationsLoading: true,
      }
    case type.GET_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        allNotificationsLoading: false,
        olderNotificationsList: action.response.older,
        todayNotificationsList: action.response.today,
        yesterdayNotificationsList: action.response.yesterday,
        allNotifications: action.response.all,
        pagination: action.response.pagination,
        type: action.response.type,
      }
    case type.GET_ALL_NOTIFICATIONS_FAILED:
      return {
        ...state,
        allNotificationsLoading: false,
        allNotificationsError: action.message,
      }

    // Clear All Notifications
    case type.CLEAR_ALL_NOTIFICATIONS_REQUESTED:
      return {
        ...state,
        clearAllNotificationsLoading: true,
      }
    case type.CLEAR_ALL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        clearAllNotificationsLoading: false,
      }
    case type.CLEAR_ALL_NOTIFICATIONS_FAILED:
      return {
        ...state,
        clearAllNotificationsLoading: false,
        clearAllNotificationsError: action.message,
      }

    // Unread Notification Count
    case type.UNREAD_NOTIFICATION_COUNT_REQUESTED:
      return {
        ...state,
        unreadNotificationsLoading: true,
      }
    case type.UNREAD_NOTIFICATION_COUNT_SUCCESS:
      return {
        ...state,
        unreadNotificationsLoading: false,
        unreadNotificationCount: action.data.unread,
      }
    case type.UNREAD_NOTIFICATION_COUNT_FAILED:
      return {
        ...state,
        unreadNotificationsLoading: false,
        unreadNotificationsError: action.message,
      }

    // Save client token
    case type.SAVE_CLIENT_TOKEN_REQUESTED:
      return {
        ...state,
        saveClientTokenLoading: true,
      }
    case type.SAVE_CLIENT_TOKEN_SUCCESS:
      return {
        ...state,
        saveClientTokenLoading: false,
      }
    case type.SAVE_CLIENT_TOKEN_FAILED:
      return {
        ...state,
        saveClientTokenLoading: false,
        saveClientTokenError: action.message,
      }

    default:
      return state;
  }
}