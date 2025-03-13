import React, { Fragment, useState, useEffect } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from 'react-redux';
import { addSection, sectionDetails, updateSection, setSectionModal, resetErrors } from '../../redux/reduxes/sections/sectionAction';

const AddNewSection = ({ showSectionsModal, setShowSectionsModal, id, update, secId, setSecId }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const secDetails = useSelector(state => state.sections.sectionDetails);
  const addSectionLoading = useSelector(state => state.sections.addSectionLoading);
  const addSectionError = useSelector(state => state.sections.addSectionError);
  const updateSectionLoading = useSelector(state => state.sections.updateSectionLoading);
  const showSectionModal = useSelector(state => state.sections.showSectionModal);

  // State
  const [state, setState] = useState({
    sectionTitle: "",
    errors: {
      sectionTitle: "",
    }
  });

  // Update a Section
  useEffect(() => {
    if (update) {
      secDetails && secDetails.title && setState((prevProps) => ({
        ...prevProps,
        sectionTitle: secDetails.title,
      }))
    } else {
      setState((prevProps) => ({
        ...prevProps,
        sectionTitle: ""
      }));
    }
    dispatch(resetErrors());
  }, [secDetails]);

  // Dispatch to Duplicate Name Error
  useEffect(() => {
    let errors = state.errors;
    if (addSectionError.length > 0) {
      addSectionError.forEach(error => {
        if (error.name == "title") {
          errors.sectionTitle = error.message;
        }
      })
    }
    else {
      errors.sectionTitle = "";
    }
    setState((prevProps) => ({
      ...prevProps,
      errors: errors
    }));
  }, [addSectionError])

  // Dispatch to Section Details
  useEffect(() => {
    const data = {
      id: id,
      secId: secId && secId,
    }
    dispatch(sectionDetails(data))
  }, []);

  // Validate Form
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (state.sectionTitle == "" || (state.sectionTitle && state.sectionTitle.length > 150))
      valid = false;
    return valid;
  }

  // Change Handler
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'sectionTitle':
        errors.sectionTitle = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Section Title" : value.length > 150 ? "Section Name shouldn't exceed more than 150 characters" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors, [name]: value,
    }))
    dispatch(resetErrors());
  }

  // Form Submit Event
  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    if (validate(state.errors)) {
      const data = {
        sectionTitle: state.sectionTitle.replace(/\s+/g, ' ').trim(),
        id: id,
        section_id: secId
      }
      if (update) {
        dispatch(updateSection(data));
      } else {
        dispatch(addSection(data));
      }
      // setShowSectionsModal(false);
    } else {
      let errors = state.errors;
      if (state.sectionTitle == "") {
        errors.sectionTitle = "Enter Section Title"
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));
    }
  }

  // Reset the form values on Closing Modal
  const onCancelTheEdit = () => {
    const data = {
      id: "",
      secId: "",
    }
    setState((prevProps) => ({
      ...prevProps,
      sectionTitle: "",
      errors: {
        sectionTitle: "",
      }
    }))
    // setShowSectionsModal(false);
    setSecId(null);
    dispatch(sectionDetails(data))
    dispatch(setSectionModal(false));
  }

  // Backdrop that stops closing Modal
  const handleModalBackdrop = () => { };


  return (
    <>
      {/* Adding/Editing Section Popip : Start */}
      <Transition appear show={showSectionModal} as={Fragment}>
        <Dialog as="div" open={showSectionModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[80%] lg:w-[70%] xl:w-[40%] 2xl:w-[35%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 p-8 xl:p-10 rounded-2xl shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center dark:text-gray2 mb-10">{update ? "Update Section" : "Create New Section"}</Dialog.Title>
              <div>
                <label htmlFor="section_title" className="text-sm font-medium leading-tight mb-1">
                  <span className='whitespace-nowrap'>Section Name</span>
                  <span className="text-danger">*</span>
                  <span className='text-gray3 text-sm ml-1'> (Please enter unique Name, Limit: 150 chars)</span>
                </label> <br />
                <input
                  type="text"
                  id="section_title"
                  name="sectionTitle"
                  value={state.sectionTitle}
                  className="w-full text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                  placeholder="Section Title"
                  onChange={(e) => onChangeHandler(e)}
                  maxLength={150}
                />
                <div className='text-danger mt-1 ml-1'>{state.errors.sectionTitle}</div>
              </div>

              <div className="flex items-center justify-end mt-10">
                <button type="button" onClick={(e) => onCancelTheEdit(e)} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSubmitEvent(e)}
                  disabled={addSectionLoading || updateSectionLoading}
                  className={`${addSectionLoading || updateSectionLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white text-sm 2xl:text-base font-medium border border-secondary rounded-full px-10 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                >
                  {update ? (updateSectionLoading ? "Updating..." : "Update") : (addSectionLoading ? "Creating..." : "Create")}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      {/* Adding/Editing Section Popup : End */}
    </>
  )
}
export default AddNewSection;