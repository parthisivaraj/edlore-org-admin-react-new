import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
  let putData = {
    task_type_id: data.task_type,
    repeat: data.repeat_wo,
    status: 3,
    work_order_todos_attributes: data.work_order_todos_attributes
  }

  if (data.repeat_wo) {
    putData['repetition_attributes'] = data.repetition_attributes
  } else {
    putData['due_date'] = data.due_date
  }

  try {
    const result = instance({
      url: `/work_order/${data.id}`,
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

function* addWorkorder(action) {
  try {
    const res = yield call(getApi, action.payload);
    // yield put({ type: "ADD_TSAK_TAB_SUCCESS", stepTwoData: res.data.work_order });
    let data = res.data;
    data.due_date = action.payload.due_date;
    data.task_type = action.payload.task_type;
    yield put({ type: "ADD_TSAK_TAB_SUCCESS", stepTwoData: data });
  } catch (e) {
    yield put({ type: "ADD_TSAK_TAB_FAILED", message: e.response.data });
    if (e.response.status == 400) {
      const toastrFailedData = {
        content: e.response.data.message ? e.response.data.message : "Something went wrong!",
        type: "failed"
      };
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrFailedData });
    }

    if (e.response.status == 409) {
      const toastrConflictData = {
        content: e.response.data.errors[0].name == "troubleshoot" ? e.response.data.errors[0].message : e.response.data.errors[0].name == "procedure" ? e.response.data.errors[0].message : "Something went wrong!",
        type: "failed",
      }
      yield put({ type: "ADD_TSAK_TAB_FAILED", message: e.response.data.errors });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrConflictData });
    }
  }
}

function* createWorkOrderTabTwoSaga() {
  yield takeEvery("ADD_TSAK_TAB_REQUESTED", addWorkorder);
}

export default createWorkOrderTabTwoSaga;