import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `device/${data.id}`,
      method: "DELETE",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* addDevice(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.name} Device deleted Successfully`,
      type: "success",
    };
    yield put({ type: "DELETE_DEVICE_SUCCESS", deviceData: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    if (action.payload.deletingFrom == "device") {
      window.location.href = `/devices`;
    } else {
      window.location.href = `/device-model/${res.data.model_id}`;
    }
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Device",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "DELETE_DEVICE_FAILED",
        message: e.response.data.message,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_DEVICE_FAILED",
        message: "Some error occured",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }

    if (e.response.status === 409) {
      const toastrConflictData = {
        content:
          "Selected Device is associated with Workorder/s, you can't delete this Device",
        type: "failed",
      };
      yield put({ type: "DELETE_DEVICE_FAILED", message: e.message });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrConflictData });
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

function* deleteDeviceSaga() {
  yield takeEvery("DELETE_DEVICE_REQUESTED", addDevice);
}

export default deleteDeviceSaga;
