import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    id: data.id,
    password: data.password,
    password_confirmation: data.password_confirmation,
  };

  try {
    const result = nodeInstance({
      url: `users/update_password`,
      method: "PATCH",
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* editUser(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: "Password updated Successfully",
      type: "success",
    };
    yield put({ type: "MANAGE_PASSWORD_SUCCESS", users: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    window.location.href = `/users`;
  } catch (e) {
    const toastrData = {
      content: "Failed to Update Password",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "MANAGE_PASSWORD_FAILED",
        message: e.response.data.message,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "MANAGE_PASSWORD_FAILED",
        message: "Some error occured",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* managePasswordSaga() {
  yield takeEvery("MANAGE_PASSWORD_REQUESTED", editUser);
}

export default managePasswordSaga;
