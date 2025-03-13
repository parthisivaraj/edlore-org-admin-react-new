import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const sectionData = {
    id: data.id,
    title: data.sectionTitle,
  };
  try {
    const result = nodeInstance({
      url: `model/${data.id}/section/${data.secId}`,
      method: "GET",
      data: sectionData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* sectionDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "SECTION_DETAILS_SUCCESS", sectionDetails: res.data });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({ type: "SECTION_DETAILS_FAILED", message: e.response.data });
    } else {
      yield put({
        type: "SECTION_DETAILS_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* sectionDetailsSaga() {
  yield takeEvery("SECTION_DETAILS_REQUESTED", sectionDetails);
}

export default sectionDetailsSaga;
