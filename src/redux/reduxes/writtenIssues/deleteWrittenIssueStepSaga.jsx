import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    // name: data.name,
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

function* deleteWrittenIssueStep(action) {
  const data = {
    section_id: action.payload.section_id,
    model_id: action.payload.model_id,
    wi_id: action.payload.wi_id,
    filter: {},
  };
  const allData = {
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
      content: "Written Issue Step deleted Successfully",
      type: "success",
    };

    yield put({
      type: "DELETE_WRITTEN_ISSUE_STEP_SUCCESS",
      writtenIssuesList: res.data,
    });
    yield put({ type: "WRITTEN_ISSUE_DETAILS_REQUESTED", payload: data });
    yield put({ type: "GET_ALL_WRITTEN_ISSUES_REQUESTED", payload: allData });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Written Issue Step",
      type: "failed",
    };

    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "DELETE_WRITTEN_ISSUE_STEP_FAILED",
        message: e.response.data.message,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_WRITTEN_ISSUE_STEP_FAILED",
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

function* deleteWrittenIssueStepSaga() {
  yield takeEvery(
    "DELETE_WRITTEN_ISSUE_STEP_REQUESTED",
    deleteWrittenIssueStep,
  );
}
export default deleteWrittenIssueStepSaga;
