import { call, put, debounce } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    const search = data.search.replace(/\s+/g, ' ').trim();
    try {
        const result = instance({
            url: `/work_order?status_type=draft&search=${encodeURIComponent(search)}&limit=${data.limit}&page=${data.page + 1}&active=true&sort_column=${data.sorting}&sort_order=${data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""}&filters=${JSON.stringify(data.filter)}`,
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
        yield put({ type: 'GET_ALL_DRAFT_WORKORDERS_SUCCESS', draftWorkordersList: res.data });
    } catch (e) {
        yield put({ type: 'GET_ALL_DRAFT_WORKORDERS_FAILED', message: e.message });
    }
}

function* draftWorkordersSaga() {
    yield debounce(1000, 'GET_ALL_DRAFT_WORKORDERS_REQUESTED', fetchWorkorder);
}

export default draftWorkordersSaga;