import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    const taskTypeData = {
        taskTypeId: data.taskTypeId,
        title: data.title,
        status: data.status
    }
    try {
        const result = instance({
            url: `/task_type/${data.taskTypeId}`,
            method: "GET",
            data: taskTypeData
        }).then((response) => {
            return response;
        })
        return await result;
    } catch (error) {
        throw error;
    }
}

function* fetchTaskTypes(action) {
    try {
        const res = yield call(getApi, action.payload);
        yield put({ type: 'TASK_TYPE_DETAILS_SUCCESS', taskTypeDetails: res.data });
    } catch (e) {
        if (e.response.status === 406 || e.response.status === 404 || e.response.status === 422) {
            yield put({ type: "TASK_TYPE_DETAILS_FAILED", message: e.response.data });
        } else {
            yield put({ type: "TASK_TYPE_DETAILS_FAILED", message: "Some error occurred" });
        }
    }
}

function* taskTypeDetailsSaga() {
    yield takeEvery('TASK_TYPE_DETAILS_REQUESTED', fetchTaskTypes);
}

export default taskTypeDetailsSaga;