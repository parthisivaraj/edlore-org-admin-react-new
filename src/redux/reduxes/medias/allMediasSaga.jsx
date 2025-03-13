import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const filter = {
    media_type:
      data.showOnly && data.showOnly.length > 0 && data.showOnly != "all"
        ? [data.showOnly]
        : data.filter &&
          data.filter.media_type &&
          data.filter.media_type.length > 0
        ? data.filter.media_type
        : [],
  };
  const search = data.search.replace(/\s+/g, " ").trim();
  // &type=${data.type}&type_id=${data.typeId}
  try {
    const result = nodeInstance({
      url: `media?search=${encodeURIComponent(search)}&limit=${
        data.limit ? data.limit : 48
      }&page=${data.page + 1}&organization_id=${
        data.organization_id
      }&filters=${JSON.stringify(filter)}&model_id=${
        data.model_id ? data.model_id : null
      }&type_id=${data.typeId ? data.typeId : ""}&type=${
        data.type ? data.type : ""
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
function* medias(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({
      type: "ALL_MEDIAS_SUCCESS",
      data: {
        ...res.data,
        infinite: action.payload.infinite,
      },
    });
  } catch (e) {
    yield put({ type: "ALL_MEDIAS_FAILED", message: e.message });
  }
}

function* allMediasSaga() {
  yield debounce(1000, "ALL_MEDIAS_REQUESTED", medias);
}

export default allMediasSaga;
