import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `users/all_except_logged_in?search=${encodeURIComponent(
        search,
      )}&limit=${data.limit}&page=${data.page + 1}&active=false&sort_column=${
        data.sorting
      }&sort_order=${
        data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""
      }&filters=${JSON.stringify(data.filter)}&paginate=${
        !data.paginate ? false : true
      }`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}
function* fetchInActiveUsers(action) {
  try {
    const users = yield call(getApi, action.payload);
    yield put({ type: "INACTIVE_USERS_SUCCESS", inActiveUsers: users.data });
  } catch (e) {
    yield put({ type: "INACTIVE_USERS_FAILED", message: e.message });
  }
}

function* inActiveUsersSaga() {
  yield debounce(1000, "INACTIVE_USERS_REQUESTED", fetchInActiveUsers);
}

export default inActiveUsersSaga;
