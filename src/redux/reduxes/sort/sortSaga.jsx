import {  put, takeEvery } from 'redux-saga/effects'

function* updateSort(action) {
    yield put({ type: 'UPDATE_SORT_SUCCESS', data: action.payload });
}

function* updateSortSaga() {
    yield takeEvery('UPDATE_SORT_REQUESTED', updateSort);
}

export default updateSortSaga;