import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: "model",
      method: "POST",
      data: data,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* createModels(action) {
  const data = {
    search: "",
    page: 0,
    limit: 10,
  };
  try {
    const res = yield call(getApi, action.payload);
    const toaseData = {
      content: `${res.data.title} Model added Successfully`,
      type: "success",
    };
    yield put({ type: "CREATE_MODEL_SUCCESS", allModels: res.data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toaseData });
    window.location.href = `/device-model/${res.data.id}`;
  } catch (e) {
    const toaseData = {
      content: `Failed to add the Model`,
      type: "failed",
    };
    if (
      e.response.status == 406 ||
      e.response.status == 404 ||
      e.response.status == 422
    ) {
      yield put({
        type: "CREATE_MODEL_FAILED",
        message: e.response.data.errors,
      });
    }
    yield put({ type: "SET_TOASTER_SUCCESS", data: toaseData });
  }
}

function* createModelsSaga() {
  yield takeEvery("CREATE_MODEL_REQUESTED", createModels);
}

export default createModelsSaga;
