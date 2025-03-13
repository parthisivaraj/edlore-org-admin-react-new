/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { EnvironmentConstant } from "../../helpers/constant/common";
import { setSyncModal, syncData } from "../../redux/reduxes/sync/syncAction";

export const SyncModal = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const processing = useSelector((state) => state.sync.processing);
  const showSyncModal = useSelector((state) => state.sync.showSyncModal);

  // State
  const [state, setState] = useState({
    ipAddress: "",
    errors: {
      ipAddress: "",
    },
  });

  // Validate Form
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    if (state.ipAddress === "") valid = false;
    return valid;
  };

  // Change Handler
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case "ipAddress":
        errors.ipAddress =
          value === "" || value.replace(/\s+/g, "").length === 0
            ? "Enter IP Address"
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
  };

  // Form Submit Event
  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    if (validate(state.errors)) {
      const data = {
        machine: EnvironmentConstant.machine,
        ipAddress: state.ipAddress
          .replace(/\s+/g, " ")
          .trim()
          .replace(" ", "-"),
      };
      dispatch(syncData(data));
    } else {
      let errors = state.errors;
      if (state.ipAddress === "") {
        errors.ipAddress = "Enter IP Address";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Reset the form values on Closing Modal
  const onCancelTheEdit = () => {
    dispatch(setSyncModal(false));
  };

  // Backdrop that stops closing Modal
  const handleModalBackdrop = () => {};

  return (
    <>
      {/* Adding/Editing Database Popip : Start */}
      <Transition appear show={showSyncModal} as={Fragment}>
        <Dialog
          as="div"
          open={showSyncModal}
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
                Sync Data to {EnvironmentConstant.machine}
              </Dialog.Title>
              <div>
                <label
                  htmlFor="ipAddress"
                  className="text-sm font-medium leading-tight mb-1"
                >
                  <span className="whitespace-nowrap">IP Address</span>
                  <span className="text-danger">*</span>
                </label>{" "}
                <br />
                <input
                  type="text"
                  id="ipAddress"
                  name="ipAddress"
                  value={state.ipAddress}
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
                  disabled={!!processing}
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
                  {processing || "Sync"}
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
