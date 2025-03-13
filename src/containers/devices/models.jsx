import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import {
  changeModelsSearch,
  getAllModels,
  setModelModal,
} from "../../redux/reduxes/theModels/modelAction";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import AddNewModel from "../../components/model/addNewModel";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import ListDataNotFound from "../../components/common/listDataNotFound";
import PermissionsMessage from "../../components/common/permissionsMessage";
import { useHistory } from "react-router-dom";

const Models = () => {
  const dispatch = useDispatch();

  const navigate = useHistory();

  // Fetch Data
  const models = useSelector((state) => state.models.allModels);
  const allModelsLoading = useSelector(
    (state) => state.models.allModelsLoading,
  );
  const pagination = useSelector((state) => state.models.allModelsPagination);
  const sort = useSelector((state) => state.sort);
  const sortByModelTitle = useSelector((state) => state.sort.sortByModelTitle);
  const sortByModelId = useSelector((state) => state.sort.sortByModelId);
  const sortByModelCreatedDate = useSelector(
    (state) => state.sort.sortByModelCreatedDate,
  );
  const modelPopup = useSelector((state) => state.models.modelPopup);
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector((state) => state.models.searchModelsQuery);

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Sort Data
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      sort:
        sortByModelTitle != 0
          ? sortByModelTitle
          : sortByModelId != 0
          ? sortByModelId
          : sortByModelCreatedDate != 0
          ? sortByModelCreatedDate
          : 0,
      sorting:
        sortByModelTitle != 0
          ? "title"
          : sortByModelId != 0
          ? "model_id"
          : sortByModelCreatedDate != 0
          ? "created_at"
          : "",
    };
    delayLoading && dispatch(getAllModels(data));
  }, [sort]);

  // Dispatch Search, Page, Sort and Filters
  useEffect(() => {
    const data = {
      search: "",
      page: 0,
      limit: 10,
      sort:
        sortByModelTitle != 0
          ? sortByModelTitle
          : sortByModelId != 0
          ? sortByModelId
          : sortByModelCreatedDate != 0
          ? sortByModelCreatedDate
          : 0,
      sorting:
        sortByModelTitle != 0
          ? "title"
          : sortByModelId != 0
          ? "model_id"
          : sortByModelCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllModels(data));
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Seacrh Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      sort:
        sortByModelTitle != 0
          ? sortByModelTitle
          : sortByModelId != 0
          ? sortByModelId
          : sortByModelCreatedDate != 0
          ? sortByModelCreatedDate
          : 0,
      sorting:
        sortByModelTitle != 0
          ? "title"
          : sortByModelId != 0
          ? "model_id"
          : sortByModelCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllModels(data));
  }, [searchQuery]);

  // Onchange Search
  const handleSearchChange = (searchData) => {
    dispatch(changeModelsSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      limit: 10,
      sort:
        sortByModelTitle != 0
          ? sortByModelTitle
          : sortByModelId != 0
          ? sortByModelId
          : sortByModelCreatedDate != 0
          ? sortByModelCreatedDate
          : 0,
      sorting:
        sortByModelTitle != 0
          ? "title"
          : sortByModelId != 0
          ? "model_id"
          : sortByModelCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllModels(data));
  };

  // Add New Model Popup Modal
  function setShowModal() {
    dispatch(setModelModal(true));
  }

  // All Models Sort
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

  const navigateDetails = (id) => {
    navigate.push(`device-model/${id}`);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Models</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid xl:grid-cols-2 xl:gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img
                    src="/assets/icons/icon-devices.svg"
                    alt="icon-devices"
                    className="invert dark:invert-0 w-4 h-4 opacity-50"
                  />
                  <div className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                    Devices /
                  </div>
                  <span className="ml-1 text-xs text-secondary font-semibold">
                    {" "}
                    All Models
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  Models
                </h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                {(permissions.includes("all_model") ||
                  (permissions.includes("read_model") &&
                    permissions.includes("write_model")) ||
                  permissions.includes("Admin")) &&
                  (permissions.includes("all_category") ||
                    permissions.includes("read_category") ||
                    permissions.includes("Admin")) && (
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0"
                    >
                      Add New Model +
                    </button>
                  )}
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Model Table List : Start */}
          <div className="w-full bg-white dark:bg-darkBg pb-8 border border-gray2 dark:border-black1 rounded-3xl drop-shadow-md">
            {!(
              permissions.includes("all_model") ||
              permissions.includes("read_model") ||
              permissions.includes("Admin")
            ) ? (
              <PermissionsMessage
                additionalClassName="h-[75vh] p-20"
                title="All Models"
                message="read model"
              />
            ) : (
              <>
                {/* Search and Filter : Start */}
                {(permissions.includes("all_model") ||
                  permissions.includes("read_model") ||
                  permissions.includes("Admin")) && (
                  <div className="flex items-center justify-between px-4 py-8 xl:p-8">
                    <div className="w-[75%] xl:w-[400px] relative overflow-hidden">
                      <input
                        type="search"
                        className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                        name="user_search"
                        id="user_search"
                        placeholder="Search for Models..."
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                      />
                      <div className="absolute top-3.5 right-5 block m-auto">
                        <img
                          src="/assets/icons/icon-search.svg"
                          alt="icon-search"
                          className="w-4 h-4 block m-auto dark:invert"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* Search and Filter : End */}

                {/* Model Table List : Start */}
                <div className="w-full min-h-[500px] h-[65vh] 2xl:h-[58vh]  dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <table className="table-auto text-left relative min-w-full max-h-full">
                    <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                      <tr>
                        <th
                          onClick={() =>
                            handleChangeSort(
                              sortByModelTitle,
                              "sortByModelTitle",
                            )
                          }
                          scope="col"
                          width="25%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center ">
                            <span
                              className={
                                sortByModelTitle == 1 || sortByModelTitle == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Model Name
                            </span>
                            {sortByModelTitle == 1 ? (
                              <img
                                src="/assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByModelTitle == 2 ? (
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
                          onClick={() =>
                            handleChangeSort(sortByModelId, "sortByModelId")
                          }
                          scope="col"
                          width="20%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center ">
                            <span
                              className={
                                sortByModelId == 1 || sortByModelId == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Model ID
                            </span>
                            {sortByModelId == 1 ? (
                              <img
                                src="/assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByModelId == 2 ? (
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
                          width="20%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          width="10%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          Linked Devices
                        </th>
                        <th
                          onClick={() =>
                            handleChangeSort(
                              sortByModelCreatedDate,
                              "sortByModelCreatedDate",
                            )
                          }
                          scope="col"
                          width="15%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center ">
                            <span
                              className={
                                sortByModelCreatedDate == 1 ||
                                sortByModelCreatedDate == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Created On
                            </span>
                            {sortByModelCreatedDate == 1 ? (
                              <img
                                src="/assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByModelCreatedDate == 2 ? (
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
                          className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {allModelsLoading ? (
                        <tr>
                          <td colSpan="6">
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
                          {models && models.length > 0 ? (
                            <>
                              {models.map((model, index) => {
                                const {
                                  title,
                                  model_id,
                                  primary_category,
                                  secondary_category,
                                  linked_devices,
                                  id,
                                  created_at,
                                } = model;
                                return (
                                  <tr
                                    valign="top"
                                    className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out group-hover:transition-all hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300 cursor-pointer"
                                    key={id}
                                    onClick={() => navigateDetails(id)}
                                  >
                                    <td
                                      width="25%"
                                      className="px-4 xl:px-8 py-4"
                                    >
                                      <div
                                        className="text-sm 2xl:text-base font-medium capitalize w-[150px] 2xl:w-[250px] break-all"
                                        title={title}
                                      >
                                        {title}
                                      </div>
                                    </td>
                                    <td
                                      width="20%"
                                      className="px-4 xl:px-8 py-4 text-sm 2xl:text-base break-all"
                                    >
                                      {model_id}
                                    </td>
                                    <td
                                      width="20%"
                                      className="px-4 xl:px-8 py-4 text-sm"
                                    >
                                      {primary_category &&
                                        primary_category.name &&
                                        primary_category.name && (
                                          <>
                                            <span>
                                              {primary_category &&
                                                primary_category.name &&
                                                primary_category.name}{" "}
                                              <small>(Primary)</small>
                                            </span>
                                            <br />
                                          </>
                                        )}

                                      {secondary_category &&
                                        secondary_category.name &&
                                        secondary_category.name && (
                                          <span>
                                            {secondary_category &&
                                              secondary_category.name &&
                                              secondary_category.name}{" "}
                                            <small>
                                              {secondary_category.length > 0
                                                ? ""
                                                : "(Secondary)"}
                                            </small>
                                          </span>
                                        )}
                                    </td>
                                    <td
                                      width="10%"
                                      className="px-4 xl:px-8 py-4 2xl:text-base"
                                    >
                                      {linked_devices}
                                    </td>
                                    <td
                                      width="15%"
                                      className="px-4 xl:px-8 py-4 text-sm 2xl:text-base"
                                    >
                                      {created_at}
                                    </td>
                                    <td width="15%" className="px-8 py-4">
                                      <div className="group flex items-center text-primary text-opacity-75 text-sm 2xl:text-base font-medium whitespace-nowrap transition-all duration-300 hover:text-opacity-100 hover:transition-all hover:duration-300 focus:outline-0">
                                        <span className="pt-1">
                                          {" "}
                                          View Model
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          ) : (
                            <ListDataNotFound
                              colSpan={6}
                              searchQuery={searchQuery}
                              listLength={models && models.length}
                              filters={[]}
                            />
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Model Table List : End */}

                {/* Pagination */}
                <div className="mt-8 px-4 flex justify-end">
                  {allModelsLoading ? (
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
                      itemsPerPage={pagination.per_page}
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

          {/* Add a Device Modal : Start */}
          {modelPopup && (
            <AddNewModel
              showModal={modelPopup}
              editModel={false}
              // setShowModal={setShowModal}
            />
          )}
          {/* Add Device Models : End */}
        </section>
      </Layout>
    </>
  );
};
export default Models;
