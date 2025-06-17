import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
  var formData = new FormData();
  formData.append(`title`, data.name);
  formData.append(`device_id`, data.device_id);
  formData.append(`work_order_number`, data.work_order_number);

  try {
    const result = instance({
      url: `/work_order/${data.wo_id}/edit_first_page`,
      method: "PATCH",
      data: formData,
    }).then((response) => {
      return response;
    })
    return await result;
  } catch (error) {
    throw error;
  }
}

function* addWorkorder(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "UPDATE_DEVICE_TAB_SUCCESS", stepOneData: res.data.work_order });
    // window.location.href = "/active-workorders"

  } catch (e) {
    // if (e.response.status == 422) {
    yield put({ type: "UPDATE_DEVICE_TAB_FAILED", message: e.response.data });
    // } else if (e.response.status === 406 || e.response.status === 404) {
    //   yield put({ type: "ADD_WORKORDER_FAILED", message: e.response.data });
    // } else {
    //   yield put({ type: "ADD_WORKORDER_FAILED", message: null });
    // }
  }
}

function* updateWorkOrderTabOneSaga() {
  yield takeEvery("UPDATE_DEVICE_TAB_REQUESTED", addWorkorder);
}

export default updateWorkOrderTabOneSaga;