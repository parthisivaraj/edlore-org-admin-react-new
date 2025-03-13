import React, { Fragment } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from 'react-redux';
import { setConfirmEditPopup } from "../../redux/reduxes/workorders/workorderAction";
import { Link } from "react-router-dom";


const ConfirmRedirect = ({ showConfirmation, wo_id }) => {
  const dispatch = useDispatch();
  const confirmationMessage = useSelector(state => state.workorders.confirmationMessage);

  return (
    <Transition appear show={showConfirmation} as={Fragment}>
      <Dialog as="div" open={showConfirmation} onClose={() => dispatch(setConfirmEditPopup(false))} className="fixed inset-0 z-50 py-20 flex items-start justify-center bg-black2 bg-opacity-40">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-[60%] xl:w-[40%] 2xl:w-[30%]  h-auto bg-gray4 dark:bg-gray2 dark:text-black3 rounded-3xl px-8 py-10 shadow-lg">
            <Dialog.Title className="dark:text-black3 text-2xl font-bold text-center mb-4">Publish blocked! We ran into a problem.</Dialog.Title>

            <div>
              <div className="text-black text-center xl:px-10 first-letter:uppercase"><b>{confirmationMessage}.</b></div>
              <div className="text-black text-center xl:px-10 ">Want to edit and publish?</div>
              <div className="flex items-center justify-center mt-10">
                <button type='button' onClick={() => dispatch(setConfirmEditPopup(false))} className='bg-transparent text-sm text-black2  font-medium border border-black2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 hover:text-white hover:transition-all focus-visible:outline-none'>
                  Not Now
                </button>
                <Link to={`/workorder/${wo_id}`} exact={true} className='bg-secondary text-sm text-white font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none'>
                  Edit Now
                </Link>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default ConfirmRedirect;