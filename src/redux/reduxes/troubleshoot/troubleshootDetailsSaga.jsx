import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/troubleshoot/${data.trouble_id}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* troubleshootDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "TROUBLESHOOT_DETAILS_SUCCESS", data: res.data });
  } catch (e) {
    yield put({
      type: "TROUBLESHOOT_DETAILS_FAILED",
      message: e.response.data,
    });
  }
}

function* troubleshootDetailsSaga() {
  yield takeEvery("TROUBLESHOOT_DETAILS_REQUESTED", troubleshootDetails);
}

export default troubleshootDetailsSaga;
