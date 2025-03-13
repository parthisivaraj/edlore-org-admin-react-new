import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `/category/primary?primary_only=true&org_id=${data.org_id}&paginate=${data.paginate}`,
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
    yield put({ type: "ALL_CATEGORIES_SUCCESS", categories: res.data });
  } catch (e) {
    yield put({ type: "ALL_CATEGORIES_FAILED", message: e.message });
  }
}

function* allCategoriesSaga() {
  yield takeEvery("ALL_CATEGORIES_REQUESTED", fetchAllCategories);
}

export default allCategoriesSaga;
