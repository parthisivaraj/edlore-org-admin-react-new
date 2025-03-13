import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    try {
        const result = instance({
            url: `v1/task_type/${data.id}`,
            method: "DELETE",
        }).then((response) => {
            return response;
        })
        return await result;
    } catch (error) {
        throw error;
    }
}

function* fetchTaskTypes(action) {
    const data = {
        id: action.payload.id,
        search: "",
        page: 0,
        filter: {},
        limit: 10,
        paginate: true,
    }

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
        content: `${res.data.title} Task Type deleted Successfully`,
        type: "success"
    }
    yield put({ type: 'DELETE_TASK_TYPE_SUCCESS', taskTypesList: res.data });
    yield put({ type: 'GET_ALL_TASK_TYPES_REQUESTED', payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    const toastrData = {
        content: "Failed to delete this Task Type",
        type: "failed"
    }
    if (e.response.status === 406 || e.response.status === 404 || e.response.status === 422) {
        yield put({ type: "DELETE_TASK_TYPE_FAILED", message: e.response.data });
        yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
        yield put({ type: "DELETE_TASK_TYPE_FAILED", message: "Some error occurred" });
        yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }


    if (e.response.status === 409) {
        const toastrConflictData = {
            content: "Selected Task Type is associated with Work Order/s, you can't delete this Task Type",
            type: "failed"
        }
        yield put({ type: "DELETE_TASK_TYPE_FAILED", message: e.response.data });
        yield put({ type: "SET_TOASTER_SUCCESS", data: toastrConflictData });
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

function* deleteTaskTypeSaga() {
    yield takeEvery('DELETE_TASK_TYPE_REQUESTED', fetchTaskTypes);
}

export default deleteTaskTypeSaga;