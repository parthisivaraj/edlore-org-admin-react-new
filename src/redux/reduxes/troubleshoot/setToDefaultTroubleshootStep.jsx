import { put, takeEvery } from 'redux-saga/effects'

function* setToDefaultTroubleshootStep(action) {
  const data = { };
  try {
    yield put({ type: "SET_TO_DEFAULT_TROUBLESHOOT_STEP_SUCCESS", data: data });
  } catch (e) {
    yield put({ type: "SET_TO_DEFAULT_TROUBLESHOOT_STEP_FAILED", message: "Some error occurred" });
  }
}

function* setToDefaultTroubleshootStepSaga() {
  yield takeEvery("SET_TO_DEFAULT_TROUBLESHOOT_STEP_REQUESTED", setToDefaultTroubleshootStep);
}
export default setToDefaultTroubleshootStepSaga;
