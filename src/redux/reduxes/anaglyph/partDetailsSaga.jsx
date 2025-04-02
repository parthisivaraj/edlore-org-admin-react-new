import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    let partId = (data.partId && data.partId!=null)?data.partId:'new';
    const result = nodeInstance({
      url: `model/${data.model_id}/anaglyph/${data.anaglyph_id}/parts/${partId}`,
      method: "GET",
      data: data,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* partDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "PART_DETAILS_SUCCESS", partDetails: res.data });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({ type: "PART_DETAILS_FAILED", message: e.response.data });
    } else {
      yield put({
        type: "PART_DETAILS_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* partDetailsSaga() {
  yield takeEvery("PART_DETAILS_REQUESTED", partDetails);
}

export default partDetailsSaga;
