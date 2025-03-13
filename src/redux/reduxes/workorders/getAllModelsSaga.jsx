import { call, put, takeEvery } from 'redux-saga/effects'
import instance from "../../../api/api_instance";

async function getApi(data) {
    try {
        const result = instance({
            url: `v1/category/${data.id}/get_all_models`,
            method: "GET",
        }).then((response) => {
            return response;
        })
        return await result;
    } catch (error) {
        throw error;
    }
}
function* fetchAllModels(action) {
    try {
        const res = yield call(getApi, action.payload);
        yield put({ type: "GET_ALL_CATEGORY_MODELS_SUCCESS", allModelsList: res.data });
    } catch (e) {
        yield put({ type: "GET_ALL_CATEGORY_MODELS_FAILED", message: e.message });
    }
}

function* allModelsforCategorySaga() {
    yield takeEvery("GET_ALL_CATEGORY_MODELS_REQUESTED", fetchAllModels);
}

export default allModelsforCategorySaga;
