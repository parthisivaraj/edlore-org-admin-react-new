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
      url: `/work_order/${data.id}/edit_third_page`,
      method: "PATCH",
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
    yield put({ type: "UPDATE_WORKORDER_TAB_THREE_SUCCESS", stepThreeData: res.data.work_order });
    if (action.payload.status == 1) {
      window.location = "/active-workorders/all?device=all&all&device_specific=false}"
    } else {
      window.location = "/drafts"
    }

  } catch (e) {
    yield put({ type: "UPDATE_WORKORDER_TAB_THREE_FAILED", message: e.response.data });
  }
}

function* updateWorkOrderTabThreeSaga() {
  yield takeEvery("UPDATE_WORKORDER_TAB_THREE_REQUESTED", addWorkorderThird);
}

export default updateWorkOrderTabThreeSaga;