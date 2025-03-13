import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `device?search=${encodeURIComponent(search)}&limit=${
        data.limit
      }&page=${data.page + 1}&active=true&sort_column=${
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
function* fetchAllDevices(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "GET_ACTIVE_DEVICES_SUCCESS", activeDevices: res.data });
  } catch (e) {
    yield put({ type: "GET_ACTIVE_DEVICES_FAILED", message: e.message });
  }
}

function* activeDevicesSaga() {
  yield debounce(1000, "GET_ACTIVE_DEVICES_REQUESTED", fetchAllDevices);
}

export default activeDevicesSaga;
