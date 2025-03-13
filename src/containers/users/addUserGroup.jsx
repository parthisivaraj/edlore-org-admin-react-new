import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  getUsers,
  getUsersWithCurrent,
} from "../../redux/reduxes/users/usersAction";
import {
  addUserGroup,
  resetUserGroupErrors,
} from "../../redux/reduxes/userGroups/userGroupsAction";
import { Link } from "react-router-dom";
import Filters from "../../components/common/filters";
import PaginatedItems from "../../components/common/pagination";
import AppliedFilters from "../../components/common/appliedFilters";

const AddUserGroup = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const usersLoading = useSelector(
    (state) => state.users.usersWithCurrentloading,
  );
  const users = useSelector((state) => state.users.usersWithCurrentList);
  const filters = useSelector((state) => state.users.usersWithCurrentfilters);
  const pagination = useSelector(
    (state) => state.users.usersWithCurrentpagination,
  );
  const addUserGroupLoading = useSelector(
    (state) => state.user_groups.addUserGroupLoading,
  );
  const addUserGroupError = useSelector(
    (state) => state.user_groups.addUserGroupError,
  );

  // Dispatch to Users
  useEffect(() => {
    const data = {
      search: "",
      page: 0,
      limit: 10,
      filter: {},
      paginate: false,
      sort: "",
      sorting: "",
    };
    dispatch(getUsersWithCurrent(data));
  }, []);

  // Search Bar for Users
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (searchData) => {
    setSearchQuery(searchData);
    const data = {
      search: searchData,
      page: 0,
      limit: 10,
      filter: {},
      paginate: true,
      sort: "",
      sorting: "",
    };
    dispatch(getUsersWithCurrent(data));
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
    userIds: [],

    errors: {
      title: "",
      description: "",
      userIds: "",
    },
  });

  // set errrors
  useEffect(() => {
    let errors = state.errors;
    addUserGroupError.forEach((error) => {
      switch (error.name) {
        case "title":
          errors.title = error.message;
          break;
        default:
          break;
      }
    });
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [addUserGroupError]);

  // Dispatch User Details
  // useEffect(() => {
  //   let errors = state.errors;
  //   errors.title = addUserError && addUserError.title && addUserError.title[0]
  //   setState((prevProps) => ({
  //     ...prevProps,
  //     errors: errors
  //   }));
  // }, [addUserError]);

  // Validate Form
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (val = false));
    if (
      state.title === "" ||
      state.title.length > 150 ||
      state.description === "" ||
      state.userIds.length == 0
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
            ? "Enter User Group Name"
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
      case "userIds":
        errors.userIds =
          state.userIds.length <= 0 ? "Select alteast one User" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
    dispatch(resetUserGroupErrors());
  };

  // Checkbox Handler
  const checkboxHandler = (event) => {
    let errors = state.errors;
    if (event.target.checked) {
      setState((prevProps) => ({
        ...prevProps,
        userIds: [...state.userIds, event.target.value],
      }));
    } else {
      setState((prevProps) => ({
        ...prevProps,
        userIds: state.userIds.filter((item) => item !== event.target.value),
      }));
    }
    errors.userIds = "";
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  };

  // Form Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    let user_groups_attributes = [];
    state.userIds.forEach((item) => {
      user_groups_attributes.push({ user_id: item });
    });

    if (validateForm(state.errors)) {
      const data = {
        title: state.title.replace(/\s+/g, " ").trim(),
        description: state.description.replace(/\s+/g, " ").trim(),
        user_groups_attributes: user_groups_attributes,
      };
      dispatch(addUserGroup(data));
    } else {
      let errors = state.errors;
      if (state.title === "") {
        errors.title = "Enter User Group Title";
      }
      if (state.description === "") {
        errors.description = "Enter User Group Description";
      }
      if (state.userIds.length <= 0) {
        errors.userIds = "Select atleast one User";
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
      filter: filters.selected ? filters.selected : {},
      paginate: true,
      limit: 10,
      sort: "",
      sorting: "",
    };
    dispatch(getUsersWithCurrent(data));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add User Group</title>
      </Helmet>

      <Layout>
        <section>
          <form onSubmit={(e) => handleSubmit(e)}>
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
                  <Link
                    to="/user-groups"
                    exact={true}
                    className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"
                  >
                    All User Groups /
                  </Link>
                  <span className="ml-1 text-xs text-secondary font-semibold">
                    Add User Group
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  Add User Group
                </h1>
              </div>
            </div>
            {/* Breadcrumbs : End */}

            <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Add User Group Form : Start */}
              <div className="col-start-1">
                <div className="bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl p-8">
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
                      className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-6 mt-1 focus:border-secondary focus:outline-none"
                      id="title"
                      name="title"
                      placeholder="Enter User Group Name"
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
                      className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-6 mt-1 focus:border-secondary focus:outline-none"
                      id="description"
                      name="description"
                      placeholder="Enter User Group description..."
                      onChange={(e) => handleChangeEvent(e)}
                    ></textarea>
                    <div className="text-danger mt-1 ml-1">
                      {state.errors.description}
                    </div>
                  </div>
                </div>
              </div>
              {/* Add User Group Form : End */}

              {/* Select Users : Start */}
              <div className="md:col-start-1 xl:col-start-2">
                <div className="bg-white dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-black1 rounded-2xl p-8">
                  <h3 className="text-xl text-black2 dark:text-gray2 font-medium">
                    Select user to add to group
                  </h3>
                  <div className="flex items-center justify-between mt-5">
                    <div className="w-[320px] 2xl:w-[400px]  relative overflow-hidden">
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
                      getListAction={getUsersWithCurrent}
                      limit={10}
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
                      getActionList={getUsersWithCurrent}
                    />
                  </div>

                  <ul className="mt-10 xl:h-[400px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                    {usersLoading ? (
                      <Skeleton
                        count={10}
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
                            {users.map((user) => {
                              const { id, full_name, email } = user;
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
                                        name={full_name}
                                        id={id}
                                        value={id}
                                        className="w-[18px] h-[18px] mt-1 accent-primary"
                                        onChange={(e) => checkboxHandler(e)}
                                        checked={state.userIds.includes(id)}
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
                        ) : searchQuery !== "" && users && users.length <= 0 ? (
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
                    {state.errors.userIds}
                  </div>
                </div>
              </div>
              {/* Select Users : End */}
            </div>

            <div className="flex items-center justify-end mt-8">
              <Link
                to="/user-groups"
                exact={true}
                className="bg-transparent text-black2 dark:text-gray2 text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-darkBg hover:transition-all hover:duration-300 focus:outline-none"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={addUserGroupLoading}
                className={`${
                  addUserGroupLoading
                    ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                    : ""
                } bg-secondary text-white text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-6 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-none`}
              >
                {addUserGroupLoading ? "Creating..." : "Create User Group"}
              </button>
            </div>
          </form>
        </section>
      </Layout>
    </>
  );
};
export default AddUserGroup;
