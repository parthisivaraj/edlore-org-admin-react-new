import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";
import {
  changeWorkordersSearch,
  getAllCompletedWorkorders,
} from "../../redux/reduxes/workorders/workorderAction";
import { getDeviceWorkorderHistoryLog } from "../../redux/reduxes/workorders/workorderAction";
import PaginatedItems from "../../components/common/pagination";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import Filters from "../../components/common/filters";
import AppliedFilters from "../../components/common/appliedFilters";
import { useLocation } from "react-router";
import ListDataNotFound from "../../components/common/listDataNotFound";
import PermissionsMessage from "../../components/common/permissionsMessage";
import { EnvironmentConstant } from "../../helpers";
import { OnlyCloudAllowed } from "../../layout/cloud-message";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CompletedJobs = (props) => {
  const { model_id } = props.match.params;
  let query = useQuery();
  const device_specific = query.get("device_specific");
  const device_id = query.get("device");
  const dispatch = useDispatch();

  // Fetch Data
  const completedJobsLoading = useSelector(
    (state) => state.workorders.completedWorkordersLoading,
  );
  const workorders = useSelector(
    (state) => state.workorders.completedWorkordersList,
  );
  const pagination = useSelector(
    (state) => state.workorders.completedWorkordersPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByCompletedWONumber = useSelector(
    (state) => state.sort.sortByCompletedWONumber,
  );
  const sortByCompletedWOTitle = useSelector(
    (state) => state.sort.sortByCompletedWOTitle,
  );
  const sortByCompletedWOModelId = useSelector(
    (state) => state.sort.sortByCompletedWOModelId,
  );
  const sortByCompletedWOSerialNumber = useSelector(
    (state) => state.sort.sortByCompletedWOSerialNumber,
  );
  const sortByCompletedWOTaskType = useSelector(
    (state) => state.sort.sortByCompletedWOTaskType,
  );
  const sortByCompletedWOAssigned = useSelector(
    (state) => state.sort.sortByCompletedWOAssigned,
  );
  const filters = useSelector(
    (state) => state.workorders.completedWorkordersFilters,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.workorders.searchWorkordersQuery,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Data
  useEffect(() => {
    const data = {
      model_id: model_id,
      device_id: device_id,
      search: searchQuery,
      page: 0,
      paginate: true,
      limit: 10,
      filter: {},
      sort:
        sortByCompletedWONumber != 0
          ? sortByCompletedWONumber
          : sortByCompletedWOTitle != 0
          ? sortByCompletedWOTitle
          : sortByCompletedWOModelId != 0
          ? sortByCompletedWOModelId
          : sortByCompletedWOSerialNumber != 0
          ? sortByCompletedWOSerialNumber
          : sortByCompletedWOTaskType != 0
          ? sortByCompletedWOTaskType
          : sortByCompletedWOAssigned != 0
          ? sortByCompletedWOAssigned
          : 0,
      sorting:
        sortByCompletedWONumber != 0
          ? "work_order_number"
          : sortByCompletedWOTitle != 0
          ? "title"
          : sortByCompletedWOModelId != 0
          ? "model_id"
          : sortByCompletedWOSerialNumber != 0
          ? "serial_number"
          : sortByCompletedWOTaskType != 0
          ? "task_type"
          : "",
    };
    if (device_specific == "true") {
      delayLoading && dispatch(getDeviceWorkorderHistoryLog(data));
    } else {
      delayLoading && dispatch(getAllCompletedWorkorders(data));
    }
  }, [sort]);

  // Dispatch to Workorders
  useEffect(() => {
    const data = {
      model_id: model_id,
      device_id: device_id,
      search: searchQuery,
      page: 0,
      paginate: true,
      limit: 10,
      filter: {},
      sort:
        sortByCompletedWONumber != 0
          ? sortByCompletedWONumber
          : sortByCompletedWOTitle != 0
          ? sortByCompletedWOTitle
          : sortByCompletedWOModelId != 0
          ? sortByCompletedWOModelId
          : sortByCompletedWOSerialNumber != 0
          ? sortByCompletedWOSerialNumber
          : sortByCompletedWOTaskType != 0
          ? sortByCompletedWOTaskType
          : sortByCompletedWOAssigned != 0
          ? sortByCompletedWOAssigned
          : 0,
      sorting:
        sortByCompletedWONumber != 0
          ? "work_order_number"
          : sortByCompletedWOTitle != 0
          ? "title"
          : sortByCompletedWOModelId != 0
          ? "model_id"
          : sortByCompletedWOSerialNumber != 0
          ? "serial_number"
          : sortByCompletedWOTaskType != 0
          ? "task_type"
          : "",
    };
    if (device_specific == "true") {
      dispatch(getDeviceWorkorderHistoryLog(data));
    } else {
      dispatch(getAllCompletedWorkorders(data));
    }
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Search Query
  useEffect(() => {
    const data = {
      model_id: model_id,
      device_id: device_id,
      search: searchQuery,
      page: 0,
      paginate: true,
      limit: 10,
      filter: {},
      sort:
        sortByCompletedWONumber != 0
          ? sortByCompletedWONumber
          : sortByCompletedWOTitle != 0
          ? sortByCompletedWOTitle
          : sortByCompletedWOModelId != 0
          ? sortByCompletedWOModelId
          : sortByCompletedWOSerialNumber != 0
          ? sortByCompletedWOSerialNumber
          : sortByCompletedWOTaskType != 0
          ? sortByCompletedWOTaskType
          : sortByCompletedWOAssigned != 0
          ? sortByCompletedWOAssigned
          : 0,
      sorting:
        sortByCompletedWONumber != 0
          ? "work_order_number"
          : sortByCompletedWOTitle != 0
          ? "title"
          : sortByCompletedWOModelId != 0
          ? "model_id"
          : sortByCompletedWOSerialNumber != 0
          ? "serial_number"
          : sortByCompletedWOTaskType != 0
          ? "task_type"
          : "",
    };
    if (device_specific == "true") {
      dispatch(getDeviceWorkorderHistoryLog(data));
    } else {
      dispatch(getAllCompletedWorkorders(data));
    }
  }, [searchQuery]);

  // Search
  const handleSearchChange = (searchData) => {
    dispatch(changeWorkordersSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      model_id: model_id,
      device_id: device_id,
      search: searchQuery,
      page: e.selected,
      paginate: true,
      limit: 10,
      filter: filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByCompletedWONumber != 0
          ? sortByCompletedWONumber
          : sortByCompletedWOTitle != 0
          ? sortByCompletedWOTitle
          : sortByCompletedWOModelId != 0
          ? sortByCompletedWOModelId
          : sortByCompletedWOSerialNumber != 0
          ? sortByCompletedWOSerialNumber
          : sortByCompletedWOTaskType != 0
          ? sortByCompletedWOTaskType
          : sortByCompletedWOAssigned != 0
          ? sortByCompletedWOAssigned
          : 0,
      sorting:
        sortByCompletedWONumber != 0
          ? "work_order_number"
          : sortByCompletedWOTitle != 0
          ? "title"
          : sortByCompletedWOModelId != 0
          ? "model_id"
          : sortByCompletedWOSerialNumber != 0
          ? "serial_number"
          : sortByCompletedWOTaskType != 0
          ? "task_type"
          : "",
    };
    if (device_specific == "true") {
      dispatch(getDeviceWorkorderHistoryLog(data));
    } else {
      dispatch(getAllCompletedWorkorders(data));
    }
  };

  // Delete Workorder
  const [deleteWorkorderModal, setDeleteWorkorderModal] = useState(false);
  const [deleteWorkorderId, setDeleteWorkorderId] = useState(null);

  const confirmDeleteWorkorder = (stat, id) => {
    setDeleteWorkorderModal(stat);
    setDeleteWorkorderId(id);
  };

  // Dispatch Sorting
  const handleChangeSort = (v, n) => {
    const getSort = (x) => {
      let sort = 0;
      if (x == 0 || x == 1) {
        sort = v + 1;
      } else {
        sort = 0;
      }
      return sort;
    };

    const data = {
      name: n,
      sort: getSort(v),
    };
    dispatch(updateSort(data));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Completed Jobs</title>
      </Helmet>

      <Layout>
        <section className="relative">
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img
                    src="../assets/icons/icon-workorders.svg"
                    alt="icon-workorders"
                    className="w-[18px] h-[18px] invert dark:invert-0 opacity-70"
                  />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                    Work Orders /
                  </span>
                  <span className="ml-1 text-xs text-secondary font-semibold">
                    {" "}
                    Completed Jobs
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  Completed Jobs
                </h1>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Completed Jobs Table : Start */}
          <div className="grid grid-cols-1">
            <div className="bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl py-8 drop-shadow-md">
              {!(
                permissions.includes("all_work_order") ||
                permissions.includes("read_work_order") ||
                permissions.includes("Admin")
              ) ? (
                <PermissionsMessage
                  additionalClassName="h-[72vh] p-20"
                  title="Completed Jobs"
                  message="read work order"
                />
              ) : (
                <>
                  {/* Search Bar and Filters */}
                  <div className="flex items-center justify-between mb-10 px-6 xl:px-8">
                    <div className="w-[350px] xl:w-[400px] relative md:mb-4 xl:mb-0 overflow-hidden">
                      <input
                        type="search"
                        className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-6 py-2 border border-gray2 dark:border-opacity-50 rounded-full focus:border-secondary focus:outline-none"
                        name="user_search"
                        id="user_search"
                        placeholder="Search for Completed Jobs..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                      />
                      <div className="absolute top-3.5 right-4 block m-auto focus-visible:outline-none">
                        <img
                          src="../assets/icons/icon-search.svg"
                          alt="icon-search"
                          className="w-4 h-4 block m-auto dark:invert"
                        />
                      </div>
                    </div>

                    {/* Filters : Start */}
                    <Filters
                      filters={filters}
                      getListAction={getAllCompletedWorkorders}
                      page={0}
                      limit={10}
                      sort={
                        sortByCompletedWONumber != 0
                          ? sortByCompletedWONumber
                          : sortByCompletedWOTitle != 0
                          ? sortByCompletedWOTitle
                          : sortByCompletedWOModelId != 0
                          ? sortByCompletedWOModelId
                          : sortByCompletedWOSerialNumber != 0
                          ? sortByCompletedWOSerialNumber
                          : sortByCompletedWOTaskType != 0
                          ? sortByCompletedWOTaskType
                          : sortByCompletedWOAssigned != 0
                          ? sortByCompletedWOAssigned
                          : 0
                      }
                      sorting={
                        sortByCompletedWONumber != 0
                          ? "work_order_number"
                          : sortByCompletedWOTitle != 0
                          ? "title"
                          : sortByCompletedWOModelId != 0
                          ? "model_id"
                          : sortByCompletedWOSerialNumber != 0
                          ? "serial_number"
                          : sortByCompletedWOTaskType != 0
                          ? "task_type"
                          : ""
                      }
                    />
                  </div>

                  {/* Applied Filters */}
                  <div className="my-5 px-8">
                    <AppliedFilters
                      filters={filters}
                      getActionList={getAllCompletedWorkorders}
                      page={0}
                      limit={10}
                      search={searchQuery}
                      sort={
                        sortByCompletedWONumber != 0
                          ? sortByCompletedWONumber
                          : sortByCompletedWOTitle != 0
                          ? sortByCompletedWOTitle
                          : sortByCompletedWOModelId != 0
                          ? sortByCompletedWOModelId
                          : sortByCompletedWOSerialNumber != 0
                          ? sortByCompletedWOSerialNumber
                          : sortByCompletedWOTaskType != 0
                          ? sortByCompletedWOTaskType
                          : sortByCompletedWOAssigned != 0
                          ? sortByCompletedWOAssigned
                          : 0
                      }
                      sorting={
                        sortByCompletedWONumber != 0
                          ? "work_order_number"
                          : sortByCompletedWOTitle != 0
                          ? "title"
                          : sortByCompletedWOModelId != 0
                          ? "model_id"
                          : sortByCompletedWOSerialNumber != 0
                          ? "serial_number"
                          : sortByCompletedWOTaskType != 0
                          ? "task_type"
                          : ""
                      }
                    />
                  </div>

                  {/* Completed Jobs Table : Start */}
                  <div className="w-full min-h-[500px] h-full 2xl:h-[58vh] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                    <table className="table-auto text-left relative min-w-full max-h-full">
                      <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                        <tr>
                          <th
                            onClick={() =>
                              handleChangeSort(
                                sortByCompletedWONumber,
                                "sortByCompletedWONumber",
                              )
                            }
                            scope="col"
                            width="5%"
                            className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                          >
                            <div className="flex items-center">
                              <span
                                className={
                                  sortByCompletedWONumber == 1 ||
                                  sortByCompletedWONumber == 2
                                    ? "text-primary"
                                    : ""
                                }
                              >
                                WO NUMBER
                              </span>
                              {sortByCompletedWONumber == 1 ? (
                                <img
                                  src="../assets/icons/icon-sort-asc.svg"
                                  alt="icon-sort-asc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : sortByCompletedWONumber == 2 ? (
                                <img
                                  src="../assets/icons/icon-sort-desc.svg"
                                  alt="icon-sort-desc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : (
                                <img
                                  src="../assets/icons/icon-sort.svg"
                                  alt="icon-sort"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() =>
                              handleChangeSort(
                                sortByCompletedWOTitle,
                                "sortByCompletedWOTitle",
                              )
                            }
                            scope="col"
                            width="20%"
                            className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                          >
                            <div className="flex items-center">
                              <span
                                className={
                                  sortByCompletedWOTitle == 1 ||
                                  sortByCompletedWOTitle == 2
                                    ? "text-primary"
                                    : ""
                                }
                              >
                                WO Title
                              </span>
                              {sortByCompletedWOTitle == 1 ? (
                                <img
                                  src="../assets/icons/icon-sort-asc.svg"
                                  alt="icon-sort-asc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : sortByCompletedWOTitle == 2 ? (
                                <img
                                  src="../assets/icons/icon-sort-desc.svg"
                                  alt="icon-sort-desc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : (
                                <img
                                  src="../assets/icons/icon-sort.svg"
                                  alt="icon-sort"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() =>
                              handleChangeSort(
                                sortByCompletedWOModelId,
                                "sortByCompletedWOModelId",
                              )
                            }
                            scope="col"
                            width="10%"
                            className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                          >
                            <div className="flex items-center">
                              <span
                                className={
                                  sortByCompletedWOModelId == 1 ||
                                  sortByCompletedWOModelId == 2
                                    ? "text-primary"
                                    : ""
                                }
                              >
                                Model ID
                              </span>
                              {sortByCompletedWOModelId == 1 ? (
                                <img
                                  src="../assets/icons/icon-sort-asc.svg"
                                  alt="icon-sort-asc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : sortByCompletedWOModelId == 2 ? (
                                <img
                                  src="../assets/icons/icon-sort-desc.svg"
                                  alt="icon-sort-desc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : (
                                <img
                                  src="../assets/icons/icon-sort.svg"
                                  alt="icon-sort"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() =>
                              handleChangeSort(
                                sortByCompletedWOSerialNumber,
                                "sortByCompletedWOSerialNumber",
                              )
                            }
                            scope="col"
                            width="20%"
                            className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                          >
                            <div className="flex items-center">
                              <span
                                className={
                                  sortByCompletedWOSerialNumber == 1 ||
                                  sortByCompletedWOSerialNumber == 2
                                    ? "text-primary"
                                    : ""
                                }
                              >
                                Serial Number
                              </span>
                              {sortByCompletedWOSerialNumber == 1 ? (
                                <img
                                  src="../assets/icons/icon-sort-asc.svg"
                                  alt="icon-sort-asc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : sortByCompletedWOSerialNumber == 2 ? (
                                <img
                                  src="../assets/icons/icon-sort-desc.svg"
                                  alt="icon-sort-desc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : (
                                <img
                                  src="../assets/icons/icon-sort.svg"
                                  alt="icon-sort"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              )}
                            </div>
                          </th>
                          <th
                            onClick={() =>
                              handleChangeSort(
                                sortByCompletedWOTaskType,
                                "sortByCompletedWOTaskType",
                              )
                            }
                            scope="col"
                            width="10%"
                            className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                          >
                            <div className="flex items-center">
                              <span
                                className={
                                  sortByCompletedWOTaskType == 1 ||
                                  sortByCompletedWOTaskType == 2
                                    ? "text-primary"
                                    : ""
                                }
                              >
                                Task Type
                              </span>
                              {sortByCompletedWOTaskType == 1 ? (
                                <img
                                  src="../assets/icons/icon-sort-asc.svg"
                                  alt="icon-sort-asc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : sortByCompletedWOTaskType == 2 ? (
                                <img
                                  src="../assets/icons/icon-sort-desc.svg"
                                  alt="icon-sort-desc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : (
                                <img
                                  src="../assets/icons/icon-sort.svg"
                                  alt="icon-sort"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              )}
                            </div>
                          </th>
                          <th
                            scope="col"
                            width="10%"
                            className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                          >
                            <div className="flex items-center">
                              Assigned{" "}
                              <small className="ml-1">(User | Group)</small>
                            </div>
                          </th>
                          <th
                            scope="col"
                            width="10%"
                            className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                          >
                            Status
                          </th>
                          {/* <th scope="col" width="15%" className="px-8 py-4 text-sm uppercase whitespace-nowrap">Actions</th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {completedJobsLoading ? (
                          <tr>
                            <td colSpan="8" width="100%">
                              <Skeleton
                                count={10}
                                height={75}
                                baseColor="#f5f5f5"
                                highlightColor="#e1e1e1"
                                borderRadius="0"
                                enableAnimation="true"
                                duration={2.5}
                                inline={true}
                                className="dark:bg-darkMainBg"
                              />
                            </td>
                          </tr>
                        ) : (
                          <>
                            {workorders && workorders.length > 0 ? (
                              <>
                                {workorders &&
                                  workorders.length > 0 &&
                                  workorders.map((record, index) => {
                                    const {
                                      id,
                                      title,
                                      device,
                                      repeat,
                                      wo_type,
                                      task_type,
                                      status,
                                      assigned_to,
                                      assigned_to_type,
                                      work_order_status,
                                      wo_completed_at,
                                      work_order_number,
                                    } = record;
                                    return (
                                      <tr
                                        valign="top"
                                        key={id}
                                        className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                      >
                                        <td
                                          width="5%"
                                          className="px-4 xl:px-8 py-4 text-sm"
                                        >
                                          {work_order_number}
                                        </td>
                                        <td
                                          width="20%"
                                          className="px-4 xl:px-8 py-4 text-sm"
                                        >
                                          <Link
                                            to={`/workorder-details/${id}?status=&transmitted=list`}
                                            exact={true}
                                            className="text-sm font-medium text-primary first-letter:capitalize underline line-clamp-1"
                                            title={title && title}
                                          >
                                            {title && title}
                                          </Link>
                                          <div className="text-sm text-black3 dark:text-gray2 text-opacity-50 capitalize">
                                            {repeat
                                              ? "Recurrence"
                                              : "No repeat"}
                                          </div>
                                        </td>
                                        <td
                                          width="10%"
                                          className="px-4 xl:px-8 py-4 text-sm capitalize whitespace-nowrap"
                                        >
                                          {device &&
                                            device.model &&
                                            device.model.model_id &&
                                            device.model.model_id}
                                        </td>
                                        <td
                                          width="20%"
                                          className="px-4 xl:px-8 py-4 text-sm"
                                        >
                                          {permissions.includes("all_device") ||
                                          permissions.includes("read_device") ||
                                          permissions.includes("Admin") ? (
                                            <Link
                                              to={`/device-details/${
                                                device && device.id && device.id
                                              }?page_from=device`}
                                              exact={true}
                                              className="first-letter:capitalize  text-primary font-medium underline w-[200px] text-ellipsis whitespace-nowrap overflow-hidden"
                                              title={
                                                device &&
                                                device.name &&
                                                device.name
                                              }
                                            >
                                              {device &&
                                                device.name &&
                                                device.name}
                                            </Link>
                                          ) : (
                                            <div
                                              className="first-letter:capitalize font-medium w-[200px] text-ellipsis whitespace-nowrap overflow-hidden"
                                              title={
                                                device &&
                                                device.name &&
                                                device.name
                                              }
                                            >
                                              {device &&
                                                device.name &&
                                                device.name}
                                            </div>
                                          )}
                                          <div className="text-sm text-black3 dark:text-gray2 text-opacity-50">
                                            {device && device.serial_number}
                                          </div>
                                        </td>
                                        <td
                                          width="10%"
                                          className="px-4 xl:px-8 py-4 text-sm capitalize w-[200px] text-ellipsis whitespace-nowrap overflow-hidden"
                                          title={
                                            task_type &&
                                            task_type.title &&
                                            task_type.title
                                          }
                                        >
                                          {task_type &&
                                            task_type.title &&
                                            task_type.title}
                                        </td>
                                        <td
                                          width="10%"
                                          className="px-4 xl:px-8 py-4 text-sm  capitalize break-word"
                                        >
                                          {assigned_to_type && assigned_to_type}{" "}
                                          {`${
                                            assigned_to &&
                                            assigned_to != null &&
                                            assigned_to.user
                                              ? `(${assigned_to.user})`
                                              : ""
                                          }`}
                                        </td>
                                        <td
                                          width="10%"
                                          className="px-4 xl:px-8 py-4 text-sm capitalize break-word"
                                        >
                                          <div className="uppercase text-sm font-medium whitespace-nowrap">
                                            {work_order_status}
                                          </div>
                                          <div className="text-sm">
                                            {wo_completed_at}
                                          </div>
                                        </td>
                                        {/* <td width="15%" className="px-8 py-4 text-sm">
                                        <div className="flex items-center"> */}
                                        {/* <button type="button" className=" focus-visible:outline-none">
                                            <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="w-4 h-4 mr-3 dark:invert" />
                                          </button> */}
                                        {/* <button type="button" className="ml-2 focus-visible:outline-none">
                                            <img src="../assets/icons/icon-edit.svg" alt="icon-edit" className="w-4 h-4 dark:invert" />
                                          </button> */}
                                        {/* </div>
                                      </td> */}
                                      </tr>
                                    );
                                  })}
                              </>
                            ) : (
                              <ListDataNotFound
                                colSpan={8}
                                searchQuery={searchQuery}
                                listLength={workorders && workorders.length}
                                filters={filters}
                              />
                            )}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-end my-8 px-4">
                    {completedJobsLoading ? (
                      <Skeleton
                        count={1}
                        width={200}
                        height={40}
                        baseColor="#f5f5f5"
                        highlightColor="#e1e1e1"
                        borderRadius="30"
                        enableAnimation="true"
                        duration={2.5}
                        inline={true}
                        className=" dark:bg-darkMainBg"
                      />
                    ) : (
                      <PaginatedItems
                        itemsPerPage={pagination && pagination.per_page}
                        handlePageClick={handlePageClick}
                        pageCount={
                          pagination &&
                          Math.ceil(
                            pagination.total_entries / pagination.per_page,
                          )
                        }
                        current_page={pagination && pagination.current_page}
                        totalEntries={pagination && pagination.total_entries}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          {EnvironmentConstant.mode === "offline" && <OnlyCloudAllowed />}
        </section>
      </Layout>
    </>
  );
};
export default CompletedJobs;
