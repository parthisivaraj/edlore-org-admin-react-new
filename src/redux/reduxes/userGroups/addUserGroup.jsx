import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: "group",
      method: "POST",
      data: data,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* addUserGroup(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} User Group added Successfully`,
      type: "success",
    };
    yield put({ type: "ADD_USER_GROUP_SUCCESS", userGroupsList: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    window.location.href = "/user-groups";
  } catch (e) {
    const toastrData = {
      content: "Failed to Create User Group",
      type: "failed",
    };
    if (e.response.status == 422) {
      yield put({
        type: "ADD_USER_GROUP_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "ADD_USER_GROUP_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({ type: "ADD_USER_GROUP_FAILED", message: null });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* addUserGroupSaga() {
  yield takeEvery("ADD_USER_GROUP_REQUESTED", addUserGroup);
}

export default addUserGroupSaga;
