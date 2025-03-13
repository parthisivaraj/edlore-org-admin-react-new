import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from '../../layout';
import { Tab } from "@headlessui/react";
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import PaginatedItems from "../../components/common/pagination";
import { changeUserGroupsSearch, deleteUserGroup, getActiveUserGroups, getAllUserGroups, getInActiveUserGroups } from '../../redux/reduxes/userGroups/userGroupsAction';
import DeleteModal from "../../components/common/deleteModal";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import ListDataNotFound from "../../components/common/listDataNotFound";
import PermissionsMessage from "../../components/common/permissionsMessage";


// Tabs
const tabs = [
  { title: 'All' },
  { title: 'Active' },
  { title: 'Inactive' }
]


const UserGroups = () => {
  const dispatch = useDispatch();

  // States
  const [activeTab, setActiveTab] = useState(0);
  const [delayLoading, setDelayLoading] = useState(false);

  // Fetch Data
  const userGroupsLoading = useSelector(state => state.user_groups.allUserGroupsLoading);
  const userGroupsList = useSelector(state => state.user_groups.userGroupsList);
  const userGroupsPagination = useSelector(state => state.user_groups.allUserGroupsPagination);
  const activeUserGroupsLoading = useSelector(state => state.user_groups.activeUserGroupsLoading);
  const activeUserGroupsList = useSelector(state => state.user_groups.activeUserGroupsList);
  const activeUserGroupsPagination = useSelector(state => state.user_groups.activeUserGroupsPagination)
  const inActiveUserGroupsLoading = useSelector(state => state.user_groups.inActiveUserGroupsLoading);
  const inActiveUserGroupsList = useSelector(state => state.user_groups.inActiveUserGroupsList);
  const inActiveUserGroupsPagination = useSelector(state => state.user_groups.inActiveUserGroupsPagination);
  const filters = useSelector(state => state.user_groups.filters);
  const sort = useSelector(state => state.sort);
  const sortByUserGroupName = useSelector(state => state.sort.sortByUserGroupName);
  const sortByUserGroupStatus = useSelector(state => state.sort.sortByUserGroupStatus);
  const sortByUserGroupCreatedDate = useSelector(state => state.sort.sortByUserGroupCreatedDate);
  const permissions = useSelector(state => state.auth.allPermissions);
  const searchQuery = useSelector(state => state.user_groups.searchUserGroupsQuery);
  const deleteUserGroupLoading = useSelector(state => state.user_groups.deleteUserGroupLoading);

  // Dispatch Sort Data
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      paginate: true,
      sort: sortByUserGroupName != 0 ? sortByUserGroupName : sortByUserGroupStatus != 0 ? sortByUserGroupStatus : sortByUserGroupCreatedDate != 0 ? sortByUserGroupCreatedDate : 0,
      sorting: sortByUserGroupName != 0 ? "title" : sortByUserGroupStatus != 0 ? "status" : sortByUserGroupCreatedDate != 0 ? "created_at" : "",
    }
    if (activeTab == 0) {
      delayLoading && dispatch(getAllUserGroups(data));
    } else if (activeTab == 1) {
      delayLoading && dispatch(getActiveUserGroups(data))
    } else if (activeTab == 2) {
      delayLoading && dispatch(getInActiveUserGroups(data))
    }
  }, [sort]);


  // Dispatch All the Sort
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      paginate: true,
      sort: sortByUserGroupName != 0 ? sortByUserGroupName : sortByUserGroupStatus != 0 ? sortByUserGroupStatus : sortByUserGroupCreatedDate != 0 ? sortByUserGroupCreatedDate : 0,
      sorting: sortByUserGroupName != 0 ? "title" : sortByUserGroupStatus != 0 ? "status" : sortByUserGroupCreatedDate != 0 ? "created_at" : "",
    }
    if (activeTab == 0) {
      dispatch(getAllUserGroups(data));
    } else if (activeTab == 1) {
      dispatch(getActiveUserGroups(data))
    } else if (activeTab == 2) {
      dispatch(getInActiveUserGroups(data))
    }
    setTimeout(function () {
      setDelayLoading(true)
    }, 1000)
  }, []);

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      paginate: true,
      sort: sortByUserGroupName != 0 ? sortByUserGroupName : sortByUserGroupStatus != 0 ? sortByUserGroupStatus : sortByUserGroupCreatedDate != 0 ? sortByUserGroupCreatedDate : 0,
      sorting: sortByUserGroupName != 0 ? "title" : sortByUserGroupStatus != 0 ? "status" : sortByUserGroupCreatedDate != 0 ? "created_at" : "",
    }
    if (activeTab == 0) {
      dispatch(getAllUserGroups(data));
    } else if (activeTab == 1) {
      dispatch(getActiveUserGroups(data))
    } else if (activeTab == 2) {
      dispatch(getInActiveUserGroups(data))
    }
  }, [searchQuery])

  // Search User Groups
  const handleSearchChange = (searchData) => {
    dispatch(changeUserGroupsSearch(searchData));
  }

  // Tab Change Handler
  const tabChangeHandler = (tab) => {
    setActiveTab(tab);
    const passData = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      paginate: true,
      sort: sortByUserGroupName != 0 ? sortByUserGroupName : sortByUserGroupStatus != 0 ? sortByUserGroupStatus : sortByUserGroupCreatedDate != 0 ? sortByUserGroupCreatedDate : 0,
      sorting: sortByUserGroupName != 0 ? "title" : sortByUserGroupStatus != 0 ? "status" : sortByUserGroupCreatedDate != 0 ? "created_at" : "",
    }
    if (tab == 0) {
      dispatch(getAllUserGroups(passData));
    } else if (tab == 1) {
      dispatch(getActiveUserGroups(passData))
    } else if (tab == 2) {
      dispatch(getInActiveUserGroups(passData))
    }
  }

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      limit: 10,
      filter: filters.selected_filters ? filters.selected_filters : {},
      paginate: true,
      sort: sortByUserGroupName != 0 ? sortByUserGroupName : sortByUserGroupStatus != 0 ? sortByUserGroupStatus : sortByUserGroupCreatedDate != 0 ? sortByUserGroupCreatedDate : 0,
      sorting: sortByUserGroupName != 0 ? "title" : sortByUserGroupStatus != 0 ? "status" : sortByUserGroupCreatedDate != 0 ? "created_at" : "",
    }
    if (activeTab == 0) {
      dispatch(getAllUserGroups(data));
    } else if (activeTab == 1) {
      dispatch(getActiveUserGroups(data))
    } else if (activeTab == 2) {
      dispatch(getInActiveUserGroups(data))
    }
  }

  // Delete User Group
  const [deleteUserGroupModal, setDeleteUserGroupModal] = useState(false);
  const [deleteUserGroupId, setDeleteUserGroupId] = useState(null);
  const [deleteUserGroupTitle, setDeleteUserGroupTitle] = useState("");

  const confirmDeleteUserGroup = (stat, id, title) => {
    setDeleteUserGroupModal(stat);
    setDeleteUserGroupId(id);
    setDeleteUserGroupTitle(title);
  }

  // User Group Sorting
  const handleChangeSort = (v, n) => {
    const getSort = (x) => {
      let sort = 0;
      if (x == 0 || x == 1) {
        sort = v + 1
      } else {
        sort = 0;
      }
      return sort;
    }
    const data = {
      name: n,
      sort: getSort(v)
    };
    dispatch(updateSort(data))
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Groups</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img src="../assets/icons/icon-users.svg" alt="icon-user" className="w-[14px] h-[14px] invert dark:invert-0 opacity-70" />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">User Controls /</span>
                  <span className="ml-1 text-xs text-secondary font-semibold">All User Groups</span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">User Groups</h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                {((permissions.includes("all_group") || permissions.includes("write_group") || permissions.includes("Admin")) &&
                  (permissions.includes("all_user") || permissions.includes("read_user") || permissions.includes("Admin"))) &&
                  <Link to="/add-user-group" exact={true} className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full drop-shadow-sm px-5 py-2.5 transition-all hover:bg-transparent hover:text-secondary hover:transition-all">
                    Add New User Group +
                  </Link>
                }
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* User Groups Table : Start */}
          <div className="grid grid-cols-1">
            <Tab.Group
              onChange={(index) => {
                tabChangeHandler(index);
              }}
            >
              <Tab.List className="flex flex-row items-center mb-6">
                {tabs.map((tab, index) => {
                  const { title } = tab;

                  return (
                    <Tab
                      key={index}
                      className={({ selected }) =>
                        selected ?
                          'md:text-lg 2xl:text-xl text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-5 xl:mr-10 focus:outline-none focus-visible:ring-0'
                          :
                          'md:text-lg 2xl:text-xl text-black2 dark:text-gray2 opacity-50 font-bold border-b-4 border-transparent mr-5 xl:mr-10 transition-all hover:opacity-100 hover:transition-all focus:outline-none focus-visible:ring-0'
                      }
                    >
                      {title}
                      {() => setActiveTab(title)}

                    </Tab>
                  )
                })}

                {/* Search Bar */}
                {(permissions.includes("all_group") || permissions.includes("read_group") || permissions.includes("Admin")) &&
                  <div className="w-[300px] xl:w-[400px] relative overflow-hidden mx-3">
                    <input
                      type="search"
                      className="w-full bg-gray dark:bg-darkMainBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                      name="user_search"
                      id="user_search"
                      placeholder="Search User Groups..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <div className="absolute top-3.5 right-5 block m-auto">
                      <img src="../assets/icons/icon-search.svg" alt="icon-search" className="w-4 h-4 block m-auto dark:invert" />
                    </div>
                  </div>
                }
              </Tab.List>


              <Tab.Panels>
                {/* All User Groups Tab */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-darkBg  border border-gray2 dark:border-black1 rounded-3xl py-8 drop-shadow-md">
                    {!(permissions.includes("all_group") || permissions.includes("read_group") || permissions.includes("Admin")) ?
                      <PermissionsMessage
                        additionalClassName="h-[65vh] p-20"
                        title="User Groups"
                        message="read user group"
                      />
                      :
                      <>
                        <div className="w-full min-h-[500px] h-full 2xl:h-[600px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                          <table className="table-auto text-left relative min-w-full max-h-full">
                            <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                              <tr>
                                <th onClick={() => handleChangeSort(sortByUserGroupName, "sortByUserGroupName")} scope="col" width="25%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className={sortByUserGroupName == 1 || sortByUserGroupName == 2 ? "text-primary" : ""}>Group Name</span>
                                    {sortByUserGroupName == 1 ?
                                      <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                      : sortByUserGroupName == 2 ?
                                        <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                        :
                                        <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                    }
                                  </div>
                                </th>
                                <th scope="col" width="25%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  Group Description
                                </th>
                                <th scope="col" width="15%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  Total Members
                                </th>
                                <th onClick={() => handleChangeSort(sortByUserGroupStatus, "sortByUserGroupStatus")} scope="col" width="10%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className={sortByUserGroupStatus == 1 || sortByUserGroupStatus == 2 ? "text-primary" : ""}>Status</span>
                                    {sortByUserGroupStatus == 1 ?
                                      <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                      : sortByUserGroupStatus == 2 ?
                                        <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                        :
                                        <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                    }
                                  </div>
                                </th>
                                <th onClick={() => handleChangeSort(sortByUserGroupCreatedDate, "sortByUserGroupCreatedDate")} scope="col" width="10%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className={sortByUserGroupCreatedDate == 1 || sortByUserGroupCreatedDate == 2 ? "text-primary" : ""}>Created On</span>
                                    {sortByUserGroupCreatedDate == 1 ?
                                      <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                      : sortByUserGroupCreatedDate == 2 ?
                                        <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                        :
                                        <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                    }
                                  </div>
                                </th>
                                <th scope="col" width="15%" className="px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  {(permissions.includes("all_group") || permissions.includes("update_group") || permissions.includes("Admin")) &&
                                    <span>Actions</span>
                                  }
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {userGroupsLoading ?
                                <tr>
                                  <td colSpan="6" width="100%" >
                                    <Skeleton
                                      count={10}
                                      height={50}
                                      baseColor="#f5f5f5"
                                      highlightColor='#e1e1e1'
                                      borderRadius="0"
                                      enableAnimation="true"
                                      duration={2.5}
                                      inline={true}
                                      className="dark:bg-darkMainBg"
                                    />
                                  </td>
                                </tr>
                                :
                                <>
                                  {userGroupsList && userGroupsList.length > 0 ?
                                    <>
                                      {
                                        userGroupsList.map((user, index) => {
                                          const { id, title, description, user_count, status, created_at } = user;

                                          return (
                                            <tr valign="top" className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300" key={id}>
                                              <td width="25%" className="px-4 xl:px-8 py-4 text-sm 2xl:text-base font-medium capitalize max-w-[250px] 2xl:max-w-[400px] text-ellipsis whitespace-nowrap overflow-hidden" title={title}>{title}</td>
                                              <td width="25%" className="px-4 xl:px-8 py-4 first-letter:capitalize">{description} </td>
                                              <td width="15%" className="px-4 xl:px-8 py-4">{user_count}</td>
                                              <td width="10%" className="px-4 xl:px-8 py-4 capitalize"> {status} </td>
                                              <td width="10%" className="px-4 xl:px-8 py-4 text-sm whitespace-nowrap"> {created_at} </td>
                                              <td width="15%" className="px-8 py-4">
                                                <div className="inline whitespace-nowrap">
                                                  {(permissions.includes("all_group") || (permissions.includes("update_group") && permissions.includes("read_user")) || permissions.includes("Admin")) &&
                                                    <Link to={`/edit-user-group/${id}`} exact={true} className="text-primary opacity-75 hover:opacity-100 underline text-sm transition-all hover:transition-all">
                                                      Manage Group
                                                    </Link>
                                                  }

                                                  {(permissions.includes("all_group") || permissions.includes("delete_group") || permissions.includes("Admin")) &&
                                                    <button type="button" onClick={() => confirmDeleteUserGroup(true, id, title)} className="ml-4" title="Delete">
                                                      <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert transition-all dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all" />
                                                    </button>
                                                  }
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        }
                                        )}
                                    </>
                                    :
                                    <ListDataNotFound
                                      colSpan={6}
                                      searchQuery={searchQuery}
                                      listLength={userGroupsList && userGroupsList.length}
                                      filters={[]}
                                    />
                                  }
                                </>
                              }
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-end mt-8 px-4">
                          {userGroupsLoading ?
                            <Skeleton
                              count={1}
                              width={200}
                              height={40}
                              baseColor="#f5f5f5"
                              highlightColor='#e1e1e1'
                              borderRadius="30"
                              enableAnimation="true"
                              duration={2.5}
                              inline={true}
                              className=" dark:bg-darkMainBg"
                            />
                            :
                            <PaginatedItems
                              itemsPerPage={userGroupsPagination && userGroupsPagination.per_page}
                              handlePageClick={handlePageClick}
                              pageCount={userGroupsPagination && Math.ceil(userGroupsPagination.total_entries / userGroupsPagination.per_page)}
                              current_page={userGroupsPagination && userGroupsPagination.current_page}
                              totalEntries={userGroupsPagination && userGroupsPagination.total_entries}
                            />
                          }
                        </div>
                      </>
                    }
                  </div>
                </Tab.Panel>


                {/* Active User Groups Tab */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-darkBg  border border-gray2 dark:border-black1 rounded-3xl py-8 drop-shadow-md">
                    {!(permissions.includes("all_group") || permissions.includes("read_group") || permissions.includes("Admin")) ?
                      <PermissionsMessage
                        additionalClassName="h-[65vh] p-20"
                        title="User Groups"
                        message="read user group"
                      />
                      :
                      <>
                        <div className="w-full min-h-[500px] h-full 2xl:h-[600px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                          <table className="table-auto text-left relative min-w-full max-h-full">
                            <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                              <tr>
                                <th onClick={() => handleChangeSort(sortByUserGroupName, "sortByUserGroupName")} scope="col" width="25%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className={sortByUserGroupName == 1 || sortByUserGroupName == 2 ? "text-primary" : ""}>Group Name</span>
                                    {sortByUserGroupName == 1 ?
                                      <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                      : sortByUserGroupName == 2 ?
                                        <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                        :
                                        <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                    }
                                  </div>
                                </th>
                                <th scope="col" width="25%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  Group Description
                                </th>
                                <th scope="col" width="15%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  Total Members
                                </th>
                                <th onClick={() => handleChangeSort(sortByUserGroupStatus, "sortByUserGroupStatus")} scope="col" width="10%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className={sortByUserGroupStatus == 1 || sortByUserGroupStatus == 2 ? "text-primary" : ""}>Status</span>
                                    {sortByUserGroupStatus == 1 ?
                                      <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                      : sortByUserGroupStatus == 2 ?
                                        <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                        :
                                        <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                    }
                                  </div>
                                </th>
                                <th onClick={() => handleChangeSort(sortByUserGroupCreatedDate, "sortByUserGroupCreatedDate")} scope="col" width="10%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className={sortByUserGroupCreatedDate == 1 || sortByUserGroupCreatedDate == 2 ? "text-primary" : ""}>Created On</span>
                                    {sortByUserGroupCreatedDate == 1 ?
                                      <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                      : sortByUserGroupCreatedDate == 2 ?
                                        <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                        :
                                        <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                    }
                                  </div>
                                </th>
                                <th scope="col" width="15%" className="px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  {(permissions.includes("all_group") || permissions.includes("update_group") || permissions.includes("Admin")) &&
                                    <span>Actions</span>
                                  }
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {activeUserGroupsLoading ?
                                <tr>
                                  <td colSpan="6" width="100%" >
                                    <Skeleton
                                      count={10}
                                      height={50}
                                      baseColor="#f5f5f5"
                                      highlightColor='#e1e1e1'
                                      borderRadius="0"
                                      enableAnimation="true"
                                      duration={2.5}
                                      inline={true}
                                      className="dark:bg-darkMainBg"
                                    />
                                  </td>
                                </tr>
                                :
                                <>
                                  {activeUserGroupsList && activeUserGroupsList.length > 0 ?
                                    <>
                                      {
                                        activeUserGroupsList.map((user, index) => {
                                          const { id, title, description, user_count, status, created_at } = user;

                                          return (
                                            <tr valign="top" className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300" key={id}>
                                              <td width="25%" className="px-4 xl:px-8 py-4 text-sm 2xl:text-base font-medium capitalize max-w-[250px] 2xl:max-w-[400px] text-ellipsis whitespace-nowrap overflow-hidden" title={title}>{title}</td>
                                              <td width="25%" className="px-4 xl:px-8 py-4 first-letter:capitalize">{description} </td>
                                              <td width="15%" className="px-4 xl:px-8 py-4">{user_count}</td>
                                              <td width="10%" className="px-4 xl:px-8 py-4 capitalize"> {status} </td>
                                              <td width="10%" className="px-4 xl:px-8 py-4 text-sm "> {created_at} </td>
                                              <td width="15%" className="px-8 py-4">
                                                <div className="inline whitespace-nowrap">
                                                  {(permissions.includes("all_group") || (permissions.includes("update_group") && permissions.includes("read_user")) || permissions.includes("Admin")) &&
                                                    <Link to={`/edit-user-group/${id}`} exact={true} className="text-primary opacity-75 hover:opacity-100 underline text-sm transition-all hover:transition-all">
                                                      Manage Group
                                                    </Link>
                                                  }

                                                  {(permissions.includes("all_group") || permissions.includes("delete_group") || permissions.includes("Admin")) &&
                                                    <button type="button" onClick={() => confirmDeleteUserGroup(true, id, title)} className="ml-4" title="Delete">
                                                      <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="min-w-4 min-h-4 w-4 h-4 dark:invert transition-all dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all" />
                                                    </button>
                                                  }
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        }
                                        )}
                                    </>
                                    :
                                    <ListDataNotFound
                                      colSpan={6}
                                      searchQuery={searchQuery}
                                      listLength={activeUserGroupsList && activeUserGroupsList.length}
                                      filters={[]}
                                    />
                                  }
                                </>
                              }
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-end mt-8 px-4">
                          {activeUserGroupsLoading ?
                            <Skeleton
                              count={1}
                              width={200}
                              height={40}
                              baseColor="#f5f5f5"
                              highlightColor='#e1e1e1'
                              borderRadius="30"
                              enableAnimation="true"
                              duration={2.5}
                              inline={true}
                              className=" dark:bg-darkMainBg"
                            />
                            :
                            <PaginatedItems
                              itemsPerPage={activeUserGroupsPagination && activeUserGroupsPagination.per_page}
                              handlePageClick={handlePageClick}
                              pageCount={activeUserGroupsPagination && Math.ceil(activeUserGroupsPagination.total_entries / activeUserGroupsPagination.per_page)}
                              current_page={activeUserGroupsPagination && activeUserGroupsPagination.current_page}
                              totalEntries={activeUserGroupsPagination && activeUserGroupsPagination.total_entries}
                            />
                          }
                        </div>
                      </>
                    }
                  </div>
                </Tab.Panel>

                {/* InActive User Groups Tab */}
                <Tab.Panel>
                  <div className="bg-white dark:bg-darkBg  border border-gray2 dark:border-black1 rounded-3xl py-8 drop-shadow-md">
                    {!(permissions.includes("all_group") || permissions.includes("read_group") || permissions.includes("Admin")) ?
                      <PermissionsMessage
                        additionalClassName="h-[65vh] p-20"
                        title="User Groups"
                        message="read user group"
                      />
                      :
                      <>
                        <div className="w-full min-h-[500px] h-full 2xl:h-[600px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                          <table className="table-auto text-left relative min-w-full max-h-full">
                            <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                              <tr>
                                <th onClick={() => handleChangeSort(sortByUserGroupName, "sortByUserGroupName")} scope="col" width="25%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className={sortByUserGroupName == 1 || sortByUserGroupName == 2 ? "text-primary" : ""}>Group Name</span>
                                    {sortByUserGroupName == 1 ?
                                      <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                      : sortByUserGroupName == 2 ?
                                        <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                        :
                                        <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                    }
                                  </div>
                                </th>
                                <th scope="col" width="25%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  Group Description
                                </th>
                                <th scope="col" width="15%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  Total Members
                                </th>
                                <th onClick={() => handleChangeSort(sortByUserGroupStatus, "sortByUserGroupStatus")} scope="col" width="10%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className={sortByUserGroupStatus == 1 || sortByUserGroupStatus == 2 ? "text-primary" : ""}>Status</span>
                                    {sortByUserGroupStatus == 1 ?
                                      <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                      : sortByUserGroupStatus == 2 ?
                                        <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                        :
                                        <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                    }
                                  </div>
                                </th>
                                <th onClick={() => handleChangeSort(sortByUserGroupCreatedDate, "sortByUserGroupCreatedDate")} scope="col" width="10%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  <div className="flex items-center">
                                    <span className={sortByUserGroupCreatedDate == 1 || sortByUserGroupCreatedDate == 2 ? "text-primary" : ""}>Created On</span>
                                    {sortByUserGroupCreatedDate == 1 ?
                                      <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                      : sortByUserGroupCreatedDate == 2 ?
                                        <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                        :
                                        <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                                    }
                                  </div>
                                </th>
                                <th scope="col" width="15%" className="px-8 py-4 text-sm uppercase whitespace-nowrap">
                                  {(permissions.includes("all_group") || permissions.includes("update_group") || permissions.includes("Admin")) &&
                                    <span>Actions</span>
                                  }
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {inActiveUserGroupsLoading ?
                                <tr>
                                  <td colSpan="6" width="100%" >
                                    <Skeleton
                                      count={10}
                                      height={50}
                                      baseColor="#f5f5f5"
                                      highlightColor='#e1e1e1'
                                      borderRadius="0"
                                      enableAnimation="true"
                                      duration={2.5}
                                      inline={true}
                                      className="dark:bg-darkMainBg"
                                    />
                                  </td>
                                </tr>
                                :
                                <>
                                  {inActiveUserGroupsList && inActiveUserGroupsList.length > 0 ?
                                    <>
                                      {
                                        inActiveUserGroupsList.map((user, index) => {
                                          const { id, title, description, user_count, status, created_at } = user;

                                          return (
                                            <tr valign="top" className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300" key={id}>
                                              <td width="25%" className="px-4 xl:px-8 py-4 text-sm 2xl:text-base font-medium capitalize max-w-[250px] 2xl:max-w-[400px] text-ellipsis whitespace-nowrap overflow-hidden" title={title}>{title}</td>
                                              <td width="25%" className="px-4 xl:px-8 py-4 first-letter:capitalize">{description} </td>
                                              <td width="10%" className="px-4 xl:px-8 py-4">{user_count}</td>
                                              <td width="10%" className="px-4 xl:px-8 py-4 capitalize"> {status} </td>
                                              <td width="10%" className="px-4 xl:px-8 py-4 text-sm ">{created_at}</td>
                                              <td width="20%" className="px-8 py-4">
                                                <div className="inline whitespace-nowrap">
                                                  {(permissions.includes("all_group") || (permissions.includes("update_group") && permissions.includes("read_user")) || permissions.includes("Admin")) &&
                                                    <Link to={`/edit-user-group/${id}`} exact={true} className="text-primary opacity-75 hover:opacity-100 underline text-sm  transition-all hover:transition-all">
                                                      Manage Group
                                                    </Link>
                                                  }

                                                  {(permissions.includes("all_group") || permissions.includes("delete_group") || permissions.includes("Admin")) &&
                                                    <button type="button" onClick={() => confirmDeleteUserGroup(true, id, title)} className="ml-4" title="Delete">
                                                      <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="min-w-4 min-h-4 w-4 h-4 dark:invert transition-all dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all" />
                                                    </button>
                                                  }
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        }
                                        )}
                                    </>
                                    :
                                    <ListDataNotFound
                                      colSpan={6}
                                      searchQuery={searchQuery}
                                      listLength={inActiveUserGroupsList && inActiveUserGroupsList.length}
                                      filters={[]}
                                    />
                                  }
                                </>
                              }
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-end mt-8 px-4">
                          {inActiveUserGroupsLoading ?
                            <Skeleton
                              count={1}
                              width={200}
                              height={40}
                              baseColor="#f5f5f5"
                              highlightColor='#e1e1e1'
                              borderRadius="30"
                              enableAnimation="true"
                              duration={2.5}
                              inline={true}
                              className=" dark:bg-darkMainBg"
                            />
                            :
                            <PaginatedItems
                              itemsPerPage={inActiveUserGroupsPagination && inActiveUserGroupsPagination.per_page}
                              handlePageClick={handlePageClick}
                              pageCount={inActiveUserGroupsPagination && Math.ceil(inActiveUserGroupsPagination.total_entries / inActiveUserGroupsPagination.per_page)}
                              current_page={inActiveUserGroupsPagination && inActiveUserGroupsPagination.current_page}
                              totalEntries={inActiveUserGroupsPagination && inActiveUserGroupsPagination.total_entries}
                            />
                          }
                        </div>
                      </>
                    }
                  </div>
                </Tab.Panel>

              </Tab.Panels>
            </Tab.Group>
          </div>
          {/* User Groups Table : End */}

          {/* Delete Confirmation Modal */}
          {deleteUserGroup &&
            <DeleteModal
              head="Remove User Group"
              body={["Are you sure you want to remove", <strong className="capitalize break-all"> "{deleteUserGroupTitle}" </strong>, "User Group from the list?"]}
              deleteAction={deleteUserGroup}
              modalAction={setDeleteUserGroupModal}
              modalValue={deleteUserGroupModal}
              parentmodel={false}
              id={deleteUserGroupId}
              deleteLoading={deleteUserGroupLoading}
            />
          }

        </section>
      </Layout>
    </>
  )
}
export default UserGroups;