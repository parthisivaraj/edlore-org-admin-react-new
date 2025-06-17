import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    const statusData = {
        wo_id: data.wo_id,
        status: data.user_status,
    }
    try {
        const result = instance({
            url: `api//work_order/${data.wo_id}/change_active_user`,
            method: "POST",
            data: statusData,
        }).then((response) => {
            return response;
        })
        return await result;
    } catch (error) {
        throw error;
    }
}

function* fetchWorkorder(action) {
    try {
        const res = yield call(getApi, action.payload);
        yield put({ type: 'CHANGE_ACTIVE_WORKORDER_USERS_SUCCESS', activeWorkorderUsersList: res.data });
    } catch (e) {
        yield put({ type: 'GET_ALL_ACTIVE_WORKORDER_USERS_FAILED', message: e.message });
    }
}

function* changeActiveWorkorderUserStatusSaga() {
    yield takeEvery('CHANGE_ACTIVE_WORKORDER_USERS_REQUESTED', fetchWorkorder);
}

export default changeActiveWorkorderUserStatusSaga;