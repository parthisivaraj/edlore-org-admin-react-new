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
      url: encodeURI(`model/${data.model_id}/safety_measure`),
      method: "POST",
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* addSafetyMeasure(action) {
  const data = {
    model_id: action.payload.model_id,
    search: "",
    page: 0,
    filter: {},
    limit: 10,
  };
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} Safety Measure added Successfully`,
      type: "success",
    };
    yield put({
      type: "ADD_SAFETY_MEASURE_SUCCESS",
      safetyMeasuresList: res.data,
    });
    yield put({ type: "GET_ALL_SAFETY_MEASURES_REQUESTED", payload: data });
    yield put({
      type: "GET_ALL_CLONE_SAFETY_MEASURES_REQUESTED",
      payload: data,
    });

    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Unable to add safety measure.",
      type: "failed",
    };
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "ADD_SAFETY_MEASURE_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "ADD_SAFETY_MEASURE_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* addSafetyMeasureSaga() {
  yield takeEvery("ADD_SAFETY_MEASURE_REQUESTED", addSafetyMeasure);
}

export default addSafetyMeasureSaga;
