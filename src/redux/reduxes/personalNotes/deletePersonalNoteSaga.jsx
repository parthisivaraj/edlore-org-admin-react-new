import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `notes/${data.id}`,
      method: "DELETE",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchPersonalNotes(action) {
  const data = {
    search: "",
    page: 0,
    limit: 10,
    sort: "",
    sorting: "",
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.note.title} deleted Successfully`,
      type: "success",
    };
    yield put({
      type: "DELETE_PEROSNAL_NOTE_SUCCESS",
      allPersonalNotesList: res.data,
    });
    yield put({ type: "GET_ALL_PERSONAL_NOTES_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Personal Note",
      type: "success",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "DELETE_PERSONAL_NOTE_FAILED",
        message: e.response.data,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_PERSONAL_NOTE_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
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

function* deleteNoteSaga() {
  yield takeEvery("DELETE_PERSONAL_NOTE_REQUESTED", fetchPersonalNotes);
}

export default deleteNoteSaga;
