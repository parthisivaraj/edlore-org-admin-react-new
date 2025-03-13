import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `device_token`,
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

function* allNotifications(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "SAVE_CLIENT_TOKEN_SUCCESS", data: res.data });
  } catch (e) {
    yield put({ type: "SAVE_CLIENT_TOKEN_FAILED", message: e.message });
  }
}

function* saveClientTokenSaga() {
  yield takeEvery("SAVE_CLIENT_TOKEN_REQUESTED", allNotifications);
}
export default saveClientTokenSaga;
