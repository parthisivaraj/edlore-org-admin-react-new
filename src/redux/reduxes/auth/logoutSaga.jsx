import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: "auth/sign_out",
      method: "POST",
      data: data,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}
function* login(action) {
  try {
    const res = yield call(getApi, action.payload);

    yield put({ type: "LOGOUT_SUCCESS", authData: res.data });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 403
    ) {
      yield put({ type: "LOGOUT_FAILED", message: e.response.data.message });
    }
  }
}

function* logoutSaga() {
  yield takeEvery("LOGOUT_REQUESTED", login);
}

export default logoutSaga;
