import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    new_category_id: data.category_id,
  };
  try {
    const result = nodeInstance({
      url: `category/${data.id}/destroy`,
      method: "POST",
      data: data.category_id ? postData : {},
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
    const toastrData = {
      content: `${res.data.title} Category deleted Successfully`,
      type: "success",
    };
    const categoryData = {
      orgId: action.payload.org_id,
      primary_only: true,
      paginate: true,
      query: "",
      page: 0,
      filter: {},
      limit: 10,
    };
    yield put({ type: "DELETE_CATEGORIES_SUCCESS", allCategories: res.data });
    yield put({ type: "ALL_CATEGORIES_REQUESTED", payload: categoryData });
    yield put({
      type: "GET_PRIMARY_CATEGORIES_REQUESTED",
      payload: categoryData,
    });
    yield put({
      type: "GET_SECONDARY_CATEGORIES_REQUESTED",
      payload: action.payload.pCateId,
    });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    // window.location.reload();
  } catch (e) {
    if (e.response.status == 409) {
      const failedData = {
        models_count: e.response.data.models_count,
        deletingCategoryId: action.payload.id,
        primary_category: e.response.data.primary_category,
        deletingPrimaryCategoryId: action.payload.pCateId,
        secondary_category_count: e.response.data.secondary_category_count,
        category_name: e.response.data.category_name,
        secondary_categories: e.response.data.secondary_categories,
      };
      yield put({ type: "DELETE_CATEGORIES_FAILED", data: failedData });
    } else {
      yield put({ type: "DELETE_CATEGORIES_FAILED", message: e.message });
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

function* deleteCategoriesSaga() {
  yield takeEvery("DELETE_CATEGORIES_REQUESTED", fetchAllCategories);
}

export default deleteCategoriesSaga;
