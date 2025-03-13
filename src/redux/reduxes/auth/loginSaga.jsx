import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: "auth/sign_in",
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
    if (res.status == 200) {
      yield put({ type: "POST_LOGIN_SUCCESS", authData: res.data });
      // Cookies.set("isLogin", true);
      // Cookies.set("access_token", res.data.access_token);
      // window.location.href = "/";
    } else {
      yield put({ type: "POST_LOGIN_FAILED", message: "" });
    }
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 401 ||
      e.response.status === 403
    ) {
      yield put({
        type: "POST_LOGIN_FAILED",
        message: e.response.data.message,
      });
    }
  }
}

function* loginSaga() {
  yield takeEvery("POST_LOGIN_REQUESTED", login);
}

export default loginSaga;
