import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    id: data.id,
    name: data.issue_title,
    model_id: data.model_id,
    steps_attributes: [],
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/section/${data.section_id}/written_issues/${data.wi_id}`,
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

function* updateWrittenIssue(action) {
  const data = {
    model_id: action.payload.model_id,
    section_id: action.payload.section_id,
    search: "",
    page: 0,
    filter: {},
    limit: 10,
  };
  const detailsData = {
    model_id: action.payload.model_id,
    section_id: action.payload.section_id,
    wi_id: action.payload.wi_id,
  };
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "UPDATE_WRITTEN_ISSUE_SUCCESS",
      writtenIssuesList: res.data,
    });
    yield put({ type: "GET_ALL_WRITTEN_ISSUES_REQUESTED", payload: data });
    yield put({
      type: "WRITTEN_ISSUE_DETAILS_REQUESTED",
      payload: detailsData,
    });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "UPDATE_WRITTEN_ISSUE_FAILED",
        message: e.response.data.errors,
      });
    } else {
      yield put({
        type: "UPDATE_WRITTEN_ISSUE_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* updateWrittenIssueSaga() {
  yield takeEvery("UPDATE_WRITTEN_ISSUE_REQUESTED", updateWrittenIssue);
}

export default updateWrittenIssueSaga;
