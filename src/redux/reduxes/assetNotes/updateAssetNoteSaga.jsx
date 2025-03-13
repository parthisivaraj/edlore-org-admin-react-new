import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const updateData = {
    id: data.id,
    asset_notiable_type: data.asset_notiable_type,
    asset_notiable_id: data.asset_notiable_id,
    title: data.title,
    description: data.description,
    attached_medias_attributes: data.attached_medias_attributes,
  };
  try {
    const result = nodeInstance({
      url: `asset_notes/${data.id}`,
      method: "PUT",
      data: updateData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* updateAssetNote(action) {
  const data = {
    search: "",
    page: 0,
    limit: 10,
    sort: "",
    sorting: "",
    asset_notiable_type: action.payload.asset_notiable_type,
    asset_notiable_id: action.payload.asset_notiable_id,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.note.title} Note details updated Successfully`,
      type: "success",
    };
    yield put({
      type: "UPDATE_ASSET_NOTE_SUCCESS",
      allAssetNotesList: res.data,
    });
    yield put({ type: "GET_ALL_ASSET_NOTES_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({ type: "UPDATE_ASSET_NOTE_FAILED", message: e.response.data });
    } else {
      yield put({
        type: "UPDATE_ASSET_NOTE_FAILED",
        message: "Some error occurred",
      });
    }
    if (e.response.status === 500) {
      const toastrFailedData = {
        content: e.response.data.errors
          ? e.response.data.errors
          : "Something went wrong!",
        type: "failed",
      };
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrFailedData });
    }
  }
}

function* updateAssetNoteSaga() {
  yield takeEvery("UPDATE_ASSET_NOTE_REQUESTED", updateAssetNote);
}

export default updateAssetNoteSaga;
