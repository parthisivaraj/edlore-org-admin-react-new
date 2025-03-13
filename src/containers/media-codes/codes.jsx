import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from '../../layout';
import { Tab, Menu, Transition, Dialog } from "@headlessui/react";

// Images and Icons
import ICON_HOME from '..//assets/icons/icon-home.svg';
import ICON_ARROW_RIGHT from '..//assets/icons/icon-arrow-right.svg';
import ICON_SEARCH from '..//assets/icons/icon-search.svg';
import ICON_FILTER from '..//assets/icons/icon-filter.svg';
import ICON_DELETE from '..//assets/icons/icon-delete.svg';
import ICON_EDIT from '..//assets/icons/icon-edit.svg';


// Tab List
const tabs = [
  { title: 'Error Code' },
  { title: 'Alarm Code' },
  { title: 'mCode' },
  { title: 'Safety Measure' },
  { title: 'Troubleshoot' }
]


// Table List
const records = [
  { title: 'Pump fail', code: '5c2a582', desc: 'Description for error code' },
  { title: 'Pump fail 2', code: '5c27a58', desc: 'Description for error code' },
  { title: 'Pump fail 3', code: '5c2a458', desc: 'Description for error code' },
  { title: 'Pump fail 4', code: '5c52a58', desc: 'Description for error code' },
  { title: 'Pump fail 5', code: '75c2a58', desc: 'Description for error code' },
  { title: 'Pump fail 5', code: '75c2a58', desc: 'Description for error code' },
  { title: 'Pump fail 5', code: '75c2a58', desc: 'Description for error code' },
  { title: 'Pump fail 5', code: '75c2a58', desc: 'Description for error code' },
  { title: 'Pump fail 6', code: '54c2a58', desc: 'Description for error code' },
]


