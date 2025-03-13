import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `auth/verify_otp?email=${encodeURIComponent(data.email)}&otp=${
        data.otp
      }`,
      method: "POST",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* resetPassword(action) {
  // const data = {};
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "VERIFY_OTP_SUCCESS", data: action.payload });
  } catch (e) {
    if (e.response.status == 400) {
      yield put({
        type: "VERIFY_OTP_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({ type: "VERIFY_OTP_FAILED", message: "some error occurred" });
    }
  }
}

function* verifyOtpSaga() {
  yield takeEvery("VERIFY_OTP_REQUESTED", resetPassword);
}
export default verifyOtpSaga;
