import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();

  try {
    const result = nodeInstance({
      url: `asset_notes?search=${encodeURIComponent(search)}&limit=${
        data.limit
      }&page=${data.page + 1}&sort_column=${data.sorting}&sort_order=${
        data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""
      }&asset_notiable_type=${data.asset_notiable_type}&asset_notiable_id=${
        data.asset_notiable_id
      }`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchAssetNotes(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "GET_ALL_ASSET_NOTES_SUCCESS",
      allAssetNotesList: res.data,
    });
  } catch (e) {
    yield put({ type: "GET_ALL_ASSET_NOTES_FAILED", message: e.message });
  }
}

function* getAllAssetNotesSaga() {
  yield debounce(1000, "GET_ALL_ASSET_NOTES_REQUESTED", fetchAssetNotes);
}

export default getAllAssetNotesSaga;
