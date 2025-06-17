import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    try {
        const result = instance({
            url: `/work_order/${data.id}?details_page=${data.details_page}`,
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
        yield put({ type: 'GET_WORKORDER_DETAILS_SUCCESS', details: res.data });
    } catch (e) {
        yield put({ type: 'GET_WORKORDER_DETAILS_FAILED', message: e.message });
    }
}

function* workorderDetailsSaga() {
    yield takeEvery('GET_WORKORDER_DETAILS_REQUESTED', fetchWorkorder);
}

export default workorderDetailsSaga;