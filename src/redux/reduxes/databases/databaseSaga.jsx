import { call, put, debounce } from "redux-saga/effects";
import {
  GET_ALL_DATABASES_FAILED,
  GET_ALL_DATABASES_REQUESTED,
  GET_ALL_DATABASES_SUCCESS,
} from "./types";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const url = `database`;
    const result = await nodeInstance({
      url,
      method: "GET",
      data,
    });
    return result;
  } catch (error) {
    throw error;
  }
}

function* fetchDatabase(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: GET_ALL_DATABASES_SUCCESS, databaseList: res.data.data });
  } catch (e) {
    yield put({ type: GET_ALL_DATABASES_FAILED, message: e.message });
  }
}

export function* databaseSaga() {
  yield debounce(1000, GET_ALL_DATABASES_REQUESTED, fetchDatabase);
}
