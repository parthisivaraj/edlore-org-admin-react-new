import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../../layout';
import { getDeviceDetails, editDevice } from '../../redux/reduxes/devices/deviceAction';
import { history } from '../../helpers/history';
import moment from "moment";

const EditDevice = (props) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();

  // Fetch Data
  const details = useSelector(state => state.devices.deviceDetails);
  const editDeviceLoading = useSelector(state => state.devices.editDeviceLoading);
  const editDeviceError = useSelector(state => state.devices.editDeviceError);

  // Dispatch Device Details
  useEffect(() => {
    setState((prevProps) => ({
      ...prevProps,
      manufactured_date: "",
      warranty_till: "",
    }));
    dispatch(getDeviceDetails(id));
  }, []);


  // States
  const [state, setState] = useState({
    name: details && details.name,
    serial_number: details && details.serial_number,
    device_id: details && details.device_id,
    width: details && details.width,
    height: details && details.depth,
    length: details && details.length,
    location: details && details.location,
    manufactured_by: details && details.manufactured_by,
    manufactured_date: "",
    warranty_till: "",
    model_img: details && details.model_img,
    updated_model_image: [],

    errors: {
      serial_number: "",
      name: "",
      device_id: "",
      manufactured_by: "",
      model_img: "",
    }
  })
  useEffect(() => {
    // dispatch(getDeviceDetails(id));
    setState((prevProps) => ({
      ...prevProps,
      name: details && details.name,
      serial_number: details && details.serial_number,
      device_id: details && details.device_id,
      width: details && details.width,
      height: details && details.depth,
      length: details && details.length,
      location: details && details.location,
      manufactured_by: details && details.manufactured_by,
      manufactured_date: details && details.manufactured_date ? details.manufactured_date : "",
      warranty_till: details && details.warranty_till ? details.warranty_till : "",
      model_img: details && details.model_img,
    }));
  }, [details]);

  // set errors
  useEffect(() => {
    let errors = state.errors;
    editDeviceError.forEach(error => {
      switch (error.name) {
        case 'name':
          errors.name = error.message
          break;
        case 'device_id':
          errors.device_id = error.message
          break;
        case 'serial_number':
          errors.serial_number = error.message
          break;
        case 'manufactured_by':
          errors.manufactured_by = error.message
          break;
        // case 'manufactured_date':
        //   errors.manufactured_date = error.message
        //   break;
        // case 'warranty_till':
        //   errors.warranty_till = error.message
        //   break;
        default:
          break;
      }
    })
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [editDeviceError]);

  // Validate Form
  const validateDeviceForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (val = false));
    if (
      state.serial_number == "" ||
      state.serial_number.replace(/\s+/g, '').length == 0 ||
      state.serial_number.length > 150 ||
      state.name == "" ||
      state.name.replace(/\s+/g, '').length == 0 ||
      state.name.length > 150 ||
      state.device_id == "" ||
      state.device_id.replace(/\s+/g, '').length == 0 ||
      state.device_id.length > 150 ||
      state.manufactured_by == "" ||
      state.manufactured_by.replace(/\s+/g, '').length == 0
    ) {
      valid = false;
    }
    return valid;
  }

  // onChange Handler
  const handleChangeEvent = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'serial_number':
        errors.serial_number = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Serial Number" : value.length > 150 ? "Serial Number shouldn't exceed more than 150 characters" : ""
        break;
      case 'name':
        errors.name = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter device name" : value.length > 150 ? "Device Name shouldn't exceed more than 150 characters" : ""
        break;
      case 'device_id':
        errors.device_id = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Device ID must be atleast 3 characters long" : value.length > 150 ? "Device ID shouldn't exceed more than 150 characters" : ""
        break;
      case 'manufactured_by':
        errors.manufactured_by = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Manufactured By Name" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
    // dispatch(resetErrorMessage());
  }

  // onSubmit Handler
  async function handleSubmit(event, status) {
    event.preventDefault();
    if (validateDeviceForm(state.errors)) {
      const data = {
        name: state.name.replace(/\s+/g, ' ').trim(),
        serial_number: state.serial_number.replace(/\s+/g, ' ').trim(),
        device_id: state.device_id.replace(/\s+/g, ' ').trim(),
        width: Number(state.width),
        height: Number(state.height),
        length: Number(state.length),
        location: state.location,
        manufactured_by: state.manufactured_by.replace(/\s+/g, ' ').trim(),
        manufactured_date: state.manufactured_date,
        warranty: state.warranty_till,
        model_img: state.updated_model_image.length > 0 ? state.updated_model_image : "",
        id: id,
        model_id: details && details.model && details.model.id,
        status: 2,
        image: state.updated_model_image.length < 0 ? false : state.updated_model_image,
      }
      dispatch(editDevice(data))
    } else {
      let errors = state.errors;
      if (state.serial_number == "" || state.serial_number.replace(/\s+/g, '').length == 0) {
        errors.serial_number = "Enter Serial Number"
      }
      if (state.name == "" || state.name.replace(/\s+/g, '').length == 0) {
        errors.name = "Enter Device Name"
      }
      if (state.device_id == "" || state.device_id.replace(/\s+/g, '').length == 0) {
        errors.device_id = "Enter Device ID"
      }
      if (state.manufactured_by == "" || state.manufactured_by.replace(/\s+/g, '').length == 0) {
        errors.manufactured_by = "Enter Manufactured By Name"
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));
    }
  }

  // Save to Draft
  const [draftDeviceLoading, setDraftDeviceLoading] = useState(false);
  const saveToDraft = (event) => {
    event.preventDefault();
    const data = {
      name: state.name,
      serial_number: state.serial_number,
      device_id: state.device_id,
      width: Number(state.width),
      height: Number(state.height),
      length: Number(state.length),
      location: state.location,
      manufactured_by: state.manufactured_by,
      manufactured_date: state.manufactured_date,
      warranty: state.warranty_till,
      model_img: state.updated_model_image.length > 0 ? state.updated_model_image : "",
      id: id,
      model_id: details && details.model && details.model.id,
      status: 1,
      image: state.updated_model_image.length < 0 ? false : state.updated_model_image,
    }
    dispatch(editDevice(data));
    setDraftDeviceLoading(true);
    event.target.reset();
  }

  // onChange Image Handler
  const changeImage = (event) => {
    const [file] = event.target.files;
    setState((prevProps) => ({
      ...prevProps,
      updated_model_image: file
    }));
    setImg(URL.createObjectURL(file));
  }
  const [img, setImg] = useState(null);

  // const onChangeManufacturedDate = (date) => {
  //   let errors = state.errors;
  //   errors.manufactured_date = (date == "" || date == null) ? "Select a valid Device Manufactured Date" : ""
  //   setState((prevProps) => ({
  //     ...prevProps,
  //     errors,
  //     manufactured_date: date,
  //   }));
  // }
  // const onChangeWarrantyTillDate = (date) => {
  //   let errors = state.errors;
  //   errors.warranty_till = (date == "" || date == null) ? "Select a valid Device Warranty Date" : ""
  //   setState((prevProps) => ({
  //     ...prevProps,
  //     errors,
  //     warranty_till: date,
  //   }));
  // }
  function formatDate(dateString) {
    if (!dateString || typeof dateString !== 'string') {
      return '-';
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '-';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Device</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs */}
          <div className='grid grid-cols-2 gap-5 mb-4 2xl:mb-10'>
            <div className="col-start-1">
              <div className="flex items-center">
                <img src="../assets/icons/icon-devices.svg" alt="icon-devices" className='invert dark:invert-0 w-4 h-4' />
                <span className="ml-1 text-xs text-black dark:text-gray2 font-medium"> Devices /</span>
                <Link to="/devices" exact={true} className="ml-1 text-xs text-black dark:text-gray2 font-medium">All Devices</Link>
                <span className="ml-1 text-xs text-black dark:text-gray2 font-medium">/ Edit Device</span>
              </div>
              <h1 className="md:text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">Edit Device</h1>
            </div>
            <div className="col-start-2 ml-auto my-auto">
              <button onClick={() => history.goBack()} type='button' className="bg-transparent text-primary text-sm font-medium border border-primary rounded-full px-6 py-2 shadow-sm transition-all hover:bg-primary hover:text-white hover:transition-all">
                Cancel Edit
              </button>
            </div>
          </div>


          {/* Edit Device Section : Start */}
          <div className='w-full bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl pb-8'>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='w-full xl:flex items-center'>
                <div className='md:w-full xl:w-[70%] 2xl:w-[75%] px-8 py-8'>
                  <div className={`${details.status == "active" ? 'bg-secondary dark:bg-opacity-40' : 'bg-black2'} inline bg-black2 text-white dark:text-gray2 text-sm 2xl:text-base w-full px-6 py-[8px] 2xl:py-2 font-medium rounded-3xl mx-auto capitalize`}>
                    {details.status}
                  </div>

                  <div className='grid grid-cols-2 gap-5 mt-6'>
                    <div className="col-start-1 col-span-2 xl:col-span-1">
                      <label htmlFor="sl_no" className='text-sm font-medium dark:text-gray2'>
                        <span className='whitespace-nowrap'>Serial Number</span>
                        <span className="text-danger">*</span>
                        <span className='text-gray3 text-sm ml-1'> (Please enter unique Number, Limit: 150 chars)</span>
                      </label>
                      <input
                        type="text"
                        id="sl_no"
                        name="serial_number"
                        placeholder='Serial Number'
                        className="w-full bg-gray2 dark:bg-darkBg dark:text-gray2 bg-opacity-30 text-base border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.serial_number}
                        onChange={(e) => handleChangeEvent(e)}
                        maxLength={150}
                      />
                      <div className='text-danger mt-1 ml-1 first-letter:capitalize'>{state.errors.serial_number}</div>
                    </div>

                    <div className="col-start-1 xl:col-start-2 col-span-2 xl:col-span-1">
                      <label htmlFor="device_name" className='text-sm font-medium dark:text-gray2'>
                        <span className='whitespace-nowrap'>Device Name</span>
                        <span className="text-danger">*</span>
                        <span className='text-gray3 text-sm ml-1'> (Please enter unique Name, Limit: 150 chars)</span>
                      </label>
                      <input
                        type="text"
                        id="device_name"
                        name="name"
                        placeholder='Device Name'
                        className="w-full bg-gray2 dark:bg-darkBg dark:text-gray2 bg-opacity-30 text-base border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.name}
                        onChange={(e) => handleChangeEvent(e)}
                        maxLength={150}
                      />
                      <div className='text-danger mt-1 ml-1'>{state.errors.name}</div>
                    </div>

                    <div className="col-start-1 md:col-span-2 xl:col-span-1">
                      <label htmlFor="device_id" className='text-sm font-medium dark:text-gray2'>
                        <span className='whitespace-nowrap'>Device ID</span>
                        <span className="text-danger">*</span>
                        <span className='text-gray3 text-sm ml-1'> (Please enter unique Number, Limit: 150 chars)</span>
                      </label>
                      <input
                        type="text"
                        id="device_id"
                        name="device_id"
                        placeholder='Device ID'
                        className="w-full bg-gray2 dark:bg-darkBg dark:text-gray2 bg-opacity-30 text-base border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.device_id}
                        onChange={(e) => handleChangeEvent(e)}
                        maxLength={150}
                      />
                      <div className='text-danger mt-1 ml-1'>{state.errors.device_id}</div>
                    </div>

                    <div className="col-start-2 md:col-span-2 xl:col-span-1">
                      <label className='text-sm font-medium dark:text-gray2'>W x D x L (inches)</label>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-start-1">
                          <input
                            type="number"
                            id="device_width"
                            name="width"
                            placeholder='20'
                            className='w-full bg-gray2 dark:bg-darkBg dark:text-gray2 bg-opacity-30 text-base border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none'
                            value={state.width}
                            onChange={(e) => handleChangeEvent(e)}
                          />
                        </div>
                        <div className="col-start-2">
                          <input
                            type="number"
                            id="device_height"
                            name="height"
                            placeholder='20'
                            className='w-full bg-gray2 dark:bg-darkBg dark:text-gray2 bg-opacity-30 text-base border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none'
                            value={state.height}
                            onChange={(e) => handleChangeEvent(e)}
                          />
                        </div>
                        <div className="col-start-3">
                          <input
                            type="number"
                            id="device_length"
                            name="length"
                            placeholder='20'
                            className='w-full bg-gray2 dark:bg-darkBg dark:text-gray2 bg-opacity-30 text-base border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none'
                            value={state.length}
                            onChange={(e) => handleChangeEvent(e)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-start-1 md:col-span-2 xl:col-span-1">
                      <label htmlFor="device_location" className='text-sm font-medium dark:text-gray2'>Device Location </label>
                      <input
                        type="text"
                        id="device_location"
                        name="location"
                        placeholder='Device Location'
                        className='w-full h-[50px] bg-gray2 dark:bg-darkBg dark:text-gray2 bg-opacity-30 text-base border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none'
                        value={state.location}
                        onChange={(e) => handleChangeEvent(e)}
                      />
                    </div>

                    <div className="col-start-1 md:col-span-2 xl:col-span-1">
                      <label htmlFor="manufactured_by" className='text-sm font-medium dark:text-gray2'>Manufactured By <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        id="manufactured_by"
                        name="manufactured_by"
                        placeholder='Manufactured By'
                        className='w-full h-[50px] bg-gray2 dark:bg-darkBg dark:text-gray2 bg-opacity-30 text-base border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none'
                        value={state.manufactured_by}
                        onChange={(e) => handleChangeEvent(e)}
                      />
                      <div className='text-danger mt-1 ml-1'>{state.errors.manufactured_by}</div>
                    </div>

                    <div className="col-start-2 md:col-span-2 xl:col-span-1">
                      <label htmlFor="manufactured_date" className='text-sm font-medium dark:text-gray2'>Manufactured Date </label>
                      <input
                        type="date"

                        id="manufactured_date"
                        name="manufactured_date"
                        max="2200-12-31"
                        placeholder='Manufactured Date'
                        className="block w-full h-[50px] bg-gray2 dark:bg-darkBg dark:text-gray2 bg-opacity-30 text-base border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={formatDate(state.manufactured_date)}
                        onChange={(e) => handleChangeEvent(e)}
                      />
                      {/* <DatePickerCustom
                        onChangeDatePicker={onChangeManufacturedDate}
                        selected={state.manufactured_date}
                      /> */}

                      {/* <div className='text-danger mt-1 ml-1'>{state.errors.manufactured_date}</div> */}
                    </div>

                    <div className="col-start-2 md:col-span-2 xl:col-span-1">
                      <label htmlFor="warranty_till" className='text-sm font-medium dark:text-gray2'>Warranty </label>
                      <input
                        type="date"
                        id="warranty_till"
                        name="warranty_till"
                        max="2200-12-31"
                        placeholder='Device Warranty'
                        className="block w-full h-[50px] bg-gray2 dark:bg-darkBg dark:text-gray2 bg-opacity-30 text-base border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={formatDate(state.warranty_till)}
                        onChange={(e) => handleChangeEvent(e)}
                      />
                      {/* <DatePickerCustom
                        onChangeDatePicker={onChangeWarrantyTillDate}
                        selected={state.warranty_till}
                      /> */}
                      {/* <div className='text-danger mt-1 ml-1'>{state.errors.warranty_till}</div> */}
                    </div>
                  </div>
                </div>

                <div className='md:w-full xl:w-[30%] 2xl:w-[25%] px-8 md:pb-8 xl:py-2 2xl:py-16'>
                  <div className='bg-gray4 dark:bg-darkMainBg w-full h-[300px] rounded-xl overflow-hidden mb-3'>
                    <img src={img ? img : details.image} alt={details.name} className='rounded-xl w-full h-full object-cover p-2' />
                  </div>
                  <div className='relative w-full h-[120px] bg-gray2 bg-opacity-20 dark:bg-darkMainBg dark:text-gray2 border border-dashed border-gray2 dark:border-opacity-50 rounded-2xl'>
                    <input
                      type="file"
                      id="image"
                      name="model_img"
                      className='absolute z-10 top-0 left-0 w-full h-full opacity-0'
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => changeImage(e)}
                    />
                    <div className="flex flex-row items-center w-full h-full absolute top-0 left-0 md:px-6 2xl:px-8 py-4 rounded-lg">
                      <img src="../assets/icons/icon-upload.svg" alt="icon-upload" className='w-5 h-5' />
                      <div className="ml-auto">
                        <div className='text-base text-center font-medium mb-2'>Change Device Image</div>
                        <div className='bg-transparent text-black md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-3 py-1.5 text-center'>
                          Browse
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='text-danger mt-1 ml-1'>{state.errors.model_img}</div>
                </div>
              </div>

              <div className='flex items-center justify-end mt-5'>
                <button
                  type='button'
                  onClick={(e) => saveToDraft(e)}
                  disabled={editDeviceLoading && draftDeviceLoading}
                  className={`${editDeviceLoading && draftDeviceLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} mr-6 bg-tansparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-6 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all focus:outline-none`}
                >
                  {editDeviceLoading && draftDeviceLoading ? "Saving..." : "Save to Draft"}
                </button>

                <button
                  type='submit'
                  disabled={editDeviceLoading && !draftDeviceLoading}
                  className={`${editDeviceLoading && !draftDeviceLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} mr-8 bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-6 py-2 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus:outline-none`}
                >
                  {editDeviceLoading && !draftDeviceLoading ? "Updating..." : "Update Device"}
                </button>
              </div>
            </form>
          </div>
          {/* Edit Device Section : End */}
        </section>
      </Layout>
    </>
  )
}
export default EditDevice;