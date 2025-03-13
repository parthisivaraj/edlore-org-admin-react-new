import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const updatedData = {
    title: data.title,
    org_id: data.org_id,
  };
  try {
    const result = nodeInstance({
      url: `/media/${data.id}`,
      method: "PUT",
      data: updatedData,
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
      content: `${res.data.title} Media Title updated Successfully`,
      type: "success",
    };
    yield put({ type: "UPDATE_MEDIA_SUCCESS", data: res.data });
    yield put({ type: "ALL_MEDIAS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to update Media Title",
      type: "failed",
    };
    yield put({ type: "UPDATE_MEDIA_FAILED", message: e.message });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  }
}

function* updateMediaSaga() {
  yield takeEvery("UPDATE_MEDIA_REQUESTED", medias);
}

export default updateMediaSaga;
