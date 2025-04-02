import { all } from "redux-saga/effects";

import userSaga from "../reduxes/users/allUserSaga";
import allDevicesSaga from "../reduxes/devices/allDevicesSaga";
import deviceDetailsSaga from "../reduxes/devices/deviceDetailsSaga";
import allModelsSaga from "../reduxes/theModels/allModelsSaga";
import deleteModelsSaga from "../reduxes/theModels/deleteModelsSaga";
import loginSaga from "../reduxes/auth/loginSaga";
import userRolesSaga from "../reduxes/userRoles/userRolesListSaga";
import createModelsSaga from "../reduxes/theModels/createModelsSaga";
import primaryCategoriesSaga from "../reduxes/categories/primaryCategorySaga";
import createCategoriesSaga from "../reduxes/categories/createCategorySaga";
import secondaryCategoriesSaga from "../reduxes/categories/secondaryCategorySaga";
import addDeviceSaga from "../reduxes/devices/addDeviceSaga";
import modelDetailsSaga from "../reduxes/theModels/ModelDetailsSaga";
import allCategoriesSaga from "../reduxes/categories/allCategorySaga";
import editDeviceSaga from "../reduxes/devices/editDeviceSaga";
import editCategoriesSaga from "../reduxes/categories/editCategorySaga";
import userRolesPermissionsSaga from "../reduxes/userRoles/permissionsSaga";
import addUserRolesSaga from "../reduxes/userRoles/addUserRoleSaga";
import addUserSaga from "../reduxes/users/addUserSaga";
import editSecondaryCategoriesSaga from "../reduxes/categories/editSecondaryCategorySaga";
import editUserSaga from "../reduxes/users/editUserSaga";
import allModelDevicesSaga from "../reduxes/theModels/modelDevicesSaga";
import managePasswordSaga from "../reduxes/users/managePasswordSaga";
import editUserRoleSaga from "../reduxes/users/editUserRoleSaga";
import addProcedureSaga from "../reduxes/procedure/addProcedureSaga";
import modelProcedureSaga from "../reduxes/procedure/modelProcedureSaga";
import deleteCategoriesSaga from "../reduxes/categories/deleteCategorySaga";
import updateUserRolesSaga from "../reduxes/userRoles/updateUserRoleSaga";
import procedureDetailsSaga from "../reduxes/procedure/procedureDetailsSaga";
import deviceStatusUpdateSaga from "../reduxes/devices/deviceStatusUpdateSaga";
import allProcedureSaga from "../reduxes/procedure/allProcedureSaga";
import deleteDeviceSaga from "../reduxes/devices/deleteDeviceSaga";
import deleteProcedureSaga from "../reduxes/procedure/deleteProcedureSaga";
import sectionSaga from "../reduxes/sections/sectionSaga";
import addSectionSaga from "../reduxes/sections/addSectionSaga";
import activeDevicesSaga from "../reduxes/devices/activeDevicesSaga";
import draftDevicesSaga from "../reduxes/devices/draftDevicesSaga";
import updateProcedureStepSaga from "../reduxes/procedure/updateProcedureStepSaga";
import allMediasSaga from "../reduxes/medias/allMediasSaga";
import updateSectionSaga from "../reduxes/sections/updateSectionSaga";
import deleteSectionSaga from "../reduxes/sections/deleteSectionSaga";
import sectionDetailsSaga from "../reduxes/sections/sectionDetailsSaga";
import manualsSaga from "../reduxes/sketches/manualsSaga";
import drawingsSaga from "../reduxes/sketches/drawingsSaga";
import animationsSaga from "../reduxes/sketches/animationsSaga";
import addManualSaga from "../reduxes/sketches/addManualSaga";
import troubleshootSaga from "../reduxes/troubleshoot/troubleshootSaga";
import deleteManualSaga from "../reduxes/sketches/deleteManualSaga";
import addDrawingSaga from "../reduxes/sketches/addDrawingSaga";
import deleteDrawingSaga from "../reduxes/sketches/deleteDrawingSaga";
import addAnimationSaga from "../reduxes/sketches/addAnimationSaga";
import deleteAnimationSaga from "../reduxes/sketches/deleteAnimationSaga";
import manualDetailsSaga from "../reduxes/sketches/manualDetailsSaga";
import drawingDetailsSaga from "../reduxes/sketches/drawingDetailsSaga";
import animationDetailsSaga from "../reduxes/sketches/animationDetailsSaga";
import updateManualSaga from "../reduxes/sketches/updateManualSaga";
import updateDrawingSaga from "../reduxes/sketches/updateDrawingSaga";
import updateAnimationSaga from "../reduxes/sketches/updateAnimationSaga";

