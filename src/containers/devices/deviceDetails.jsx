import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import { useSelector, useDispatch } from "react-redux";

// Comps
import { getDeviceDetails } from "../../redux/reduxes/devices/deviceAction";
import {
  getAllDeviceWorkorders,
  getDeviceWorkorderHistoryLog,
} from "../../redux/reduxes/workorders/workorderAction";
import Skeleton from "react-loading-skeleton";
import DeviceInfo from "../../components/devices/deviceInfo";
import DeviceLog from "../../components/devices/deviceLog";
import DeviceActiveWorkOrders from "../../components/devices/deviceActiveWorkorders";
import { useLocation } from "react-router";
import PermissionsMessage from "../../components/common/permissionsMessage";
import { OnlyCloudAllowed } from "../../layout/cloud-message";
import { ServerPath, EnvironmentConstant } from "../../helpers";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DeviceDetails = (props) => {
  const { id } = props.match.params;
  let query = useQuery();
  const dispatch = useDispatch();

  // Fetch Data
  const detailsLoading = useSelector(
    (state) => state.devices.deviceDetailsLoading,
  );
  const details = useSelector((state) => state.devices.deviceDetails);
  const deviceWorkordersLoading = useSelector(
    (state) => state.workorders.deviceWorkordersLoading,
  );
  const deviceWorkordersList = useSelector(
    (state) => state.workorders.activeWorkordersList,
  );
  const deviceWorkorderHistoryLogLoading = useSelector(
    (state) => state.workorders.deviceWorkorderHistoryLogLoading,
  );
  const deviceWorkorderHistoryLog = useSelector(
    (state) => state.workorders.completedWorkordersList,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);

  // Dispatch Device Details
  useEffect(() => {
    dispatch(getDeviceDetails(id));
  }, []);

  // Dispatch Device Workorders List
  useEffect(() => {
    const data = {
      model_id: details && details.model && details.model.id,
      device_id: id,
    };
    if (details && details.model && details.model.id) {
      dispatch(getAllDeviceWorkorders(data));
      dispatch(getDeviceWorkorderHistoryLog(data));
    }
  }, [details]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Device Details</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs */}
          <div className="grid grid-cols-2 gap-5 mb-6 2xl:mb-10 ">
            <div className="col-start-1">
              <div className="flex items-center">
                <img
                  src="../assets/icons/icon-devices.svg"
                  alt="icon-devices"
                  className="invert dark:invert-0 w-4 h-4 opacity-70"
                />
                <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                  {" "}
                  Devices /
                </span>
                {query.get("page_from") == "model" ? (
                  <>
                    <Link
                      to="/models"
                      exact={true}
                      className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"
                    >
                      All Models /
                    </Link>
                    <Link
                      to={`/device-model/${
                        details &&
                        details.model &&
                        details.model.id &&
                        details.model.id
                      }`}
                      exact={true}
                      className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"
                    >
                      Model Details /
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/devices"
                    exact={true}
                    className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"
                  >
                    All Devices /
                  </Link>
                )}
                <span className="ml-1 text-xs text-secondary font-semibold">
                  Device Details
                </span>
              </div>
              <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold capitalize">
                {detailsLoading ? (
                  <Skeleton
                    width="250px"
                    height="35px"
                    className="dark:bg-darkMainBg"
                  />
                ) : (
                  <>{details && details.name} Details</>
                )}
              </h1>
            </div>

            <div className="col-start-2 ml-auto my-auto">
              {query.get("page_from") == "model" ? (
                <Link
                  to={`/device-model/${
                    details &&
                    details.model &&
                    details.model.id &&
                    details.model.id
                  }`}
                  exact={true}
                  className="bg-transparent text-primary md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2 shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:transition-all hover:duration-300"
                >
                  Back to Model
                </Link>
              ) : (
                <>
                  {(permissions.includes("all_device") ||
                    permissions.includes("update_device") ||
                    permissions.includes("Admin")) && (
                    <Link
                      to={`/edit-device/${id}`}
                      exact={true}
                      className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0"
                    >
                      Edit Device
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Device Details : Start */}
          <div className="grid grid-cols-2 gap-6">
            {/* Device Info Section : Start */}
            <div className="col-start-1 md:col-span-2 xl:col-span-3">
              <DeviceInfo
                image={details.image}
                qrImage={details.generated_qr}
                name={details.name}
                category={details.category}
                serial_number={details.serial_number}
                status={details.status}
                deviceId={details.device_id}
                manufacturedBy={details.manufactured_by}
                modelCategory={details.model_category}
                manufacturedDate={details.manufactured_date}
                modelNo={details.model && details.model.model_id}
                categoryType={
                  details.model &&
                  details.model.which_category &&
                  details.model.which_category
                }
                location={details.location}
                wdl={`${details.width} X ${details.depth} X ${details.length}`}
                warranty={details.warranty_till}
                id={id}
                modelId={
                  details &&
                  details &&
                  details.model &&
                  details.model &&
                  details.model.id
                }
                from={query.get("page_from")}
              />
            </div>
            {/* Device Info Section : End */}

            {/* Device Log Section : Start */}
            <div className="col-start-1 md:col-span-2 xl:col-span-1">
              <div className="w-full h-full min-h-[300px] bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl p-6 drop-shadow-md">
                {!(
                  (permissions.includes("all_device") ||
                    permissions.includes("read_device") ||
                    permissions.includes("Admin")) &&
                  (permissions.includes("all_model") ||
                    permissions.includes("read_model") ||
                    permissions.includes("Admin")) &&
                  (permissions.includes("all_work_order") ||
                    permissions.includes("read_work_order") ||
                    permissions.includes("Admin"))
                ) ? (
                  <PermissionsMessage
                    additionalClassName="h-[300px] py-10 px-5 2xl:px-20"
                    title="Workorder History"
                    message="read model, read device and read work order"
                  />
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <img
                          src="../assets/icons/icon-timer.svg"
                          alt="icon-timer"
                          className="w-7 h-7 dark:invert"
                        />
                        <div className="text-lg text-black2 dark:text-gray2 font-medium ml-2">
                          Work Order History
                        </div>
                      </div>
                      {deviceWorkorderHistoryLog &&
                        deviceWorkorderHistoryLog.length > 0 && (
                          <Link
                            to={`/completed-jobs/${
                              details &&
                              details.model &&
                              details.model.id &&
                              details.model.id
                            }?device=${id}&device_specific=true`}
                            exact={true}
                            className="text-sm text-black2 dark:text-primary dark:text-opacity-60 font-medium underline transition-all duration-300 hover:text-primary dark:hover:text-opacity-100 hover:transition-all hover:duration-300 focus:outline-0"
                          >
                            View All
                          </Link>
                        )}
                    </div>

                    {deviceWorkorderHistoryLogLoading ? (
                      <Skeleton
                        count={3}
                        height={70}
                        baseColor="#f5f5f5"
                        highlightColor="#e1e1e1"
                        borderRadius="20"
                        className="mb-2 dark:bg-darkMainBg"
                        enableAnimation="true"
                        duration={2.5}
                        inline={true}
                      />
                    ) : (
                      <>
                        {deviceWorkorderHistoryLog &&
                        deviceWorkorderHistoryLog.length > 0 ? (
                          <div className="w-full h-[220px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                            {deviceWorkorderHistoryLog.map((log, index) => {
                              const {
                                id,
                                title,
                                work_order_number,
                                work_order_status,
                                completed_task,
                              } = log;
                              return (
                                <DeviceLog
                                  key={id}
                                  title={title}
                                  wo_number={work_order_number}
                                  wo_status={work_order_status}
                                  wo_completed_date={
                                    completed_task &&
                                    completed_task.completed_at
                                  }
                                />
                              );
                            })}
                          </div>
                        ) : (
                          <>
                            {/* If no device logs found */}
                            {EnvironmentConstant.mode.toLowerCase() ===
                            "offline" ? (
                              <OnlyCloudAllowed />
                            ) : (
                              <div className="px-10 py-20 text-center">
                                <p className="text-lg text-black2 dark:text-gray2 opacity-50">
                                  No Work Order History Found for this Device
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* Device Log Section : End */}

            {/* Device Active Work Orders : Start */}
            <div className="col-start-2 md:col-span-2">
              <div className="w-full h-full relative bg-primary dark:bg-opacity-60 text-white dark:text-gray2 border border-gray2 dark:border-black2 rounded-2xl p-6 drop-shadow-md">
                {!(
                  (permissions.includes("all_model") ||
                    permissions.includes("read_model") ||
                    permissions.includes("Admin")) &&
                  (permissions.includes("all_device") ||
                    permissions.includes("read_device") ||
                    permissions.includes("Admin")) &&
                  (permissions.includes("all_wok_order") ||
                    permissions.includes("read_work_order") ||
                    permissions.includes("Admin"))
                ) ? (
                  <div className="flex flex-col items-center justify-center mx-auto w-full h-[300px] py-10 px-5 2xl:px-20">
                    <div className="text-3xl font-bold text-center dark:text-gray2">
                      Access Denied for Active Work Orders
                    </div>
                    <div className="text-base 2xl:text-lg text-gray2 text-center mb-2">
                      Access to this page restricted due to the insufficient
                      permission to{" "}
                      <strong className="lowercase">
                        read model, read device and read work order
                      </strong>
                      . <br />
                      Please contact the admin to get the access.
                    </div>
                    <div className="text-base 2xl:text-lg text-gray2 text-opacity-75 text-center">
                      For more information, please read the
                      <a
                        href={`${ServerPath}/permissions.pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="pl-1 text-lg text-gray2 dark:text-gray2 font-semibold underline transition-all duration-300 ease-in-out hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-in-out"
                      >
                        "Permissions Documentation".
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <img
                          src="../assets/icons/icon-active-timer.svg"
                          alt="icon-active-timer"
                          className="w-7 h-7"
                        />
                        <div className="text-lg font-medium ml-2">
                          Active Work Orders
                        </div>
                      </div>
                      {deviceWorkordersList &&
                        deviceWorkordersList.length > 0 && (
                          <Link
                            to={`/active-workorders/${
                              details &&
                              details.model &&
                              details.model.id &&
                              details.model.id
                            }?device=${id}&device_specific=true}`}
                            exact={true}
                            className="text-sm text-gray2 underline transition-all duration-300 hover:text-white hover:transition-all hover:duration-300 focus:outline-0"
                          >
                            View All
                          </Link>
                        )}
                    </div>

                    {EnvironmentConstant.mode.toLowerCase() === "offline" ? (
                      <OnlyCloudAllowed />
                    ) : (
                      <>
                        {deviceWorkordersLoading ? (
                          <Skeleton
                            count={2}
                            height={100}
                            baseColor="#f5f5f5"
                            highlightColor="#e1e1e1"
                            borderRadius="20"
                            enableAnimation="true"
                            className="mb-3 dark:bg-darkMainBg"
                            duration={2.5}
                            inline={true}
                          />
                        ) : (
                          <>
                            {deviceWorkordersList &&
                            deviceWorkordersList.length > 0 ? (
                              <div className="w-full h-[250px] pr-5 overflow-scroll scrollbar-thin scrollbar-thumb-black2 dark:scrollbar-thumb-darkMainBg scrollbar-track-primary dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                                {deviceWorkordersList.map(
                                  (workorder, index) => {
                                    const {
                                      id,
                                      device_id,
                                      model_id,
                                      title,
                                      work_order_number,
                                      work_order_status,
                                      created_at_formated,
                                    } = workorder;
                                    return (
                                      <DeviceActiveWorkOrders
                                        key={id}
                                        wo_id={id}
                                        title={title}
                                        workOrderNumber={work_order_number}
                                        workOrderStatus={work_order_status}
                                        createdDate={created_at_formated}
                                        device_id={device_id}
                                        model_id={model_id}
                                      />
                                    );
                                  },
                                )}
                              </div>
                            ) : (
                              <div className="text-center my-[80px] text-white dark:text-gray2 opacity-50">
                                No Active Work Orders Found for this Device
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* Device Active Work Orders : End */}
          </div>
        </section>
      </Layout>
    </>
  );
};
export default DeviceDetails;
