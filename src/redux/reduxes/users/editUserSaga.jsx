import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  var formData = new FormData();
  formData.append(`id`, data.id);
  formData.append(`first_name`, data.first_name);
  formData.append(`last_name`, data.last_name);
  formData.append(`email`, data.email);
  formData.append(`username`, data.username);
  formData.append(`mobile_number`, data.mobile_number);
  formData.append(`identification_code`, data.identification_code);
  formData.append(`status`, data.status == "active" ? 1 : 2);
  if (data.image.name) {
    formData.append(`image`, data.image);
  }
  try {
    const result = nodeInstance({
      url: `users/update_personal_details`,
      method: "PATCH",
      data: formData,
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
      content: `User details updated Successfully`,
      type: "success",
    };
    yield put({ type: "EDIT_USER_SUCCESS", users: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    window.location.href = `/users`;
  } catch (e) {
    const toastrData = {
      content: "Failed to update User details",
      type: "failed",
    };
    if (
      e.response.status === 406 ||
      e.response.status === 400 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      const message = e.response.data.message;

      yield put({
        type: "EDIT_USER_FAILED",
        message: [
          {
            name: message.includes("Email") ? "email" : "username",
            message,
          },
        ],
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({ type: "EDIT_USER_FAILED", message: "Some error occured" });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }

    if (e.response.status === 409) {
      const toastrData = {
        content:
          "Selected User is associated with workorder/s, you can't update the Status",
        type: "failed",
      };
      yield put({ type: "EDIT_USER_FAILED", message: e.response.data.errors });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* editUserSaga() {
  yield takeEvery("EDIT_USER_REQUESTED", editUser);
}

export default editUserSaga;
