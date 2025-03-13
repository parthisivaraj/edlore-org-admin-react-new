import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `users/current_user_details`,
      method: "GET",
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
    yield put({ type: "GET_PROFILE_DETAILS_SUCCESS", data: res.data });
  } catch (e) {
    yield put({ type: "GET_PROFILE_DETAILS_FAILED", message: e.message });
  }
}

function* profileDetailsSaga() {
  yield debounce(1000, "GET_PROFILE_DETAILS_REQUESTED", profileDetails);
}

export default profileDetailsSaga;
