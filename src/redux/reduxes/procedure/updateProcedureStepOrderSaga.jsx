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
  const allProcedureData = {
    search: "",
    page: 0,
    limit: 10,
    filter: {},
    sort: false,
    sorting: "",
  };
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "UPDATE_PROCEDURE_STEP_ORDER_SUCCESS",
      deviceData: res.data,
    });
    yield put({ type: "PROCEDURE_DETAILS_REQUESTED", payload: data });
    if (window.location.pathname == "/procedures") {
      yield put({ type: "ALL_PROCEDURE_REQUESTED", payload: allProcedureData });
    } else if (window.location.pathname == "/device-model") {
      yield put({ type: "GET_MODEL_PROCEDURE_REQUESTED", payload: data });
    } else {
    }
  } catch (e) {
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "UPDATE_PROCEDURE_STEP_ORDER_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({
        type: "UPDATE_PROCEDURE_STEP_ORDER_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* updateProcedureStepOrderSaga() {
  yield takeEvery("UPDATE_PROCEDURE_STEP_ORDER_REQUESTED", procedure);
}
export default updateProcedureStepOrderSaga;
