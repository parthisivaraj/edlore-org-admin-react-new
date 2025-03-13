import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    title: data.title,
    description: data.description,
  };

  try {
    const result = nodeInstance({
      url: `realise_note`,
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

function* addRealiseNote(action) {
  const data = {
    search: "",
    page: 0,
    limit: 10,
    sort: "",
    sorting: "",
    title: action.payload.title,
    description: action.payload.description,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} Note added Successfully`,
      type: "success",
    };
    yield put({
      type: "ADD_REALISE_NOTE_SUCCESS",
      allRealiseNotesList: res.data,
    });
    yield put({ type: "GET_ALL_REALISE_NOTE_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "ADD_REALISE_NOTE_FAILED",
        message: e.response.data.errors,
      });
    } else {
      yield put({
        type: "ADD_REALISE_NOTE_FAILED",
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

function* addRealiseNoteSaga() {
  yield takeEvery("ADD_REALISE_NOTE_REQUESTED", addRealiseNote);
}

export default addRealiseNoteSaga;