const Codes = () => {

  // Add Error Code Modal
  const [showErrorCodeModal, setShowErrorCodeModal] = useState(false);


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Codes</title>
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
                <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2 font-bold">Codes</h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                <button type="button" onClick={() => setShowErrorCodeModal(true)}  className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-6 py-2 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all">
                  Add new code +
                </button>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}


          {/* Code Tabs : Start */}
          <div>
            <Tab.Group as="div" vertical className="flex md:flex-col xl:flex-row bg-white dark:bg-black3 w-full border border-gray2 dark:border-black2 rounded-3xl">
              <Tab.List className="flex md:flex-row xl:flex-col items-start md:w-full xl:w-[20%] md:h-full xl:h-[600px] bg-gray4 dark:bg-black2 dark:bg-opacity-50 xl:rounded-3xl rounded-r-none xl:p-4 md:overflow-x-scroll xl:overflow-x-hidden">
                {tabs.map((tab, index) => {
                  const { title } = tab;
                  return (
                    <Tab
                        key={index}
                        className={({ selected }) =>
                        selected ?
                          'w-full xl:flex items-center bg-white dark:bg-black3 text-black2 dark:text-gray2 text-base font-medium md:text-center xl:text-left px-6 py-4 md:rounded-t-2xl xl:rounded-2xl whitespace-nowrap'
                          :
                          'w-full xl:flex items-center md:text-center xl:text-left text-black2 dark:text-gray2 opacity-60 text-base font-medium px-6 py-4 whitespace-nowrap transition-all hover:opacity-100'
                        }
                      >
                        <span>{title}</span>
                        <img src={ICON_ARROW_RIGHT} alt="icon-arrow-right" className="md:hidden xl:block ml-auto" />
                    </Tab>
                  )
                })}
              </Tab.List>

              <Tab.Panels className="md:w-full xl:w-[80%] h-[600px] py-4 overflow-hidden">
                {/* Error Code Tab : Start */}
                <Tab.Panel>
                  <div className="flex items-center justify-between mb-6 px-4">
                    <div className="md:w-[300px] xl:w-[400px] relative overflow-hidden">
                      <input
                        type="search"
                        className="w-full bg-gray4 dark:bg-black3 bg-opacity-60 dark:text-gray2 text-sm px-4 py-2 border border-gray2 rounded-full  focus:border-secondary focus:outline-none"
                        name="user_search"
                        id="user_search"
                        placeholder="Search for error codes..."
                      />
                      <button className="block absolute top-3 right-3 m-auto">
                        <img src={ICON_SEARCH} alt="icon-search" className="w-4 h-4 block m-auto dark:invert" />
                      </button>
                    </div>

                    {/* Filters : Start */}
                    <Menu as="div" className="inline-block relative text-left ml-3">
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

                  <div className="w-full h-[500px] dark:text-gray2 md:overflow-scroll 2xl:overflow-hidden md:scrollbar-thin 2xl:hover:scrollbar-thin scrollbar-thumb-gray4 scrollbar-track-gray2 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                    <table className="table-auto text-left w-full">
                      <thead className="border-b border-gray2 dark:border-opacity-60">
                        <tr>
                          <th scope="col" className="px-8 py-4 text-sm uppercase whitespace-nowrap">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                id=""
                                name=""
                                className="w-4 h-4"
                              />
                              <span className="ml-2">Title</span>
                            </label>
                          </th>
                          <th scope="col" className="px-8 py-4 text-sm uppercase whitespace-nowrap">Error Code</th>
                          <th scope="col" className="px-8 py-4 text-sm uppercase whitespace-nowrap">Description</th>
                          <th scope="col" className="px-8 py-4 text-sm uppercase whitespace-nowrap">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {records.map((record, index) => {
                          const { title, code, desc } = record;
                          return (
                            <tr className="border-b border-gray2 dark:border-black3 odd:bg-gray dark:odd:bg-opacity-10" key={index}>
                              <td className="px-8 py-4 text-sm">
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id=""
                                    name=""
                                    className="w-4 h-4"
                                  />
                                  <span className="ml-2 whitespace-nowrap">{title}</span>
                                </label>
                              </td>
                              <td className="px-8 py-4 text-sm whitespace-nowrap">{code}</td>
                              <td className="px-8 py-4 text-sm">{desc}</td>
                              <td className="flex items-center px-8 py-4 text-sm">
                                <button type="button">
                                  <img src={ICON_DELETE} alt="icon-delete" className="w-4 h-4 mr-3 dark:invert" />
                                </button>
                                <button type="button">
                                  <img src={ICON_EDIT} alt="icon-edit" className="w-4 h-4 dark:invert" />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </Tab.Panel>
                {/* Error Code Tab : End */}
              </Tab.Panels>
            </Tab.Group>
          </div>
          {/* Code Tabs : End */}


          {/* Add Error Code Popup  : Start */}
          <Transition appear show={showErrorCodeModal} as={Fragment}>
            <Dialog as="div" open={showErrorCodeModal} onClose={() => setShowErrorCodeModal(false)} className="fixed inset-0 z-50 py-48 flex items-center justify-center bg-black2 bg-opacity-40">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="md:w-[80%] xl:w-[50%]  h-auto bg-gray4 dark:bg-black3 rounded-3xl p-8 shadow-lg">
                  <Dialog.Title className="dark:text-gray2 text-3xl font-bold text-center mb-10">Error Code</Dialog.Title>
                  <div>
                    <form>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-start-1">
                          <label for="add_error_title" className="text-sm font-medium dark:text-gray2">Title <span className="text-danger">*</span></label> <br />
                          <input
                            type="text"
                            id="add_error_title"
                            name="add_error_title"
                            placeholder="Title"
                            className="w-full text-base dark:bg-black3 dark:text-gray2 border border-gray2 rounded-md py-2 px-4 mt-1 focus:border-secondary focus:outline-none"
                          />
                        </div>
                        <div className="col-start-2">
                          <label for="add_error_code" className="text-sm font-medium dark:text-gray2">Error Code <span className="text-danger">*</span></label> <br />
                          <input
                            type="text"
                            id="add_error_code"
                            name="add_error_code"
                            placeholder="Title"
                            className="w-full text-base dark:bg-black3 dark:text-gray2 border border-gray2 rounded-md py-2 px-4 mt-1 focus:border-secondary focus:outline-none"
                          />
                        </div>
                        <div className="col-span-2">
                          <label for="add_error_description" className="text-sm font-medium dark:text-gray2">Description <span className="text-danger">*</span></label> <br />
                          <textarea
                            rows="3"
                            cols="50"
                            id="add_error_description"
                            name="add_error_description"
                            placeholder="Description..."
                            className="w-full text-base dark:bg-black3 dark:text-gray2 border border-gray2 rounded-md py-2 px-4 mt-1 focus:border-secondary focus:outline-none"
                          >
                          </textarea>
                        </div>
                      </div>

                      <div className="flex items-center justify-end mt-8">
                        <button type="button" className="text-sm text-black2 dark:text-gray2 font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all">
                          Cancel
                        </button>
                        <button type="button" className="text-sm bg-secondary text-white font-medium border border-secondary rounded-full px-6 py-2 ml-6 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all">
                          Add Code
                        </button>
                      </div>
                    </form>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </Dialog>
          </Transition>
          {/* Add Error Code Popup : End */}

        </section>
      </Layout>
    </>
  )
}
export default Codes;