import addProcedureStepSaga from "../reduxes/procedure/procedureNewStepSaga";
import deleteProcedureStepSaga from "../reduxes/procedure/deleteProcedureStepSaga";
import writtenIssuesSaga from "../reduxes/writtenIssues/writtenIssuesSaga";
import addWrittenIssueSaga from "../reduxes/writtenIssues/addWrittenIssueSaga";
import updateWrittenIssueSaga from "../reduxes/writtenIssues/updateWrittenIssueSaga";
import writtenIssueDetailsSaga from "../reduxes/writtenIssues/writtenIssueDetailsSaga";
import deleteWrittenIssueSaga from "../reduxes/writtenIssues/deleteWrittenIssueSaga";
import errorCodesSaga from "../reduxes/errorCodes/errorCodesSaga";
import setToDefaultSaga from "../reduxes/procedure/setToDefaultSaga";
import addErrorCodeSaga from "../reduxes/errorCodes/addErrorCodeSaga";
import errorCodeDetailsSaga from "../reduxes/errorCodes/errorCodeDetailsSaga";
import updateErrorCodeSaga from "../reduxes/errorCodes/updateErrorCodeSaga";
import deleteErrorCodeSaga from "../reduxes/errorCodes/deleteErrorCodeSaga";
import alarmCodesSaga from "../reduxes/errorCodes/alarmCodesSaga";
import updateProcedureStepOrderSaga from "../reduxes/procedure/updateProcedureStepOrderSaga";
import setToDefaultStepSaga from "../reduxes/writtenIssues/setToDefaultStepSaga";
import addWrittenIssueStepSaga from "../reduxes/writtenIssues/addWrittenIssueStepSaga";
import updateWrittenIssueStepSaga from "../reduxes/writtenIssues/updateWrittenIssueStepSaga";
import updateWrittenIssueStepOrderSaga from "../reduxes/writtenIssues/updateWrittenIssueStepOrderSaga";
import deleteWrittenIssueStepSaga from "../reduxes/writtenIssues/deleteWrittenIssueStepSaga";
import addTroubleshootSaga from "../reduxes/troubleshoot/addTroubleshootSaga";
import updateTroubleshootSaga from "../reduxes/troubleshoot/updateTroubleshootSaga";
import troubleshootDetailsSaga from "../reduxes/troubleshoot/troubleshootDetailsSaga";
import deleteTroubleshootSaga from "../reduxes/troubleshoot/deleteTroubleshootSaga";
import addTroubleshootStepSaga from "../reduxes/troubleshoot/addTroubleshootStepSaga";
import updateTroubleshootStepSaga from "../reduxes/troubleshoot/updateTroubleshootStepSaga";
import deleteTroubleshootStepSaga from "../reduxes/troubleshoot/deleteTroubleshootStepSaga";
import setToDefaultTroubleshootStepSaga from "../reduxes/troubleshoot/setToDefaultTroubleshootStep";
import updateTroubleshootStepOrderSaga from "../reduxes/troubleshoot/updateTroubleshootStepOrderSaga";
import allSafetyMeasuresSaga from "../reduxes/safetyMeasures/allSafetyMeasuresSaga";
import addSafetyMeasureSaga from "../reduxes/safetyMeasures/addSafetyMeasureSaga";
import updateSafetyMeasureSaga from "../reduxes/safetyMeasures/updateSafetyMeasureSaga";
import safetyMeasuresDetailsSaga from "../reduxes/safetyMeasures/safetyMeasuresDetailsSaga";
import deleteSafetyMeasureSaga from "../reduxes/safetyMeasures/deleteSafetyMeasureSaga";
import userDetailsSaga from "../reduxes/users/userDetailsSaga";
import updateProcedureSaga from "../reduxes/procedure/updateProcedureSaga";
import allCloneSafetyMeasuresSaga from "../reduxes/safetyMeasures/allCloneSafetyMeasuresSaga";
import sectionNoPaginateSaga from "../reduxes/sections/sectionNoPaginateSaga";
import allAnaglyphSaga from "../reduxes/anaglyph/allAnaglyphSaga";
import { addAnaglyph } from "../reduxes/anaglyph/anaglyphAction";
import updateMediaSaga from "../reduxes/medias/updateMediaSaga";
import deleteMediaSaga from "../reduxes/medias/deleteMediaSaga";
import allPartsSaga from "../reduxes/anaglyph/allPartsSaga";
import activeUsersSaga from "../reduxes/users/activeUsersSaga";
import inActiveUsersSaga from "../reduxes/users/inActiveUsersSaga";
import allUserGroupsSaga from "../reduxes/userGroups/allUserGroupsSaga";
import activeUserGroupsSaga from "../reduxes/userGroups/activeUserGroupsSaga";
import inActiveUserGroupsSaga from "../reduxes/userGroups/inActiveUserGroupsSaga";
import addUserGroupSaga from "../reduxes/userGroups/addUserGroupSaga";
import updateUserGroupSaga from "../reduxes/userGroups/updateUserGroupSaga";
import userGroupDetailsSaga from "../reduxes/userGroups/userGroupDetailsSaga";
import deleteUserGroupSaga from "../reduxes/userGroups/deleteUserGroupSaga";
import allTaskTypesSaga from "../reduxes/taskTypes/allTaskTypesSaga";
import addTaskTypeSaga from "../reduxes/taskTypes/addTaskTypeSaga";
import updateTaskTypeSaga from "../reduxes/taskTypes/updateTaskTypeSaga";
import taskTypeDetailsSaga from "../reduxes/taskTypes/taskTypeDetailsSaga";
import deleteTaskTypeSaga from "../reduxes/taskTypes/deleteTaskTypeSaga";
import addAnaglyphSaga from "../reduxes/anaglyph/addAnaglyph";
import updatePurchaseUrlSaga from "../reduxes/anaglyph/updatePurchaseUrlSaga";
import addPartSaga from "../reduxes/anaglyph/addPartSaga";
import deletePartSaga from "../reduxes/anaglyph/deletePartSaga";
import partDetailsSaga from "../reduxes/anaglyph/partDetailsSaga";
import updatePartSaga from "../reduxes/anaglyph/updatePartSaga";
import globalSearchSaga from "../reduxes/globalSearch/globalSearchSaga";
import deleteAnaglyphSaga from "../reduxes/anaglyph/deleteAnaglyphSaga";
import updateAnaglyphSaga from "../reduxes/anaglyph/updateAnaglyphSaga";
import updateSortSaga from "../reduxes/sort/sortSaga";
import allModelsforCategorySaga from "../reduxes/workorders/getAllModelsSaga";
import mCodesSaga from "../reduxes/errorCodes/mCodesSaga";
import deleteWorkorderSaga from "../reduxes/workorders/deleteWorkorderSaga";
import allNotificationsSaga from "../reduxes/notifications/allNotificationsSaga";
import clearAllNotificationsSaga from "../reduxes/notifications/clearAllNotificationsSaga";
import unreadNotificationsSaga from "../reduxes/notifications/unreadNotificationCountSaga";
import createWorkOrderTabOneSaga from "../reduxes/workorders/createWorkorderTabOneSaga";
import createWorkOrderTabTwoSaga from "../reduxes/workorders/createWorkOrderTabTwoSaga";
import createWorkOrderTabThreeSaga from "../reduxes/workorders/createWorkOrderTabThreeSaga";
import troubleshootLinkedErrorListSaga from "../reduxes/errorCodes/errorCodeLinkedTroubleshootSaga";
import procedureLinkedErrorListSaga from "../reduxes/errorCodes/errorCodeLinkedProcedureSaga";
import dashboardSaga from "../reduxes/dashboard/dashboardSaga";
import draftWorkordersSaga from "../reduxes/workorders/draftWorkordersSaga";
import completedWorkordersSaga from "../reduxes/workorders/completedWorkordersSaga";
import approveTroubleshootStepSaga from "../reduxes/troubleshoot/approveTroubleshootStepSaga";
import activeWorkordersSaga from "../reduxes/workorders/activeWorkordersSaga";
import triggerOtpSaga from "../reduxes/resetPassword/triggerOtpSaga";
import verifyOtpSaga from "../reduxes/resetPassword/verifyOtpSaga";
import resetPasswordSaga from "../reduxes/resetPassword/resetPasswordSaga";
import workorderDetailsSaga from "../reduxes/workorders/workordersDetailsSaga";
import updateWorkOrderTabOneSaga from "../reduxes/workorders/updateWorkorderTabOneSaga";
import csvPartUploadAnaglyphSaga from "../reduxes/anaglyph/csvPartUploadAnaglyphSaga";
import uploadingCsvPartsSaga from "../reduxes/anaglyph/uploadingCsvPartsSaga";
import uploadWorkorderSaga from "../reduxes/workorders/uploadWorkorderSaga";
import activeWorkorderUsersSaga from "../reduxes/workorders/activeWorkorderUsersSaga";
import { changeActiveWorkorderUserStatus } from "../reduxes/workorders/workorderAction";
import authLogoSaga from "../reduxes/auth/authLogoSaga";

