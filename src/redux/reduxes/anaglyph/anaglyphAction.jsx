import * as type from "./types";

// GET ALL ANAGLYPH
export function getAllAnaglyph(data) {
  return {
    type: type.GET_ALL_ANAGLYPH_REQUESTED,
    payload: data,
  };
}

// ADD AN ANAGLYPH
export function addAnaglyph(data) {
  return {
    type: type.ADD_ANAGLYPH_REQUESTED,
    payload: data,
  };
}

// GET AN ANAGLYPH DETAILS
export function anaglyphDetails(data) {
  return {
    type: type.ANAGLYPH_DETAILS_REQUESTED,
    payload: data,
  };
}

// UPDATE AN ANAGLYPH
export function updateAnaglyph(data) {
  return {
    type: type.UPDATE_ANAGLYPH_REQUESTED,
    payload: data,
  };
}

// UPDATE PURCHASE URL
export function updatePurchaseUrl(data) {
  return {
    type: type.UPDATE_PURCHSE_URL_REQUESTED,
    payload: data,
  };
}

// DELETE AN ANAGLYPH
export function deleteAnaglyph(data) {
  return {
    type: type.DELETE_ANAGLYPH_REQUESTED,
    payload: data,
  };
}

// CHANGE SEARCH
export function changeAnaglyphSearch(data) {
  return {
    type: type.CHANGE_ANAGLYPH_SEARCH_REQUESTED,
    payload: data,
  };
}

// SET SHOW ANAGLYPH MODAL
export function setAnaglyphModal(data) {
  return {
    type: type.SET_SHOW_ANAGLYPH_MODAL,
    payload: data,
  };
}

// ====================== PARTS =======================================

// GET ALL PARTS
export function getAllParts(data) {
  return {
    type: type.GET_ALL_PARTS_REQUESTED,
    payload: data,
  };
}

// ADD A PART
export function addPart(data) {
  return {
    type: type.ADD_PART_REQUESTED,
    payload: data,
  };
}

// GET PART DETAILS
export function partDetails(data) {
  return {
    type: type.PART_DETAILS_REQUESTED,
    payload: data,
  };
}

// UPDATE A PART
export function updatePart(data) {
  return {
    type: type.UPDATE_PART_REQUESTED,
    payload: data,
  };
}

// DELETE A PART
export function deletePart(data) {
  return {
    type: type.DELETE_PART_REQUESTED,
    payload: data,
  };
}

// DELETE ALL PARTS
export function deleteAllParts(data) {
  return {
    type: type.DELETE_ALL_PARTS_REQUESTED,
    payload: data,
  };
}

// CHANGE SEARCH
export function changePartsSearch(data) {
  return {
    type: type.CHANGE_PARTS_SEARCH_REQUESTED,
    payload: data,
  };
}

// =================== CSV UPLOAD ======================================

// CSV PART UPLOAD
export function csvPartUpload(data) {
  return {
    type: type.CSV_PART_UPLOAD_REQUESTED,
    payload: data,
  };
}
// get uploading csv part
export function getUploadingCsvPartUpload(data) {
  return {
    type: type.GET_UPLOADING_CSV_PARTS_REQUESTED,
    payload: data,
  };
}

// reset errors
export function resetErrors(data) {
  return {
    type: type.RESET_ERRORS_REQUESTED,
    payload: data,
  };
}

// set csv upload url modal
export function setCsvUploadUrlModal(data) {
  return {
    type: type.SET_CSV_UPLOAD_URL_MODAL,
    payload: data,
  };
}

// set csv upload media modal
export function setCsvUploadMediaModal(data) {
  return {
    type: type.SET_CSV_UPLOAD_MEDIA_MODAL,
    payload: data,
  };
}

// =================== thumb update ======================================
// thumbnail update
export function update3DThumbnail(data) {
  return {
    type: type.UPDATE_THUMBNAIL_REQUESTED,
    payload: data,
  };
}
// thumbnail update modal show
export function setShowThumbnailUpdateModal(data) {
  return {
    type: type.SET_THUMBNAIL_UPDATE_MODAL_REQUESTED,
    payload: data,
  };
}
// thumbnail delete
export function anaglyphThumbnailDelete(data) {
  return {
    type: type.DELETE_THUMBNAIL_REQUESTED,
    payload: data,
  };
}
