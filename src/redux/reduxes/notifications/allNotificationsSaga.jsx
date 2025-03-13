import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `notifications?type=${data.type}&page=${data.page + 1}&limit=${
        data.limit
      }`,
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
    const response = {
      pagination: action.payload.type != "all" ? res.data.pagination : {},
      older: action.payload.type == "all" ? res.data.older : [],
      today: action.payload.type == "all" ? res.data.today : [],
      yesterday: action.payload.type == "all" ? res.data.yesterday : [],
      all: action.payload.type != "all" ? res.data.notifications : [],
      type: action.payload.type,
    };
    yield put({ type: "GET_ALL_NOTIFICATIONS_SUCCESS", response: response });
  } catch (e) {
    yield put({ type: "GET_ALL_NOTIFICATIONS_FAILED", message: e.message });
  }
}

function* allNotificationsSaga() {
  yield takeEvery("GET_ALL_NOTIFICATIONS_REQUESTED", allNotifications);
}

export default allNotificationsSaga;
