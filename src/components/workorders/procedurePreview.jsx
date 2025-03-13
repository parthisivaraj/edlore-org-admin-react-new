
import React, { Fragment, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProcedureDetails } from "../../redux/reduxes/procedure/procedureAction";

const ProcedurePreview = ({ showProcedurePreview, setShowProcedurePreview, model_id, procedure_id }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const procedureDetails = useSelector(state => state.procedure.proceduresDetails);

  // Dispatch Details
  useEffect(() => {
    const data = {
      model_id: model_id,
      procedure_id: procedure_id,
    }
    dispatch(getProcedureDetails(data));
  }, [model_id, procedure_id]);

  // Stops Modal from Closing
  const handleModalBackdrop = () => { }

  return (
    <>
      <Transition appear show={showProcedurePreview} as={Fragment}>
        <Dialog as="div" open={showProcedurePreview} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[90%] lg:w-[80%] xl:w-[60%]  h-auto bg-gray4 dark:bg-gray2 rounded-2xl p-8 xl:p-10 shadow-lg">
              <div className="flex items-center justify-center mb-8 xl:mb-10">
                <Dialog.Title className="text-2xl 2xl:text-3xl font-semibold text-center ml-auto">Procedure Details</Dialog.Title>
                <button onClick={() => setShowProcedurePreview("Procedure", procedure_id, false)} type="button" className="ml-auto text-3xl transition-all hover:text-primary hover:transition-all">&times;</button>
              </div>
              <div className="flex items-center mb-6">
                <div>
                  <div className="text-base uppercase">Procedure</div>
                  <div className="text-base font-bold first-letter:capitalize">Title of Procedure</div>
                </div>
                <div className="ml-[100px]">
                  <div className="text-base uppercase">Steps</div>
                  <div className="text-base font-bold first-letter:capitalize">2</div>
                </div>
              </div>

              <ul>
                {procedureDetails && procedureDetails.length > 0 && procedureDetails.map((procedure, index) => {
                  const { id, title, desc, medias } = procedure;
                  return (
                    <>
                      <li className="mb-10" key={id}>
                        <div className="text-base font-bold mb-2 border-b border-gray3 border-opacity-60"> {title}</div>
                        <p>{desc}</p>
                        <div className="grid grid-cols-3 md:grid-cols-6 2xl:grid-cols-8 mt-6">
                          {medias.map((media, index) => {
                            return (
                              <>
                                <div className="w-[100px] h-[100px] bg-gray2 rounded-lg">
                                  <img src={media.img} alt={media.id} className="w-[100px] h-[100px] bg-gray2 rounded-lg" />
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
export default ProcedurePreview;