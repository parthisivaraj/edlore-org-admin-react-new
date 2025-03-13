import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    id: data.id,
    name: data.issue_title,
    section_id: data.map_section,
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

function* updateWIStep(action) {
  const data = {
    model_id: action.payload.model_id,
    wi_id: action.payload.wi_id,
    section_id: action.payload.section_id,
  };
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.name} Written Issue Step details updated Successfully`,
      type: "success",
    };

    yield put({
      type: "UPDATE_WRITTEN_ISSUE_STEP_SUCCESS",
      writtenIssuesList: res.data,
    });
    yield put({ type: "WRITTEN_ISSUE_DETAILS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to update Written Issue Step details",
      type: "failed",
    };

    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "UPDATE_WRITTEN_ISSUE_STEP_FAILED",
        message: e.response.data.message,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "UPDATE_WRITTEN_ISSUE_STEP_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* updateWrittenIssueStepSaga() {
  yield takeEvery("UPDATE_WRITTEN_ISSUE_STEP_REQUESTED", updateWIStep);
}
export default updateWrittenIssueStepSaga;
