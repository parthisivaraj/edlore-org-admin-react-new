import React, { useState, useEffect, Fragment } from "react";
import { Tab, Transition, Dialog } from "@headlessui/react";
import ProcedureDetails from "../procedures/procedureDetails";
import DeleteModal from "../common/deleteModal";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import CreateProcedure from "../procedures/createProcedure";
import {
  changeModelProceduresSearch,
  deleteProcedure,
  getModelProcedure,
  setProcedureModal,
} from "../../redux/reduxes/procedure/procedureAction";
import PaginatedItems from "../../components/common/pagination";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import ListDataNotFound from "../common/listDataNotFound";
import PermissionsMessage from "../common/permissionsMessage";
// import AssetNotesListModal from '../assetNotes/assetNotesListModal';

const ProcedurePanel = ({ id, activeMainTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const modelProceduresLoading = useSelector(
    (state) => state.procedure.modelProceduresLoading,
  );
  const modelProcedures = useSelector(
    (state) => state.procedure.modelProcedures,
  );
  const pagination = useSelector(
    (state) => state.procedure.modelProceduresPagination,
  );
  const addedProcedure = useSelector(
    (state) => state.procedure.createdNewProcedure,
  );
  const addedProcedureDetails = useSelector(
    (state) => state.procedure.createdProcedure,
  );
  const sort = useSelector((state) => state.sort);
  const sortByModelProcedureName = useSelector(
    (state) => state.sort.sortByModelProcedureName,
  );
  const sortByModelProcedureCreatedDate = useSelector(
    (state) => state.sort.sortByModelProcedureCreatedDate,
  );
  const procedureModal = useSelector((state) => state.procedure.procedureModal);
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.procedure.searchModelProceduresQuery,
  );
  const deleteProcedureLoading = useSelector(
    (state) => state.procedure.deleteProcedureLoading,
  );

  // Modals and States
  const [showProcedureDetailsModal, setShowProcedureDetailsModal] =
    useState(false);
  const [showProcedureDeleteModal, setShowProcedureDeleteModal] =
    useState(false);
  const [deletingId, setDeletingId] = useState(false);
  const [deleteProcedureTitle, setDeleteProcedureTitle] = useState("");
  const [editingProcedure, setEditingProcedure] = useState(null);
  const [update, setUpdate] = useState(false);
  const [delayLoading, setDelayLoading] = useState(false);

  function setAddProcedureModal() {
    const data = {
      show: true,
      edit: false,
      id: "",
      name: "",
    };
    dispatch(setProcedureModal(data));
  }

  // Dispatch Sorting Data
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: id,
      sort:
        sortByModelProcedureName != 0
          ? sortByModelProcedureName
          : sortByModelProcedureCreatedDate != 0
          ? sortByModelProcedureCreatedDate
          : 0,
      sorting:
        sortByModelProcedureName != 0
          ? "name"
          : sortByModelProcedureCreatedDate != 0
          ? "created_at"
          : "",
      paginate: true,
    };
    if (activeMainTab == 1) {
      delayLoading && dispatch(getModelProcedure(data));
    }
  }, [sort]);

  // Dispatch Search, Page, Sort and Filters
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: id,
      sort:
        sortByModelProcedureName != 0
          ? sortByModelProcedureName
          : sortByModelProcedureCreatedDate != 0
          ? sortByModelProcedureCreatedDate
          : 0,
      sorting:
        sortByModelProcedureName != 0
          ? "name"
          : sortByModelProcedureCreatedDate != 0
          ? "created_at"
          : "",
      paginate: true,
    };
    if (activeMainTab == 1) {
      dispatch(getModelProcedure(data));
    }
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Open Procedure Modal
  const openProcedure = (selected) => {
    setShowProcedureDetailsModal(true);
    setEditingProcedure(selected);
    setUpdate(false);
  };

  useEffect(() => {
    if (addedProcedure && addedProcedureDetails) {
      openProcedure(addedProcedureDetails.id);
    }
  }, [addedProcedure]);

  // Delete Procedure
  const deleteThisProcedure = (x, title) => {
    setDeletingId(x);
    setDeleteProcedureTitle(title);
    setShowProcedureDeleteModal(true);
  };

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: id,
      sort:
        sortByModelProcedureName != 0
          ? sortByModelProcedureName
          : sortByModelProcedureCreatedDate != 0
          ? sortByModelProcedureCreatedDate
          : 0,
      sorting:
        sortByModelProcedureName != 0
          ? "name"
          : sortByModelProcedureCreatedDate != 0
          ? "created_at"
          : "",
      paginate: true,
    };
    if (activeMainTab == 1) {
      dispatch(getModelProcedure(data));
    }
  }, [searchQuery]);

  // Search Model Procedures
  const handleSearchChange = (searchData) => {
    dispatch(changeModelProceduresSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      page: e.selected,
      search: searchQuery,
      limit: 10,
      model_id: id,
      sort:
        sortByModelProcedureName != 0
          ? sortByModelProcedureName
          : sortByModelProcedureCreatedDate != 0
          ? sortByModelProcedureCreatedDate
          : 0,
      sorting:
        sortByModelProcedureName != 0
          ? "name"
          : sortByModelProcedureCreatedDate != 0
          ? "created_at"
          : "",
      paginate: true,
    };
    if (activeMainTab == 1) {
      dispatch(getModelProcedure(data));
    }
  };

  // Backdrop that stops from Closing the Modal
  const handleModalBackdrop = () => {};

  // All Procedures Sort under Model
  const handleChangeSort = (v, n) => {
    const getSort = (x) => {
      let sort = 0;
      if (x == 0 || x == 1) {
        sort = v + 1;
      } else {
        sort = 0;
      }
      return sort;
    };
    const data = {
      name: n,
      sort: getSort(v),
    };
    dispatch(updateSort(data));
  };

  // Asset Notes List
  //  const [viewAssetNotesListModal, setViewAssetNotesListModal] = useState(false);
  //  const [assetNotiableTypeId, setAssetNotiableTypeId] = useState(null);

  //  const assetNotesListEvent = (stat, procedure_id) => {
  //    setViewAssetNotesListModal(stat);
  //    setAssetNotiableTypeId(procedure_id);
  //  }

  return (
    <>
      <Tab.Panel>
        <div className="absolute right-0 -top-[75px]">
          {(permissions.includes("all_procedure") ||
            (permissions.includes("write_procedure") &&
              permissions.includes("read_procedure")) ||
            permissions.includes("Admin")) && (
            <button
              type="button"
              onClick={() => setAddProcedureModal(true)}
              className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0"
            >
              Create New Procedure +
            </button>
          )}
        </div>

        <div className="w-full bg-white dark:bg-darkBg pb-8 border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md">
          {!(
            permissions.includes("all_procedure") ||
            permissions.includes("read_procedure") ||
            permissions.includes("Admin")
          ) ? (
            <PermissionsMessage
              additionalClassName="h-[70vh] py-10"
              title="All Procedures"
              message="read procedure"
            />
          ) : (
            <>
              {/* Search and Filters : Start */}
              <div className="flex md:flex-col xl:flex-row items-center mt-8 mb-5 px-6 xl:px-8">
                <div className="flex md:flex-col-reverse xl:flex-row xl:items-center w-full xl:w-auto">
                  {/* <h5 className="text-xl text-black2 dark:text-gray2 leading-none font-semibold mr-8">List of Procedures</h5> */}
                  <div className="w-full xl:w-[400px] relative md:mb-4 xl:mb-0 overflow-hidden">
                    <input
                      type="search"
                      className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-10 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                      name="user_search"
                      id="user_search"
                      placeholder="Search for Procedures..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <div className="absolute top-3.5 right-4 block m-auto focus-visible:outline-none">
                      <img
                        src="/assets/icons/icon-search.svg"
                        alt="icon-search"
                        className="w-4 h-4 block m-auto dark:invert"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Search and Filters : End */}

              {/* Procedures Tabel List : Start */}
              <div className="w-full min-h-[500px] h-full 2xl:h-[540px] mb-8 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <table className="table-auto text-left relative min-w-full max-h-full">
                  <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                    <tr>
                      <th
                        onClick={() =>
                          handleChangeSort(
                            sortByModelProcedureName,
                            "sortByModelProcedureName",
                          )
                        }
                        scope="col"
                        width="40%"
                        className="px-4 xl:px-8 py-4 whitespace-nowrap"
                      >
                        <div className="flex items-center ">
                          <span
                            className={
                              sortByModelProcedureName == 1 ||
                              sortByModelProcedureName == 2
                                ? "text-primary"
                                : ""
                            }
                          >
                            Title
                          </span>
                          {sortByModelProcedureName == 1 ? (
                            <img
                              src="/assets/icons/icon-sort-asc.svg"
                              alt="icon-sort-asc"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          ) : sortByModelProcedureName == 2 ? (
                            <img
                              src="/assets/icons/icon-sort-desc.svg"
                              alt="icon-sort-desc"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          ) : (
                            <img
                              src="/assets/icons/icon-sort.svg"
                              alt="icon-sort"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          )}
                        </div>
                      </th>
                      <th
                        scope="col"
                        width="30%"
                        className="px-4 xl:px-8 py-4 whitespace-nowrap"
                      >
                        Procedure
                      </th>
                      <th
                        onClick={() =>
                          handleChangeSort(
                            sortByModelProcedureCreatedDate,
                            "sortByModelProcedureCreatedDate",
                          )
                        }
                        scope="col"
                        width="15%"
                        className="px-4 xl:px-8 py-4 whitespace-nowrap"
                      >
                        <div className="flex items-center ">
                          <span
                            className={
                              sortByModelProcedureCreatedDate == 1 ||
                              sortByModelProcedureCreatedDate == 2
                                ? "text-primary"
                                : ""
                            }
                          >
                            Created On
                          </span>
                          {sortByModelProcedureCreatedDate == 1 ? (
                            <img
                              src="/assets/icons/icon-sort-asc.svg"
                              alt="icon-sort-asc"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          ) : sortByModelProcedureCreatedDate == 2 ? (
                            <img
                              src="/assets/icons/icon-sort-desc.svg"
                              alt="icon-sort-desc"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          ) : (
                            <img
                              src="/assets/icons/icon-sort.svg"
                              alt="icon-sort"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          )}
                        </div>
                      </th>
                      <th
                        scope="col"
                        width="15%"
                        className="px-4 xl:px-8 py-4 whitespace-nowrap"
                      >
                        {(permissions.includes("all_procedure") ||
                          permissions.includes("read_procedure") ||
                          permissions.includes("write_procedure") ||
                          permissions.includes("delete_procedure") ||
                          permissions.includes("Admin")) && (
                          <span>Actions</span>
                        )}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {modelProceduresLoading ? (
                      <tr>
                        <td colSpan="4">
                          <Skeleton
                            count={10}
                            height={50}
                            baseColor="#f5f5f5"
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
                        {modelProcedures && modelProcedures.length > 0 ? (
                          <>
                            {modelProcedures.map((procedure, index) => {
                              const {
                                title,
                                steps_count,
                                media_count,
                                id,
                                created_at,
                              } = procedure;
                              return (
                                <tr
                                  valign="top"
                                  key={id}
                                  onClick={() => openProcedure(id)}
                                  className="border-b border-gray2 dark:border-black3 
                                  odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all 
                                  duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 
                                  hover:transition-all hover:duration-300 cursor-pointer"
                                >
                                  <td
                                    width="40%"
                                    className="px-4 xl:px-8 py-4 xl:text-sm 2xl:text-base capitalize font-medium"
                                  >
                                    {title}
                                  </td>
                                  <td
                                    width="30%"
                                    className="px-4 xl:px-8 py-4 xl:text-sm 2xl:text-base opacity-75 dark:opacity-90 whitespace-nowrap"
                                  >
                                    <span className="xl:text-sm 2xl:text-base font-medium mr-10">
                                      <span className="text-base font-normal">
                                        {steps_count}
                                      </span>{" "}
                                      Step(s){" "}
                                    </span>{" "}
                                    <br className="block xl:hidden" />
                                    <span className="xl:text-sm 2xl:text-base text-sm  font-medium">
                                      <span className="text-base font-normal">
                                        {media_count}
                                      </span>{" "}
                                      Media and Documents{" "}
                                    </span>
                                  </td>
                                  <td
                                    width="15%"
                                    className="px-4 xl:px-8 py-4 xl:text-sm 2xl:text-base opacity-75 dark:opacity-90 whitespace-nowrap"
                                  >
                                    <span>{created_at}</span>
                                  </td>
                                  <td
                                    width="15%"
                                    className="px-4 xl:px-8 py-4 whitespace-nowrap"
                                  >
                                    <div className="flex items-center mr-6 xl:mr-0">
                                      {(permissions.includes("all_procedure") ||
                                        permissions.includes(
                                          "read_procedure",
                                        ) ||
                                        permissions.includes("Admin")) && (
                                        <button
                                          type="button"
                                          onClick={() => openProcedure(id)}
                                          className="group flex items-center text-primary opacity-75 text-sm font-medium underline whitespace-nowrap transition-all duration-300"
                                        >
                                          <span>View Procedure</span>
                                        </button>
                                      )}
                                      {(permissions.includes("all_procedure") ||
                                        permissions.includes(
                                          "delete_procedure",
                                        ) ||
                                        permissions.includes("Admin")) && (
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            deleteThisProcedure(id, title);
                                          }}
                                          className="focus:outline-0"
                                          title="Delete"
                                        >
                                          <img
                                            src="/assets/icons/icon-delete.svg"
                                            alt="icon-delete"
                                            className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-12 xl:ml-8 opacity-80 hover:opacity-100 dark:invert transition-all duration-300 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                          />
                                        </button>
                                      )}
                                      {/* {(permissions.includes("all_procedure") || permissions.includes("write_procedure") || permissions.includes("Admin")) &&
                                        <button type="button" onClick={() => assetNotesListEvent(true, id)} className="focus:outline-0">
                                          <img src="/assets/icons/icon-note.svg" alt="icon-note" className="min-w-[20px] min-h-[20px] w-[20px] h-[20px] ml-4 opacity-80 dark:invert transition-all duration-300 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all" />
                                        </button>
                                      } */}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        ) : (
                          <ListDataNotFound
                            colSpan={4}
                            searchQuery={searchQuery}
                            listLength={
                              modelProcedures && modelProcedures.length
                            }
                            filters={[]}
                          />
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination && (
                <div className="flex justify-end mt-8 px-4">
                  {modelProceduresLoading ? (
                    <Skeleton
                      count={1}
                      width={200}
                      height={40}
                      baseColor="#f5f5f5"
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
                      totalEntries={pagination && pagination.total_entries}
                      handlePageClick={handlePageClick}
                      pageCount={
                        pagination &&
                        Math.ceil(
                          pagination.total_entries / pagination.per_page,
                        )
                      }
                      current_page={pagination.current_page}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
        {/* Create New Procedure Popup / Procedures Tab : Start */}
        {procedureModal && (
          <CreateProcedure
            showProcedureModal={procedureModal}
            // setShowProcedureModal={setAddProcedureModal}
            model_id={id}
            update={update}
          />
        )}
        {/* Create New Procedure Popup / Procedures Tab : End */}

        {/* Edit Procedure Popup / Procedures Tab : Start */}
        {showProcedureDetailsModal && activeMainTab == 1 && (
          <Transition appear show={showProcedureDetailsModal} as={Fragment}>
            <Dialog
              as="div"
              open={showProcedureDetailsModal}
              onClose={() => handleModalBackdrop()}
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
                <Dialog.Panel className="w-[98%] md:w-[95%] xl:w-[80%] 2xl:w-[85%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl shadow-lg">
                  <ProcedureDetails
                    tabName="Step 1"
                    addNewTab="Add Step"
                    actionName="Add"
                    procedure_id={editingProcedure}
                    model_id={id}
                    setShowProcedureModal={setShowProcedureDetailsModal}
                    callingFrom="device-model"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </Dialog>
          </Transition>
        )}

        {/* Edit Procedure Popup / Procedures Tab : End */}
        {showProcedureDeleteModal && (
          <DeleteModal
            head="Remove Procedure"
            body={[
              "Are you sure you want to remove",
              <strong className="capitalize break-all">
                {" "}
                "{deleteProcedureTitle}"{" "}
              </strong>,
              "Procedure from the list?",
            ]}
            deleteAction={deleteProcedure}
            modalAction={setShowProcedureDeleteModal}
            modalValue={showProcedureDeleteModal}
            parentmodel={false}
            id={deletingId}
            model_id={id}
            deleteLoading={deleteProcedureLoading}
          />
        )}

        {/* View Asset Notes List Modal */}
        {/* {viewAssetNotesListModal &&
          <AssetNotesListModal
            activeMainTab={1}
            model_id={id}
            viewAssetNotesListModal={viewAssetNotesListModal}
            setViewAssetNotesListModal={setViewAssetNotesListModal}
            assetNotiableType="Procedure"
            assetNotiableTypeId={assetNotiableTypeId}
          />
        } */}
      </Tab.Panel>
    </>
  );
};

export default ProcedurePanel;
