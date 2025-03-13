import React, { useState, Fragment } from "react";
import { Transition, Dialog, Tab } from "@headlessui/react";
import AddNewMediaPanel from "./addNewMediaPanel";

// Tab List
const tabs = [
  { title: 'All files' },
  { title: 'Images' },
  { title: 'PDF' },
  { title: 'Videos' },
  { title: 'Audios' },
  { title: 'TXT' },
  { title: 'CSV' },
  { title: '3D | ZIP' }
]

const AddNewMediaTabs = ({ addNewMediaModal, setAddNewMediaModal, uploadType }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const onMediaTabChange = (index) => {
    setCurrentTab(index);
  }
  const [uploadingInProgress, setUploadingInProgress] = useState(false);
  const uploadingStarted = (started) => {
    setUploadingInProgress(started);
  }
  // Backdrop that stops Popup from Closing
  const handleBackdropModal = () => { };


  return (
    <>
      <Transition appear show={addNewMediaModal} as={Fragment}>
        <Dialog as="div" open={addNewMediaModal} onClose={() => handleBackdropModal(false)} className="fixed inset-0 z-50 py-10 2xl:py-20 flex items-start justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[96%] xl:w-[65%] 2xl:w-[50%] h-[85vh] overflow-hidden bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl py-10 shadow-lg">
              <Dialog.Title className="text-xl xl:text-3xl font-bold mb-8 text-center">Adding New Media</Dialog.Title>
              <div className="h-full lg:max-h-[450px] xl:max-h-[600px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                {!uploadingInProgress &&
                  <Dialog.Description className="text-lg mb-4 px-10">
                    Select up to 25 files, each up to 2GB in size
                  </Dialog.Description>
                }
                <Tab.Group onChange={(index) => onMediaTabChange(index)}>
                  <Tab.List className="px-10 whitespace-nowrap md:overflow-x-scroll xl:overflow-x-hidden">
                    {!uploadingInProgress &&
                      <>
                        {uploadType == "all" ?
                          <>
                            {tabs.map((tab, index) => {
                              const { title } = tab;
                              return (
                                <Tab
                                  key={index}
                                  className={({ selected }) =>
                                    selected ?
                                      'text-base text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-6 focus:outline-none focus-visible:ring-0'
                                      :
                                      'text-base text-black2 dark:text-gray2 opacity-50 font-bold mr-6 border-none hover:opacity-100 focus:outline-none focus-visible:ring-0'
                                  }
                                >
                                  {title}
                                </Tab>
                              )
                            })}
                          </> :
                          <Tab className={'text-base text-black2 dark:text-gray2 font-bold uppercase border-b-4 border-primary mr-6 focus:outline-none focus-visible:ring-0'} >
                            {uploadType}
                          </Tab>
                        }
                      </>
                    }
                  </Tab.List>

                  <Tab.Panels className="px-10">
                    {/* Media Categories Tab Panels */}
                    {uploadType == "all" ?
                      <>
                        {tabs.map((data, index) => (
                          <Tab.Panel key={index} className="mt-5">

                            {addNewMediaModal &&
                              <AddNewMediaPanel
                                tabName={data.title}
                                currentTab={currentTab}
                                setAddNewMediaModal={setAddNewMediaModal}
                                uploadingStarted={uploadingStarted}
                                uploadType={uploadType}
                                index={index}
                                addNewMediaModal={addNewMediaModal}
                              />
                            }
                          </Tab.Panel>
                        ))}
                      </>
                      :
                      <Tab.Panel className="mt-5">
                        {addNewMediaModal &&
                          <AddNewMediaPanel
                            tabName={uploadType}
                            uploadType={uploadType}
                            currentTab={0}
                            setAddNewMediaModal={setAddNewMediaModal}
                            uploadingStarted={uploadingStarted}
                            index={1}
                            addNewMediaModal={addNewMediaModal}
                          />
                        }
                      </Tab.Panel>
                    }

                  </Tab.Panels>
                </Tab.Group>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
export default AddNewMediaTabs;