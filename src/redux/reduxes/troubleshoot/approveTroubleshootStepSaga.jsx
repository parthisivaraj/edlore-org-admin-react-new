import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    trouble_shoot_cause_id: data.trouble_shoot_cause_id,
    approval_status: data.approval_status,
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/troubleshoot/${data.trouble_id}/approval_status_update`,
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

function* updateTroubleshoot(action) {
  const data = {
    model_id: action.payload.model_id,
    search: "",
    page: 0,
    limit: 10,
  };
  const detailsData = {
    model_id: action.payload.model_id,
    trouble_id: action.payload.trouble_id,
  };
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "APPROVE_TROUBLESHOOT_STEP_SUCCESS",
      troubleshootList: res.data,
    });
    yield put({ type: "GET_ALL_TROUBLESHOOT_REQUESTED", payload: data });
    yield put({ type: "TROUBLESHOOT_DETAILS_REQUESTED", payload: detailsData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "APPROVE_TROUBLESHOOT_STEP_FAILED",
        message: e.response.data,
      });
    } else {
      yield put({
        type: "APPROVE_TROUBLESHOOT_STEP_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* approveTroubleshootStepSaga() {
  yield takeEvery("APPROVE_TROUBLESHOOT_STEP_REQUESTED", updateTroubleshoot);
}

export default approveTroubleshootStepSaga;
