import * as type from './types';

const initialState = {
  // Users List
  sortByUserFirstName: 0,
  sortByUserId: 0,
  sortByUserCreatedDate: 0,

  // User Roles
  sortByUserRoleTitle: 0,
  sortByUserRoleStatus: 0,
  sortByUserAvailability: 0,
  sortByUserRoleCreatedDate: 0,

  // User Groups
  sortByUserGroupName: 0,
  sortByUserGroupStatus: 0,
  sortByUserGroupCreatedDate: 0,

  // All Devices List
  sortByDeviceName: 0,
  sortByDeviceCreatedDate: 0,

  // Device Category
  sortByCategoryId: 0,
  sortByCategoryName: 0,
  sortByCategoryCreatedDate: 0,

  // All Devices Under a Modal
  sortByModelDeviceName: 0,
  sortByModelDeviceId: 0,
  sortByModelDeviceSerialNumber: 0,
  sortByModelDeviceCreatedDate: 0,

  // Procedures
  sortByProcedureName: 0,
  sortByProcedureCreatedDate: 0,

  // All Models
  sortByModelTitle: 0,
  sortByModelId: 0,
  sortByModelCreatedDate: 0,

  // All Procedures in a Model
  sortByModelProcedureName: 0,
  sortByModelProcedureCreatedDate: 0,

  // Troubleshoot
  sortByTroubleshootTitle: 0,
  sortByTroubleshootCreatedDate: 0,

  // Written Issues
  sortByWrittenIssueName: 0,
  sortByWrittenIssueCreatedDate: 0,

  // Safety Measures
  sortBySafetyMeasuresTitle: 0,
  sortBySafetyMeasuresCreatedDate: 0,
  sortBySafetyMeasuresUpdatedDate: 0,

  // Error Codes
  sortByErrorCodeTitle: 0,
  sortByErrorCode: 0,
  sortByErrorCodeCreatedDate: 0,

  // mCode
  sortBymCodeTitle: 0,
  sortBymCode: 0,
  sortBymCodeCreatedDate: 0,

  // Alarm Codes
  sortByAlarmCodeTitle: 0,
  sortByAlarmCode: 0,
  sortByAlarmCodeCreatedDate: 0,

  // Manuals
  sortByManualsTitle: 0,
  sortByManualsCreatedDate: 0,

  // Device Drawings
  sortByDeviceDrawingsTitle: 0,
  sortByDeviceDrawingsCreatedDate: 0,

  // Animations
  sortByAnimationTitle: 0,
  sortByAnimationCreatedDate: 0,

  // Sections
  sortBySectionTitle: 0,
  sortBySectionCreatedDate: 0,

  // 3D/Anaglyph
  sortByAnaglyphTitle: 0,
  sortByAnaglyphSectionTitle: 0,
  sortByAnaglyphCreatedDate: 0,

  // 3D Parts
  sortByPartName: 0,
  sortByPartId: 0,
  sortByLayerId: 0,
  sortByPartCreatedDate: 0,

  // Task Types
  sortByTaskTypeTitle: 0,
  sortByTaskTypeStatus: 0,
  sortByTaskTypeCreatedDate: 0,

  // Active Workorders
  sortByActiveWONumber: 0,
  sortByActiveWOTitle: 0,
  sortByActiveWOModelId: 0,
  sortByActiveWOSerialNumber: 0,
  sortByActiveWOTaskType: 0,

  // Draft Workorders
  sortByDraftWONumber: 0,
  sortByDraftWOTitle: 0,
  sortByDraftWOModelId: 0,
  sortByDraftWOSerialNumber: 0,
  sortByDraftWOTaskType: 0,

  // Completed Jobs
  sortByCompletedWONumber: 0,
  sortByCompletedWOTitle: 0,
  sortByCompletedWOModelId: 0,
  sortByCompletedWOSerialNumber: 0,
  sortByCompletedWOTaskType: 0,

  // Active WO Users
  sortByActiveWOUserId: 0,
  sortByActiveWOUserName: 0,
  // sortByActiveWOUserRole: 0,

  // Personal Notes
  sortByPersonalNotesTitle: 0,
  sortByPersonalNotesCreatedDate: 0,

  // Asset Notes
  sortByAssetNoteTitle: 0,
  sortByAssetNoteCreatedDate: 0,
}

export default function sort(state = initialState, action) {
  switch (action.type) {
    case type.UPDATE_SORT_SUCCESS:
      let resets = {};
      Object.keys(initialState).forEach(function (key) {
        Object.assign(resets, { [key]: 0 });
      })
      return {
        ...state,
        // []: 0,
        ...resets,
        [action.data.name]: action.data.sort,
      }
    default:
      return state;
  }
}