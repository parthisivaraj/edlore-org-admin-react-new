import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import {
  editUser,
  updateRole,
  userDetails,
  resetUserErrors,
  setManagePasswordModal,
  updateUserAvailabilityStatus,
  deleteUserModal,
} from "../../redux/reduxes/users/usersAction";
import {
  changeUserRolesSearchInUser,
  getUserRoles,
} from "../../redux/reduxes/userRoles/userRolesAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ManagePassword from "../../components/users/managePassword";
import Skeleton from "react-loading-skeleton";
import ShowAllFeatures from "../../components/users/showAllFeaturesModal";
import PaginatedItems from "../../components/common/pagination";
import { addToaster } from "../../redux/reduxes/toaster/tosterAction";
import PermissionsMessage from "../../components/common/permissionsMessage";
import DeleteUserConfirmation from "./deleteUserModal";

const EditUser = (props) => {
  const { id, current_page } = props.match.params;
  const dispatch = useDispatch();
  const navigate = useHistory();

  // Fetch Data
  const userDetail = useSelector((state) => state.users.userDetails);
  const rolesLoading = useSelector((state) => state.users.loading);
  const roles = useSelector((state) => state.user_roles.user_roles);
  const editUserLoading = useSelector((state) => state.users.editUserLoading);
  const editUserError = useSelector((state) => state.users.editUserError);
  const pagination = useSelector(
    (state) => state.user_roles.user_roles_pagination,
  );
  const showManagePasswordModal = useSelector(
    (state) => state.users.showManagePasswordModal,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.user_roles.searchUserRolesQueryInUser,
  );
  const updateRoleLoading = useSelector(
    (state) => state.users.updateRoleLoading,
  );
  const updateRoleError = useSelector((state) => state.users.updateRoleError);

  // Search Query
  useEffect(() => {
    const data = {
      user_id: userDetail && userDetail.id,
      search: searchQuery,
      page: 0,
      paginate: true,
      limit: 10,
      filter: {},
      sort: "",
      sorting: "",
    };
    dispatch(getUserRoles(data));
  }, [searchQuery]);

  // Search Bar
  const handleSearchChange = (searchData) => {
    dispatch(changeUserRolesSearchInUser(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      user_id: userDetail && userDetail.id,
      search: searchQuery,
      page: e.selected,
      limit: 10,
      paginate: true,
      filter: {},
      sort: "",
      sorting: "",
    };
    dispatch(getUserRoles(data));
  };

  // Dispatch User Details
  useEffect(() => {
    const data = {
      id: id,
    };
    dispatch(userDetails(data));
  }, []);

  // States
  let user = {};
  const [state, setState] = useState({
    file: [],
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    mobile_number: "",
    identification_code: "",
    password: "",
    password_confirmation: "",
    password_renewed: false,
    userRole: null,
    status: "active",
    image: "",
    role: null,
    oldRoleId: null,
    support_availability_status: "Online",

    errors: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      mobile_number: "",
      // identification_code: '',
      password: "",
      passwordUpperCase: "",
      passwordDigit: "",
      passwordSpecialCharacters: "",
      password_confirmation: "",
    },
  });

  // set errrors
  useEffect(() => {
    let errors = state.errors;
    editUserError.forEach((error) => {
      switch (error.name) {
        case "email":
          errors.email = error.message;
          break;
        case "username":
          errors.username = error.message;
          break;
        case "first_name":
          errors.first_name = error.message;
          break;
        case "last_name":
          errors.last_name = error.message;
          break;

        case "identification_code":
          errors.identification_code = error.message;
          break;
        default:
          break;
      }
    });

    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [editUserError]);

  // Reset User Role Update
  useEffect(() => {
    let errors = state.errors;
    updateRoleError.forEach((error) => {
      switch (error.name) {
        case "status":
          errors.status = error.message;
          break;
        default:
          break;
      }
    });
    if (updateRoleError.length == 0) {
      errors.status = "";
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [updateRoleError]);

  // User Details
  useEffect(() => {
    setState((prevProps) => ({
      ...prevProps,
      first_name: userDetail.first_name,
      last_name: userDetail.last_name,
      email: userDetail.email,
      username: userDetail.username,
      mobile_number: userDetail.mobile_number,
      identification_code: userDetail.identification_code,
      status: userDetail.status,
      image: userDetail.image,
      role: userDetail.role ? userDetail.role.id : null,
      oldRoleId: userDetail.role ? userDetail.role.id : null,
      support_availability_status: userDetail.support_availability_status,
    }));
    const rolesData = {
      user_id: userDetail && userDetail.id,
      search: searchQuery,
      page: 0,
      paginate: true,
      limit: 10,
      filter: {},
      sort: "",
      sorting: "",
    };
    dispatch(getUserRoles(rolesData));
  }, [userDetail]);

  // Validate Form
  const validateEditUserForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (val = false));
    if (
      state.first_name == "" ||
      state.last_name == "" ||
      state.email == "" ||
      state.username == "" ||
      state.mobile_number == ""
    )
      valid = false;

    return valid;
  };

  // onChange Handler
  const handleChangeInput = (event) => {
    event.preventDefault();
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
    const upperCaseLetters = RegExp(/[A-Z]/g);
    const digits = RegExp(/[0-9]/g);
    const specialCharacters = RegExp(
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/,
    );

    const { value, name } = event.target;
    let errors = state.errors;

    switch (name) {
      case "first_name":
        errors.first_name = "" ? "Enter First Name" : "";
        break;
      case "last_name":
        errors.last_name = "" ? "Enter Last Name" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is Invalid";
        break;
      case "username":
        errors.username = "" ? "Enter Username" : "";
        break;
      case "mobile_number":
        errors.mobile_number =
          value.length == 10 ? "" : "Phone Number must be atleast 10 digits";
        break;
      // case 'identification_code':
      //     errors.identification_code = value == "" ? "Enter Identification Code" : "";
      //     break;
      default:
        break;
    }

    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
    dispatch(resetUserErrors());
  };

  // User Image
  const [userImage, setUserImage] = useState(null);
  const handleChangeProfileImage = (event) => {
    const [file] = event.target.files;
    if (file.type != "") {
      setState((prevProps) => ({
        ...prevProps,
        file: file,
      }));
      setUserImage(URL.createObjectURL(file));
    } else {
      const data = {
        content: "Can't upload this file as profile picture!",
        type: "failed",
      };
      dispatch(addToaster(data));
    }
  };

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEditUserForm(state.errors)) {
      const data = {
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
        username: state.username,
        mobile_number: state.mobile_number,
        identification_code: state.identification_code,
        id: id,
        status: state.status,
        image: state.file,
      };
      dispatch(editUser(data));
    } else {
      let errors = state.errors;
      if (state.first_name == "") errors.first_name = "Enter First Name";
      if (state.last_name == "") errors.last_name = "Enter Last Name";
      if (state.email == "") errors.email = "Enter Email ID";
      if (state.username == "") errors.username = "Enter Username";
      if (state.mobile_number == "")
        errors.mobile_number = "Enter Phone Number";
      // if (state.identification_code == "")
      //     errors.identification_code = "Enter Identification Code"

      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Manage Password Popup
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const managePasswordModal = (stat) => {
    dispatch(setManagePasswordModal(stat));
  };

  // Show All Features Popup
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [featuresOfTheSelected, setFeaturesOfTheSelected] = useState([]);
  const [editDetails, setEditDetails] = useState(false);

  const displayAllFeatures = (data) => {
    setFeaturesOfTheSelected(data);
    setShowAllFeatures(true);
  };

  // on Change User Role
  const onChangeRole = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      // errors: errors
      role: event.target.value,
    }));
    dispatch(resetUserErrors());
  };

  // Update User Role
  const submitRoleHandler = (event) => {
    event.preventDefault();

    const data = {
      id: id,
      role_id: state.role,
    };
    dispatch(updateRole(data));
  };

  // Reset Form on Close Button
  const resetFormOnClose = () => {
    setState((prevProps) => ({
      ...prevProps,
      first_name: userDetail.first_name,
      last_name: userDetail.last_name,
      email: userDetail.email,
      username: userDetail.username,
      mobile_number: userDetail.mobile_number,
      identification_code: userDetail.identification_code,
      status: userDetail.status,
      image: userDetail.image,
      support_availability_status: userDetail.support_availability_status,
      // role: userDetail.role ? userDetail.role.id : null,
      // oldRoleId: userDetail.role ? userDetail.role.id : null,
    }));
    // dispatch(updateRole());
    setEditDetails(!editDetails);
  };

  // Availibility Status Handle Change
  const availabilityStatusChange = (event) => {
    event.preventDefault();
    setState((prevProps) => ({
      ...prevProps,
      support_availability_status: event.target.value,
    }));
  };

  // Avalibilty Status Submit
  const onAvailabiltyStatusSubmit = (event) => {
    event.preventDefault();
    const data = {
      id: id,
      support_availability_status:
        state.support_availability_status == "Online"
          ? 1
          : state.support_availability_status == "Away"
          ? 2
          : state.support_availability_status == "Offline"
          ? 3
          : state.support_availability_status == "busy"
          ? 4
          : 1,
    };
    dispatch(updateUserAvailabilityStatus(data));
  };

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteUser = () => {
    userDetail &&
      userDetail.id &&
      dispatch(deleteUserModal({ id: userDetail.id }));

    navigate.push(`/users`);

    setDeleteModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit User</title>
      </Helmet>

      <Layout>
        <section className="edit-user">
          <div className="overflow-hidden">
            <div className="grid grid-cols-2 gap-4 items-center mb-6 2xl:mb-10">
              <div className="col-start-1">
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
                    to="/users"
                    exact={true}
                    className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"
                  >
                    All Users /
                  </Link>
                  <span className="ml-1 text-xs text-secondary font-semibold">
                    Edit User
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  Edit User
                </h1>
              </div>

              <div className="col-start-2 ml-auto">
                <Link
                  to="/users"
                  exact={true}
                  className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-darkBg hover:transition-all focus-visible:outline-none"
                >
                  Go Back
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-6">
              {/* User Form Section : Start */}
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="col-start-1">
                  <div className=" w-full h-full 2xl:h-[550px] bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl p-8 drop-shadow-md overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black2 scrollbar-track-gray4 dark:scrollbar-track-black3  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                    <div className="flex items-start justify-between mb-5">
                      <h4 className="text-xl 2xl:text-2xl font-bold text-black2 dark:text-gray2 mb-2">
                        Personal Details
                      </h4>

                      {(permissions.includes("all_user") ||
                        permissions.includes("update_user") ||
                        permissions.includes("Admin")) && (
                        <div className="ml-auto">
                          {editDetails ? (
                            <button
                              type="button"
                              onClick={() => resetFormOnClose()}
                              className="bg-gray text-black2 text-sm font-medium border border-black2 dark:border-gray2 rounded-full px-6 py-1.5 shadow-sm transition-all hover:bg-black2 dark:hover:bg-darkBg hover:text-white hover:transition-all focus-visible:outline-none"
                            >
                              Cancel
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditDetails(!editDetails)}
                              className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-6 py-1.5 ml-2 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none"
                            >
                              Edit Details
                            </button>
                          )}

                          {editDetails && (
                            <button
                              type="submit"
                              disabled={editUserLoading}
                              className={`${
                                editUserLoading
                                  ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                                  : ""
                              } bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-6 py-1.5 ml-2 shadow-md transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
                            >
                              {editUserLoading
                                ? "Updating..."
                                : "Update Details"}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setDeleteModalOpen(true)}
                            className="text-danger text-sm font-medium underline hover:text-danger-dark focus:outline-none ml-5"
                          >
                            Delete User
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-3">
                        <label
                          htmlFor="status"
                          className="text-sm font-medium leading-9 dark:text-gray2"
                        >
                          Status <span className="text-danger">*</span>
                        </label>{" "}
                        <br />
                        <select
                          disabled={!editDetails}
                          onChange={(e) => handleChangeInput(e)}
                          name="status"
                          id="status"
                          className={`${
                            !editDetails
                              ? "bg-gray3 bg-opacity-10 dark:bg-darkMainBg"
                              : "ed-form__select"
                          } appearance-none relative min-w-[120px] w-full h-[45px] text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-1 px-2 mt-1 focus:border-secondary focus:outline-none`}
                        >
                          <option
                            value="active"
                            selected={state.status == "active"}
                          >
                            Active
                          </option>
                          <option
                            value="inactive"
                            selected={state.status == "inactive"}
                          >
                            Inactive
                          </option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="identification_code"
                          className="text-sm font-medium leading-9 dark:text-gray2"
                        >
                          CAC Number{" "}
                        </label>{" "}
                        <br />
                        <input
                          type="text"
                          className={`${
                            !editDetails
                              ? "bg-gray3 bg-opacity-10 dark:bg-darkMainBg"
                              : ""
                          } w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none`}
                          id="identification_code"
                          name="identification_code"
                          value={state.identification_code}
                          placeholder="CAC Number"
                          onChange={(e) => handleChangeInput(e)}
                          min="0"
                          disabled={!editDetails}
                        />
                        <div className="text-danger mt-1 ml-1">
                          {state.errors.identification_code}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-3">
                        <label
                          htmlFor="user_full_name"
                          className="text-sm font-medium leading-9 dark:text-gray2"
                        >
                          First Name <span className="text-danger">*</span>
                        </label>{" "}
                        <br />
                        <input
                          type="text"
                          className={`${
                            !editDetails
                              ? "bg-gray3 bg-opacity-10 dark:bg-darkMainBg"
                              : ""
                          } w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none`}
                          id="user_first_name"
                          name="first_name"
                          placeholder="User First Name"
                          value={state.first_name}
                          onChange={(e) => handleChangeInput(e)}
                          disabled={!editDetails}
                        />
                        <div className="text-danger mt-1 ml-1">
                          {state.errors.first_name}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="user_full_name"
                          className="text-sm font-medium leading-9 dark:text-gray2"
                        >
                          Last Name <span className="text-danger">*</span>
                        </label>{" "}
                        <br />
                        <input
                          type="text"
                          className={`${
                            !editDetails
                              ? "bg-gray3 bg-opacity-10 dark:bg-darkMainBg"
                              : ""
                          } w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none`}
                          id="user_last_name"
                          name="last_name"
                          placeholder="User Last Name"
                          value={state.last_name}
                          onChange={(e) => handleChangeInput(e)}
                          disabled={!editDetails}
                        />
                        <div className="text-danger mt-1 ml-1">
                          {state.errors.last_name}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-3">
                        <label
                          htmlFor="user_email"
                          className="text-sm font-medium leading-9 dark:text-gray2"
                        >
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className={`${
                            !editDetails
                              ? "bg-gray3 bg-opacity-10 dark:bg-darkMainBg"
                              : ""
                          } w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none`}
                          id="user_email"
                          name="email"
                          placeholder="User Email"
                          value={state.email}
                          onChange={(e) => handleChangeInput(e)}
                          disabled={!editDetails}
                        />
                        <div className="text-danger mt-1 ml-1">
                          {state.errors.email}
                        </div>
                        {editUserError &&
                          editUserError.email &&
                          editUserError.email.length > 0 &&
                          editUserError.email.map((err, inde) => (
                            <div className="text-danger mt-1 ml-1">{err}</div>
                          ))}
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="user_username"
                          className="text-sm font-medium leading-9 dark:text-gray2"
                        >
                          Username <span className="text-danger">*</span>
                        </label>
                        <input
                          className={`${
                            !editDetails
                              ? "bg-gray3 bg-opacity-10 dark:bg-darkMainBg"
                              : ""
                          } w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none`}
                          id="user_username"
                          name="username"
                          placeholder="Username"
                          value={state.username}
                          onChange={(e) => handleChangeInput(e)}
                          disabled={!editDetails}
                        />
                        <div className="text-danger mt-1 ml-1">
                          {state.errors.username}
                        </div>
                        {editUserError &&
                          editUserError.username &&
                          editUserError.username.length > 0 &&
                          editUserError.username.map((err, inde) => (
                            <div className="text-danger mt-1 ml-1">{err}</div>
                          ))}
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="mobile_number"
                          className="text-sm font-medium leading-9 dark:text-gray2"
                        >
                          Phone <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className={`${
                            !editDetails
                              ? "bg-gray3 bg-opacity-10 dark:bg-darkMainBg"
                              : ""
                          } w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none`}
                          id="mobile_number"
                          name="mobile_number"
                          placeholder="User Phone Number"
                          value={state.mobile_number}
                          onChange={(e) => handleChangeInput(e)}
                          disabled={!editDetails}
                        />
                        <div className="text-danger mt-1 ml-1">
                          {state.errors.mobile_number}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative overflow-hidden">
                        <label
                          htmlFor=""
                          className="text-sm font-medium leading-9 dark:text-gray2"
                        >
                          Upload Profile Picture
                        </label>{" "}
                        <br />
                        <input
                          type="file"
                          id="profile_picture"
                          className="absolute z-20  w-[80px] h-[80px] text-[0] opacity-0 bg-gray2 dark:bg-darkMainBg text-black2 border border-gray2 dark:border-opacity-50 rounded-md  cursor-pointer "
                          name="user_profile"
                          accept="image/png, image/jpg, image/jpeg"
                          value={state.user_profile}
                          onChange={(e) => handleChangeProfileImage(e)}
                          disabled={!editDetails}
                        />
                        <div
                          className={`${
                            !editDetails
                              ? "bg-gray3 bg-opacity-10 dark:bg-darkMainBg"
                              : ""
                          }  flex flex-col justify-center items-center bg-gray2 dark:bg-darkMainBg bg-opacity-50 border border-gray2 dark:border-opacity-50 rounded-md w-[80px] h-[80px] overflow-hidden cursor-pointer`}
                        >
                          {userImage && editDetails ? (
                            <img
                              src={userImage}
                              alt={state.first_name}
                              className="w-[80px] h-[80px] object-cover  rounded-md cursor-pointer"
                            />
                          ) : (
                            <img
                              src={state.image}
                              alt={state.first_name}
                              className="w-[80px] h-[80px] object-cover  rounded-md cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Manage Password */}
                  <div className=" w-full xl:h-auto bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md p-8 mt-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl 2xl:text-2xl font-bold text-black2 dark:text-gray2">
                        Manage Password
                      </h4>

                      {(permissions.includes("all_user") ||
                        permissions.includes("update_user") ||
                        permissions.includes("Admin")) && (
                        <button
                          type="button"
                          onClick={() => managePasswordModal(true)}
                          className="text-sm text-primary font-medium opacity-80 hover:opacity-100"
                        >
                          Manage
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Support Availibility Status */}
                  <div className=" w-full xl:h-auto bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md px-8 py-6 mt-6">
                    <form>
                      <div className="flex items-center justify-between">
                        <div>
                          <label
                            htmlFor="support_availability_status"
                            className="text-sm font-medium dark:text-gray2"
                          >
                            Support Availability Status
                          </label>{" "}
                          <br />
                          <select
                            // disabled={!editDetails}
                            onChange={(e) => availabilityStatusChange(e)}
                            name="support_availability_status"
                            id="support_availability_status"
                            className={`ed-form__select appearance-none relative min-w-[120px] h-[35px] text-base dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-1 px-2 mt-1 focus:border-secondary focus:outline-none`}
                          >
                            <option
                              value="Online"
                              selected={
                                state.support_availability_status == "Online"
                              }
                            >
                              Online
                            </option>
                            <option
                              value="Away"
                              selected={
                                state.support_availability_status == "Away"
                              }
                            >
                              Away
                            </option>
                            <option
                              value="Offline"
                              selected={
                                state.support_availability_status == "Offline"
                              }
                            >
                              Offline
                            </option>
                            <option
                              value="busy"
                              selected={
                                state.support_availability_status == "busy"
                              }
                            >
                              Busy
                            </option>
                          </select>
                        </div>

                        {(permissions.includes("all_user") ||
                          permissions.includes("update_user") ||
                          permissions.includes("Admin")) && (
                          <div>
                            {(userDetail &&
                              userDetail.support_availability_status) !=
                            state.support_availability_status ? (
                              <button
                                onClick={(e) => onAvailabiltyStatusSubmit(e)}
                                type="submit"
                                className="bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-6 py-1.5 ml-2 shadow-md transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none"
                              >
                                Update
                              </button>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </form>
              {/* User Form Section : End */}

              {/* User's Role Section : Start */}
              <div className="md:col-start-1 xl:col-start-2 w-full h-[720px] bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl  drop-shadow-md p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="text-xl 2xl:text-2xl text-black2 dark:text-gray2 font-medium">
                      Select a user role
                    </h4>
                    <p className="text-sm 2xl:text-base text-black2 dark:text-gray2 font-normal">
                      Choose a user role or create a new one
                    </p>
                  </div>

                  {(permissions.includes("all_role") ||
                    permissions.includes("update_role") ||
                    permissions.includes("Admin")) && (
                    <div>
                      {state.role !== state.oldRoleId && (
                        <button
                          type="button"
                          onClick={(e) => submitRoleHandler(e)}
                          className={`${
                            updateRoleLoading ? "bg-gray3 border-gray3" : ""
                          } bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-6 py-2 ml-2 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
                        >
                          {updateRoleLoading
                            ? "Updating..."
                            : "Update User Role"}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {!(
                  permissions.includes("all_role") ||
                  (permissions.includes("read_role") &&
                    permissions.includes("update_role")) ||
                  permissions.includes("Admin")
                ) ? (
                  <PermissionsMessage
                    additionalClassName="py-40"
                    title="User Role"
                    message="read role and update role"
                  />
                ) : (
                  <>
                    {/* Search Bar */}
                    <div className="relative mt-6 mb-10 overflow-hidden">
                      <input
                        type="search"
                        className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:text-gray2 py-2.5 px-5 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                        name="user_search"
                        id="user_search"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        placeholder="Search..."
                      />
                      <div className="absolute top-[16px] right-5 block m-auto focus:outline-none">
                        <img
                          src="../assets/icons/icon-search.svg"
                          alt="icon-search"
                          className="w-4 h-4 block m-auto dark:invert"
                        />
                      </div>
                    </div>

                    {/* Users List */}
                    <ul className="h-[380px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                      {rolesLoading ? (
                        <Skeleton
                          count={6}
                          height={100}
                          className="dark:bg-darkMainBg"
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="0"
                          enableAnimation="true"
                          duration={2.5}
                          inline={false}
                        />
                      ) : (
                        <>
                          {roles && roles.length > 0 ? (
                            <>
                              {roles.map((role, index) => {
                                const {
                                  title,
                                  description,
                                  url,
                                  id,
                                  permissions,
                                } = role;
                                return (
                                  <li
                                    key={id}
                                    className="border-b border-gray2 dark:border-opacity-20 pb-4 mb-5 ml-1"
                                  >
                                    <div>
                                      <label
                                        htmlFor={title}
                                        className="flex items-center cursor-pointer select-none"
                                      >
                                        <input
                                          type="radio"
                                          className="appearance-none w-[18px] h-[18px] text-base font-medium bg-gray2 bg-opacity-60 dark:bg-opacity-20 border-[3px] border-white dark:border-black3 ring-2 ring-gray2 dark:ring-opacity-60 rounded-full transition-all checked:bg-primary checked:ring-primary dark:checked:bg-opacity-100 dark:checked:ring-opacity-100"
                                          id={title}
                                          name="user_role"
                                          checked={
                                            role.id == state.role ? true : false
                                          }
                                          value={id}
                                          onChange={(e) => onChangeRole(e)}
                                        />
                                        <span className="ml-3 mt-1 select-none">
                                          {title}
                                        </span>
                                      </label>
                                      <p className="text-sm text-gray3 dark:text-gray2 dark:text-opacity-60 font-normal mt-2 mb-3">
                                        {description}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          displayAllFeatures(permissions)
                                        }
                                        className="text-primary text-sm font-normal underline"
                                      >
                                        See all features
                                      </button>
                                    </div>
                                  </li>
                                );
                              })}
                            </>
                          ) : searchQuery !== "" &&
                            roles &&
                            roles.length == 0 ? (
                            <li className="text-center my-10 text-danger">
                              No Search Results Found
                            </li>
                          ) : (
                            <li className="text-center my-10 text-danger">
                              No User Roles Found
                            </li>
                          )}
                        </>
                      )}
                    </ul>

                    {/* Pagination */}
                    <div className="flex justify-end my-6">
                      {rolesLoading ? (
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
                      {state.errors.status}
                    </div>
                  </>
                )}
              </div>
              {/* User's Role Section : End */}
            </div>
          </div>

          {/* Manage Password Modal : Start */}
          {showManagePasswordModal && (
            <ManagePassword
              showPasswordModal={showManagePasswordModal}
              // setShowPasswordModal={setShowPasswordModal}
              id={id}
            />
          )}

          {/* Showing All features Modal : Start */}
          <ShowAllFeatures
            featuresOfTheSelected={featuresOfTheSelected}
            showAllFeatures={showAllFeatures}
            setShowAllFeatures={setShowAllFeatures}
          />

          <DeleteUserConfirmation
            isDeleteModalOpen={isDeleteModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            handleDeleteUser={handleDeleteUser}
          />
        </section>
      </Layout>
    </>
  );
};
export default EditUser;
