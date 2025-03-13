import React, { Fragment } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';


const ShowAllFeatures = ({ showAllFeatures, setShowAllFeatures, featuresOfTheSelected }) => {

  // Fetch Data
  const featuresLoading = useSelector(state => state.user_roles.permissionLoading);

  // Stop Modal from Closing
  const handleModalBackdrop = () => { }

  return (
    <>
      <Transition appear show={showAllFeatures} as={Fragment}>
        <Dialog as="div" open={showAllFeatures} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
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
              <Dialog.Title className="dark:text-gray2 text-2xl font-bold text-center mb-5">Showing All Features</Dialog.Title>

              <div className="h-[300px] overflow-scroll scrollbar-thin scrollbar-thumb-black2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray2 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                {featuresOfTheSelected.length > 0 ?
                  <>
                    {featuresOfTheSelected.map((feature, index) => {
                      const { title, description, id } = feature;
                      return (
                        <div className="border-b border-dashed border-gray2 dark:border-opacity-40 py-3" key={id}>
                          {featuresLoading  ?
                            <Skeleton
                              count={2}
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
                              <h5 className="text-base font-medium text-black2 dark:text-gray2 mb-1 capitalize"> {title}</h5>
                              <p className="text-sm text-gray3">{description}</p>
                            </>
                          }
                        </div>
                      )
                    })}
                  </>
                  :

                  <div className="flex flex-col items-center justify-center h-full text-lg">
                    No permissions found for this Role
                  </div>
                }
              </div>

              <div className="flex items-center justify-end mt-10">
                <button type='button' onClick={() => setShowAllFeatures(false)} className='bg-transparent text-sm text-black2 dark:text-gray2  font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>);
}

export default ShowAllFeatures;