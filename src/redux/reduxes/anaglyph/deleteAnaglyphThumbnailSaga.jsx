import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    delete: "true",
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/anaglyph/${data.id}/update_thumb_url`,
      method: "PUT",
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* updatethumb(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `Anaglyph Thumbnail Removed Successfully`,
      type: "success",
    };
    const data = {
      model_id: action.payload.model_id,
      id: action.payload.id,
    };
    yield put({ type: "DELETE_THUMBNAIL_SUCCESS", allPartNotesList: res.data });
    // yield put({ type: 'GET_ALL_PART_NOTES_REQUESTED', payload: data });
    yield put({ type: "ANAGLYPH_DETAILS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({ type: "DELETE_THUMBNAIL_FAILED", message: e.response.data });
    } else {
      yield put({
        type: "DELETE_THUMBNAIL_FAILED",
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
function* deleteThumbnailforAnagliph() {
  yield takeEvery("DELETE_THUMBNAIL_REQUESTED", updatethumb);
}

export default deleteThumbnailforAnagliph;
