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

function* animationDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "ANIMATION_DETAILS_SUCCESS", data: res.data.sketch });
  } catch (e) {
    yield put({ type: "ANIMATION_DETAILS_FAILED", message: e.message });
  }
}

function* animationDetailsSaga() {
  yield takeEvery("ANIMATION_DETAILS_REQUESTED", animationDetails);
}

export default animationDetailsSaga;
