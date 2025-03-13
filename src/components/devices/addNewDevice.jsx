import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Transition, Dialog } from "@headlessui/react";
import { addDevice, resetErrorMessage } from "../../redux/reduxes/devices/deviceAction";

const AddNewDevice = ({ model_id, showModal, setShowModal, model_name }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const addDeviceError = useSelector(state => state.devices);
  const addDeviceLoading = useSelector(state => state.devices.addDeviceLoading);

  // States
  const [state, setState] = useState({
    name: "",
    serial_no: "",
    id: "",
    width: "",
    height: "",
    length: "",
    location: "",
    manufactured_by: "",
    manufactured_date: "",
    warranty_till: "",
    model_img: [],

    errors: {
      name: "",
      id: "",
      serial_no: "",
      manufactured_by: "",
      model_img: "",
      // manufactured_date: "",
    }
  });

  // Dispatch Reset Error Message
  useEffect(() => {
    dispatch(resetErrorMessage());
    setState((prevProps) => ({
      ...prevProps,
      manufactured_date: "",
      warranty_till: "",
    }));
  }, []);


  // Reset Error Message
  useEffect(() => {
    let errors = state.errors;
    addDeviceError.addDeviceError.forEach(error => {
      switch (error.name) {
        case 'name':
          errors.name = error.message
          break;
        case 'device_id':
          errors.id = error.message
          break;
        case 'serial_number':
          errors.serial_no = error.message
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
  }, [addDeviceError.addDeviceError]);


  // Form Validation
  const validateDeviceForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (val = false));
    if (
      state.name == "" ||
      state.name.length > 150 ||
      state.id == "" ||
      state.id.length > 150 ||
      state.serial_no == "" ||
      state.serial_no.length > 150 ||
      state.manufactured_by == ""
      // state.manufactured_date == ""
      // state.warranty_till == "" ||
      // state.model_img.length == 0
    )
      valid = false
    return valid;
  }

  // Handle Change
  const handleChangeEvent = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'name':
        errors.name = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter device name" : value.length > 150 ? "Device Name shouldn't exceed more than 150 characters" : ""
        break;
      case 'id':
        errors.id = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Device ID" : value.length > 150 ? "Device ID shouldn't exceed more than 150 characters" : ""
        break;
      case 'serial_no':
        errors.serial_no = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Device Serial Number" : value.length > 150 ? "Serial Number shouldn't exceed more than 150 characters" : ""
        break;
      case 'manufactured_by':
        errors.manufactured_by = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Please enter Device manufacturer's name" : "";
        break;
      // case 'manufactured_date':
      //   errors.manufactured_date = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Please enter Device manufacturer's name" : "";
      //   break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors, [name]: value,
    }));
    dispatch(resetErrorMessage());
  }

  // Handler File Upload Change
  const uploadImage = (event) => {
    event.preventDefault();
    const [file] = event.target.files;
    let errors = state.errors;
    errors.model_img = ""
    setState((prevProps) => ({
      ...prevProps,
      errors,
      model_img: file,
    }));
    setImg(URL.createObjectURL(file));
    dispatch(resetErrorMessage());
  }

  // Handle Submit
  async function handleSubmit(event) {
    event.preventDefault();
    if (validateDeviceForm(state.errors)) {
      const data = {
        name: state.name.replace(/\s+/g, ' ').trim(),
        serial_no: state.serial_no.replace(/\s+/g, ' ').trim(),
        id: state.id.replace(/\s+/g, ' ').trim(),
        width: state.width,
        height: state.height,
        length: state.length,
        location: state.location,
        manufactured_by: state.manufactured_by.replace(/\s+/g, ' ').trim(),
        manufactured_date: state.manufactured_date,
        warranty: state.warranty_till,
        model_img: state.model_img,
        status: 2,
        model_id: model_id
      }
      dispatch(addDevice(data));
    } else {
      let errors = state.errors;
      if (state.name == "")
        errors.name = "Enter Device Name"
      if (state.id == "")
        errors.id = "Enter Device ID"
      if (state.serial_no == "")
        errors.serial_no = "Enter Device Serial Number"
      if (state.manufactured_by == "")
        errors.manufactured_by = "Please enter device Manufacturer's name"
      // if (state.manufactured_date == "")
      //   errors.manufactured_date = "Enter Device Manufactured Date"
      // if (state.warranty == "")
      //   errors.warranty = "Enter Device Warranty Date"
      // if (state.model_img.length == 0)
      //   errors.model_img = "Upload a Image"
      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));
    }
  }

  // Validate Draft
  const validateDraftForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (val = false));
    if (state.model_img && state.model_img.length <= 0)
      valid = false
    return valid;
  }

  // Form Submit to  Draft
  const [draftDeviceLoading, setDraftDeviceLoading] = useState(false);
  const handleSubmitToDraft = (event) => {
    event.preventDefault();
    const data = {
      name: state.name,
      serial_no: state.serial_no,
      id: state.id,
      width: state.width,
      height: state.height,
      length: state.length,
      location: state.location,
      manufactured_by: state.manufactured_by,
      manufactured_date: state.manufactured_date,
      warranty: state.warranty_till,
      model_img: state.model_img,
      status: 1,
      model_id: model_id
    }
    dispatch(addDevice(data));
    setDraftDeviceLoading(true)
  }

  // Reset the Values when Popup is Closed
  const resetFormAndClose = () => {
    setState((prevProps) => ({
      ...prevProps,
      name: "",
      serial_no: "",
      id: "",
      width: "",
      height: "",
      length: "",
      location: "",
      manufactured_by: "",
      manufactured_date: "",
      warranty_till: "",
      model_img: [],

      errors: {
        name: "",
        id: "",
        serial_no: "",
        manufactured_by: "",
        // manufactured_date: "",
        // warranty_till: "",
        model_img: "",
      }
    }));
    setShowModal(false);
    setImg("");
  }
  const [img, setImg] = useState(null);

  // Backdrop that stops Modal from Closing
  const handleBackdropModal = () => { }

  return (

    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" open={showModal} onClose={() => handleBackdropModal(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-[96%] xl:w-[75%] 2xl:w-[60%] h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl p-4 shadow-lg">
            <div className='h-full xl:h-[600px] 2xl:h-[720px] p-4 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg  scrollbar-track-white dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center dark:text-gray2">Add New Serial Number</Dialog.Title>
              <Dialog.Description className="flex items-center justify-center flex-wrap w-full 2xl:text-lg opacity-50 mb-8 text-center dark:text-gray2">Adding new Serial Number to <div title={model_name} className="pl-1 font-bold text-black2 dark:text-gray4 capitalize underline text-left w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">{model_name}</div></Dialog.Description>

              <form className='mb-20' onSubmit={(e) => handleSubmit(e)}>
                <div className="grid grid-cols-1 mb-4">
                  <div className="col-start-1">
                    <label htmlFor="serial_no" className="font-medium dark:text-gray2">
                      <span className='whitespace-nowrap'>Serial Number</span>
                      <span className="text-danger">*</span>
                      <span className='text-gray3 text-sm'> (Please enter unique Number, Limit: 150 chars)</span>
                    </label>
                    <input
                      type="text"
                      name="serial_no"
                      id="serial_no"
                      placeholder="Serial Number"
                      maxLength={150}
                      className="w-full h-[50px] bg-gray dark:bg-darkBg text-base text-black2 dark:text-gray2  border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary"
                      value={state.serial_no}
                      onChange={(e) => handleChangeEvent(e)}
                    />
                    <div className='text-danger mt-1 ml-1'>{state.errors.serial_no}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 2xl:gap-8">
                  <div className="col-start-1 col-span-2 xl:col-span-1">
                    <label htmlFor="name" className="flex font-medium dark:text-gray2">
                      <span className='whitespace-nowrap'>Device Name</span>
                      <span className="text-danger">*</span>
                      <span className='text-gray3 text-sm ml-1'> (Please enter unique Name, Limit: 150 chars)</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      maxLength={150}
                      placeholder="Device Name"
                      className="w-full bg-gray dark:bg-darkBg text-black2 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary"
                      value={state.name}
                      onChange={(e) => handleChangeEvent(e)}
                    />
                    <div className='text-danger mt-1 ml-1'>{state.errors.name}</div>
                  </div>

                  <div className="col-start-1 xl:col-start-2 col-span-2 xl:col-span-1">
                    <label htmlFor="id" className="flex font-medium dark:text-gray2">
                      <span className='whitespace-nowrap'>Device ID</span>
                      <span className="text-danger">*</span>
                      <span className='text-gray3 text-sm ml-1'> (Please enter unique Number, Limit: 150 chars)</span>
                    </label>
                    <input
                      type="text"
                      name="id"
                      id="id"
                      placeholder="Device ID"
                      maxLength={150}
                      className="w-full bg-gray dark:bg-darkBg text-black2 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary"
                      value={state.id}
                      onChange={(e) => handleChangeEvent(e)}
                    />
                    <div className='text-danger mt-1 ml-1'>{state.errors.id}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 2xl:gap-6">
                  <div className="col-start-1 mt-4">
                    <label className="font-medium dark:text-gray2">W x D x L (inches)</label>
                    <div className="grid grid-cols-3 gap-4 mt-1">
                      <div>
                        <input
                          type="number"
                          id="device_width"
                          name="width"
                          placeholder="W"
                          maxLength={12}
                          className="w-full bg-gray dark:bg-darkBg text-black2 dark:text-gray2  border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary"
                          value={state.width}
                          onChange={(e) => handleChangeEvent(e)}
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          id="device_height"
                          name="height"
                          placeholder="D"
                          maxLength={12}
                          className="w-full bg-gray dark:bg-darkBg text-black2 dark:text-gray2  border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary"
                          value={state.height}
                          onChange={(e) => handleChangeEvent(e)}
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          id="device_length"
                          name="length"
                          placeholder="L"
                          maxLength={12}
                          className="w-full bg-gray dark:bg-darkBg text-black2 dark:text-gray2  border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary"
                          value={state.length}
                          onChange={(e) => handleChangeEvent(e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-start-2 mt-4">
                    <label htmlFor="location" className="font-medium dark:text-gray2">Device Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Device Location"
                      className="w-full bg-gray dark:bg-darkBg text-black2 dark:text-gray2  border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary"
                      value={state.location}
                      onChange={(e) => handleChangeEvent(e)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 2xl:gap-6">
                  <div className="col-start-1 mt-4">
                    <label htmlFor="manufactured_by" className="font-medium dark:text-gray2">Manufactured By <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      id="manufactured_by"
                      name="manufactured_by"
                      placeholder="Manufactured By"
                      className="w-full bg-gray dark:bg-darkBg text-black2 dark:text-gray2  border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary"
                      value={state.manufactured_by}
                      onChange={(e) => handleChangeEvent(e)}
                    />
                    <div className='text-danger mt-1 ml-1'>{state.errors.manufactured_by}</div>
                  </div>

                  <div className="col-start-2 mt-4">
                    <label htmlFor="manufactured_date" className="font-medium dark:text-gray2">Manufactured Date</label> <br />
                    <input
                      type="date"
                      id="manufactured_date"
                      name="manufactured_date"
                      max={new Date().toLocaleDateString('fr-ca')}
                      className="block w-full h-[50px] bg-gray dark:bg-darkBg text-black2 dark:text-gray2 text-base  border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary"
                      value={state.manufactured_date}
                      onChange={(e) => handleChangeEvent(e)}
                    />
                    {/* <DatePickerCustom
                      onChangeDatePicker={onChangeManufacturedDate}
                      selected={state.manufactured_date}
                    /> */}
                    {/* <div className='text-danger mt-1 ml-1'>{state.errors.manufactured_date}</div> */}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 2xl:gap-6">
                  <div className="col-start-1 mt-4">
                    <label htmlFor="warranty" className="font-medium dark:text-gray2">Warranty </label> <br />
                    <input
                      type="date"
                      id="warranty"
                      name="warranty_till"
                      max="2200-12-31"
                      className="block w-full h-[50px] bg-gray dark:bg-darkBg text-black2 dark:text-gray2 text-base  border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:outline-none focus:border-secondary"
                      value={state.warranty_till}
                      onChange={(e) => handleChangeEvent(e)}
                    />
                    {/* <DatePickerCustom
                      onChangeDatePicker={onChangeWarrantyTillDate}
                      selected={state.warranty_till}
                    /> */}
                    {/* <div className='text-danger mt-1 ml-1'>{state.errors.warranty_till}</div> */}
                  </div>
                  <div className="col-start-2 mt-5">
                    <div className="relative cursor-pointer">
                      <input
                        type="file"
                        id="model_img"
                        name="model_img"
                        className="relative top-0 left-0 z-20 w-full h-[65px] opacity-0 cursor-pointer"
                        accept=".png, .jpg, .jpeg"
                        // value={state.model_img}
                        onChange={(e) => uploadImage(e)}
                      />
                      <div className="absolute -bottom-2 left-0 w-full flex items-center justify-between bg-gray dark:bg-darkBg px-4 py-4 border border-dashed border-gray2 dark:border-opacity-50 rounded-xl">
                        <div className="flex items-center">
                          <img src="../assets/icons/icon-upload.svg" alt="icon-upload" className="mr-3" />
                          <span> Upload Device Image</span>
                        </div>
                        {img &&
                          <div className="ml-3  h-[50px] w-[50px] ">
                            <img src={img} className=" h-[50px] w-[50px] object-cover" alt={state.name} />
                          </div>
                        }
                        <div className="ml-3 text-black2 dark:text-gray2 text-sm font-medium border border-primary py-1 px-6 rounded-full shadow-sm transition-all hover:bg-primary hover:transition-all">Browse</div>

                      </div>

                    </div>
                    <div className='text-danger mt-3 ml-1'>{state.errors.model_img}</div>
                  </div>
                </div>

                <div className="fixed right-[0] bottom-[0] z-[30] w-full bg-gray4 dark:bg-darkBg px-8 py-8 flex items-center justify-end mt-16 xl:mt-5 rounded-b-3xl">
                  <button type="reset" onClick={() => resetFormAndClose()} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base  font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">Cancel</button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmitToDraft(e)}
                    disabled={addDeviceLoading && draftDeviceLoading}
                    className={`${addDeviceLoading && draftDeviceLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-6 py-2 mx-6 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                  >
                    {addDeviceLoading && draftDeviceLoading ? "Saving..." : "Save to Draft"}
                  </button>

                  <button
                    type="submit"
                    disabled={addDeviceLoading && !draftDeviceLoading}
                    className={`${addDeviceLoading && !draftDeviceLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                  >
                    {addDeviceLoading && !draftDeviceLoading ? "Saving..." : "Save Device"}
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default AddNewDevice;