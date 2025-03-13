import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `/device/${data}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchDeviceDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "DEVICE_DETAILS_SUCCESS", deviceDetails: res.data });
  } catch (e) {
    yield put({ type: "DEVICE_DETAILS_FAILED", message: e.message });
  }
}

function* deviceDetailsSaga() {
  yield takeEvery("DEVICE_DETAILS_REQUESTED", fetchDeviceDetails);
}

export default deviceDetailsSaga;
