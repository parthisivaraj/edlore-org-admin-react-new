import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  var formData = new FormData();
  formData.append(`name`, data.name);
  formData.append(`serial_number`, data.serial_no);
  formData.append(`device_id`, data.id);
  formData.append(`width`, data.width);
  formData.append(`depth`, data.height);
  formData.append(`length`, data.length);
  formData.append(`device_location`, data.location);
  formData.append(`generate_qr`, true);
  formData.append(`manufactured_by`, data.manufactured_by);
  formData.append(`warranty_till`, data.warranty);
  formData.append(`manufactured_date`, data.manufactured_date);
  formData.append(`status`, data.status);
  formData.append(`model_id`, data.model_id);
  if (data.model_img.name) {
    formData.append(`image`, data.model_img);
  }
  try {
    const result = nodeInstance({
      url: "device",
      method: "POST",
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
    const toaseData = {
      content: `${res.data.name} Device added Successfully`,
      type: "success",
    };
    yield put({ type: "POST_DEVICE_SUCCESS", deviceData: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toaseData });
    window.location.href = `/device-details/${res.data.id}?page_from=model`;
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "POST_DEVICE_FAILED",
        message: e.response.data.errors,
      });
    }
    if (e.response.status === 500) {
      const toaseFailedData = {
        content: e.response.data.errors
          ? e.response.data.errors
          : "Something went wrong!",
        type: "failed",
      };
      yield put({ type: "SET_TOASTER_SUCCESS", data: toaseFailedData });
    }
  }
}

function* addDeviceSaga() {
  yield takeEvery("POST_DEVICE_REQUESTED", addDevice);
}

export default addDeviceSaga;
