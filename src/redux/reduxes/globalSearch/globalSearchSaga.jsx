import { call, debounce, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `global_search?search=${data.search}&type=${data.type}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchGlobalSearch(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "GET_ALL_SEARCH_SUCCESS", all: res.data });
  } catch (e) {
    yield put({ type: "GET_ALL_SEARCH_FAILED", message: e.message });
  }
}

function* globalSearchSaga() {
  yield debounce(1000, "GET_ALL_SEARCH_REQUESTED", fetchGlobalSearch);
}

export default globalSearchSaga;