import selectedUsersInGroupSaga from "../reduxes/userGroups/getGroupUsersSaga";
import updateWorkOrderTabThreeSaga from "../reduxes/workorders/updateWorkOrderTabThreeSaga";
import updateWorkOrderTabTwoSaga from "../reduxes/workorders/updateWorkOrderTabTwoSaga";
import deleteAllPartsSaga from "../reduxes/anaglyph/deleteAllPartsSaga";
import deviceWorkordersSaga from "../reduxes/workorders/deviceWorkordersSaga";
import updateModelsSaga from "../reduxes/theModels/updateModelsSaga";
import deviceWorkorderHistoryLogSaga from "../reduxes/workorders/deviceWorkorderHistoryLogSaga";
import allSubmittedWoPdfSaga from "../reduxes/workorders/getAllSubmittedWoPdfSaga";
import updateWorkorderActiveUser from "../reduxes/workorders/updateWorkorderActiveUser";
import publishTheDraftSaga from "../reduxes/workorders/publishTheDraftSaga";
import getEveryCategorySaga from "../reduxes/categories/getEveryCategorySaga";
import confirmOtpLoginSaga from "../reduxes/auth/confirmOtpSaga";
import resendOtpLoginSaga from "../reduxes/auth/resendLoginOtpSaga";
import profileDetailsSaga from "../reduxes/profile/profileDetailsSaga";
import updateProfileSaga from "../reduxes/profile/updateProfileSaga";
import updateAvailabilityStatusSaga from "../reduxes/profile/updateAvailabilityStatusSaga";
import userRoleDetailsSaga from "../reduxes/userRoles/userRoleDetailsSaga";
import allUsersByRoleSaga from "../reduxes/users/allUsersByRoleSaga";
import createVersionControlSaga from "../reduxes/versionControl/createVersionControlSaga";
import versionControlDetailsSaga from "../reduxes/versionControl/versionControlDetailsSaga";
import updateVersionControlSaga from "../reduxes/versionControl/updateVersionControlSaga";
import saveClientTokenSaga from "../reduxes/notifications/saveClientTokenSaga";
import logoutSaga from "../reduxes/auth/logoutSaga";
import getAllPermissionSaga from "../reduxes/auth/getAllPermissionsSaga";
import getAuthUserDetailsSaga from "../reduxes/auth/getUserDetailsSaga";
import allPersonalNotesSaga from "../reduxes/personalNotes/allPersonalNotesSaga";
import addPersonalNoteSaga from "../reduxes/personalNotes/addPersonalNoteSaga";
import personalNoteDetailsSaga from "../reduxes/personalNotes/personalNoteDetailsSaga";
import updatePersonalNoteSaga from "../reduxes/personalNotes/updatePersonalNoteSaga";
import deletePersonalNoteSaga from "../reduxes/personalNotes/deletePersonalNoteSaga";
import updateUserAvailabilityStatusSaga from "../reduxes/users/updateUserAvailabilityStatusSaga";
import cancelWorkorderRepeatSaga from "../reduxes/workorders/cancelWorkorderRepeatSaga";
import getAllAssetNotesSaga from "../reduxes/assetNotes/getAllAssetNotesSaga";
import addAssetNoteSaga from "../reduxes/assetNotes/addAssetNoteSaga";
import assetNoteDetailsSaga from "../reduxes/assetNotes/assetNoteDetailsSaga";
import updateAssetNoteSaga from "../reduxes/assetNotes/updateAssetNoteSaga";
import deleteAssetNoteSaga from "../reduxes/assetNotes/deleteAssetNoteSaga";
import anaglyphDetailsSaga from "../reduxes/anaglyph/anaglyphDetailsSaga";
import updateThumbnailforAnagliph from "../reduxes/anaglyph/updateAnaglyphThumbnailSaga";
import deleteThumbnailforAnagliph from "../reduxes/anaglyph/deleteAnaglyphThumbnailSaga";
import usersWithCurrentSaga from "../reduxes/users/allUserSagaWithCurrentSaga";
import secondaryCategoriesInDropDownSaga from "../reduxes/categories/secondaryCategoryinDeopdownSaga";
import { databaseSaga } from "../reduxes/databases/databaseSaga";
import { addDatabaseSaga } from "../reduxes/databases/addDatabaseSaga";
import { updateDatabaseSaga } from "../reduxes/databases/updateDatabaseSaga";
import { deleteDatabaseSaga } from "../reduxes/databases/deleteDatabaseSaga";
import { aiQuerySaga } from "../reduxes/databases/querySaga";
import { deleteDatabaseDocumentSaga } from "../reduxes/databases/deleteDatabaseDocumentSaga";
import { syncSaga } from "../reduxes/sync/syncSaga";
import allSlaveMachinesSaga from "../reduxes/sync/slaveMachinesSaga";
import addRealiseNoteSaga from "../reduxes/realiseNote/addRealiseNoteSaga";
import addSlaveMachinesSaga from "../reduxes/slaveMachine/addSlaveMachineSaga";
import deleteSlaveMachinesSaga from "../reduxes/slaveMachine/deleteSlaveMachineSaga";
import updateSlaveMachineSaga from "../reduxes/slaveMachine/updateSlaveMachineSaga";
import deleteUserSaga from "../reduxes/users/deleteUsersSaga";

