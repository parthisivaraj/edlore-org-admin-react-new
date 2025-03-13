import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    try {
        const result = instance({
            url: `v1/work_order/${data.wo_id}/work_order_tasks?limit=${data.limit}&page=${data.page + 1}`,
            method: "GET",
        }).then((response) => {
            return response;
        })
        return await result;
    } catch (error) {
        throw error;
    }
}
function* fetchAll(action) {

    try {
        const res = yield call(getApi, action.payload);
        yield put({ type: "GET_ALL_SUBMITTED_WO_PDF_SUCCESS", response: res.data });
    } catch (e) {
        yield put({ type: "GET_ALL_SUBMITTED_WO_PDF_FAILED", message: e.message });
    }
}

function* allSubmittedWoPdfSaga() {
    yield takeEvery("GET_ALL_SUBMITTED_WO_PDF_REQUESTED", fetchAll);
}

export default allSubmittedWoPdfSaga;
