import React, { useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import {
  getAllCloneSafetyMeasures,
  setSafetyMeasuresModal,
  setCloning,
} from "../../redux/reduxes/safetyMeasures/safetyMeasuresAction";
import PaginatedItems from "../common/pagination";
import CreateSafetyMeasure from "./createSafetyMeasure";

const CloneSafetyMeasures = ({
  cloneSafetyMeasuresModal,
  setCloneSafetyMeasuresModal,
  model_id,
}) => {
  const dispatch = useDispatch();

  // Fetch Data
  const safetyMeasuresLoading = useSelector(
    (state) => state.safety_measures.allCloneSafetyMeasuresLoading,
  );
  const measures = useSelector(
    (state) => state.safety_measures.cloneSafetyMeasuresList,
  );
  const pagination = useSelector(
    (state) => state.safety_measures.allCloneSafetyMeasuresPagination,
  );
  const safetyMeasuresModal = useSelector(
    (state) => state.safety_measures.safetyMeasuresModal,
  );

  // Dispatch to Safety Measures
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: "",
      page: 0,
      limit: 10,
    };
    dispatch(getAllCloneSafetyMeasures(data));
  }, []);

  // Search Bar
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (searchData) => {
    setSearchQuery(searchData);
    const data = {
      search: searchData,
      page: 0,
      limit: 10,
      model_id: model_id,
    };
    dispatch(getAllCloneSafetyMeasures(data));
  };

  // View/Update Safety Measure Details
  function setUpdateSafetyMeasureModal() {
    dispatch(setSafetyMeasuresModal(true));
  }
  const [updateSafetyMeasureId, setUpdateSafetyMeasureId] = useState(null);

  // Update Safety Measure
  const updateSafetyMeasureEvent = (stat, id) => {
    setUpdateSafetyMeasureModal(stat);
    setUpdateSafetyMeasureId(id);
    // setCloneSafetyMeasuresModal(false)
    // setClone(true);
    const data = {
      id: id,
      show: true,
    };
    dispatch(setCloning(data));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      page: e.selected,
      search: searchQuery,
      limit: 10,
      model_id: model_id,
    };
    dispatch(getAllCloneSafetyMeasures(data));
  };

  // Backdrop that stops closing Modal
  const handleModalBackdrop = () => {};

  return (
    <>
      <Transition appear show={cloneSafetyMeasuresModal} as={Fragment}>
        <Dialog
          as="div"
          open={cloneSafetyMeasuresModal}
          onClose={() => handleModalBackdrop(false)}
          className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60"
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
            <Dialog.Panel className="w-[96%] xl:w-[70%] 2xl:w-[50%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 py-8 rounded-2xl xl:py-12 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center mb-8 px-8">
                Clone from Existing
              </Dialog.Title>
              {/* Search Bar */}
              <div className="relative overflow-hidden mb-10 px-8">
                <input
                  type="search"
                  className="w-full bg-white dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 px-6 py-2.5 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                  name="safety_measure_search"
                  id="safety_measure_search"
                  placeholder="Search for existing Safety Measures..."
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <div className="absolute top-4 right-12 block m-auto">
                  <img
                    src="../assets/icons/icon-search.svg"
                    alt="icon-search"
                    className="w-4 h-4 block m-auto"
                  />
                </div>
              </div>

              {/* Existing Table List */}
              <div className="w-full h-[350px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <table className="table-auto text-left relative min-w-full max-h-full">
                  <thead className="sticky top-0 z-10 w-full bg-gray2 dark:bg-darkBg border-b border-gray2 dark:border-opacity-40">
                    <tr>
                      <th
                        scope="col"
                        width="25%"
                        className="px-4 py-4 text-sm uppercase whitespace-nowrap flex items-center"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        width="20%"
                        className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                      >
                        Linked Media
                      </th>
                      <th
                        scope="col"
                        width="20%"
                        className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                      >
                        Created On
                      </th>
                      <th
                        scope="col"
                        width="20%"
                        className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                      >
                        Last Updated
                      </th>
                      <th
                        scope="col"
                        width="15%"
                        className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {safetyMeasuresLoading ? (
                      <tr>
                        <td colSpan="5">
                          <Skeleton
                            count={10}
                            height={50}
                            baseColor="#fafafa"
                            highlightColor="#e1e1e1"
                            borderRadius="0"
                            enableAnimation="true"
                            duration={2.5}
                            inline={true}
                            className="dark:bg-darkMainBg"
                          />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {measures && measures.length > 0 ? (
                          <>
                            {measures.map((measure, index) => {
                              const {
                                id,
                                title,
                                media_count,
                                created_at,
                                last_updated,
                              } = measure;
                              return (
                                <tr
                                  valign="top"
                                  className="border-b border-gray2 dark:border-black3 dark:border-opacity-10 odd:bg-white dark:odd:bg-gray3 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                  key={id}
                                >
                                  <td
                                    width="25%"
                                    className="flex items-center px-4 py-4 text-base"
                                  >
                                    <span
                                      className="min-w-[150px] text-ellipsis whitespace-nowrap overflow-hidden font-semibold capitalize"
                                      title={title}
                                    >
                                      {title}
                                    </span>
                                  </td>
                                  <td
                                    width="20%"
                                    className="px-4 py-4 text-sm whitespace-nowrap"
                                  >
                                    {media_count}
                                  </td>
                                  <td
                                    width="20%"
                                    className="px-4 py-4 text-sm whitespace-nowrap"
                                  >
                                    {created_at}
                                  </td>
                                  <td
                                    width="20%"
                                    className="px-4 py-4 text-sm whitespace-nowrap"
                                  >
                                    {last_updated}
                                  </td>
                                  <td width="15%" className="px-4 py-4">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateSafetyMeasureEvent(true, id)
                                      }
                                      className="group flex items-center text-primary md:text-sm 2xl:text-base font-medium whitespace-nowrap opacity-75 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                                    >
                                      <span>Use this</span>
                                      <img
                                        src="../assets/icons/icon-arrow-right-blue.svg"
                                        alt="icon-arrow-right"
                                        className="w-4 h-4 ml-1 transition-all duration-300 group-hover:translate-x-[8px] group-hover:transition-all group-hover:duration-300"
                                      />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        ) : searchQuery !== "" &&
                          measures &&
                          measures.length <= 0 ? (
                          <tr>
                            <td
                              colSpan="5"
                              align="center"
                              className="text-danger p-8"
                            >
                              No Search Results Found
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td
                              colSpan="5"
                              align="center"
                              className="text-danger p-8"
                            >
                              No Existing Safety Measures Found
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end mt-8 px-8">
                {safetyMeasuresLoading ? (
                  <Skeleton
                    count={1}
                    width={200}
                    height={40}
                    baseColor="#fafafa"
                    highlightColor="#e1e1e1"
                    borderRadius="30"
                    enableAnimation="true"
                    duration={2.5}
                    inline={true}
                    className=" dark:bg-darkMainBg"
                  />
                ) : (
                  <PaginatedItems
                    itemsPerPage={pagination && pagination.per_page}
                    handlePageClick={handlePageClick}
                    pageCount={
                      pagination &&
                      Math.ceil(pagination.total_entries / pagination.per_page)
                    }
                    current_page={pagination && pagination.current_page}
                    totalEntries={pagination && pagination.total_entries}
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => setCloneSafetyMeasuresModal(false)}
                className="block ml-auto mr-8 mt-10 bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
              >
                Cancel
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Update Safety Measure Modal */}
      {safetyMeasuresModal && (
        <CreateSafetyMeasure
          addSafetyMeasuresModal={safetyMeasuresModal}
          // setAddSafetyMeasuresModal={setUpdateSafetyMeasureModal}
          model_id={model_id}
          id={updateSafetyMeasureId}
        />
      )}
    </>
  );
};
export default CloneSafetyMeasures;
