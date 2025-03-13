import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `/category/secondary?parent_id=${data}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchAllCategories(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_SECONDARY_CATEGORIES_SUCCESS",
      secondaryCategories: res.data,
    });
  } catch (e) {
    yield put({ type: "GET_SECONDARY_CATEGORIES_FAILED", message: e.message });
  }
}

function* secondaryCategoriesSaga() {
  yield takeEvery("GET_SECONDARY_CATEGORIES_REQUESTED", fetchAllCategories);
}

export default secondaryCategoriesSaga;
