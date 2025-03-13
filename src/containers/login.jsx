import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getPreLoginLogo,
  postLogin,
  resetErrorMessage,
} from "../redux/reduxes/auth/authAction";

// Login Bg Style
const loginBgStyles = {
  background: 'url("/assets/images/login-bg.jpg") no-repeat',
  backgroundPosition: "100%",
  backgroundSize: "100%",
  backgroundColor: "#3475DD",
};

const Login = (props) => {
  const dispatch = useDispatch();

  // Fetch Data
  const loginErrors = useSelector((state) => state.auth.loginError);
  const logoDetails = useSelector((state) => state.auth.logoDetails);

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
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    );
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case "email":
        errors.email = !value ? "" : "Email/Username is required";
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
        email: state.email,
        password: state.password,
      };
      dispatch(postLogin(data));
    } else {
      let errors = state.errors;
      if (state.email == "") errors.email = "Enter an email address";
      if (state.password == "") errors.password = "Enter a password";
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>

      <section className="w-full relative bg-transparent flex flex-row items-center xl:h-screen">
        <div className="flex md:flex-col landscape:flex-row xl:flex-row  container md:m-5 xl:mx-auto bg-white p-8 xl:p-20 rounded-3xl w-full  h-max drop-shadow">
          <div className="md:w-full md:landscape:w-[50%] xl:w-[40%]  py-8 xl:py-20 flex flex-col justify-center">
            <div className="flex justify-start text-left mb-10 min-w-[100px] max-w-[200px] h-[50px]">
              <img
                src={logoDetails && logoDetails.org_logo}
                alt="organization-logo"
                className="min-w-[200px] w-full h-[50px] object-contain"
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-10">
                <label
                  htmlFor="login_email"
                  className="text-sm text-black font-medium uppercase tracking-widest mb-2"
                >
                  Email or Username <span className="text-danger">*</span>
                </label>{" "}
                <br />
                <input
                  type="text"
                  className={`w-full p-2 bg-transparent border-b border-solid border-gray2 rounded-none focus:border-secondary focus:outline-0 ${
                    state.errors.email == ""
                      ? "border-secondary"
                      : "border-danger"
                  }`}
                  id="login_email"
                  name="email"
                  placeholder="Email or Username"
                  onChange={(e) => handleChange(e)}
                />
                <div className="mb-10 text-danger">{state.errors.email}</div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="login_password"
                  className="text-sm text-black font-medium uppercase tracking-widest mb-2"
                >
                  Password <span className="text-danger">*</span>
                </label>{" "}
                <br />
                <input
                  type="password"
                  className={`w-full p-2 bg-transparent border-b border-solid border-gray2 rounded-none focus:border-secondary focus:outline-0 ${
                    state.errors.password == ""
                      ? "border-secondary"
                      : "border-danger"
                  }`}
                  id="login_password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                />
                <div className="text-danger">{state.errors.password}</div>
                {loginErrors && (
                  <div className="text-danger">{loginErrors}</div>
                )}
              </div>

              {/* <div className="mb-8">
                <label htmlFor="login_remember" className='d-flex items-center'>
                  <input
                    type="checkbox"
                    id="login_remember"
                    name="login_remember"
                    className='w-4 h-4'
                  />
                  <span className='ml-1'>Remember me</span>
                </label>
              </div> */}

              <button
                type="submit"
                className="w-full text-lg bg-primary text-white font-medium uppercase border border-primary rounded-full p-2 mt-10 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none active:outline-none"
              >
                Login
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

            <div className="mt-10">
              <img src="../assets/logo.svg" alt="logo" className="w-36" />
            </div>
          </div>

          <div
            className="flex flex-col justify-center md:w-full  md:landscape:w-[58%]  xl:w-[50%] md:h-[600px] xl:h-auto md:landscape:ml-[5%] xl:ml-[10%]  rounded-2xl p-12 relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-black2 before:bg-opacity-20 before:rounded-2xl"
            style={loginBgStyles}
          >
            <div className="text-base text-white uppercase tracking-widest">
              Welcome to
            </div>
            <h1 className="text-6xl text-white uppercase font-bold mb-10">
              Edlore
            </h1>
            <p className="text-white text-xl opacity-80 border-t-2 pt-5">
              Login to access Dashboard
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
