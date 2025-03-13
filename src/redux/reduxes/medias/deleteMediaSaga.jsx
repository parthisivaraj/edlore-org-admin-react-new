import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    org_id: data.org_id,
  };
  try {
    const result = nodeInstance({
      url: `media/${data.id}`,
      method: "DELETE",
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}
function* medias(action) {
  const data = {
    id: action.payload.id,
    organization_id: action.payload.org_id,
    search: "",
    page: 0,
    limit: 48,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `Media deleted Successfully`,
      type: "success",
    };
    yield put({ type: "DELETE_MEDIA_SUCCESS", data: res.data });
    yield put({ type: "ALL_MEDIAS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to delete Media",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({ type: "DELETE_MEDIA_FAILED", message: e.response.data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_MEDIA_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }

    if (e.response.status === 409) {
      const toastrConflictData = {
        content: e.response.data.message,
        type: "failed",
      };
      yield put({ type: "DELETE_MEDIA_FAILED", message: e.message });
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

function* deleteMediaSaga() {
  yield takeEvery("DELETE_MEDIA_REQUESTED", medias);
}

export default deleteMediaSaga;
