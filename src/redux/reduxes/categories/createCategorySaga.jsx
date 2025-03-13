import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `/category/create`,
      method: "GET",
      // data: apiData
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
    const res = yield call(getApi);
    const toastrData = {
      content: `Category added Successfully`,
      type: "success",
    };
    yield put({ type: "CREATE_CATEGORIES_SUCCESS", allCategories: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "CREATE_CATEGORIES_FAILED",
        message: e.response.data.errors,
      });
    }
    if (e.response.status === 500) {
      const toastrFailedData = {
        content: e.response.data.errors
          ? e.response.data.errors
          : "Something went wrong!",
        type: "failed",
      };
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrFailedData });
    }
  }
}

function* createCategoriesSaga() {
  yield takeEvery("CREATE_CATEGORIES_REQUESTED", fetchAllCategories);
}

export default createCategoriesSaga;
