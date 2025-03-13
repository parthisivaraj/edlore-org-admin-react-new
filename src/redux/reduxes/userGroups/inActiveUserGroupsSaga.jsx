import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `group?search=${encodeURIComponent(search)}&limit=${
        data.limit
      }&page=${data.page + 1}&active=false&sort_column=${
        data.sorting
      }&sort_order=${
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

function* fetchUserGroups(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "INACTIVE_USER_GROUPS_SUCCESS",
      inActiveUserGroupsList: res.data,
    });
  } catch (e) {
    yield put({ type: "INACTIVE_USER_GROUPS_FAILED", message: e.message });
  }
}

function* inActiveUserGroupsSaga() {
  yield debounce(1000, "INACTIVE_USER_GROUPS_REQUESTED", fetchUserGroups);
}

export default inActiveUserGroupsSaga;
