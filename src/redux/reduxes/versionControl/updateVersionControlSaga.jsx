import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const updatedData = {
    id: data.id,
    android_version: data.android_version,
    android_version_code: data.android_version_code,
    android_app_url: data.android_app_url,
    ios_version: data.ios_version,
    ios_version_code: data.ios_version_code,
    ios_app_url: data.ios_app_url,
  };
  try {
    const result = nodeInstance({
      url: `tablet_versions/${data.id}`,
      method: "PUT",
      data: updatedData,
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
    const toastrData = {
      content: `Version Control details updated Successfully`,
      type: "success",
    };
    yield put({ type: "UPDATE_VERSION_CONTROL_SUCCESS", data: res.data });
    yield put({
      type: "GET_VERSION_CONTROL_DETAILS_REQUESTED",
      data: res.data,
    });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "UPDATE_VERSION_CONTROL_FAILED",
        message: e.response.data,
      });
    } else {
      yield put({
        type: "UPDATE_VERSION_CONTROL_FAILED",
        message: "Some error occurred",
      });
    }
    if (e.response.status === 500) {
      const toastrFailedData = {
        content: e.response.data.errors
          ? e.response.data.errors
          : "Something went wrong!",
        type: "failed",
      };
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrFailedData });
    }
  }
}

function* updateVersionControlSaga() {
  yield takeEvery("UPDATE_VERSION_CONTROL_REQUESTED", versionControl);
}

export default updateVersionControlSaga;
