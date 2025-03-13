import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    try {
        const result = instance({
            url: `v1/model/${data.model_id}/device/${data.device_id}/work_order_history`,
            method: "GET"
        }).then((response) => {
            return response;
        })
        return await result;
    } catch (error) {
        throw error;
    }
}
function* fetchAllDevices(action) {
    try {
        const res = yield call(getApi, action.payload);
        yield put({ type: "GET_WO_HISTORY_LOG_SUCCESS", deviceWorkorderHistoryLog: res.data });
    } catch (e) {
        yield put({ type: "GET_WO_HISTORY_LOG_FAILED", message: e.message });
    }
}

function* deviceWorkorderHistoryLogSaga() {
    yield takeEvery("GET_WO_HISTORY_LOG_REQUESTED", fetchAllDevices);
}

export default deviceWorkorderHistoryLogSaga;
