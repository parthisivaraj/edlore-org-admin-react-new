import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from 'react-redux';
import MediaStatus from "../../components/dashboard/mediaStatus";
import SystemOverview from "../../components/dashboard/systemOverview";
import UsersStatusCard from "../../components/dashboard/UsersStatusCard";
import WorkorderStatusCard from "../../components/dashboard/workorderStatusCard";
import Layout from "../../layout";
import { dashboardDetails } from "../../redux/reduxes/dashboard/dashboardAction";


const Dashboard = (props) => {
  const dispatch = useDispatch();

  // Fetch Data
  const dashboardLoading = useSelector(state => state.dashboard.dashboardDetailsLoading);
  const details = useSelector(state => state.dashboard.dashboardDetails);

  useEffect(() => {
    dispatch(dashboardDetails());
  }, []);


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
      </Helmet>

      <Layout>
        <section>
          <div>
            <div className="grid grid-cols-1">
              {/* Breadcrumbs */}
              <div className="flex items-center">
                <img src="../assets/icons/icon-home.svg" alt="icon-home" className='dark:invert' />
                <span className="ml-1 text-xs text-black dark:text-gray2 font-medium uppercase"> / Quick Access</span>
              </div>
              <h1 className="md:text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold mb-10">Dashboard</h1>
            </div>
          </div>

          {/* Dashboard : Start */}
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-5">
            {/* Workorder Status */}
            <div className="col-start-1 xl:col-span-2">
              <h1 className="text-2xl font-bold dark:text-gray4  mb-4">Workorder Status</h1>
              <div className="grid grid-cols-2 gap-5">

                {/* Upcoming 6 months */}
                {dashboardLoading ?
                  <Skeleton
                    count={1}
                    height={125}
                    baseColor="#f5f5f5"
                    highlightColor='#e1e1e1'
                    borderRadius="12px"
                    enableAnimation="true"
                    duration={2.5}
                    inline={false}
                    className="border border-gray2 dark:bg-darkMainBg"
                  />
                :
                  <WorkorderStatusCard
                    icon="timer-blue"
                    title="Upcoming 6 Months"
                    description="Work Order count for upcoming 6 months"
                    work_order_status={details && details.work_order_status && details.work_order_status.six_month}
                  />
                }

                 {/* Pending WO */}
                {dashboardLoading ?
                  <Skeleton
                    count={1}
                    height={125}
                    baseColor="#f5f5f5"
                    highlightColor='#e1e1e1'
                    borderRadius="12px"
                    enableAnimation="true"
                    duration={2.5}
                    inline={false}
                    className="border border-gray2 dark:bg-darkMainBg"
                  />
                :
                  <WorkorderStatusCard
                    icon="timer-yellow"
                    title="Pending"
                    description="All pending work orders"
                    work_order_status={details && details.work_order_status && details.work_order_status.pending}
                  />
                }

                {/* Overdue WO */}
                {dashboardLoading ?
                  <Skeleton
                    count={1}
                    height={125}
                    baseColor="#f5f5f5"
                    highlightColor='#e1e1e1'
                    borderRadius="12px"
                    enableAnimation="true"
                    duration={2.5}
                    inline={false}
                    className="border border-gray2 dark:bg-darkMainBg"
                  />
                  :
                  <WorkorderStatusCard
                    icon="timer-red"
                    title="Overdues"
                    description="Work Order held up for this week"
                    work_order_status={details && details.work_order_status && details.work_order_status.overdues}
                  />
                }

                {/* This Week WO */}
                {dashboardLoading ?
                  <Skeleton
                    count={1}
                    height={125}
                    baseColor="#f5f5f5"
                    highlightColor='#e1e1e1'
                    borderRadius="12px"
                    enableAnimation="true"
                    duration={2.5}
                    inline={false}
                    className="border border-gray2 dark:bg-darkMainBg"
                  />
                  :
                  <WorkorderStatusCard
                    icon="timer-green"
                    title="This Week"
                    description="Work order count for this week"
                    work_order_status={details && details.work_order_status && details.work_order_status.weekly}
                  />
                }
              </div>
            </div>

            {/* Users Status */}
            {dashboardLoading ?
              <Skeleton
                count={1}
                height="320px"
                baseColor="#f5f5f5"
                highlightColor='#e1e1e1'
                borderRadius="16px"
                enableAnimation="true"
                duration={2.5}
                inline={false}
                className="border border-gray2 dark:bg-darkMainBg"
              />
              :
              <div className="col-start-1 xl:col-start-3">
                <UsersStatusCard
                  totalUsers={details && details.users && details.users.total_users}
                  activeUsersPercent={details && details.users && details.users.active_users_percent}
                  inActiveUsersPercent={details && details.users && details.users.inactive_users_percent}
                  activeUsersCount={details && details.users && details.users.active_users_count}
                  inActiveUsersCount={details && details.users && details.users.inactive_users_count}
                  totalGroups={details && details.groups && details.groups.total_groups}
                  activeGroupsPercent={details && details.groups && details.groups.active_groups_percent}
                  inActiveGroupsPercent={details && details.groups && details.groups.inactive_groups_percent}
                  activeGroupsCount={details && details.groups && details.groups.active_groups_count}
                  inActiveGroupsCount={details && details.groups && details.groups.inactive_groups_count}
                />
              </div>
            }
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-5 mt-10">
            <h2 className="col-start-1 text-2xl  font-bold dark:text-gray4 mb-4 xl:mb-0">System Overview</h2>
            <div className="col-start-1 col-span-1">
              {dashboardLoading  ?
                <Skeleton
                  count={1}
                  height="300px"
                  baseColor="#f5f5f5"
                  highlightColor='#e1e1e1'
                  borderRadius="16px"
                  enableAnimation="true"
                  duration={2.5}
                  inline={false}
                  className="border border-gray2 dark:bg-darkMainBg"
                />
                :
                <MediaStatus
                  system_overview={details.system_overview}
                />
              }
            </div>

            <div className="col-start-1 xl:col-start-2 col-span-2 mt-6 xl:mt-0">
              {dashboardLoading ?
                <Skeleton
                  count={1}
                  height="300px"
                  baseColor="#f5f5f5"
                  highlightColor='#e1e1e1'
                  borderRadius="16px"
                  enableAnimation="true"
                  duration={2.5}
                  inline={false}
                  className="border border-gray2 dark:bg-darkMainBg"
                />
                :
                <SystemOverview
                  totalModels={details && details.models}
                  activeDevices={details && details.devices && details.devices.active_devices}
                  draftDevices={details && details.devices && details.devices.draft_devices}
                  totalDevices={details && details.devices && details.devices.total_devices}
                />
              }
            </div>
          </div>
          {/* Dashboard : End */}
        </section>
      </Layout>
    </>
  );
}
export default Dashboard;