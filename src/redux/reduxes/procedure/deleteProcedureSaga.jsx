import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/procedure/${data.id}`,
      method: "DELETE",
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
    search: "",
    page: 0,
    filter: {},
    limit: 10,
    sort_column: "",
    paginate: true,
  };
  const modelData = {
    model_id: action.payload.model_id,
    search: "",
    page: 0,
    filter: {},
    limit: 10,
    paginate: true,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.name} Procedure deleted Successfully`,
      type: "success",
    };
    yield put({ type: "DELETE_PROCEDURE_SUCCESS", data: res.data });
    yield put({ type: "ALL_PROCEDURE_REQUESTED", payload: data });
    yield put({ type: "GET_MODEL_PROCEDURE_REQUESTED", payload: modelData });
    yield put({
      type: "MODEL_DETAILS_REQUESTED",
      payload: action.payload.model_id,
    });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Procedure",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({ type: "DELETE_PROCEDURE_FAILED", message: e.response.data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_PROCEDURE_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }

    if (e.response.status === 409) {
      const toastrConflictData = {
        content:
          "Selected Procedure is associated with Workorder/s, you can't delete this Procedure",
        type: "failed",
      };
      yield put({ type: "DELETE_PROCEDURE_FAILED", message: e.message });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrConflictData });
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

function* deleteProcedureSaga() {
  yield takeEvery("DELETE_PROCEDURE_REQUESTED", procedure);
}

export default deleteProcedureSaga;
