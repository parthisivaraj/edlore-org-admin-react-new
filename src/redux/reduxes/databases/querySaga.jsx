import { call, put, debounce } from "redux-saga/effects";
import { AI_QUERY_FAILED, AI_QUERY_REQUESTED, AI_QUERY_SUCCESS } from "./types";
import { nodeInstance } from "../../../api/api_instance";
import { marqoInstance } from "../../../api/marqo_api_instance";

async function getApi(data) {
  try {
    const url = `database/search/${data.database}?query=${data.query}`;
    const result = await marqoInstance({
      url,
      method: "GET",
      data,
    });
    return result;
  } catch (error) {
    throw error;
  }
}

function* runQuery(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: AI_QUERY_SUCCESS,
      payload: {
        ...res.data,
        databaseId: action.payload.database,
      },
    });
  } catch (e) {
    yield put({ type: AI_QUERY_FAILED, message: e.message });
  }
}

export function* aiQuerySaga() {
  yield debounce(1000, AI_QUERY_REQUESTED, runQuery);
}
