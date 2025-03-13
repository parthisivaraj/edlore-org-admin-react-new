import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  getUserRolesPermission,
  addUserRoles,
  resetUserRoleErrors,
} from "../../redux/reduxes/userRoles/userRolesAction";
import PaginatedItems from "../../components/common/pagination";
import { ServerPath } from "../../helpers";

const AddUserRole = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const addUserRoleLoading = useSelector(
    (state) => state.user_roles.addUserRoleLoading,
  );
  const featuresLoading = useSelector(
    (state) => state.user_roles.permissionLoading,
  );
  const features = useSelector((state) => state.user_roles.permission);
  const authData = useSelector((state) => state.auth.authData);
  const pagination = useSelector((state) => state.user_roles.pagination);
  const addUserRoleError = useSelector(
    (state) => state.user_roles.addUserRoleError,
  );

  // Dispatch User Role Permissions
  useEffect(() => {
    const data = {
      role_id: "",
      search: "",
      page: 0,
      limit: 10,
    };
    dispatch(getUserRolesPermission(data));
  }, []);

  // Search Bar
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (searchData) => {
    setSearchQuery(searchData);
    const data = {
      role_id: "",
      search: searchData,
      page: 0,
      limit: 10,
    };
    dispatch(getUserRolesPermission(data));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      role_id: "",
      search: searchQuery,
      page: e.selected,
      limit: 10,
    };
    dispatch(getUserRolesPermission(data));
  };

  // States
  const [state, setState] = useState({
    title: "",
    description: "",
    permissionIds: [],
    selectAll: false,
    excludedPermissionIds: [],

    errors: {
      title: "",
      description: "",
      permissionIds: "",
    },
  });

  // set errrors
  useEffect(() => {
    let errors = state.errors;
    addUserRoleError &&
      addUserRoleError.forEach((error) => {
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
  }, [addUserRoleError]);

  // Validate User Role
  const validateNewUserRoleFormErrors = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    if (
      state.title == "" ||
      state.title.length > 150 ||
      state.description == "" ||
      (!state.selectAll && state.permissionIds.length == 0)
    )
      valid = false;
    return valid;
  };

  // onChange Handler
  const handleChangeEvent = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case "title":
        errors.title =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Enter User Role"
            : value.length > 150
            ? "User Role shouldn't exceed more than 150 characters"
            : "";
        break;
      case "description":
        errors.description =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Description must not be empty"
            : "";
        break;
      case "permissionIds":
        errors.permissionIds =
          state.permissionIds.length <= 0 ? "Select atleast One feature" : "";
        break;
      default:
        break;
    }
    dispatch(resetUserRoleErrors());
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
  };

  // Permission Handler
  const permissionHandler = (event) => {
    let errors = state.errors;
    if (state.selectAll) {
      if (event.target.checked) {
        setState((prevProps) => ({
          ...prevProps,
          excludedPermissionIds: [
            ...state.excludedPermissionIds,
            event.target.value,
          ],
        }));
      } else {
        setState((prevProps) => ({
          ...prevProps,
          excludedPermissionIds: state.excludedPermissionIds.filter(
            (item) => item !== event.target.value,
          ),
        }));
      }
    } else {
      if (event.target.checked) {
        setState((prevProps) => ({
          ...prevProps,
          permissionIds: [...state.permissionIds, event.target.value],
        }));
      } else {
        setState((prevProps) => ({
          ...prevProps,
          permissionIds: state.permissionIds.filter(
            (item) => item !== event.target.value,
          ),
        }));
      }
    }

    errors.permissionIds = "";
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  };

  // Form Submit
  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    let role_permissions_attributes = [];
    state.permissionIds.forEach((item) => {
      role_permissions_attributes.push({ permission_id: item });
    });

    if (validateNewUserRoleFormErrors(state.errors)) {
      const data = {
        title: state.title.replace(/\s+/g, " ").trim(),
        description: state.description.replace(/\s+/g, " ").trim(),
        org_id: authData.org_id,
        role_permissions_attributes: role_permissions_attributes,
        admin: state.selectAll,
      };
      dispatch(addUserRoles(data));
    } else {
      let errors = state.errors;
      if (state.title === "") {
        errors.title = "Enter User Role";
      }
      if (
        state.description === "" ||
        state.description.replace(/\s+/g, "").length == 0
      ) {
        errors.description = "Enter User Role Description";
      }
      if (!state.selectAll && state.permissionIds.length <= 0) {
        errors.permissionIds = "Select atleast One feature";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  const selectAllPermission = (event) => {
    let errors = state.errors;
    errors.permissionIds = "";
    setState((prevProps) => ({
      ...prevProps,
      selectAll: event.target.checked,
      excludedPermissionIds: [],
      permissionIds: [],
      errors: errors,
    }));
  };

  function checkSelected(selectAll, permissionIds, excludedPermissionIds, id) {
    // state.selectAll == true ?
    //   (state.excludedPermissionIds.includes(id) == true) ? false : true
    //   :
    //   (state.permissionIds.includes(id) == true) ? true : false
    let selected = false;
    if (selectAll == true) {
      if (excludedPermissionIds.includes(id) == true) {
        selected = false;
      } else {
        selected = true;
      }
    } else {
      if (permissionIds.includes(id) == true) {
        selected = true;
      } else {
        selected = false;
      }
    }
    return selected;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add New User Role</title>
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
                    className="w-[14px] h-[14px] invert dark:invert-0 opacity-75"
                  />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                    User Controls /
                  </span>
                  <Link
                    to="/user-roles"
                    exact={true}
                    className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"
                  >
                    All User Roles /
                  </Link>
                  <span className="ml-1 text-xs text-secondary font-semibold">
                    Add User Role
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold mb-6 2xl:mb-8">
                  Add New User Role
                </h1>
              </div>

              <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Add Role Form : Start */}
                <div className="col-start-1">
                  <div className="bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl p-8 drop-shadow-md">
                    <div className="mb-6">
                      {addUserRoleLoading ? (
                        <Skeleton
                          height={70}
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="0"
                          enableAnimation="true"
                          duration={2.5}
                          inline={true}
                          className="dark:bg-darkMainBg"
                        />
                      ) : (
                        <>
                          <label
                            htmlFor="add_user_role"
                            className="font-medium dark:text-gray2"
                          >
                            <span className="whitespace-nowrap">
                              Enter User Role
                            </span>
                            <span className="text-danger">*</span>
                            <span className="text-gray3 text-sm ml-1">
                              {" "}
                              (Please enter unique Role, Limit: 150 chars)
                            </span>
                          </label>
                          <input
                            type="text"
                            className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                            id="add_user_role"
                            name="title"
                            placeholder="Enter User Role"
                            value={state.role}
                            onChange={(e) => handleChangeEvent(e)}
                            maxLength={150}
                          />
                          <div className="text-danger mt-1 ml-1">
                            {state.errors.title}
                          </div>
                        </>
                      )}
                    </div>

                    <div>
                      {addUserRoleLoading ? (
                        <Skeleton
                          height={180}
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="0"
                          enableAnimation="true"
                          duration={2.5}
                          inline={true}
                          className="dark:bg-darkMainBg"
                        />
                      ) : (
                        <>
                          <label
                            htmlFor="add_user_description"
                            className="font-medium dark:text-gray2"
                          >
                            Enter Short Description{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <textarea
                            rows="5"
                            cols="10"
                            className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                            id="add_user_description"
                            name="description"
                            placeholder="What is this user role about..."
                            onChange={(e) => handleChangeEvent(e)}
                            value={state.description}
                          ></textarea>
                          <div className="text-danger mt-1 ml-1">
                            {state.errors.description}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* Add Role Form : End */}

                {/* Features & Permissions : Start */}
                <div className="md:col-start-1 xl:col-start-2">
                  <div className="bg-white dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-black1 rounded-2xl p-8 drop-shadow-md">
                    <h3 className="text-xl text-black2 dark:text-gray2 font-medium">
                      Select features and permissions for this role
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <div className="w-full relative overflow-hidden">
                        <input
                          type="search"
                          className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-5 py-2 border border-gray2 dark:border-opacity-50 rounded-full focus:border-secondary focus:outline-none"
                          name="user_search"
                          id="user_search"
                          onChange={(e) => handleSearchChange(e.target.value)}
                          placeholder="Search..."
                        />
                        <div className="absolute top-3.5 right-5 m-auto focus-visible:outline-none">
                          <img
                            src="../assets/icons/icon-search.svg"
                            alt="icon-search"
                            className="w-4 h-4 block m-auto dark:invert"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Note */}
                    <div className="mt-6 text-black3 dark:text-gray2">
                      <strong>Note:</strong>
                      <span>
                        {" "}
                        When selecting <strong>
                          write, update, or delete
                        </strong>{" "}
                        permissions, it's necessary to also select{" "}
                        <strong>read</strong> permission. For more information,
                        please read{" "}
                      </span>
                      <a
                        href={`${ServerPath}/permissions.pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary text-opacity-75 dark:text-opacity-85 font-medium underline hover:text-opacity-100 transition-all duration-300 ease-in-out"
                      >
                        Permissions Documentation.
                      </a>
                    </div>

                    {/* Select All */}
                    <div className="mt-6">
                      <label
                        htmlFor="select_all_permissions"
                        className="flex items-center cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          name="select_all_permissions"
                          id="select_all_permissions"
                          className="w-[18px] h-[18px]  accent-primary"
                          onChange={(e) => selectAllPermission(e)}
                        />
                        <span className="text-base ml-2.5 mt-1 dark:text-gray2 select-none font-medium">
                          Admin{" "}
                          <span className="text-gray3">
                            (Admin will have all the Permissions)
                          </span>
                        </span>
                      </label>
                    </div>

                    {/* All Permissions */}
                    <ul className="mt-8 h-full xl:h-[320px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                      {featuresLoading ? (
                        <Skeleton
                          count={6}
                          height={80}
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
                          {features && features.length > 0 ? (
                            <>
                              {features.map((feature, index) => {
                                const { title, id, description } = feature;
                                return (
                                  <li
                                    key={id}
                                    className="pb-5 mb-5 border-b border-gray2 dark:border-opacity-20"
                                  >
                                    <div>
                                      <label
                                        htmlFor={id}
                                        className="flex items-center cursor-pointer select-none"
                                      >
                                        <input
                                          type="checkbox"
                                          name={title}
                                          id={id}
                                          className="w-[18px] h-[18px]  accent-primary"
                                          onChange={(e) => permissionHandler(e)}
                                          value={id}
                                          checked={
                                            checkSelected(
                                              state.selectAll,
                                              state.permissionIds,
                                              state.excludedPermissionIds,
                                              id,
                                            )
                                            // state.selectAll == true ?
                                            //   (state.excludedPermissionIds.includes(id) == true) ? false : true
                                            //   :
                                            //   (state.permissionIds.includes(id) == true) ? true : false
                                          }
                                        />
                                        <span className="text-base font-medium ml-2.5 mt-1 capitalize dark:text-gray2 select-none">
                                          {title}
                                        </span>
                                      </label>
                                      <p className="text-sm text-black2 dark:text-gray2 dark:text-opacity-70 font-normal mt-3 first-letter:capitalize">
                                        {description}
                                      </p>
                                    </div>
                                  </li>
                                );
                              })}
                            </>
                          ) : searchQuery !== "" &&
                            features &&
                            features.length <= 0 ? (
                            <li className="text-center my-10 text-danger">
                              No Search Results Found
                            </li>
                          ) : (
                            <li className="text-center my-10 text-danger">
                              No Permissions Found
                            </li>
                          )}
                        </>
                      )}
                    </ul>

                    {/* Pagination */}
                    <div className="flex justify-end mt-6">
                      {featuresLoading ? (
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
                      {state.errors.permissionIds}
                    </div>
                  </div>
                </div>
                {/* Features & Permissions : End */}
              </div>

              <div className="flex items-center justify-end mt-8">
                <Link
                  to="/user-roles"
                  exact={true}
                  className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-darkBg hover:transition-all focus-visible:outline-none"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={addUserRoleLoading}
                  className={`${
                    addUserRoleLoading
                      ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                      : ""
                  } bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-6 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
                >
                  {addUserRoleLoading ? "Creating..." : "Create User Role"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default AddUserRole;
