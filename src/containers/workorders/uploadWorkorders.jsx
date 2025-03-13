import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Layout from '../../layout';
import LinkMedia from "../../components/common/linkMediaSelectOne";
import { uploadWorkOrder, setUploadWorkorderModal, resetUploadWoError } from "../../redux/reduxes/workorders/workorderAction";
import { Dialog, Transition } from '@headlessui/react';


const uploads = [
  { slno: '44225544', title: 'Inspect Ultrasound #558568', desc: 'Description of error', width: '54' },
]

const UploadWorkorders = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const showWorkOrderUploadModal = useSelector(state => state.workorders.showWorkOrderUploadModal);
  const uploadWoDetails = useSelector(state => state.workorders.uploadWoDetails);
  const uploadWoError = useSelector(state => state.workorders.uploadWoError);
  const uploadWoLoading = useSelector(state => state.workorders.uploadWoLoading);

  // States
  const [state, setState] = useState({
    selectedFileId: null,
    existingFilesIdsUnchanged: [],
    existingFiles: [],
    errors: {
      selectedFileId: "",
    }
  });
  // set errrors
  useEffect(() => {
    let errors = state.errors;
    errors.selectedFileId = uploadWoError;
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [uploadWoError]);

  useEffect(() => {
    resetUploadWoError();
  }, []);

  function setShowUploadWorkorderModal() {
    dispatch(setUploadWorkorderModal(true))
  }

  // On select function
  const changingTheMediaId = (up) => {
    let errors = state.errors;
    errors.selectedFileId = ""
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
      selectedFileId: up,
    }));
    dispatch(resetUploadWoError());
  }

  // Validate
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false))
    if (state.selectedFileId == null || state.selectedFileId == "")
      valid = false;

    return valid;
  }

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (validateForm(state.errors)) {
    const data = {
      media_id: state.selectedFileId
    }
    dispatch(uploadWorkOrder(data));
    // } else {
    //   let errors = state.errors;
    //   if (state.selectedFileId == null || state.selectedFileId == "")
    //     errors.selectedFileId = "Select the file."

    //   setState((prevProps) => ({
    //     ...prevProps,
    //     errors: errors,
    //   }))
    // }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Upload Workorders</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div className="mb-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-start-1 col-span-2 xl:col-span-1">
                <div className="flex items-center">
                  <img src="../assets/icons/icon-workorders.svg" alt="icon-workorders" className="w-[18px] h-[18px] invert" />
                  <span className="ml-1 text-xs text-black dark:text-gray2 font-medium">Workorders</span>
                  <span className="ml-1 text-xs text-black dark:text-gray2  font-medium">/ Upload Existing Workorders</span>
                </div>
                <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2 font-bold">Upload Workorders</h1>
              </div>
              <div className="col-start-1 xl:col-start-2 col-span-2 xl:col-span-1 m-auto mr-0">
                <Link to="/workorder/new?" exact={true} className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-6 py-2.5 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all">
                  Create New Work Order +
                </Link>
                <button type='button' onClick={() => setShowUploadWorkorderModal(true)} className="bg-transparent text-black2 dark:text-gray2 text-sm font-bold border border-black2 dark:border-gray2 rounded-full px-6 py-2 ml-4 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all">
                  Upload Work Order
                </button>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Upload Section : Start */}
          <div className="mt-10 xl:mt-20">
            <div className="flex items-center justify-between mb-4 dark:text-gray2">
              {/* <div className="flex items-center">
                <div className="text-sm font-bold">Completed 01 <span className="text-gray3 dark:text-gray2 opacity-50"> - 05</span></div>
                <button type="button" className="flex items-center text-sm ml-8">
                  <span>Cancel all</span>
                  <img src="../assets/icons/icon-cancel.svg" alt="icon-cancel" className="ml-2 w-[12px] h-[12px]" />
                </button>
              </div> */}
            </div>

            <div className="h-[500px] border border-gray2 dark:border-black2 rounded-2xl overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black2 scrollbar-track-gray4 dark:scrollbar-track-black3  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
              {uploadWoDetails && uploadWoDetails.extracted_percentage ?
                <>
                  <h6 className="text-lg font-bold">Workorder upload in progress</h6>
                  <div className="grid grid-cols-5 gap-4 dark:text-gray2 border-b border-gray2 dark:border-black3 rounded-sm px-8 py-4 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10">
                    <div className="text-sm font-medium">547894</div>
                    <div className="text-sm">{uploadWoDetails.work_order_title}</div>
                    {/* <div className="text-sm">Description for error code</div> */}
                    <div className="flex items-center md:w-[100px] xl:w-[300px]">
                      <div className="w-full h-[15px] bg-gray2 dark:bg-opacity-20 rounded-full">
                        <div className="bg-primary h-[15px] rounded-full" style={{ width: `${uploadWoDetails.extracted_percentage}%` }}></div>
                      </div>
                      <div className="text-sm font-medium ml-4">{uploadWoDetails.extracted_percentage}%</div>
                    </div>
                    <div className="flex items-center ml-auto">
                      <button type="button" className=" focus-visible:outline-none" title="Delete">
                        <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="dark:invert" />
                      </button>
                      <Link to={`/workorder/${uploadWoDetails.extracted_percentage}`} exact={true} className="bg-transparent text-black3 dark:text-gray2 text-sm font-medium border border-primary rounded-full ml-4 px-6 py-1 shadow-sm transition-all hover:bg-primary hover:text-white hover:transition-all focus:outline-none">
                        Edit
                      </Link>
                    </div>
                  </div>
                </>
                :

                <div className='flex flex-col justify-center items-center h-full'>
                  <div className='text-xl xl:text-2xl text-black dark:text-gray2 font-bold mb-4'>No Uploaded Work Orders Found</div>
                  <button type='button' onClick={() => setShowUploadWorkorderModal(true)} className="max-w-[300px] bg-transparent text-black2 dark:text-gray2 text-sm font-bold border border-black2 dark:border-gray2 rounded-full px-6 py-2 ml-4 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all">
                    Upload Work Order
                  </button>
                </div>
              }
            </div>
          </div>
          {/* Upload Section : End */}
        </section>

        {/* Upload Workorder Modal */}
        <Transition appear show={showWorkOrderUploadModal} as={Fragment}>
          <Dialog as="div" open={showWorkOrderUploadModal} onClose={() => setShowUploadWorkorderModal(false)} className="fixed inset-0 z-50 py-10 2xl:py-20 flex items-start justify-center bg-black2 bg-opacity-40">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-[96%] xl:w-[70%] 2xl:w-[50%]  h-full xl:h-[450px] 2xl:h-auto bg-gray4 dark:bg-gray2 dark:text-black3 rounded-3xl px-8 py-10 shadow-lg">
                <Dialog.Title className="dark:text-black3 text-2xl font-bold text-center mb-10">Upload Work Order</Dialog.Title>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className='mb-20'>
                    <LinkMedia
                      changingTheMediaId={changingTheMediaId}
                      selectedFileId={state.selectedFileId}
                      select="single"
                      limit={48}
                      showOnly="pdf"
                    />
                    <div className='text-danger mt-1 ml-1'>{state.errors.selectedFileId}</div>
                  </div>
                  <div className="flex items-center justify-end fixed bottom-0 right-0 w-full bg-gray4 py-8 px-12 mt-14 rounded-b-3xl">
                    <button type="button" onClick={() => dispatch(setUploadWorkorderModal(false))} className="bg-transparent text-sm text-black2  font-medium border border-black2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 hover:text-white hover:transition-all focus-visible:outline-none">Cancel</button>
                    <button
                      type="submit"
                      disabled={uploadWoLoading}
                      className={`${uploadWoLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-6 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
                    >
                      {uploadWoLoading ?
                        "Uploading..." : "Upload"
                      }
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </Layout>
    </>
  );
}
export default UploadWorkorders;