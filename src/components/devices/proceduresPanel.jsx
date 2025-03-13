import React, { Fragment, useState } from 'react';
import { Tab, Transition, Dialog } from "@headlessui/react";
import ProcedureDetails from "../../components/procedures/procedureDetails";
import { useSelector, useDispatch } from 'react-redux';

const ProceduresPanel = ({ model_id }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const modelProcedures = useSelector(state => state.procedure.modelProcedures);
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [editingProcedure, setEditingProcedure] = useState(null);

  // Open Procedure Modal
  const openProcedure = (selected) => {
    setShowProcedureModal(true);
    setEditingProcedure(selected);
  }

  return (
    <Tab.Panel>
      <div className="absolute right-0  -top-[90px]">
        <button type="button" onClick={() => setShowProcedureModal(true)} className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2 shadow-md transition-all hover:bg-transparent hover:text-primary hover:transition-all focus:outline-none">
          Create new procedure +
        </button>
      </div>

      <div className="w-full bg-white dark:bg-black3 border border-gray2 dark:border-black2 rounded-2xl p-8">
        <h2 className="text-xl 2xl:text-2xl text-black2 dark:text-gray2 font-medium leading-tight">Selected from the procedure template or <br /> create a new one</h2>

        <div className="w-full h-[350px] 2xl:h-[450px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black2 scrollbar-track-gray4 dark:scrollbar-track-black3  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          <table className="table-auto text-left w-full">
            <thead className="border-b border-gray2 dark:border-gray3">
              <tr>
                <th scope="col" className="px-8 py-4"></th>
                <th scope="col" className="px-8 py-4"></th>
                <th scope="col" className="px-8 py-4"></th>
                <th scope="col" className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {modelProcedures.map((procedure, index) => {
                const { name, steps_count, media_count, id } = procedure;
                return (
                  <tr valign="top" key={id} className="dark:text-gray2 border-b border-gray2 dark:border-black3 odd:bg-gray dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 hover:transition-all hover:duration-300">
                    <td className="px-8 py-4 xl:text-sm 2xl:text-base capitalize font-medium whitespace-nowrap line-clamp-3">{name}</td>
                    <td className="px-8 py-4 opacity-75">
                      <span className="xl:text-sm 2xl:text-base whitespace-nowrap">Steps {steps_count}</span> <br />
                      <span className="xl:text-sm 2xl:text-base whitespace-nowrap">Media and documents {media_count}</span>
                    </td>
                    <td className="px-8 py-4">
                      <button type="button" onClick={() => openProcedure(id)} className="group flex items-center text-primary text-sm font-medium underline whitespace-nowrap transition-all duration-300 hover:transition-all hover:duration-300 focus:outline-0 focus:outline-none">
                        <span>View procedure</span>
                        <img src="../assets/icons/icon-link.svg" alt="icon-external-link" className="ml-1 transition-all duration-300 group-hover:translate-x-[8px] group-hover:transition-all group-hover:duration-300" />
                      </button>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      </div>


      {/* <div className="flex items-center justify-end mt-10">
        <button type="button" className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-black3 hover:text-white hover:transition-all">
          Cancel
        </button>

        <button type="button" className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-6 py-2 ml-5 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all">
          Submit &amp; Update
        </button>
      </div> */}


      {/* Procedures Details Modal : Start */}
      <Transition appear show={showProcedureModal} as={Fragment}>
        <Dialog as="div" open={showProcedureModal} onClose={() => setShowProcedureModal(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[98%] md:w-[95%] xl:w-[80%] 2xl:w-[85%] h-auto bg-gray4 dark:bg-black3 rounded-2xl shadow-lg">

              <ProcedureDetails
                tabName="Step 1"
                addNewTab="Add Step"
                actionName="Add"
                procedure_id={editingProcedure}
                model_id={model_id}
                // procedure_name={procedure_name}
                callingFrom="procedures"
              />

            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      {/* Procedures Details Modal  : End */}
    </Tab.Panel>

  );
}

export default ProceduresPanel;