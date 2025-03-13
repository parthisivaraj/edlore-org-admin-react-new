import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const troubleshootData = {
    title: data.troubleshoot_title,
    troubleshoot_steps_attributes: [
      {
        title: "Cause 1",
        description: "Enter Description",
        step_order: 1,
        attached_medias_attributes: [],
      },
    ],
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/troubleshoot`,
      method: "POST",
      data: troubleshootData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* addTroubleshoot(action) {
  const data = {
    model_id: action.payload.model_id,
    search: "",
    page: 0,
    limit: 10,
  };
  try {
    const res = yield call(getApi, action.payload);
    const detailsData = {
      model_id: action.payload.model_id,
      trouble_id: res.data.troubleshoot.id,
    };
    const toaseData = {
      content: `${res.data.troubleshoot.title} Troubleshoot Title added Successfully`,
      type: "success",
    };

    yield put({ type: "ADD_TROUBLESHOOT_SUCCESS", troubleshootList: res.data });
    yield put({ type: "GET_ALL_TROUBLESHOOT_REQUESTED", payload: data });
    yield put({ type: "TROUBLESHOOT_DETAILS_REQUESTED", payload: detailsData });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toaseData });
  } catch (e) {
    const toastrData = {
      content: "Failed to Create Troubleshoot Title",
      type: "failed",
    };
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "ADD_TROUBLESHOOT_FAILED",
        message: e.response.data.errors,
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    } else {
      yield put({
        type: "ADD_TROUBLESHOOT_FAILED",
        message: "Some error occurred",
      });
      yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
    }
  }
}

function* addTroubleshootSaga() {
  yield takeEvery("ADD_TROUBLESHOOT_REQUESTED", addTroubleshoot);
}

export default addTroubleshootSaga;
