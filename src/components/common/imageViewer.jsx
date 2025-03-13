import React, { Fragment } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import ReactPanZoom from 'react-image-pan-zoom-rotate';

const ImageViewer = ({ showMedia, setShowMedia, showingMedia, alt }) => {
  return (
    <Transition appear show={showMedia} as={Fragment}>
      <Dialog as="div" open={showMedia} onClose={() => setShowMedia(false)} className="fixed inset-0 z-50  flex items-start justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-screen h-screen bg-white dark:bg-darkMainBg">
            <button type="button" onClick={() => setShowMedia(false)} className="relative z-[100] text-base bg-white dark:bg-darkMainBg text-primary text-opacity-75 font-medium underline px-4 py-1 m-3 rounded-3xl transition-all duration-300 hover:text-opacity-100 hover:transition-all hover:duration-300">Close</button>
            <ReactPanZoom
              image={showingMedia}
              alt={alt}
            />
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default ImageViewer;

