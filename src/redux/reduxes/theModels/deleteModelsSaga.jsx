import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";
async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.id}`,
      method: "DELETE",
      data: data,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* deleteModels(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} Model deleted Successfully`,
      type: "success",
    };
    yield put({ type: "DELETE_MODEL_SUCCESS", allModels: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    window.location.href = `/models`;
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this Model",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({ type: "DELETE_MODEL_FAILED", message: e.message });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({ type: "DELETE_MODEL_FAILED", message: "Some error occured" });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }

    if (e.response.status === 409) {
      const toastrConflictData = {
        content:
          "Selected Model is associated with Workorder/s, you can't delete this Model",
        type: "failed",
      };
      yield put({ type: "DELETE_MODEL_FAILED", message: e.message });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrConflictData });
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

function* deleteModelsSaga() {
  yield takeEvery("DELETE_MODEL_REQUESTED", deleteModels);
}

export default deleteModelsSaga;
