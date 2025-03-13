import * as type from './types';

// TRIGGER OTP
export function triggerOtp(data) {
  return {
    type: type.TRIGGER_OTP_REQUESTED,
    payload: data,
  }
}
// VERIFY OTP
export function verifyOtp(data) {
  return {
    type: type.VERIFY_OTP_REQUESTED,
    payload: data,
  }
}
// RESET PASSWORD
export function resetPassword(data) {
  return {
    type: type.RESET_PASSWORD_REQUESTED,
    payload: data,
  }
}


// RESET ERROR
export function resetErrors(data) {
  return {
    type: type.RESET_PASSWORD_ERROR_RESET_REQUESTED,
    payload: data,
  }
}
