import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: "auth/two_factor_resend_otp",
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
    yield put({ type: "RESEND_LOGIN_OTP_SUCCESS", authData: res.data });
  } catch (e) {
    if (
      e.response.status === 400 ||
      e.response.status === 404 ||
      e.response.status === 409
    ) {
      yield put({
        type: "RESEND_LOGIN_OTP_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({
        type: "RESEND_LOGIN_OTP_FAILED",
        message: "Some error occurred!",
      });
    }
  }
}

function* resendOtpLoginSaga() {
  yield takeEvery("RESEND_LOGIN_OTP_REQUESTED", login);
}

export default resendOtpLoginSaga;
