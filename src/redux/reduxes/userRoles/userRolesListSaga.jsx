import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `roles?search=${encodeURIComponent(search)}&limit=${
        data.limit
      }&page=${data.page + 1}&active=${
        data.active ? data.active : ""
      }&user_id=${data.user_id ? data.user_id : ""}&paginate=${
        data.paginate
      }&sort_column=${data.sorting}&sort_order=${
        data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""
      }&filters=${JSON.stringify(data.filter)}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchUserRoles(action) {
  try {
    const userRoles = yield call(getApi, action.payload);
    yield put({
      type: "GET_ALL_USERS_ROLES_SUCCESS",
      userRoles: userRoles.data,
    });
  } catch (e) {
    yield put({ type: "GET_ALL_USERS_ROLES_FAILED", message: e.message });
  }
}

function* userRolesSaga() {
  yield debounce(1000, "GET_ALL_USERS_ROLES_REQUESTED", fetchUserRoles);
}

export default userRolesSaga;
