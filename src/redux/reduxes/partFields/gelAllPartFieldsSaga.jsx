import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi() {
  try {
    const result = nodeInstance({
      url: `part_fields`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchPartFields(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_PART_FIELDS_SUCCESS",
      slaveMachines: res.data.slave_machines,
    });
  } catch (e) {
    yield put({ type: "GET_PART_FIELDS_FAILED", message: e.message });
  }
}

function* allPartFieldsSaga() {
  yield debounce(1000, "GET_PART_FIELDS_REQUESTED", fetchPartFields);
}

export default allPartFieldsSaga;
