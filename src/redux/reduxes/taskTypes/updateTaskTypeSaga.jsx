import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    const taskTypeData = {
        taskTypeId: data.taskTypeId,
        title: data.title,
        status: data.status,
    }
    try {
        const result = instance({
            url: `v1/task_type/${data.taskTypeId}`,
            method: "PUT",
            data: taskTypeData,
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
            content: `${res.data.title} Task Type details updated Successfully`,
            type: "success"
        }
        yield put({ type: "UPDATE_TASK_TYPE_SUCCESS", taskTypesList: res.data });
        yield put({ type: 'GET_ALL_TASK_TYPES_REQUESTED', payload: data });
        yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } catch (e) {
        const toastrData = {
            content: "Failed to Create Task Type",
            type: "failed"
        }

        if (e.response.status === 406 || e.response.status === 404 || e.response.status === 422) {
            yield put({ type: "UPDATE_TASK_TYPE_FAILED", message: e.response.data.errors });
            yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
        } else {
            yield put({ type: "UPDATE_TASK_TYPE_FAILED", message: "Some error occurred" });
            yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
        }

        const toastrConflictData = {
            content: "Failed to Update Task Type",
            type: "failed"
        }

        if (e.response.status === 409) {
            yield put({ type: "UPDATE_TASK_TYPE_FAILED", message: e.response.data.errors });
            yield put({ type: "SET_TOASTER_SUCCESS", data: toastrConflictData });
        }
    }
}

function* updateTaskTypeSaga() {
    yield takeEvery("UPDATE_TASK_TYPE_REQUESTED", fetchTaskTypes);
}

export default updateTaskTypeSaga;
