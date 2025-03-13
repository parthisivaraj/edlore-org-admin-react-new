import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  let sub_categories_attributes = [];
  data.secondaryCategories.forEach((b, i) => {
    if (data.remainingSecondaryCategoryId.includes(b.id)) {
      sub_categories_attributes.push({
        id: b.id,
        name: b.name,
        _destroy: false,
      });
    } else {
      sub_categories_attributes.push({
        id: b.id,
        name: b.name,
        _destroy: true,
      });
    }
  });
  data.newSecoCate.forEach((c, i) => {
    sub_categories_attributes.push({
      name: c.name,
    });
  });
  let postData = {};
  if (data.editCategory) {
    postData = {
      name: data.name,
      org_id: data.org_id,
      sub_categories_attributes: sub_categories_attributes,
    };
  } else {
    postData = {
      name: data.primaryCategoryNewName,
      org_id: data.org_id,
      sub_categories_attributes: sub_categories_attributes,
    };
  }
  try {
    const result = nodeInstance({
      url: `/category/${data.editCategory ? data.primaryCategoryId : ""}`,
      method: `${data.editCategory ? "PUT" : "POST"}`,
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchAllCategories(action) {
  const data = {
    orgId: action.payload.org_id,
    search: "",
    page: 0,
    limit: 10,
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
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${
        action.payload.editCategory
          ? `${res.data.category.name} Category details updated Successfully`
          : `${res.data.name} Category added Successfully`
      }`,
      type: "success",
    };
    yield put({ type: "EDIT_CATEGORIES_SUCCESS", allCategories: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    yield put({ type: "ALL_CATEGORIES_REQUESTED", payload: categoryData });
    yield put({
      type: "GET_PRIMARY_CATEGORIES_REQUESTED",
      payload: categoryData,
    });
    yield put({
      type: "GET_SECONDARY_CATEGORIES_REQUESTED",
      payload: action.payload.primaryCategoryId,
    });
  } catch (e) {
    const toastrData = {
      content: `Failed to Create Category`,
      type: "failed",
    };
    yield put({
      type: "EDIT_CATEGORIES_FAILED",
      message: e.response.data.errors,
    });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  }
}

function* editCategoriesSaga() {
  yield takeEvery("EDIT_CATEGORIES_REQUESTED", fetchAllCategories);
}

export default editCategoriesSaga;
