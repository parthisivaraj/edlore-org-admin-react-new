import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Document, Page } from "react-pdf";

export const PDFModal = ({ open, onClose, pdf, currentPageNumber }) => {
  const [numPages, setNumPages] = useState();
  const [page, setPage] = useState(currentPageNumber);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          open={open}
          onClose={() => onClose()}
          className="fixed inset-0 z-50 flex items-center xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60 overflow-auto"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl shadow-lg">
              <Document
                file={pdf}
                className="pdf-preview query"
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={page} />
                <div class="page-controls">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                  >
                    ‹
                  </button>
                  <span>
                    {page} of {numPages}
                  </span>
                  <button
                    type="button"
                    disabled={page >= numPages}
                    onClick={() => setPage(page + 1)}
                  >
                    ›
                  </button>
                </div>
              </Document>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
