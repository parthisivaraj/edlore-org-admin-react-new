import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    // name: data.name,
    steps_attributes: data.steps_attributes,
  };

  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/procedure/${data.procedure_id}`,
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

function* procedure(action) {
  const data = {
    procedure_id: action.payload.procedure_id,
    model_id: action.payload.model_id,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `Procedure Step deleted Successfully`,
      type: "success",
    };
    yield put({ type: "DELETE_PROCEDURE_STEP_SUCCESS", deviceData: res.data });
    yield put({ type: "PROCEDURE_DETAILS_REQUESTED", payload: data });

    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    // window.location.href = `/device-model/${action.payload.model_id}`
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Procedure Step",
      type: "failed",
    };

    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "DELETE_PROCEDURE_STEP_FAILED",
        message: e.response.data.message,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_PROCEDURE_STEP_FAILED",
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

function* deleteProcedureStepSaga() {
  yield takeEvery("DELETE_PROCEDURE_STEP_REQUESTED", procedure);
}
export default deleteProcedureStepSaga;
