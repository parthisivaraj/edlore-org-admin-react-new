import React, { Fragment, useState } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { managePassword, setManagePasswordModal } from "../../redux/reduxes/users/usersAction";
import { useDispatch, useSelector } from "react-redux";


const ManagePassword = ({ showPasswordModal, setShowPasswordModal, id }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const managePasswordLoading = useSelector(state => state.users.managePasswordLoading);
  const showManagePasswordModal = useSelector(state => state.users.showManagePasswordModal);

  // States
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

  // Validate Form
  const validateEditUserForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (val = false));
    if (
      state.password == "" ||
      state.password_confirmation == "" ||
      state.errors.passwordUpperCase != "" ||
      state.errors.passwordDigit != "" ||
      state.errors.passwordSpecialCharacters != "" ||
      state.password.length < 8
    )
      valid = false;
    return valid;
  }

  // Change Handler
  const handleChangeInput = (event) => {
    event.preventDefault();
    const upperCaseLetters = RegExp(/[A-Z]/g);
    const digits = RegExp(/[0-9]/g);
    const specialCharacters = RegExp(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/);

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
        if (value == "") {
          errors.password_confirmation = "Enter Confirm Password"
        } else {
          errors.password_confirmation = "";
        }
        if (value != state.password) {
          errors.password_confirmation = "Password not matching"
        } else {
          errors.password_confirmation = "";
        }
        // errors.password_confirmation = (value == "" || value != state.password) ? "Enter Confirm Password" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors, [name]: value
    }));
  }

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEditUserForm(state.errors)) {
      const data = {
        password: state.password,
        password_confirmation: state.password_confirmation,
        id: id,
      };
      dispatch(managePassword(data));
    } else {
      let errors = state.errors;
      if (state.password == "" && state.errors.upperCaseLetters != "" && state.errors.digits != "" && state.errors.specialCharacters != "" && state.password.length < 8)
        errors.password = "Enter Password"
      if (state.password_confirmation == "") {
        errors.password_confirmation = "Enter Confirm Password"
      } else if (state.password_confirmation != state.password) {
        errors.password_confirmation = "Confirm Password doesn't match"
      } else {
        errors.password_confirmation = "";
      }

      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));
    }
  }

  // Backdrop that stops closing Modal
  const handleModalBackdrop = () => { }

  // Show and Hide Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordToggler = () => {
    setShowPassword(!showPassword)
  }
  const passwordConfirmToggler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  // Generate Random Password Handler
  function generatePasswordHandler() {
    var lc = "abcdefghijklmnopqrstuvwxyz";
    var uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var n = "0123456789";
    var sp = "!@#$%^&*"
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
      password_confirmation: password
    }));
  }

  // Reset the form values on Closing Modal
  const onCancelTheEdit = () => {
    // const data = {
    //   password: "",
    //   password_confirmation: "",
    // }
    setState((prevProps) => ({
      ...prevProps,
      password: "",
      password_confirmation: "",

      errors: {
        password: "",
        password_confirmation: "",
      }
    }))
    // dispatch(managePassword(data))
    dispatch(setManagePasswordModal(false));
  }

  return (
    <Transition appear show={showManagePasswordModal} as={Fragment}>
      <Dialog as="div" open={showManagePasswordModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-20 flex items-start  justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-[80%] lg:w-[65%] xl:w-[50%] 2xl:w-[35%] h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl p-8 xl:p-10 shadow-lg">
            <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center">Manage Password</Dialog.Title>
            {/* <Dialog.Description className="text-sm 2xl:text-base opacity-80 mb-8 text-center">Edit password here...</Dialog.Description> */}

            <form onSubmit={(e) => handleSubmit(e)} >
              <div className="mb-4">
                <div className='relative'>
                  <div className="flex items-center justify-between">
                    <label htmlFor="new-password" className="text-sm font-medium leading-9 dark:text-gray2">Enter New Password <span className="text-danger">*</span></label> <br />
                    <button onClick={generatePasswordHandler} type="button" className="text-primary text-sm font-medium underline  focus:outline-none">Generate password</button>
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                    id="new_password"
                    name="password"
                    placeholder="New Password"
                    value={state.password}
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="new-password"
                  />
                  <button onClick={() => passwordToggler()} type="button" className="flex items-center justify-center absolute top-[38px] right-[2px] w-[60px] h-[52%] bg-white dark:bg-darkMainBg rounded-r-sm">
                    {showPassword == true ?
                      <img src="../assets/icons/icon-eye-show.svg" alt="icon-eye-show" className="w-[18px] h-[18px] dark:invert" />
                      :
                      <img src="../assets/icons/icon-eye-hide.svg" alt="icon-eye-hide" className="w-[18px] h-[18px] dark:invert" />
                    }
                  </button>
                </div>
                <div className='text-danger mt-1 ml-1'>{state.errors.password}</div>
                <div className='text-danger mt-1 ml-1'>{state.errors.passwordUpperCase}</div>
                <div className='text-danger mt-1 ml-1'>{state.errors.passwordDigit}</div>
                <div className='text-danger mt-1 ml-1'>{state.errors.passwordSpecialCharacters}</div>
              </div>

              <div className="mb-4">
                <div className='relative'>
                  <label htmlFor="new-password" className="text-sm font-medium leading-9">Confirm New Password <span className="text-danger">*</span></label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                    id="new-password"
                    name="password_confirmation"
                    value={state.password_confirmation}
                    placeholder="Confirm Password"
                    onChange={(e) => handleChangeInput(e)}
                    autoComplete="new-password"
                  />
                  <button onClick={() => passwordConfirmToggler()} type="button" className="flex items-center justify-center absolute top-[38px] right-[2px] w-[60px] h-[52%] bg-white dark:bg-darkMainBg rounded-r-sm">
                    {showConfirmPassword == true ?
                      <img src="../assets/icons/icon-eye-show.svg" alt="icon-eye-show" className="w-[18px] h-[18px] dark:invert" />
                      :
                      <img src="../assets/icons/icon-eye-hide.svg" alt="icon-eye-hide" className="w-[18px] h-[18px] dark:invert" />
                    }
                  </button>
                </div>
                <div className='text-danger mt-1 ml-1'>{state.errors.password_confirmation}</div>
              </div>

              <div className="flex items-center justify-center mt-16">
                <button onClick={() => onCancelTheEdit()} type="button" className="bg-transparent text-black2 dark:text-gray2 font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={managePasswordLoading}
                  className={`${managePasswordLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                >
                  {managePasswordLoading ? "Updating..." : "Change Password"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default ManagePassword;