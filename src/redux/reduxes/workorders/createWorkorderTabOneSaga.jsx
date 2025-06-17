import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
  // var formData = new FormData();
  // formData.append(`title`, data.name);
  // formData.append(`device_id`, data.device_id);
  // formData.append(`work_order_number`, data.work_order_number);
  // formData.append(`status`, 4);

  var formData = {'title':data.name, 'device_id': parseInt(data.device_id), 'work_order_number':data.work_order_number, 'status':4 };

  try {
    const result = instance({
      url: "/work_order",
      method: "POST",
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
    yield put({ type: "ADD_DEVICE_TAB_SUCCESS", stepOneData: res.data.work_order });
    // window.location.href = "/active-workorders"

  } catch (e) {
    // if (e.response.status == 422) {
    yield put({ type: "ADD_DEVICE_TAB_FAILED", message: e.response.data });
    // } else if (e.response.status === 406 || e.response.status === 404) {
    //   yield put({ type: "ADD_WORKORDER_FAILED", message: e.response.data });
    // } else {
    //   yield put({ type: "ADD_WORKORDER_FAILED", message: null });
    // }
  }
}

function* createWorkOrderTabOneSaga() {
  yield takeEvery("ADD_DEVICE_TAB_REQUESTED", addWorkorder);
}

export default createWorkOrderTabOneSaga;