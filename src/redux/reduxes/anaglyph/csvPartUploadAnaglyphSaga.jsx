import { call, put, takeEvery } from "redux-saga/effects";
import instance from "../../../api/api_instance";

async function getApi(data) {
  var formData = new FormData();
  if (data.type == "media") {
    formData.append(`attached_csv_id`, data.media_id);
  } else {
    formData.append(`csv_link`, data.csv_url);
  }

  try {
    const result = instance({
      url: `model/${data.model_id}/anaglyph/${data.anaglyph_id}/parts/csv_upload`,
      method: "POST",
      data: formData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* addAnaglyph(action) {
  const data = {
    model_id: action.payload.model_id,
    search: "",
    page: 0,
    limit: 50,
    sort: "",
    sorting: "",
  };
  const data2 = {
    model_id: action.payload.model_id,
    anaglyph_id: action.payload.anaglyph_id,
  };
  const data4 = {
    model_id: action.payload.model_id,
    id: action.payload.anaglyph_id,
  };
  const data3 = {
    search: "",
    page: 0,
    limit: 50,
    model_id: action.payload.model_id,
    anaglyph_id: action.payload.anaglyph_id,
    sort: "",
    sorting: "",
  };
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "CSV_PART_UPLOAD_SUCCESS", anaglyphList: res.data });
    yield put({ type: "ANAGLYPH_DETAILS_REQUESTED", payload: data4 });
    yield put({ type: "GET_ALL_PARTS_REQUESTED", payload: data3 });
    yield put({ type: "GET_ALL_ANAGLYPH_REQUESTED", payload: data });
    yield put({ type: "GET_UPLOADING_CSV_PARTS_REQUESTED", payload: data2 });
  } catch (e) {
    if (
      e.response.status === 400 ||
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 409 ||
      e.response.status === 422
    ) {
      yield put({
        type: "CSV_PART_UPLOAD_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({
        type: "CSV_PART_UPLOAD_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* csvPartUploadAnaglyphSaga() {
  yield takeEvery("CSV_PART_UPLOAD_REQUESTED", addAnaglyph);
}

export default csvPartUploadAnaglyphSaga;
