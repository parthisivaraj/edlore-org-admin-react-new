import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    name: data.name,
  };

  try {
    const result = nodeInstance({
      url: `part_fields`,
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

function* addPartFieldsNote(action) {
  const data = {
    search: "",
    page: 0,
    limit: 10,
    sort: "",
    sorting: "",
    name: action.payload.name,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} Part Fields added Successfully`,
      type: "success",
    };
    yield put({
      type: "ADD_PART_FIELDS_SUCCESS",
      allPartFieldsList: res.data,
    });
    yield put({ type: "GET_ALL_PART_FIELDS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "ADD_PART_FIELDS_FAILED",
        message: e.response.data.errors,
      });
    } else {
      yield put({
        type: "ADD_PART_FIELDS_FAILED",
        message: "Some error occurred",
      });
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

function* addPartFieldsSaga() {
  yield takeEvery("ADD_PART_FIELDS_REQUESTED", addPartFieldsNote);
}

export default addPartFieldsSaga;
