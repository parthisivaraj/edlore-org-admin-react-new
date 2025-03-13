import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTaskTypesSearch,
  deleteTaskType,
  getAllTaskTypes,
  setAddTypeModal,
} from "../../redux/reduxes/taskTypes/taskTypesAction";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import AddTaskType from "../../components/taskTypes/addTaskType";
import DeleteModal from "../../components/common/deleteModal";
import Filters from "../../components/common/filters";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import AppliedFilters from "../../components/common/appliedFilters";
import ListDataNotFound from "../../components/common/listDataNotFound";
import PermissionsMessage from "../../components/common/permissionsMessage";
import { EnvironmentConstant } from "../../helpers";
import { OnlyCloudAllowed } from "../../layout/cloud-message";

const TaskTypes = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const taskTypesLoading = useSelector(
    (state) => state.tasktypes.allTaskTypesLoading,
  );
  const tasktypes = useSelector((state) => state.tasktypes.taskTypesList);
  const taskTypesPagination = useSelector(
    (state) => state.tasktypes.allTaskTypesPagination,
  );
  const filters = useSelector((state) => state.tasktypes.filters);
  const sort = useSelector((state) => state.sort);
  const sortByTaskTypeTitle = useSelector(
    (state) => state.sort.sortByTaskTypeTitle,
  );
  const sortByTaskTypeStatus = useSelector(
    (state) => state.sort.sortByTaskTypeStatus,
  );
  const sortByTaskTypeCreatedDate = useSelector(
    (state) => state.sort.sortByTaskTypeCreatedDate,
  );
  const editTaskType = useSelector((state) => state.tasktypes.editTaskType);
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.tasktypes.searchTaskTypesQuery,
  );
  const deleteTaskTypeLoading = useSelector(
    (state) => state.tasktypes.deleteTaskTypeLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Task Type Title Sort
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      paginate: true,
      filter: {},
      sort:
        sortByTaskTypeTitle != 0
          ? sortByTaskTypeTitle
          : sortByTaskTypeStatus != 0
          ? sortByTaskTypeStatus
          : sortByTaskTypeCreatedDate != 0
          ? sortByTaskTypeCreatedDate
          : 0,
      sorting:
        sortByTaskTypeTitle != 0
          ? "title"
          : sortByTaskTypeStatus != 0
          ? "status"
          : sortByTaskTypeCreatedDate != 0
          ? "created_at"
          : "",
    };
    delayLoading && dispatch(getAllTaskTypes(data));
  }, [sort]);

  // Dispatch to Task Types
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      paginate: true,
      filter: {},
      sort:
        sortByTaskTypeTitle != 0
          ? sortByTaskTypeTitle
          : sortByTaskTypeStatus != 0
          ? sortByTaskTypeStatus
          : sortByTaskTypeCreatedDate != 0
          ? sortByTaskTypeCreatedDate
          : 0,
      sorting:
        sortByTaskTypeTitle != 0
          ? "title"
          : sortByTaskTypeStatus != 0
          ? "status"
          : sortByTaskTypeCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllTaskTypes(data));
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      paginate: true,
      filter: {},
      sort:
        sortByTaskTypeTitle != 0
          ? sortByTaskTypeTitle
          : sortByTaskTypeStatus != 0
          ? sortByTaskTypeStatus
          : sortByTaskTypeCreatedDate != 0
          ? sortByTaskTypeCreatedDate
          : 0,
      sorting:
        sortByTaskTypeTitle != 0
          ? "title"
          : sortByTaskTypeStatus != 0
          ? "status"
          : sortByTaskTypeCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllTaskTypes(data));
  }, [searchQuery]);

  // Search Bar
  const handleSearchChange = (searchData) => {
    dispatch(changeTaskTypesSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      page: e.selected,
      limit: 10,
      search: searchQuery,
      paginate: true,
      filter: filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByTaskTypeTitle != 0
          ? sortByTaskTypeTitle
          : sortByTaskTypeStatus != 0
          ? sortByTaskTypeStatus
          : sortByTaskTypeCreatedDate != 0
          ? sortByTaskTypeCreatedDate
          : 0,
      sorting:
        sortByTaskTypeTitle != 0
          ? "title"
          : sortByTaskTypeStatus != 0
          ? "status"
          : sortByTaskTypeCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllTaskTypes(data));
  };

  // Task Type Sort
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

  // Add and Update Task Type Modal
  const [showTaskTypeModal, setShowTaskTypeModal] = useState(false);
  const [taskTypeId, setTaskTypeId] = useState(null);
  const [update, setUpdate] = useState(false);

  const addTaskType = () => {
    // setShowTaskTypeModal(true);
    dispatch(setAddTypeModal(true));
    setTaskTypeId(null);
    setUpdate(false);
  };

  const confirmUpdateTaskType = (id) => {
    // setShowTaskTypeModal(true);
    dispatch(setAddTypeModal(true));
    setTaskTypeId(id);
    setUpdate(true);
  };

  // Delete Task Type Modal
  const [deleteTaskTypeModal, setDeleteTaskTypeModal] = useState(false);
  const [deleteTaskTypeId, setDeleteTaskTypeId] = useState(null);
  const [deleteTaskTypeTitle, setDeleteTaskTypeTitle] = useState("");

  const confirmDeleteTaskType = (stat, id, title) => {
    setDeleteTaskTypeModal(stat);
    setDeleteTaskTypeId(id);
    setDeleteTaskTypeTitle(title);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Work Order Work Types</title>
      </Helmet>

      <Layout>
        <section className="relative">
          {/* Breadcrumbs : Start */}
          <div className="grid grid-cols-2 gap-5 mb-8">
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
                  Work Order Task Types
                </span>
              </div>
              <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2  font-bold">
                Work Order Task Types
              </h1>
            </div>
            <div className="col-start-2 ml-auto my-auto">
              {(permissions.includes("all_task_type") ||
                permissions.includes("write_task_type") ||
                permissions.includes("Admin")) && (
                <button
                  type="button"
                  onClick={() => addTaskType()}
                  className="text-sm 2xl:text-base bg-primary text-white font-medium border border-primary px-6 py-2 rounded-full shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none"
                >
                  Add New Task Type +
                </button>
              )}
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Task Types Table Section : Start */}
          <div className="w-full bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl py-8 drop-shadow-md">
            {!(
              permissions.includes("all_task_type") ||
              permissions.includes("read_task_type") ||
              permissions.includes("Admin")
            ) ? (
              <PermissionsMessage
                additionalClassName="h-[72vh] p-20"
                title="Work Order Task Types"
                message="read task type"
              />
            ) : (
              <>
                {/* Search Bar and Filters */}
                <div className="flex items-center justify-between mb-10 px-4 xl:px-8">
                  <div className="w-[60%] xl:w-[400px] relative overflow-hidden">
                    <input
                      type="search"
                      className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 text-sm px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                      name="task_type_search"
                      id="task_type_search"
                      placeholder="Search for Task Types..."
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
                    getListAction={getAllTaskTypes}
                    limit={10}
                    sort={
                      sortByTaskTypeTitle != 0
                        ? sortByTaskTypeTitle
                        : sortByTaskTypeStatus != 0
                        ? sortByTaskTypeStatus
                        : sortByTaskTypeCreatedDate != 0
                        ? sortByTaskTypeCreatedDate
                        : 0
                    }
                    sorting={
                      sortByTaskTypeTitle != 0
                        ? "title"
                        : sortByTaskTypeStatus != 0
                        ? "status"
                        : sortByTaskTypeCreatedDate != 0
                        ? "created_at"
                        : ""
                    }
                  />
                </div>

                {/* Applified Filters */}
                <div className="px-4 xl:px-8">
                  <AppliedFilters
                    page={0}
                    limit={10}
                    search={searchQuery}
                    sort={
                      sortByTaskTypeTitle != 0
                        ? sortByTaskTypeTitle
                        : sortByTaskTypeStatus != 0
                        ? sortByTaskTypeStatus
                        : sortByTaskTypeCreatedDate != 0
                        ? sortByTaskTypeCreatedDate
                        : 0
                    }
                    sorting={
                      sortByTaskTypeTitle != 0
                        ? "title"
                        : sortByTaskTypeStatus != 0
                        ? "status"
                        : sortByTaskTypeCreatedDate != 0
                        ? "created_at"
                        : ""
                    }
                    filters={filters}
                    getActionList={getAllTaskTypes}
                  />
                </div>

                {/* Task Types Table List */}
                <div className="w-full min-h-[500px] h-full 2xl:h-[550px] dark:text-gray2  overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <table className="table-auto text-left relative min-w-full max-h-full">
                    <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                      <tr>
                        <th
                          onClick={() =>
                            handleChangeSort(
                              sortByTaskTypeTitle,
                              "sortByTaskTypeTitle",
                            )
                          }
                          scope="col"
                          width="35%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByTaskTypeTitle == 1 ||
                                sortByTaskTypeTitle == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Task Type Title
                            </span>
                            {sortByTaskTypeTitle == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByTaskTypeTitle == 2 ? (
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
                          width="20%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {" "}
                          Active Work Orders{" "}
                        </th>
                        <th
                          onClick={() =>
                            handleChangeSort(
                              sortByTaskTypeStatus,
                              "sortByTaskTypeStatus",
                            )
                          }
                          scope="col"
                          width="15%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByTaskTypeStatus == 1 ||
                                sortByTaskTypeStatus == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Status
                            </span>
                            {sortByTaskTypeStatus == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByTaskTypeStatus == 2 ? (
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
                              sortByTaskTypeCreatedDate,
                              "sortByTaskTypeCreatedDate",
                            )
                          }
                          scope="col"
                          width="20%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByTaskTypeCreatedDate == 1 ||
                                sortByTaskTypeCreatedDate == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Created On
                            </span>
                            {sortByTaskTypeCreatedDate == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByTaskTypeCreatedDate == 2 ? (
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
                          className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {(permissions.includes("all_task_type") ||
                            permissions.includes("delete_task_type") ||
                            permissions.includes("update_task_type") ||
                            permissions.includes("Admin")) && (
                            <span>Actions</span>
                          )}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {taskTypesLoading ? (
                        <tr>
                          <td colSpan="5">
                            <Skeleton
                              count={10}
                              height={50}
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
                          {tasktypes && tasktypes.length > 0 ? (
                            <>
                              {tasktypes.map((type, index) => {
                                const {
                                  id,
                                  title,
                                  active_work_orders,
                                  status,
                                  created_at,
                                } = type;
                                return (
                                  <tr
                                    valign="top"
                                    className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                    key={id}
                                  >
                                    <td
                                      width="35%"
                                      className="px-4 xl:px-8 py-4 break-all capitalize"
                                    >
                                      {" "}
                                      {title}
                                    </td>
                                    <td
                                      width="20%"
                                      className="px-4 xl:px-8 py-4 break-all capitalize"
                                    >
                                      {" "}
                                      {active_work_orders}
                                    </td>
                                    <td
                                      width="15%"
                                      className="px-4 xl:px-8 py-4 break-all capitalize whitespace-nowrap"
                                    >
                                      {status}{" "}
                                    </td>
                                    <td
                                      width="20%"
                                      className="px-4 xl:px-8 py-4 capitalize whitespace-nowrap"
                                    >
                                      {created_at}{" "}
                                    </td>
                                    <td
                                      width="10%"
                                      className="px-8 py-4 whitespace-nowrap"
                                    >
                                      {(permissions.includes("all_task_type") ||
                                        permissions.includes(
                                          "delete_task_type",
                                        ) ||
                                        permissions.includes("Admin")) && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            confirmDeleteTaskType(
                                              true,
                                              id,
                                              title,
                                            )
                                          }
                                          className=" focus-visible:outline-none"
                                          title="Delete"
                                        >
                                          <img
                                            src="../assets/icons/icon-delete.svg"
                                            alt="icon-delete"
                                            className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert transition-all dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                          />
                                        </button>
                                      )}

                                      {(permissions.includes("all_task_type") ||
                                        permissions.includes(
                                          "update_task_type",
                                        ) ||
                                        permissions.includes("Admin")) && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            confirmUpdateTaskType(id)
                                          }
                                          className=" focus-visible:outline-none"
                                          title="Edit"
                                        >
                                          <img
                                            src="../assets/icons/icon-edit.svg"
                                            alt="icon-edit"
                                            className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-4 dark:invert transition-all dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                          />
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          ) : (
                            <ListDataNotFound
                              colSpan={8}
                              searchQuery={searchQuery}
                              listLength={tasktypes && tasktypes.length}
                              filters={filters}
                            />
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end mt-8 px-4">
                  {taskTypesLoading ? (
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
                      itemsPerPage={
                        taskTypesPagination && taskTypesPagination.per_page
                      }
                      handlePageClick={handlePageClick}
                      pageCount={
                        taskTypesPagination &&
                        Math.ceil(
                          taskTypesPagination.total_entries /
                            taskTypesPagination.per_page,
                        )
                      }
                      current_page={
                        taskTypesPagination && taskTypesPagination.current_page
                      }
                      totalEntries={
                        taskTypesPagination && taskTypesPagination.total_entries
                      }
                    />
                  )}
                </div>
              </>
            )}
          </div>
          {/* Task Types Table Section : End */}
          {EnvironmentConstant.mode === "offline" && <OnlyCloudAllowed />}
        </section>
      </Layout>

      {editTaskType && (
        <AddTaskType
          showTaskTypeModal={editTaskType}
          // setShowTaskTypeModal={setShowTaskTypeModal}
          update={update}
          taskTypeId={taskTypeId}
          setTaskTypeId={setTaskTypeId}
        />
      )}

      {deleteTaskTypeModal && (
        <DeleteModal
          head="Remove Task Type"
          body={[
            "Are you sure you want to remove",
            <strong className="capitalize break-all">
              {" "}
              "{deleteTaskTypeTitle}"{" "}
            </strong>,
            "Task Type from the list?",
          ]}
          deleteAction={deleteTaskType}
          modalAction={setDeleteTaskTypeModal}
          modalValue={deleteTaskTypeModal}
          parentmodel={false}
          id={deleteTaskTypeId}
          deleteLoading={deleteTaskTypeLoading}
        />
      )}
    </>
  );
};
export default TaskTypes;
