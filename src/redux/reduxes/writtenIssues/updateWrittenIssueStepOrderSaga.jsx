import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    name: data.name,
    model_id: data.model_id,
    section_id: data.section_id,
    steps_attributes: data.steps_attributes,
  };

  try {
    const result = nodeInstance({
      url: encodeURI(
        `model/${data.model_id}/section/${data.section_id}/written_issues/${data.wi_id}`,
      ),
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

function* updateWIStepOrder(action) {
  const data = {
    model_id: action.payload.model_id,
    section_id: action.payload.section_id,
  };
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "UPDATE_WRITTEN_ISSUE_STEP_ORDER_SUCCESS",
      writtenIssuesList: res.data,
    });
    yield put({ type: "WRITTEN_ISSUE_DETAILS_REQUESTED", payload: data });
  } catch (e) {
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "UPDATE_WRITTEN_ISSUE_STEP_ORDER_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({
        type: "UPDATE_WRITTEN_ISSUE_STEP_ORDER_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* updateWrittenIssueStepOrderSaga() {
  yield takeEvery(
    "UPDATE_WRITTEN_ISSUE_STEP_ORDER_REQUESTED",
    updateWIStepOrder,
  );
}
export default updateWrittenIssueStepOrderSaga;
