import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";
import TokenService from "../../services/tokenServices";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `notifications/unread_count`,
      method: "GET",
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
    yield put({ type: "UNREAD_NOTIFICATION_COUNT_SUCCESS", data: res.data });
    yield put({ type: "GET_ALL_USER_PERMISSIONS_REQUESTED", payload: {} });
    // if (action.payload.passwordUpdatedTime != res.data.password_updated_at) {
    //   TokenService.removeLocalAccessTokenAndLogout();
    // }
  } catch (e) {
    yield put({ type: "UNREAD_NOTIFICATION_COUNT_FAILED", message: e.message });
  }
}

function* unreadNotificationsSaga() {
  yield takeEvery("UNREAD_NOTIFICATION_COUNT_REQUESTED", allNotifications);
}

export default unreadNotificationsSaga;
