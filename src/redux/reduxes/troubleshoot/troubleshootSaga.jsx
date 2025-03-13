import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/troubleshoot?search=${encodeURIComponent(
        search,
      )}&limit=${data.limit ? data.limit : 20}&page=${
        data.page + 1
      }&sort_column=${data.sorting}&paginate=${data.paginate}&sort_order=${
        data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""
      }`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchTroubleshoot(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_ALL_TROUBLESHOOT_SUCCESS",
      troubleshootList: res.data,
    });
  } catch (e) {
    yield put({ type: "GET_ALL_TROUBLESHOOT_FAILED", message: e.message });
  }
}

function* troubleshootSaga() {
  yield debounce(1000, "GET_ALL_TROUBLESHOOT_REQUESTED", fetchTroubleshoot);
}

export default troubleshootSaga;
