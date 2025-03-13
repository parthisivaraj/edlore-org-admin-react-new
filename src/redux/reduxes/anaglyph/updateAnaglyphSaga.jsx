import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    id: data.id,
    title: data.title,
    section_id: data.section_id,
    anaglyph_file_attributes: {
      id: data.mediaId,
      active_storage_attachment_id: data.anaglyph_file_attributes,
    },
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/anaglyph/${data.id}`,
      method: "PATCH",
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* updateAnaglyph(action) {
  const data = {
    model_id: action.payload.model_id,
    search: "",
    page: 0,
    limit: 10,
  };
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.anaglyph.title} 3D file is updated Successfully`,
      type: "success",
    };

    yield put({ type: "UPDATE_ANAGLYPH_SUCCESS", anaglyphList: res.data });
    yield put({ type: "GET_ALL_ANAGLYPH_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "UPDATE_ANAGLYPH_FAILED",
        message: e.response.data.errors,
      });
    } else {
      yield put({
        type: "UPDATE_ANAGLYPH_FAILED",
        message: "Some error occurred",
      });
    }

    if (e.response.status === 409) {
      const toastrConflictData = {
        content: e.response.data
          ? e.response.data.message
          : "Something went wrong!",
        type: "failed",
      };
      yield put({
        type: "UPDATE_ANAGLYPH_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrConflictData });
    }
  }
}

function* updateAnaglyphSaga() {
  yield takeEvery("UPDATE_ANAGLYPH_REQUESTED", updateAnaglyph);
}

export default updateAnaglyphSaga;
