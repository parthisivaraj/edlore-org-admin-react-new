import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    const search = data.search.replace(/\s+/g, ' ').trim();
    try {
        const result = instance({
            url: `/work_order/${data.id}/active_workorder_users?search=${encodeURIComponent(search)}&limit=${data.limit}&page=${data.page + 1}&sort_column=${data.sorting}&sort_order=${data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""}&filters=${JSON.stringify(data.filter)}`,
            method: "GET",
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
        yield put({ type: 'GET_ALL_ACTIVE_WORKORDER_USERS_SUCCESS', activeWorkorderUsersList: res.data });
    } catch (e) {
        yield put({ type: 'GET_ALL_ACTIVE_WORKORDER_USERS_FAILED', message: e.message });
    }
}

function* activeWorkorderUsersSaga() {
    yield takeEvery('GET_ALL_ACTIVE_WORKORDER_USERS_REQUESTED', fetchWorkorder);
}

export default activeWorkorderUsersSaga;