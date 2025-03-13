import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/anaglyph/${data.id}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchAnaglyphDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "ANAGLYPH_DETAILS_SUCCESS", anaglyphDetails: res.data });
  } catch (e) {
    yield put({ type: "ANAGLYPH_DETAILS_FAILED", message: e.message });
  }
}

function* anaglyphDetailsSaga() {
  yield takeEvery("ANAGLYPH_DETAILS_REQUESTED", fetchAnaglyphDetails);
}

export default anaglyphDetailsSaga;
