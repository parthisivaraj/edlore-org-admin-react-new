import React, { useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from 'react-redux';
import { addTroubleshoot, setTroubleshootModal, resetTroubleshootErrors, updateTroubleshoot } from "../../redux/reduxes/troubleshoot/troubleshootAction";

const CreateTroubleshoot = ({ model_id, showTroubleshootModal }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const addTroubleshootLoading = useSelector(state => state.troubleshoot.addTroubleshootLoading);
  const addTroubleshootError = useSelector(state => state.troubleshoot.addTroubleshootError);
  const troubleshootDetails = useSelector(state => state.troubleshoot.troubleshootDetails);
  const updateTroubleshootLoading = useSelector(state => state.troubleshoot.updateTroubleshootLoading);
  const troubleshootEdit = useSelector(state => state.troubleshoot.troubleshootEdit);
  const editingId = useSelector(state => state.troubleshoot.editingId);
  const troubleshootName = useSelector(state => state.troubleshoot.troubleshootName);

  // States
  const [state, setState] = useState({
    troubleshoot_title: '',
    errors: {
      troubleshoot_title: ''
    }
  })

  useEffect(() => {
    dispatch(resetTroubleshootErrors());
  }, []);

  // Update Troubleshoot Title
  useEffect(() => {
    if (troubleshootEdit) {
      setState((prevProps) => ({
        ...prevProps,
        troubleshoot_title: troubleshootName,
        model_id: model_id,
      }))
    }
  }, [troubleshootName])

  // Dispatch to Troubleshoot Details
  useEffect(() => {
    if (troubleshootEdit) {
      troubleshootDetails && troubleshootDetails.title && setState((prevProps) => ({
        ...prevProps,
        troubleshoot_title: troubleshootDetails.title,
      }))
    }
  }, [troubleshootDetails])

  // set errrors
  useEffect(() => {
    let errors = state.errors;
    if (addTroubleshootError.length > 0) {
      addTroubleshootError.forEach(error => {
        switch (error.name) {
          case 'title':
            errors.troubleshoot_title = error.message;
            break;
          default:
            break;
        }
      })
    } else {
      errors.troubleshoot_title = "";
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [addTroubleshootError]);

  // Form Validation
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (
      state.troubleshoot_title == "" || state.troubleshoot_title.length > 150
    )
      valid = false;
    return valid;
  }

  // Change Handler
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'troubleshoot_title':
        errors.troubleshoot_title = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Troubleshoot Title" : value.length > 150 ? "Troubleshoot Name shouldn't exceed more than 150 characters" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors, [name]: value,
    }));
    // dispatch(addTroubleshootError());
    dispatch(resetTroubleshootErrors());
  }

  // Handle Form Submit
  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    if (validate(state.errors)) {
      const data = {
        id: state.id,
        troubleshoot_title: state.troubleshoot_title.replace(/\s+/g, ' ').trim(),
        model_id: model_id,
      }
      const updateData = {
        troubleshoot_title: state.troubleshoot_title.replace(/\s+/g, ' ').trim(),
        model_id: model_id,
        trouble_id: editingId,
      }
      if (troubleshootEdit) {
        dispatch(updateTroubleshoot(updateData))
      } else {
        dispatch(addTroubleshoot(data));
      }
      // setShowTroubleshootModal(false);
    } else {
      let errors = state.errors;
      if (state.troubleshoot_title === "") {
        errors.troubleshoot_title = "Enter Troubleshoot Title"
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));
    }
  }

  // Backdrop that stops Modal from Closing
  const handleModalBackdrop = () => { }

  return (
    <Transition appear show={showTroubleshootModal} as={Fragment}>
      <Dialog as="div" open={showTroubleshootModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-[85%] lg:w-[65%] xl:w-[40%] 2xl:w-[35%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-2xl p-8 xl:p-10 shadow-lg">
            <Dialog.Title className="text-2xl 2xl:text-3xl font-semibold text-center mb-8 xl:mb-10">{troubleshootEdit ? "Update Troubleshoot" : "Create New Troubleshoot"}</Dialog.Title>

            <div>
              <label htmlFor="troubleshoot_title" className="text-sm font-medium dark:text-gray2">
                Troubleshoot Name
                <span className="text-danger">*</span>
                <span className='text-gray3 text-sm ml-1'> (Please enter unique Name, Limit: 150 chars)</span>
              </label> <br />
              <input
                type="text"
                id="troubleshoot_title"
                name="troubleshoot_title"
                className="bg-white dark:bg-darkBg  w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                placeholder="Troubleshoot Title"
                onChange={(e) => onChangeHandler(e)}
                maxLength={150}
                value={state.troubleshoot_title}
              />
              <div className='text-danger mt-1 ml-1'>{state.errors.troubleshoot_title}</div>
            </div>

            <div className="flex items-center justify-end mt-14">
              <button type="button" onClick={() => dispatch(setTroubleshootModal({ show: false, edit: false, id: "", name: "", }))} className="bg-transparent text-black2 dark:text-gray2 text-sm font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 mx-5 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmitEvent(e)}
                disabled={addTroubleshootLoading || updateTroubleshootLoading}
                className={`${addTroubleshootLoading || updateTroubleshootLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-10 py-2 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
              >
                {troubleshootEdit ? (updateTroubleshootLoading ? "Updating..." : "Update") : (addTroubleshootLoading ? "Loading..." : "Next")}
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
export default CreateTroubleshoot;