import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    id: data.id,
    role_id: data.role_id,
  };

  try {
    const result = nodeInstance({
      url: `users/${data.id}/update_role`,
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
      content: "User Role details updated Successfully",
      type: "success",
    };
    yield put({ type: "EDIT_USER_ROLE_SUCCESS", users: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    window.location.href = `/users`;
  } catch (e) {
    const toastrData = {
      content: "Failed to update User Role details",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "EDIT_USER_ROLE_FAILED",
        message: e.response.data.message,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "EDIT_USER_ROLE_FAILED",
        message: "Some error occured",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }

    if (e.response.status === 409) {
      const toastrData = {
        content:
          "Current user role is associated with workorder/s, you can't update the Role",
        type: "failed",
      };
      yield put({
        type: "EDIT_USER_ROLE_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* editUserRoleSaga() {
  yield takeEvery("EDIT_USER_ROLE_REQUESTED", editUser);
}

export default editUserRoleSaga;
