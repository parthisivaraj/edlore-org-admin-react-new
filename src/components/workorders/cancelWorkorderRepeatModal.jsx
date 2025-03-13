import React, { Fragment } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch } from 'react-redux';
import { cancelWorkorderRepeat } from '../../redux/reduxes/workorders/workorderAction';

const CancelWorkorderRepeatModal = ({ head, body, cancelWORepeatModal, setCancelWORepeatModal, cancelWORepeatId, setCancelWORepeatId }) => {

  const dispatch = useDispatch();

  const dispatchTheFunction = () => {
    const data = {
      id: cancelWORepeatId,
    }
    dispatch(cancelWorkorderRepeat(data));
    setCancelWORepeatModal(false);
  }

  return (
    <>
      <Transition appear show={cancelWORepeatModal} as={Fragment}>
        <Dialog as="div" open={cancelWORepeatModal} onClose={() => setCancelWORepeatModal(false, null)} className="fixed inset-0 z-50 py-20 flex items-start justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[60%] xl:w-[40%] 2xl:w-[30%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl px-8 py-10 shadow-lg">
              <Dialog.Title className="dark:text-gray2 text-2xl font-bold text-center mb-4">{head}</Dialog.Title>

              <div>
                <div className="text-black text-center xl:px-10">{body}</div>
                <div className="flex items-center justify-center mt-10">
                  <button type='button' onClick={() => setCancelWORepeatModal(false, null)} className="bg-gray dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0">
                    Close
                  </button>
                  <button type='button' onClick={() => dispatchTheFunction()} className='bg-secondary text-sm text-white font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                    Cancel WO Repetition
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
export default CancelWorkorderRepeatModal;