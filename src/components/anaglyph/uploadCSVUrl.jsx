import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { csvPartUpload, setCsvUploadUrlModal, resetErrors } from "../../redux/reduxes/anaglyph/anaglyphAction";

const UploadCSVUrl = ({ showUploadCsvUrlModal, setShowUploadCsvMediaModal, model_id, anaglyph_id }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const csvPartUplaoadAnaglyphLoading = useSelector(state => state.anaglyph.csvPartUplaoadAnaglyphLoading);
  const csvPartUplaoadAnaglyphError = useSelector(state => state.anaglyph.csvPartUplaoadAnaglyphError);

  // States
  const [state, setState] = useState({
    csv_url: "",

    errors: {
      csv_url: "",
    }
  })

  useEffect(() => {
    dispatch(resetErrors());
  }, []);

  useEffect(() => {
    let errors = state.errors;
    errors.csv_url = csvPartUplaoadAnaglyphError;
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
    }))
  }, [csvPartUplaoadAnaglyphError]);

  // Form Validation
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (val = false))
    if (state.csv_url == "")
      valid = false
    return valid;
  }

  // OnChange Handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'csv_url':
        errors.csv_url = value == "" ? "Enter CSV Url" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }))
  }

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      const data = {
        type: "url",
        model_id: model_id,
        anaglyph_id: anaglyph_id,
        csv_url: state.csv_url,
      }
      dispatch(csvPartUpload(data));
    } else {
      let errors = state.errors;
      if (state.csv_url == "")
        errors.csv_url = "Enter CSV Url"

      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }))
    }
  }

  // Backdrop that stops Modal from Closing
  const handleBackdropModal = () => { }
  return (
    <>
      <Transition appear show={showUploadCsvUrlModal} as={Fragment}>
        <Dialog as="div" open={showUploadCsvUrlModal} onClose={() => handleBackdropModal()} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="md:w-[90%] xl:w-[50%] 2xl:w-[40%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl py-8 px-10 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center dark:text-gray2 mb-8">Upload CSV URL</Dialog.Title>

              <div className="w-full h-full">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="">
                    <label htmlFor="part_name" className="text-sm font-medium dark:text-gray2">CSV URL <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      id="csv_url"
                      name="csv_url"
                      value={state.csv_url}
                      placeholder="Enter CSV URL"
                      className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                      onChange={(e) => onChangeHandler(e)}
                    />
                    <div className='text-danger mt-1 ml-1'>{state.errors.csv_url}</div>
                  </div>
                  <div className="flex items-center justify-end  w-full pt-12 rounded-b-3xl">
                    <button type="button" onClick={(e) => dispatch(setCsvUploadUrlModal(false))} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={csvPartUplaoadAnaglyphLoading}
                      className={`${csvPartUplaoadAnaglyphLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-12 py-2 ml-6 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
                    >
                      {csvPartUplaoadAnaglyphLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
export default UploadCSVUrl;