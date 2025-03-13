import React, { useState, useEffect, Fragment } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from 'react-redux';
import { createProcedure, updateProcedure, setProcedureModal, resetProceduresErrors } from "../../redux/reduxes/procedure/procedureAction";


const CreateProcedure = ({ showProcedureModal, setShowProcedureModal, setShowProcedureStepsModal, model_id, update, procedureDetails }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const addProcedureLoading = useSelector(state => state.procedure.addProcedureLoading);
  const addProcedureError = useSelector(state => state.procedure.addProcedureError);
  const updateProcedureLoading = useSelector(state => state.procedure.updateProcedureLoading);
  const procedureEdit = useSelector(state => state.procedure.procedureEdit);
  const editingId = useSelector(state => state.procedure.editingId);
  const procedureName = useSelector(state => state.procedure.procedureName);

  // Dispatch All Procedures
  useEffect(() => {
    dispatch(resetProceduresErrors());
  }, [])

  // States
  const [state, setState] = useState({
    procedureName: "",
    errors: {
      procedureName: "",
    }
  })

  // set errrors
  useEffect(() => {
    let errors = state.errors;
    if (addProcedureError.length > 0) {
      addProcedureError.forEach(error => {
        switch (error.name) {
          case 'name':
            errors.procedureName = error.message;
            break;
          default:
            break;
        }
      })
    } else {
      errors.procedureName = "";
    }

    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [addProcedureError]);

  // Update Procedure
  useEffect(() => {
    if (procedureEdit) {
      setState((prevProps) => ({
        ...prevProps,
        procedureName: procedureName,
        model_id: model_id
      }))
    }
  }, [procedureName])

  // Dispatch Procedure Details
  useEffect(() => {
    if (procedureEdit) {
      procedureDetails && procedureDetails.name && setState((prevProps) => ({
        ...prevProps,
        procedureName: procedureDetails.name
      }));
    }
  }, [procedureDetails])


  // Form Validation
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (state.procedureName == "" || state.procedureName.length > 150)
      valid = false;
    return valid;
  }

  // Change Handler
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'procedureName':
        errors.procedureName = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Procedure Title" : value.length > 150 ? "Procedure Name shouldn't exceed more than 150 characters" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors, [name]: value,
    }));
  }

  // Form Submit Event
  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    if (validate(state.errors)) {
      const data = {
        procedureName: state.procedureName.replace(/\s+/g, ' ').trim(),
        model_id: model_id
      }
      const updateData = {
        procedureName: state.procedureName.replace(/\s+/g, ' ').trim(),
        model_id: model_id,
        procedure_id: editingId
      }
      if (procedureEdit) {
        dispatch(updateProcedure(updateData));
      } else {
        dispatch(createProcedure(data));
      }

      // dispatch(setProcedureModal(false));
      // let errors = state.errors;
      // errors.procedureName = ""
      // setState((prevProps) => ({
      //   ...prevProps,
      //   errors: errors,
      //   procedureName: ""
      // }));
    } else {
      let errors = state.errors;
      if (state.procedureName === "") {
        errors.procedureName = "Enter Procedure Title"
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
    <Transition appear show={showProcedureModal} as={Fragment}>
      <Dialog as="div" open={showProcedureModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel as="div" className="w-[85%] lg:w-[60%] xl:w-[40%] 2xl:w-[35%] h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl p-8 xl:p-10 shadow-lg">
            <Dialog.Title className="text-2xl 2xl:text-3xl font-semibold text-center mb-8 xl:mb-12">{procedureEdit ? "Update Procedure" : "Create New Procedure"}</Dialog.Title>
            <form onSubmit={(e) => handleSubmitEvent(e)}>
              <div>
                <label htmlFor="procedure_title" className="text-sm font-medium dark:text-gray2">
                  <span className="whitespace-nowrap">Procedure Title</span>
                  <span className="text-danger">*</span>
                  <span className='text-gray3 text-sm ml-1'> (Please enter unique Title, Limit: 150 chars)</span>
                </label> <br />
                <input
                  type="text"
                  id="procedure_title"
                  name="procedureName"
                  className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                  placeholder="Procedure Title"
                  value={state.procedureName}
                  onChange={(e) => onChangeHandler(e)}
                  maxLength={150}
                />
                <div className='text-danger mt-1 ml-1'>{state.errors.procedureName}</div>
              </div>



              <div className="flex items-center justify-end mt-14">
                <button type="button" onClick={() => dispatch(setProcedureModal(false))} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addProcedureLoading || updateProcedureLoading}
                  className={`${addProcedureLoading || updateProcedureLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-10 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                >
                  {procedureEdit ? (updateProcedureLoading ? "Updating..." : "Update") : (addProcedureLoading ? "Loading..." : "Next")}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default CreateProcedure;