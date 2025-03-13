import { call, put, debounce } from "redux-saga/effects";
import { SYNC_FAILED, SYNC_REQUESTED, SYNC_SUCCESS } from "./types";
import axios from "axios";
import { SET_TOASTER_SUCCESS } from "../toaster/types";
import { nodeInstance } from "../../../api/api_instance";

async function ping(data) {
  try {
    const axisInstant = axios.create({
      baseURL: `http://${data.ipAddress}:3001`,
      headers: {
        Accept: "application/json",
        admin: "true",
      },
    });

    const url = `api/ping`;
    const result = await axisInstant({
      url,
      method: "GET",
    });
    return result;
  } catch (error) {
    throw error;
  }
}

async function sync(data) {
  try {
    const url = `/sync_to_${data.machine}`;

    const result = await nodeInstance({
      url,
      method: "POST",
      data: {
        ipaddr: data.ipAddress,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

function* fetchPing(action) {
  const errorMessage = `Couldn't Connect to ${action.payload.machine}. IP: ${action.payload.ipAddress}`;
  try {
    const result = yield call(ping, action.payload);
    if (
      result.status == 200 &&
      result.data &&
      result.data.env == "production"
    ) {
      yield call(sync, action.payload);
      const successData = {
        content: `Sync has been completed successfully`,
        type: "success",
      };
      yield put({ type: SET_TOASTER_SUCCESS, data: successData });
      yield put({ type: SYNC_SUCCESS });
    } else {
      yield put({
        type: SET_TOASTER_SUCCESS,
        data: {
          content: errorMessage,
          type: "error",
        },
      });
      yield put({ type: SYNC_FAILED, message: errorMessage });
    }
  } catch {
    yield put({
      type: SET_TOASTER_SUCCESS,
      data: {
        content: errorMessage,
        type: "error",
      },
    });
    yield put({ type: SYNC_FAILED, message: errorMessage });
  }
}

export function* syncSaga() {
  yield debounce(1000, SYNC_REQUESTED, fetchPing);
}
