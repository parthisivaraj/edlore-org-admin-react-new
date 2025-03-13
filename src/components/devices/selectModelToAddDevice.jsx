import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels } from "../../redux/reduxes/theModels/modelAction";
import AddNewDevice from "./addNewDevice";
import Skeleton from 'react-loading-skeleton';
import PaginatedItems from '../common/pagination';
import { updateSort } from '../../redux/reduxes/sort/sortAction';


const SelectModelToAddDevice = ({ showExistingModal, setShowExistingModal }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const models = useSelector(state => state.models.allModels);
  const allModelsLoading = useSelector(state => state.models.allModelsLoading);
  const pagination = useSelector(state => state.models.allModelsPagination);
  const sort = useSelector(state => state.sort);
  const sortByModelTitle = useSelector(state => state.sort.sortByModelTitle);
  const sortByModelId = useSelector(state => state.sort.sortByModelId);
  const sortByModelCreatedDate = useSelector(state => state.sort.sortByModelCreatedDate);

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Sort Data
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 20,
      sort: sortByModelTitle != 0 ? sortByModelTitle : sortByModelId != 0 ? sortByModelId : sortByModelCreatedDate != 0 ? sortByModelCreatedDate : 0,
      sorting: sortByModelTitle != 0 ? "title" : sortByModelId != 0 ? "model_id" : sortByModelCreatedDate != 0 ? "created_at" : "",
    }
    delayLoading && dispatch(getAllModels(data));
  }, [sort])

  // Dispatch All Data
  useEffect(() => {
    const data = {
      search: "",
      page: 0,
      limit: 20,
      sort: sortByModelTitle != 0 ? sortByModelTitle : sortByModelId != 0 ? sortByModelId : sortByModelCreatedDate != 0 ? sortByModelCreatedDate : 0,
      sorting: sortByModelTitle != 0 ? "title" : sortByModelId != 0 ? "model_id" : sortByModelCreatedDate != 0 ? "created_at" : "",
    }
    dispatch(getAllModels(data));
    setTimeout(function () {
      setDelayLoading(true)
    }, 1000)
  }, [])

  //  Modal's State
  const [selectedModelDetails, setSelectedModelDetails] = useState({});
  const [addDeviceModal, showAddDeviceModal] = useState(false);

  // Add Device to Model
  const thisaddDeviceToThisModel = (model) => {
    setSelectedModelDetails(model);
    showAddDeviceModal(true);
  }

  // Search Models
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (searchData) => {
    setSearchQuery(searchData);
    const data = {
      search: searchData,
      page: 0,
      limit: 20,
      sort: sortByModelTitle != 0 ? sortByModelTitle : sortByModelId != 0 ? sortByModelId : sortByModelCreatedDate != 0 ? sortByModelCreatedDate : 0,
      sorting: sortByModelTitle != 0 ? "title" : sortByModelId != 0 ? "model_id" : sortByModelCreatedDate != 0 ? "created_at" : "",
    }
    dispatch(getAllModels(data));
  }

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      page: e.selected,
      search: "",
      limit: 20,
      sort: sortByModelTitle != 0 ? sortByModelTitle : sortByModelId != 0 ? sortByModelId : sortByModelCreatedDate != 0 ? sortByModelCreatedDate : 0,
      sorting: sortByModelTitle != 0 ? "title" : sortByModelId != 0 ? "model_id" : sortByModelCreatedDate != 0 ? "created_at" : "",
    }
    dispatch(getAllModels(data));
  }

  // Backdrop that stops Modal from Closing
  const handleBackdropModal = () => { }

  // All Models Sort
  const handleChangeSort = (v, n) => {
    const getSort = (x) => {
      let sort = 0;
      if (x == 0 || x == 1) {
        sort = v + 1
      } else {
        sort = 0;
      }
      return sort;
    }
    const data = {
      name: n,
      sort: getSort(v)
    };
    dispatch(updateSort(data))
  }


  return (
    <>
      <Transition appear show={showExistingModal} as={Fragment}>
        <Dialog as="div" open={showExistingModal} onClose={() => handleBackdropModal(false)} className="fixed z-50 inset-0 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[96%] xl:w-[70%] 2xl:w-[50%] h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl text-center py-8 px-8 xl:px-12 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold">Add New Device</Dialog.Title>
              <Dialog.Description className="text-base 2xl:text-xl opacity-50 mb-8">Choose an existing model to add in your device</Dialog.Description>

              {/* Search Bar : Start */}
              <div className="relative mb-10 overflow-hidden">
                <input
                  type="search"
                  className="w-full bg-white dark:bg-darkBg px-6 py-2.5 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                  name="search_models"
                  id="search_models"
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search for models..."
                />
                <div className="absolute top-4 right-5 block m-auto focus-visible:outline-none">
                  <img src="../assets/icons/icon-search.svg" alt="icon-search" className="w-4 h-4 block m-auto" />
                </div>
              </div>

              {/* Existing Model Table : Start */}
              <div className="w-full h-[280px] 2xl:h-[350px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <table className="table-auto text-left relative min-w-full max-h-full">
                  <thead className="sticky top-0 z-10 w-full bg-gray2 dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                    <tr>
                      <th onClick={() => handleChangeSort(sortByModelTitle, "sortByModelTitle")} scope="col" width="25%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={sortByModelTitle == 1 || sortByModelTitle == 2 ? "text-primary" : ""}>Model</span>
                          {sortByModelTitle == 1 ?
                            <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px]" />
                            : sortByModelTitle == 2 ?
                              <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px]" />
                              :
                              <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                          }
                        </div>
                      </th>
                      <th onClick={() => handleChangeSort(sortByModelId, "sortByModelId")} scope="col" width="20%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={sortByModelId == 1 || sortByModelId == 2 ? "text-primary" : ""}>Model ID</span>
                          {sortByModelId == 1 ?
                            <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px]" />
                            : sortByModelId == 2 ?
                              <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px]" />
                              :
                              <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                          }
                        </div>
                      </th>
                      <th scope="col" width="15%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                        Devices
                      </th>
                      <th onClick={() => handleChangeSort(sortByModelCreatedDate, "sortByModelCreatedDate")} scope="col" width="20%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={sortByModelCreatedDate == 1 || sortByModelCreatedDate == 2 ? "text-primary" : ""}>Created On</span>
                          {sortByModelCreatedDate == 1 ?
                            <img src="../assets/icons/icon-sort-asc.svg" alt="icon-sort-asc" className="w-[15px] h-[15px] ml-[2px]" />
                            : sortByModelCreatedDate == 2 ?
                              <img src="../assets/icons/icon-sort-desc.svg" alt="icon-sort-desc" className="w-[15px] h-[15px] ml-[2px]" />
                              :
                              <img src="../assets/icons/icon-sort.svg" alt="icon-sort" className="w-[15px] h-[15px] ml-[2px] dark:invert" />
                          }
                        </div>
                      </th>
                      <th scope="col" width="20%" className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {allModelsLoading ?
                      <tr>
                        <td colSpan="5">
                          <Skeleton
                            count={10}
                            height={50}
                            baseColor="#fafafa"
                            highlightColor='#e1e1e1'
                            borderRadius="0"
                            enableAnimation="true"
                            duration={2.5}
                            inline={true}
                            className="dark:bg-darkMainBg"
                          />
                        </td>
                      </tr>
                      :
                      <>
                        {models && models.length > 0 ?
                          <>
                            {models.map((model, index) => {
                              const { id, title, linked_devices, model_id, created_at } = model;
                              return (
                                <tr valign="top" className="border-b border-gray2 dark:border-opacity-10 odd:bg-gray2 odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300" key={id}>
                                  <td width="25%" className="px-4 xl:px-8 py-4 first-letter:capitalize" title={title}>
                                    <div className='text-sm font-medium w-[200px] text-ellipsis whitespace-nowrap overflow-hidden' title={title}>{title}</div>
                                  </td>
                                  <td width="20%" className="px-4 xl:px-8 py-4  text-sm">{model_id}</td>
                                  <td width="15%" className="px-4 xl:px-8 py-4 text-sm">{linked_devices}</td>
                                  <td width="20%" className="px-4 xl:px-8 py-4 text-sm whitespace-nowrap">{created_at}</td>
                                  <td width="20%" className="px-4 xl:px-8 py-4 whitespace-nowrap">
                                    <button type="button" onClick={() => thisaddDeviceToThisModel(model)} className="group flex items-center w-[100px] text-primary text-opacity-75 text-sm font-medium transition-all duration-300 hover:text-opacity-100 hover:transition-all hover:duration-300 focus:outline-0">
                                      <span>Add to This</span>
                                      <span className="ml-1">
                                        <img src="../assets/icons/icon-arrow-right-blue.svg" alt="icon-arrow" className='w-4 h-4 transition-all duration-300 group-hover:translate-x-[8px] group-hover:transition-all group-hover:duration-300' />
                                      </span>
                                    </button>
                                  </td>
                                </tr>
                              )
                            })}
                          </>
                          : searchQuery !== "" && models && models.length <= 0 ?
                            <tr>
                              <td colSpan="5" align="center" className="text-danger py-20">No Search Results Found</td>
                            </tr>
                            :
                            <tr>
                              <td colSpan="5" align="center" className="text-danger py-20">No Existing Models Found</td>
                            </tr>
                        }
                      </>
                    }

                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end mt-8 px-4">
                {allModelsLoading ?
                  <Skeleton
                    count={1}
                    width={200}
                    height={40}
                    baseColor="#fafafa"
                    highlightColor='#e1e1e1'
                    borderRadius="30"
                    enableAnimation="true"
                    duration={2.5}
                    inline={true}
                    className=" dark:bg-darkMainBg"
                  />
                  :
                  <PaginatedItems
                    itemsPerPage={pagination.per_page}
                    handlePageClick={handlePageClick}
                    pageCount={pagination && Math.ceil(pagination.total_entries / pagination.per_page)}
                    current_page={pagination && pagination.current_page}
                    totalEntries={pagination && pagination.total_entries}
                  />
                }
              </div>

              <div className="text-right mt-8 xl:mt-12">
                <button type="button" onClick={() => setShowExistingModal(false)} className="bg-gray text-black2 text-sm 2xl:text-base font-medium border border-black2 rounded-full px-8 py-2  ml-4 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-darkBg dark:hover:border-gray2 hover:text-white hover:transition-all hover:duration-300 focus:outline-0">
                  Cancel
                </button>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>


      {/* Add a New Device Model : Start */}
      {selectedModelDetails &&
        <AddNewDevice
          model_id={selectedModelDetails.id}
          showModal={addDeviceModal}
          setShowModal={showAddDeviceModal}
          model_name={selectedModelDetails.title}
        />
      }

    </>
  );
}

export default SelectModelToAddDevice;