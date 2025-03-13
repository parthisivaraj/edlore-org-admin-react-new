import { call, put, takeEvery } from "redux-saga/effects";
import instance from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = instance({
      url: encodeURI(
        `model/${data.model_id}/anaglyph/${data.anaglyph_id}/parts/csv_upload_status`,
      ),
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* allParts(action) {
  const data = {
    model_id: action.payload.model_id,
    id: action.payload.id,
    search: "",
    page: 0,
    limit: 10,
    sort: "",
    sorting: "",
  };
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `CSV Media uploaded Successfully`,
      type: "success",
    };

    yield put({ type: "GET_UPLOADING_CSV_PARTS_SUCCESS", data: res.data });
    yield put({ type: "ANAGLYPH_DETAILS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (e.response.data.message == 406) {
      yield put({
        type: "GET_UPLOADING_CSV_PARTS_FAILED",
        message: e.response.data.message,
      });
    }
    if (e.response.data.message == 404) {
      yield put({
        type: "GET_UPLOADING_CSV_PARTS_FAILED",
        message: e.response.data.message,
      });
    } else {
      yield put({
        type: "GET_UPLOADING_CSV_PARTS_FAILED",
        message: "Some error Occured",
      });
    }
  }
}

function* uploadingCsvPartsSaga() {
  yield takeEvery("GET_UPLOADING_CSV_PARTS_REQUESTED", allParts);
}

export default uploadingCsvPartsSaga;
