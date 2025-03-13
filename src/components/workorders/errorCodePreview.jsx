import React, { Fragment, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { errorCodeDetails, } from '../../redux/reduxes/errorCodes/errorCodesAction';
import { useDispatch, useSelector } from "react-redux";


const ErrorCodePreview = ({ showErrorCodePreview, setShowErrorCodePreview, model_id, errorCodeId, error_type }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const eCodeDetails = useSelector(state => state.error_codes.errorCodeDetails);

  // Dispatch Details
  useEffect(() => {
    const data = {
      model_id: model_id,
      errorCodeId: errorCodeId,
      error_type: error_type,
    }
    dispatch(errorCodeDetails(data));
  }, []);

  // Stops Modal from Closing
  const handleModalBackdrop = () => { };


  return (
    <>
      <Transition appear show={showErrorCodePreview} as={Fragment}>
        <Dialog as="div" open={showErrorCodePreview} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[80%] lg:w-[65%] xl:w-[60%]  h-auto bg-gray4 dark:bg-gray2 rounded-2xl shadow-lg p-2">
              <div className="h-[800px] p-6 xl:p-8 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black2 scrollbar-track-gray4 dark:scrollbar-track-black3  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <div className="flex items-center justify-center mb-8 xl:mb-10">
                  <Dialog.Title className="text-2xl 2xl:text-3xl font-semibold text-center ml-auto">Error Code Details</Dialog.Title>
                  <button onClick={() => setShowErrorCodePreview(error_type, errorCodeId, false)} type="button" className="ml-auto text-3xl transition-all hover:text-primary hover:transition-all">&times;</button>
                </div>
                <div className="flex items-center mb-6">
                  <div>
                    <div className="text-base">{error_type}</div>
                    <div className="text-base font-bold first-letter:capitalize">{eCodeDetails.title}</div>
                  </div>
                  <div className="ml-[100px]">
                    <div className="text-base uppercase">Procedures</div>
                    <div className="text-base font-bold first-letter:capitalize">{eCodeDetails.procedure_count && eCodeDetails.procedure_count}</div>
                  </div>
                  <div className="ml-[100px]">
                    <div className="text-base uppercase">Troubleshoot</div>
                    <div className="text-base font-bold first-letter:capitalize">{eCodeDetails.troubleshoot_count && eCodeDetails.troubleshoot_count}</div>
                  </div>
                </div>

                <div className="mb-10">
                  <div className="text-base uppercase">eCode Description</div>
                  <div className="text-base first-letter:capitalize">{eCodeDetails.description && eCodeDetails.description}</div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
export default ErrorCodePreview;