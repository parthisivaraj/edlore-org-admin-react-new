import { call, put, debounce } from "redux-saga/effects";
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
function* profileDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `Profile details updated Successfully`,
      type: "success",
    };
    const getUserData = {
      id: res.data.user.id,
      profileImage: res.data.user.image,
      fullName: res.data.user.full_name,
    };
    yield put({ type: "UPDATE_PROFILE_SUCCESS", data: res.data });
    yield put({ type: "GET_PROFILE_DETAILS_REQUESTED", data: res.data });
    yield put({ type: "GET_USER_DETAILS_SUCCESS", getUserData: getUserData });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    window.location.href = window.location.pathname;
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 400 ||
      e.response.status === 422
    ) {
      const message = e.response.data.message;

      yield put({
        type: "UPDATE_PROFILE_FAILED",
        message: [
          {
            name: message.includes("Email") ? "email" : "username",
            message,
          },
        ],
      });
    } else {
      yield put({ type: "UPDATE_PROFILE_FAILED", message: e.message });
    }
    if (e.response.status === 500) {
      const toastrFailedData = {
        content: e.response.data.errors
          ? e.response.data.errors
          : "Something went wrong!",
        type: "failed",
      };
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrFailedData });
    }
  }
}

function* updateProfileSaga() {
  yield debounce(1000, "UPDATE_PROFILE_REQUESTED", profileDetails);
}

export default updateProfileSaga;
