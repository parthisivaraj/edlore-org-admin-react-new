import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const updateData = {
    id: data.id,
  };
  try {
    const result = nodeInstance({
      url: `group/${data.id}`,
      method: "GET",
      data: updateData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* userGroupDetails(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "USER_GROUP_DETAILS_SUCCESS",
      userGroupDetails: res.data,
    });
  } catch (e) {
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({
        type: "USER_GROUP_DETAILS_FAILED",
        message: e.response.data.message,
      });
    }
  }
}

function* userGroupDetailsSaga() {
  yield takeEvery("USER_GROUP_DETAILS_REQUESTED", userGroupDetails);
}

export default userGroupDetailsSaga;
