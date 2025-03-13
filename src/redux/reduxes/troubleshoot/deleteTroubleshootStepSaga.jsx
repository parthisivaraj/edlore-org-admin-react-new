import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
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

function* deleteTroubleshootStep(action) {
  const data = {
    model_id: action.payload.model_id,
    trouble_id: action.payload.trouble_id,
  };
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: "Troubleshoot Step deleted Successfully",
      type: "success",
    };
    yield put({
      type: "DELETE_TROUBLESHOOT_STEP_SUCCESS",
      troubleshootList: res.data,
    });
    yield put({ type: "TROUBLESHOOT_DETAILS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Troubleshoot Step",
      type: "failed",
    };

    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "DELETE_TROUBLESHOOT_STEP_FAILED",
        message: e.response.data.message,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_TROUBLESHOOT_STEP_FAILED",
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

function* deleteTroubleshootStepSaga() {
  yield takeEvery("DELETE_TROUBLESHOOT_STEP_REQUESTED", deleteTroubleshootStep);
}
export default deleteTroubleshootStepSaga;
