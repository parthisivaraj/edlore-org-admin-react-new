import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { triggerOtp, resetErrors } from "../../redux/reduxes/resetPassword/resetPasswordAction";

const VerifyEmail = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const triggerOtpError = useSelector(state => state.resetPassword.triggerOtpError);

  // State
  const [state, setState] = useState({
    email: "",
    errors: {
      email: '',
    }
  });

  // Trigger OTP
  useEffect(() => {
    let errors = state.errors;
    errors.email = triggerOtpError && triggerOtpError;
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [triggerOtpError]);

  // Validations
  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  // OnChange Hanlder
  const handleChangeInput = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    let errors = state.errors;

    switch (name) {
      case 'email':
        errors.email = validEmailRegex.test(value) ? "" : "Email is Invalid";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value
    }));
    dispatch(resetErrors());
  };

  // Validate Form
  const validateUserForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (state.email == "" || !validEmailRegex.test(state.email))
      valid = false;
    return valid;
  }

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateUserForm(state.errors)) {
      const data = {
        email: state.email,
      }
      dispatch(triggerOtp(data));
    } else {
      let errors = state.errors;
      if (state.email == "")
        errors.email = "Enter Email ID"
      if (validEmailRegex.test(state.email))
        errors.email = "Email is Invalid"

      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));
    }
  };


  return (
    <>
      <div className='flex flex-col mx-auto w-[600px] bg-white dark:bg-darkBg border border-gray2 dark:border-opacity-50 rounded-3xl p-8'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className='text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-10 dark:text-gray2'>Recover Password</h1>

          <div className='mb-8'>
            <label htmlFor="reset_email" className='text-sm font-medium dark:text-gray2'>Enter your email to receive OTP <span className='text-danger'>*</span></label>
            <input
              type="email"
              id="reset_email"
              name="email"
              value={state.email}
              placeholder='Enter Email ID'
              onChange={(e) => handleChangeInput(e)}
              className="w-full px-4 py-3 mt-2 bg-transparent dark:text-gray2 border border-solid border-gray2 dark:border-opacity-50 rounded-md focus:border-secondary focus:outline-0"
            />
            <div className='text-danger mt-1 ml-1'>{state.errors.email}</div>
          </div>
          <button type='submit' className='w-full text-base bg-primary text-white font-medium uppercase border border-primary rounded-full px-4 py-3 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none active:outline-none'>Get OTP</button>
          <div className='text-base text-gray3 mt-10'>
            If you don't remember your email. Please contact EDLORE Support team at
            <a href="mailto:support@edlore.com" className='text-primary ml-2 font-medium transition-all hover:text-primary hover:transition-all'>support@edlore.com</a>
          </div>
        </form>
      </div>
    </>
  )
}
export default VerifyEmail;