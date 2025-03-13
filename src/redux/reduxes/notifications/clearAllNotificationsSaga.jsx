import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `notifications/clear_notification?clear_type=${data.clear_type}`,
      method: "POST",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* allNotifications(action) {
  const data = {
    type: "all",
    page: 0,
    limit: 10,
  };
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "CLEAR_ALL_NOTIFICATIONS_SUCCESS", data: res.data });
    yield put({ type: "GET_ALL_NOTIFICATIONS_REQUESTED", payload: data });
  } catch (e) {
    yield put({ type: "CLEAR_ALL_NOTIFICATIONS_FAILED", message: e.message });
  }
}

function* clearAllNotificationsSaga() {
  yield takeEvery("CLEAR_ALL_NOTIFICATIONS_REQUESTED", allNotifications);
}
export default clearAllNotificationsSaga;
