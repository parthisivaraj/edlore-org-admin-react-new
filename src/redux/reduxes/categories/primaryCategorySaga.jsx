import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.query.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `/category/primary?org_id=${data.orgId}&search=${encodeURIComponent(
        search,
      )}&limit=${data.limit}&page=${data.page + 1}&sort_column=${
        data.sorting ? data.sorting : ""
      }&sort_order=${data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""}`,
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
      type: "GET_PRIMARY_CATEGORIES_SUCCESS",
      primaryCategories: res.data,
    });
  } catch (e) {
    yield put({ type: "GET_PRIMARY_CATEGORIES_FAILED", message: e.message });
  }
}

function* primaryCategoriesSaga() {
  yield debounce(1000, "GET_PRIMARY_CATEGORIES_REQUESTED", fetchAllCategories);
}

export default primaryCategoriesSaga;
