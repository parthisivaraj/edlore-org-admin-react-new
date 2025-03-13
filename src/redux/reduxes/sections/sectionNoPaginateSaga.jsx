import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  try {
    const result = nodeInstance({
      url: `model/${data.id}/section?search=${encodeURIComponent(
        data.search,
      )}&paginate=false&anaglyph=${data.anaglyph}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* fetchSection(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "NO_PAGINATE_SECTIONS_SUCCESS", sectionsList: res.data });
  } catch (e) {
    yield put({ type: "NO_PAGINATE_SECTIONS_FAILED", message: e.message });
  }
}

function* sectionNoPaginateSaga() {
  yield debounce(1000, "NO_PAGINATE_SECTIONS_REQUESTED", fetchSection);
}

export default sectionNoPaginateSaga;
