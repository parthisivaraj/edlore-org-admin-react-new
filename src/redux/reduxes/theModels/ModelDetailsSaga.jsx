import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `/model/${data}`,
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
    yield put({ type: "MODEL_DETAILS_SUCCESS", modalDetails: res.data });
  } catch (e) {
    yield put({ type: "MODEL_DETAILS_FAILED", message: e.message });
  }
}

function* modelDetailsSaga() {
  yield takeEvery("MODEL_DETAILS_REQUESTED", fetchAllModels);
}

export default modelDetailsSaga;
