import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `group/${data.id}`,
      method: "DELETE",
      data: data.data,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* updateUserGroup(action) {
  const data = {
    id: action.payload.id,
    search: "",
    page: 0,
    filter: {},
    paginate: true,
    limit: 10,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.title} User Group deleted Successfully`,
      type: "success",
    };
    // window.location.reload();
    window.location.href = window.location.pathname;
    yield put({ type: "DELETE_USER_GROUP_SUCCESS", userGroupsList: res.data });
    yield put({ type: "GET_ALL_USER_GROUPS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
      content: "Failed to delete this User Group",
      type: "failed",
    };
    if (e.response.status === 406 || e.response.status === 404) {
      yield put({ type: "DELETE_USER_GROUP_FAILED", message: e.response.data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "DELETE_USER_GROUP_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }

    if (e.response.status === 409) {
      const toastrConflictData = {
        content:
          "Selected Group is associated with workorders, you can't delete this Group",
        type: "failed",
      };
      yield put({ type: "DELETE_USER_GROUP_FAILED", message: e.response.data });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrConflictData });
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

function* updateUserGroupSaga() {
  yield takeEvery("DELETE_USER_GROUP_REQUESTED", updateUserGroup);
}

export default updateUserGroupSaga;
