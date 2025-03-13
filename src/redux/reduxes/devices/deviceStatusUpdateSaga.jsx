import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    status: data.status,
  };
  try {
    const result = nodeInstance({
      url: `device/${data.id}/change_status`,
      method: "put",
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* device(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.name} device Status changed to ${res.data.status} Successfully`,
      type: "success",
    };

    yield put({ type: "DEVICE_STATUS_CHANGE_SUCCESS", deviceData: res.data });
    yield put({ type: "DEVICE_DETAILS_REQUESTED", payload: action.payload.id });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "DEVICE_STATUS_CHANGE_FAILED",
        message: e.response.data.message,
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
    if (e.response.status == 422) {
      const toastrFailedData = {
        content:
          e.response.data.errors && e.response.data.errors.length > 0
            ? e.response.data.errors[0].message
            : "Something went wrong!",
        type: "failed",
      };
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrFailedData });
      yield put({
        type: "POST_DEVICE_FAILED",
        message: e.response.data.errors,
      });
      // history.push(`/edit-device/${action.payload.id}`);
      window.location = `/edit-device/${action.payload.id}`;
    }

    if (e.response.status === 409) {
      const toastrConflictData = {
        content:
          "Selected Device is associated with workorder/s, you can't update/change the status of this Device",
        type: "failed",
      };
      yield put({
        type: "POST_DEVICE_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrConflictData });
    }
  }
}

function* deviceStatusUpdateSaga() {
  yield takeEvery("DEVICE_STATUS_CHANGE_REQUESTED", device);
}

export default deviceStatusUpdateSaga;
