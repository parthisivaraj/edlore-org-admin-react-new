import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    id: data.id,
    title: data.title,
    description: data.description,
    attached_medias_attributes: data.attached_medias_attributes,
    model_id: data.model_id,
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/safety_measure/${data.id}`,
      method: "GET",
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* safetyMeasuresDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "SAFETY_MEASURES_DETAILS_SUCCESS",
      safetyMeasuresDetails: res.data,
    });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "SAFETY_MEASURES_DETAILS_FAILED",
        message: e.response.data,
      });
    } else {
      yield put({
        type: "SAFETY_MEASURES_DETAILS_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* safetyMeasuresDetailsSaga() {
  yield takeEvery("SAFETY_MEASURES_DETAILS_REQUESTED", safetyMeasuresDetails);
}

export default safetyMeasuresDetailsSaga;
