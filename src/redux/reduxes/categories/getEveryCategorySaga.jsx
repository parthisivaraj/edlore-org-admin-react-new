import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `/category`,
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
      type: "GET_EVERY_CATEGORY_SUCCESS",
      everyCategoryList: res.data,
    });
  } catch (e) {
    yield put({ type: "GET_EVERY_CATEGORY_FAILED", message: e.message });
  }
}

function* getEveryCategorySaga() {
  yield takeEvery("GET_EVERY_CATEGORY_REQUESTED", fetchAllCategories);
}

export default getEveryCategorySaga;
