import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    try {
        const result = instance({
            url: `/work_order/${data.id}`,
            method: "DELETE"
        }).then((response) => {
            return response;
        })
        return await result;
    } catch (error) {
        throw error;
    }
}

function* deleteWorkorder(action) {
    const data = {
        id: action.payload.id,
        search: "",
        page: 0
    }
    try {
        const res = yield call(getApi, action.payload);
        const toastrData = {
            content: "Work Order deleted Successfully",
            type: "success"
        }

        yield put({ type: 'DELETE_WORKORDER_SUCCESS', allWorkordersList: res.data });
        yield put({ type: 'GET_ALL_ACTIVE_WORKORDERS_REQUESTED', payload: data });
        yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } catch (e) {
        if (e.response.status === 406 || e.response.status === 404 || e.response.status === 422) {
            yield put({ type: "DELETE_WORKORDER_FAILED", message: e.response.data });
        } else {
            yield put({ type: "DELETE_WORKORDER_FAILED", message: "Some error occurred" });
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

function* deleteWorkorderSaga() {
    yield takeEvery('DELETE_WORKORDER_REQUESTED', deleteWorkorder);
}

export default deleteWorkorderSaga;