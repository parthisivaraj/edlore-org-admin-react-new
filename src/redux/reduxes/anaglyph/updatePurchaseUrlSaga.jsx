import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const postData = {
    anaglyph_id: data.anaglyph_id,
    purchase_link: data.purchase_link,
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/anaglyph/${data.anaglyph_id}`,
      method: "PATCH",
      data: postData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* updatePurchaseUrl(action) {
  const data = {
    model_id: action.payload.model_id,
    id: action.payload.anaglyph_id,
  };
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "UPDATE_PURCHSE_URL_SUCCESS", anaglyphList: res.data });
    yield put({ type: "ANAGLYPH_DETAILS_REQUESTED", payload: data });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({
        type: "UPDATE_PURCHSE_URL_FAILED",
        message: e.response.data,
      });
    } else {
      yield put({
        type: "UPDATE_PURCHSE_URL_FAILED",
        message: "Some error occurred",
      });
    }
  }
}

function* updatePurchaseUrlSaga() {
  yield takeEvery("UPDATE_PURCHSE_URL_REQUESTED", updatePurchaseUrl);
}

export default updatePurchaseUrlSaga;
