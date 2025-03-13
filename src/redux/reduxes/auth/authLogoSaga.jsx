import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `organization/details`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}
function* fetchPreLoginLogo(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "GET_PRE_LOGIN_LOGO_SUCCESS", logoDetails: res.data });
  } catch (e) {
    yield put({ type: "GET_PRE_LOGIN_LOGO_FAILED", message: e.message });
  }
}

function* authLogoSaga() {
  yield takeEvery("GET_PRE_LOGIN_LOGO_REQUESTED", fetchPreLoginLogo);
}

export default authLogoSaga;
