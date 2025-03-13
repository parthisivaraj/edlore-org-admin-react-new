import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const role_id = [{ role_id: data.userRole }];
  var formData = new FormData();
  formData.append(`first_name`, data.first_name);
  formData.append(`last_name`, data.last_name);
  formData.append(`email`, data.email);
  formData.append(`username`, data.username);
  formData.append(`mobile_number`, data.user_phone);
  formData.append(`identification_code`, data.identification_code);
  formData.append(`password`, data.password);
  formData.append(`password_confirmation`, data.password_confirmation);
  formData.append(`status`, 1);
  formData.append(`org_id`, data.org_id);
  formData.append(`password_renewed`, data.user_force_login);
  formData.append(`role_id`, data.userRole);

  if (data.image.name) {
    formData.append(`image`, data.image);
  }

  try {
    const result = nodeInstance({
      url: "users",
      method: "POST",
      data: formData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* addUserRole(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.full_name} User added Successfully`,
      type: "success",
    };
    yield put({ type: "ADD_USER_SUCCESS", users: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    window.location.href = "/users";
  } catch (e) {
    const toastrData = {
      content: "Failed to create New User",
      type: "failed",
    };
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 400 ||
      e.response.status === 422
    ) {
      const message = e.response.data.message;
      yield put({
        type: "ADD_USER_FAILED",
        message: [
          {
            name: message.includes("Email") ? "email" : "username",
            message,
          },
        ],
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({ type: "ADD_USER_FAILED", message: "Some error occurred" });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* addUserSaga() {
  yield takeEvery("ADD_USER_REQUESTED", addUserRole);
}

export default addUserSaga;
