import React from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoginStep,
  resetOtpErrorMessage,
} from "../../redux/reduxes/auth/authAction";
import TwoFactorAuthentication from "../../components/login/twoFactorAuthentication";
import Authentication from "../../components/login/authentication";
import Skeleton from "react-loading-skeleton";

// Login Bg Style
const loginBgStyles = {
  background: 'url("/assets/images/login-bg.jpg") no-repeat',
  backgroundPosition: "100%",
  backgroundSize: "100%",
  backgroundColor: "#3475DD",
};

const Login = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const logoLoading = useSelector((state) => state.auth.logoLoading);
  const logoDetails = useSelector((state) => state.auth.logoDetails);
  const loginStep = useSelector((state) => state.auth.loginStep);
  const confirmOtpLoading = useSelector(
    (state) => state.auth.confirmOtpLoading,
  );
  const allPermissionsLoading = useSelector(
    (state) => state.auth.allPermissionsLoading,
  );

  // Go Back
  const goBack = (event) => {
    localStorage.clear();
    dispatch(setLoginStep(0));
    dispatch(resetOtpErrorMessage());
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>

      <section className="w-full relative bg-transparent flex flex-row items-center xl:h-screen">
        {allPermissionsLoading ? (
          <Skeleton
            count={3}
            height={60}
            baseColor="#f5f5f5"
            highlightColor="#e1e1e1"
            borderRadius="0"
            enableAnimation="true"
            duration={2.5}
            inline={true}
            className="dark:bg-darkMainBg mb-4"
          />
        ) : (
          <div className="flex md:flex-col landscape:flex-row xl:flex-row  container md:m-5 xl:mx-auto bg-white dark:bg-darkBg border border-white dark:border-opacity-20 p-8 xl:p-[60px] rounded-3xl w-full h-[80vh] drop-shadow">
            <div className="w-full md:landscape:w-[50%] xl:w-[40%]  py-8 xl:py-20 flex flex-col justify-center">
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center justify-center min-w-[200px] max-w-[300px] h-[150px]">
                  {logoLoading ? (
                    <Skeleton width={200} height={160} />
                  ) : (
                    <img
                      src={logoDetails && logoDetails.org_logo}
                      alt="organization-logo"
                      className="min-w-[200px] max-w-[300px] min-h-[100px] h-full object-contain"
                    />
                  )}
                </div>

                {loginStep != 0 && (
                  <button
                    type="button"
                    onClick={(e) => goBack(e)}
                    className="ml-auto text-base bg-transparent text-primary font-medium underline transition-all duration-300 hover:duration-300 hover:text-black2 dark:hover:text-gray2 hover:transition-all focus-visible:outline-0 active:outline-0"
                  >
                    Go Back
                  </button>
                )}
              </div>

              {loginStep == 0 ? (
                <>
                  <Authentication />
                </>
              ) : (
                <>
                  {confirmOtpLoading ? (
                    <Skeleton
                      count={4}
                      height={60}
                      baseColor="#f5f5f5"
                      highlightColor="#e1e1e1"
                      borderRadius="0"
                      enableAnimation="true"
                      duration={2.5}
                      inline={true}
                      className="dark:bg-darkMainBg mb-4"
                    />
                  ) : (
                    <TwoFactorAuthentication />
                  )}
                </>
              )}
            </div>

            <div
              className="flex flex-col justify-center md:w-full  md:landscape:w-[58%]  xl:w-[50%] md:h-[600px] xl:h-auto md:landscape:ml-[5%] xl:ml-[10%]  rounded-2xl p-12 relative before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-black2 before:bg-opacity-20 before:rounded-2xl"
              style={loginBgStyles}
            >
              <div className="text-base text-white uppercase tracking-widest">
                Welcome to
              </div>
              <h1 className="text-4xl text-white uppercase font-bold mb-2">
                {logoDetails?.description}
              </h1>
              <div className="mt-2 mb-10">
                <img src="../assets/logo.svg" alt="logo" className="w-36" />
              </div>
              <p className="text-white text-xl opacity-80 border-t-2 pt-5">
                Login to access Dashboard
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default Login;
