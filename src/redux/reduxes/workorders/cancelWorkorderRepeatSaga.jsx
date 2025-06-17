import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    try {
        const result = instance({
            url: `/work_order/${data.id}/cancel_workorder`,
            method: "POST",
        }).then((response) => {
            return response;
        })
        return await result;
    } catch (error) {
        throw error;
    }
}
function* fetchWorkorders(action) {
    try {
        const res = yield call(getApi, action.payload);
        const toastrData = {
            content: `${res.data.title} workorder Repetition is Cancelled successfully`,
            type: "success"
        }
        yield put({ type: "CANCEL_WORKORDER_REPEAT_SUCCESS", data: res.data });
        yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
        window.location.href = "/active-workorders/all?device=all&all&device_specific=false";

    } catch (e) {
        const toastrData = {
            content: "Failed to Cancel this Work Order Repetition",
            type: "failed"
        }
        if (e.response.status === 406 || e.response.status === 404 || e.response.status === 422) {
            yield put({ type: "CANCEL_WORKORDER_REPEAT_FAILED", message: e.response.data });
            yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
        } else {
            yield put({ type: "CANCEL_WORKORDER_REPEAT_FAILED", message: "Some error occurred" });
            yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
        }

        if (e.response.status === 500) {
            const toastrFailedData = {
              content: e.response.data.errors ? e.response.data.errors : "Something went wrong!",
              type: "failed"
            };
            yield put({ type: "SET_TOASTER_SUCCESS", data: toastrFailedData });
        }
    }
}

function* cancelWorkorderRepeatSaga() {
    yield takeEvery("CANCEL_WORKORDER_REPEAT_REQUESTED", fetchWorkorders);
}

export default cancelWorkorderRepeatSaga;
