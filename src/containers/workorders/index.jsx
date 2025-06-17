import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeWorkordersSearch,
  getAllActiveWorkorders,
  getAllDeviceWorkorders,
} from "../../redux/reduxes/workorders/workorderAction";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import Filters from "../../components/common/filters";
import AppliedFilters from "../../components/common/appliedFilters";
import {
  uploadWorkOrder,
  setUploadWorkorderModal,
  resetUploadWoError,
} from "../../redux/reduxes/workorders/workorderAction";
import { useLocation } from "react-router";
import ListDataNotFound from "../../components/common/listDataNotFound";
import LinkMedia from "../../components/common/linkMediaSelectOne";
import PermissionsMessage from "../../components/common/permissionsMessage";
import { OnlyCloudAllowed } from "../../layout/cloud-message";
import { EnvironmentConstant } from "../../helpers";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ActiveWorkOrders = (props) => {
  const { model_id } = props.match.params;
  let query = useQuery();
  const device_specific = query.get("device_specific");
  const device_id = query.get("device");

  const dispatch = useDispatch();

  // Fetch Data
  const workordersLoading = useSelector(
    (state) => state.workorders.activeWorkordersLoading,
  );
  const workorders = useSelector(
    (state) => state.workorders.activeWorkordersList,
  );
  const pagination = useSelector(
    (state) => state.workorders.activeWorkordersPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByActiveWONumber = useSelector(
    (state) => state.sort.sortByActiveWONumber,
  );
  const sortByActiveWOTitle = useSelector(
    (state) => state.sort.sortByActiveWOTitle,
  );
  const sortByActiveWOModelId = useSelector(
    (state) => state.sort.sortByActiveWOModelId,
  );
  const sortByActiveWOSerialNumber = useSelector(
    (state) => state.sort.sortByActiveWOSerialNumber,
  );
  const sortByActiveWOTaskType = useSelector(
    (state) => state.sort.sortByActiveWOTaskType,
  );
  const filters = useSelector(
    (state) => state.workorders.activeWorkordersFilters,
  );
  const [delayLoading, setDelayLoading] = useState(false);
  const showWorkOrderUploadModal = useSelector(
    (state) => state.workorders.showWorkOrderUploadModal,
  );
  const uploadWoError = useSelector((state) => state.workorders.uploadWoError);
  const uploadWoLoading = useSelector(
    (state) => state.workorders.uploadWoLoading,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.workorders.searchWorkordersQuery,
  );

  // Dispatch Data
  useEffect(() => {
    const data = {
      model_id: model_id,
      device_id: device_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      paginate: true,
      filter: {},
      sort:
        sortByActiveWONumber != 0
          ? sortByActiveWONumber
          : sortByActiveWOTitle != 0
          ? sortByActiveWOTitle
          : sortByActiveWOModelId != 0
          ? sortByActiveWOModelId
          : sortByActiveWOSerialNumber != 0
          ? sortByActiveWOSerialNumber
          : sortByActiveWOTaskType != 0
          ? sortByActiveWOTaskType
          : 0,
      sorting:
        sortByActiveWONumber != 0
          ? "work_order_number"
          : sortByActiveWOTitle != 0
          ? "title"
          : sortByActiveWOModelId != 0
          ? "model_id"
          : sortByActiveWOSerialNumber != 0
          ? "sl_no"
          : sortByActiveWOTaskType != 0
          ? "task_type"
          : "",
    };
    if (device_id != "all") {
      delayLoading && dispatch(getAllDeviceWorkorders(data));
    } else {
      delayLoading && dispatch(getAllActiveWorkorders(data));
    }
  }, [sort]);

  // Dispatch to Workorders
  useEffect(() => {
    const data = {
      model_id: model_id,
      device_id: device_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      paginate: true,
      filter: {},
      sort:
        sortByActiveWONumber != 0
          ? sortByActiveWONumber
          : sortByActiveWOTitle != 0
          ? sortByActiveWOTitle
          : sortByActiveWOModelId != 0
          ? sortByActiveWOModelId
          : sortByActiveWOSerialNumber != 0
          ? sortByActiveWOSerialNumber
          : sortByActiveWOTaskType != 0
          ? sortByActiveWOTaskType
          : 0,
      sorting:
        sortByActiveWONumber != 0
          ? "work_order_number"
          : sortByActiveWOTitle != 0
          ? "title"
          : sortByActiveWOModelId != 0
          ? "model_id"
          : sortByActiveWOSerialNumber != 0
          ? "sl_no"
          : sortByActiveWOTaskType != 0
          ? "task_type"
          : "",
    };
    if (device_id != "all") {
      dispatch(getAllDeviceWorkorders(data));
    } else {
      dispatch(getAllActiveWorkorders(data));
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
      limit: 10,
      paginate: true,
      filter: {},
      sort:
        sortByActiveWONumber != 0
          ? sortByActiveWONumber
          : sortByActiveWOTitle != 0
          ? sortByActiveWOTitle
          : sortByActiveWOModelId != 0
          ? sortByActiveWOModelId
          : sortByActiveWOSerialNumber != 0
          ? sortByActiveWOSerialNumber
          : sortByActiveWOTaskType != 0
          ? sortByActiveWOTaskType
          : 0,
      sorting:
        sortByActiveWONumber != 0
          ? "work_order_number"
          : sortByActiveWOTitle != 0
          ? "title"
          : sortByActiveWOModelId != 0
          ? "model_id"
          : sortByActiveWOSerialNumber != 0
          ? "sl_no"
          : sortByActiveWOTaskType != 0
          ? "task_type"
          : "",
    };
    if (device_id != "all") {
      dispatch(getAllDeviceWorkorders(data));
    } else {
      dispatch(getAllActiveWorkorders(data));
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
      limit: 10,
      paginate: true,
      filter: filters?.selected_filters ? filters.selected_filters : {},
      sort:
        sortByActiveWONumber != 0
          ? sortByActiveWONumber
          : sortByActiveWOTitle != 0
          ? sortByActiveWOTitle
          : sortByActiveWOModelId != 0
          ? sortByActiveWOModelId
          : sortByActiveWOSerialNumber != 0
          ? sortByActiveWOSerialNumber
          : sortByActiveWOTaskType != 0
          ? sortByActiveWOTaskType
          : 0,
      sorting:
        sortByActiveWONumber != 0
          ? "work_order_number"
          : sortByActiveWOTitle != 0
          ? "title"
          : sortByActiveWOModelId != 0
          ? "model_id"
          : sortByActiveWOSerialNumber != 0
          ? "sl_no"
          : sortByActiveWOTaskType != 0
          ? "task_type"
          : "",
    };
    if (device_id != "all") {
      dispatch(getAllDeviceWorkorders(data));
    } else {
      dispatch(getAllActiveWorkorders(data));
    }
  };

  // Delete Workorder
  // const [deleteWorkorderModal, setDeleteWorkorderModal] = useState(false);
  // const [deleteWorkorderId, setDeleteWorkorderId] = useState(null);
  // const [deleteWorkorderTitle, setDeleteWorkorderTitle] = useState("");

  // const confirmDeleteWorkorder = (stat, id, title) => {
  //   setDeleteWorkorderModal(stat);
  //   setDeleteWorkorderId(id);
  //   setDeleteWorkorderTitle(title);
  // }

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

  // Upload Exisiting WO States
  const [state, setState] = useState({
    selectedFileId: null,
    existingFilesIdsUnchanged: [],
    existingFiles: [],
    errors: {
      selectedFileId: "",
    },
  });

  // Set Upload WO Errors
  useEffect(() => {
    let errors = state.errors;
    errors.selectedFileId = uploadWoError;
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [uploadWoError]);

  useEffect(() => {
    resetUploadWoError();
  }, []);

  function setShowUploadWorkorderModal() {
    dispatch(setUploadWorkorderModal(true));
  }

  // Replacing the Media
  const changingTheMediaId = (up) => {
    let errors = state.errors;
    errors.selectedFileId = "";
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
      selectedFileId: up,
    }));
    dispatch(resetUploadWoError());
  };

  // Validate
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    if (state.selectedFileId == null || state.selectedFileId == "")
      valid = false;
    return valid;
  };

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      const data = {
        media_id: state.selectedFileId,
      };
      dispatch(uploadWorkOrder(data));
    } else {
      let errors = state.errors;
      if (state.selectedFileId == null || state.selectedFileId == "")
        errors.selectedFileId = "Select the file.";

      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Active Workorders</title>
      </Helmet>

      <Layout>
        <section className="relative">
          {/* Breadcrumbs : Start */}
          <div className="grid xl:grid-cols-2 gap-4 mb-8">
            <div className="col-start-1 mb-3 xl:mb-0">
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
                  Active Work Orders
                </span>
              </div>
              <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2 font-bold">
                Active Work Orders
              </h1>
            </div>
            <div className="xl:col-start-2 m-auto mr-0">
              {(permissions.includes("all_work_order") ||
                permissions.includes("write_work_order") ||
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
                (permissions.includes("all_role") ||
                  permissions.includes("read_role") ||
                  permissions.includes("Admin")) &&
                (permissions.includes("all_group") ||
                  permissions.includes("read_group") ||
                  permissions.includes("Admin")) &&
                (permissions.includes("all_user") ||
                  permissions.includes("read_user") ||
                  permissions.includes("Admin")) && (
                  <>
                    <Link
                      to="/workorder/new"
                      exact={true}
                      className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-6 py-2.5 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all"
                    >
                      Create New Work Order +
                    </Link>

                    <button
                      type="button"
                      onClick={() => setShowUploadWorkorderModal(true)}
                      className="bg-transparent text-black2 dark:text-gray2 text-sm font-bold border border-black2 dark:border-gray2 rounded-full px-6 py-2 ml-4 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all"
                    >
                      Upload existing Work Order/s +
                    </button>
                  </>
                )}
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Active Work Orders : Start */}
          <div className="w-full  bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl">
            {!(
              permissions.includes("all_work_order") ||
              permissions.includes("read_work_order") ||
              permissions.includes("Admin")
            ) ? (
              <PermissionsMessage
                additionalClassName="h-[75vh] p-20"
                title="Active Work Orders"
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
                      name="workorders_search"
                      id="workorders_search"
                      placeholder="Search for Workorders..."
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
                    getListAction={getAllActiveWorkorders}
                    page={0}
                    limit={10}
                    search={searchQuery}
                    sort={
                      sortByActiveWONumber != 0
                        ? sortByActiveWONumber
                        : sortByActiveWOTitle != 0
                        ? sortByActiveWOTitle
                        : sortByActiveWOModelId != 0
                        ? sortByActiveWOModelId
                        : sortByActiveWOSerialNumber != 0
                        ? sortByActiveWOSerialNumber
                        : sortByActiveWOTaskType != 0
                        ? sortByActiveWOTaskType
                        : 0
                    }
                    sorting={
                      sortByActiveWONumber != 0
                        ? "work_order_number"
                        : sortByActiveWOTitle != 0
                        ? "title"
                        : sortByActiveWOModelId != 0
                        ? "model_id"
                        : sortByActiveWOSerialNumber != 0
                        ? "sl_no"
                        : sortByActiveWOTaskType != 0
                        ? "task_type"
                        : ""
                    }
                  />
                </div>

                {/* Applied Filters */}
                <div className="my-5 px-8">
                  <AppliedFilters
                    filters={filters}
                    getActionList={getAllActiveWorkorders}
                    page={0}
                    limit={10}
                    search={searchQuery}
                    sort={
                      sortByActiveWONumber != 0
                        ? sortByActiveWONumber
                        : sortByActiveWOTitle != 0
                        ? sortByActiveWOTitle
                        : sortByActiveWOModelId != 0
                        ? sortByActiveWOModelId
                        : sortByActiveWOSerialNumber != 0
                        ? sortByActiveWOSerialNumber
                        : sortByActiveWOTaskType != 0
                        ? sortByActiveWOTaskType
                        : 0
                    }
                    sorting={
                      sortByActiveWONumber != 0
                        ? "work_order_number"
                        : sortByActiveWOTitle != 0
                        ? "title"
                        : sortByActiveWOModelId != 0
                        ? "model_id"
                        : sortByActiveWOSerialNumber != 0
                        ? "sl_no"
                        : sortByActiveWOTaskType != 0
                        ? "task_type"
                        : ""
                    }
                  />
                </div>

                {/* Workorders Data */}
                <div className="w-full min-h-[500px] h-full 2xl:h-[58vh]  dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <table className="table-auto text-left relative min-w-full max-h-full">
                    <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                      <tr>
                        <th
                          onClick={() =>
                            handleChangeSort(
                              sortByActiveWONumber,
                              "sortByActiveWONumber",
                            )
                          }
                          scope="col"
                          width="5%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByActiveWONumber == 1 ||
                                sortByActiveWONumber == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              WO NUMBER
                            </span>
                            {sortByActiveWONumber == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByActiveWONumber == 2 ? (
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
                              sortByActiveWOTitle,
                              "sortByActiveWOTitle",
                            )
                          }
                          scope="col"
                          width="20%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByActiveWOTitle == 1 ||
                                sortByActiveWOTitle == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              WO Title
                            </span>
                            {sortByActiveWOTitle == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByActiveWOTitle == 2 ? (
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
                              sortByActiveWOModelId,
                              "sortByActiveWOModelId",
                            )
                          }
                          scope="col"
                          width="10%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByActiveWOModelId == 1 ||
                                sortByActiveWOModelId == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Model ID
                            </span>
                            {sortByActiveWOModelId == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByActiveWOModelId == 2 ? (
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
                              sortByActiveWOSerialNumber,
                              "sortByActiveWOSerialNumber",
                            )
                          }
                          scope="col"
                          width="20%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByActiveWOSerialNumber == 1 ||
                                sortByActiveWOSerialNumber == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Serial Number
                            </span>
                            {sortByActiveWOSerialNumber == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByActiveWOSerialNumber == 2 ? (
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
                              sortByActiveWOTaskType,
                              "sortByActiveWOTaskType",
                            )
                          }
                          scope="col"
                          width="10%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByActiveWOTaskType == 1 ||
                                sortByActiveWOTaskType == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Task Type
                            </span>
                            {sortByActiveWOTaskType == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByActiveWOTaskType == 2 ? (
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
                          width="15%"
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
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {" "}
                          WO Status{" "}
                        </th>
                        <th
                          scope="col"
                          width="10%"
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
                      {workordersLoading ? (
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
                                    work_order_number,
                                    title,
                                    repeat,
                                    device,
                                    task_type,
                                    work_order_status,
                                    assigned_to,
                                    assigned_to_type,
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
                                        {work_order_number}{" "}
                                      </td>
                                      <td
                                        width="20%"
                                        className="px-4 xl:px-8 py-4 text-sm"
                                      >
                                        <Link
                                          to={`/workorder-details/${id}?status=active&transmitted=list`}
                                          exact={true}
                                          className="inline-block text-sm font-medium text-primary first-letter:uppercase underline w-[150px] text-ellipsis overflow-hidden whitespace-nowrap"
                                          title={title}
                                        >
                                          {title}
                                        </Link>
                                        <div className="text-sm text-black3 dark:text-gray2 text-opacity-50 capitalize">
                                          {repeat ? "Recurrence" : "One Time"}
                                        </div>
                                      </td>
                                      <td
                                        width="10%"
                                        className="px-4 xl:px-8 py-4 text-sm break-all"
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
                                        width="15%"
                                        className="px-4 xl:px-8 py-4 text-sm  capitalize break-word"
                                      >
                                        {assigned_to_type == "Group"
                                          ? assigned_to &&
                                            assigned_to.group &&
                                            assigned_to.group.title
                                          : assigned_to &&
                                            assigned_to.role &&
                                            assigned_to.role.title}{" "}
                                        <small className="font-medium">
                                          [{assigned_to_type}]
                                        </small>
                                      </td>
                                      <td
                                        width="10%"
                                        className="px-4 xl:px-8 py-4 text-sm capitalize"
                                      >
                                        {work_order_status?.replace("_", " ")}{" "}
                                      </td>
                                      <td
                                        width="10%"
                                        className="px-8 py-4 text-sm"
                                      >
                                        <div className="flex items-center">
                                          {/* <button type="button" onClick={() => confirmDeleteWorkorder(true, id && id, title)} className=" focus-visible:outline-none">
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
                                            (permissions.includes(
                                              "all_model",
                                            ) ||
                                              permissions.includes(
                                                "read_model",
                                              ) ||
                                              permissions.includes("Admin")) &&
                                            (permissions.includes(
                                              "all_device",
                                            ) ||
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
                                            (permissions.includes(
                                              "all_mcodes",
                                            ) ||
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
                                            (permissions.includes(
                                              "all_group",
                                            ) ||
                                              permissions.includes(
                                                "read_group",
                                              ) ||
                                              permissions.includes("Admin")) &&
                                            (permissions.includes("all_user") ||
                                              permissions.includes(
                                                "read_user",
                                              ) ||
                                              permissions.includes(
                                                "Admin",
                                              )) && (
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
                  {workordersLoading ? (
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
          {/* Active Work Orders : End */}
          {EnvironmentConstant.mode === "offline" && <OnlyCloudAllowed />}
        </section>

        {/* Delete Confirmation Modal */}
        {/* {deleteWorkorder &&
          <DeleteModal
            head="Remove Active Work Order"
            body={["Are you sure you want to remove", <strong className="capitalize break-all"> "{deleteWorkorderTitle}" </strong>, "Active Work Order from the list?"]}
            deleteAction={deleteWorkorder}
            modalAction={setDeleteWorkorderModal}
            modalValue={deleteWorkorderModal}
            id={deleteWorkorderId}
          />
        } */}

        {/* Upload Workorder Modal */}
        <Transition appear show={showWorkOrderUploadModal} as={Fragment}>
          <Dialog
            as="div"
            open={showWorkOrderUploadModal}
            onClose={() => setShowUploadWorkorderModal(false)}
            className="fixed inset-0 z-50 py-5 2xl:py-20 flex items-start justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-[96%] xl:w-[70%] 2xl:w-[50%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl px-8 py-8 shadow-lg">
                <Dialog.Title className="dark:text-gray2 text-2xl font-bold text-center mb-10">
                  Upload Work Order
                </Dialog.Title>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-20">
                    <LinkMedia
                      changingTheMediaId={changingTheMediaId}
                      selectedFileId={state.selectedFileId}
                      select="single"
                      limit={48}
                      showOnly="pdf"
                    />
                    <div className="text-danger mt-1 ml-1">
                      {state.errors.selectedFileId}
                    </div>
                  </div>
                  <div className="flex items-center justify-end fixed bottom-0 right-0 w-full bg-gray4 dark:bg-darkBg py-8 px-12 mt-14 rounded-b-3xl">
                    <button
                      type="button"
                      onClick={() => dispatch(setUploadWorkorderModal(false))}
                      className="bg-gray dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none"
                    >
                      {uploadWoLoading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </Layout>
    </>
  );
};
export default ActiveWorkOrders;
