import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/anaglyph/${data.anaglyph_id}/parts/${data.id}`,
      method: "DELETE",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* deletePart(action) {
  const data = {
    model_id: action.payload.model_id,
    anaglyph_id: action.payload.anaglyph_id,
    search: "",
    page: 0,
    limit: 50,
    sort: "",
    sorting: "",
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.part_name} 3D Part deleted Successfully`,
      type: "success",
    };
    yield put({ type: "DELETE_PART_SUCCESS", allPartsList: res.data });
    // window.location.reload();
    // window.location.href = window.location.pathname;
    yield put({ type: "GET_ALL_PARTS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    // window.location.reload();
    // window.location.href = window.location.pathname;
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Part",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({ type: "DELETE_PART_FAILED", message: e.response.data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({ type: "DELETE_PART_FAILED", message: "Some error occurred" });
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

function* deletePartSaga() {
  yield takeEvery("DELETE_PART_REQUESTED", deletePart);
}

export default deletePartSaga;
