import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    id: data.id,
    name: data.issue_title,
    steps_attributes: data.steps_attributes,
  };

  try {
    const result = nodeInstance({
      url: encodeURI(`model/${data.model_id}/troubleshoot/${data.trouble_id}`),
      method: "PUT",
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* updateTroubleshootStep(action) {
  const data = {
    model_id: action.payload.model_id,
    trouble_id: action.payload.trouble_id,
  };
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.troubleshoot.title} Troubleshoot Step details updated Successfully`,
      type: "success",
    };
    yield put({
      type: "UPDATE_TROUBLESHOOT_STEP_SUCCESS",
      troubleshootList: res.data,
    });
    yield put({ type: "TROUBLESHOOT_DETAILS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to update Troubleshoot Step details",
      type: "failed",
    };

    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "UPDATE_TROUBLESHOOT_STEP_FAILED",
        message: e.response.data.message,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "UPDATE_TROUBLESHOOT_STEP_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* updateTroubleshootStepSaga() {
  yield takeEvery("UPDATE_TROUBLESHOOT_STEP_REQUESTED", updateTroubleshootStep);
}
export default updateTroubleshootStepSaga;
