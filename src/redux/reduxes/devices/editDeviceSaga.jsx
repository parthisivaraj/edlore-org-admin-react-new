import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  var formData = new FormData();
  formData.append(`name`, data.name);
  formData.append(`serial_number`, data.serial_number);
  formData.append(`device_id`, data.device_id);
  formData.append(`width`, data.width);
  formData.append(`depth`, data.height);
  formData.append(`length`, data.length);
  formData.append(`device_location`, data.location);
  formData.append(`generate_qr`, true);
  formData.append(`manufactured_by`, data.manufactured_by);
  formData.append(`manufactured_date`, data.manufactured_date);
  formData.append(`warranty_till`, data.warranty);
  formData.append(`status`, data.status);
  formData.append(`model_id`, data.model_id);
  formData.append(`id`, data.id);
  if (data.image.size) {
    formData.append(`image`, data.image);
  }
  try {
    const result = nodeInstance({
      url: `device/${data.id}`,
      method: "PUT",
      data: formData,
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
      content: `${res.data.device.name} Device details updated Successfully`,
      type: "success",
    };
    yield put({ type: "EDIT_DEVICE_SUCCESS", deviceData: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    window.location.href = `/device-details/${action.payload.id}?page_from=device`;
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "EDIT_DEVICE_FAILED",
        message: e.response.data.errors,
      });
    } else {
      yield put({ type: "EDIT_DEVICE_FAILED", message: "Some error occured" });
    }

    if (e.response.status === 409) {
      const toastrConflictData = {
        content:
          "Selected Device is associated with workorder/s, you can't update/change the status of this Device",
        type: "failed",
      };
      yield put({
        type: "EDIT_DEVICE_FAILED",
        message: e.response.data.errors,
      });
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

function* editDeviceSaga() {
  yield takeEvery("EDIT_DEVICE_REQUESTED", addDevice);
}

export default editDeviceSaga;
