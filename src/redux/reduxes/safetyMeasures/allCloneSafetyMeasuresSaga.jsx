import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/safety_measure?search=${encodeURIComponent(
        search,
      )}&limit=${data.limit}&page=${data.page + 1}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* cloneSafetyMeasures(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_ALL_CLONE_SAFETY_MEASURES_SUCCESS",
      cloneSafetyMeasuresList: res.data,
    });
  } catch (e) {
    yield put({
      type: "GET_ALL_CLONE_SAFETY_MEASURES_FAILED",
      message: e.message,
    });
  }
}

function* allCloneSafetyMeasuresSaga() {
  yield debounce(
    1000,
    "GET_ALL_CLONE_SAFETY_MEASURES_REQUESTED",
    cloneSafetyMeasures,
  );
}

export default allCloneSafetyMeasuresSaga;
