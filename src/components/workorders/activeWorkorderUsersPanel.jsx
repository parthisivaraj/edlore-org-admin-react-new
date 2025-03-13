import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from 'react-loading-skeleton';
import PaginatedItems from "../../components/common/pagination";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import { changeActiveWorkorderUserStatus, changeActiveWOUsersSearch, getAllActiveWorkorderUsers } from "../../redux/reduxes/workorders/workorderAction";
import ListDataNotFound from "../common/listDataNotFound";
import Filters from "../common/filters";
import AppliedFilters from "../common/appliedFilters";

const ActiveWorkorderUsersPanel = ({ wo_id, activeTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const activeUsersLoading = useSelector(state => state.workorders.activeWorkorderUsersLoading);
  const activeUsers = useSelector(state => state.workorders.activeWorkorderUsersList);
  const pagination = useSelector(state => state.workorders.activeWorkorderUsersPagination);
  const filters = useSelector(state => state.workorders.activeWorkorderUsersFilters);
  const sort = useSelector(state => state.sort);
  const sortByActiveWOUserId = useSelector(state => state.sort.sortByActiveWOUserId);
  const sortByActiveWOUserName = useSelector(state => state.sort.sortByActiveWOUserName);
  const activeWorkorderEnrolledUser = useSelector(state => state.workorders.activeWorkorderEnrolledUser);
  const permissions = useSelector(state => state.auth.allPermissions);
  const searchQuery = useSelector(state => state.workorders.searchActiveWOUsersQuery);

  const [delayLoading, setDelayLoading] = useState(false);

  // State
  const [state, setState] = useState({
    user_status: "user_assigned",
  });

  // Handle Change Status
  const handleChangeStatusEvent = (event, id,) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));

    const data = {
      id: wo_id,
      assign: event.target.value == "user_assigned" ? true : false,
      user_id: id,
    }
    if (activeTab === 2) {
      dispatch(changeActiveWorkorderUserStatus(data));
    }
  }


  // Dispatch to Active WO Users
  useEffect(() => {
    const data = {
      id: wo_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      paginate: true,
      filter: {},
      sort: sortByActiveWOUserId != 0 ? sortByActiveWOUserId : sortByActiveWOUserName != 0 ? sortByActiveWOUserName : 0,
      sorting: sortByActiveWOUserId != 0 ? "user_id" : sortByActiveWOUserName != 0 ? "first_name" : "",
    }
    delayLoading && dispatch(getAllActiveWorkorderUsers(data))
  }, [sort])

  // Dispatch All
  useEffect(() => {
    const data = {
      id: wo_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      paginate: true,
      filter: {},
      sort: sortByActiveWOUserId != 0 ? sortByActiveWOUserId : sortByActiveWOUserName != 0 ? sortByActiveWOUserName : 0,
      sorting: sortByActiveWOUserId != 0 ? "user_id" : sortByActiveWOUserName != 0 ? "first_name" : "",
    }
    if (activeTab === 2) {
      dispatch(getAllActiveWorkorderUsers(data));
      setTimeout(function () {
        setDelayLoading(true);
      }, [1000]);
    }
  }, []);

  // Search Query
  useEffect(() => {
    const data = {
      id: wo_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      paginate: true,
      sort: sortByActiveWOUserId != 0 ? sortByActiveWOUserId : sortByActiveWOUserName != 0 ? sortByActiveWOUserName : 0,
      sorting: sortByActiveWOUserId != 0 ? "user_id" : sortByActiveWOUserName != 0 ? "first_name" : "",
    }
    if (activeTab === 2) {
      dispatch(getAllActiveWorkorderUsers(data))
    }
  }, [searchQuery])

  // Search Users
  const handleSearchChange = (searchData) => {
    dispatch(changeActiveWOUsersSearch(searchData));
  }

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      id: wo_id,
      search: searchQuery,
      page: e.selected,
      limit: 10,
      filter: filters && filters.selected_filters ? filters && filters.selected_filters : {},
      paginate: true,
      sort: sortByActiveWOUserId != 0 ? sortByActiveWOUserId : sortByActiveWOUserName != 0 ? sortByActiveWOUserName : 0,
      sorting: sortByActiveWOUserId != 0 ? "user_id" : sortByActiveWOUserName != 0 ? "first_name" : "",
    }
    if (activeTab === 2) {
      dispatch(getAllActiveWorkorderUsers(data));
    }
  }

  // Dispatch Sorting
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
    }
    dispatch(updateSort(data));
  }

  return (
    <>
      <Tab.Panel>
        <div className="bg-white dark:bg-darkBg  border border-gray2 dark:border-black1 rounded-3xl py-8 drop-shadow-md">
          {/* Search Bar and Filters */}
          <div className="flex items-center justify-between mb-8 px-5 xl:px-8">
            <div className="w-[300px] xl:w-[400px] relative overflow-hidden">
              <input
                type="search"
                className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 text-sm px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                name="workorders_search"
                id="workorders_search"
                placeholder="Search for Active Work Order Users..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <div className="block absolute top-3 right-3 m-auto focus-visible:outline-none">
                <img src="../assets/icons/icon-search.svg" alt="icon-search" className="w-4 h-4 block m-auto dark:invert" />
              </div>
            </div>

            {/* Filters : Start */}
            <Filters
              id={wo_id}
              filters={filters}
              getListAction={getAllActiveWorkorderUsers}
              page={0}
              limit={10}
              search={searchQuery}
              sort={sortByActiveWOUserId != 0 ? sortByActiveWOUserId : sortByActiveWOUserName != 0 ? sortByActiveWOUserName : 0}
              sorting={sortByActiveWOUserId != 0 ? "user_id" : sortByActiveWOUserName != 0 ? "first_name" : ""}
            />
          </div>

          {/* Applied Filters */}
          <div className="my-5 px-8">
            <AppliedFilters
              id={wo_id}
              filters={filters}
              getActionList={getAllActiveWorkorderUsers}
              page={0}
              limit={10}
              search={searchQuery}
              sort={sortByActiveWOUserId != 0 ? sortByActiveWOUserId : sortByActiveWOUserName != 0 ? sortByActiveWOUserName : 0}
              sorting={sortByActiveWOUserId != 0 ? "user_id" : sortByActiveWOUserName != 0 ? "first_name" : ""}
            />
          </div>

          {/* Active WO Users Table List */}
          <div className="w-full h-[550px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
            <table className="table-auto text-left relative min-w-full max-h-full">
              <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                <tr>
                  <th onClick={() => handleChangeSort(sortByActiveWOUserId, "sortByActiveWOUserId")} scope="col" width="15%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={sortByActiveWOUserId == 1 || sortByActiveWOUserId == 2 ? "text-primary" : ""}>User ID</span>
                      {sortByActiveWOUserId == 1 ?
                        <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                        : sortByActiveWOUserId == 2 ?
                          <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                          :
                          <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                      }
                    </div>
                  </th>
                  <th onClick={() => handleChangeSort(sortByActiveWOUserName, "sortByActiveWOUserName")} scope="col" width="30%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={sortByActiveWOUserName == 1 || sortByActiveWOUserName == 2 ? "text-primary" : ""}>User Full Name</span>
                      {sortByActiveWOUserName == 1 ?
                        <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                        : sortByActiveWOUserName == 2 ?
                          <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                          :
                          <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                      }
                    </div>
                  </th>
                  <th scope="col" width="20%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">User Role</th>
                  <th scope="col" width="20%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">Support Availability Status</th>
                  <th scope="col" width="15%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                    {(permissions.includes("all_work_order") || permissions.includes("update_work_order") || permissions.includes("Admin")) &&
                      <span>Action</span>
                    }
                  </th>
                </tr>
              </thead>

              <tbody>
                {activeUsersLoading ?
                  <tr>
                    <td colSpan="5" width="100%" >
                      <Skeleton
                        count={10}
                        height={75}
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
                    {activeWorkorderEnrolledUser && activeWorkorderEnrolledUser.user_id &&
                      <tr valign="top" className="bg-gray3 bg-opacity-30 border-b border-gray3 dark:border-black3  transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300">
                        <td width="15%" className="px-4 xl:px-8 py-4 text-sm">{activeWorkorderEnrolledUser.user_id && activeWorkorderEnrolledUser.user_id}</td>
                        <td width="30%" className="px-4 xl:px-8 py-4">
                          <div className="flex items-center">
                            <img src="../assets/icons/icon-user-blue.svg" alt="icon-user" />
                            <div className="text-sm 2xl:text-base text-black2 dark:text-gray2 font-medium ml-2 capitalize break-all">{activeWorkorderEnrolledUser.full_name && activeWorkorderEnrolledUser.full_name}</div>
                          </div>
                          <a href="mailto:christopher@gmail.com" className="text-sm text-gray3 dark:text-gray2 dark:text-opacity-60">{activeWorkorderEnrolledUser.email && activeWorkorderEnrolledUser.email}</a>
                        </td>
                        <td width="20%" className="px-4 xl:px-8 py-4">
                          <div className="capitalize w-[200px] text-ellipsis whitespace-nowrap overflow-hidden" >{activeWorkorderEnrolledUser && activeWorkorderEnrolledUser.role && activeWorkorderEnrolledUser.role.title}</div>
                        </td>
                        <td width="20%" className="px-4 xl:px-8 py-4">
                          <div className="capitalize w-[200px] text-ellipsis whitespace-nowrap overflow-hidden" >{activeWorkorderEnrolledUser && activeWorkorderEnrolledUser.role && activeWorkorderEnrolledUser.support_availability_status}</div>
                        </td>
                        <td width="15%" className="px-4 xl:px-8 py-4">
                          {(permissions.includes("all_work_order") || permissions.includes("update_work_order") || permissions.includes("Admin")) &&
                            <select
                              name="user_status"
                              id="user_status"
                              onChange={(e) => handleChangeStatusEvent(e, activeWorkorderEnrolledUser.id && activeWorkorderEnrolledUser.id)}
                              className="ed-form__select appearance-none relative min-w-[150px] h-[38px] text-sm dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-lg py-1 px-4 mt-1 focus:border-secondary focus:outline-none"
                            >
                              <option defaultValue disabled>Select</option>
                              <option value="user_assigned" >Assigned</option>
                              <option value="user_view" >View</option>
                            </select>
                          }
                        </td>
                      </tr>
                    }

                    {activeUsers && activeUsers.length > 0 ?
                      <>
                        {activeUsers && activeUsers.map((user, index) => {
                          const { id, user_id, first_name, last_name, email, role, support_availability_status } = user;

                          return (
                            <tr valign="top" className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300" key={id}>
                              <td width="15%" className="px-4 xl:px-8 py-4 text-sm">{user_id}</td>
                              <td width="30%" className="px-4 xl:px-8 py-4">
                                <div className="flex items-center">
                                  <img src="../assets/icons/icon-user-blue.svg" alt="icon-user" />
                                  <div className="text-sm 2xl:text-base text-black2 dark:text-gray2 font-medium ml-2 capitalize break-all">{first_name} {last_name}</div>
                                </div>
                                <a href="mailto:christopher@gmail.com" className="text-sm text-gray3 dark:text-gray2 dark:text-opacity-60">{email}</a>
                              </td>
                              <td width="20%" className="px-4 xl:px-8 py-4">
                                <div className="capitalize w-[200px] text-ellipsis whitespace-nowrap overflow-hidden" title={role && role.title}>{role && role.title}</div>
                              </td>
                              <td width="20%" className="px-4 xl:px-8 py-4">
                                <div className="capitalize w-[200px] text-ellipsis whitespace-nowrap overflow-hidden" >{support_availability_status}</div>
                              </td>
                              <td width="15%" className="px-4 xl:px-8 py-4">
                                {(permissions.includes("all_work_order") || permissions.includes("update_work_order") || permissions.includes("Admin")) &&
                                  <select
                                    name="user_status"
                                    id="user_status"
                                    onChange={(e) => handleChangeStatusEvent(e, id)}
                                    className="ed-form__select appearance-none relative min-w-[150px] h-[38px] text-sm dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-lg py-1 px-4 mt-1 focus:border-secondary focus:outline-none"
                                  >
                                    <option defaultValue disabled>Select</option>
                                    <option value="user_view" >View</option>
                                    <option value="user_assigned" >Assigned</option>
                                  </select>
                                }
                              </td>
                            </tr>
                          )
                        }
                        )}
                      </>
                      :
                      <ListDataNotFound
                        colSpan={5}
                        searchQuery={searchQuery}
                        listLength={activeUsers && activeUsers.length}
                        filters={filters}
                      />
                    }
                  </>
                }
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-8 px-4">
            {activeUsersLoading ?
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
                itemsPerPage={pagination && pagination.per_page}
                handlePageClick={handlePageClick}
                pageCount={pagination && Math.ceil(pagination.total_entries / pagination.per_page)}
                current_page={pagination && pagination.current_page}
                totalEntries={pagination && pagination.total_entries}
              />
            }
          </div>
        </div>
      </Tab.Panel>
    </>
  )
}
export default ActiveWorkorderUsersPanel;