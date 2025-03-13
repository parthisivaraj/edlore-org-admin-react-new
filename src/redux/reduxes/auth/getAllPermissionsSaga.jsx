import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `users/role_permissions`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}
function* getPermissions(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_ALL_USER_PERMISSIONS_SUCCESS",
      permissionData: res.data.permissions,
    });
    yield put({
      type: "GOT_WHEN_PERMISSION_UPDATED_SUCCESS",
      payload: res.data.permissions_updated_at,
    });
    if (window.location.pathname == "/login") {
      window.location.href = "/";
    }
  } catch (e) {
    yield put({ type: "GET_ALL_USER_PERMISSIONS_FAILED", message: e.message });
  }
}

function* getAllPermissionSaga() {
  yield debounce(1000, "GET_ALL_USER_PERMISSIONS_REQUESTED", getPermissions);
}

export default getAllPermissionSaga;
