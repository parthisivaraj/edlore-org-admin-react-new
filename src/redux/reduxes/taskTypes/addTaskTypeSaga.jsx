import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    const taskTypeData = {
        id: data.id,
        title: data.title
    }
    try {
        const result = instance({
            url: "/task_type",
            method: "POST",
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
        paginate:true,
    }

    try {
        const res = yield call(getApi, action.payload);
        const toastrData = {
            content: `${res.data.title} Task Type added Successfully`,
            type: "success"
        }

        yield put({ type: "ADD_TASK_TYPE_SUCCESS", taskTypesList: res.data });
        yield put({ type: 'GET_ALL_TASK_TYPES_REQUESTED', payload: data });
        yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } catch (e) {
        const toastrData = {
            content: "Failed to Create Task Type",
            type: "failed"
        }
        if (e.response.status === 406 || e.response.status === 404 || e.response.status === 422) {
            yield put({ type: "ADD_TASK_TYPE_FAILED", message: e.response.data.errors });
            yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
        } else {
            yield put({ type: "ADD_TASK_TYPE_FAILED", message: "Some error occurred" });
            yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
        }
    }
}

function* addTaskTypeSaga() {
    yield takeEvery("ADD_TASK_TYPE_REQUESTED", fetchTaskTypes);
}

export default addTaskTypeSaga;
