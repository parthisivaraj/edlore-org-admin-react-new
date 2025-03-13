import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `roles/${data.id}/user_role_all`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchUsers(action) {
  try {
    const users = yield call(getApi, action.payload);
    yield put({
      type: "GET_ALL_USERS_BY_ROLE_SUCCESS",
      allUsersByRoleList: users.data,
    });
  } catch (e) {
    yield put({ type: "GET_ALL_USERS_BY_ROLE_FAILED", message: e.message });
  }
}

function* allUsersByRoleSaga() {
  yield debounce(1000, "GET_ALL_USERS_BY_ROLE_REQUESTED", fetchUsers);
}

export default allUsersByRoleSaga;
