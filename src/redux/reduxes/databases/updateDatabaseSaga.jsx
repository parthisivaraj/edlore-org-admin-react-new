import { call, put, takeEvery } from "redux-saga/effects";
import {
  UPDATE_DATABASE_FAILED,
  UPDATE_DATABASE_REQUESTED,
  UPDATE_DATABASE_SUCCESS,
} from "./types";
import { SET_TOASTER_SUCCESS } from "../toaster/types";
import {
  marqoInstance,
  uploadFilesInstance,
} from "../../../api/marqo_api_instance";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker";
import { nodeInstance } from "../../../api/api_instance";
import axios from "axios";
import { APIPath, EnvironmentConstant, ServerPath } from "../../../helpers";

async function uploadDocuments(data) {
  try {
    const typedarray = new Uint8Array(data.loadData);

    const loadingTask = pdfjsLib.getDocument({ data: typedarray });
    const pdf = await loadingTask.promise;

    const numPages = pdf.numPages;
    const pdfTextArray = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const textItems = textContent.items.map((item) => item.str).join(" ");
      pdfTextArray.push({
        text: textItems,
        pagenumber: pageNum,
        filename: data.file.name,
      });
    }
    let fileURL;
    if (EnvironmentConstant.mode === "offline") {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("fileName", data.file.name);

      const result = await axios.post(`${APIPath}media/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          admin: "true",
        },
      });
      fileURL = `${ServerPath}/uploads/${result.data.file_name}`;
    } else {
      const awsResponse = await nodeInstance({
        url: `aws/requestUploadUrl`,
        method: "POST",
        data: {
          ext: `.${data.file.name.split(".").pop()}`,
          contentType: data.file.type,
          isPublic: true,
        },
      });

      await uploadFilesInstance(
        awsResponse.data.signedUrl,
        data.file,
        data.file.type,
      );
      fileURL = awsResponse.data.keyOrUrl;
    }
    await marqoInstance({
      url: `database/${data.id}`,
      method: "PUT",
      data: {
        url: fileURL,
        textContents: pdfTextArray,
      },
    });
    return {
      id: data.id,
      document: {
        url: fileURL,
        fileName: data.file.name,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function* updateDatabase(action) {
  try {
    const res = yield call(uploadDocuments, action.payload);
    const toastrData = {
      content: "Database details updated Successfully",
      type: "success",
    };
    yield put({ type: UPDATE_DATABASE_SUCCESS, data: res });
    yield put({ type: SET_TOASTER_SUCCESS, data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: UPDATE_DATABASE_FAILED,
        data: {
          message: e.response.data,
          fileName: action.payload.fileName,
        },
      });
    } else {
      yield put({
        type: UPDATE_DATABASE_FAILED,
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

export function* updateDatabaseSaga() {
  yield takeEvery(UPDATE_DATABASE_REQUESTED, updateDatabase);
}
