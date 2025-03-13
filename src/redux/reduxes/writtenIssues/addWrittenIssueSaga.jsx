import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    id: data.id,
    name: data.issue_title,
    section_id: data.map_section,
    model_id: data.model_id,
    steps_attributes: [
      {
        title: "Step 1",
        description: "Enter Description",
        step_order: 1,
        attached_medias_attributes: [],
      },
    ],
  };
  try {
    const result = nodeInstance({
      url: encodeURI(
        `model/${data.model_id}/section/${data.section_id}/written_issues`,
      ),
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

function* addWrittenIssue(action) {
  try {
    const res = yield call(getApi, action.payload);
    const data = {
      model_id: action.payload.model_id,
      section_id: action.payload.section_id,
      search: "",
      page: 0,
      filter: {},
      limit: 10,
    };
    const toastrData = {
      content: `${res.data.name} Written Issue Title added Successfully`,
      type: "success",
    };

    yield put({
      type: "ADD_WRITTEN_ISSUE_SUCCESS",
      writtenIssuesList: res.data,
    });
    yield put({ type: "GET_ALL_WRITTEN_ISSUES_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to Create Written Issue Title",
      type: "failed",
    };

    if (e.response.status === 406 || e.response.status === 422) {
      yield put({
        type: "ADD_WRITTEN_ISSUE_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "ADD_WRITTEN_ISSUE_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* addWrittenIssueSaga() {
  yield takeEvery("ADD_WRITTEN_ISSUE_REQUESTED", addWrittenIssue);
}

export default addWrittenIssueSaga;
