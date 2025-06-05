import { call, put, takeEvery } from "redux-saga/effects";
import {
  DELETE_DATABASE_DOCUMENT_FAILED,
  DELETE_DATABASE_DOCUMENT_REQUESTED,
  DELETE_DATABASE_DOCUMENT_SUCCESS,
} from "./types";
import { SET_TOASTER_SUCCESS } from "../toaster/types";
import { nodeInstance } from "../../../api/api_instance";
import { marqoInstance } from "../../../api/marqo_api_instance";

async function deleteDocumentAPI(data) {
  try {
    await marqoInstance({
      url: `database/remove-document`,
      method: "POST",
      data: {
        id: data.id,
        url: data.document,
      },
    });

    return {
      id: data.id,
      document: data.document,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function* deleteDocument(action) {
  try {
    const res = yield call(deleteDocumentAPI, action.payload);
    const toastrData = {
      content: "Database document deleted Successfully",
      type: "success",
    };
    yield put({ type: DELETE_DATABASE_DOCUMENT_SUCCESS, data: res });
    yield put({ type: SET_TOASTER_SUCCESS, data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: DELETE_DATABASE_DOCUMENT_FAILED,
        data: {
          message: e.response.data,
          fileName: action.payload.fileName,
        },
      });
    } else {
      yield put({
        type: DELETE_DATABASE_DOCUMENT_FAILED,
        data: {
          message: "Some error occurred",
          fileName: action.payload.fileName,
        },
      });
    }
    if (e.response.status === 500) {
      const toastrFailedData = {
        content: e.response.data.errors
          ? e.response.data.errors
          : "Something went wrong!",
        type: "failed",
      };
      yield put({ type: SET_TOASTER_SUCCESS, data: toastrFailedData });
    }
  }
}

export function* deleteDatabaseDocumentSaga() {
  yield takeEvery(DELETE_DATABASE_DOCUMENT_REQUESTED, deleteDocument);
}
