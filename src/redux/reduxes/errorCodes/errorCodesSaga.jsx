import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/error_codes/1?search=${encodeURIComponent(
        search,
      )}&limit=${data.limit}&page=${data.page + 1}&sort_column=${
        data.sorting
      }&paginate=${data.paginate}&sort_order=${
        data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""
      }&filters=${JSON.stringify(data.filter)}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchErrorCodes(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_ALL_ERROR_CODES_SUCCESS",
      errorCodesList: res.data,
    });
  } catch (e) {
    yield put({ type: "GET_ALL_ERROR_CODES_FAILED", message: e.message });
  }
}

function* errorCodesSaga() {
  yield debounce(1000, "GET_ALL_ERROR_CODES_REQUESTED", fetchErrorCodes);
}

export default errorCodesSaga;
