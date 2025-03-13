import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  changeWorkordersSearch,
  getAllDraftWorkorders,
} from "../../redux/reduxes/workorders/workorderAction";
import PaginatedItems from "../../components/common/pagination";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import Filters from "../../components/common/filters";
import AppliedFilters from "../../components/common/appliedFilters";
import ListDataNotFound from "../../components/common/listDataNotFound";
import PermissionsMessage from "../../components/common/permissionsMessage";
import { OnlyCloudAllowed } from "../../layout/cloud-message";
import { EnvironmentConstant } from "../../helpers";

const Drafts = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const draftWorkordersLoading = useSelector(
    (state) => state.workorders.draftWorkordersLoading,
  );
  const workorders = useSelector(
    (state) => state.workorders.draftWorkordersList,
  );
  const pagination = useSelector(
    (state) => state.workorders.draftWorkordersPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByDraftWONumber = useSelector(
    (state) => state.sort.sortByDraftWONumber,
  );
  const sortByDraftWOTitle = useSelector(
    (state) => state.sort.sortByDraftWOTitle,
  );
  const sortByDraftWOModelId = useSelector(
    (state) => state.sort.sortByDraftWOModelId,
  );
  const sortByDraftWOSerialNumber = useSelector(
    (state) => state.sort.sortByDraftWOSerialNumber,
  );
  const sortByDraftWOTaskType = useSelector(
    (state) => state.sort.sortByDraftWOTaskType,
  );
  const filters = useSelector(
    (state) => state.workorders.draftWorkordersFilters,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.workorders.searchWorkordersQuery,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Data
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      paginate: true,
      limit: 10,
      filter: {},
      sort:
        sortByDraftWONumber != 0
          ? sortByDraftWONumber
          : sortByDraftWOTitle != 0
          ? sortByDraftWOTitle
          : sortByDraftWOModelId != 0
          ? sortByDraftWOModelId
          : sortByDraftWOSerialNumber != 0
          ? sortByDraftWOSerialNumber
          : sortByDraftWOTaskType != 0
          ? sortByDraftWOTaskType
          : 0,
      sorting:
        sortByDraftWONumber != 0
          ? "work_order_number"
          : sortByDraftWOTitle != 0
          ? "title"
          : sortByDraftWOModelId != 0
          ? "model_id"
          : sortByDraftWOSerialNumber != 0
          ? "sl_no"
          : sortByDraftWOTaskType != 0
          ? "task_type"
          : "",
    };
    delayLoading && dispatch(getAllDraftWorkorders(data));
  }, [sort]);

  // Dispatch to Workorders
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      paginate: true,
      limit: 10,
      filter: {},
      sort:
        sortByDraftWONumber != 0
          ? sortByDraftWONumber
          : sortByDraftWOTitle != 0
          ? sortByDraftWOTitle
          : sortByDraftWOModelId != 0
          ? sortByDraftWOModelId
          : sortByDraftWOSerialNumber != 0
          ? sortByDraftWOSerialNumber
          : sortByDraftWOTaskType != 0
          ? sortByDraftWOTaskType
          : 0,
      sorting:
        sortByDraftWONumber != 0
          ? "work_order_number"
          : sortByDraftWOTitle != 0
          ? "title"
          : sortByDraftWOModelId != 0
          ? "model_id"
          : sortByDraftWOSerialNumber != 0
          ? "sl_no"
          : sortByDraftWOTaskType != 0
          ? "task_type"
          : "",
    };
    dispatch(getAllDraftWorkorders(data));
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      paginate: true,
      limit: 10,
      filter: {},
      sort:
        sortByDraftWONumber != 0
          ? sortByDraftWONumber
          : sortByDraftWOTitle != 0
          ? sortByDraftWOTitle
          : sortByDraftWOModelId != 0
          ? sortByDraftWOModelId
          : sortByDraftWOSerialNumber != 0
          ? sortByDraftWOSerialNumber
          : sortByDraftWOTaskType != 0
          ? sortByDraftWOTaskType
          : 0,
      sorting:
        sortByDraftWONumber != 0
          ? "work_order_number"
          : sortByDraftWOTitle != 0
          ? "title"
          : sortByDraftWOModelId != 0
          ? "model_id"
          : sortByDraftWOSerialNumber != 0
          ? "sl_no"
          : sortByDraftWOTaskType != 0
          ? "task_type"
          : "",
    };
    dispatch(getAllDraftWorkorders(data));
  }, [searchQuery]);

  // Search
  const handleSearchChange = (searchData) => {
    dispatch(changeWorkordersSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      paginate: true,
      limit: 10,
      filter: filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByDraftWONumber != 0
          ? sortByDraftWONumber
          : sortByDraftWOTitle != 0
          ? sortByDraftWOTitle
          : sortByDraftWOModelId != 0
          ? sortByDraftWOModelId
          : sortByDraftWOSerialNumber != 0
          ? sortByDraftWOSerialNumber
          : sortByDraftWOTaskType != 0
          ? sortByDraftWOTaskType
          : 0,
      sorting:
        sortByDraftWONumber != 0
          ? "work_order_number"
          : sortByDraftWOTitle != 0
          ? "title"
          : sortByDraftWOModelId != 0
          ? "model_id"
          : sortByDraftWOSerialNumber != 0
          ? "sl_no"
          : sortByDraftWOTaskType != 0
          ? "task_type"
          : "",
    };
    dispatch(getAllDraftWorkorders(data));
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
        <title>Drafts</title>
      </Helmet>

      <Layout>
        <section className="relative">
          {/* Breadcrumbs : Start */}
          <div>
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
                Work Order Drafts
              </span>
            </div>
            <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2  font-bold mb-8">
              Work Order Drafts
            </h1>
          </div>
          {/* Breadcrumbs : End */}

          {/* Drafts Table Section : Start */}
          <div className="w-full bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl drop-shadow-md">
            {!(
              permissions.includes("all_work_order") ||
              permissions.includes("read_work_order") ||
              permissions.includes("Admin")
            ) ? (
              <PermissionsMessage
                additionalClassName="h-[75vh] p-20"
                title="Workorder Drafts"
                message="read work order"
              />
            ) : (
              <>
                {/* Search Bar and Filters */}
                <div className="flex items-center justify-between mb-8 pt-5 xl:pt-8 px-5 xl:px-8">
                  <div className="w-[300px] xl:w-[400px] relative overflow-hidden">
                    <input
                      type="search"
                      className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 text-sm px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                      name="user_search"
                      id="user_search"
                      placeholder="Search for Drafts..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <div className="block absolute top-3 right-3 m-auto focus-visible:outline-none">
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
                    getListAction={getAllDraftWorkorders}
                    page={0}
                    limit={10}
                    sort={
                      sortByDraftWONumber != 0
                        ? sortByDraftWONumber
                        : sortByDraftWOTitle != 0
                        ? sortByDraftWOTitle
                        : sortByDraftWOModelId != 0
                        ? sortByDraftWOModelId
                        : sortByDraftWOSerialNumber != 0
                        ? sortByDraftWOSerialNumber
                        : sortByDraftWOTaskType != 0
                        ? sortByDraftWOTaskType
                        : 0
                    }
                    sorting={
                      sortByDraftWONumber != 0
                        ? "work_order_number"
                        : sortByDraftWOTitle != 0
                        ? "title"
                        : sortByDraftWOModelId != 0
                        ? "model_id"
                        : sortByDraftWOSerialNumber != 0
                        ? "sl_no"
                        : sortByDraftWOTaskType != 0
                        ? "task_type"
                        : ""
                    }
                  />
                </div>

                {/* Applied Filters */}
                <div className="my-5 px-8">
                  <AppliedFilters
                    filters={filters}
                    getActionList={getAllDraftWorkorders}
                    page={0}
                    limit={10}
                    search={searchQuery}
                    sort={
                      sortByDraftWONumber != 0
                        ? sortByDraftWONumber
                        : sortByDraftWOTitle != 0
                        ? sortByDraftWOTitle
                        : sortByDraftWOModelId != 0
                        ? sortByDraftWOModelId
                        : sortByDraftWOSerialNumber != 0
                        ? sortByDraftWOSerialNumber
                        : sortByDraftWOTaskType != 0
                        ? sortByDraftWOTaskType
                        : 0
                    }
                    sorting={
                      sortByDraftWONumber != 0
                        ? "work_order_number"
                        : sortByDraftWOTitle != 0
                        ? "title"
                        : sortByDraftWOModelId != 0
                        ? "model_id"
                        : sortByDraftWOSerialNumber != 0
                        ? "sl_no"
                        : sortByDraftWOTaskType != 0
                        ? "task_type"
                        : ""
                    }
                  />
                </div>

                {/* Workorders Drafts Table List */}
                <div className="w-full min-h-[500px] h-full 2xl:h-[550px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <table className="table-auto text-left relative min-w-full max-h-full">
                    <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                      <tr>
                        <th
                          onClick={() =>
                            handleChangeSort(
                              sortByDraftWONumber,
                              "sortByDraftWONumber",
                            )
                          }
                          scope="col"
                          width="5%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByDraftWONumber == 1 ||
                                sortByDraftWONumber == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              WO NUMBER
                            </span>
                            {sortByDraftWONumber == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByDraftWONumber == 2 ? (
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
                              sortByDraftWOTitle,
                              "sortByDraftWOTitle",
                            )
                          }
                          scope="col"
                          width="30%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByDraftWOTitle == 1 ||
                                sortByDraftWOTitle == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              WO Title
                            </span>
                            {sortByDraftWOTitle == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByDraftWOTitle == 2 ? (
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
                              sortByDraftWOModelId,
                              "sortByDraftWOModelId",
                            )
                          }
                          scope="col"
                          width="10%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByDraftWOModelId == 1 ||
                                sortByDraftWOModelId == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Model ID
                            </span>
                            {sortByDraftWOModelId == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByDraftWOModelId == 2 ? (
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
                              sortByDraftWOSerialNumber,
                              "sortByDraftWOSerialNumber",
                            )
                          }
                          scope="col"
                          width="20%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByDraftWOSerialNumber == 1 ||
                                sortByDraftWOSerialNumber == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Serial Number
                            </span>
                            {sortByDraftWOSerialNumber == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByDraftWOSerialNumber == 2 ? (
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
                              sortByDraftWOTaskType,
                              "sortByDraftWOTaskType",
                            )
                          }
                          scope="col"
                          width="10%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByDraftWOTaskType == 1 ||
                                sortByDraftWOTaskType == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Task Type
                            </span>
                            {sortByDraftWOTaskType == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByDraftWOTaskType == 2 ? (
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
                            {" "}
                            Assigned{" "}
                            <small className="ml-1">(User | Group)</small>
                          </div>
                        </th>
                        <th
                          scope="col"
                          width="15%"
                          className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {(permissions.includes("all_work_order") ||
                            permissions.includes("update_work_order") ||
                            permissions.includes("Admin")) &&
                            (permissions.includes("all_category") ||
                              permissions.includes("read_category") ||
                              permissions.includes("Admin")) &&
                            (permissions.includes("all_model") ||
                              permissions.includes("read_model") ||
                              permissions.includes("Admin")) &&
                            (permissions.includes("all_device") ||
                              permissions.includes("read_device") ||
                              permissions.includes("Admin")) &&
                            (permissions.includes("all_task_type") ||
                              permissions.includes("read_task_type") ||
                              permissions.includes("Admin")) &&
                            (permissions.includes("all_troubleshoot") ||
                              permissions.includes("read_troubleshoot") ||
                              permissions.includes("Admin")) &&
                            (permissions.includes("all_procedure") ||
                              permissions.includes("read_procedure") ||
                              permissions.includes("Admin")) &&
                            (permissions.includes("all_error_codes") ||
                              permissions.includes("read_error_codes") ||
                              permissions.includes("Admin")) &&
                            (permissions.includes("all_mcodes") ||
                              permissions.includes("read_mcodes") ||
                              permissions.includes("Admin")) &&
                            (permissions.includes("all_alarm_codes") ||
                              permissions.includes("read_alarm_codes") ||
                              permissions.includes("Admin")) &&
                            (permissions.includes("all_group") ||
                              permissions.includes("read_group") ||
                              permissions.includes("Admin")) &&
                            (permissions.includes("all_user") ||
                              permissions.includes("read_user") ||
                              permissions.includes("Admin")) && (
                              <span> Actions</span>
                            )}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {draftWorkordersLoading ? (
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
                              {workorders.map((record, index) => {
                                const {
                                  id,
                                  title,
                                  repeat,
                                  device,
                                  wo_type,
                                  task_type,
                                  status,
                                  assigned_to,
                                  assigned_to_type,
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
                                      {" "}
                                      {work_order_number
                                        ? work_order_number
                                        : "-"}{" "}
                                    </td>
                                    <td
                                      width="30%"
                                      className="px-4 xl:px-8 py-4 text-sm"
                                    >
                                      <Link
                                        to={`/workorder-details/${id}?status=draft&transmitted=list`}
                                        exact={true}
                                        className="text-sm font-medium text-primary first-letter:capitalize underline line-clamp-1"
                                        title={title}
                                      >
                                        {title ? title : "-"}
                                      </Link>
                                      <div className="text-sm text-black3 dark:text-gray2 text-opacity-50 capitalize">
                                        {repeat ? "Recurrence" : "One Time"}
                                      </div>
                                    </td>
                                    {/* <td width="10%" className="px-4 xl:px-8 py-4 text-sm capitalize whitespace-nowrap">{wo_type}</td> */}
                                    <td
                                      width="10%"
                                      className="px-4 xl:px-8 py-4 text-sm break-all"
                                    >
                                      {device
                                        ? device &&
                                          device.model &&
                                          device.model &&
                                          device.model.model_id &&
                                          device.model.model_id
                                        : "-"}
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
                                            device && device.name && device.name
                                          }
                                        >
                                          {device
                                            ? device &&
                                              device.name &&
                                              device.name
                                            : "-"}
                                        </Link>
                                      ) : (
                                        <div
                                          className="first-letter:capitalize font-medium w-[200px] text-ellipsis whitespace-nowrap overflow-hidden"
                                          title={
                                            device && device.name && device.name
                                          }
                                        >
                                          {" "}
                                          {device
                                            ? device &&
                                              device.name &&
                                              device.name
                                            : "-"}
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
                                      {task_type
                                        ? task_type &&
                                          task_type.title &&
                                          task_type.title
                                        : "-"}
                                    </td>
                                    <td
                                      width="10%"
                                      className="px-4 xl:px-8 py-4 text-sm  capitalize break-word"
                                    >
                                      {assigned_to_type == "Group"
                                        ? assigned_to &&
                                          assigned_to.group &&
                                          assigned_to.group.title
                                        : assigned_to_type == "User"
                                        ? assigned_to &&
                                          assigned_to.users &&
                                          assigned_to.users.name
                                        : "-"}
                                      <small className="pl-1 font-medium">
                                        {assigned_to_type
                                          ? `[${assigned_to_type}]`
                                          : ""}
                                      </small>
                                    </td>
                                    <td
                                      width="15%"
                                      className="px-8 py-4 text-sm"
                                    >
                                      <div className="flex items-center">
                                        {/* <button type="button" className=" focus-visible:outline-none">
                                          <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="w-4 h-4 mr-3 dark:invert" />
                                        </button> */}

                                        {(permissions.includes(
                                          "all_work_order",
                                        ) ||
                                          permissions.includes(
                                            "update_work_order",
                                          ) ||
                                          permissions.includes("Admin")) &&
                                          (permissions.includes(
                                            "all_category",
                                          ) ||
                                            permissions.includes(
                                              "read_category",
                                            ) ||
                                            permissions.includes("Admin")) &&
                                          (permissions.includes("all_model") ||
                                            permissions.includes(
                                              "read_model",
                                            ) ||
                                            permissions.includes("Admin")) &&
                                          (permissions.includes("all_device") ||
                                            permissions.includes(
                                              "read_device",
                                            ) ||
                                            permissions.includes("Admin")) &&
                                          (permissions.includes(
                                            "all_task_type",
                                          ) ||
                                            permissions.includes(
                                              "read_task_type",
                                            ) ||
                                            permissions.includes("Admin")) &&
                                          (permissions.includes(
                                            "all_troubleshoot",
                                          ) ||
                                            permissions.includes(
                                              "read_troubleshoot",
                                            ) ||
                                            permissions.includes("Admin")) &&
                                          (permissions.includes(
                                            "all_procedure",
                                          ) ||
                                            permissions.includes(
                                              "read_procedure",
                                            ) ||
                                            permissions.includes("Admin")) &&
                                          (permissions.includes(
                                            "all_error_codes",
                                          ) ||
                                            permissions.includes(
                                              "read_error_codes",
                                            ) ||
                                            permissions.includes("Admin")) &&
                                          (permissions.includes("all_mcodes") ||
                                            permissions.includes(
                                              "read_mcodes",
                                            ) ||
                                            permissions.includes("Admin")) &&
                                          (permissions.includes(
                                            "all_alarm_codes",
                                          ) ||
                                            permissions.includes(
                                              "read_alarm_codes",
                                            ) ||
                                            permissions.includes("Admin")) &&
                                          (permissions.includes("all_group") ||
                                            permissions.includes(
                                              "read_group",
                                            ) ||
                                            permissions.includes("Admin")) &&
                                          (permissions.includes("all_user") ||
                                            permissions.includes("read_user") ||
                                            permissions.includes("Admin")) && (
                                            <Link
                                              to={`/workorder/${id}`}
                                              exact={true}
                                              className="ml-2 focus-visible:outline-none"
                                            >
                                              <img
                                                src="../assets/icons/icon-edit.svg"
                                                alt="icon-edit"
                                                className="w-4 h-4 dark:invert"
                                                title="Edit"
                                              />
                                            </Link>
                                          )}
                                      </div>
                                    </td>
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
                  {draftWorkordersLoading ? (
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
          {/* Drafts Table Section : End */}

          {EnvironmentConstant.mode === "offline" && <OnlyCloudAllowed />}
        </section>
      </Layout>
    </>
  );
};
export default Drafts;
