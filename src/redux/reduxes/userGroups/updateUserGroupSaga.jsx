import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const updateData = {
    title: data.title,
    description: data.description,
    status: data.status,
    user_groups_attributes: data.user_groups_attributes,
  };
  try {
    const result = nodeInstance({
      url: `group/${data.id}`,
      method: "PUT",
      data: updateData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* updateUserGroup(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.group.title} User Group details updated Successfully`,
      type: "success",
    };
    yield put({ type: "UPDATE_USER_GROUP_SUCCESS", userGroupsList: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    window.location.href = "/user-groups";
  } catch (e) {
    const toastrData = {
      content: "Failed to update User Group details",
      type: "failed",
    };
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "UPDATE_USER_GROUP_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }

    const toastrConflictData = {
      content: "Failed to Update User Group Details",
      type: "failed",
    };
    if (e.response.status === 409) {
      yield put({
        type: "UPDATE_USER_GROUP_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrConflictData });
    }
  }
}

function* updateUserGroupSaga() {
  yield takeEvery("UPDATE_USER_GROUP_REQUESTED", updateUserGroup);
}

export default updateUserGroupSaga;
