import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/error_code/${data.id}`,
      method: "DELETE",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* deleteErrorCode(action) {
  const data = {
    model_id: action.payload.model_id,
    search: "",
    page: 0,
    error_type: action.payload.error_type,
    filter: {},
    limit: 10,
  };
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} Error Code deleted Successfully`,
      type: "success",
    };
    yield put({ type: "DELETE_ERROR_CODE_SUCCESS", errorCodesList: res.data });
    if (action.payload.error_type == 1) {
      yield put({ type: "GET_ALL_ERROR_CODES_REQUESTED", payload: data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else if (action.payload.error_type == 2) {
      yield put({ type: "GET_ALL_MCODES_REQUESTED", payload: data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else if (action.payload.error_type == 3) {
      yield put({ type: "GET_ALL_ALARM_CODES_REQUESTED", payload: data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
    }
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Error Code",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({ type: "DELETE_ERROR_CODE_FAILED", message: e.response.data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_ERROR_CODE_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }

    if (e.response.status === 409) {
      const toastrConflictData = {
        content:
          "Selected Error Code is associated with Workorder/s, you can't delete this Error Code",
        type: "failed",
      };
      yield put({ type: "DELETE_ERROR_CODE_FAILED", message: e.message });
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

function* deleteErrorCodeSaga() {
  yield takeEvery("DELETE_ERROR_CODE_REQUESTED", deleteErrorCode);
}

export default deleteErrorCodeSaga;
