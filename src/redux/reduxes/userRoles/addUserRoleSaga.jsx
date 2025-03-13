import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: "roles",
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

function* addUserRole(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} User Role added Successfully`,
      type: "success",
    };
    yield put({ type: "ADD_USER_ROLES_SUCCESS", deviceData: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    window.location.href = "/user-roles";
  } catch (e) {
    const toastrData = {
      content: "Failed to Create User Role",
      type: "failed",
    };
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "ADD_USER_ROLES_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({ type: "ADD_USER_ROLES_FAILED", message: null });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* addUserRolesSaga() {
  yield takeEvery("ADD_USER_ROLES_REQUESTED", addUserRole);
}

export default addUserRolesSaga;
