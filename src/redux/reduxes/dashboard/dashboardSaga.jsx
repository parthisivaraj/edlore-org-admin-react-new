import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `dashboard`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}
function* dashboard(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_DASHBOARD_DETAILS_SUCCESS",
      dashboardDetails: res.data,
    });
  } catch (e) {
    yield put({ type: "GET_DASHBOARD_DETAILS_FAILED", message: e.message });
  }
}

function* dashboardSaga() {
  yield takeEvery("GET_DASHBOARD_DETAILS_REQUESTED", dashboard);
}

export default dashboardSaga;
