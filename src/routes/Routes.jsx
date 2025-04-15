import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./public-route";
import PrivateRoute from "./private-route";
import CheckLogin from "./checkIsLogin";

import Login from "../containers/login/login";
import ResetPassword from "../containers/login/resetPassword";
import Dashboard from "../containers/dashboard";

import Packages from "../containers/packages";
import PackageDetails from "../containers/packages/packageDetails";

import AvailablePackages from "../containers/packages/availablePackages";
import PackageFeatures from "../containers/packages/packageFeatures";
import Features from "../containers/packages/features";
import Billing from "../containers/billing";
import Users from "../containers/users";
import AddUser from "../containers/users/addUser";
import EditUser from "../containers/users/editUser";
import UserRoles from "../containers/users/userRoles";
import AddUserRole from "../containers/users/addUserRole";
import EditUserRole from "../containers/users/editUserRole";
import UserGroups from "../containers/users/userGroups";
import AddUserGroup from "../containers/users/addUserGroup";
import EditUserGroup from "../containers/users/editUserGroup";
import EditProfile from "../containers/profile/editProfile";
import Devices from "../containers/devices";
import DeviceModels from "../containers/devices/deviceModels";
import DeviceDetails from "../containers/devices/deviceDetails";
import EditDevice from "../containers/devices/editDevice";
import DeviceCategory from "../containers/devices/deviceCategory";
import MediaCodes from "../containers/media-library";
import ActiveWorkOrders from "../containers/workorders";
import TaskTypes from "../containers/workorders/taskTypes";
import UploadWorkorders from "../containers/workorders/uploadWorkorders";
import Drafts from "../containers/workorders/drafts";
import ViewPlan from "../containers/billing/viewPlan";
import Procedures from "../containers/devices/procedures";
import Models from "../containers/devices/models";
import CreateWorkorder from "../containers/workorders/createWorkorder";
import WorkorderDetails from "../containers/workorders/workorderDetails";
import PaymentInfo from "../containers/packages/paymentInfo";
import Notifications from "../containers/notifications";
import CompletedJobs from "../containers/workorders/completedJobs";
import PageNotFound from "../containers/page-not-found/pageNotFound";
import ServerError from "../containers/page-not-found/serverError";
import VersionControl from "../containers/settings/versionControl";
import PersonalNotes from "../containers/personal-notes";
import SyncScreen from "../containers/sync";
import { ModelScreen } from "../containers/ai-assistances/Model";
import { AIAssistanceDatabases } from "../containers/ai-assistances/databases";
import { AIQuery } from "../containers/ai-assistances/query";
import RealiseNote from "../containers/realise-note/realiseNote";
import SlaveMachine from "../containers/slave-machine/slaveMachine";
import PartFields from "../containers/part-fields/partFields";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute
          component={Login}
          restricted={true}
          path="/login"
          exact={true}
        />
        <PublicRoute
          component={ResetPassword}
          path="/reset-password"
          exact={true}
        />
        <PrivateRoute component={Dashboard} path="/dashboard" exact={true} />
        <CheckLogin restricted={false} path="/" exact={true} />

        {/* Packages */}
        <PrivateRoute component={Packages} path="/packages" exact={true} />
        <PrivateRoute
          component={PackageDetails}
          path="/package-details"
          exact={true}
        />
        <PrivateRoute
          component={AvailablePackages}
          path="/available-packages"
          exact={true}
        />
        <PrivateRoute
          component={PackageFeatures}
          path="/package-features"
          exact={true}
        />
        <PrivateRoute
          component={PaymentInfo}
          path="/payment-info"
          exact={true}
        />
        <PrivateRoute component={Features} path="/features" exact={true} />

        {/* Billing */}
        <PrivateRoute component={Billing} path="/active-billing" exact={true} />
        <PrivateRoute component={ViewPlan} path="/view-plan" exact={true} />

        {/* Users */}
        <PrivateRoute component={Users} path="/users" exact={true} />
        <PrivateRoute component={AddUser} path="/add-user" exact={true} />
        <PrivateRoute component={EditUser} path="/edit-user/:id" exact={true} />
        <PrivateRoute component={UserRoles} path="/user-roles" exact={true} />
        <PrivateRoute
          component={AddUserRole}
          path="/add-user-role"
          exact={true}
        />
        <PrivateRoute
          component={EditUserRole}
          path="/edit-user-role/:id"
          exact={true}
        />
        <PrivateRoute component={UserGroups} path="/user-groups" exact={true} />
        <PrivateRoute
          component={AddUserGroup}
          path="/add-user-group"
          exact={true}
        />
        <PrivateRoute
          component={EditUserGroup}
          path="/edit-user-group/:id"
          exact={true}
        />

        <PrivateRoute
          component={EditProfile}
          path="/edit-profile"
          exact={true}
        />

        {/* Devices */}
        <PrivateRoute component={Devices} path="/devices" exact={true} />
        <PrivateRoute
          component={DeviceDetails}
          path="/device-details/:id"
          exact={true}
        />
        <PrivateRoute
          component={EditDevice}
          path="/edit-device/:id"
          exact={true}
        />

        <PrivateRoute
          component={DeviceModels}
          path="/device-model/:id"
          exact={true}
        />

        <PrivateRoute
          component={DeviceModels}
          path="/device-model/:id/:top_level_tab_id/:nested_tab_id?/:resource_id?"
          exact={true}
        />

        <PrivateRoute
          component={DeviceCategory}
          path="/device-category"
          exact={true}
        />
        <PrivateRoute component={Models} path="/models" exact={true} />
        <PrivateRoute component={Procedures} path="/procedures" exact={true} />

        {/* Media &amp; Codes */}
        <PrivateRoute
          component={MediaCodes}
          path="/media-library"
          exact={true}
        />

        {/* Work Orders */}
        <PrivateRoute
          component={ActiveWorkOrders}
          path="/active-workorders/:model_id"
          exact={true}
        />
        <PrivateRoute
          component={CreateWorkorder}
          path="/workorder/:wo_id"
          exact={true}
        />
        <PrivateRoute
          component={TaskTypes}
          path="/workorder-types"
          exact={true}
        />
        <PrivateRoute
          component={WorkorderDetails}
          path="/workorder-details/:wo_id"
          exact={true}
        />
        <PrivateRoute
          component={UploadWorkorders}
          path="/upload-workorders"
          exact={true}
        />
        <PrivateRoute component={Drafts} path="/drafts" exact={true} />
        <PrivateRoute
          component={CompletedJobs}
          path="/completed-jobs/:model_id"
          exact={true}
        />

        {/* Notifications */}
        <PrivateRoute
          component={Notifications}
          path="/notifications"
          exact={true}
        />

        {/* Settings */}
        <PrivateRoute
          component={VersionControl}
          path="/version-control"
          exact={true}
        />

        {/* SlaveMachine */}
        <PrivateRoute
          component={SlaveMachine}
          path="/slave-machine"
          exact={true}
        />

        
        {/* Realise Note */}
        <PrivateRoute
          component={RealiseNote}
          path="/realise-note"
          exact={true}
        />

        {/* Notes */}
        <PrivateRoute
          component={PersonalNotes}
          path="/personal-notes"
          exact={true}
        />

        {/* PartFields */}
        <PrivateRoute
          component={PartFields}
          path="/part-fields"
          exact={true}
        />

        {/* Sync */}
        <PrivateRoute component={SyncScreen} path="/sync" exact={true} />

        {/* AI Assistance */}
        <PublicRoute component={ModelScreen} path="/model" exact={true} />
        <PrivateRoute
          component={AIAssistanceDatabases}
          path="/databases"
          exact={true}
        />
        <PrivateRoute component={AIQuery} path="/ai-query" exact={true} />

        {/* 500 Server Error page */}
        <PublicRoute
          path="/server-error"
          component={ServerError}
          exact={true}
        />

        {/* 404 Not Found Page */}
        <PublicRoute path="*" component={PageNotFound} exact={true} />
      </Switch>
    </Router>
  );
};
export default AppRoutes;
