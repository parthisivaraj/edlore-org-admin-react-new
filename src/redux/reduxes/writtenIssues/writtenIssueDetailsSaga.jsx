import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/section/${data.section_id}/written_issues/${data.wi_id}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* writtenIssueDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "WRITTEN_ISSUE_DETAILS_SUCCESS", data: res.data });
  } catch (e) {
    yield put({
      type: "WRITTEN_ISSUE_DETAILS_FAILED",
      message: e.response.data,
    });
  }
}

function* writtenIssueDetailsSaga() {
  yield takeEvery("WRITTEN_ISSUE_DETAILS_REQUESTED", writtenIssueDetails);
}

export default writtenIssueDetailsSaga;
