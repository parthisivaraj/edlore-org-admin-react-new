import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const formData = {
    id: data.id,
    title: data.title,
    code: data.code,
    description: data.description,
    error_type: data.error_type,
    error_code_linkings_attributes: data.error_code_linkings_attributes,
    error_code_machine_type_attributes: data.error_code_machine_type,
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/error_code/${data.errorCodeId}`,
      method: "PATCH",
      data: formData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* updateErrorCode(action) {
  const data = {
    model_id: action.payload.model_id,
    search: "",
    page: 0,
    error_type: action.payload.error_type,
    filter: {},
    limit: 10,
  };
  const detailsData = {
    model_id: action.payload.model_id,
    errorCodeId: action.payload.errorCodeId,
  };
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.error.title} ${
        action.payload.error_type == 3
          ? "Alarm code"
          : action.payload.error_type == 2
          ? "M code"
          : "Error code"
      } details updated Successfully`,
      type: "success",
    };
    yield put({ type: "UPDATE_ERROR_CODE_SUCCESS", errorCodeList: res.data });
    if (action.payload.error_type == 1) {
      yield put({ type: "GET_ALL_ERROR_CODES_REQUESTED", payload: data });
      yield put({ type: "ERROR_CODE_DETAILS_REQUESTED", payload: detailsData });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else if (action.payload.error_type == 2) {
      yield put({ type: "GET_ALL_MCODES_REQUESTED", payload: data });
      yield put({ type: "ERROR_CODE_DETAILS_REQUESTED", payload: detailsData });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else if (action.payload.error_type == 3) {
      yield put({ type: "GET_ALL_ALARM_CODES_REQUESTED", payload: data });
      yield put({ type: "ERROR_CODE_DETAILS_REQUESTED", payload: detailsData });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
    }
  } catch (e) {
    const toastrData = {
      content: `Failed to Update the ${
        action.payload.error_type == 3
          ? "Alarm code"
          : action.payload.error_type == 2
          ? "M code"
          : "Error code"
      }`,
      type: "failed",
    };
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "UPDATE_ERROR_CODE_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "UPDATE_ERROR_CODE_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* updateErrorCodeSaga() {
  yield takeEvery("UPDATE_ERROR_CODE_REQUESTED", updateErrorCode);
}

export default updateErrorCodeSaga;
