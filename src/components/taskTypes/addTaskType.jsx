
import React, { Fragment, useState, useEffect } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from 'react-redux';
import { addTaskType, taskTypeDetails, updateTaskType, setAddTypeModal, setErrorMessage } from '../../redux/reduxes/taskTypes/taskTypesAction';


const AddTaskType = ({ showTaskTypeModal, taskTypeId, setTaskTypeId, update }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const details = useSelector(state => state.tasktypes.taskTypeDetails);
  const addTaskTypeLoading = useSelector(state => state.tasktypes.addTaskTypeLoading);
  const addTaskTypeError = useSelector(state => state.tasktypes.addTaskTypeError);
  const updateTaskTypeLoading = useSelector(state => state.tasktypes.updateTaskTypeLoading);

  // State
  const [state, setState] = useState({
    title: "",

    errors: {
      title: "",
      status: "",
    }
  });

  // Restrict the Duplicate Title
  useEffect(() => {
    let errors = state.errors;
    addTaskTypeError && addTaskTypeError.forEach(error => {
      switch (error.name) {
        case 'title':
          errors.title = error.message
          break;
        case "status":
          errors.status = error.message
          break;
        default:
          break;
      }
    })
    if (addTaskTypeError.length == 0) {
      errors.title = ""
      errors.status = ""
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [addTaskTypeError])

  // Dispatch to Details
  useEffect(() => {
    let errors = state.errors;
    errors.title = "";
    errors.status = "";
    const data = {
      taskTypeId: taskTypeId && taskTypeId,
    }
    dispatch(taskTypeDetails(data));
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [])

  // Update a Task Type
  useEffect(() => {
    if (update) {
      details && details.title && setState((prevProps) => ({
        ...prevProps,
        title: details && details.title,
        status: details && details.status,
      }))
    } else {
      setState((prevProps) => ({
        ...prevProps,
        title: "",
        status: ""
      }))
    }
  }, [details]);

  // Validate Form
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false))
    if (state.title == "" || state.title.length > 150)
      valid = false;
    return valid;
  }

  // onChange Handler
  const onChangeHandler = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'title':
        errors.title = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Task Type Title" : value.length > 150 ? "Title shouldn't exceed more than 150 characters" : "";
        break;
      default:
        break;
    }
    dispatch(setErrorMessage());
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }))
  }

  // Form Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      const data = {
        title: state.title.replace(/\s+/g, ' ').trim(),
      }
      const updatedData = {
        title: state.title.replace(/\s+/g, ' ').trim(),
        taskTypeId: taskTypeId,
        status: (state.status == "active" || state.status == "Active") ? 1 : 2,
      }
      if (update) {
        dispatch(updateTaskType(updatedData));
      } else {
        dispatch(addTaskType(data));
      }
    } else {
      let errors = state.errors;
      if (state.title == "") {
        errors.title = "Enter Task Type Title";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }))
    }
  }

  // Reset the form values on Closing Modal
  const onCancelTheEdit = () => {
    const data = {
      id: "",
    }
    setState((prevProps) => ({
      ...prevProps,
      title: "",
      status: "",

      errors: {
        title: "",
        status: "",
      }
    }))
    dispatch(setAddTypeModal(false));
    setTaskTypeId(null);
    dispatch(taskTypeDetails(data))
  }


  // Backdrop that stops Modal from Closing
  const handleModalBackdrop = () => { }

  return (
    <>
      {/* Adding/Editing Task Type Popup : Start */}
      <Transition appear show={showTaskTypeModal} as={Fragment}>
        <Dialog as="div" open={showTaskTypeModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[80%] lg:w-[60%] xl:w-[45%] 2xl:w-[35%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 p-8 xl:p-10 rounded-2xl shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center dark:text-gray2 mb-10">{update ? "Update" : "Add New"} Task Type</Dialog.Title>
              <div>
                <label htmlFor="title" className="text-sm font-medium leading-9">
                  Task Type Name
                  <span className="text-danger">*</span>
                  <span className='text-gray3 text-sm'> (Please enter unique Name, Limit: 150 chars)</span>
                </label> <br />
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100  border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                  placeholder="Task Type Title"
                  value={state.title}
                  onChange={(e) => onChangeHandler(e)}
                  maxLength={150}
                />
                <div className='text-danger mt-1 ml-1'>{state.errors.title}</div>
              </div>

              {update &&
                <div className='mt-4'>
                  <label htmlFor="status" className="text-sm font-medium leading-9">Status </label> <br />
                  <select
                    name="status"
                    id="status"
                    className="ed-form__select appearance-none relative w-full h-[50px] dark:bg-darkBg dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-gray2 dark:border-opacity-50 rounded-md md:px-1.5 2xl:px-3 md:py-1 2xl:py-3 focus:border-secondary focus:outline-none"
                    onChange={(e) => onChangeHandler(e)}
                  >
                    <option value="active" selected={state.status == "active"}>Active</option>
                    <option value="inactive" selected={state.status == "inactive"}>Inactive</option>
                  </select>
                  <div className='text-danger mt-1 ml-1'>{state.errors.status}</div>
                </div>
              }
              <div className="flex items-center justify-end mt-16">
                <button type="button" onClick={() => onCancelTheEdit()} className="bg-transparent text-black2 dark:text-gray2 border border-black2 dark:border-gray2 md:text-sm 2xl:text-base font-medium rounded-full shadow-sm px-8 py-2 max-w-[150px] xl:max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                  disabled={addTaskTypeLoading || updateTaskTypeLoading}
                  className={`${addTaskTypeLoading || updateTaskTypeLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-10 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                >
                  {update ? (updateTaskTypeLoading ? "Updating..." : "Update") : (addTaskTypeLoading ? "Saving.." : "Save")}
                </button>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      {/* Adding/Editing Task Type Popup : End */}
    </>
  )
}
export default AddTaskType;