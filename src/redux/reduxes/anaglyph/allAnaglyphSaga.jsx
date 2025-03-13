import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `model/${
        data.model_id
      }/display_all_anaglyph?search=${encodeURIComponent(search)}&limit=${
        data.limit
      }&page=${data.page + 1}&sort_column=${data.sorting}&sort_order=${
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

function* allAnaglyph(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "GET_ALL_ANAGLYPH_SUCCESS", anaglyphList: res.data });
  } catch (e) {
    yield put({ type: "GET_ALL_ANAGLYPH_FAILED", message: e.message });
  }
}

function* allAnaglyphSaga() {
  yield takeEvery("GET_ALL_ANAGLYPH_REQUESTED", allAnaglyph);
}

export default allAnaglyphSaga;
