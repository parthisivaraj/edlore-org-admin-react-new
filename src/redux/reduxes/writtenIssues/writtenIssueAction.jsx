import * as type from './types';

// GET ALL WRITTEN ISSUES ACTION
export function getAllWrittenIssues(data) {
  return {
    type: type.GET_ALL_WRITTEN_ISSUES_REQUESTED,
    payload: data,
  }
}

// ADD A WRITTEN ISSUE ACTION
export function addWrittenIssue(data) {
  return {
    type: type.ADD_WRITTEN_ISSUE_REQUESTED,
    payload: data,
  }
}

// GET A WRITTEN ISSUE ACTION
export function writtenIssueDetails(data) {
  return {
    type: type.WRITTEN_ISSUE_DETAILS_REQUESTED,
    payload: data,
  }
}

// EDIT/UPDATE WRITTEN ISSUE ACTION
export function updateWrittenIssue(data) {
  return {
    type: type.UPDATE_WRITTEN_ISSUE_REQUESTED,
    payload: data,
  }
}


// DELETE A WRITTEN ISSUE ACTION
export function deleteWrittenIssue(data) {
  return {
    type: type.DELETE_WRITTEN_ISSUE_REQUESTED,
    payload: data,
  }
}



// WRITTEN ISSUE STEPS ========================================================

// ADD A WRITTEN ISSUE STEP
export function addWrittenIssueStep(data) {
  return {
    type: type.ADD_WRITTEN_ISSUE_STEP_REQUESTED,
    payload: data,
  }
}

// UPDATE WRITTEN ISSUE STEP
export function updateWrittenIssueStep(data) {
  return {
    type: type.UPDATE_WRITTEN_ISSUE_STEP_REQUESTED,
    payload: data,
  }
}

// DELETE WRITTEN ISSUE STEP
export function deleteWrittenIssueStep(data) {
  return {
    type: type.DELETE_WRITTEN_ISSUE_STEP_REQUESTED,
    payload: data,
  }
}

// UPDATE WI STEP ORDER
export function updateWrittenIssueStepOrder(data) {
  return {
    type: type.UPDATE_WRITTEN_ISSUE_STEP_ORDER_REQUESTED,
    payload: data,
  }
}

// SET TO DEFAULT STEP
export function setToDefaultStep(data) {
  return {
    type: type.SET_TO_DEFAULT_STEP_REQUESTED,
    payload: data,
  }
}


// WRITTEN ISSUES MODAL
export function setWrittenIssuesModal(data) {
  return {
    type: type.SET_WRITTEN_ISSUES_MODAL,
    payload: data,
  }
}

// WRITTEN ISSUES DETAIL MODAL
export function writtenIssuesDetailModal(data) {
  return {
    type: type.SET_WRITTEN_ISSUES_DETAIL_MODAL,
    payload: data,
  }
}

// RESET WRITTEN ISSUES ERRORS
export function resetWrittenIssuesErrors(data) {
  return {
    type: type.RESET_WRITTEN_ISSUES_ERRORS_REQUESTED,
    payload: data,
  }
}

// CHANGE SEARCH
export function changeWrittenIssuesSearch(data) {
  return {
    type: type.CHANGE_WRITTEN_ISSUES_SEARCH_REQUESTED,
    payload: data,
  }
}