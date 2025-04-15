import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import users from "../reduxes/users/usersReducer";
import devices from "../reduxes/devices/deviceReducer";
import models from "../reduxes/theModels/modelReducer";
import auth from "../reduxes/auth/authReducer";
import user_roles from "../reduxes/userRoles/userRolesReducer";
import categories from "../reduxes/categories/categoryReducer";
import procedure from "../reduxes/procedure/procedureReducer";
import sections from "../reduxes/sections/sectionReducer";
import medias from "../reduxes/medias/mediasReducer";
import sketches from "../reduxes/sketches/sketchesReducer";
import troubleshoot from "../reduxes/troubleshoot/troubleshootReducer";
import written_issues from "../reduxes/writtenIssues/writtenIssueReducer";
import error_codes from "../reduxes/errorCodes/errorCodesReducer";
import safety_measures from "../reduxes/safetyMeasures/safetyMeasuresReducer";
import anaglyph from "../reduxes/anaglyph/anaglyphReducer";
import toaster from "../reduxes/toaster/tosterReducer";
import user_groups from "../reduxes/userGroups/userGroupsReducer";
import tasktypes from "../reduxes/taskTypes/taskTypesReducer";
import workorders from "../reduxes/workorders/workorderReducer";
import globalsearch from "../reduxes/globalSearch/globalSearchReducer";
import sort from "../reduxes/sort/sortReducer";
import notifications from "../reduxes/notifications/notificationReducer";
import dashboard from "../reduxes/dashboard/dashboardReducer";
import resetPassword from "../reduxes/resetPassword/resetPasswordReducer";
import profile from "../reduxes/profile/profileReducer";
import versionControl from "../reduxes/versionControl/versionControlReducer";
import notes from "../reduxes/personalNotes/personalNotesReducer";
import asset_notes from "../reduxes/assetNotes/assetNoteReducer";
import databases from "../reduxes/databases/databaseReducer";
import sync from "../reduxes/sync/syncReducer";
import realise_note from "../reduxes/realiseNote/realiseNoteReducer";
import slave_machine from "../reduxes/slaveMachine/slaveMachineReducer";
import part_fields from "../reduxes/partFields/partFieldsReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "sort", "toaster"],
};

const rootReducer = combineReducers({
  profile: profile,
  users: users,
  user_groups: user_groups,
  devices: devices,
  models: models,
  auth: auth,
  user_roles: user_roles,
  categories: categories,
  procedure: procedure,
  sections: sections,
  sketches: sketches,
  medias: medias,
  troubleshoot: troubleshoot,
  written_issues: written_issues,
  error_codes: error_codes,
  safety_measures: safety_measures,
  anaglyph: anaglyph,
  toaster: toaster,
  tasktypes: tasktypes,
  workorders: workorders,
  globalsearch: globalsearch,
  sort: sort,
  notifications: notifications,
  dashboard: dashboard,
  resetPassword: resetPassword,
  versionControl: versionControl,
  notes: notes,
  asset_notes: asset_notes,
  databases: databases,
  sync: sync,
  realise_note: realise_note,
  slave_machine: slave_machine,
  part_fields: part_fields,
});

export default persistReducer(persistConfig, rootReducer);
