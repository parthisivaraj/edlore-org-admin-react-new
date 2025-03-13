import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import Skeleton from "react-loading-skeleton";
import {
  addUsers,
  resetUserErrors,
} from "../../redux/reduxes/users/usersAction";
import {
  changeUserRolesSearchInUser,
  getUserRoles,
} from "../../redux/reduxes/userRoles/userRolesAction";
import { useDispatch, useSelector } from "react-redux";
import ShowAllFeatures from "../../components/users/showAllFeaturesModal";
import AlertModal from "../../components/common/alert";
import PaginatedItems from "../../components/common/pagination";
import { addToaster } from "../../redux/reduxes/toaster/tosterAction";
import PermissionsMessage from "../../components/common/permissionsMessage";

const AddUser = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const authData = useSelector((state) => state.auth.authData);
  const addUserLoading = useSelector((state) => state.users.addUserLoading);
  const addUserError = useSelector((state) => state.users.addUserError);
  const roles = useSelector((state) => state.user_roles.user_roles);
  const addUserRoleLoading = useSelector((state) => state.user_roles.loading);
  const pagination = useSelector(
    (state) => state.user_roles.user_roles_pagination,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.user_roles.searchUserRolesQueryInUser,
  );

  // Dispatch to User Roles
  useEffect(() => {
    const data = {
      user_id: "",
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
    };
    dispatch(getUserRoles(data));
  }, []);

  // Search Query
  useEffect(() => {
    const data = {
      user_id: "",
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
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
      user_id: "",
      search: searchQuery,
      page: e.selected,
      limit: 10,
      paginate: true,
      filter: {},
    };
    dispatch(getUserRoles(data));
  };

  // States
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [featuresOfTheSelected, setFeaturesOfTheSelected] = useState([]);
  const [generatePassword, setGeneratePassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Show/Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordToggler = () => {
    setShowPassword(!showPassword);
  };

  const passwordConfirmToggler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // States
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
    user_force_login: false,
    userRole: null,

    errors: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      mobile_number: "",
      identification_code: "",
      password: "",
      passwordUpperCase: "",
      passwordDigit: "",
      passwordSpecialCharacters: "",
      password_confirmation: "",
      userRole: "",
    },
  });

  // set errrors
  useEffect(() => {
    let errors = state.errors;
    if (addUserError && addUserError.length > 0) {
      addUserError.forEach((error) => {
        switch (error.name) {
          case "email":
            errors.email = error.message;
            break;
          case "username":
            errors.username = error.message;
            break;
          case "password_confirmation":
            errors.password_confirmation = error.message;
            break;
          case "identification_code":
            errors.identification_code = error.message;
            break;
          default:
            break;
        }
      });
    }
    //  else {
    //   errors.password_confirmation = "";
    //   errors.email = "";
    //   errors.identification_code = "";
    // }
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [addUserError]);

  // Validate Form
  const validateUserForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (val = false));
    if (
      state.first_name == "" ||
      state.last_name == "" ||
      state.email == "" ||
      state.username == "" ||
      state.mobile_number == "" ||
      // state.identification_code == "" ||
      state.password == "" ||
      state.password_confirmation == "" ||
      state.errors.passwordUpperCase != "" ||
      state.errors.passwordDigit != "" ||
      state.errors.passwordSpecialCharacters != "" ||
      state.password.length < 8 ||
      state.userRole == null
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
    const letters = RegExp(/^[A-Za-z]+$/);

    const { value, name } = event.target;
    let errors = state.errors;

    switch (name) {
      case "first_name":
        errors.first_name = letters.test(value)
          ? ""
          : "Firstname must contain only letters (no spaces or special characters). ";
        break;
      case "last_name":
        errors.last_name = letters.test(value)
          ? ""
          : "Lastname must contain only letters (no spaces or special characters).";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is Invalid";
        break;
      case "username":
        errors.username = value ? "" : "Username is Invalid";
        break;
      case "mobile_number":
        if (!digits.test(value)) {
          errors.mobile_number = "Phone Number can only be numbers";
        } else if (value.length != 10) {
          errors.mobile_number = "Phone Number must be atleast 10 digits";
        } else {
          errors.mobile_number = "";
        }
        errors.mobile_number =
          value.length == 10 ? "" : "Phone Number must be atleast 10 digits";
        break;
      // case 'identification_code':
      //   errors.identification_code = value == "" ? "Enter Identification Code" : "";
      //   break;
      case "password":
        if (!upperCaseLetters.test(value)) {
          errors.passwordUpperCase =
            "Password should have atleast one Uppercase letter";
        } else {
          errors.passwordUpperCase = "";
        }
        if (!digits.test(value)) {
          errors.passwordDigit = "Password should have atleast one Digit";
        } else {
          errors.passwordDigit = "";
        }
        if (!specialCharacters.test(value)) {
          errors.passwordSpecialCharacters =
            "Password should have atleast one Special character";
        } else {
          errors.passwordSpecialCharacters = "";
        }
        if (value.length < 8) {
          errors.password = "Password must be minimum of 8 characters long";
        } else {
          errors.password = "";
        }
        if (value != state.password_confirmation) {
          errors.password_confirmation = "Enter Same Password";
        } else {
          errors.password_confirmation = "";
        }
        break;
      case "password_confirmation":
        if (value == "") {
          errors.password_confirmation = "Enter Confirm Password";
        } else if (value != state.password) {
          errors.password_confirmation = "Enter Same Password";
        } else {
          errors.password_confirmation = "";
        }
        break;
      case "userRole":
        errors.userRole =
          state.userRole == null ? "Select atleast one User role" : "";
        break;
      default:
        break;
    }

    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
  };

  // Profile Image Handler
  const [img, setImg] = useState("");
  const handleChangeProfileImage = (event) => {
    const [file] = event.target.files;
    if (file.type != "") {
      setImg(URL.createObjectURL(file));
      setState((prevProps) => ({
        ...prevProps,
        file: event.target.files[0],
      }));
    } else {
      const data = {
        content: "Can't upload this file as profile picture!",
        type: "failed",
      };
      dispatch(addToaster(data));
    }
  };

  // User Roles Handler
  const handleChangeUserRoles = (event) => {
    let errors = state.errors;
    errors.userRole = "";
    setState((prevProps) => ({
      ...prevProps,
      userRole: event.target.value,
      errors,
    }));
  };
  // Show All Features
  const displayAllFeatures = (data) => {
    setFeaturesOfTheSelected(data);
    setShowAllFeatures(true);
  };

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateUserForm(state.errors)) {
      const data = {
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
        username: state.username,
        user_phone: state.mobile_number,
        identification_code: state.identification_code,
        password: state.password,
        password_confirmation: state.password_confirmation,
        user_force_login: state.user_force_login,
        userRole: state.userRole,
        image: state.file,
        org_id: authData.org_id,
      };
      dispatch(addUsers(data));
    } else {
      let errors = state.errors;
      if (state.first_name == "") errors.first_name = "Enter First Name";
      if (state.last_name == "") errors.last_name = "Enter Last Name";
      if (state.email == "") errors.email = "Enter Email ID";
      if (state.username == "") errors.username = "Enter Username";
      if (state.mobile_number == "")
        errors.mobile_number = "Enter Phone Number";
      // if (state.identification_code == "")
      //   errors.identification_code = "Enter Identification Code"
      if (
        state.password == "" &&
        state.errors.upperCaseLetters != "" &&
        state.errors.digits != "" &&
        state.errors.specialCharacters != "" &&
        state.password.length < 8
      )
        errors.password = "Enter Password";
      if (state.password != state.password_confirmation) {
        errors.password_confirmation = "Enter Same Password";
      }
      if (state.password_confirmation != state.password) {
        errors.password_confirmation = "Confirm Password doesn't match";
      } else if (state.password_confirmation == "") {
        errors.password_confirmation = "Enter Confirm Password";
      } else {
        errors.password_confirmation = "";
      }
      if (state.userRole == null) {
        errors.userRole = "Select atleast one User role";
      } else {
        errors.userRole = "";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
    dispatch(resetUserErrors());
  };

  // Generate Random Password Handler
  function generatePasswordHandler() {
    var lc = "abcdefghijklmnopqrstuvwxyz";
    var uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var n = "0123456789";
    var sp = "!@#$%^&*";
    var lcLength = 2;
    var ucLength = 2;
    var nLength = 2;
    var spLength = 1;
    var password = "";
    for (var i = 0; i <= lcLength; i++) {
      var randomNumber = Math.floor(Math.random() * lc.length);
      password += lc.substring(randomNumber, randomNumber + 1);
    }
    for (var i = 0; i <= ucLength; i++) {
      var randomNumber = Math.floor(Math.random() * uc.length);
      password += uc.substring(randomNumber, randomNumber + 1);
    }
    for (var i = 0; i <= nLength; i++) {
      var randomNumber = Math.floor(Math.random() * n.length);
      password += n.substring(randomNumber, randomNumber + 1);
    }
    for (var i = 0; i <= spLength; i++) {
      var randomNumber = Math.floor(Math.random() * sp.length);
      password += sp.substring(randomNumber, randomNumber + 1);
    }
    let errors = state.errors;
    errors.passwordDigit = "";
    errors.passwordSpecialCharacters = "";
    errors.passwordUpperCase = "";
    errors.password = "";
    errors.password_confirmation = "";
    setState((prevProps) => ({
      ...prevProps,
      errors,
      password: password,
      password_confirmation: password,
    }));
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add New User</title>
      </Helmet>

      <Layout>
        <section>
          <div className="overflow-hidden">
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
                  to="/users"
                  exact={true}
                  className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"
                >
                  All Users /
                </Link>
                <span className="ml-1 text-xs text-secondary font-semibold">
                  {" "}
                  Add New User
                </span>
              </div>
              <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold mb-6 2xl:mb-10">
                Add New User
              </h1>
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-6">
                {/* User Form Section : Start */}
                <div className="col-start-1 w-full h-full  bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl p-8 drop-shadow-md overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <div className="grid rid-cols-1 lg:grid-cols-2 gap-3 xl:gap-6">
                    <div className="col-span-2 lg:col-span-1">
                      <label
                        htmlFor="user_full_name"
                        className="text-sm font-medium leading-9 dark:text-gray2"
                      >
                        First Name <span className="text-danger">*</span>
                      </label>{" "}
                      <br />
                      <input
                        type="text"
                        className="w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                        id="user_first_name"
                        name="first_name"
                        value={state.first_name}
                        placeholder="User First Name"
                        onChange={(e) => handleChangeInput(e)}
                      />
                      <div className="text-danger mt-1 ml-1">
                        {state.errors.first_name}
                      </div>
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      <label
                        htmlFor="user_full_name"
                        className="text-sm font-medium leading-9 dark:text-gray2"
                      >
                        Last Name <span className="text-danger">*</span>
                      </label>{" "}
                      <br />
                      <input
                        type="text"
                        className="w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                        id="user_last_name"
                        name="last_name"
                        value={state.last_name}
                        placeholder="User Last Name"
                        onChange={(e) => handleChangeInput(e)}
                      />
                      <div className="text-danger mt-1 ml-1">
                        {state.errors.last_name}
                      </div>
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      {addUserLoading ? (
                        <Skeleton
                          height={70}
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="10"
                          enableAnimation="true"
                          duration={2.5}
                          inline={true}
                          className="dark:bg-darkMainBg"
                        />
                      ) : (
                        <>
                          <label
                            htmlFor="user_email"
                            className="text-sm font-medium leading-9 dark:text-gray2"
                          >
                            Email <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                            id="user_email"
                            name="email"
                            value={state.email}
                            placeholder="User Email"
                            onChange={(e) => handleChangeInput(e)}
                            autoComplete="off"
                          />
                          <div className="text-danger mt-1 ml-1">
                            {state.errors.email}
                          </div>
                          {addUserError &&
                            addUserError.email &&
                            addUserError.email.length > 0 &&
                            addUserError.email.map((err, inde) => (
                              <div className="text-danger mt-1 ml-1">{err}</div>
                            ))}
                        </>
                      )}
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      {addUserLoading ? (
                        <Skeleton
                          height={70}
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="10"
                          enableAnimation="true"
                          duration={2.5}
                          inline={true}
                          className="dark:bg-darkMainBg"
                        />
                      ) : (
                        <>
                          <label
                            htmlFor="user_username"
                            className="text-sm font-medium leading-9 dark:text-gray2"
                          >
                            Username <span className="text-danger">*</span>
                          </label>
                          <input
                            className="w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                            id="user_username"
                            name="username"
                            value={state.username}
                            placeholder="Username"
                            onChange={(e) => handleChangeInput(e)}
                            autoComplete="off"
                          />
                          <div className="text-danger mt-1 ml-1">
                            {state.errors.username}
                          </div>
                          {addUserError &&
                            addUserError.username &&
                            addUserError.username.length > 0 &&
                            addUserError.username.map((err, inde) => (
                              <div className="text-danger mt-1 ml-1">{err}</div>
                            ))}
                        </>
                      )}
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      {addUserLoading ? (
                        <Skeleton
                          height={70}
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="10"
                          enableAnimation="true"
                          duration={2.5}
                          inline={true}
                          className="dark:bg-darkMainBg"
                        />
                      ) : (
                        <>
                          <label
                            htmlFor="mobile_number"
                            className="text-sm font-medium leading-9 dark:text-gray2"
                          >
                            Phone <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                            id="mobile_number"
                            name="mobile_number"
                            value={state.mobile_number}
                            placeholder="User Phone Number"
                            onChange={(e) => handleChangeInput(e)}
                            autoComplete="off"
                          />
                          <div className="text-danger mt-1 ml-1">
                            {state.errors.mobile_number}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                      {addUserLoading ? (
                        <Skeleton
                          height={70}
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="10"
                          enableAnimation="true"
                          duration={2.5}
                          inline={true}
                          className="dark:bg-darkMainBg"
                        />
                      ) : (
                        <>
                          <label
                            htmlFor="identification_code"
                            className="text-sm font-medium leading-9 dark:text-gray2"
                          >
                            CAC Number
                          </label>{" "}
                          <br />
                          <input
                            type="text"
                            className="w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                            id="identification_code"
                            name="identification_code"
                            value={state.identification_code}
                            placeholder="CAC Number"
                            onChange={(e) => handleChangeInput(e)}
                            min="0"
                          />
                          <div className="text-danger mt-1 ml-1">
                            {state.errors.identification_code}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="col-span-2 lg:col-span-1 relative overflow-hidden">
                      {addUserLoading ? (
                        <Skeleton
                          height={120}
                          width={120}
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
                          <div className="text-sm font-medium leading-9 dark:text-gray2">
                            Upload profile picture
                          </div>
                          <input
                            type="file"
                            className="absolute z-20 w-[80px] h-[80px] text-[0] opacity-0 bg-gray2 dark:bg-darkMainBg text-black2 border border-gray2 dark:border-opacity-20 rounded-md  cursor-pointer"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={(e) => handleChangeProfileImage(e)}
                          />
                          <div className="flex flex-col justify-center items-center bg-gray2 dark:bg-darkMainBg bg-opacity-50 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md w-[80px] h-[80px] overflow-hidden cursor-pointer">
                            {img ? (
                              <img
                                src={img}
                                alt={state.first_name}
                                className="w-[80px] h-[80px] object-cover object-[100%] rounded-md cursor-pointer"
                              />
                            ) : (
                              <img
                                src="../assets/icons/icon-user.svg"
                                alt="icon-user"
                                className="w-5 h-5 invert cursor-pointer dark:invert-0"
                              />
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="co-start-1 col-span-2">
                      {addUserLoading ? (
                        <Skeleton
                          height={70}
                          count={2}
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="10"
                          enableAnimation="true"
                          duration={2.5}
                          inline={true}
                          className="dark:bg-darkMainBg"
                        />
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="new-password"
                              className="text-sm font-medium leading-9 dark:text-gray2"
                            >
                              Password <span className="text-danger">*</span>
                            </label>
                            <button
                              onClick={generatePasswordHandler}
                              type="button"
                              className="text-primary text-sm font-medium underline  focus:outline-none"
                            >
                              Generate password
                            </button>
                          </div>

                          <div className="mb-3">
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                className="ed-form__input-password appearance-none w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none focus:shadow-outline"
                                id="new-password"
                                name="password"
                                value={state.password}
                                placeholder="Enter Password"
                                onChange={(e) => handleChangeInput(e)}
                                autoComplete="new-password"
                              />
                              <button
                                onClick={() => passwordToggler()}
                                type="button"
                                className="flex items-center justify-center absolute top-[1px] right-[1px] w-[60px] h-[95%] bg-white dark:bg-darkMainBg rounded-r-lg"
                              >
                                {showPassword == true ? (
                                  <img
                                    src="../assets/icons/icon-eye-show.svg"
                                    alt="icon-eye-show"
                                    className="w-[18px] h-[18px] dark:invert"
                                  />
                                ) : (
                                  <img
                                    src="../assets/icons/icon-eye-hide.svg"
                                    alt="icon-eye-hide"
                                    className="w-[18px] h-[18px] dark:invert"
                                  />
                                )}
                              </button>
                            </div>
                            <div className="text-danger mt-1 ml-1">
                              {state.errors.password}
                            </div>
                            <div className="text-danger mt-1 ml-1">
                              {state.errors.passwordUpperCase}
                            </div>
                            <div className="text-danger mt-1 ml-1">
                              {state.errors.passwordDigit}
                            </div>
                            <div className="text-danger mt-1 ml-1">
                              {state.errors.passwordSpecialCharacters}
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="new-password"
                              className="text-sm font-medium leading-9 dark:text-gray2"
                            >
                              Confirm Password{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="ed-form__input-password appearance-none w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4  focus:border-secondary focus:outline-none focus:shadow-outline"
                                id="new-password"
                                name="password_confirmation"
                                value={state.password_confirmation}
                                placeholder="Confirm Password"
                                onChange={(e) => handleChangeInput(e)}
                                autoComplete="new-password"
                              />
                              <button
                                onClick={() => passwordConfirmToggler()}
                                type="button"
                                className="flex items-center justify-center absolute top-[1px] right-[1px] w-[60px] h-[95%] bg-white dark:bg-darkMainBg rounded-r-lg"
                              >
                                {showConfirmPassword == true ? (
                                  <img
                                    src="../assets/icons/icon-eye-show.svg"
                                    alt="icon-eye-show"
                                    className="w-[18px] h-[18px] dark:invert"
                                  />
                                ) : (
                                  <img
                                    src="../assets/icons/icon-eye-hide.svg"
                                    alt="icon-eye-hide"
                                    className="w-[18px] h-[18px] dark:invert"
                                  />
                                )}
                              </button>
                            </div>
                            <div className="text-danger mt-1 ml-1">
                              {state.errors.password_confirmation}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* User Form Section : End */}

                {/* User's Role Section : Start */}
                <div className="md:col-start-1 xl:col-start-2 w-full h-full 2xl:h-[650px] bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl 2xl:text-2xl text-black2 dark:text-gray2 font-medium">
                        Select a User Role
                      </h4>
                      <p className="text-base text-black2 dark:text-gray2 font-normal">
                        Choose a user role or create a new one
                      </p>
                    </div>

                    {(permissions.includes("all_role") ||
                      permissions.includes("write_role") ||
                      permissions.includes("Admin")) && (
                      <button
                        type="button"
                        onClick={() => setShowAlert(true)}
                        className="bg-primary text-white md:text-sm 2xl:text-base whitespace-nowrap border border-primary px-6 py-2 rounded-full shadow-md transition-all hover:bg-transparent hover:text-primary hover:transition-all"
                      >
                        Add New Role +
                      </button>
                    )}
                  </div>

                  {!(
                    permissions.includes("all_role") ||
                    permissions.includes("read_role") ||
                    permissions.includes("Admin")
                  ) ? (
                    <PermissionsMessage
                      additionalClassName="py-40"
                      title="User Role"
                      message="read role"
                    />
                  ) : (
                    <>
                      {/* Search Bar */}
                      <div className="relative mt-6 mb-10 overflow-hidden">
                        <input
                          type="search"
                          className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 py-2.5 px-6 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
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
                      <ul className="h-[500px] xl:h-[300px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                        {addUserRoleLoading ? (
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
                                      className="border-b border-gray2 dark:border-opacity-40 pb-4 mb-5 ml-1"
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
                                            value={id}
                                            onChange={(e) =>
                                              handleChangeUserRoles(e)
                                            }
                                            checked={
                                              id === state.userRole
                                                ? true
                                                : false
                                            }
                                          />
                                          <span className="ml-3 mt-[2px] select-none">
                                            {title}
                                          </span>
                                        </label>
                                        <p className="text-sm text-gray3 dark:text-gray2 dark:text-opacity-60 font-normal mt-2 mb-3 first-letter:capitalize">
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
                        {addUserRoleLoading ? (
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
                            totalEntries={
                              pagination && pagination.total_entries
                            }
                          />
                        )}
                      </div>
                      <div className="text-danger mt-1 ml-1">
                        {state.errors.userRole}
                      </div>
                    </>
                  )}
                </div>
                {/* User's Role Section : End */}
              </div>

              <div className="flex items-center justify-end mt-8">
                <Link
                  to="/users"
                  exact={true}
                  className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-darkBg hover:transition-all focus-visible:outline-none"
                >
                  Go Back
                </Link>
                <button
                  type="submit"
                  disabled={addUserLoading}
                  className={`${
                    addUserLoading
                      ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                      : ""
                  } bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
                >
                  {addUserLoading ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>

            {/* Decision Modal */}
            <AlertModal
              modalAction={setShowAlert}
              modalValue={showAlert}
              head="Are you Sure ?"
              content="Data entered will be lost when you Proceed further. Are you sure you want to continue?"
              successButton="Proceed to create a User Role"
            />

            {/* Showing All features Modal : Start */}
            <ShowAllFeatures
              featuresOfTheSelected={featuresOfTheSelected}
              showAllFeatures={showAllFeatures}
              setShowAllFeatures={setShowAllFeatures}
            />
          </div>
        </section>
      </Layout>
    </>
  );
};
export default AddUser;
