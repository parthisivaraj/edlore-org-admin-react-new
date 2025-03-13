import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/error_code/${data.errorCodeId}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* errorCode(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "ERROR_CODE_DETAILS_SUCCESS",
      errorCodeDetails: res.data,
    });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "ERROR_CODE_DETAILS_FAILED",
        message: e.response.data,
      });
    } else {
      yield put({
        type: "ERROR_CODE_DETAILS_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* errorCodeDetailsSaga() {
  yield takeEvery("ERROR_CODE_DETAILS_REQUESTED", errorCode);
}

export default errorCodeDetailsSaga;
