import React, { Fragment, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { troubleshootDetails } from '../../redux/reduxes/troubleshoot/troubleshootAction';
import { useDispatch, useSelector } from "react-redux";


const TroubleshootPreview = ({ showTroubleshootPreview, setShowTroubleshootPreview, model_id, trouble_id }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const troubleDetails = useSelector(state => state.troubleshoot.troubleshootDetails);

  // Dispatch Details
  useEffect(() => {
    const data = {
      model_id: model_id,
      trouble_id: trouble_id,
    }
    dispatch(troubleshootDetails(data));
  }, [model_id, trouble_id]);


  // Stops Modal from Closing
  const handleModalBackdrop = () => { }

  return (
    <>
      <Transition appear show={showTroubleshootPreview} as={Fragment}>
        <Dialog as="div" open={showTroubleshootPreview} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[80%] lg:w-[65%] xl:w-[60%]  h-auto bg-gray4 dark:bg-gray2 rounded-2xl p-8 xl:p-10 shadow-lg">
              <div className="flex items-center justify-center mb-8 xl:mb-10">
                <Dialog.Title className="text-2xl 2xl:text-3xl font-semibold text-center ml-auto">Troubleshoot Details</Dialog.Title>
                <button onClick={() => setShowTroubleshootPreview("Troubleshoot", trouble_id, false)} type="button" className="ml-auto text-3xl transition-all hover:text-primary hover:transition-all">&times;</button>
              </div>

              <div className="flex items-center mb-6">
                <div>
                  <div className="text-base uppercase">Trouble</div>
                  <div className="text-base font-bold first-letter:capitalize">{troubleDetails.title && troubleDetails.title}</div>
                </div>
                <div className="ml-[100px]">
                  <div className="text-base uppercase">Cause</div>
                  <div className="text-base font-bold first-letter:capitalize">{troubleDetails.steps_count && troubleDetails.steps_count}</div>
                </div>
              </div>

              <ul>
                {troubleDetails.troubleshoot_steps && troubleDetails.troubleshoot_steps.length > 0 && troubleDetails.troubleshoot_steps.map((cause, index) => {
                  const { id, title, description, medias } = cause;
                  return (
                    <>
                      <li className="mb-10" key={id}>
                        <div className="text-base font-bold mb-2 border-b border-gray3 border-opacity-60"> {title}</div>
                        <div> {description} </div>
                        <div className="grid grid-cols-8 mt-6">
                          {medias.map((media, index) => {
                            return (
                              <>
                                <div className="w-[100px] h-[100px] bg-gray2 rounded-lg">
                                  <img src={media.url} alt={media.id} className="w-[100px] h-[100px] bg-gray2 rounded-lg" />
                                </div>
                              </>
                            )
                          })}
                        </div>
                      </li>
                    </>
                  )
                })}
              </ul>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
export default TroubleshootPreview;