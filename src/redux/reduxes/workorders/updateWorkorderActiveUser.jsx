import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
  let postData = {
    user_id: data.user_id,
  };

  if (data.assign) {
    postData['assign'] = true;
  } else {
    postData['view'] = true;
  }

  // "assign": true

  try {
    const result = instance({
      url: `v1/work_order/${data.wo_id}/change_active_user`,
      method: "POST",
      data: postData,
    }).then((response) => {
      return response;
    })
    return await result;
  } catch (error) {
    throw error;
  }
}

function* addWorkorder(action) {
  try {
    const res = yield call(getApi, action.payload);
    const data = {
      wo_id: action.payload.wo_id
    };
    const toastrData = {
      content: "Work Order User status changed Successfully",
      type: "success"
    }

    yield put({ type: "CHANGE_ACTIVE_WORKORDER_USER_STATUS_SUCCESS", response: res.data });
    yield put({ type: 'GET_ALL_ACTIVE_WORKORDER_USERS_REQUESTED', payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (e.response.status === 406 || e.response.status === 404 || e.response.status === 422) {
      yield put({ type: "CHANGE_ACTIVE_WORKORDER_USER_STATUS_FAILED", message: e.response.data });
    } else {
      yield put({ type: "CHANGE_ACTIVE_WORKORDER_USER_STATUS_FAILED", message: "Some error occurred" });
    }

    if (e.response.status === 500) {
      const toastrFailedData = {
          content: e.response.data.errors ? e.response.data.errors : "Something went wrong!",
          type: "failed"
      };
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrFailedData });
  }
  }
}

function* updateWorkorderActiveUser() {
  yield takeEvery("CHANGE_ACTIVE_WORKORDER_USER_STATUS_REQUESTED", addWorkorder);
}

export default updateWorkorderActiveUser;