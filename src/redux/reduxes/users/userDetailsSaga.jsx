import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  var formData = new FormData();
  formData.append(`id`, data.id);
  formData.append(`first_name`, data.first_name);
  formData.append(`last_name`, data.last_name);
  formData.append(`email`, data.email);
  formData.append(`mobile_number`, data.mobile_number);
  formData.append(`status`, data.status == "Active" ? 1 : 2);
  if (data.image) {
    formData.append(`image`, data.image);
  }

  try {
    const result = nodeInstance({
      url: `users/${data.id}`,
      method: "GET",
      // data: formData
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
    yield put({ type: "USER_DETAILS_SUCCESS", userDetails: res.data });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({ type: "USER_DETAILS_FAILED", message: e.response.data });
    } else {
      yield put({ type: "USER_DETAILS_FAILED", message: "Some error occured" });
    }
  }
}

function* userDetailsSaga() {
  yield takeEvery("USER_DETAILS_REQUESTED", userDetails);
}

export default userDetailsSaga;
