import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import LinkMedia from "../common/linkMediaSelectOne";
import { csvPartUpload, resetErrors, setCsvUploadMediaModal } from "../../redux/reduxes/anaglyph/anaglyphAction";


const UploadCSVMedia = ({ showUploadCsvMediaModal, model_id, anaglyph_id }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const csvPartUplaoadAnaglyphLoading = useSelector(state => state.anaglyph.csvPartUplaoadAnaglyphLoading);
  const csvPartUplaoadAnaglyphError = useSelector(state => state.anaglyph.csvPartUplaoadAnaglyphError);

  // States
  const [state, setState] = useState({
    selectedFileId: null,
    existingFilesIdsUnchanged: [],
    existingFiles: [],
    changingTheMediaId: "",
    errors: {
      selectedFileId: "",
    }

  })
  useEffect(() => {
    dispatch(resetErrors());
  }, []);

  useEffect(() => {
    let errors = state.errors;
    errors.selectedFileId = csvPartUplaoadAnaglyphError;
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
    }))
  }, [csvPartUplaoadAnaglyphError]);

  // Form Validation

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false))
    if (state.selectedFileId == null || state.selectedFileId == "")
      valid = false;

    return valid;
  }
  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      const data = {
        type: "media",
        model_id: model_id,
        anaglyph_id:anaglyph_id,
        media_id: state.selectedFileId
      }
      dispatch(csvPartUpload(data));
    } else {
      let errors = state.errors;
      if (state.selectedFileId == null || state.selectedFileId == "")
        errors.selectedFileId = "Select the file."

      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }))

    }
  }
  const changingTheMediaId = (up) => {
    let errors = state.errors;
    errors.selectedFileId = ""
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
      selectedFileId: up,
    }));
    dispatch(resetErrors());
  }

  // Backdrop that stops Modal from Closing
  const handleBackdropModal = () => { }
  return (
    <>
      <Transition appear show={showUploadCsvMediaModal} as={Fragment}>
        <Dialog as="div" open={showUploadCsvMediaModal} onClose={() => handleBackdropModal()} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[96%] lg:w-[80%] xl:w-[60%] 2xl:w-[50%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl p-8 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center dark:text-gray2 mb-8">Upload CSV Media</Dialog.Title>

              <div className="xl:h-[65vh] pr-6 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="mb-20">
                    <LinkMedia
                      changingTheMediaId={changingTheMediaId}
                      selectedFileId={state.selectedFileId}
                      select="single"
                      limit={48}
                      showOnly="csv"
                    />
                    <div className='text-danger mt-1 ml-1'>{state.errors.selectedFileId}</div>
                  </div>
                  <div className="flex items-center justify-end fixed bottom-0 right-0 w-full bg-gray4 dark:bg-darkBg py-8 px-12 mt-10 rounded-b-3xl">
                    <button type="button" onClick={(e) => dispatch(setCsvUploadMediaModal(false))} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={csvPartUplaoadAnaglyphLoading}
                      className={`${csvPartUplaoadAnaglyphLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-12 py-2 ml-6 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
                    >
                      {csvPartUplaoadAnaglyphLoading ? "Uploading..." : "Upload"}
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
export default UploadCSVMedia;