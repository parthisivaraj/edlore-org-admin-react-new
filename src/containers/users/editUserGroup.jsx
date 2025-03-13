import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  updateUserGroup,
  userGroupDetails,
  resetUserGroupErrors,
  selectedUsersOfGroup,
} from "../../redux/reduxes/userGroups/userGroupsAction";
import Filters from "../../components/common/filters";
import PaginatedItems from "../../components/common/pagination";
import AppliedFilters from "../../components/common/appliedFilters";

const EditUserGroup = (props) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();

  // Fetch Data
  const usersLoading = useSelector((state) => state.users.loading);
  const details = useSelector((state) => state.user_groups.userGroupDetails);
  const filters = useSelector((state) => state.user_groups.groupUserFilter);
  const pagination = useSelector(
    (state) => state.user_groups.groupUserPagination,
  );
  const updateUserGroupLoading = useSelector(
    (state) => state.user_groups.updateUserGroupLoading,
  );
  const addUserGroupError = useSelector(
    (state) => state.user_groups.addUserGroupError,
  );
  const users = useSelector((state) => state.user_groups.theUsers);

  // Dispatch User Groups and Users
  useEffect(() => {
    const data = {
      search: "",
      page: 0,
      limit: 10,
      id: id,
      filter: {},
      sort: "",
      sorting: "",
      paginate: true,
    };
    const userData = {
      group_id: id,
    };
    // dispatch(getAllUserGroups(data));
    dispatch(userGroupDetails(data));
    // dispatch(getUsers(data));
    dispatch(resetUserGroupErrors());
    dispatch(selectedUsersOfGroup(data));
  }, []);

  // Users Search Handler
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (searchData) => {
    setSearchQuery(searchData);
    const data = {
      search: searchData,
      id: id,
      page: 0,
      limit: 10,
      filter: {},
      sort: "",
      sorting: "",
      paginate: true,
    };
    dispatch(selectedUsersOfGroup(data));
  };

  // Filters
  const [filtersApplied, setFiltersApplied] = useState(false);
  useEffect(() => {
    filters &&
      filters.selected_filters &&
      Object.keys(filters.selected_filters).forEach(function (key) {
        if (filters.selected_filters[key].length > 0) {
          setFiltersApplied(true);
        }
      });
  }, [filters]);

  // States
  const [state, setState] = useState({
    title: "",
    description: "",
    status: "active",
    selectedUserIds: [],
    existingUsersIdsUnchanged: [],
    existingUsers: [],

    errors: {
      title: "",
      description: "",
      selectedUserIds: "",
    },
  });

  // set errrors
  useEffect(() => {
    let errors = state.errors;
    addUserGroupError &&
      addUserGroupError.forEach((error) => {
        switch (error.name) {
          case "title":
            errors.title = error.message;
            break;
          case "status":
            errors.status = error.message;
            break;
          default:
            break;
        }
      });
    if (addUserGroupError.length == 0) {
      errors.title = "";
      errors.status = "";
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [addUserGroupError]);

  // Get User Details
  useEffect(() => {
    let userIds = [];
    details.selected_users &&
      details.selected_users.length > 0 &&
      details.selected_users.forEach((dat) => {
        userIds.push(dat.id);
      });
    setState((prevProps) => ({
      ...prevProps,
      title: details.title,
      status: details.status,
      description: details.description,
      existingUsers: details.selected_users,
      selectedUserIds: userIds,
      existingUsersIdsUnchanged: userIds,
    }));
  }, [details]);

  // Validate Form
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    if (
      state.title === "" ||
      state.title.length > 150 ||
      state.description === "" ||
      state.description == null ||
      (state.selectedUserIds && state.selectedUserIds.length == 0)
    )
      valid = false;
    return valid;
  };

  // Change Handler
  const handleChangeEvent = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case "title":
        errors.title =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Enter User Group Title"
            : value.length > 150
            ? "Group Name shouldn't exceed more than 150 characters"
            : "";
        break;
      case "description":
        errors.description =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Enter User Group Description"
            : "";
        break;
      case "selectedUserIds":
        errors.selectedUserIds =
          state.selectedUserIds.length <= 0 ? "Select atleast one User" : "";
        break;
      default:
        break;
    }
    dispatch(resetUserGroupErrors());
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
  };

  // Select User Handler
  const checkboxHandler = (event) => {
    let errors = state.errors;

    if (event.target.checked) {
      setState((prevProps) => ({
        ...prevProps,
        selectedUserIds: [...state.selectedUserIds, event.target.value],
      }));
    } else {
      setState((prevProps) => ({
        ...prevProps,
        selectedUserIds: state.selectedUserIds.filter(
          (item) => item != event.target.value,
        ),
      }));
    }
    errors.selectedUserIds = "";
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
    dispatch(resetUserGroupErrors());
  };

  // Form Submit
  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    let user_groups_attributes = [];
    state.selectedUserIds.length > 0 &&
      state.selectedUserIds.forEach((theId) => {
        if (state.existingUsersIdsUnchanged.includes(theId)) {
          //these are already existing there...
        } else {
          //newly added
          user_groups_attributes.push({ user_id: theId });
        }
      });
    let difference = state.existingUsersIdsUnchanged.filter(
      (x) => !state.selectedUserIds.includes(x),
    );
    difference.length > 0 &&
      difference.forEach((id) => {
        state.existingUsers.forEach((x) => {
          if (id == x.id) {
            user_groups_attributes.push({ id: x.record_id, _destroy: true });
          }
          return true;
        });
      });

    if (validateForm(state.errors)) {
      const updateData = {
        title: state.title.replace(/\s+/g, " ").trim(),
        description: state.description.replace(/\s+/g, " ").trim(),
        user_groups_attributes: user_groups_attributes,
        status: state.status == "active" || state.status == "Active" ? 1 : 2,
        id: id,
      };
      dispatch(updateUserGroup(updateData));
    } else {
      let errors = state.errors;
      if (state.title === "") {
        errors.title = "Enter User Group Title";
      }
      if (state.description === "" || state.description == null) {
        errors.description = "Enter User Group Description";
      }
      if (state.selectedUserIds && state.selectedUserIds.length == 0) {
        errors.selectedUserIds = "Select atleast one User";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: "",
      page: e.selected,
      limit: 10,
      id: id,
      filter: filters.selected ? filters.selected : {},
      paginate: true,
      sort: "",
      sorting: "",
    };
    dispatch(selectedUsersOfGroup(data));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit User Group</title>
      </Helmet>

      <Layout>
        <section>
          <div>
            <form onSubmit={(e) => handleSubmitEvent(e)}>
              <div className="grid grid-cols-1">
                {/* Breadcrumbs */}
                <div className="flex items-center">
                  <img
                    src="../assets/icons/icon-users.svg"
                    alt="icon-user"
                    className="w-[14px] h-[14px] invert dark:invert-0 opacity-70"
                  />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                    User Controls /
                  </span>
                  <Link
                    to="/user-groups"
                    exact={true}
                    className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"
                  >
                    All User Groups /
                  </Link>
                  <span className="ml-1 text-xs text-secondary font-semibold">
                    Manage User Group
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold mb-6 2xl:mb-10">
                  Manage User Group
                </h1>
              </div>

              <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Update Group Form : Start */}
                <div className="col-start-1">
                  <div className="bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl p-8">
                    <div className="mb-6">
                      <label
                        htmlFor="status"
                        className="text-sm font-medium dark:text-gray2"
                      >
                        Status
                      </label>
                      <div>
                        <select
                          onChange={(e) => handleChangeEvent(e)}
                          name="status"
                          id="status"
                          className="ed-form__select max-w-[150px] appearance-none relative min-w-[150px] h-[40px] text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-1 px-3 mt-1 focus:border-secondary focus:outline-none"
                        >
                          <option
                            value="Active"
                            selected={state.status == "active"}
                          >
                            Active
                          </option>
                          <option
                            value="Inactive"
                            selected={state.status == "inactive"}
                          >
                            Inactive
                          </option>
                        </select>
                      </div>
                      <div className="text-danger mt-1 ml-1">
                        {state.errors.status}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="title"
                        className="text-sm font-medium dark:text-gray2"
                      >
                        <span className="whitespace-nowrap">
                          Enter User Group Name
                        </span>
                        <span className="text-danger">*</span>
                        <span className="text-gray3 text-sm ml-1">
                          {" "}
                          (Please enter unique Name, Limit: 150 chars)
                        </span>
                      </label>
                      <input
                        type="text"
                        className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        id="title"
                        name="title"
                        placeholder="Enter User Group Title"
                        value={state.title}
                        onChange={(e) => handleChangeEvent(e)}
                        maxLength={150}
                      />
                      <div className="text-danger mt-1 ml-1">
                        {state.errors.title}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="text-sm font-medium dark:text-gray2"
                      >
                        Enter Short Description{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <textarea
                        rows="5"
                        cols="10"
                        className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        id="description"
                        name="description"
                        placeholder="Enter User Group description..."
                        onChange={(e) => handleChangeEvent(e)}
                        value={state.description}
                      ></textarea>
                      <div className="text-danger mt-1 ml-1">
                        {state.errors.description}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Update Group  Form : End */}

                {/* Select Users : Start */}
                <div className="col-start-1 xl:col-start-2">
                  <div className="bg-white dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-black1 rounded-2xl p-8">
                    <h3 className="text-xl text-black2 dark:text-gray2 font-medium">
                      Select user to add to group
                    </h3>
                    <div className="flex items-center justify-between mt-5">
                      <div className="w-[320px] 2xl:w-[400px] relative overflow-hidden">
                        <input
                          type="search"
                          className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-6 py-2 border border-gray2 dark:border-opacity-50 rounded-full focus:border-secondary focus:outline-none"
                          name="user_search"
                          id="user_search"
                          placeholder="Search User..."
                          onChange={(e) => handleSearchChange(e.target.value)}
                        />
                        <div className="absolute top-3.5 right-5 m-auto focus:outline-none">
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
                        getListAction={selectedUsersOfGroup}
                        page={0}
                        limit={10}
                        id={id}
                        search={searchQuery}
                        sort=""
                        sorting=""
                      />
                    </div>

                    {/* Applied Filters */}
                    <div className="mt-5">
                      <AppliedFilters
                        page={0}
                        limit={10}
                        search={searchQuery}
                        filters={filters}
                        sort=""
                        sorting=""
                        id={id}
                        getActionList={selectedUsersOfGroup}
                      />
                    </div>

                    <ul className="mt-10 xl:h-[400px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                      {usersLoading ? (
                        <Skeleton
                          count={6}
                          height={70}
                          className="dark:bg-darkMainBg"
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="0"
                          enableAnimation="true"
                          duration={2.5}
                          inline={true}
                        />
                      ) : (
                        <>
                          {users && users.length > 0 ? (
                            <>
                              {users.map((user, index) => {
                                const { id, email, full_name, role } = user;
                                return (
                                  <li
                                    key={id}
                                    className="pb-5 mb-5 border-b border-gray2 dark:border-opacity-20 ml-2"
                                  >
                                    <div>
                                      <label
                                        htmlFor={id}
                                        className="flex items-start cursor-pointer select-none"
                                      >
                                        <input
                                          type="checkbox"
                                          name={email}
                                          id={id}
                                          value={id}
                                          className="w-[18px] h-[18px] mt-1 accent-primary"
                                          onChange={(e) => checkboxHandler(e)}
                                          checked={
                                            state.selectedUserIds.includes(
                                              id,
                                            ) == true
                                              ? true
                                              : false
                                          }
                                        />
                                        <div className="ml-3">
                                          <span className="capitalize dark:text-gray2 font-medium">
                                            {full_name}
                                          </span>
                                          <p className="text-sm text-black2 dark:text-gray2 dark:text-opacity-60 font-normal">
                                            {email}
                                          </p>
                                        </div>
                                      </label>
                                    </div>
                                  </li>
                                );
                              })}
                            </>
                          ) : searchQuery !== "" &&
                            users &&
                            users.length <= 0 ? (
                            <li className="text-center my-10 text-danger">
                              No Search Results Found
                            </li>
                          ) : filtersApplied ? (
                            <li className="text-center my-10 text-danger">
                              No Filter Results Found
                            </li>
                          ) : (
                            <li className="text-center my-10 text-danger">
                              No Users Found
                            </li>
                          )}
                        </>
                      )}
                    </ul>

                    {/* Pagination */}
                    <div className="flex justify-end mt-8">
                      {usersLoading ? (
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
                    <div className="text-danger mt-1 ml-1">
                      {state.errors.selectedUserIds}
                    </div>
                  </div>
                </div>
                {/* Select Users : End */}
              </div>

              <div className="flex items-center justify-end mt-8">
                <Link
                  to="/user-groups"
                  exact={true}
                  className="bg-transparent text-black2 dark:text-gray2 text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-darkBg hover:transition-all focus-visible:outline-none"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={updateUserGroupLoading}
                  className={`${
                    updateUserGroupLoading
                      ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                      : ""
                  } bg-secondary text-white text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-6 shadow-sm transition-all duration-300 hover:duration-300 hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
                >
                  {updateUserGroupLoading ? "Updating..." : "Submit & Update"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default EditUserGroup;
