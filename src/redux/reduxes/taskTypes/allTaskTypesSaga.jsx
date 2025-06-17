import { call, put, debounce } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    const search = data.search.replace(/\s+/g, ' ').trim();
    try {
        const result = instance({
            url: `/task_type?search=${encodeURIComponent(search)}&limit=${data.limit}&page=${data.page + 1}&sort_column=${data.sorting}&sort_order=${data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""}&filters=${JSON.stringify(data.filter)}&paginate=${data.paginate ? data.paginate : false}`,
            method: "GET",
        }).then((response) => {
            return response;
        })
        return await result;
    } catch (error) {
        throw error;
    }
}
function* fetchTaskTypes(action) {
    try {
        const res = yield call(getApi, action.payload);
        yield put({ type: "GET_ALL_TASK_TYPES_SUCCESS", taskTypesList: res.data });
    } catch (e) {
        yield put({ type: "GET_ALL_TASK_TYPES_FAILED", message: e.message });
    }
}

function* allTaskTypesSaga() {
    yield debounce(1000, "GET_ALL_TASK_TYPES_REQUESTED", fetchTaskTypes);
}

export default allTaskTypesSaga;
