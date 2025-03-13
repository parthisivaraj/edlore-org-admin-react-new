import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetErrors, resetPassword } from "../../redux/reduxes/resetPassword/resetPasswordAction";

const ChangePassword = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const email = useSelector(state => state.resetPassword.email);
  const otp = useSelector(state => state.resetPassword.otp);

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    password: "",
    password_confirmation: "",
    errors: {
      password: '',
      passwordUpperCase: '',
      passwordDigit: '',
      passwordSpecialCharacters: '',
      password_confirmation: '',
    }
  });

  // Validations
  const upperCaseLetters = RegExp(/[A-Z]/g);
  const digits = RegExp(/[0-9]/g);
  const specialCharacters = RegExp(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/);
  const letters = RegExp(/^[A-Za-z]+$/);

  // onChange Handler
  const handleChangeInput = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    let errors = state.errors;

    switch (name) {
      case 'password':
        if (!upperCaseLetters.test(value)) {
          errors.passwordUpperCase = "Password should have atleast one Uppercase letter"
        } else {
          errors.passwordUpperCase = "";
        }
        if (!digits.test(value)) {
          errors.passwordDigit = "Password should have atleast one Digit"
        } else {
          errors.passwordDigit = "";
        }
        if (!specialCharacters.test(value)) {
          errors.passwordSpecialCharacters = "Password should have atleast one Special character"
        } else {
          errors.passwordSpecialCharacters = "";
        }
        if (value.length < 8) {
          errors.password = "Password must be minimum of 8 characters long"
        } else {
          errors.password = "";
        }
        break;
      case 'password_confirmation':
        errors.password_confirmation = (value == "" || value != state.password) ? "Enter Same Password" : "";
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
    if (state.password == "" ||
      state.password_confirmation == "" ||
      state.password == "" ||
      state.errors.passwordUpperCase != "" ||
      state.errors.passwordDigit != "" ||
      state.errors.passwordSpecialCharacters != "" ||
      state.password.length < 8)
      valid = false;
    return valid;
  }

  // Submit Form Handler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateUserForm(state.errors)) {
      const data = {
        email: email,
        otp: otp,
        password: state.password,
        password_confirmation: state.password_confirmation,
      }
      dispatch(resetPassword(data));
    } else {
      let errors = state.errors;
      if (state.password == "" && state.errors.upperCaseLetters != "" && state.errors.digits != "" && state.errors.specialCharacters != "" && state.password.length < 8)
        errors.password = "Enter Password"
      if (state.password_confirmation !== state.password) {
        errors.password_confirmation = "Confirm Password doesn't match"
      } else if (state.password_confirmation == "") {
        errors.password_confirmation = "Enter Confirm Password"
      } else {
        errors.password_confirmation = "";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));
    }
  };


  return (
    <>
      <div className='flex flex-col mx-auto w-[600px] bg-white dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-3xl p-8'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className='text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-8'>Change Password</h1>
          <div className="text-base mb-2">In order to protect your account, make sure your password</div>
          <ul className="ml-5 mb-8">
            <li className="font-light list-disc">Is longer than 7 characters.</li>
            <li className="font-light list-disc">Does not match or significantly contain your email</li>
            <li className="font-light list-disc">Is a mixture of both uppercase and lowercase letters</li>
            <li className="font-light list-disc">Is a mixture of letters and numbers</li>
            <li className="font-light list-disc">Includes atleast one special character, e.g: ! @ # ? ]</li>
          </ul>

          <div className="relative mb-4">
            <label htmlFor="reset_password" className='text-sm font-medium'>New Password <span className='text-danger'>*</span></label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="reset_password"
              name="password"
              value={state.password}
              onChange={(e) => handleChangeInput(e)}
              placeholder='Enter New Password'
              className="w-full px-4 py-3 mt-2 bg-transparent border border-solid border-gray2 dark:border-opacity-50 rounded-md focus:border-secondary focus:outline-0"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-[48px] right-[10px] bg-white dark:bg-transparent px-2">
              {showPassword ?
                <img src="../assets/icons/icon-eye-on.svg" alt="icon-eye-on" className="w-5 h-5 dark:invert" />
                :
                <img src="../assets/icons/icon-eye-off.svg" alt="icon-eye-off" className="w-5 h-5 dark:invert" />
              }
            </button>
            <div className='text-danger mt-1 ml-1'>{state.errors.password}</div>
            <div className='text-danger mt-1 ml-1'>{state.errors.passwordUpperCase}</div>
            <div className='text-danger mt-1 ml-1'>{state.errors.passwordDigit}</div>
            <div className='text-danger mt-1 ml-1'>{state.errors.passwordSpecialCharacters}</div>
          </div>

          <div className="relative mb-8">
            <label htmlFor="confirm_password" className='text-sm font-medium'>Re-enter New Password <span className='text-danger'>*</span></label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirm_password"
              name="password_confirmation"
              value={state.password_confirmation}
              onChange={(e) => handleChangeInput(e)}
              placeholder='Confirm Password'
              className="w-full px-4 py-3 mt-2 bg-transparent border border-solid border-gray2 dark:border-opacity-50 rounded-md focus:border-secondary focus:outline-0"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-[48px] right-[10px] bg-white dark:bg-transparent px-2">
              {showPassword ?
                <img src="../assets/icons/icon-eye-on.svg" alt="icon-eye-on" className="w-5 h-5 dark:invert" />
                :
                <img src="../assets/icons/icon-eye-off.svg" alt="icon-eye-off" className="w-5 h-5 dark:invert" />
              }
            </button>
            <div className='text-danger mt-1 ml-1'>{state.errors.password_confirmation}</div>
          </div>
          <button type='submit' className='w-full text-base bg-primary text-white font-medium uppercase border border-primary rounded-full px-4 py-3 my-4 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none active:outline-none'>Change Password</button>
        </form>
      </div>
    </>
  )
}
export default ChangePassword;