import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `users/${data.id}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* userDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "GET_USER_DETAILS_SUCCESS", userDetails: res.data });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({ type: "GET_USER_DETAILS_FAILED", message: e.response.data });
    } else {
      yield put({
        type: "GET_USER_DETAILS_FAILED",
        message: "Some error occured",
      });
    }
  }
}

function* getAuthUserDetailsSaga() {
  yield takeEvery("GET_USER_DETAILS_REQUESTED", userDetails);
}

export default getAuthUserDetailsSaga;
