import React, {useEffect, useState} from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import { createVersionControl, getVersionControlDetails, updateVersionControl } from "../../redux/reduxes/versionControl/versionControlAction";


const VersionControl = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const details = useSelector(state => state.versionControl.versionControlDetails);

  useEffect(() => {
    dispatch(getVersionControlDetails())
  }, [])

  // Dispatch Details
  useEffect(() => {
    details && details.android_version && setState((prevProps) => ({
      ...prevProps,
      id: details && details.id,
      android_version: details && details.android_version,
      android_version_code: details && details.android_version_code,
      android_app_url: details && details.android_app_url,
      ios_version: details && details.ios_version,
      ios_version_code: details && details.ios_version_code,
      ios_app_url: details && details.ios_app_url,
    }))
  }, [details])

  // States
  const [state, setState] = useState({
    id:'',
    android_version: "",
    android_version_code: "",
    android_app_url: "",
    ios_version: "",
    ios_version_code: "",
    ios_app_url: "",

    errors: {
      android_version: "",
      android_version_code: "",
      android_app_url: "",
      ios_version: "",
      ios_version_code: "",
      ios_app_url: "",
    }
  })

  // Validate Form
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (
      state.android_version == "" ||
      state.android_version_code == "" ||
      state.android_app_url == "" ||
      state.ios_version == "" ||
      state.ios_version_code == "" ||
      state.ios_app_url == ""
    )
      valid = false;
    return valid;
  }

  // Handle Input Change
  const handleChangeInput = (event) => {
    event.preventDefault();

    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'android_version':
        errors.android_version = value == "" ? "Enter Android Version" : "";
        break;
      case 'android_version_code':
        errors.android_version_code = value == "" ? "Enter Android Version Code" : "";
        break;
      case 'android_app_url':
        errors.android_app_url = value == "" ? "Enter Android App URL" : "";
        break;
      case 'ios_version':
        errors.ios_version = value == "" ? "Enter IOS Version Code" : "";
        break;
      case 'ios_version_code':
        errors.ios_version_code = value == "" ? "Enter IOS Version Code" : "";
        break;
      case 'ios_app_url':
        errors.ios_app_url = value == "" ? "Enter IOS App URL" : "";
          break;
      default:
        break;
    }

    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
  }

  // Form Submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (validateForm(state.errors)) {
      const data = {
        id: "",
        android_version: state.android_version,
        android_version_code: state.android_version_code,
        android_app_url: state.android_app_url,
        ios_version: state.ios_version,
        ios_version_code: state.ios_version_code,
        ios_app_url: state.ios_app_url,
      }
      const updateData = {
        id: state.id,
        android_version: state.android_version,
        android_version_code: state.android_version_code,
        android_app_url: state.android_app_url,
        ios_version: state.ios_version,
        ios_version_code: state.ios_version_code,
        ios_app_url: state.ios_app_url,
      }
      if (details && details.android_version && details.android_version != "") {
        dispatch(updateVersionControl(updateData))
      } else {
        dispatch(createVersionControl(data))
      }
    } else {
      let errors = state.errors;
      if (state.android_version == "") {
        errors.android_version = "Enter Android Version";
      }
      if (state.android_version_code == "") {
        errors.android_version_code = "Enter Android Version Code";
      }
      if (state.android_app_url == "") {
        errors.android_app_url = "Enter Android App URL";
      }
      if (state.ios_version == "") {
        errors.ios_version = "Enter IOS Version";
      }
      if (state.ios_version_code == "") {
        errors.ios_version_code = "Enter IOS Version Code";
      }
      if (state.ios_app_url == "") {
        errors.ios_app_url = "Enter IOS App URL";
      }

      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }))
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Models</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid xl:grid-cols-2 xl:gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img src="../assets/icons/icon-settings.svg" alt="icon-settings" className="invert dark:invert-0 w-4 h-4 opacity-70" />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-semibold">Settings</span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">App Version Control</h1>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Version Control Details */}
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className='w-full bg-white dark:bg-darkBg pb-8 border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md p-8'>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="col-start-1 col-span-1">
                  <label htmlFor="android_version" className="text-sm font-medium leading-9 dark:text-gray2">Android Version <span className="text-danger">*</span></label> <br />
                  <input
                    type="text"
                    className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                    id="android_version"
                    name="android_version"
                    placeholder="Android Version"
                    value={state.android_version}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  <div className='text-danger mt-1 ml-1'>{state.errors.android_version}</div>
                </div>

                <div className="col-start-2 col-span-1">
                  <label htmlFor="android_version_code" className="text-sm font-medium leading-9 dark:text-gray2">Android Version Code <span className="text-danger">*</span></label> <br />
                  <input
                    type="text"
                    className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                    id="android_version_code"
                    name="android_version_code"
                    placeholder="Android Version Code"
                    value={state.android_version_code}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  <div className='text-danger mt-1 ml-1'>{state.errors.android_version_code}</div>
                </div>

                <div className="col-start-1 xl:col-start-3 col-span-1">
                  <label htmlFor="android_app_url" className="text-sm font-medium leading-9 dark:text-gray2">App URL <span className="text-danger">*</span></label> <br />
                  <input
                    type="text"
                    className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                    id="android_app_url"
                    name="android_app_url"
                    placeholder="App URL"
                    value={state.android_app_url}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  <div className='text-danger mt-1 ml-1'>{state.errors.android_app_url}</div>
                </div>

                <div className="col-start-2 xl:col-start-1">
                  <label htmlFor="ios_version" className="text-sm font-medium leading-9 dark:text-gray2">IOS Version <span className="text-danger">*</span></label> <br />
                  <input
                    type="text"
                    className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                    id="ios_version"
                    name="ios_version"
                    placeholder="IOS Version"
                    value={state.ios_version}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  <div className='text-danger mt-1 ml-1'>{state.errors.ios_version}</div>
                </div>

                <div className="col-start-1 xl:col-start-2">
                  <label htmlFor="ios_version_code" className="text-sm font-medium leading-9 dark:text-gray2">IOS Version Code <span className="text-danger">*</span></label> <br />
                  <input
                    type="text"
                    className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                    id="ios_version_code"
                    name="ios_version_code"
                    placeholder="IOS Version Code"
                    value={state.ios_version_code}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  <div className='text-danger mt-1 ml-1'>{state.errors.ios_version_code}</div>
                </div>

                <div className="col-start-2 xl:col-start-3">
                  <label htmlFor="ios_app_url" className="text-sm font-medium leading-9 dark:text-gray2">App URL <span className="text-danger">*</span></label> <br />
                  <input
                    type="text"
                    className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                    id="ios_app_url"
                    name="ios_app_url"
                    placeholder="App URL"
                    value={state.ios_app_url}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  <div className='text-danger mt-1 ml-1'>{state.errors.ios_app_url}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end mt-12">
              <Link to="/" exact={true} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white hover:dark:text-black3 hover:transition-all focus-visible:outline-none">
                Back
              </Link>
              <button type="submit" className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-2 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none">
                {details && details.android_version && details.android_version != "" ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </section>
      </Layout>
    </>
  )
}
export default VersionControl;