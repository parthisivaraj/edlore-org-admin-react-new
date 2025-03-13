/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDatabase,
  resetErrors,
  setDatabaseModal,
} from "../../redux/reduxes/databases/datebaseAction";

export const AddNewDatabase = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const processing = useSelector((state) => state.databases.processing);
  const errors = useSelector((state) => state.databases.addDatabaseError);

  const showDatabaseModal = useSelector(
    (state) => state.databases.showDatabaseModal,
  );

  // State
  const [state, setState] = useState({
    name: "",
    errors: {
      name: "",
    },
  });

  // Dispatch to Duplicate Name Error
  useEffect(() => {
    let errors = state.errors;
    if (errors.length > 0) {
      errors.forEach((error) => {
        if (error.name == "name") {
          errors.name = error.message;
        }
      });
    } else {
      errors.name = "";
    }
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
    }));
  }, [errors]);

  // Validate Form
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    if (state.name === "" || (state.name && state.name.length > 150))
      valid = false;
    return valid;
  };

  // Change Handler
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case "name":
        errors.name =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Enter Database Name"
            : value.length > 150
            ? "Database Name shouldn't exceed more than 150 characters"
            : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
    dispatch(resetErrors());
  };

  // Form Submit Event
  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    if (validate(state.errors)) {
      const data = {
        name: state.name.replace(/\s+/g, " ").trim().replace(" ", "-"),
      };
      dispatch(addDatabase(data));
    } else {
      let errors = state.errors;
      if (state.name === "") {
        errors.name = "Enter Database Name";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Reset the form values on Closing Modal
  const onCancelTheEdit = () => {
    dispatch(setDatabaseModal(false));
  };

  // Backdrop that stops closing Modal
  const handleModalBackdrop = () => {};

  return (
    <>
      {/* Adding/Editing Database Popip : Start */}
      <Transition appear show={showDatabaseModal} as={Fragment}>
        <Dialog
          as="div"
          open={showDatabaseModal}
          onClose={() => handleModalBackdrop(false)}
          className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60"
        >
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
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center dark:text-gray2 mb-10">
                Create New Database
              </Dialog.Title>
              <div>
                <label
                  htmlFor="section_title"
                  className="text-sm font-medium leading-tight mb-1"
                >
                  <span className="whitespace-nowrap">Databse Name</span>
                  <span className="text-danger">*</span>
                  <span className="text-gray3 text-sm ml-1">
                    {" "}
                    (Once have created the database, you can start uploading
                    files to it.)
                  </span>
                </label>{" "}
                <br />
                <input
                  type="text"
                  id="section_title"
                  name="name"
                  value={state.name}
                  className="w-full text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                  placeholder="Database Title"
                  onChange={(e) => onChangeHandler(e)}
                  maxLength={150}
                />
                <div className="text-danger mt-1 ml-1">{state.errors.name}</div>
              </div>

              <div className="flex items-center justify-end mt-10">
                <button
                  type="button"
                  onClick={(e) => onCancelTheEdit(e)}
                  className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={(e) => handleSubmitEvent(e)}
                  disabled={!!processing}
                  className={`${
                    !!processing
                      ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                      : ""
                  } bg-secondary text-white text-sm 2xl:text-base font-medium border border-secondary rounded-full px-10 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                >
                  {!!processing ? "Creating..." : "Create"}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      {/* Adding/Editing Database Popup : End */}
    </>
  );
};
