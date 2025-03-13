import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: "auth/validate_2factor",
      method: "POST",
      data: data,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}
function* login(action) {
  try {
    const res = yield call(getApi, action.payload);
    if (res.status == 200) {
      // Cookies.set("isLogin", true);
      // Cookies.set("access_token", res.data.access_token);

      window.localStorage.setItem("isLogin", true);
      window.localStorage.setItem("access_token", res.data.access_token);
      // window.location.href = "/";
      yield put({ type: "CONFIRM_LOGIN_OTP_SUCCESS", authData: res.data });

      yield put({ type: "GET_ALL_USER_PERMISSIONS_REQUESTED", payload: "" });
    } else {
      yield put({ type: "CONFIRM_LOGIN_OTP_FAILED", message: "" });
    }
  } catch (e) {
    if (
      e.response.status === 400 ||
      e.response.status === 404 ||
      e.response.status === 409
    ) {
      yield put({
        type: "CONFIRM_LOGIN_OTP_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({
        type: "CONFIRM_LOGIN_OTP_FAILED",
        message: "Some error occurred!",
      });
    }
  }
}

function* confirmOtpLoginSaga() {
  yield takeEvery("CONFIRM_LOGIN_OTP_REQUESTED", login);
}

export default confirmOtpLoginSaga;
