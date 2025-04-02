import { call, put, takeEvery } from "redux-saga/effects";
import { nodeInstance } from "../../../api/api_instance";

async function getApi(data) {
  const formData = {
    partId: data.partId,
    model_id: data.model_id,
    anaglyph_id: data.anaglyph_id,
    part_name: data.part_name,
    part_id: data.part_id,
    purchase_url: data.purchase_url,
    layer_id: data.layer_id,
    part_description: data.part_description,
    attached_medias_attributes: data.attached_medias_attributes,

    manufacturer_code: data.manufacturer_code,
    nomenclature: data.nomenclature,
    nsn_number: data.nsn_number,
    quantity: data.quantity,
    dynamic_fields: data.dynamic_fields,
    part_fields: data.part_fields,
  };
  try {
    const result = nodeInstance({
      url: `model/${data.model_id}/anaglyph/${data.anaglyph_id}/parts/${data.partId}`,
      method: "PUT",
      data: formData,
    }).then((response) => {
      return response;
    });
    return await result;
  } catch (error) {
    throw error;
  }
}

function* updatePart(action) {
  const data = {
    model_id: action.payload.model_id,
    anaglyph_id: action.payload.anaglyph_id,
    search: "",
    page: 0,
    limit: 10,
  };

  try {
    const res = yield call(getApi, action.payload);
    const toastrData = {
      content: `${res.data.part.part_name} 3D Part details updated Successfully`,
      type: "success",
    };
    yield put({ type: "UPDATE_PART_SUCCESS", allPartsList: res.data });
    yield put({ type: "GET_ALL_PARTS_REQUESTED", payload: data });
    yield put({ type: "SET_TOASTER_SUCCESS", data: toastrData });
  } catch (e) {
    if (
      e.response.status === 406 ||
      e.response.status === 404 ||
      e.response.status === 422
    ) {
      yield put({ type: "UPDATE_PART_FAILED", message: e.response.data });
    } else {
      yield put({ type: "UPDATE_PART_FAILED", message: "Some error occurred" });
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

function* updatePartSaga() {
  yield takeEvery("UPDATE_PART_REQUESTED", updatePart);
}

export default updatePartSaga;
