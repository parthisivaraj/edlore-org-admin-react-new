import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `/model/${data.model_id}/device?search=${encodeURIComponent(
        search,
      )}&limit=${data.limit}&page=${data.page + 1}&paginate=${
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

function* fetchAllModels(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "MODEL_DEVICES_SUCCESS", modelDevices: res.data });
  } catch (e) {
    yield put({ type: "MODEL_DEVICES_FAILED", message: e.message });
  }
}

function* allModelDevicesSaga() {
  yield debounce(1000, "MODEL_DEVICES_REQUESTED", fetchAllModels);
}

export default allModelDevicesSaga;
