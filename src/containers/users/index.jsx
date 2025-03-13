import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import { Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import {
  getUsers,
  getActiveUsers,
  getInActiveUsers,
  changeUsersSearch,
} from "../../redux/reduxes/users/usersAction";
import Filters from "../../components/common/filters";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import AppliedFilters from "../../components/common/appliedFilters";
import ListDataNotFound from "../../components/common/listDataNotFound";
import PermissionsMessage from "../../components/common/permissionsMessage";

// Tabs
const tabs = [{ title: "All" }, { title: "Active" }, { title: "Inactive" }];

const Users = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  // Fetch Data
  const userListLoading = useSelector((state) => state.users.loading);
  const usersLst = useSelector((state) => state.users.usersList.users);
  const pagination = useSelector((state) => state.users.usersList.pagination);
  const filters = useSelector((state) => state.users.filters);
  const activeUsersLoading = useSelector(
    (state) => state.users.activeUsersLoading,
  );
  const activeUsers = useSelector((state) => state.users.activeUsers);
  const activeUsersPagination = useSelector(
    (state) => state.users.activeUsersPagination,
  );
  const inActiveUsersLoading = useSelector(
    (state) => state.users.inActiveUsersLoading,
  );
  const inActiveUsers = useSelector((state) => state.users.inActiveUsers);
  const inActiveUsersPagination = useSelector(
    (state) => state.users.inActiveUsersPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByUserFirstName = useSelector(
    (state) => state.sort.sortByUserFirstName,
  );
  const sortByUserId = useSelector((state) => state.sort.sortByUserId);
  const sortByUserAvailability = useSelector(
    (state) => state.sort.sortByUserAvailability,
  );
  const sortByUserCreatedDate = useSelector(
    (state) => state.sort.sortByUserCreatedDate,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector((state) => state.users.searchUsersQuery);

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Sort
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      filter: {},
      paginate: true,
      limit: 10,
      sort:
        sortByUserFirstName != 0
          ? sortByUserFirstName
          : sortByUserId != 0
            ? sortByUserId
            : sortByUserAvailability != 0
              ? sortByUserAvailability
              : sortByUserCreatedDate != 0
                ? sortByUserCreatedDate
                : 0,
      sorting:
        sortByUserFirstName != 0
          ? "first_name"
          : sortByUserId != 0
            ? "user_id"
            : sortByUserAvailability != 0
              ? "support_availability_status"
              : sortByUserCreatedDate != 0
                ? "created_at"
                : "",
    };
    if (activeTab == 0) {
      delayLoading && dispatch(getUsers(data));
    } else if (activeTab == 1) {
      delayLoading && dispatch(getActiveUsers(data));
    } else if (activeTab == 2) {
      delayLoading && dispatch(getInActiveUsers(data));
    }
  }, [sort]);

  // Dispatch All
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByUserFirstName != 0
          ? sortByUserFirstName
          : sortByUserId != 0
            ? sortByUserId
            : sortByUserAvailability != 0
              ? sortByUserAvailability
              : sortByUserCreatedDate != 0
                ? sortByUserCreatedDate
                : 0,
      sorting:
        sortByUserFirstName != 0
          ? "first_name"
          : sortByUserId != 0
            ? "user_id"
            : sortByUserAvailability != 0
              ? "support_availability_status"
              : sortByUserCreatedDate != 0
                ? "created_at"
                : "",
    };
    if (activeTab == 0) {
      dispatch(getUsers(data));
    } else if (activeTab == 1) {
      dispatch(getActiveUsers(data));
    } else if (activeTab == 2) {
      dispatch(getInActiveUsers(data));
    }
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
      filter: {},
      paginate: true,
      sort:
        sortByUserFirstName != 0
          ? sortByUserFirstName
          : sortByUserId != 0
            ? sortByUserId
            : sortByUserAvailability != 0
              ? sortByUserAvailability
              : sortByUserCreatedDate != 0
                ? sortByUserCreatedDate
                : 0,
      sorting:
        sortByUserFirstName != 0
          ? "first_name"
          : sortByUserId != 0
            ? "user_id"
            : sortByUserAvailability != 0
              ? "support_availability_status"
              : sortByUserCreatedDate != 0
                ? "created_at"
                : "",
    };
    if (activeTab == 0) {
      dispatch(getUsers(data));
    } else if (activeTab == 1) {
      dispatch(getActiveUsers(data));
    } else if (activeTab == 2) {
      dispatch(getInActiveUsers(data));
    }
  }, [searchQuery]);

  // Search Users
  const handleSearchChange = (searchData) => {
    dispatch(changeUsersSearch(searchData));
  };

  // Tab Change Handler
  const tabChangeHandler = (tab) => {
    setActiveTab(tab);
    const passData = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      paginate: true,
      sort:
        sortByUserFirstName != 0
          ? sortByUserFirstName
          : sortByUserId != 0
            ? sortByUserId
            : sortByUserAvailability != 0
              ? sortByUserAvailability
              : sortByUserCreatedDate != 0
                ? sortByUserCreatedDate
                : 0,
      sorting:
        sortByUserFirstName != 0
          ? "first_name"
          : sortByUserId != 0
            ? "user_id"
            : sortByUserAvailability != 0
              ? "support_availability_status"
              : sortByUserCreatedDate != 0
                ? "created_at"
                : "",
    };
    if (tab == 0) {
      dispatch(getUsers(passData));
    } else if (tab == 1) {
      dispatch(getActiveUsers(passData));
    } else if (tab == 2) {
      dispatch(getInActiveUsers(passData));
    }
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      limit: 10,
      filter:
        filters && filters.selected_filters
          ? filters && filters.selected_filters
          : {},
      paginate: true,
      sort:
        sortByUserFirstName != 0
          ? sortByUserFirstName
          : sortByUserId != 0
            ? sortByUserId
            : sortByUserAvailability != 0
              ? sortByUserAvailability
              : sortByUserCreatedDate != 0
                ? sortByUserCreatedDate
                : 0,
      sorting:
        sortByUserFirstName != 0
          ? "first_name"
          : sortByUserId != 0
            ? "user_id"
            : sortByUserAvailability != 0
              ? "support_availability_status"
              : sortByUserCreatedDate != 0
                ? "created_at"
                : "",
    };
    if (activeTab == 0) {
      dispatch(getUsers(data));
    } else if (activeTab == 1) {
      dispatch(getActiveUsers(data));
    } else if (activeTab == 2) {
      dispatch(getInActiveUsers(data));
    }
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
        <title>All Users</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
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
                  All Users
                </span>
              </div>
              <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                All Users
              </h1>
            </div>
            <div className="col-start-2 m-auto mr-0">
              <div className="flex items-center">
                {(permissions.includes("all_user") ||
                  permissions.includes("write_user") ||
                  permissions.includes("Admin")) &&
                  (permissions.includes("all_role") ||
                    permissions.includes("read_role") ||
                    permissions.includes("Admin")) && (
                    <Link
                      to="/add-user"
                      exact={true}
                      className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full drop-shadow-sm px-6 py-2 transition-all hover:bg-transparent hover:text-secondary hover:transition-all"
                    >
                      Add New User +
                    </Link>
                  )}
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Users Table : Start */}
          <div className="grid grid-cols-1">
            <Tab.Group
              onChange={(index) => {
                tabChangeHandler(index);
              }}
            >
              <Tab.List className="mb-8 flex flex-row items-center">
                {tabs.map((tab, index) => {
                  const { title } = tab;

                  return (
                    <Tab
                      key={index}
                      className={({ selected }) =>
                        selected
                          ? "md:text-lg 2xl:text-xl text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-5 xl:mr-10 focus:outline-none focus-visible:ring-0"
                          : "md:text-lg 2xl:text-xl text-black2 dark:text-gray2 opacity-50 font-bold border-b-4 border-transparent mr-5 xl:mr-10 transition-all hover:opacity-100 hover:transition-all focus:outline-none focus-visible:ring-0"
                      }
                    >
                      {title}
                      {() => setActiveTab(title)}
                    </Tab>
                  );
                })}

                {(permissions.includes("all_user") ||
                  permissions.includes("read_user") ||
                  permissions.includes("Admin")) && (
                    <>
                      <div className="w-[220px] xl:w-[400px] relative overflow-hidden mx-3">
                        <input
                          type="search"
                          className="w-full bg-gray dark:bg-darkMainBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                          name="user_search"
                          id="user_search"
                          placeholder="Search Users..."
                          value={searchQuery}
                          onChange={(e) => handleSearchChange(e.target.value)}
                        />
                        <div className="absolute top-3.5 right-5 block m-auto">
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
                        getListAction={
                          activeTab == 0
                            ? getUsers
                            : activeTab == 1
                              ? getActiveUsers
                              : getInActiveUsers
                        }
                        page={0}
                        limit={10}
                        search={searchQuery}
                        sort={
                          sortByUserFirstName != 0
                            ? sortByUserFirstName
                            : sortByUserId != 0
                              ? sortByUserId
                              : sortByUserAvailability != 0
                                ? sortByUserAvailability
                                : sortByUserCreatedDate != 0
                                  ? sortByUserCreatedDate
                                  : 0
                        }
                        sorting={
                          sortByUserFirstName != 0
                            ? "first_name"
                            : sortByUserId != 0
                              ? "user_id"
                              : sortByUserAvailability != 0
                                ? "support_availability_status"
                                : sortByUserCreatedDate != 0
                                  ? "created_at"
                                  : ""
                        }
                      />
                    </>
                  )}
              </Tab.List>

              <Tab.Panels>
                {/* Applied Filters */}
                {filters && filters != {} && (
                  <AppliedFilters
                    page={0}
                    limit={10}
                    search={searchQuery}
                    sort={
                      sortByUserFirstName != 0
                        ? sortByUserFirstName
                        : sortByUserId != 0
                          ? sortByUserId
                          : sortByUserAvailability != 0
                            ? sortByUserAvailability
                            : sortByUserCreatedDate != 0
                              ? sortByUserCreatedDate
                              : 0
                    }
                    sorting={
                      sortByUserFirstName != 0
                        ? "first_name"
                        : sortByUserId != 0
                          ? "user_id"
                          : sortByUserAvailability != 0
                            ? "support_availability_status"
                            : sortByUserCreatedDate != 0
                              ? "created_at"
                              : ""
                    }
                    filters={filters}
                    getActionList={
                      activeTab == 0
                        ? getUsers
                        : activeTab == 1
                          ? getActiveUsers
                          : getInActiveUsers
                    }
                  />
                )}

                {/* All Users Tab */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-darkBg  border border-gray2 dark:border-black1 rounded-3xl py-8 drop-shadow-md">
                    {!(
                      permissions.includes("all_user") ||
                      permissions.includes("read_user") ||
                      permissions.includes("Admin")
                    ) ? (
                      <PermissionsMessage
                        additionalClassName="h-[65vh] p-20"
                        title="Users"
                        message="read user"
                      />
                    ) : (
                      <>
                        <div className="w-full min-h-[500px] h-full xl:h-[550px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                          <table className="table-auto text-left relative min-w-full max-h-full">
                            <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                              <tr>
                                <th
                                  onClick={() =>
                                    handleChangeSort(
                                      sortByUserFirstName,
                                      "sortByUserFirstName",
                                    )
                                  }
                                  scope="col"
                                  width="20%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={
                                        sortByUserFirstName == 1 ||
                                          sortByUserFirstName == 2
                                          ? "text-primary"
                                          : ""
                                      }
                                    >
                                      User Full Name
                                    </span>
                                    {sortByUserFirstName == 1 ? (
                                      <img
                                        src="../assets/icons/icon-sort-asc.svg"
                                        alt="icon-sort-asc"
                                        className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                      />
                                    ) : sortByUserFirstName == 2 ? (
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
                                  Username
                                </th>
                                <th
                                  scope="col"
                                  width="10%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  User Role
                                </th>
                                <th
                                  scope="col"
                                  width="10%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  CAC Number
                                </th>
                                <th
                                  onClick={() =>
                                    handleChangeSort(
                                      sortByUserAvailability,
                                      "sortByUserAvailability",
                                    )
                                  }
                                  scope="col"
                                  width="15%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={
                                        sortByUserAvailability == 1 ||
                                          sortByUserAvailability == 2
                                          ? "text-primary"
                                          : ""
                                      }
                                    >
                                      Support Availability
                                    </span>
                                    {sortByUserAvailability == 1 ? (
                                      <img
                                        src="../assets/icons/icon-sort-asc.svg"
                                        alt="icon-sort-asc"
                                        className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                      />
                                    ) : sortByUserAvailability == 2 ? (
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
                                  Status
                                </th>
                                <th
                                  onClick={() =>
                                    handleChangeSort(
                                      sortByUserCreatedDate,
                                      "sortByUserCreatedDate",
                                    )
                                  }
                                  scope="col"
                                  width="10%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={
                                        sortByUserCreatedDate == 1 ||
                                          sortByUserCreatedDate == 2
                                          ? "text-primary"
                                          : ""
                                      }
                                    >
                                      Created On
                                    </span>
                                    {sortByUserCreatedDate == 1 ? (
                                      <img
                                        src="../assets/icons/icon-sort-asc.svg"
                                        alt="icon-sort-asc"
                                        className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                      />
                                    ) : sortByUserCreatedDate == 2 ? (
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
                                  Action
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {userListLoading ? (
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
                                  {usersLst && usersLst.length > 0 ? (
                                    <>
                                      {usersLst.map((user, index) => {
                                        const {
                                          id,
                                          user_id,
                                          first_name,
                                          last_name,
                                          username,
                                          email,
                                          role,
                                          support_availability_status,
                                          identification_code,
                                          status,
                                          created_at,
                                        } = user;

                                        return (
                                          <tr
                                            valign="top"
                                            className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                            key={id}
                                          >
                                            <td
                                              width="20%"
                                              className="px-4 xl:px-8 py-4"
                                            >
                                              <div className="flex items-center">
                                                <img
                                                  src="../assets/icons/icon-user-blue.svg"
                                                  alt="icon-user"
                                                />
                                                <div className="text-sm 2xl:text-base text-black2 dark:text-gray2 font-medium ml-2 capitalize break-all">
                                                  {first_name} {last_name}
                                                </div>
                                              </div>
                                              <a
                                                href="mailto:christopher@gmail.com"
                                                className="text-sm text-gray3 dark:text-gray2 dark:text-opacity-60"
                                              >
                                                {email}
                                              </a>
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4">
                                              {username}
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4"
                                            >
                                              <div
                                                className="capitalize w-[200px] text-ellipsis whitespace-nowrap overflow-hidden"
                                                title={role && role.title}
                                              >
                                                {role && role.title}
                                              </div>
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4 capitalize"
                                            >
                                              {identification_code
                                                ? identification_code
                                                : "-"}
                                            </td>
                                            <td
                                              width="15%"
                                              className="px-4 xl:px-8 py-4 capitalize"
                                            >
                                              {support_availability_status}
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4 capitalize"
                                            >
                                              {status}
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4 text-sm whitespace-nowrap"
                                            >
                                              {created_at}
                                            </td>
                                            <td
                                              width="15%"
                                              className="px-4 xl:px-8 py-4"
                                            >
                                              <Link
                                                to={`/edit-user/${id}`}
                                                exact={true}
                                                className="text-primary underline text-base whitespace-nowrap"
                                              >
                                                View User Profile
                                              </Link>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <ListDataNotFound
                                      colSpan={8}
                                      searchQuery={searchQuery}
                                      listLength={usersLst && usersLst.length}
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
                          {userListLoading ? (
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
                                  pagination.total_entries /
                                  pagination.per_page,
                                )
                              }
                              current_page={
                                pagination && pagination.current_page
                              }
                              totalEntries={
                                pagination && pagination.total_entries
                              }
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </Tab.Panel>

                {/* Active Users Tab */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-darkBg  border border-gray2 dark:border-black1 rounded-3xl py-8 drop-shadow-md">
                    {!(
                      permissions.includes("all_user") ||
                      permissions.includes("read_user") ||
                      permissions.includes("Admin")
                    ) ? (
                      <PermissionsMessage
                        additionalClassName="h-[65vh] p-20"
                        title="Users"
                        message="read user"
                      />
                    ) : (
                      <>
                        <div className="w-full min-h-[500px] h-full xl:h-[550px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                          <table className="table-auto text-left relative min-w-full max-h-full">
                            <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                              <tr>
                                <th
                                  onClick={() =>
                                    handleChangeSort(
                                      sortByUserFirstName,
                                      "sortByUserFirstName",
                                    )
                                  }
                                  scope="col"
                                  width="20%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={
                                        sortByUserFirstName == 1 ||
                                          sortByUserFirstName == 2
                                          ? "text-primary"
                                          : ""
                                      }
                                    >
                                      User Full Name
                                    </span>
                                    {sortByUserFirstName == 1 ? (
                                      <img
                                        src="../assets/icons/icon-sort-asc.svg"
                                        alt="icon-sort-asc"
                                        className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                      />
                                    ) : sortByUserFirstName == 2 ? (
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
                                  Username
                                </th>
                                <th
                                  scope="col"
                                  width="10%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  User Role
                                </th>
                                <th
                                  scope="col"
                                  width="10%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  CAC Number
                                </th>
                                <th
                                  onClick={() =>
                                    handleChangeSort(
                                      sortByUserAvailability,
                                      "sortByUserAvailability",
                                    )
                                  }
                                  scope="col"
                                  width="15%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={
                                        sortByUserAvailability == 1 ||
                                          sortByUserAvailability == 2
                                          ? "text-primary"
                                          : ""
                                      }
                                    >
                                      Support Availability
                                    </span>
                                    {sortByUserAvailability == 1 ? (
                                      <img
                                        src="../assets/icons/icon-sort-asc.svg"
                                        alt="icon-sort-asc"
                                        className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                      />
                                    ) : sortByUserAvailability == 2 ? (
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
                                  Status
                                </th>
                                <th
                                  onClick={() =>
                                    handleChangeSort(
                                      sortByUserCreatedDate,
                                      "sortByUserCreatedDate",
                                    )
                                  }
                                  scope="col"
                                  width="10%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={
                                        sortByUserCreatedDate == 1 ||
                                          sortByUserCreatedDate == 2
                                          ? "text-primary"
                                          : ""
                                      }
                                    >
                                      Created On
                                    </span>
                                    {sortByUserCreatedDate == 1 ? (
                                      <img
                                        src="../assets/icons/icon-sort-asc.svg"
                                        alt="icon-sort-asc"
                                        className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                      />
                                    ) : sortByUserCreatedDate == 2 ? (
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
                                  Action
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {activeUsersLoading ? (
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
                                  {activeUsers && activeUsers.length > 0 ? (
                                    <>
                                      {activeUsers.map((user, index) => {
                                        const {
                                          id,
                                          first_name,
                                          last_name,
                                          email,
                                          username,
                                          role,
                                          identification_code,
                                          support_availability_status,
                                          status,
                                          created_at,
                                        } = user;

                                        return (
                                          <tr
                                            valign="top"
                                            className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                            key={id}
                                          >
                                            <td
                                              width="20%"
                                              className="px-4 xl:px-8 py-4"
                                            >
                                              <div className="flex items-center">
                                                <img
                                                  src="../assets/icons/icon-user-blue.svg"
                                                  alt="icon-user"
                                                />
                                                <div className="text-sm 2xl:text-base text-black2 dark:text-gray2 font-medium ml-2 capitalize break-all">
                                                  {first_name} {last_name}
                                                </div>
                                              </div>
                                              <a
                                                href="mailto:christopher@gmail.com"
                                                className="text-sm text-gray3 dark:text-gray2 dark:text-opacity-60"
                                              >
                                                {email}
                                              </a>
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4">
                                              {username}
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4"
                                            >
                                              <div
                                                className="capitalize w-[200px] text-ellipsis whitespace-nowrap overflow-hidden"
                                                title={role && role.title}
                                              >
                                                {role && role.title}
                                              </div>
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4 capitalize"
                                            >
                                              {identification_code
                                                ? identification_code
                                                : "-"}
                                            </td>
                                            <td
                                              width="15%"
                                              className="px-4 xl:px-8 py-4 capitalize"
                                            >
                                              {support_availability_status}
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4 capitalize"
                                            >
                                              {status}
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4 text-sm whitespace-nowrap"
                                            >
                                              {created_at}
                                            </td>
                                            <td
                                              width="15%"
                                              className="px-4 xl:px-8 py-4"
                                            >
                                              <Link
                                                to={`/edit-user/${id}`}
                                                exact={true}
                                                className="text-primary underline text-base whitespace-nowrap"
                                              >
                                                View User Profile
                                              </Link>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <ListDataNotFound
                                      colSpan={8}
                                      searchQuery={searchQuery}
                                      listLength={
                                        activeUsers && activeUsers.length
                                      }
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
                          {activeUsersLoading ? (
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
                                activeUsersPagination &&
                                activeUsersPagination.per_page
                              }
                              handlePageClick={handlePageClick}
                              pageCount={
                                activeUsersPagination &&
                                Math.ceil(
                                  activeUsersPagination.total_entries /
                                  activeUsersPagination.per_page,
                                )
                              }
                              current_page={
                                activeUsersPagination &&
                                activeUsersPagination.current_page
                              }
                              totalEntries={
                                activeUsersPagination &&
                                activeUsersPagination.total_entries
                              }
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </Tab.Panel>

                {/* InActive Users Tab */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-darkBg  border border-gray2 dark:border-black1 rounded-3xl py-8 drop-shadow-md">
                    {!(
                      permissions.includes("all_user") ||
                      permissions.includes("read_user") ||
                      permissions.includes("Admin")
                    ) ? (
                      <PermissionsMessage
                        additionalClassName="h-[65vh] p-20"
                        title="Users"
                        message="read user"
                      />
                    ) : (
                      <>
                        <div className="w-full min-h-[500px] h-full xl:h-[550px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                          <table className="table-auto text-left relative min-w-full max-h-full">
                            <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                              <tr>
                                <th
                                  onClick={() =>
                                    handleChangeSort(
                                      sortByUserFirstName,
                                      "sortByUserFirstName",
                                    )
                                  }
                                  scope="col"
                                  width="20%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={
                                        sortByUserFirstName == 1 ||
                                          sortByUserFirstName == 2
                                          ? "text-primary"
                                          : ""
                                      }
                                    >
                                      User Full Name
                                    </span>
                                    {sortByUserFirstName == 1 ? (
                                      <img
                                        src="../assets/icons/icon-sort-asc.svg"
                                        alt="icon-sort-asc"
                                        className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                      />
                                    ) : sortByUserFirstName == 2 ? (
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
                                  Username
                                </th>
                                <th
                                  scope="col"
                                  width="10%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  User Role
                                </th>
                                <th
                                  scope="col"
                                  width="10%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  CAC Number
                                </th>
                                <th
                                  onClick={() =>
                                    handleChangeSort(
                                      sortByUserAvailability,
                                      "sortByUserAvailability",
                                    )
                                  }
                                  scope="col"
                                  width="15%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={
                                        sortByUserAvailability == 1 ||
                                          sortByUserAvailability == 2
                                          ? "text-primary"
                                          : ""
                                      }
                                    >
                                      Support Availability
                                    </span>
                                    {sortByUserAvailability == 1 ? (
                                      <img
                                        src="../assets/icons/icon-sort-asc.svg"
                                        alt="icon-sort-asc"
                                        className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                      />
                                    ) : sortByUserAvailability == 2 ? (
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
                                  Status
                                </th>
                                <th
                                  onClick={() =>
                                    handleChangeSort(
                                      sortByUserCreatedDate,
                                      "sortByUserCreatedDate",
                                    )
                                  }
                                  scope="col"
                                  width="10%"
                                  className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                                >
                                  <div className="flex items-center">
                                    <span
                                      className={
                                        sortByUserCreatedDate == 1 ||
                                          sortByUserCreatedDate == 2
                                          ? "text-primary"
                                          : ""
                                      }
                                    >
                                      Created On
                                    </span>
                                    {sortByUserCreatedDate == 1 ? (
                                      <img
                                        src="../assets/icons/icon-sort-asc.svg"
                                        alt="icon-sort-asc"
                                        className="w-[15px] h-[15px] ml-[2px] dark:invert"
                                      />
                                    ) : sortByUserCreatedDate == 2 ? (
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
                                  Action
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {inActiveUsersLoading ? (
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
                                  {inActiveUsers && inActiveUsers.length > 0 ? (
                                    <>
                                      {inActiveUsers.map((user, index) => {
                                        const {
                                          id,
                                          first_name,
                                          last_name,
                                          username,
                                          email,
                                          role,
                                          identification_code,
                                          support_availability_status,
                                          status,
                                          created_at,
                                        } = user;

                                        return (
                                          <tr
                                            valign="top"
                                            className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                            key={id}
                                          >
                                            <td
                                              width="20%"
                                              className="px-4 xl:px-8 py-4"
                                            >
                                              <div className="flex items-center">
                                                <img
                                                  src="../assets/icons/icon-user-blue.svg"
                                                  alt="icon-user"
                                                />
                                                <div className="text-sm 2xl:text-base text-black2 dark:text-gray2 font-medium ml-2 capitalize break-all">
                                                  {first_name} {last_name}
                                                </div>
                                              </div>
                                              <a
                                                href="mailto:christopher@gmail.com"
                                                className="text-sm text-gray3 dark:text-gray2 dark:text-opacity-60"
                                              >
                                                {email}
                                              </a>
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4">
                                              {username}
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4"
                                            >
                                              <div
                                                className="capitalize w-[200px] text-ellipsis whitespace-nowrap overflow-hidden"
                                                title={role && role.title}
                                              >
                                                {role && role.title}
                                              </div>
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4 capitalize"
                                            >
                                              {identification_code
                                                ? identification_code
                                                : "-"}
                                            </td>
                                            <td
                                              width="15%"
                                              className="px-4 xl:px-8 py-4 capitalize"
                                            >
                                              {support_availability_status}
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4 capitalize"
                                            >
                                              {status}
                                            </td>
                                            <td
                                              width="10%"
                                              className="px-4 xl:px-8 py-4 text-sm whitespace-nowrap"
                                            >
                                              {created_at}
                                            </td>
                                            <td
                                              width="15%"
                                              className="px-4 xl:px-8 py-4"
                                            >
                                              <Link
                                                to={`/edit-user/${id}`}
                                                exact={true}
                                                className="text-primary underline text-base whitespace-nowrap"
                                              >
                                                View User Profile
                                              </Link>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <ListDataNotFound
                                      colSpan={8}
                                      searchQuery={searchQuery}
                                      listLength={
                                        inActiveUsers && inActiveUsers.length
                                      }
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
                          {inActiveUsersLoading ? (
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
                                inActiveUsersPagination &&
                                inActiveUsersPagination.per_page
                              }
                              handlePageClick={handlePageClick}
                              pageCount={
                                inActiveUsersPagination &&
                                Math.ceil(
                                  inActiveUsersPagination.total_entries /
                                  inActiveUsersPagination.per_page,
                                )
                              }
                              current_page={
                                inActiveUsersPagination &&
                                inActiveUsersPagination.current_page
                              }
                              totalEntries={
                                inActiveUsersPagination &&
                                inActiveUsersPagination.total_entries
                              }
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          {/* Users Table : End */}
        </section>
      </Layout>
    </>
  );
};
export default Users;
