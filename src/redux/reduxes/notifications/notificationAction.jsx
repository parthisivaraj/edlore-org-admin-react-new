import * as type from './types';

// GET ALL NOTIFICATIONS
export function getAllNotifications(data) {
  return {
    type: type.GET_ALL_NOTIFICATIONS_REQUESTED,
    payload: data,
  }
}

// CLEAR ALL NOTIFICATIONS
export function clearAllNotifications(data) {
  return {
    type: type.CLEAR_ALL_NOTIFICATIONS_REQUESTED,
    payload: data,
  }
}

// UNREAD NOTIFICATION COUNT
export function unreadNotificationCount(data) {
  return {
    type: type.UNREAD_NOTIFICATION_COUNT_REQUESTED,
    payload: data,
  }
}

// SAVE CLIENT TOKEN 
export function saveClientToken(data) {
  return {
    type: type.SAVE_CLIENT_TOKEN_REQUESTED,
    payload: data,
  }
}