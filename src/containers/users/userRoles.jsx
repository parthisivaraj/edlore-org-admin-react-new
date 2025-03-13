import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";
import {
  changeUserRolesSearch,
  getUserRoles,
} from "../../redux/reduxes/userRoles/userRolesAction";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import PaginatedItems from "../../components/common/pagination";
import ShowAllFeatures from "../../components/users/showAllFeaturesModal";
import Filters from "../../components/common/filters";
import AppliedFilters from "../../components/common/appliedFilters";
import ListDataNotFound from "../../components/common/listDataNotFound";
import PermissionsMessage from "../../components/common/permissionsMessage";

const UserRoles = (props) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();

  // Fetch Data
  const userRolesListLoading = useSelector((state) => state.user_roles.loading);
  const users = useSelector((state) => state.user_roles.user_roles);
  const pagination = useSelector(
    (state) => state.user_roles.user_roles_pagination,
  );
  const filters = useSelector((state) => state.user_roles.filters);
  const sort = useSelector((state) => state.sort);
  const sortByUserRoleTitle = useSelector(
    (state) => state.sort.sortByUserRoleTitle,
  );
  const sortByUserRoleStatus = useSelector(
    (state) => state.sort.sortByUserRoleStatus,
  );
  const sortByUserRoleCreatedDate = useSelector(
    (state) => state.sort.sortByUserRoleCreatedDate,
  );
  const permissionsLocal = useSelector(
    (state) => state.auth.allPermissions || [],
  );
  const searchQuery = useSelector(
    (state) => state.user_roles.searchUserRolesQuery,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Sorting Data
  useEffect(() => {
    const data = {
      user_id: "",
      search: searchQuery,
      page: 0,
      limit: 10,
      filter:
        filters && filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByUserRoleTitle != 0
          ? sortByUserRoleTitle
          : sortByUserRoleStatus != 0
          ? sortByUserRoleStatus
          : sortByUserRoleCreatedDate != 0
          ? sortByUserRoleCreatedDate
          : 0,
      sorting:
        sortByUserRoleTitle != 0
          ? "title"
          : sortByUserRoleStatus != 0
          ? "status"
          : sortByUserRoleCreatedDate != 0
          ? "created_at"
          : "",
    };
    delayLoading && dispatch(getUserRoles(data));
  }, [sort]);

  // Dispatch All
  useEffect(() => {
    const data = {
      user_id: "",
      search: searchQuery,
      page: 0,
      limit: 10,
      filter:
        filters && filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByUserRoleTitle != 0
          ? sortByUserRoleTitle
          : sortByUserRoleStatus != 0
          ? sortByUserRoleStatus
          : sortByUserRoleCreatedDate != 0
          ? sortByUserRoleCreatedDate
          : 0,
      sorting:
        sortByUserRoleTitle != 0
          ? "title"
          : sortByUserRoleStatus != 0
          ? "status"
          : sortByUserRoleCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getUserRoles(data));
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Search Query
  useEffect(() => {
    const data = {
      user_id: "",
      search: searchQuery,
      page: 0,
      limit: 10,
      filter:
        filters && filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByUserRoleTitle != 0
          ? sortByUserRoleTitle
          : sortByUserRoleStatus != 0
          ? sortByUserRoleStatus
          : sortByUserRoleCreatedDate != 0
          ? sortByUserRoleCreatedDate
          : 0,
      sorting:
        sortByUserRoleTitle != 0
          ? "title"
          : sortByUserRoleStatus != 0
          ? "status"
          : sortByUserRoleCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getUserRoles(data));
  }, [searchQuery]);

  // Search User Roles
  const onSearchChange = (searchData) => {
    dispatch(changeUserRolesSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      user_id: "",
      search: searchQuery,
      page: e.selected,
      limit: 10,
      filter:
        filters && filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByUserRoleTitle != 0
          ? sortByUserRoleTitle
          : sortByUserRoleStatus != 0
          ? sortByUserRoleStatus
          : sortByUserRoleCreatedDate != 0
          ? sortByUserRoleCreatedDate
          : 0,
      sorting:
        sortByUserRoleTitle != 0
          ? "title"
          : sortByUserRoleStatus != 0
          ? "status"
          : sortByUserRoleCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getUserRoles(data));
  };

  // Permissions
  const [featuresOfTheSelected, setFeaturesOfTheSelected] = useState([]);
  const [showAllPermissions, setShowAllPermissions] = useState(false);
  const allPermissions = (perm) => {
    setFeaturesOfTheSelected(perm);
    setShowAllPermissions(true);
  };

  // User Roles Sorting
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
        <title>User Roles</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img
                    src="../assets/icons/icon-users.svg"
                    alt="icon-user"
                    className="w-[14px] h-[14px] invert dark:invert-0 opacity-70"
                  />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                    User Controls /
                  </span>
                  <span className="ml-1 text-xs text-secondary font-semibold">
                    All User Roles
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  User Roles
                </h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                {(permissionsLocal.includes("all_role") ||
                  permissionsLocal.includes("write_role") ||
                  permissionsLocal.includes("Admin")) && (
                  <Link
                    to="/add-user-role"
                    exact={true}
                    className="bg-secondary text-white text-sm 2xl:text-base font-medium border border-secondary rounded-full px-5 py-2.5 drop-shadow-sm transition-all hover:bg-transparent hover:text-secondary  hover:transition-all"
                  >
                    Add New User Role +
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* User Roles List */}
          <div className="grid grid-cols-1">
            <div className="bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl py-8 drop-shadow-md">
              {!(
                permissionsLocal.includes("all_role") ||
                permissionsLocal.includes("read_role") ||
                permissionsLocal.includes("Admin")
              ) ? (
                <PermissionsMessage
                  additionalClassName="h-[72vh] p-20"
                  title="User Roles"
                  message="read role"
                />
              ) : (
                <>
                  {/* Search Bar and Filters */}
                  <div className="flex md:flex-col xl:flex-row items-center mb-8 px-6 xl:px-8">
                    <div className="flex md:flex-col-reverse xl:flex-row xl:items-center w-full xl:w-auto">
                      <h4 className="text-xl text-black2 dark:text-gray2 font-semibold mr-8">
                        Showing all User Roles
                      </h4>
                      <div className="w-full xl:w-[400px] relative mb-6 xl:mb-0 overflow-hidden">
                        <input
                          type="search"
                          className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-6 py-2 border border-gray2 dark:border-opacity-50 rounded-full focus:border-secondary focus:outline-none"
                          name="user_search"
                          id="user_search"
                          placeholder="Search for User Roles..."
                          value={searchQuery}
                          onChange={(e) => onSearchChange(e.target.value)}
                        />
                        <div className="absolute top-3.5 right-4 block m-auto focus-visible:outline-none">
                          <img
                            src="../assets/icons/icon-search.svg"
                            alt="icon-search"
                            className="w-4 h-4 block m-auto dark:invert"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Filters : Start */}
                    <Filters
                      user_id=""
                      additionalClassName="-mt-6"
                      filters={filters}
                      getListAction={getUserRoles}
                      limit={10}
                      sort={
                        sortByUserRoleTitle != 0
                          ? sortByUserRoleTitle
                          : sortByUserRoleStatus != 0
                          ? sortByUserRoleStatus
                          : sortByUserRoleCreatedDate != 0
                          ? sortByUserRoleCreatedDate
                          : 0
                      }
                      sorting={
                        sortByUserRoleTitle != 0
                          ? "title"
                          : sortByUserRoleStatus != 0
                          ? "status"
                          : sortByUserRoleCreatedDate != 0
                          ? "created_at"
                          : ""
                      }
                    />
                  </div>

                  {/* Applified Filters */}
                  <div className="px-6 xl:px-8">
                    <AppliedFilters
                      user_id=""
                      page={0}
                      limit={10}
                      search={searchQuery}
                      sort={
                        sortByUserRoleTitle != 0
                          ? sortByUserRoleTitle
                          : sortByUserRoleStatus != 0
                          ? sortByUserRoleStatus
                          : sortByUserRoleCreatedDate != 0
                          ? sortByUserRoleCreatedDate
                          : 0
                      }
                      sorting={
                        sortByUserRoleTitle != 0
                          ? "title"
                          : sortByUserRoleStatus != 0
                          ? "status"
                          : sortByUserRoleCreatedDate != 0
                          ? "created_at"
                          : ""
                      }
                      filters={filters}
                      getActionList={getUserRoles}
                    />
                  </div>

                  {/* Users Role Table : Start */}
                  <div className="w-full min-h-[500px] h-[650px] 2xl:h-[600px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                    <table className="table-auto text-left relative min-w-full max-h-full">
                      <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                        <tr>
                          <th
                            onClick={() =>
                              handleChangeSort(
                                sortByUserRoleTitle,
                                "sortByUserRoleTitle",
                              )
                            }
                            scope="col"
                            width="25%"
                            className="px-4 xl:px-8 py-6 text-sm uppercase whitespace-nowrap"
                          >
                            <div className="flex items-center">
                              <span
                                className={
                                  sortByUserRoleTitle == 1 ||
                                  sortByUserRoleTitle == 2
                                    ? "text-primary"
                                    : ""
                                }
                              >
                                User Role
                              </span>
                              {sortByUserRoleTitle == 1 ? (
                                <img
                                  src="../assets/icons/icon-sort-asc.svg"
                                  alt="icon-sort-asc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : sortByUserRoleTitle == 2 ? (
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
                            width="30%"
                            className="px-4 xl:px-8 py-6 text-sm uppercase whitespace-nowrap"
                          >
                            Privileges
                          </th>
                          <th
                            onClick={() =>
                              handleChangeSort(
                                sortByUserRoleStatus,
                                "sortByUserRoleStatus",
                              )
                            }
                            scope="col"
                            width="15%"
                            className="px-4 xl:px-8 py-6 text-sm uppercase whitespace-nowrap"
                          >
                            <div className="flex items-center">
                              <span
                                className={
                                  sortByUserRoleStatus == 1 ||
                                  sortByUserRoleStatus == 2
                                    ? "text-primary"
                                    : ""
                                }
                              >
                                Status
                              </span>
                              {sortByUserRoleStatus == 1 ? (
                                <img
                                  src="../assets/icons/icon-sort-asc.svg"
                                  alt="icon-sort-asc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : sortByUserRoleStatus == 2 ? (
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
                                sortByUserRoleCreatedDate,
                                "sortByUserRoleCreatedDate",
                              )
                            }
                            scope="col"
                            width="15%"
                            className="px-4 xl:px-8 py-6 text-sm uppercase whitespace-nowrap"
                          >
                            <div className="flex items-center">
                              <span
                                className={
                                  sortByUserRoleCreatedDate == 1 ||
                                  sortByUserRoleCreatedDate == 2
                                    ? "text-primary"
                                    : ""
                                }
                              >
                                Created On
                              </span>
                              {sortByUserRoleCreatedDate == 1 ? (
                                <img
                                  src="../assets/icons/icon-sort-asc.svg"
                                  alt="icon-sort-asc"
                                  className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                />
                              ) : sortByUserRoleCreatedDate == 2 ? (
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
                            className="px-4 xl:px-8 py-6 text-sm uppercase whitespace-nowrap"
                          >
                            {(permissionsLocal.includes("all_role") ||
                              permissionsLocal.includes("update_role") ||
                              permissionsLocal.includes("Admin")) && (
                              <span>Action</span>
                            )}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {userRolesListLoading ? (
                          <tr>
                            <td colSpan="5">
                              <Skeleton
                                count={10}
                                height={70}
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
                            {users && users.length > 0 ? (
                              <>
                                {users.map((user, index) => {
                                  const {
                                    id,
                                    title,
                                    description,
                                    count,
                                    status,
                                    permissions,
                                    created_at,
                                  } = user;

                                  return (
                                    <tr
                                      valign="top"
                                      className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                      key={id}
                                    >
                                      <td
                                        width="25%"
                                        className="px-4 xl:px-8 py-6 font-medium capitalize break-all"
                                      >
                                        {title}
                                      </td>
                                      <td
                                        width="30%"
                                        className="px-4 xl:px-8 py-6"
                                      >
                                        {permissions &&
                                        permissions.length > 0 ? (
                                          <div className="flex items-center">
                                            <img
                                              src="../assets/icons/icon-lock-open.svg"
                                              alt="icon-lock-open"
                                            />
                                            <div className="xl:flex items-center text-base text-black2 dark:text-gray2 font-normal ml-2 whitespace-nowrap">
                                              {permissions.map(
                                                (permission, index) => {
                                                  if (index < 3) {
                                                    return (
                                                      <div
                                                        key={index}
                                                        className="pr-1"
                                                      >
                                                        {permission.description}
                                                        ,{" "}
                                                      </div>
                                                    );
                                                  }
                                                },
                                              )}
                                            </div>
                                            {permissions.length > 3 && (
                                              <button
                                                onClick={() =>
                                                  allPermissions(permissions)
                                                }
                                                className="text-base text-primary font-bold underline ml-2"
                                              >
                                                +{permissions.length - 3}
                                              </button>
                                            )}
                                          </div>
                                        ) : null}
                                      </td>

                                      <td
                                        width="15%"
                                        className="px-4 xl:px-8 py-6 whitespace-nowrap capitalize"
                                      >
                                        {" "}
                                        {status}
                                      </td>
                                      <td
                                        width="15%"
                                        className="px-4 xl:px-8 py-6 whitespace-nowrap text-sm"
                                      >
                                        {" "}
                                        {created_at}
                                      </td>
                                      <td
                                        width="15%"
                                        className="px-4 xl:px-8 py-6 whitespace-nowrap"
                                      >
                                        {(permissionsLocal.includes(
                                          "all_role",
                                        ) ||
                                          permissionsLocal.includes(
                                            "update_role",
                                          ) ||
                                          permissionsLocal.includes(
                                            "Admin",
                                          )) && (
                                          <>
                                            {title != "Admin" ? (
                                              <Link
                                                to={`/edit-user-role/${id}`}
                                                exact={true}
                                                className="text-primary opacity-75 underline text-base  transition-all hover:opacity-100 hover:transition-all focus-visible:outline-none"
                                              >
                                                Manage Role
                                              </Link>
                                            ) : (
                                              "-"
                                            )}
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </>
                            ) : (
                              <ListDataNotFound
                                colSpan={5}
                                searchQuery={searchQuery}
                                listLength={users && users.length}
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
                    {userRolesListLoading ? (
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
                        itemsPerPage={8}
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

          {/* Showing All Features Modal */}
          <ShowAllFeatures
            featuresOfTheSelected={featuresOfTheSelected}
            showAllFeatures={showAllPermissions}
            setShowAllFeatures={setShowAllPermissions}
          />
        </section>
      </Layout>
    </>
  );
};
export default UserRoles;
