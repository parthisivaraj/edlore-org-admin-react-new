import React, { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import CreateSafetyMeasure from "./createSafetyMeasure";
import CloneSafetyMeasures from "./cloneSafetyMeasures";
import { setSafetyMeasuresModal, setUpdating } from "../../redux/reduxes/safetyMeasures/safetyMeasuresAction";
import { useSelector, useDispatch } from 'react-redux';


const ChooseSafetyMeasures = ({ chooseSafetyMeasuresModal, setChooseSafetyMeasuresModal, model_id }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const safetyMeasuresModal = useSelector(state => state.safety_measures.safetyMeasuresModal);

  // Create New Safety Measure Modal
  function setAddSafetyMeasuresModal() {
    dispatch(setSafetyMeasuresModal(true));
  }

  // Add Safety Measure
  const addSafetyMeasure = () => {
    dispatch(setUpdating(false));
    setChooseSafetyMeasuresModal(false);
    setAddSafetyMeasuresModal(true);
  }

  // Clone Safety Measure Modal
  const [cloneSafetyMeasuresModal, setCloneSafetyMeasuresModal] = useState(false);
  const [clone, setClone] = useState(false);

  const cloneSafetyMeasure = () => {
    setChooseSafetyMeasuresModal(false);
    setCloneSafetyMeasuresModal(true);
  }

  // Backdrop that stops Modal from Closing
  const handleBackdropModal = () => { };


  return (
    <>
      <Transition appear show={chooseSafetyMeasuresModal} as={Fragment}>
        <Dialog as="div" open={chooseSafetyMeasuresModal} onClose={() => handleBackdropModal(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[96%] lg:w-[70%] xl:w-[60%] 2xl:w-[40%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl px-12 py-12 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center mb-8">Create New or Clone from Existing</Dialog.Title>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-start-1">
                  <div className="w-full bg-white dark:bg-darkMainBg dark:text-gray2 px-8 py-8 text-center rounded-2xl">
                    <p className="text-base text-black2 dark:text-gray2 font-medium mb-8">Completely Clone from existing template data</p>
                    <button type="button" onClick={() => cloneSafetyMeasure()} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-6 py-2 mx-5 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                      Clone from Existing
                    </button>
                  </div>
                </div>
                <div className="col-start-2">
                  <div className="w-full bg-white dark:bg-darkMainBg dark:text-gray2 px-8 py-8 text-center rounded-2xl">
                    <p className="text-base text-black2 dark:text-gray2 font-medium mb-8">Get started with creating a new safety measure instruction</p>
                    <button type="button" onClick={() => addSafetyMeasure()} className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                      Create New
                    </button>
                  </div>
                </div>
              </div>

              <button type="button" onClick={() => setChooseSafetyMeasuresModal(false)} className="flex ml-auto mt-12 bg-white dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base  border border-black2 dark:border-gray2 text-base font-medium rounded-full shadow-sm px-6 py-2 mr-3 transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                Cancel
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>


      {/* Create Safety Measure */}
      {safetyMeasuresModal &&
        <CreateSafetyMeasure
          addSafetyMeasuresModal={safetyMeasuresModal}
          // setAddSafetyMeasuresModal={setAddSafetyMeasuresModal}
          model_id={model_id}
        />
      }

      {/* Clone Safety Measure */}
      {cloneSafetyMeasuresModal &&
        <CloneSafetyMeasures
          cloneSafetyMeasuresModal={cloneSafetyMeasuresModal}
          setCloneSafetyMeasuresModal={setCloneSafetyMeasuresModal}
          model_id={model_id}
          clone={clone}
          setClone={setClone}
        />
      }
    </>
  );
}
export default ChooseSafetyMeasures;