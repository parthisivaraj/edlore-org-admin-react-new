import * as type from "./types";
const initialState = {
  // Login
  authData: {},
  loginLoading: false,
  loginStep: 0,
  confirmationToken: "",
  userProfileImage: {},
  userProfileName: "",
  showOTPCounter: false,

  // Reset Error Msg
  loginError: null,

  confirmOtpLoading: false,
  confirmOtpError: "",

  // resend otp
  resendLoginOtpLoading: false,
  resendLoginOtpError: "",

  // All permission
  allPermissions: [],
  allPermissionsLoading: false,
  allPermissionsError: "",
  gotPermissionLastTime: "",
  password_updated_at: "",

  // Logout
  logoutLoading: false,
  logoutError: "",

  // Pre Login Logo
  logoDetails: {},
  logoLoading: false,
  logoError: null,

  // Get User Details
  userDetails: {},
  userDetailsLoading: false,
  userDetailsError: null,
  gotUserDetailsLastTime: "",
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    // Post Login
    case type.POST_LOGIN_REQUESTED:
      return {
        ...state,
        loginLoading: true,
      };
    case type.POST_LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        authData: action.authData,
        confirmationToken: action.authData.token,
        loginStep: 1,
        showOTPCounter: true,
      };
    case type.POST_LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        loginError: action.message,
      };

    // Reset Error Message
    case type.LOGIN_ERROR_RESET_REQUESTED:
      return {
        ...state,
        loginError: "",
        loginLoading: false,
      };

    // Pre Login Logo
    case type.GET_PRE_LOGIN_LOGO_REQUESTED:
      return {
        ...state,
        logoLoading: true,
      };
    case type.GET_PRE_LOGIN_LOGO_SUCCESS:
      return {
        ...state,
        logoLoading: false,
        logoDetails: action.logoDetails,
      };
    case type.GET_PRE_LOGIN_LOGO_FAILED:
      return {
        ...state,
        logoLoading: false,
        logoError: action.message,
      };

    // Confirm OTP
    case type.CONFIRM_LOGIN_OTP_REQUESTED:
      return {
        ...state,
        confirmOtpLoading: true,
      };
    case type.CONFIRM_LOGIN_OTP_SUCCESS:
      return {
        ...state,
        confirmOtpLoading: false,
        authData: action.authData,
        userProfileImage: action.authData.user_profile_image,
        userProfileName: action.authData.user_name,
        password_updated_at: action.authData.password_updated_at,
        loginStep: 0,
      };
    case type.CONFIRM_LOGIN_OTP_FAILED:
      return {
        ...state,
        confirmOtpLoading: false,
        confirmOtpError: action.message,
      };

    // Resend login OTP
    case type.RESEND_LOGIN_OTP_REQUESTED:
      return {
        ...state,
        resendLoginOtpLoading: true,
      };
    case type.RESEND_LOGIN_OTP_SUCCESS:
      return {
        ...state,
        resendLoginOtpLoading: false,
        showOTPCounter: true,
      };
    case type.RESEND_LOGIN_OTP_FAILED:
      return {
        ...state,
        resendLoginOtpLoading: false,
        resendLoginOtpError: action.message,
      };

    // Logout
    case type.LOGOUT_REQUESTED:
      return {
        ...state,
        logoutLoading: true,
      };
    case type.LOGOUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
      };
    case type.LOGOUT_FAILED:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.message,
      };

    // Get all Permission
    case type.GET_ALL_USER_PERMISSIONS_REQUESTED:
      return {
        ...state,
        allPermissionsLoading: true,
      };
    case type.GET_ALL_USER_PERMISSIONS_SUCCESS:
      return {
        ...state,
        allPermissions: action.permissionData,
        allPermissionsLoading: false,
        gotPermissionLastTime: "",
      };
    case type.GET_ALL_USER_PERMISSIONS_FAILED:
      return {
        ...state,
        allPermissionsLoading: false,
        allPermissionsError: action.message,
      };

    // Get when Permission updated
    // case type.GOT_WHEN_PERMISSION_UPDATED_REQUESTED:
    // 	return {
    // 		...state,
    // 		allPermissionsLoading: true,
    // 	}
    case type.GOT_WHEN_PERMISSION_UPDATED_SUCCESS:
      return {
        ...state,
        // allPermissions: action.permissionData,
        // allPermissionsLoading: false,
        gotPermissionLastTime: action.payload,
      };
    // case type.GOT_WHEN_PERMISSION_UPDATED_FAILED:
    // 	return {
    // 		...state,
    // 		allPermissionsLoading: false,
    // 		allPermissionsError: action.message,
    // 	}

    // Get User Details
    case type.GET_USER_DETAILS_REQUESTED:
      return {
        ...state,
        userDetailsLoading: true,
      };
    case type.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetailsLoading: false,
        // userDetails: action.userDetails.users,
        userProfileImage: action.getUserData.profileImage,
        userProfileName: action.getUserData.fullName,
        gotUserDetailsLastTime: "",
      };
    case type.GET_USER_DETAILS_FAILED:
      return {
        ...state,
        userDetailsLoading: false,
        userDetailsError: action.message,
      };

    // resetError
    case type.RESET_OTP_ERROR:
      return {
        ...state,
        confirmOtpError: "",
      };

    // SET_LOGIN_STEP
    case type.SET_LOGIN_STEP:
      return {
        ...state,
        loginStep: action.payload,
      };
    // RESET LOGIN LOADING
    case type.RESET_LOGIN_LOADING_REQUESTED:
      return {
        ...state,
        loginLoading: false,
      };
    // RESET login show counter
    case type.RESET_LOGIN_OTP_SHOW_COUNTER_REQUESTED:
      return {
        ...state,
        showOTPCounter: false,
      };
    default:
      return state;
  }
}
