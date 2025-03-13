import { put, takeEvery } from 'redux-saga/effects'

function* procedure(action) {
  const data = {};

  try {
    yield put({ type: "SET_TO_DEFAULT_SUCCESS", data: data });
  } catch (e) {
    yield put({ type: "SET_TO_DEFAULT_FAILED", message: "Some error occurred" });
  }
}

function* setToDefaultSaga() {
  yield takeEvery("SET_TO_DEFAULT_REQUESTED", procedure);
}
export default setToDefaultSaga;
