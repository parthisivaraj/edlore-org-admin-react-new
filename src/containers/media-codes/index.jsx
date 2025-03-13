import React, { useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import { Transition, Dialog, Menu, Tab } from "@headlessui/react";
import Layout from '../../layout';

// Icons and Images
import FOLDER from '../../assets/images/devices/folder.png';

import ICON_HOME from '../../assets/icons/icon-home.svg';
import ICON_GRID from '../../assets/icons/icon-grid.svg';
import ICON_LIST from '../../assets/icons/icon-list.svg';
import ICON_SEARCH from '../../assets/icons/icon-search.svg';
import ICON_FILTER from '../../assets/icons/icon-filter.svg';
import ICON_DELETE from '../../assets/icons/icon-delete.svg';



// Tab List
const tabs = [
  { title: 'All files' },
  { title: 'PDF' },
  { title: 'Video' },
  { title: 'Audio' },
  { title: 'TXT' },
  { title: '3D' }
]

// Uploaded Media List
const medias = [
  { img: '../images/d1.png' },
  { img: '../images/d2.png' },
  { img: '../images/d3.png' },
  { img: '../images/d4.png' },
  { img: '../images/d1.png' },
  { img: '../images/d2.png' },
  { img: '../images/d3.png' },
  { img: '../images/d1.png' },
  { img: '../images/d2.png' },
  { img: '../images/d3.png' },
  { img: '../images/d4.png' },
  { img: '../images/d1.png' },
  { img: '../images/d2.png' },
  { img: '../images/d3.png' },
]



const MediaCodes = () => {

  // Media Modal Popup
  const [showMediaUploadModal, setShowMediaUploadModal] = useState(false);


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Media &amp; Codes</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
           <div>
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img src={ICON_HOME} alt="icon-home" className="dark:invert" />
                  <span className="ml-1 text-xs text-black dark:text-gray2 font-medium">Media &amp; Codes</span>
                </div>
                <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2 font-bold">Media | Documents</h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                <button type="button" onClick={() => setShowMediaUploadModal(true)} className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-6 py-2 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all">
                  Upload new media +
                </button>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          <div>
            <div className="w-full h-full bg-white dark:bg-black3 border border-gray2 dark:border-black2 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center">
                  <button type="button">
                    <img src={ICON_GRID} alt="icon-grid" className="dark:invert" />
                  </button>
                  <button type="button">
                    <img src={ICON_LIST} alt="icon-list" className="ml-4 dark:invert" />
                  </button>
                  <div className="w-[400px] relative ml-10 overflow-hidden">
                    <input
                      type="search"
                      className="w-full bg-gray4 dark:bg-black3 bg-opacity-60 dark:text-gray2 text-sm px-4 py-2 border border-gray2 rounded-full  focus:border-secondary focus:outline-none"
                      name="user_search"
                      id="user_search"
                      placeholder="Search for media and documents.."
                    />
                    <button className="block absolute top-3 right-3 m-auto">
                      <img src={ICON_SEARCH} alt="icon-search" className="w-4 h-4 block m-auto dark:invert" />
                    </button>
                  </div>
                </div>

               {/* Filters : Start */}
               <Menu as="div" className="inline-block relative text-left ml-auto">
                <Menu.Button className="focus:outline-none">
                  <img src={ICON_FILTER} alt="icon-filter" className="dark:invert" />
                </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-[100] mt-2 w-[220px]  rounded-md bg-white shadow-lg ring ring-gray4 ring-opacity-30 focus:outline-none">
                      <Menu.Item as="button" className="w-full text-sm text-left px-4 py-3 rounded-sm hover:bg-gray4">
                        Sort by recently added
                      </Menu.Item>
                      <Menu.Item as="button" className="w-full text-sm text-left px-4 py-3 rounded-sm hover:bg-gray4">
                          Other filters
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
              </Menu>
              </div>

              {/* If data is found, display the below info */}
              <div className="h-[450px] md:overflow-scroll 2xl:overflow-hidden md:scrollbar-thin 2xl:hover:scrollbar-thin scrollbar-thumb-gray4 scrollbar-track-gray2 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <div className="flex items-stretch flex-wrap mt-1">
                  {medias.map((media, index) => {
                    const { img } = media;
                    return (
                      <label key={index}  className="relative md:w-[90px] xl:w-[120px] md:h-[90px] xl:h-[120px] bg-white  rounded-xl md:m-2 xl:m-4">
                        <div className="md:w-[90px] xl:w-[120px] md:h-[90px] xl:h-[120px] border border-gray2 dark:border-opacity-10 rounded-xl overflow-hidden">
                          <img src={img} alt="" />
                        </div>

                        <input
                          type="checkbox"
                          id="media_upload"
                          name="media_upload"
                          className="absolute -top-1 -right-1 w-5 h-5"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end mt-10">
                <div className="dark:text-gray2 text-sm font-medium">Showing 80 of 100 media items</div>
                <button type="button" className="bg-transparent text-black2 dark:text-gray2 text-sm font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 ml-5 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all">
                  Load More
                </button>
              </div>

              {/* If no data found, display the below info */}
              <div className="hidden text-center my-40">
                <h4 className="dark:text-gray2 text-2xl font-bold mb-2">Upload media and documents here</h4>
                <p className="text-lg text-gray3 dark:text-gray2 mb-5">Media and documents uploaded here <br /> can be linked to devices</p>
                <button type="button" onClick={() => setShowMediaUploadModal(true)} className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-8 py-2 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all">
                  Upload new media +
                </button>
              </div>
            </div>
          </div>


          {/* Upload Images Popup : Start */}
          <Transition appear show={showMediaUploadModal} as={Fragment}>
            <Dialog as="div" open={showMediaUploadModal} onClose={() => setShowMediaUploadModal(false)} className="fixed inset-0 z-50 py-48 flex items-center justify-center bg-black2 bg-opacity-40">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="md:w-[90%] xl:w-[60%]  h-auto bg-gray4 dark:bg-black3 rounded-3xl p-10 shadow-lg">
                  <Dialog.Title className="dark:text-gray2 text-lg font-medium mb-5">Select a file type to upload</Dialog.Title>

                  <Tab.Group>
                    <Tab.List className="mb-6 whitespace-nowrap md:overflow-x-scroll xl:overflow-x-hidden">
                      {tabs.map((tab, index) => {
                        const { title } = tab;
                        return (
                          <Tab
                              key={index}
                              className={({ selected }) =>
                                selected ?
                                  'text-base text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-6'
                                  :
                                  'text-base text-black2 dark:text-gray2 opacity-50 font-bold mr-6 border-none hover:opacity-100 focus:outline-0 focus-visible:outline-none'
                              }
                            >
                              {title}
                          </Tab>
                        )
                      })}
                    </Tab.List>

                    <Tab.Panels>
                      <Tab.Panel>
                        {/* Upload Images/Media */}
                        <div className="relative h-[108px]">
                          <input type="file"
                            id="add_new_media"
                            name="add_new_media"
                            className="absolute z-20 w-full h-[108px] opacity-0"
                          />
                          <div className="absolute top-0 left-0 w-full flex items-center justify-between bg-white dark:bg-black3 border border-dashed border-gray2 rounded-xl p-8">
                            <div className="flex items-center">
                              <img src={FOLDER} alt="icon-file" />
                              <span className="dark:text-gray2 ml-4 text-sm opacity-75 leading-tight">Drag your documents, photos, or videos <br/> here to start uploading</span>
                            </div>
                            <div className="relative dark:text-gray2 before:content:[''] before:absolute before:left-2.5 before:-top-6 before:h-5 before:border before:border-dashed before:border-gray2 after:content:[''] after:absolute after:left-2.5 after:-bottom-6 after:h-5 after:border after:border-dashed after:border-gray2">OR</div>
                            <div className="bg-primary text-white border border-primary rounded-full py-1.5 px-6 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all">
                              Browse files
                            </div>
                          </div>
                        </div>

                        {/* View Uploaded Media Files */}
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center">
                              <div className="dark:text-gray2 text-base font-medium">Files ready to upload</div>
                              <button type="button" className="mx-4">
                                <img src={ICON_GRID} alt="icon-grid" className="dark:invert" />
                              </button>
                              <button type="button">
                                <img src={ICON_LIST} alt="icon-list" className="dark:invert" />
                              </button>
                              <div className="relative overflow-hidden ml-5">
                                <input
                                  type="search"
                                  className="md:w-[250px] xl:w-[300px] bg-white dark:bg-black3 bg-opacity-60 dark:text-gray2 text-sm px-4 py-2.5 border border-gray2 rounded-full  focus:border-secondary focus:outline-none"
                                  name="user_search"
                                  id="user_search"
                                  placeholder="Search for media and documents..."
                                />
                                <button className="absolute top-3.5 right-4 block m-auto">
                                  <img src={ICON_SEARCH} alt="icon-search" className="w-4 h-4 block m-auto dark:invert" />
                                </button>
                              </div>
                            </div>

                            <button type="button" className="flex items-center ml-auto text-sm dark:text-gray2">
                              <span>Clear all</span>
                              <img src={ICON_DELETE} alt="icon-delete" className="w-[15px] h-[15px] ml-1 dark:invert" />
                            </button>
                          </div>

                          <div className="h-[250px] md:overflow-scroll 2xl:overflow-hidden md:scrollbar-thin 2xl:hover:scrollbar-thin scrollbar-thumb-gray4 scrollbar-track-gray2 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                            <div className="flex flex-row flex-wrap mt-1">
                              {medias.map((media, index) => {
                                const { img } = media;
                                return (
                                  <div key={index}  className="relative md:w-[90px] xl:w-[120px] md:h-[90px] xl:h-[120px] m-4 bg-white  rounded-xl">
                                    <div className="md:w-[90px] xl:w-[120px] md:h-[90px] xl:h-[120px] border border-gray2 rounded-xl overflow-hidden">
                                      <img src={img} alt="" />
                                    </div>
                                    <button className="flex flex-col items-center justify-center absolute -top-1 -right-1 w-6 h-6 bg-black2 text-white rounded-sm transition-all hover:bg-danger hover:transition-all">
                                      <img src={ICON_DELETE} alt="icon-delete" className="w-4 h-4 invert" />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex items-center justify-end mt-8">
                            <button type='button' className='bg-transparent text-black2 dark:text-gray2 text-sm font-medium border border-black2 dark:border-gray2 px-8 py-2 rounded-full shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all'>
                              Cancel
                            </button>
                            <button type='button' className='bg-secondary text-white text-sm font-medium border border-secondary px-8 py-2 ml-5 rounded-full shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all'>
                              Upload
                            </button>
                          </div>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </Dialog>
          </Transition>
          {/* Upload Images Popup : End */}

        </section>
      </Layout>
    </>
  );
}
export default MediaCodes;