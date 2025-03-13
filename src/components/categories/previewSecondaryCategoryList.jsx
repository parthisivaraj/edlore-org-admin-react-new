import React, { Fragment } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

const PreviewSecondaryCategoryList = ({ showSubCategoryList, setShowSubCategoryList, subCategoryList }) => {

  // Fetch Data
  const primaryCategoriesLoading = useSelector(state => state.categories.primaryCategoriesLoading);

  // Stop Modal from Closing
  const handleModalBackdrop = () => { }

  return (
    <>
      <Transition appear show={showSubCategoryList} as={Fragment}>
        <Dialog as="div" open={showSubCategoryList} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[70%] xl:w-[40%] 2xl:w-[30%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl px-8 py-10 shadow-lg">
              <Dialog.Title className="dark:text-gray2 text-2xl font-bold text-center mb-5">Showing All Sub Categories</Dialog.Title>

              <div className="h-[300px] overflow-scroll scrollbar-thin scrollbar-thumb-black2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray2 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                {subCategoryList && subCategoryList.length > 0 ?
                  <>
                    <div className='flex align-center border-b border-solid border-gray2 dark:border-opacity-40 py-4'>
                      <div className="w-[60%] text-base font-bold text-black2 dark:text-gray2 mb-0 capitalize"> Secondary Category Title</div>
                      <div className='ml-auto text-base font-bold text-black2 dark:text-gray2 px-8'>Models Count</div>
                    </div>

                    {subCategoryList.map((category, index) => {
                      const { id, name, model_count } = category;
                      return (
                        <div className="border-b border-dashed border-gray2 dark:border-opacity-40 last:border-none py-4" key={id}>
                          {primaryCategoriesLoading  ?
                            <Skeleton
                              count={5}
                              height={40}
                              baseColor="#ebebeb"
                              highlightColor='#e1e1e1'
                              borderRadius="0"
                              enableAnimation="true"
                              duration={2.5}
                              inline={true}
                              className="dark:bg-darkMainBg"
                            />
                          :
                            <>
                              <div className='flex align-center'>
                                <h5 className="w-[80%] text-base font-medium text-black2 dark:text-gray2 mb-0 capitalize"> {name}</h5>
                                <div className='text-base font-medium text-black2 dark:text-gray2 px-8 mx-auto'>{model_count}</div>
                              </div>

                            </>
                          }
                        </div>
                      )
                    })}
                  </>
                  :
                  <div className="flex flex-col items-center justify-center h-full text-base text-danger dark:text-danger">
                    No Secondary Categories Found
                  </div>
                }
              </div>

              <div className="flex items-center justify-end mt-10">
                <button type='button' onClick={() => setShowSubCategoryList(false)} className='bg-transparent text-sm text-black2 dark:text-gray2  font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
export default PreviewSecondaryCategoryList;