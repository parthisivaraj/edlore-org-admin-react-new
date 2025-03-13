import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmLoginOtp,
  resetOtpErrorMessage,
  resendLoginOtp,
  setLoginStep,
  setLoginOTPCounter,
} from "../../redux/reduxes/auth/authAction";
// import { setLoginStep } from "../../redux/reduxes/auth/authAction";

const TwoFactorAuthentication = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const authData = useSelector((state) => state.auth.authData);
  const confirmOtpLoading = useSelector(
    (state) => state.auth.confirmOtpLoading,
  );
  const confirmOtpError = useSelector((state) => state.auth.confirmOtpError);
  const showOTPCounter = useSelector((state) => state.auth.showOTPCounter);

  // States
  const [state, setState] = useState({
    otp: "",
    timeout: false,
    errors: {
      otp: "",
    },
  });

  // Confirm OTP Error
  useEffect(() => {
    let errors = state.errors;
    errors.otp = confirmOtpError && confirmOtpError;
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [confirmOtpError]);

  // OnChange Handler
  const handleChangeInput = (event) => {
    let errors = state.errors;
    setState((prevProps) => ({
      ...prevProps,
      errors,
      otp: event,
    }));
    dispatch(resetOtpErrorMessage());
  };

  // Validate Form
  const validateUserForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    if (state.otp.length < 6) valid = false;
    return valid;
  };

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateUserForm(state.errors)) {
      const data = {
        email: authData.email,
        token: authData.token,
        otp: state.otp,
      };
      dispatch(confirmLoginOtp(data));
      dispatch(setLoginOTPCounter());
    } else {
      let errors = state.errors;
      if (state.otp.length < 6) {
        errors.otp = "Invalid OTP";
      } else {
        errors.otp = "";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Resend OTP
  const resendLoginOtpClick = (event) => {
    event.preventDefault();
    const data = {
      token: authData.token,
    };
    dispatch(resendLoginOtp(data));
    handleResetClick();
  };

  // OTP Expiration Time
  const [timeRemaining, setTimeRemaining] = useState(120); // time remaining in seconds
  const [isRunning, setIsRunning] = useState(true); // whether the countdown is running or paused

  // decrement timeRemaining by 1 every second
  useEffect(() => {
    let interval;
    if (showOTPCounter && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
        if (timeRemaining == 1) {
          dispatch(setLoginOTPCounter());
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOTPCounter, timeRemaining]);

  // Reset the timer to 2 minutes
  const handleResetClick = () => {
    // setIsRunning(true);
    setTimeRemaining(120);
  };

  // Format the time remaining as mm:ss
  const minutes = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeRemaining % 60).toString().padStart(2, "0");
  const timeString = `${minutes}:${seconds}`;

  // Go Back
  const goBack = (event) => {
    localStorage.clear();
    dispatch(setLoginStep(0));
    dispatch(resetOtpErrorMessage());
  };

  return (
    <>
      <div>
        <p className="text-base font-normal dark:text-gray2">
          An email has been sent to <strong>{authData.email}</strong> with{" "}
          <strong>One Time Password</strong> please enter below to verify
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mt-10">
            <h4 className="text-sm font-medium dark:text-gray2">
              OTP (ONE TIME PASSWORD) <span className="text-danger">*</span>
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <OtpInput
                id="otp"
                name="otp"
                value={state.otp}
                numInputs={6}
                inputType="number"
                isInputNum={true}
                onChange={(e) => handleChangeInput(e)}
                containerStyle="text-center"
                renderInput={(props) => <input {...props} />}
                inputStyle="min-w-[40px] w-full px-2 py-2 mt-2 mr-2 text-center bg-transparent text-secondary font-bold border-b border-solid border-gray2 dark:border-opacity-50 rounded-none focus:text-secondary focus:border-secondary focus:outline-0 select-none"
              />
              <div className="text-danger mt-1 ml-1">{state.errors.otp}</div>
            </div>

            <div className="flex items-center mt-6">
              {(timeString == "00:00" ||
                state.errors.otp == "OTP expired" ||
                state.errors.otp == "Invalid OTP") &&
                !showOTPCounter && (
                  <button
                    type="button"
                    onClick={(e) => resendLoginOtpClick(e)}
                    className="text-sm text-primary uppercase font-medium underline"
                  >
                    Resend OTP
                  </button>
                )}
              {timeString != "00:00" && showOTPCounter && (
                <div className="ml-3 text-base text-gray3 font-medium">
                  <h1>{timeString}</h1>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={confirmOtpLoading}
                className={`${
                  confirmOtpLoading
                    ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                    : ""
                } w-full text-base bg-primary text-white font-medium uppercase border border-primary rounded-full px-4 py-3 mt-10 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none active:outline-none`}
              >
                {confirmOtpLoading ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="text-base text-gray3 mt-2">
                Have another account?
                <button
                  type="button"
                  onClick={(e) => goBack(e)}
                  className="ml-2 font-medium transition-all hover:text-primary hover:transition-all"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default TwoFactorAuthentication;
