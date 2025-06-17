import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    try {
        const result = instance({
            url: `/work_order/${data.wo_id}/publish`,
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
        yield put({ type: 'PUBLISH_THE_DRAFT_PROJECT_SUCCESS', activeWorkordersList: res.data });
        window.location.href = `/active-workorders/all?device=all&all&device_specific=false`
    } catch (e) {
        if (e.response.status == 422) {
            yield put({ type: 'PUBLISH_THE_DRAFT_PROJECT_FAILED', message: e.response.data });
        } else {
            yield put({ type: 'PUBLISH_THE_DRAFT_PROJECT_FAILED', message: "Some error occurred" });
        }

    }
}

function* publishTheDraftSaga() {
    yield takeEvery('PUBLISH_THE_DRAFT_PROJECT_REQUESTED', fetchWorkorder);
}

export default publishTheDraftSaga;