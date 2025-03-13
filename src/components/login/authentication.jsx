import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getPreLoginLogo,
  postLogin,
  resetErrorMessage,
  resetLoginLoading,
} from "../../redux/reduxes/auth/authAction";

const Authentication = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const loginLoading = useSelector((state) => state.auth.loginLoading);
  const loginErrors = useSelector((state) => state.auth.loginError);

  // States
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  });

  // Reset Error Message
  useEffect(() => {
    dispatch(resetErrorMessage());
    dispatch(resetLoginLoading());
  }, []);

  // Get Logo Details
  useEffect(() => {
    dispatch(getPreLoginLogo());
  }, []);

  // Validate Login Form
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    if (state.email == "" || state.password == "") valid = false;
    return valid;
  };

  // onChange Handler
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case "email":
        errors.email = value ? "" : "Email or username is required!";
        break;
      case "password":
        errors.password =
          value.length < 5
            ? "Password must be at least 5 characters long!"
            : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
    dispatch(resetErrorMessage());
  };

  // Form Submit
  async function handleSubmit(event) {
    event.preventDefault();
    if (validateForm(state.errors)) {
      const data = {
        email: state.email.toLowerCase(),
        password: state.password,
      };
      dispatch(postLogin(data));
    } else {
      let errors = state.errors;
      if (state.email == "") errors.email = "Enter an Email address";
      if (state.password == "") errors.password = "Enter Password";
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  }

  // Show and Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const passwordToggler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-10">
          <label
            htmlFor="login_email"
            className="text-sm text-black dark:text-gray2 font-medium uppercase tracking-widest mb-2"
          >
            Email or Username <span className="text-danger">*</span>
          </label>{" "}
          <br />
          <input
            type="text"
            className={`w-full py-3 px-4 bg-transparent dark:bg-darkBg dark:text-gray2 border-b border-solid border-gray2 rounded-none focus:border-secondary focus:outline-0 ${
              state.errors.email == "" ? "border-secondary" : "border-danger"
            }`}
            id="login_email"
            name="email"
            placeholder="Email or Username"
            onChange={(e) => handleChange(e)}
          />
          <div className="mb-10 text-danger">{state.errors.email}</div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <label
              htmlFor="current-password"
              className="text-sm text-black dark:text-gray2 font-medium uppercase tracking-widest mb-2"
            >
              Password <span className="text-danger">*</span>
            </label>{" "}
            <br />
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full py-3 px-4 bg-transparent dark:text-gray2 border-b border-solid border-gray2 rounded-none focus:border-secondary focus:outline-0 ${
                state.errors.password == ""
                  ? "border-secondary"
                  : "border-danger"
              }`}
              id="current-password"
              name="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
              autoComplete="current-password"
            />
            <button
              onClick={() => passwordToggler()}
              type="button"
              className="flex items-center justify-center absolute top-[25px] right-[1px] w-[60px] h-[62%] bg-white dark:bg-darkBg rounded-r-sm"
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
          <div className="text-danger">{state.errors.password}</div>
          {loginErrors && <div className="text-danger">{loginErrors}</div>}
        </div>

        <button
          type="submit"
          disabled={loginLoading}
          className={`${
            loginLoading
              ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
              : ""
          } w-full text-base bg-primary text-white font-medium uppercase border border-primary rounded-full px-4 py-3 mt-10 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none active:outline-none`}
        >
          {loginLoading ? "Loading..." : "Login"}
        </button>

        <div className="text-base text-gray3 mt-2">
          Forgot your login credentials?
          <Link
            to="/reset-password"
            exact={true}
            className="ml-2 font-medium transition-all hover:text-primary hover:transition-all"
          >
            Get help signing in
          </Link>
        </div>
      </form>
    </>
  );
};
export default Authentication;
