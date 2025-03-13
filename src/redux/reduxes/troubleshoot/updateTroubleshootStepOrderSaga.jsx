import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    name: data.name,
    model_id: data.model_id,
    troubleshoot_steps_attributes: data.steps_attributes,
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

function* updateTroubleshootStepOrder(action) {
  const data = {
    model_id: action.payload.model_id,
    trouble_id: action.payload.trouble_id,
  };
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "UPDATE_TROUBLESHOOT_STEP_ORDER_SUCCESS",
      troubleshootList: res.data,
    });
    yield put({ type: "TROUBLESHOOT_DETAILS_REQUESTED", payload: data });
  } catch (e) {
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "UPDATE_TROUBLESHOOT_STEP_ORDER_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({
        type: "UPDATE_TROUBLESHOOT_STEP_ORDER_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* updateTroubleshootStepOrderSaga() {
  yield takeEvery(
    "UPDATE_TROUBLESHOOT_STEP_ORDER_REQUESTED",
    updateTroubleshootStepOrder,
  );
}
export default updateTroubleshootStepOrderSaga;
