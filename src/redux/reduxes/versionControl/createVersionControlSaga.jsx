import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    android_version: data.android_version,
    android_version_code: data.android_version_code,
    android_app_url: data.android_app_url,
    ios_version: data.ios_version,
    ios_version_code: data.ios_version_code,
    ios_app_url: data.ios_app_url,
  };
  try {
    const result = nodeInstance({
      url: `tablet_versions`,
      method: "POST",
      data: postData,
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
      content: `Version Control Created Successfully`,
      type: "success",
    };

    yield put({
      type: "CREATE_VERSION_CONTROL_SUCCESS",
      versionControlDetails: res.data,
    });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "CREATE_VERSION_CONTROL_FAILED",
        message: e.response.data.errors,
      });
    } else {
      yield put({
        type: "CREATE_VERSION_CONTROL_FAILED",
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

function* createVersionControlSaga() {
  yield takeEvery("CREATE_VERSION_CONTROL_REQUESTED", versionControl);
}

export default createVersionControlSaga;
