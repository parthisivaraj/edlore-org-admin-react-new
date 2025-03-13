import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    title: data.title,
    code: data.code,
    description: data.description,
    error_type: data.error_type,
    error_code_linkings_attributes: data.error_code_linkings_attributes,
    error_code_machine_type_attributes: data.error_code_machine_type,
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/error_code`,
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

function* addErrorCode(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} ${
        action.payload.error_type == 3
          ? "Alarm code"
          : action.payload.error_type == 2
          ? "M code"
          : "Error code"
      } added Successfully`,
      type: "success",
    };
    const data = {
      model_id: action.payload.model_id,
      id: res.data.id,
      search: "",
      page: 0,
      error_type: action.payload.error_type,
      filter: {},
      limit: 10,
      paginate:
        window.location.pathname.split("/")[1] == "workorder" ? false : true,
    };
    yield put({ type: "ADD_ERROR_CODE_SUCCESS", errorCodesList: res.data });
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
      content: `Failed to create an  ${
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
        type: "ADD_ERROR_CODE_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "ADD_ERROR_CODE_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* addErrorCodeSaga() {
  yield takeEvery("ADD_ERROR_CODE_REQUESTED", addErrorCode);
}

export default addErrorCodeSaga;
