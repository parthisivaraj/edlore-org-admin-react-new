import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const updateData = {
    id: data.id,
    name: data.name,
    ipaddress: data.ipaddress,
  };
  try {
    const result = nodeInstance({
      url: `slave_machines/${data.id}`,
      method: "PUT",
      data: updateData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* updateSlaveMachineNote(action) {
  const data = {
    search: "",
    page: 0,
    limit: 10,
    sort: "",
    sorting: "",
    name: action.payload.name,
    ipaddress: action.payload.ipaddress,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.note.title} Slave Machine details updated Successfully`,
      type: "success",
    };
    yield put({
      type: "UPDATE_SLAVE_MACHINE_SUCCESS",
      allAssetNotesList: res.data,
    });
    yield put({ type: "GET_ALL_SLAVE_MACHINES_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "UPDATE_SLAVE_MACHINE_FAILED",
        message: e.response.data,
      });
    } else {
      yield put({
        type: "UPDATE_SLAVE_MACHINE_FAILED",
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

function* updateSlaveMachineSaga() {
  yield takeEvery("UPDATE_SLAVE_MACHINE_REQUESTED", updateSlaveMachineNote);
}

export default updateSlaveMachineSaga;
