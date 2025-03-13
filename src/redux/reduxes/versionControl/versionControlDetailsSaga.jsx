import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `tablet_versions`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* versionControl(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_VERSION_CONTROL_DETAILS_SUCCESS",
      versionControlDetails: res.data,
    });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "GET_VERSION_CONTROL_DETAILS_FAILED",
        message: e.response.data,
      });
    } else {
      yield put({
        type: "GET_VERSION_CONTROL_DETAILS_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* versionControlDetailsSaga() {
  yield takeEvery("GET_VERSION_CONTROL_DETAILS_REQUESTED", versionControl);
}

export default versionControlDetailsSaga;
