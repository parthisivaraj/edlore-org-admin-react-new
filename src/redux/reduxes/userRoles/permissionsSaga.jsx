import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `permission?search=${encodeURIComponent(search)}&limit=${
        data.limit
      }&page=${data.page + 1}&role_id=${data.role_id}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchUserRolesPermissions(action) {
  try {
    const userRolesPermission = yield call(getApi, action.payload);
    yield put({
      type: "GET_ALL_PERMISSIONS_SUCCESS",
      permissions: userRolesPermission.data,
    });
  } catch (e) {
    yield put({ type: "GET_ALL_PERMISSIONS_FAILED", message: e.message });
  }
}

function* userRolesPermissionsSaga() {
  yield debounce(
    1000,
    "GET_ALL_PERMISSIONS_REQUESTED",
    fetchUserRolesPermissions,
  );
}

export default userRolesPermissionsSaga;