import allPartFieldsSaga from "../reduxes/partFields/gelAllPartFieldsSaga";
import addPartFieldsSaga from "../reduxes/partFields/addPartFieldsSaga";
import deletePartFieldsSaga from "../reduxes/partFields/deletePartFieldsSaga";
import updatePartFieldsSaga from "../reduxes/partFields/updatePartFieldsSaga";


export default function* rootSaga() {
  yield all([
    userSaga(),
    getAuthUserDetailsSaga(),
    activeUsersSaga(),
    inActiveUsersSaga(),
    updateUserAvailabilityStatusSaga(),
    allDevicesSaga(),
    deviceDetailsSaga(),
    allModelsSaga(),
    loginSaga(),
    authLogoSaga(),
    userRolesSaga(),
    userRoleDetailsSaga(),
    usersWithCurrentSaga(),
    userDetailsSaga(),
    userRolesPermissionsSaga(),
    allUsersByRoleSaga(),
    allUserGroupsSaga(),
    activeUserGroupsSaga(),
    inActiveUserGroupsSaga(),
    addUserGroupSaga(),
    updateUserGroupSaga(),
    userGroupDetailsSaga(),
    deleteUserGroupSaga(),
    createModelsSaga(),
    deleteModelsSaga(),
    primaryCategoriesSaga(),
    secondaryCategoriesSaga(),
    createCategoriesSaga(),
    addDeviceSaga(),
    modelDetailsSaga(),
    allCategoriesSaga(),
    deleteCategoriesSaga(),
    editDeviceSaga(),
    editCategoriesSaga(),
    addUserRolesSaga(),
    addUserSaga(),
    editUserSaga(),
    deleteUserSaga(),
    editSecondaryCategoriesSaga(),
    allModelDevicesSaga(),
    managePasswordSaga(),
    editUserRoleSaga(),
    addProcedureSaga(),
    modelProcedureSaga(),
    updateUserRolesSaga(),
    procedureDetailsSaga(),
    deviceStatusUpdateSaga(),
    allProcedureSaga(),
    deleteDeviceSaga(),
    deleteProcedureSaga(),
    activeDevicesSaga(),
    draftDevicesSaga(),
    deviceWorkordersSaga(),
    deviceWorkorderHistoryLogSaga(),
    updateProcedureStepSaga(),
    sectionSaga(),
    addSectionSaga(),
    sectionDetailsSaga(),
    updateSectionSaga(),
    deleteSectionSaga(),
    manualsSaga(),
    addManualSaga(),
    manualDetailsSaga(),
    updateManualSaga(),
    deleteManualSaga(),
    drawingsSaga(),
    addDrawingSaga(),
    drawingDetailsSaga(),
    updateDrawingSaga(),
    deleteDrawingSaga(),
    animationsSaga(),
    addAnimationSaga(),
    animationDetailsSaga(),
    updateAnimationSaga(),
    deleteAnimationSaga(),
    allMediasSaga(),
    updateMediaSaga(),
    deleteMediaSaga(),
    troubleshootSaga(),
    addTroubleshootSaga(),
    troubleshootDetailsSaga(),
    updateTroubleshootSaga(),
    deleteTroubleshootSaga(),
    addTroubleshootStepSaga(),
    updateTroubleshootStepSaga(),
    deleteTroubleshootStepSaga(),
    setToDefaultTroubleshootStepSaga(),
    updateTroubleshootStepOrderSaga(),
    addProcedureStepSaga(),
    deleteProcedureStepSaga(),
    writtenIssuesSaga(),
    addWrittenIssueSaga(),
    writtenIssueDetailsSaga(),
    updateWrittenIssueSaga(),
    deleteWrittenIssueSaga(),
    setToDefaultStepSaga(),
    addWrittenIssueStepSaga(),
    updateWrittenIssueStepSaga(),
    updateWrittenIssueStepOrderSaga(),
    deleteWrittenIssueStepSaga(),
    errorCodesSaga(),
    addErrorCodeSaga(),
    errorCodeDetailsSaga(),
    updateErrorCodeSaga(),
    deleteErrorCodeSaga(),
    mCodesSaga(),
    alarmCodesSaga(),
    setToDefaultSaga(),
    updateProcedureStepOrderSaga(),

    allSafetyMeasuresSaga(),
    allCloneSafetyMeasuresSaga(),
    addSafetyMeasureSaga(),
    updateSafetyMeasureSaga(),
    safetyMeasuresDetailsSaga(),
    deleteSafetyMeasureSaga(),
    updateProcedureSaga(),
    sectionNoPaginateSaga(),

    allAnaglyphSaga(),
    addAnaglyph(),
    allPartsSaga(),
    addPartSaga(),
    partDetailsSaga(),
    updatePartSaga(),
    deletePartSaga(),
    deleteAllPartsSaga(),

    allTaskTypesSaga(),
    addTaskTypeSaga(),
    updateTaskTypeSaga(),
    taskTypeDetailsSaga(),
    deleteTaskTypeSaga(),
    addAnaglyphSaga(),
    updatePurchaseUrlSaga(),

    globalSearchSaga(),
    deleteAnaglyphSaga(),
    anaglyphDetailsSaga(),
    updateAnaglyphSaga(),

    activeWorkordersSaga(),
    draftWorkordersSaga(),
    completedWorkordersSaga(),
    deleteWorkorderSaga(),
    createWorkOrderTabOneSaga(),
    createWorkOrderTabTwoSaga(),
    createWorkOrderTabThreeSaga(),
    cancelWorkorderRepeatSaga(),

    allModelsforCategorySaga(),
    updateSortSaga(),

    allNotificationsSaga(),
    clearAllNotificationsSaga(),
    unreadNotificationsSaga(),

    dashboardSaga(),
    troubleshootLinkedErrorListSaga(),
    procedureLinkedErrorListSaga(),
    approveTroubleshootStepSaga(),

    triggerOtpSaga(),
    verifyOtpSaga(),
    resetPasswordSaga(),

    workorderDetailsSaga(),
    activeWorkorderUsersSaga(),
    changeActiveWorkorderUserStatus(),
    updateWorkOrderTabOneSaga(),
    csvPartUploadAnaglyphSaga(),
    uploadingCsvPartsSaga(),
    uploadWorkorderSaga(),
    selectedUsersInGroupSaga(),
    updateWorkOrderTabThreeSaga(),
    updateWorkOrderTabTwoSaga(),
    updateModelsSaga(),
    allSubmittedWoPdfSaga(),
    updateWorkorderActiveUser(),
    publishTheDraftSaga(),
    getEveryCategorySaga(),
    confirmOtpLoginSaga(),
    resendOtpLoginSaga(),

    profileDetailsSaga(),
    updateProfileSaga(),
    updateAvailabilityStatusSaga(),

    createVersionControlSaga(),
    versionControlDetailsSaga(),
    updateVersionControlSaga(),
    saveClientTokenSaga(),
    logoutSaga(),
    getAllPermissionSaga(),

    allPersonalNotesSaga(),
    addPersonalNoteSaga(),
    personalNoteDetailsSaga(),
    updatePersonalNoteSaga(),
    deletePersonalNoteSaga(),

    getAllAssetNotesSaga(),
    addAssetNoteSaga(),
    assetNoteDetailsSaga(),
    updateAssetNoteSaga(),
    deleteAssetNoteSaga(),

    updateThumbnailforAnagliph(),
    deleteThumbnailforAnagliph(),
    secondaryCategoriesInDropDownSaga(),

    // Databases
    databaseSaga(),
    addDatabaseSaga(),
    updateDatabaseSaga(),
    deleteDatabaseSaga(),
    deleteDatabaseDocumentSaga(),
    aiQuerySaga(),

    /// Sync
    syncSaga(),
    allSlaveMachinesSaga(),

    //SlaveMachines
    addSlaveMachinesSaga(),
    deleteSlaveMachinesSaga(),
    updateSlaveMachineSaga(),
    //realiseNote
    addRealiseNoteSaga(),
    //PartFields
    allPartFieldsSaga(),
    addPartFieldsSaga(),
    deletePartFieldsSaga(),
    updatePartFieldsSaga(),
  ]);
}
