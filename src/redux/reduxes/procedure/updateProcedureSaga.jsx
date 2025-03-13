import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    name: data.procedureName,
    steps_attributes: [],
    procedure_id: data.procedure_id,
    model_id: data.model_id,
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
    search: "",
    page: 0,
    limit: 10,
    filter: {},
    sort: false,
    sorting: "",
  };
  const allProcedureData = {
    search: "",
    page: 0,
    limit: 10,
    filter: {},
    sort: false,
    sorting: "",
  };
  const errorCodeData = {
    error_id: action.payload.error_id,
    search: "",
    page: 0,
    limit: 10,
    sort: false,
    sorting: "",
    filter: {},
  };

  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "UPDATE_PROCEDURE_SUCCESS", deviceData: res.data });
    yield put({ type: "PROCEDURE_DETAILS_REQUESTED", payload: data });
    if (window.location.pathname == "/procedures") {
      yield put({ type: "ALL_PROCEDURE_REQUESTED", payload: allProcedureData });
    } else {
      if (action.payload.callingFrom == "error_code") {
        yield put({
          type: "GET_ALL_PROCEDURE_LINKED_TO_ERROR_REQUESTED",
          payload: errorCodeData,
        });
      } else {
        yield put({ type: "GET_MODEL_PROCEDURE_REQUESTED", payload: data });
      }
    }
  } catch (e) {
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "UPDATE_PROCEDURE_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({
        type: "UPDATE_PROCEDURE_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* updateProcedureSaga() {
  yield takeEvery("UPDATE_PROCEDURE_REQUESTED", procedure);
}
export default updateProcedureSaga;
