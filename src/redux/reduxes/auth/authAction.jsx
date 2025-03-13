import * as type from './types';

// LOGIN
export function postLogin(data) {
    return {
        type: type.POST_LOGIN_REQUESTED,
        payload: data,
    }
}

// ERROR MESSAGE
export function resetErrorMessage(data) {
    return {
        type: type.LOGIN_ERROR_RESET_REQUESTED,
        payload: data,
    }
}

// PRE LOGIN LOGO
export function getPreLoginLogo(data) {
    return {
        type: type.GET_PRE_LOGIN_LOGO_REQUESTED,
        payload: data,
    }
}

// CONFIRM LOGIN OTP
export function confirmLoginOtp(data) {
    return {
        type: type.CONFIRM_LOGIN_OTP_REQUESTED,
        payload: data,
    }
}

// RESET_OTP_ERROR
export function resetOtpErrorMessage(data) {
    return {
        type: type.RESET_OTP_ERROR,
        payload: data,
    }
}

// RESEND_LOGIN_OTP
export function resendLoginOtp(data) {
    return {
        type: type.RESEND_LOGIN_OTP_REQUESTED,
        payload: data,
    }
}

// SET_LOGIN_STEP
export function setLoginStep(data) {
    return {
        type: type.SET_LOGIN_STEP,
        payload: data,
    }
}
// LOGOUT
export function logout(data) {
    return {
        type: type.LOGOUT_REQUESTED,
        payload: data,
    }
}

// GET USER DETAILS
export function getUserDetails(data) {
    return {
        type: type.GET_USER_DETAILS_REQUESTED,
        payload: data,
    }
}
// RESET LOADING
export function resetLoginLoading(data) {
    return {
        type: type.RESET_LOGIN_LOADING_REQUESTED,
        payload: data,
    }
}
// RESET login show counter
export function setLoginOTPCounter(data) {
    return {
        type: type.RESET_LOGIN_OTP_SHOW_COUNTER_REQUESTED,
        payload: data,
    }
}