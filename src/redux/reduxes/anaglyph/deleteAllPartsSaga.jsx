import { call, put, takeEvery } from "redux-saga/effects";
import instance, { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/anaglyph/${data.anaglyph_id}/parts/clear_all_parts`,
      method: "DELETE",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* deleteAllParts(action) {
  const data = {
    model_id: action.payload.model_id,
    anaglyph_id: action.payload.anaglyph_id,
    search: "",
    page: 0,
    limit: 50,
    id: action.payload.id,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: "All 3D Parts are deleted Successfully",
      type: "success",
    };
    yield put({ type: "DELETE_ALL_PARTS_SUCCESS", allPartsList: res.data });
    yield put({ type: "GET_ALL_PARTS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to delete All Parts",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({ type: "DELETE_ALL_PARTS_FAILED", message: e.response.data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_ALL_PARTS_FAILED",
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

function* deleteAllPartsSaga() {
  yield takeEvery("DELETE_ALL_PARTS_REQUESTED", deleteAllParts);
}

export default deleteAllPartsSaga;
