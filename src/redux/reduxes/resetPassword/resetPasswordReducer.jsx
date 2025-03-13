import * as type from './types';

const initialState = {

  currentStep: 0,
  email: null,
  otp: null,
  successTime: null,

  triggerOtpLoading: false,
  triggerOtpError: "",

  verifyOtpLoading: false,
  verifyOtpError: "",

  resetPasswordLoading: false,
  resetPasswordError: "",

}

export default function resetPassword(state = initialState, action) {
  switch (action.type) {
    // trigger otp
    case type.TRIGGER_OTP_REQUESTED:
      return {
        ...state,
        triggerOtpLoading: true,
      }
    case type.TRIGGER_OTP_SUCCESS:
      return {
        ...state,
        triggerOtpLoading: false,
        email: action.data.email,
        currentStep: 1,
        successTime: new Date().getTime(),
      }
    case type.TRIGGER_OTP_FAILED:
      return {
        ...state,
        triggerOtpLoading: false,
        triggerOtpError: action.message,
      }

    // verify OTP
    case type.VERIFY_OTP_REQUESTED:
      return {
        ...state,
        verifyOtpLoading: true,
      }
    case type.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOtpLoading: false,
        otp: action.data.otp,
        currentStep: 2,
      }
    case type.VERIFY_OTP_FAILED:
      return {
        ...state,
        verifyOtpLoading: false,
        verifyOtpError: action.message,
      }

    // reset password
    case type.RESET_PASSWORD_REQUESTED:
      return {
        ...state,
        resetPasswordLoading: true,
      }
    case type.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordLoading: false,
        currentStep: 3,
      }
    case type.RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordError: action.message,
      }
    case type.RESET_PASSWORD_ERROR_RESET_REQUESTED:
      return {
        ...state,
        triggerOtpError: "",
      }

    // reset all errors
    case type.TRIGGER_OTP_FAILED:
      return {
        ...state,
        triggerOtpError: "",
        verifyOtpError: "",
      }
    default:
      return state;
  }
}