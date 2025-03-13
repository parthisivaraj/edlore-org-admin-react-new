import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const sectionData = {
    id: data.id,
    title: data.sectionTitle,
  };
  try {
    const result = nodeInstance({
      url: `model/${data.id}/section`,
      method: "POST",
      data: sectionData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* addSection(action) {
  const data = {
    model_id: action.payload.id,
    search: "",
    page: 0,
    limit: 10,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} Section added Successfully`,
      type: "success",
    };

    yield put({ type: "ADD_SECTION_SUCCESS", sectionsList: res.data });
    yield put({ type: "GET_ALL_SECTIONS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "ADD_SECTION_FAILED",
        message: e.response.data.errors,
      });
    } else {
      yield put({ type: "ADD_SECTION_FAILED", message: "Some error occurred" });
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

function* addSectionSaga() {
  yield takeEvery("ADD_SECTION_REQUESTED", addSection);
}

export default addSectionSaga;
