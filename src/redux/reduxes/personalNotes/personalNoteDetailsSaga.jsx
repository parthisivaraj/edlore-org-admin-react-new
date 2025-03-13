import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const updatedData = {
    id: data.personalNoteId,
    title: data.title,
    description: data.description,
    attached_medias_attributes: data.attached_medias_attributes,
  };

  try {
    const result = nodeInstance({
      url: `notes/${data.id}`,
      method: "GET",
      data: updatedData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchPersonalNotes(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_PERSONAL_NOTE_DETAILS_SUCCESS",
      personalNoteDetails: res.data,
    });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "GET_PERSONAL_NOTE_DETAILS_FAILED",
        message: e.response.data,
      });
    } else {
      yield put({
        type: "GET_PERSONAL_NOTE_DETAILS_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* personalNoteDetailsSaga() {
  yield takeEvery("GET_PERSONAL_NOTE_DETAILS_REQUESTED", fetchPersonalNotes);
}

export default personalNoteDetailsSaga;
