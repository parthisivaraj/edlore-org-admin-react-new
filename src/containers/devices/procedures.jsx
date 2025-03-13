import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Transition, Dialog } from "@headlessui/react";
import PaginatedItems from "../../components/common/pagination";
import Layout from "../../layout";
import ProcedureDetails from "../../components/procedures/procedureDetails";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProcedure,
  deleteProcedure,
  changeProceduresSearch,
} from "../../redux/reduxes/procedure/procedureAction";
import DeleteModal from "../../components/common/deleteModal";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import Filters from "../../components/common/filters";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import AppliedFilters from "../../components/common/appliedFilters";
import ListDataNotFound from "../../components/common/listDataNotFound";
import PermissionsMessage from "../../components/common/permissionsMessage";

const Procedures = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const allProceduresLoading = useSelector(
    (state) => state.procedure.allProceduresLoading,
  );
  const allProcedures = useSelector((state) => state.procedure.allProcedures);
  const filters = useSelector((state) => state.procedure.filters);
  const allProceduresPagination = useSelector(
    (state) => state.procedure.allProceduresPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByProcedureName = useSelector(
    (state) => state.sort.sortByProcedureName,
  );
  const sortByProcedureCreatedDate = useSelector(
    (state) => state.sort.sortByProcedureCreatedDate,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.procedure.searchProceduresQuery,
  );
  const deleteProcedureLoading = useSelector(
    (state) => state.procedure.deleteProcedureLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Data
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByProcedureName != 0
          ? sortByProcedureName
          : sortByProcedureCreatedDate != 0
          ? sortByProcedureCreatedDate
          : 0,
      sorting:
        sortByProcedureName != 0
          ? "name"
          : sortByProcedureCreatedDate != 0
          ? "created_at"
          : "",
    };
    delayLoading && dispatch(getAllProcedure(data));
  }, [sort]);

  // Dispatch All to Procedures
  useEffect(() => {
    const data = {
      search: "",
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByProcedureName != 0
          ? sortByProcedureName
          : sortByProcedureCreatedDate != 0
          ? sortByProcedureCreatedDate
          : 0,
      sorting:
        sortByProcedureName != 0
          ? "name"
          : sortByProcedureCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllProcedure(data));
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // States and Models
  const [deletingId, setDeletingId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingModelId, setEditingModelId] = useState(null);
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [deleteProcedureTitle, setDeleteProcedureTitle] = useState("");

  // Edit/Update the Procedure
  const editProcedure = (procedureId, modelId) => {
    if (
      permissions.includes("all_procedure") ||
      permissions.includes("read_procedure") ||
      permissions.includes("Admin")
    ) {
      setEditingId(procedureId);
      setShowProcedureModal(true);
      setEditingModelId(modelId);
    }
  };

  // Delete Procedure
  const deleteThisProcedure = (id, title) => {
    setDeletingId(id);
    setDeleteProcedureTitle(title);
    setShowDelete(true);
  };

  // Change Search
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByProcedureName != 0
          ? sortByProcedureName
          : sortByProcedureCreatedDate != 0
          ? sortByProcedureCreatedDate
          : 0,
      sorting:
        sortByProcedureName != 0
          ? "name"
          : sortByProcedureCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllProcedure(data));
  }, [searchQuery]);

  // Search Procedures
  const handleSearchChange = (searchData) => {
    dispatch(changeProceduresSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      limit: 10,
      filter: filters.selected_filters,
      sort:
        sortByProcedureName != 0
          ? sortByProcedureName
          : sortByProcedureCreatedDate != 0
          ? sortByProcedureCreatedDate
          : 0,
      sorting:
        sortByProcedureName != 0
          ? "name"
          : sortByProcedureCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllProcedure(data));
  };

  // Sorting
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
        <title>Procedures</title>
      </Helmet>

      <Layout>
        {/* Breadcrumbs : Start */}
        <div>
          <div className="grid xl:grid-cols-2 xl:gap-4 mb-8">
            <div className="col-start-1">
              <div className="flex items-center">
                <img
                  src="/assets/icons/icon-devices.svg"
                  alt="icon-devices"
                  className="invert dark:invert-0 w-4 h-4 opacity-70"
                />
                <div className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                  Devices /
                </div>
                <span className="ml-1 text-xs text-secondary font-semibold">
                  Procedures
                </span>
              </div>
              <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                Procedures
              </h1>
            </div>
            {/* <div className="col-start-2 m-auto mr-0">
              <button onClick={() => setShowProcedureModal(true)} className="flex items-center bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2 shadow-md transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none">
                Create new procedure  +
              </button>
            </div> */}
          </div>
        </div>
        {/* Breadcrumbs : End */}

        {/* Procedures Table List : Start */}
        <div className="w-full bg-white dark:bg-darkBg pb-8 border border-gray2 dark:border-black1 rounded-3xl drop-shadow-md">
          {!(
            permissions.includes("all_procedure") ||
            permissions.includes("read_procedure") ||
            permissions.includes("Admin")
          ) ? (
            <PermissionsMessage
              additionalClassName="h-[75vh] p-20"
              title="All Procedures"
              message="read procedure"
            />
          ) : (
            <>
              {/* Search and Filters : Start */}
              <div className="flex md:flex-col xl:flex-row items-center mb-8 pt-8 px-4 xl:px-8">
                <div className="flex md:flex-col-reverse xl:flex-row xl:items-center w-full xl:w-auto">
                  <div className="w-[300px] xl:w-[400px] relative md:mb-4 xl:mb-0 overflow-hidden">
                    <input
                      type="search"
                      className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                      name="user_search"
                      id="user_search"
                      placeholder="Search for Procedures..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <div className="absolute top-3.5 right-4 block m-auto focus-visible:outline-none">
                      <img
                        src="/assets/icons/icon-search.svg"
                        alt="icon-search"
                        className="w-4 h-4 block m-auto dark:invert"
                      />
                    </div>
                  </div>
                </div>

                {/* Filters : Start */}
                <Filters
                  additionalClassName="-mt-6"
                  filters={filters}
                  getListAction={getAllProcedure}
                  limit={10}
                  search={searchQuery}
                />
              </div>

              {/* Applified Filters */}
              <div className="px-8">
                <AppliedFilters
                  page={0}
                  limit={10}
                  search={searchQuery}
                  sort_column=""
                  filters={filters}
                  getActionList={getAllProcedure}
                />
              </div>

              {/* Procedures Table List */}
              <div className="w-full min-h-[500px] h-full 2xl:h-[58vh] mb-8 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <table className="table-auto text-left relative min-w-full max-h-full">
                  <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                    <tr>
                      <th
                        onClick={() =>
                          handleChangeSort(
                            sortByProcedureName,
                            "sortByProcedureName",
                          )
                        }
                        scope="col"
                        width="40%"
                        className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                      >
                        <div className="flex items-center ">
                          <span
                            className={
                              sortByProcedureName == 1 ||
                              sortByProcedureName == 2
                                ? "text-primary"
                                : ""
                            }
                          >
                            Title
                          </span>
                          {sortByProcedureName == 1 ? (
                            <img
                              src="/assets/icons/icon-sort-asc.svg"
                              alt="icon-sort-asc"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          ) : sortByProcedureName == 2 ? (
                            <img
                              src="/assets/icons/icon-sort-desc.svg"
                              alt="icon-sort-desc"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          ) : (
                            <img
                              src="/assets/icons/icon-sort.svg"
                              alt="icon-sort"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          )}
                        </div>
                      </th>
                      <th
                        scope="col"
                        width="30%"
                        className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                      >
                        Procedure
                      </th>
                      <th
                        onClick={() =>
                          handleChangeSort(
                            sortByProcedureCreatedDate,
                            "sortByProcedureCreatedDate",
                          )
                        }
                        scope="col"
                        width="15%"
                        className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                      >
                        <div className="flex items-center ">
                          <span
                            className={
                              sortByProcedureCreatedDate == 1 ||
                              sortByProcedureCreatedDate == 2
                                ? "text-primary"
                                : ""
                            }
                          >
                            Created On
                          </span>
                          {sortByProcedureCreatedDate == 1 ? (
                            <img
                              src="/assets/icons/icon-sort-asc.svg"
                              alt="icon-sort-asc"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          ) : sortByProcedureCreatedDate == 2 ? (
                            <img
                              src="/assets/icons/icon-sort-desc.svg"
                              alt="icon-sort-desc"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          ) : (
                            <img
                              src="/assets/icons/icon-sort.svg"
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
                        {(permissions.includes("all_procedure") ||
                          permissions.includes("read_procedure") ||
                          permissions.includes("delete_procedure") ||
                          permissions.includes("Admin")) && (
                          <span>Actions</span>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProceduresLoading ? (
                      <tr>
                        <td colSpan="4">
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
                        {allProcedures && allProcedures.length > 0 ? (
                          <>
                            {allProcedures.map((procedure, index) => {
                              const {
                                title,
                                steps_count,
                                media_count,
                                id,
                                model_id,
                                created_at,
                              } = procedure;
                              return (
                                <tr
                                  onClick={() => editProcedure(id, model_id)}
                                  valign="top"
                                  key={id}
                                  className="dark:text-gray2 border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300 cursor-pointer"
                                >
                                  <td
                                    width="40%"
                                    className="px-4 xl:px-8 py-4 xl:text-sm 2xl:text-base capitalize font-medium max-w-[250px] 2xl:max-w-[400px] text-ellipsis whitespace-nowrap overflow-hidden"
                                    title={title}
                                  >
                                    {" "}
                                    {title}{" "}
                                  </td>
                                  <td
                                    width="30%"
                                    className="px-4 xl:px-8 py-4 xl:text-sm 2xl:text-base opacity-75 dark:opacity-90 whitespace-nowrap"
                                  >
                                    <span className="xl:text-sm 2xl:text-base font-medium mr-10">
                                      {steps_count} Step(s){" "}
                                    </span>{" "}
                                    <br className="block xl:hidden" />
                                    <span className="xl:text-sm 2xl:text-base text-sm  font-medium">
                                      {media_count} Media and documents{" "}
                                    </span>
                                  </td>
                                  <td
                                    width="15%"
                                    className="px-4 xl:px-8 py-4 xl:text-sm 2xl:text-base opacity-75 dark:opacity-90 whitespace-nowrap"
                                  >
                                    <span>{created_at}</span>
                                  </td>
                                  <td
                                    width="15%"
                                    className="px-4 xl:px-8 py-4 whitespace-nowrap"
                                  >
                                    {(permissions.includes("all_procedure") ||
                                      permissions.includes(
                                        "delete_procedure",
                                      ) ||
                                      permissions.includes("Admin")) && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          deleteThisProcedure(id, title);
                                        }}
                                        className="focus-visible:outline-none"
                                        title="Delete"
                                      >
                                        <img
                                          src="/assets/icons/icon-delete.svg"
                                          alt="icon-delete"
                                          className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                        />
                                      </button>
                                    )}

                                    {(permissions.includes("all_procedure") ||
                                      permissions.includes("read_procedure") ||
                                      permissions.includes("Admin")) && (
                                      <button
                                        type="button"
                                        className="focus-visible:outline-none"
                                        title="Edit"
                                      >
                                        <img
                                          src="/assets/icons/icon-edit.svg"
                                          alt="icon-edit"
                                          className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
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
                            colSpan={4}
                            searchQuery={searchQuery}
                            listLength={allProcedures && allProcedures.length}
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
                {allProceduresLoading ? (
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
                    itemsPerPage={allProceduresPagination.per_page}
                    handlePageClick={handlePageClick}
                    pageCount={
                      allProceduresPagination &&
                      Math.ceil(
                        allProceduresPagination.total_entries /
                          allProceduresPagination.per_page,
                      )
                    }
                    current_page={
                      allProceduresPagination &&
                      allProceduresPagination.current_page
                    }
                    totalEntries={
                      allProceduresPagination &&
                      allProceduresPagination.total_entries
                    }
                  />
                )}
              </div>
            </>
          )}
        </div>
        {/* Procedures Table List : End */}

        {/* View/Edit Procedure Popup  : Start */}
        <Transition appear show={showProcedureModal} as={Fragment}>
          <Dialog
            as="div"
            open={showProcedureModal}
            onClose={() => setShowProcedureModal(false)}
            className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40"
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
              <Dialog.Panel className="w-[98%] md:w-[95%] xl:w-[80%] 2xl:w-[85%] h-auto bg-gray4 dark:bg-black3 rounded-2xl shadow-lg">
                <ProcedureDetails
                  tabName="Step 1"
                  addNewTab="Add Step"
                  actionName="Update"
                  procedure_id={editingId}
                  model_id={editingModelId}
                  setShowProcedureModal={setShowProcedureModal}
                  callingFrom="procedures"
                />
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>

        {/* Delete Procedure Modal */}
        {deleteProcedure && (
          <DeleteModal
            head="Remove Procedure"
            body={[
              "Are you sure you want to remove",
              <strong className="capitalize break-all">
                {" "}
                "{deleteProcedureTitle}"{" "}
              </strong>,
              "Procedure from the list?",
            ]}
            deleteAction={deleteProcedure}
            modalAction={setShowDelete}
            parentmodel={false}
            modalValue={showDelete}
            id={deletingId}
            deleteLoading={deleteProcedureLoading}
          />
        )}
      </Layout>
    </>
  );
};
export default Procedures;
