import { call, put, takeEvery } from "redux-saga/effects";
import instance from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = instance({
      url: `/auth/reset_forgot_password`,
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

function* resetPassword(action) {
  const data = {};
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "RESET_PASSWORD_SUCCESS", data: action.payload });
  } catch (e) {
    if (e.response.status == 400) {
      yield put({
        type: "RESET_PASSWORD_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({
        type: "RESET_PASSWORD_FAILED",
        message: "some error occurred",
      });
    }
  }
}

function* resetPasswordSaga() {
  yield takeEvery("RESET_PASSWORD_REQUESTED", resetPassword);
}
export default resetPasswordSaga;
