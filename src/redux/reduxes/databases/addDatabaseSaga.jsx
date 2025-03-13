import { call, put, takeEvery } from "redux-saga/effects";
import {
  ADD_DATABASE_FAILED,
  ADD_DATABASE_REQUESTED,
  ADD_DATABASE_SUCCESS,
} from "./types";
import { SET_TOASTER_SUCCESS } from "../toaster/types";
import { marqoInstance } from "../../../api/marqo_api_instance";
import { nodeInstance } from "../../../api/api_instance";

async function createApi(data) {
  try {
    const url = `database`;
    const result = await nodeInstance({
      url,
      method: "POST",
      data,
    });
    return result;
  } catch (error) {
    throw error;
  }
}

function* addDocument(action) {
  try {
    const res = yield call(createApi, action.payload);
    const toastrData = {
      content: `${res.data.name} database added Successfully`,
      type: "success",
    };
    yield put({ type: ADD_DATABASE_SUCCESS, newDatabase: res.data });
    yield put({ type: SET_TOASTER_SUCCESS, data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: ADD_DATABASE_FAILED,
        message: e.response.data.errors,
      });
    } else {
      yield put({
        type: ADD_DATABASE_FAILED,
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
      yield put({ type: SET_TOASTER_SUCCESS, data: toastrFailedData });
    }
  }
}

export function* addDatabaseSaga() {
  yield takeEvery(ADD_DATABASE_REQUESTED, addDocument);
}
