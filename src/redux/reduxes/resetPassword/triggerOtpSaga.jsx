import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `/auth/get_opt?email=${encodeURIComponent(data.email)}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* resetPassword(action) {
  const data = {};
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "TRIGGER_OTP_SUCCESS", data: action.payload });
  } catch (e) {
    if (e.response.status == 404) {
      yield put({
        type: "TRIGGER_OTP_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({ type: "TRIGGER_OTP_FAILED", message: "some error occurred" });
    }
  }
}

function* triggerOtpSaga() {
  yield takeEvery("TRIGGER_OTP_REQUESTED", resetPassword);
}
export default triggerOtpSaga;
