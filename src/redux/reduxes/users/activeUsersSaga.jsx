import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `users/all_except_logged_in?search=${encodeURIComponent(
        search,
      )}&limit=${data.limit}&page=${data.page + 1}&active=true&sort_column=${
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
function* fetchActiveUsers(action) {
  try {
    const users = yield call(getApi, action.payload);
    yield put({ type: "ACTIVE_USERS_SUCCESS", activeUsers: users.data });
  } catch (e) {
    yield put({ type: "ACTIVE_USERS_FAILED", message: e.message });
  }
}

function* activeUsersSaga() {
  yield debounce(1000, "ACTIVE_USERS_REQUESTED", fetchActiveUsers);
}

export default activeUsersSaga;
