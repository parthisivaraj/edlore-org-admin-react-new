import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetErrors,
  triggerOtp,
  verifyOtp,
} from "../../redux/reduxes/resetPassword/resetPasswordAction";
import OtpInput from "react-otp-input";

const VerifyOTP = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const email = useSelector((state) => state.resetPassword.email);
  const verifyOtpError = useSelector(
    (state) => state.resetPassword.verifyOtpError,
  );

  // States
  const [state, setState] = useState({
    otp: "",
    timeout: false,
    errors: {
      otp: "",
    },
  });

  // Verify OTP Error
  useEffect(() => {
    let errors = state.errors;
    errors.otp = verifyOtpError && verifyOtpError;
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [verifyOtpError]);

  // OnChange Handler
  const handleChangeInput = (event) => {
    let errors = state.errors;
    errors.otp = "";
    setState((prevProps) => ({
      ...prevProps,
      errors,
      otp: event,
    }));
    dispatch(resetErrors());
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
        email: email,
        otp: state.otp,
      };
      dispatch(verifyOtp(data));
    } else {
      let errors = state.errors;
      if (state.otp.length < 6) errors.otp = "Invalid OTP";

      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Resend OTP
  const resendOtp = () => {
    const data = {
      email: email,
    };
    dispatch(triggerOtp(data));
    let errors = state.errors;
    errors.otp = "";

    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
      otp: "",
    }));
    handleResetClick();
  };

  // OTP Timer
  const [timeRemaining, setTimeRemaining] = useState(120); // time remaining in seconds
  const [isRunning, setIsRunning] = useState(true); // whether the countdown is running or paused

  // decrement timeRemaining by 1 every second
  useEffect(() => {
    let interval;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  // Reset the timer to 2 minutes
  const handleResetClick = () => {
    setIsRunning(true);
    setTimeRemaining(120);
  };

  // Format the time remaining as mm:ss
  const minutes = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeRemaining % 60).toString().padStart(2, "0");
  const timeString = `${minutes}:${seconds}`;

  return (
    <>
      <div className="flex flex-col mx-auto w-[600px] bg-white dark:bg-darkBg border border-gray2 dark:border-opacity-50 rounded-3xl p-8">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-10 dark:text-gray2">
            Recover Password
          </h1>
          <p className="mb-8 dark:text-gray2">
            An email has been sent with <strong>One Time Password</strong>{" "}
            please enter below to verify
          </p>

          <div className="flex items-center">
            <label className="text-sm font-medium dark:text-gray2">
              Enter One-Time-Password (OTP){" "}
              <span className="text-danger">*</span>
            </label>
            <div className="flex items-center ml-auto">
              {timeString != "00:00" && (
                <div className="dark:text-gray2">
                  <h1>{timeString}</h1>
                </div>
              )}
              {timeString == "00:00" && (
                <button
                  type="button"
                  onClick={() => resendOtp()}
                  className="text-sm text-primary uppercase font-medium ml-3"
                >
                  Resend OTP
                </button>
              )}
              {/* } */}
            </div>
          </div>
          {!state.timeout && (
            <div className="grid grid-cols-1 gap-4">
              <OtpInput
                id="otp"
                name="otp"
                value={state.otp}
                numInputs={6}
                isInputNum={true}
                inputType="number"
                onChange={(e) => handleChangeInput(e)}
                containerStyle="text-center"
                renderInput={(props) => <input {...props} />}
                inputStyle="min-w-[40px] w-full px-2 py-2 mt-2 mr-2 text-center bg-transparent text-secondary font-bold border border-solid border-gray2 dark:border-opacity-50 rounded-md focus:text-secondary focus:border-secondary focus:outline-0 select-none"
              />

              <div className="text-danger mt-1 ml-1">{state.errors.otp}</div>
            </div>
          )}
          {!state.timeout && (
            <button
              type="submit"
              className="w-full text-base mt-8 mb-4 bg-primary text-white font-medium uppercase border border-primary rounded-full px-4 py-3 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none active:outline-none"
            >
              Verify OTP
            </button>
          )}
        </form>
      </div>
    </>
  );
};
export default VerifyOTP;
