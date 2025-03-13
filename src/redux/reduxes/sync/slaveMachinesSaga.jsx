import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi() {
  try {
    const result = nodeInstance({
      url: `slave_machines`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchSlaveMachines(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_SLAVE_MACHINES_SUCCESS",
      slaveMachines: res.data.slave_machines,
    });
  } catch (e) {
    yield put({ type: "GET_SLAVE_MACHINES_FAILED", message: e.message });
  }
}

function* allSlaveMachinesSaga() {
  yield debounce(1000, "GET_SLAVE_MACHINES_REQUESTED", fetchSlaveMachines);
}

export default allSlaveMachinesSaga;
