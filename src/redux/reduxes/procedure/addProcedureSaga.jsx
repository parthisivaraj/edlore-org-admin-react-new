import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    name: data.procedureName,
    steps_attributes: [
      {
        title: "Step 1",
        description: "Enter Description",
        step_order: 1,
        attached_medias_attributes: [],
      },
    ],
  };

  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/procedure`,
      method: "POST",
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* procedure(action) {
  const data = {
    model_id: action.payload.model_id,
    page: 0,
    search: "",
    filter: {},
    limit: 10,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.name} Procedure Title added Successfully`,
      type: "success",
    };
    yield put({ type: "ADD_PROCEDURE_SUCCESS", data: res.data });
    yield put({ type: "GET_MODEL_PROCEDURE_REQUESTED", payload: data });
    yield put({
      type: "MODEL_DETAILS_REQUESTED",
      payload: action.payload.model_id,
    });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    // window.location.href = `/device-model/${action.payload.model_id}`
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "ADD_PROCEDURE_FAILED",
        message: e.response.data.errors,
      });
    } else {
      yield put({
        type: "ADD_PROCEDURE_FAILED",
        message: "Some error occurred",
      });
    }
    if (e.response.status === 500) {
      const toastrFailedData = {
        content: e.response.data.errors
          ? e.response.data.errors
          : "Something went wrong!",
        type: "failed",
      };
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrFailedData });
    }
  }
}

function* addProcedureSaga() {
  yield takeEvery("ADD_PROCEDURE_REQUESTED", procedure);
}

export default addProcedureSaga;
