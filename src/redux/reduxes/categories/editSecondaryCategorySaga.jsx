import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  let postData = {
    org_id: data.org_id,
    sub_categories_attributes: [
      {
        id: data.s_id,
        name: data.s_name,
        parent_id: data.parent_id,
      },
    ],
  };
  try {
    const result = nodeInstance({
      url: `/category/${data.p_id}`,
      method: "PUT",
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
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "EDIT_SECONDARY_CATEGORIES_SUCCESS",
      allCategories: res.data,
    });
    yield put({
      type: "GET_SECONDARY_CATEGORIES_REQUESTED",
      payload: action.payload.p_id,
    });
    const data = {
      orgId: action.payload.org_id,
      query: "",
      page: 0,
      limit: 10,
      filter: {},
      sort: "",
      sorting: "",
    };
    yield put({
      type: "GET_PRIMARY_CATEGORIES_REQUESTED",
      payload: action.payload.p_id,
    });

    // window.location.href = "/device-category"
  } catch (e) {
    yield put({
      type: "EDIT_SECONDARY_CATEGORIES_FAILED",
      message: e.response.data.errors,
    });
  }
}

function* editSecondaryCategoriesSaga() {
  yield takeEvery("EDIT_SECONDARY_CATEGORIES_REQUESTED", fetchAllCategories);
}

export default editSecondaryCategoriesSaga;
