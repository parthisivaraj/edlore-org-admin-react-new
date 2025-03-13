import { call, put, debounce } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const search = data.search.replace(/\s+/g, " ").trim();
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/procedure?search=${encodeURIComponent(
        search,
      )}&limit=${data.limit}&page=${data.page + 1}&sort_column=${
        data.sorting
      }&sort_order=${
        data.sort == 1 ? "asc" : data.sort == 2 ? "desc" : ""
      }&paginate=${data.paginate}`,
      method: "GET",
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}
function* procedure(action) {
  try {
    const res = yield call(getApi, action.payload);
    yield put({ type: "GET_MODEL_PROCEDURE_SUCCESS", data: res.data });
  } catch (e) {
    yield put({ type: "GET_MODEL_PROCEDURE_FAILED", message: e.message });
  }
}

function* modelProcedureSaga() {
  yield debounce(1000, "GET_MODEL_PROCEDURE_REQUESTED", procedure);
}

export default modelProcedureSaga;
