import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    title: data.title,
    description: data.description,
    attached_medias_attributes: data.attached_medias_attributes,
  };
  try {
    const result = nodeInstance({
      url: `notes`,
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
      content: `${res.data.title} added Successfully`,
      type: "success",
    };

    yield put({
      type: "CREATE_PERSONAL_NOTE_SUCCESS",
      allPersonalNotesList: res.data,
    });
    yield put({ type: "GET_ALL_PERSONAL_NOTES_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "CREATE_PERSONAL_NOTE_FAILED",
        message: e.response.data.errors,
      });
    } else {
      yield put({
        type: "CREATE_PERSONAL_NOTE_FAILED",
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

function* addPersonalNoteSaga() {
  yield takeEvery("CREATE_PERSONAL_NOTE_REQUESTED", fetchPersonalNotes);
}

export default addPersonalNoteSaga;
