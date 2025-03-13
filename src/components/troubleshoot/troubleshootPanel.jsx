import React, { useState, useEffect, Fragment } from "react";
import { Tab, Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import CreateTroubleshoot from "./createTroubleshoot";
import {
  getAllTroubleshoot,
  deleteTroubleshoot,
  setTroubleshootModal,
  changeTroubleshootSearch,
} from "../../redux/reduxes/troubleshoot/troubleshootAction";
import TroubleshootDetails from "./troubleshootDetails";
import DeleteModal from "../common/deleteModal";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import PermissionsMessage from "../common/permissionsMessage";
import ListDataNotFound from "../common/listDataNotFound";
// import AssetNotesListModal from "../assetNotes/assetNotesListModal";

const TroubleshootPanel = ({ model_id, activeSubTab }) => {
  const dispatch = useDispatch();

  // Fetch the data
  const troubleshootLoading = useSelector(
    (state) => state.troubleshoot.allTroubleshootLoading,
  );
  const troubleshoots = useSelector(
    (state) => state.troubleshoot.troubleshootList,
  );
  const pagination = useSelector(
    (state) => state.troubleshoot.troubleshootPagination,
  );
  const createdNewTroubleshoot = useSelector(
    (state) => state.troubleshoot.createdNewTroubleshoot,
  );
  const createdTroubleshootDetails = useSelector(
    (state) => state.troubleshoot.createdTroubleshootDetails,
  );
  const sort = useSelector((state) => state.sort);
  const sortByTroubleshootTitle = useSelector(
    (state) => state.sort.sortByTroubleshootTitle,
  );
  const sortByTroubleshootCreatedDate = useSelector(
    (state) => state.sort.sortByTroubleshootCreatedDate,
  );
  const troubleshootModal = useSelector(
    (state) => state.troubleshoot.troubleshootModal,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.troubleshoot.searchTroubleshootQuery,
  );
  const deleteTroubleshootLoading = useSelector(
    (state) => state.troubleshoot.deleteTroubleshootLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Sorting Data
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      sort:
        sortByTroubleshootTitle != 0
          ? sortByTroubleshootTitle
          : sortByTroubleshootCreatedDate != 0
          ? sortByTroubleshootCreatedDate
          : 0,
      sorting:
        sortByTroubleshootTitle != 0
          ? "title"
          : sortByTroubleshootCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "troubleshoot") {
      delayLoading && dispatch(getAllTroubleshoot(data));
    }
  }, [sort]);

  // Dispatch to Troubleshoots
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      sort:
        sortByTroubleshootTitle != 0
          ? sortByTroubleshootTitle
          : sortByTroubleshootCreatedDate != 0
          ? sortByTroubleshootCreatedDate
          : 0,
      sorting:
        sortByTroubleshootTitle != 0
          ? "title"
          : sortByTroubleshootCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "troubleshoot") {
      dispatch(getAllTroubleshoot(data));
      setTimeout(function () {
        setDelayLoading(true);
      }, 1000);
    }
  }, []);

  // Create Troubleshoot Popup
  // const [addTroubleshootModal, setAddTroubleshootModal] = useState(false);
  function setAddTroubleshootModal() {
    const data = {
      show: true,
      edit: false,
      id: "",
      name: "",
    };
    dispatch(setTroubleshootModal(data));
  }

  // Troubleshoot Details Popup
  const [showTroubleshootDetailsModal, setShowTroubleshootDetailsModal] =
    useState(false);
  const [deleteTroubleshootModal, setDeleteTroubleshootModal] = useState(false);
  const [deleteTroubleshootId, setDeleteTroubleshootId] = useState(null);
  const [deleteTroubleshootTitle, setDeleteTroubleshootTitle] = useState("");
  const [detailsTroubleshootId, setDetailsTroubleshootId] = useState(null);
  const [actionId, setActionId] = useState(null);

  // Open Create Troubleshoot Modal
  const openTroubleshoot = (trouble_id) => {
    setShowTroubleshootDetailsModal(true);
  };

  // Show Troubleshoot Steps Modal
  useEffect(() => {
    createdNewTroubleshoot &&
      createdTroubleshootDetails &&
      openTroubleshoot(createdTroubleshootDetails.id);
  }, [createdNewTroubleshoot]);

  // Update Troubleshoot Modal
  const updateThisTroubleshoot = (trouble_id) => {
    setShowTroubleshootDetailsModal(true);
  };

  // Delete Troubleshoot Modal
  const deleteThisTroubleshoot = (x, title) => {
    setDeleteTroubleshootId(x);
    setDeleteTroubleshootTitle(title);
    setDeleteTroubleshootModal(true);
  };

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      sort:
        sortByTroubleshootTitle != 0
          ? sortByTroubleshootTitle
          : sortByTroubleshootCreatedDate != 0
          ? sortByTroubleshootCreatedDate
          : 0,
      sorting:
        sortByTroubleshootTitle != 0
          ? "title"
          : sortByTroubleshootCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "troubleshoot") {
      dispatch(getAllTroubleshoot(data));
    }
  }, [searchQuery]);

  // Search Bar
  const handleSearchChange = (searchData) => {
    dispatch(changeTroubleshootSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      page: e.selected,
      limit: 10,
      search: searchQuery,
      model_id: model_id,
      sort:
        sortByTroubleshootTitle != 0
          ? sortByTroubleshootTitle
          : sortByTroubleshootCreatedDate != 0
          ? sortByTroubleshootCreatedDate
          : 0,
      sorting:
        sortByTroubleshootTitle != 0
          ? "title"
          : sortByTroubleshootCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "troubleshoot") {
      dispatch(getAllTroubleshoot(data));
    }
  };

  // Backdrop that stops Popup from closing
  const handleModalBackdrop = () => {};
  const openDetails = (id) => {
    setDetailsTroubleshootId(id);
    setShowTroubleshootDetailsModal(true);
  };

  // Troubleshoot Sort
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
  // const [viewAssetNotesListModal, setViewAssetNotesListModal] = useState(false);
  // const [assetNotiableTypeId, setAssetNotiableTypeId] = useState(null);

  // const assetNotesListEvent = (stat, trouble_id) => {
  //   setViewAssetNotesListModal(stat);
  //   setAssetNotiableTypeId(trouble_id);
  // }

  return (
    <>
      <Tab.Panel>
        <div className="flex md:flex-col xl:flex-row items-center mb-8 px-4">
          {(permissions.includes("all_troubleshoot") ||
            permissions.includes("read_troubleshoot") ||
            permissions.includes("Admin")) && (
            <div className="relative w-full xl:w-auto overflow-hidden">
              <input
                type="search"
                className="w-full xl:w-[400px] bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                name="troubleshoot_search"
                id="troubleshoot_search"
                placeholder="Search for Troubleshoot..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <div className="absolute top-3.5 right-4 block m-auto focus:outline-none">
                <img
                  src="/assets/icons/icon-search.svg"
                  alt="icon-search"
                  className="w-4 h-4 block m-auto dark:invert"
                />
              </div>
            </div>
          )}

          <div className="flex items-center ml-auto md:mt-5 xl:mt-0">
            {(permissions.includes("all_troubleshoot") ||
              (permissions.includes("write_troubleshoot") &&
                permissions.includes("read_troubleshoot")) ||
              permissions.includes("Admin")) && (
              <button
                type="button"
                onClick={() => setAddTroubleshootModal(true)}
                className="bg-primary text-white text-sm 2xl:text-base font-medium border border-primary px-6 py-2 rounded-full shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
              >
                Add Toubleshoot +
              </button>
            )}
          </div>
        </div>

        {/* Table List of Troubleshoot */}
        <div className="w-full min-h-[500px] h-full xl:h-[500px] xl:px-4 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          {!(
            permissions.includes("all_troubleshoot") ||
            permissions.includes("read_troubleshoot") ||
            permissions.includes("Admin")
          ) ? (
            <PermissionsMessage
              additionalClassName="h-full py-[200px]"
              title="Troubleshoot"
              message="read troubleshoot"
            />
          ) : (
            <>
              <table className="table-auto text-left relative min-w-full max-h-full">
                <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                  <tr>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortByTroubleshootTitle,
                          "sortByTroubleshootTitle",
                        )
                      }
                      scope="col"
                      width="35%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByTroubleshootTitle == 1 ||
                            sortByTroubleshootTitle == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Trouble
                        </span>
                        {sortByTroubleshootTitle == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByTroubleshootTitle == 2 ? (
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
                      width="20%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      Causes
                    </th>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortByTroubleshootCreatedDate,
                          "sortByTroubleshootCreatedDate",
                        )
                      }
                      scope="col"
                      width="20%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByTroubleshootCreatedDate == 1 ||
                            sortByTroubleshootCreatedDate == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Created On
                        </span>
                        {sortByTroubleshootCreatedDate == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByTroubleshootCreatedDate == 2 ? (
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
                      width="25%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      {(permissions.includes("all_troubleshoot") ||
                        permissions.includes("read_troubleshoot") ||
                        permissions.includes("write_troubleshoot") ||
                        permissions.includes("delete_troubleshoot") ||
                        permissions.includes("Admin")) && <span>Actions</span>}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {troubleshootLoading ? (
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
                      {troubleshoots && troubleshoots.length > 0 ? (
                        <>
                          {troubleshoots.map((troubleshoot, index) => {
                            const {
                              id,
                              title,
                              steps_count,
                              created_at,
                              steps_approval,
                            } = troubleshoot;
                            return (
                              <tr
                                valign="top"
                                key={id}
                                className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                              >
                                <td width="35%" className="px-4 py-4">
                                  {!(
                                    permissions.includes("all_troubleshoot") ||
                                    permissions.includes("read_troubleshoot") ||
                                    permissions.includes("Admin")
                                  ) ? (
                                    <div className="w-[200px] text-ellipsis whitespace-nowrap overflow-hidden text-left text-sm font-medium capitalize">
                                      {title}
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => openDetails(id)}
                                      title={title}
                                      className="text-sm font-medium capitalize text-primary w-[250px] text-ellipsis overflow-hidden whitespace-nowrap text-left opacity-75 underline transition-all hover:opacity-100 hover:transition-all"
                                    >
                                      {title}
                                    </button>
                                  )}
                                </td>
                                <td width="20%" className="px-4 py-4">
                                  {steps_count}
                                </td>
                                <td
                                  width="20%"
                                  className="px-4 py-4 whitespace-nowrap"
                                >
                                  {created_at}
                                </td>
                                <td width="25%" className="px-4 py-4">
                                  <div className="w-full flex items-center justify-start">
                                    {(permissions.includes(
                                      "all_troubleshoot",
                                    ) ||
                                      permissions.includes(
                                        "delete_troubleshoot",
                                      ) ||
                                      permissions.includes("Admin")) && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteThisTroubleshoot(id, title)
                                        }
                                        className="focus:outline-0"
                                        title="Delete"
                                      >
                                        <img
                                          src="/assets/icons/icon-delete.svg"
                                          alt="icon-delete"
                                          className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] opacity-80 dark:invert transition-all duration-300 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                        />
                                      </button>
                                    )}

                                    {(permissions.includes(
                                      "all_troubleshoot",
                                    ) ||
                                      permissions.includes(
                                        "read_troubleshoot",
                                      ) ||
                                      permissions.includes("Admin")) && (
                                      <button
                                        type="button"
                                        onClick={() => openDetails(id)}
                                        className="focus:outline-0"
                                        title="Edit"
                                      >
                                        <img
                                          src="/assets/icons/icon-edit.svg"
                                          alt="icon-edit"
                                          className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-4 opacity-80 dark:invert transition-all duration-300 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                        />
                                      </button>
                                    )}

                                    {/* {(permissions.includes("all_troubleshoot") || permissions.includes("write_troubleshoot") || permissions.includes("Admin")) &&
                                      <button type="button" onClick={() => assetNotesListEvent(true, id)} className="focus:outline-0">
                                        <img src="/assets/icons/icon-note.svg" alt="icon-note" className="min-w-[20px] min-h-[20px] w-[20px] h-[20px] ml-4 opacity-80 dark:invert transition-all duration-300 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all" />
                                      </button>
                                    } */}

                                    {steps_approval == "waiting" && (
                                      <div className="flex items-center min-w-[170px] w-auto ml-6 text-xs font-medium border border-black2 dark:border-white border-opacity-30 dark:border-opacity-50 px-4 py-1.5 rounded-full">
                                        <span className="whitespace-nowrap">
                                          Waiting for approvals
                                        </span>
                                        <span className="ml-2">
                                          <img
                                            src="/assets/icons/icon-timer-wait.svg"
                                            alt="icon-timer"
                                            className="w-4 h-4"
                                          />
                                        </span>
                                      </div>
                                    )}
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
                          listLength={troubleshoots && troubleshoots.length}
                          filters={[]}
                        />
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>

        {/* Pagination */}
        {(permissions.includes("all_troubleshoot") ||
          permissions.includes("read_troubleshoot") ||
          permissions.includes("Admin")) && (
          <div className="flex justify-end mt-8 px-4">
            {troubleshootLoading ? (
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
        )}

        {/* Add/Create Troubleshoot */}
        {troubleshootModal && (
          <CreateTroubleshoot
            model_id={model_id}
            showTroubleshootModal={troubleshootModal}
            update={false}
            // setShowTroubleshootModal={setAddTroubleshootModal}
          />
        )}

        {/*  Written Issue Details Popup  : Start */}
        <Transition appear show={showTroubleshootDetailsModal} as={Fragment}>
          <Dialog
            as="div"
            open={showTroubleshootDetailsModal}
            onClose={() => handleModalBackdrop(false)}
            className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60"
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
              <Dialog.Panel className="w-[98%] md:w-[95%] xl:w-[80%] h-auto bg-gray4 dark:bg-darkBg border border-gray2 dark:border-opacity-20 rounded-2xl shadow-lg">
                {showTroubleshootDetailsModal && (
                  <TroubleshootDetails
                    tabName="Step 1"
                    addNewTab="Add Cause"
                    actionName="Add"
                    model_id={model_id}
                    setShowTroubleshootModal={setShowTroubleshootDetailsModal}
                    trouble_id={detailsTroubleshootId}
                    // editable={false}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
        {/*  Written Issue Details Popup : End */}
      </Tab.Panel>

      {/* Delete Written Issue Modal */}
      {deleteTroubleshootModal && (
        <DeleteModal
          head="Remove Troubleshoot"
          body={[
            "Are you sure you want to remove",
            <strong className="capitalize break-all">
              {" "}
              "{deleteTroubleshootTitle}"{" "}
            </strong>,
            "Troubleshoot from the list?",
          ]}
          deleteAction={deleteTroubleshoot}
          modalAction={setDeleteTroubleshootModal}
          modalValue={deleteTroubleshootModal}
          trouble_id={deleteTroubleshootId}
          parentmodel={false}
          model_id={model_id}
          deleteLoading={deleteTroubleshootLoading}
          // section_id={deleteSectionId}
        />
      )}

      {/* View Asset Notes List Modal */}
      {/* {viewAssetNotesListModal &&
        <AssetNotesListModal
          activeSubTab={0}
          model_id={model_id}
          viewAssetNotesListModal={viewAssetNotesListModal}
          setViewAssetNotesListModal={setViewAssetNotesListModal}
          assetNotiableType="Troubleshoot"
          assetNotiableTypeId={assetNotiableTypeId}
        />
      } */}
    </>
  );
};
export default TroubleshootPanel;
