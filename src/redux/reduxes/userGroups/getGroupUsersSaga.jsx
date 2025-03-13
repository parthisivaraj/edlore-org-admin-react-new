import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      // url: `group?search=${encodeURIComponent(data.search)}&limit=${data.limit}&page=${data.page + 1}&sort_column=${data.sorting}&sort_order=${data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""}&filters=${JSON.stringify(data.filter)}&paginate=${data.paginate}`,
      url: `group/${data.id}/get_users?search=${encodeURIComponent(
        search,
      )}&limit=${data.limit}&page=${data.page + 1}&sort_column=${
        data.sorting
      }&sort_order=${
        data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""
      }&filters=${JSON.stringify(data.filter)}&paginate=${data.paginate}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchUserGroups(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_ALL_USERS_GROUP_SUCCESS",
      userGroupsList: res.data,
    });
  } catch (e) {
    yield put({ type: "GET_ALL_USERS_GROUP_FAILED", message: e.message });
  }
}

function* selectedUsersInGroupSaga() {
  yield debounce(1000, "GET_ALL_USERS_GROUP_REQUESTED", fetchUserGroups);
}

export default selectedUsersInGroupSaga;
