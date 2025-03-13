import React, { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useSelector } from "react-redux";

const DeleteDatabaseConfirmation = ({ isDeleteModalOpen, setDeleteModalOpen, handleDeleteDatabase }) => {

  const processing = useSelector((state) => state.databases.processing);

  return (
    <Transition appear show={isDeleteModalOpen} as={Fragment}>
      <Dialog as="div" open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-[90%] max-w-md p-8 bg-gray4 dark:bg-darkBg text-center rounded-xl border border-gray2 dark:border-opacity-20 shadow-lg">
            <Dialog.Title className="text-xl font-bold text-black2 dark:text-danger">
              Are you sure you want to delete this database?
            </Dialog.Title>
            <Dialog.Description className="mt-4 text-base text-gray3 dark:text-gray2">
              This action cannot be undone. Deleting this database will remove all their data.
            </Dialog.Description>
            <div className="mt-6 flex justify-center gap-4">
              {/* <button
                onClick={handleDeleteDatabase}
                className="bg-danger text-white text-sm font-semibold py-2 px-6 rounded-md hover:bg-danger-dark focus:outline-none focus:ring-2 focus:ring-danger focus:ring-opacity-50"
              >
                Yes, Delete
              </button> */}
              <button
                onClick={handleDeleteDatabase}
                disabled={!!processing}
                className={`${
                  !!processing
                    ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                    : "bg-danger hover:bg-danger-dark"
                } text-white text-sm font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-danger focus:ring-opacity-50 transition-all duration-300`}
              >
                {!!processing ? "Deleting..." : "Yes, Delete"}
              </button>

              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-300 text-black text-sm font-semibold py-2 px-6 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default DeleteDatabaseConfirmation;
