import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    name: data.name,
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
    model_id: action.payload.model_id,
    procedure_id: action.payload.procedure_id,
  };
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "ADD_PROCEDURE_STEP_SUCCESS", deviceData: res.data });
    yield put({ type: "PROCEDURE_DETAILS_REQUESTED", payload: data });

    // window.location.href = `/device-model/${action.payload.model_id}`
  } catch (e) {
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "ADD_PROCEDURE_STEP_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({
        type: "ADD_PROCEDURE_STEP_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* addProcedureStepSaga() {
  yield takeEvery("ADD_PROCEDURE_STEP_REQUESTED", procedure);
}
export default addProcedureStepSaga;
