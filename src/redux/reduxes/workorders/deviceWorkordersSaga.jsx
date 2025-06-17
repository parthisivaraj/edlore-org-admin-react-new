import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    const getData = {
        model_id: data.model_id
    }
    try {
        const result = instance({
            url: `/model/${data.model_id}/device/${data.device_id}/active_work_orders`,
            method: "GET",
            data: getData,
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
        yield put({ type: "GET_ALL_DEVICE_WORKORDERS_SUCCESS", deviceWorkordersList: res.data });
    } catch (e) {
        yield put({ type: "GET_ALL_DEVICE_WORKORDERS_FAILED", message: e.message });
    }
}

function* deviceWorkordersSaga() {
    yield takeEvery("GET_ALL_DEVICE_WORKORDERS_REQUESTED", fetchAllDevices);
}

export default deviceWorkordersSaga;
