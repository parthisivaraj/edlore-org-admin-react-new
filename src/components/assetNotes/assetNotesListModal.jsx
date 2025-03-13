import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import DeleteModal from "../common/deleteModal";
import PaginatedItems from "../common/pagination";
import AddAssetNoteModal from "./addAssetNoteModal";
import {
  changeAssetNotesSearch,
  deleteAssetNote,
  getAllAssetNotes,
  setAssetNotesModal,
} from "../../redux/reduxes/assetNotes/actions";
import { updateSort } from "../../redux/reduxes/sort/sortAction";

const AssetNotesListModal = ({
  viewAssetNotesListModal,
  setViewAssetNotesListModal,
  assetNotiableType,
  assetNotiableTypeId,
  model_id,
  activeMainTab,
  activeSubTab,
}) => {
  const dispatch = useDispatch();

  // Fetch Data
  const allAssetNotesLoading = useSelector(
    (state) => state.asset_notes.allAssetNotesLoading,
  );
  const allAssetNotesList = useSelector(
    (state) => state.asset_notes.allAssetNotesList,
  );
  const pagination = useSelector(
    (state) => state.asset_notes.allAssetNotesPagination,
  );
  const showAssetNotesModal = useSelector(
    (state) => state.asset_notes.showAssetNotesModal,
  );
  const searchQuery = useSelector((state) => state.asset_notes.searchQuery);
  const deleteAssetNoteLoading = useSelector(
    (state) => state.asset_notes.deleteAssetNoteLoading,
  );
  const sort = useSelector((state) => state.sort);
  const sortByAssetNoteTitle = useSelector(
    (state) => state.sort.sortByAssetNoteTitle,
  );
  const sortByAssetNoteCreatedDate = useSelector(
    (state) => state.sort.sortByAssetNoteCreatedDate,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Sorting Data
  useEffect(() => {
    const data = {
      asset_notiable_type: assetNotiableType,
      asset_notiable_id: assetNotiableTypeId,
      search: searchQuery,
      page: 0,
      limit: 10,
      sort:
        sortByAssetNoteTitle != 0
          ? sortByAssetNoteTitle
          : sortByAssetNoteCreatedDate != 0
          ? sortByAssetNoteCreatedDate
          : 0,
      sorting:
        sortByAssetNoteTitle != 0
          ? "title"
          : sortByAssetNoteCreatedDate != 0
          ? "created_at"
          : "",
    };
    delayLoading && dispatch(getAllAssetNotes(data));
  }, [sort]);

  // Dispatch
  useEffect(() => {
    const data = {
      asset_notiable_type: assetNotiableType,
      asset_notiable_id: assetNotiableTypeId,
      page: 0,
      limit: 10,
      search: searchQuery,
      sort:
        sortByAssetNoteTitle != 0
          ? sortByAssetNoteTitle
          : sortByAssetNoteCreatedDate != 0
          ? sortByAssetNoteCreatedDate
          : 0,
      sorting:
        sortByAssetNoteTitle != 0
          ? "title"
          : sortByAssetNoteCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeMainTab || activeSubTab) {
      dispatch(getAllAssetNotes(data));
    }
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Search Query
  useEffect(() => {
    const data = {
      asset_notiable_type: assetNotiableType,
      asset_notiable_id: assetNotiableTypeId,
      search: searchQuery,
      page: 0,
      limit: 10,
      sort:
        sortByAssetNoteTitle != 0
          ? sortByAssetNoteTitle
          : sortByAssetNoteCreatedDate != 0
          ? sortByAssetNoteCreatedDate
          : 0,
      sorting:
        sortByAssetNoteTitle != 0
          ? "title"
          : sortByAssetNoteCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllAssetNotes(data));
  }, [searchQuery]);

  // Search Notes
  const handleSearchChange = (searchData) => {
    dispatch(changeAssetNotesSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      asset_notiable_type: assetNotiableType,
      asset_notiable_id: assetNotiableTypeId,
      page: e.selected,
      search: searchQuery,
      limit: 10,
      sort:
        sortByAssetNoteTitle != 0
          ? sortByAssetNoteTitle
          : sortByAssetNoteCreatedDate != 0
          ? sortByAssetNoteCreatedDate
          : 0,
      sorting:
        sortByAssetNoteTitle != 0
          ? "title"
          : sortByAssetNoteCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllAssetNotes(data));
  };

  // Asset Notes Sorting
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

  // Open Modal
  const showAssetNoteModalEvent = (stat) => {
    dispatch(setAssetNotesModal(stat));
  };

  // Add New Note
  const [update, setUpdate] = useState(false);
  const [assetNoteId, setAssetNoteId] = useState(null);

  const addPartNoteEvent = () => {
    showAssetNoteModalEvent(true);
    setUpdate(false);
  };

  // Update Note
  const updateAssetNoteEvent = (asset_note_id) => {
    showAssetNoteModalEvent(true);
    setUpdate(true);
    setAssetNoteId(asset_note_id);
  };

  // Delete Note
  const [deleteAssetNoteModal, setDeleteAssetNoteModal] = useState(false);
  const [deleteAssetNoteId, setDeleteAssetNoteId] = useState(null);

  const deleteAssetNoteEvent = (stat, asset_note_id) => {
    setDeleteAssetNoteModal(stat);
    setDeleteAssetNoteId(asset_note_id);
  };

  // Backdrop that stops from Closing Modal
  const handleBackdropModal = () => {};

  return (
    <>
      <Transition appear show={viewAssetNotesListModal} as={Fragment}>
        <Dialog
          as="div"
          open={viewAssetNotesListModal}
          onClose={() => handleBackdropModal()}
          className="fixed inset-0 z-50 py-10 2xl:py-20 flex items-start justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60"
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
            <Dialog.Panel className="w-[90%] xl:w-[70%] 2xl:w-[60%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl py-8 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center dark:text-gray2 mb-6">
                Notes
              </Dialog.Title>

              {/* Search Bar */}
              <div className="relative overflow-hidden mx-6 mb-4">
                <input
                  type="search"
                  className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2.5 text-sm border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                  name="search"
                  id="search"
                  placeholder="Search for Notes..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <div className="absolute top-3.5 right-4 block m-auto focus:outline-none">
                  <img
                    src="../assets/icons/icon-search.svg"
                    alt="icon-search"
                    className="w-4 h-4 block m-auto dark:invert"
                  />
                </div>
              </div>

              {/* Notes Table List */}
              <div className="relative">
                <div className="w-full h-[400px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <table className="table-auto text-left relative min-w-full max-h-full">
                    <thead className="sticky top-0 z-10 w-full bg-gray4 dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                      <tr>
                        <th
                          scope="col"
                          width="10%"
                          onClick={() =>
                            handleChangeSort(
                              sortByAssetNoteTitle,
                              "sortByAssetNoteTitle",
                            )
                          }
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByAssetNoteTitle == 1 ||
                                sortByAssetNoteTitle == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Title
                            </span>
                            {sortByAssetNoteTitle == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByAssetNoteTitle == 2 ? (
                              <img
                                src="../assets/icons/icon-sort-desc.svg"
                                alt="icon-sort-desc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : (
                              <img
                                src="../assets/icons/icon-sort.svg"
                                alt="icon-sort"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            )}
                          </div>
                        </th>
                        <th
                          scope="col"
                          width="20%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {" "}
                          Description{" "}
                        </th>
                        <th
                          scope="col"
                          width="10%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {" "}
                          Media Count{" "}
                        </th>
                        <th
                          scope="col"
                          width="10%"
                          onClick={() =>
                            handleChangeSort(
                              sortByAssetNoteCreatedDate,
                              "sortByAssetNoteCreatedDate",
                            )
                          }
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center">
                            <span
                              className={
                                sortByAssetNoteCreatedDate == 1 ||
                                sortByAssetNoteCreatedDate == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Created at
                            </span>
                            {sortByAssetNoteCreatedDate == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByAssetNoteCreatedDate == 2 ? (
                              <img
                                src="../assets/icons/icon-sort-desc.svg"
                                alt="icon-sort-desc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : (
                              <img
                                src="../assets/icons/icon-sort.svg"
                                alt="icon-sort"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            )}
                          </div>
                        </th>
                        <th
                          scope="col"
                          width="20%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {" "}
                          Added By{" "}
                        </th>
                        <th
                          scope="col"
                          width="15%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {" "}
                          Actions{" "}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {allAssetNotesLoading ? (
                        <tr>
                          <td colSpan="6">
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
                          {allAssetNotesList && allAssetNotesList.length > 0 ? (
                            <>
                              {allAssetNotesList.map((note, index) => {
                                const {
                                  id,
                                  title,
                                  description,
                                  media_count,
                                  created_at,
                                  user_email,
                                } = note;
                                return (
                                  <tr
                                    key={id}
                                    valign="top"
                                    className="border-b border-gray2 dark:border-opacity-10 odd:bg-gray2 odd:bg-opacity-30 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300 "
                                  >
                                    <td
                                      width="10%"
                                      className="px-4 xl:px-8 py-4 first-letter:capitalize"
                                    >
                                      <div
                                        className="w-[150px] text-ellipsis whitespace-nowrap overflow-hidden text-left text-sm font-medium capitalize"
                                        title={title}
                                      >
                                        {title}
                                      </div>
                                    </td>
                                    <td
                                      width="20%"
                                      className="px-4 xl:px-8 py-4 first-letter:capitalize"
                                    >
                                      <div
                                        className="text-sm font-medium break-all"
                                        dangerouslySetInnerHTML={{
                                          __html: description,
                                        }}
                                      />
                                    </td>
                                    <td
                                      width="10%"
                                      className="px-4 xl:px-8 py-4 first-letter:capitalize"
                                    >
                                      <div className="text-sm font-medium break-all">
                                        {media_count}
                                      </div>
                                    </td>
                                    <td
                                      width="10%"
                                      className="px-4 xl:px-8 py-4 first-letter:capitalize"
                                    >
                                      <div className="text-sm font-medium break-all">
                                        {created_at}
                                      </div>
                                    </td>
                                    <td
                                      width="20%"
                                      className="px-4 xl:px-8 py-4 first-letter:capitalize"
                                    >
                                      <div className="text-sm font-medium break-all">
                                        {user_email}
                                      </div>
                                    </td>
                                    <td
                                      width="15%"
                                      className="px-4 xl:px-8 py-4 whitespace-nowrap"
                                    >
                                      <button
                                        type="button"
                                        onClick={() =>
                                          deleteAssetNoteEvent(true, id)
                                        }
                                        className=" focus-visible:outline-none"
                                        title="Delete"
                                      >
                                        <img
                                          src="../assets/icons/icon-delete.svg"
                                          alt="icon-delete"
                                          className="w-4 h-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                        />
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => updateAssetNoteEvent(id)}
                                        className=" focus-visible:outline-none mx-4"
                                        title="Edit"
                                      >
                                        <img
                                          src="../assets/icons/icon-edit.svg"
                                          alt="icon-edit"
                                          className="w-4 h-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                        />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          ) : searchQuery !== "" &&
                            allAssetNotesList &&
                            allAssetNotesList.length <= 0 ? (
                            <tr>
                              <td
                                colSpan="6"
                                align="center"
                                className="text-danger py-20"
                              >
                                No Search Results Found
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              <td
                                colSpan="6"
                                align="center"
                                className="text-danger py-20"
                              >
                                No Notes found
                              </td>
                            </tr>
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end relative mt-8 px-4">
                  {allAssetNotesLoading ? (
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
                        Math.ceil(
                          pagination.total_entries / pagination.per_page,
                        )
                      }
                      current_page={pagination && pagination.current_page}
                      totalEntries={pagination && pagination.total_entries}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end mt-10 mx-6">
                <button
                  type="button"
                  onClick={() => addPartNoteEvent()}
                  className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2 mr-5 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none"
                >
                  Add New Note +
                </button>

                <button
                  type="button"
                  onClick={() => setViewAssetNotesListModal(false)}
                  className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Add an Asset Note Modal */}
      {showAssetNotesModal && (
        <AddAssetNoteModal
          model_id={model_id}
          showAssetNotesModal={showAssetNotesModal}
          assetNotiableType={assetNotiableType}
          assetNotiableTypeId={assetNotiableTypeId}
          update={update}
          assetNoteId={assetNoteId}
          setAssetNoteId={setAssetNoteId}
        />
      )}

      {/* Delete Asset Note Modal */}
      {deleteAssetNoteModal && (
        <DeleteModal
          head="Remove Note"
          body="Are you sure you want to remove NOTE from the list?"
          deleteAction={deleteAssetNote}
          modalAction={setDeleteAssetNoteModal}
          parentmodel={false}
          modalValue={deleteAssetNoteModal}
          deleteLoading={deleteAssetNoteLoading}
          model_id={model_id}
          id={deleteAssetNoteId}
          assetNotiableType={assetNotiableType}
          assetNotiableTypeId={assetNotiableTypeId}
        />
      )}
    </>
  );
};
export default AssetNotesListModal;
