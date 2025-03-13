import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    support_availability_status: data.support_availability_status,
  };
  try {
    const result = nodeInstance({
      url: `users/change_status`,
      method: "POST",
      data: postData,
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
      content: `Profile Availability status updated Successfully`,
      type: "success",
    };
    const data = {
      id: action.payload.id,
    };
    yield put({ type: "AVAILABILITY_STATUS_UPDATE_SUCCESS", data: res.data });
    yield put({ type: "GET_PROFILE_DETAILS_REQUESTED", data: res.data });
    yield put({ type: "USER_DETAILS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (e.response.status === 406 || e.response.status === 422) {
      yield put({ type: "AVAILABILITY_STATUS_UPDATE_FAILED", message: "test" });
    } else {
      yield put({
        type: "AVAILABILITY_STATUS_UPDATE_FAILED",
        message: e.message,
      });
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

function* updateAvailabilityStatusSaga() {
  yield debounce(1000, "AVAILABILITY_STATUS_UPDATE_REQUESTED", profileDetails);
}

export default updateAvailabilityStatusSaga;
