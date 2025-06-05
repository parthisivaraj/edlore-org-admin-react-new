import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";
import { SET_TOASTER_SUCCESS } from "../toaster/types";
import {
  DELETE_DATABASE_FAILED,
  DELETE_DATABASE_REQUESTED,
  DELETE_DATABASE_SUCCESS,
  GET_ALL_DATABASES_REQUESTED,
} from "./types";
import { marqoInstance } from "../../../api/marqo_api_instance";

async function getApi(data) {
  try {
    const result = marqoInstance({
      url: `database/${data.id}`,
      method: "DELETE",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* deleteDatabase(action) {
  const data = {
    search: "",
    page: 0,
    limit: 10,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `Database deleted Successfully`,
      type: "success",
    };
    yield put({ type: DELETE_DATABASE_SUCCESS, sectionsList: res.data });
    yield put({ type: GET_ALL_DATABASES_REQUESTED, payload: data });
    yield put({ type: SET_TOASTER_SUCCESS, data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Database",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({ type: DELETE_DATABASE_FAILED, message: e.response.data });
      yield put({ type: SET_TOASTER_SUCCESS, data: toastrData });
    } else {
      yield put({
        type: DELETE_DATABASE_FAILED,
        message: "Some error occurred",
      });
      yield put({ type: SET_TOASTER_SUCCESS, data: toastrData });
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

export function* deleteDatabaseSaga() {
  yield takeEvery(DELETE_DATABASE_REQUESTED, deleteDatabase);
}
