import { Tab } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEveryCategory } from "../../redux/reduxes/categories/categoryAction";
import { getAllCategoryModels, createWorkorderTabOne } from "../../redux/reduxes/workorders/workorderAction";
import { getModelDevices } from "../../redux/reduxes/theModels/modelAction";
import { Link } from "react-router-dom";
import { updateDeviceTab } from "../../redux/reduxes/workorders/workorderAction";


const SelectDevicePanel = ({ wo_id, activeTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const authData = useSelector(state => state.auth.authData);
  const allCategories = useSelector(state => state.categories.everyCategoryList);
  const modelsList = useSelector(state => state.workorders.allModelsList);
  const deviceList = useSelector(state => state.models.modelDevices);
  const details = useSelector(state => state.workorders.workOrderDetails);
  const addTabOneLoading = useSelector(state => state.workorders.addTabOneLoading);
  const updateDeviceTabLoading = useSelector(state => state.workorders.updateDeviceTabLoading);

  // Dispatch All Categories
  useEffect(() => {
    // if (activeTab == 0) {
    const data = {
      org_id: authData.org_id,
      paginate: false,
    }
    dispatch(getEveryCategory(data));
    // }
  }, []);

  // States
  const [state, setState] = useState({
    title: "",
    work_order_number: "",
    wo_device_category: "",
    wo_device_model: "",
    wo_device: "",

    errors: {
      title: "",
      work_order_number: "",
      wo_device_category: "",
      wo_device_model: "",
      wo_device: "",
    }
  })

  // Set the details
  useEffect(() => {
    if (details.id) {
      setState((prevProps) => ({
        ...prevProps,
        title: details.title ? details.title : "",
        work_order_number: details.work_order_number ? details.work_order_number : "",
        wo_device_category: (details && details.device && details.device.model && details.device.model.which_category && details.device.model.which_category == "secondary") ? details && details.device && details.device.model && details.device.model.secondary_category && details.device.model.secondary_category.id && details.device.model.secondary_category.id : details && details.device && details.device.model && details.device.model.primary_category && details.device.model.primary_category.id && details.device.model.primary_category.id,
        wo_device_model: (details && details.device && details.device.model && details.device.model.id && details.device.model.id) ? details.device.model.id : "",
        wo_device: (details && details.device && details.device.id) ? details.device.id : "",
      }));
      const data = { id: (details && details.device && details.device.model && details.device.model.which_category && details.device.model.which_category == "secondary") ? details && details.device && details.device.model && details.device.model.secondary_category && details.device.model.secondary_category.id && details.device.model.secondary_category.id : details && details.device && details.device.model && details.device.model.primary_category && details.device.model.primary_category.id && details.device.model.primary_category.id };
      dispatch(getAllCategoryModels(data));
      const deviceData = {
        model_id: details && details.device && details.device.model && details.device.model && details.device.model.id && details.device.model.id,
        page: 0,
        search: "",
        paginate: false,
        filter: {},
        limit: 20,
      };
      dispatch(getModelDevices(deviceData));
    } else {
      setState((prevProps) => ({
        ...prevProps,
        title: "",
        work_order_number: "",
        wo_device_category: "",
        wo_device_model: "",
        wo_device: "",
      }))
    }
  }, [details]);

  // Validate Form
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (state.title == "" ||
      state.title.length > 150 ||
      state.work_order_number == "" ||
      state.wo_device_category == "" ||
      state.wo_device_model == "" ||
      state.wo_device == "" ||
      state.wo_device_category == "not_selected" ||
      state.wo_device_model == "not_selected" ||
      state.wo_device == "not_selected"
    )
      valid = false;
    return valid;
  }

  // OnChange Handler
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'title':
        errors.title = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Workorder Title" : value.length > 150 ? "WO Title must not exceed more than 150 characters" : "";
        break;
      case 'work_order_number':
        errors.work_order_number = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Workorder Number" : "";
        break;
      default:
        return state;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }))
  }
  // Category changing
  const onChangeCategoryHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    errors.wo_device_category = (value == "" || value == "not_selected") ? "Select a Category" : "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      wo_device: "",
      wo_device_model: "",
    }));
    const data = { id: value };
    dispatch(getAllCategoryModels(data));
  }
  const onChangeModelHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    errors.wo_device_model = (value == "" || value == "not_selected") ? "Select a Model" : "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      wo_device: "",
    }));
    const data = {
      model_id: value,
      page: 0,
      search: "",
      paginate: false,
      filter: {},
      limit: 20,
    };
    dispatch(getModelDevices(data));
  }

  // OnChange Device Handler
  const onChangeDeviceHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    errors.wo_device = (value == "" || value == "not_selected") ? "Select a Device" : "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  // On Submit
  const handleSubmitEvent = (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      const data = {
        name: state.title.replace(/\s+/g, ' ').trim(),
        device_id: state.wo_device,
        work_order_number: state.work_order_number.replace(/\s+/g, ' ').trim(),
      }
      const updateData = {
        name: state.title.replace(/\s+/g, ' ').trim(),
        device_id: state.wo_device,
        work_order_number: state.work_order_number.replace(/\s+/g, ' ').trim(),
        wo_id: wo_id,
      }
      if (wo_id == "new") {
        dispatch(createWorkorderTabOne(data));
      } else {
        dispatch(updateDeviceTab(updateData))
      }
    } else {
      let errors = state.errors;
      if (state.title == "") {
        errors.title = "Enter Workorder Title"
      }
      if (state.work_order_number == "") {
        errors.work_order_number = "Enter Workorder Number"
      }
      if (state.wo_device_category == "" || state.wo_device_category == "not_selected") {
        errors.wo_device_category = "Select a Category"
      }
      if (state.wo_device_model == "" || state.wo_device_model == "not_selected") {
        errors.wo_device_model = "Select a Model"
      }
      if (state.wo_device == "" || state.wo_device == "not_selected") {
        errors.wo_device = "Select a Device"
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));
    }
  };


  return (
    <>
      <Tab.Panel>
        <div className="w-full bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl p-8 drop-shadow-md">
          <form>
            <div className="grid grid-cols-2 gap-5">
              <div className="col-start-1 col-span-2 xl:col-span-1">
                <label htmlFor="title" className="text-sm font-medium dark:text-gray2 ">
                  WO Name/Title
                  <span className="text-danger">*</span>
                  <span className='text-gray3 text-sm'> (Please enter Title, Limit: 150 chars)</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={state.title}
                  placeholder="Workorder Title"
                  className="w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                  onChange={(e) => onChangeHandler(e)}
                  maxLength={150}
                />
                <div className='text-danger mt-1 ml-1'>{state.errors.title}</div>
              </div>

              <div className="col-start-1 xl:col-start-2 col-span-2 xl:col-span-1">
                <label htmlFor="work_order_number" className="text-sm font-medium dark:text-gray2 ">WO Number/ID <span className="text-danger">*</span></label>
                <input
                  type="text"
                  name="work_order_number"
                  id="work_order_number"
                  placeholder="Workorder Number"
                  value={state.work_order_number}
                  className="w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                  onChange={(e) => onChangeHandler(e)}
                />
                <div className='text-danger mt-1 ml-1'>{state.errors.work_order_number}</div>
              </div>

              <div className="col-start-1 col-span-2">
                <label htmlFor="wo_device_category" className="text-sm font-medium dark:text-gray2 ">Select Device Category <span className="text-danger">*</span></label>
                <select
                  name="wo_device_category"
                  value={state.wo_device_category}
                  id="wo_device_category"
                  className="ed-form__select appearance-none relative w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                  onChange={(e) => onChangeCategoryHandler(e)}
                >
                  <option value="not_selected" defaultValue>Select a category</option>
                  {allCategories && allCategories.length > 0 && allCategories.map((category, index) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <div className='text-danger mt-1 ml-1'>{state.errors.wo_device_category}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-5">
              <div className="col-start-1 col-span-2 xl:col-span-1">
                <label htmlFor="wo_device_category" className="text-sm font-medium dark:text-gray2 ">Select Model <span className="text-danger">*</span></label>
                <select
                  value={state.wo_device_model}
                  name="wo_device_model"
                  id="wo_device_category"
                  className="ed-form__select appearance-none relative w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                  onChange={(e) => onChangeModelHandler(e)}
                >
                  <option value="not_selected" defaultValue>Select a model</option>
                  {modelsList && modelsList.length > 0 && modelsList.map(model => (
                    <option selected={state.wo_device_model == model.id} value={model.id}>{model.title}</option>
                  ))}
                </select>
                <div className='text-danger mt-1 ml-1'>{state.errors.wo_device_model}</div>
              </div>

              <div className="col-start-2  md:col-span-2 xl:col-span-1">
                <label htmlFor="wo_device_category" className="text-sm font-medium dark:text-gray2 ">Select Device <span className="text-danger">*</span></label>
                <select
                  value={state.wo_device}
                  name="wo_device"
                  id="wo_device_category"
                  className="ed-form__select appearance-none relative w-full h-[50px] text-base bg-gray2 bg-opacity-30 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                  onChange={(e) => onChangeDeviceHandler(e)}
                >

                  <option value="not_selected" defaultValue>Select a device</option>
                  {deviceList && deviceList.length > 0 && deviceList.map(device => (
                    <option value={device.id}>{device.name} (Serial number : {device.serial_number})</option>
                  ))}
                </select>
                <div className='text-danger mt-1 ml-1'>{state.errors.wo_device}</div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end mt-10">
          <Link to="/active-workorders/all?device=all&all&device_specific=false" exact={true} className="bg-transparent text-black2 dark:text-gray2 text-sm font-bold border border-black2 dark:border-gray2 rounded-full px-6 py-2 mr-6 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all focus-visible:outline-none">
            Cancel
          </Link>
          <button
            type="button"
            onClick={(e) => handleSubmitEvent(e)}
            disabled={addTabOneLoading || updateDeviceTabLoading}
            className={`${addTabOneLoading || updateDeviceTabLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-10 py-2 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
          >
            {wo_id == "new" ? (addTabOneLoading ? "Saving..." : "Save and Continue") : (updateDeviceTabLoading ? "Updating...." : "Update and Continue")}
          </button>
        </div>
      </Tab.Panel>
    </>
  )
}
export default SelectDevicePanel;