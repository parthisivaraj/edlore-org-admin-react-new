import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    title: data.title,
    sketch_type: data.sketch_type,
    attached_medias_attributes: data.attached_medias_attributes,
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/section/${data.section_id}/sketches`,
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

function* addDrawing(action) {
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
      content: `${res.data.title} Drawing added Successfully`,
      type: "success",
    };
    yield put({ type: "ADD_DRAWING_SUCCESS", allDrawings: res.data });
    yield put({ type: "GET_ALL_DRAWINGS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to Create Device Drawing",
      type: "failed",
    };
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "ADD_DRAWING_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({ type: "ADD_DRAWING_FAILED", message: "Some error occurred" });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* addDrawingSaga() {
  yield takeEvery("ADD_DRAWING_REQUESTED", addDrawing);
}

export default addDrawingSaga;
