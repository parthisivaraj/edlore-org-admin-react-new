import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/sketches/3?search=${encodeURIComponent(
        search,
      )}&limit=${data.limit}&page=${data.page + 1}&sort_column=${
        data.sorting
      }&sort_order=${
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

function* fetchAnimations(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "GET_ALL_ANIMATIONS_SUCCESS", allAnimations: res.data });
  } catch (e) {
    yield put({ type: "GET_ALL_ANIMATIONS_FAILED", message: e.message });
  }
}

function* animationsSaga() {
  yield debounce(1000, "GET_ALL_ANIMATIONS_REQUESTED", fetchAnimations);
}

export default animationsSaga;
