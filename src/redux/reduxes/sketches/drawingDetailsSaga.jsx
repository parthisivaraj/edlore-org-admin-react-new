import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/section/${data.section_id}/sketches/${data.id}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* drawingDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "DRAWING_DETAILS_SUCCESS", data: res.data.sketch });
  } catch (e) {
    yield put({ type: "DRAWING_DETAILS_FAILED", message: e.message });
  }
}

function* drawingDetailsSaga() {
  yield takeEvery("DRAWING_DETAILS_REQUESTED", drawingDetails);
}

export default drawingDetailsSaga;
