import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    const postData = {
        attached_pdf_id: data.media_id
    };
    try {
        const result = instance({
            url: "/work_order/work_order_pdf_reading",
            method: "POST",
            data: postData,
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
        yield put({ type: "UPLOAD_WO_SUCCESS", uploadWoDetails: res.data });
        window.location.href = `/workorder-details/${res.data.work_order_id}?transmitted=upload_wo&status=draft`
    } catch (e) {
        if (e.response.status == 500) {
            yield put({ type: "UPLOAD_WO_FAILED", message: e.response.data.message });
        } else if (e.response.status == 422) {
            yield put({ type: "UPLOAD_WO_FAILED", message: e.response.data });
        } else if (e.response.status === 406 || e.response.status === 404) {
            yield put({ type: "UPLOAD_WO_FAILED", message: e.response.data });
        } else {
            yield put({ type: "UPLOAD_WO_FAILED", message: null });
        }
    }
}

function* uploadWorkorderSaga() {
    yield takeEvery("UPLOAD_WO_REQUESTED", addWorkorder);
}

export default uploadWorkorderSaga;