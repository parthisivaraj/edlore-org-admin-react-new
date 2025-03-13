import { put, takeEvery } from 'redux-saga/effects'

function* setToDefaultWIStep(action) {
  const data = { };
  try {
    yield put({ type: "SET_TO_DEFAULT_STEP_SUCCESS", data: data });
  } catch (e) {
    yield put({ type: "SET_TO_DEFAULT_STEP_FAILED", message: "Some error occurred" });
  }
}

function* setToDefaultWIStepSaga() {
  yield takeEvery("SET_TO_DEFAULT_STEP_REQUESTED", setToDefaultWIStep);
}
export default setToDefaultWIStepSaga;
