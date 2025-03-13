import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/procedure/${data.procedure_id}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}
function* procedure(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "PROCEDURE_DETAILS_SUCCESS", data: res.data });
  } catch (e) {
    yield put({ type: "PROCEDURE_DETAILS_FAILED", message: e.message });
  }
}

function* procedureDetailsSaga() {
  yield takeEvery("PROCEDURE_DETAILS_REQUESTED", procedure);
}

export default procedureDetailsSaga;
