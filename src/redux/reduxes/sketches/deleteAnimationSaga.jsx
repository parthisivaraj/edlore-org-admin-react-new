import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/section/${data.section_id}/sketches/${data.id}`,
      method: "DELETE",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* deleteAnimation(action) {
  const data = {
    model_id: action.payload.model_id,
    search: "",
    page: 0,
    filter: {},
    limit: 10,
  };
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} Animation deleted Successfully`,
      type: "success",
    };
    yield put({ type: "DELETE_ANIMATION_SUCCESS", allAnimations: res.data });
    yield put({ type: "GET_ALL_ANIMATIONS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Animation",
      type: "success",
    };

    if (e.response.status === 406 || e.response.status === 404) {
      yield put({ type: "DELETE_ANIMATION_FAILED", message: e.response.data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_ANIMATION_FAILED",
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

function* deleteAnimationSaga() {
  yield takeEvery("DELETE_ANIMATION_REQUESTED", deleteAnimation);
}

export default deleteAnimationSaga;
