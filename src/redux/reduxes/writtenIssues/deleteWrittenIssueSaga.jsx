import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/section/${data.section_id}/written_issues/${data.wi_id}`,
      method: "DELETE",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* deleteWrittenIssue(action) {
  const data = {
    model_id: action.payload.model_id,
    section_id: action.payload.section_id,
    search: "",
    page: 0,
    filter: {},
    limit: 10,
  };
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.name} Written Issue deleted Successfully`,
      type: "success",
    };

    yield put({
      type: "DELETE_WRITTEN_ISSUE_SUCCESS",
      writtenIssuesList: res.data,
    });
    yield put({ type: "GET_ALL_WRITTEN_ISSUES_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Written Issue",
      type: "failed",
    };

    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "DELETE_WRITTEN_ISSUE_FAILED",
        message: e.response.data,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_WRITTEN_ISSUE_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }

    if (e.response.status === 500) {
      const toastrFailedData = {
        content: e.response.data.errors
          ? e.response.data.errors
          : "Something went wrong!",
        type: "failed",
      };
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrFailedData });
    }
  }
}

function* deleteWrittenIssueSaga() {
  yield takeEvery("DELETE_WRITTEN_ISSUE_REQUESTED", deleteWrittenIssue);
}

export default deleteWrittenIssueSaga;
