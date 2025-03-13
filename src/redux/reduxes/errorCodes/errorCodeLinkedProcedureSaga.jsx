import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/error_code/${
        data.errorCodeId
      }/list_linking?type=Procedure&limit=${data.limit}&page=${data.page + 1}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchCodes(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_ALL_PROCEDURE_LINKED_TO_ERROR_SUCCESS",
      linkedProcedureList: res.data,
    });
  } catch (e) {
    yield put({
      type: "GET_ALL_PROCEDURE_LINKED_TO_ERROR_FAILED",
      message: e.message,
    });
  }
}

function* procedureLinkedErrorListSaga() {
  yield takeEvery("GET_ALL_PROCEDURE_LINKED_TO_ERROR_REQUESTED", fetchCodes);
}

export default procedureLinkedErrorListSaga;
