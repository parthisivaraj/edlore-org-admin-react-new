import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
  const putData = {
    priority: data.priority == "low" ? 1 : data.priority == "low" ? 2 : 3,
    status: data.status,
    note: data.note,
    assigned_to_id: data.assigned_to_id,
    assigned_to_type: data.assigned_to_type,
    role_id: data.user_role_id,
    attached_medias_attributes: data.media_attributes
  }
  // const options = {}

  try {
    const result = instance({
      url: `/v1/work_order/${data.id}`,
      method: "PUT",
      data: putData,
    }).then((response) => {
      return response;
    })
    return await result;
  } catch (error) {
    throw error;
  }
}

function* addWorkorderThird(action) {
  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${action.payload.status == 1 ? "Work Order created Successfully" : "Work Order Saved to Draft Successfully"}`,
      type: "success"
    }

    yield put({ type: "ADD_ASSIGN_TAB_SUCCESS", stepThreeData: res.data.work_order });
    if (action.payload.status == 1) {
      window.location = "/active-workorders/all?device=all&all&device_specific=false}"
    } else {
      window.location = "/drafts"
    }
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (e.response.status === 406 || e.response.status === 404 || e.response.status === 422) {
      yield put({ type: "ADD_ASSIGN_TAB_FAILED", message: e.response.data });
    } else {
      yield put({ type: "ADD_ASSIGN_TAB_FAILED", message: "Some error occurred" });
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

function* createWorkOrderTabThreeSaga() {
  yield takeEvery("ADD_ASSIGN_TAB_REQUESTED", addWorkorderThird);
}

export default createWorkOrderTabThreeSaga;