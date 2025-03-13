import React, { Fragment } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch } from 'react-redux';


const ClearAllModal = ({ confirmClear, clearingType, clearingAction, setConfirmClear, head, body, deleteLoading }) => {
  const dispatch = useDispatch();
  const data = {
    clear_type: clearingType == "today" ? "today" : clearingType == "yesterday" ? "yesterday" : "older",
    limit: 10,
    page: 0,
  };

  const dispatchTheFunction = () => {
    dispatch(clearingAction(data));
    setConfirmClear(false);
    // closeParentPopup(false);
  }

  return (
    <Transition appear show={confirmClear} as={Fragment}>
      <Dialog as="div" open={confirmClear} onClose={() => setConfirmClear(false)} className="fixed inset-0 z-50 py-20 flex items-start justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="md:w-[50%] xl:w-[40%] 2xl:w-[30%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-3xl px-8 py-10 shadow-lg">
            <Dialog.Title className="dark:text-gray2 text-2xl font-bold text-center mb-4">{head}</Dialog.Title>

            <div>
              <div className="text-black text-center xl:px-10">{body}</div>
              <div className="flex items-center justify-center mt-10">
                <button type='button' onClick={() => setConfirmClear(false)} className="bg-transparent text-black2 dark:text-gray2 border border-black2 dark:border-gray2 md:text-sm 2xl:text-base font-medium rounded-full shadow-sm px-8 py-2 max-w-[150px] xl:max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={() => dispatchTheFunction()}
                  disabled={deleteLoading}
                  className={`${deleteLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-sm text-white font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                >
                  {deleteLoading ? "Clearing..." : "Clear All"}
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default ClearAllModal;