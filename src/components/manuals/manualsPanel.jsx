import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import CreateGroup from "../../components/model/createGroup";
import {
  addManual,
  changeSketchesSearch,
  deleteManual,
  getAllManuals,
  setManualsModal,
  setUpdateGroupModal,
} from "../../redux/reduxes/sketches/sketchesAction";
import DeleteModal from "../common/deleteModal";
import UpdateManual from "./updateManual";
import Filters from "../common/filters";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import AppliedFilters from "../common/appliedFilters";
import PermissionsMessage from "../common/permissionsMessage";
import ListDataNotFound from "../common/listDataNotFound";
import AssetNotesListModal from "../assetNotes/assetNotesListModal";

const ManualsPanel = ({ model_id, limit, activeSubTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const manualsLoading = useSelector(
    (state) => state.sketches.allManualsLoading,
  );
  const manualsList = useSelector((state) => state.sketches.allManuals);
  const filters = useSelector((state) => state.sketches.allManualsFilters);
  const pagination = useSelector(
    (state) => state.sketches.allManualsPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByManualsTitle = useSelector(
    (state) => state.sort.sortByManualsTitle,
  );
  const sortByManualsCreatedDate = useSelector(
    (state) => state.sort.sortByManualsCreatedDate,
  );
  const manualsModal = useSelector((state) => state.sketches.manualsModal);
  const updateGroupsModal = useSelector(
    (state) => state.sketches.updateGroupsModal,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.sketches.searchSketchesQuery,
  );
  const deleteManualLaoding = useSelector(
    (state) => state.sketches.deleteManualLaoding,
  );
  // Asset Notes List
  const [viewAssetNotesListModal, setViewAssetNotesListModal] = useState(false);
  const [assetNotiableTypeId, setAssetNotiableTypeId] = useState(null);
  const [delayLoading, setDelayLoading] = useState(false);

  const assetNotesListEvent = (stat, id) => {
    setViewAssetNotesListModal(stat);
    setAssetNotiableTypeId(id);
  };

  // Dispatch Data
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByManualsTitle != 0
          ? sortByManualsTitle
          : sortByManualsCreatedDate != 0
          ? sortByManualsCreatedDate
          : 0,
      sorting:
        sortByManualsTitle != 0
          ? "title"
          : sortByManualsCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "manuals") {
      delayLoading && dispatch(getAllManuals(data));
    }
  }, [sort]);

  // Dispatch Manuals
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByManualsTitle != 0
          ? sortByManualsTitle
          : sortByManualsCreatedDate != 0
          ? sortByManualsCreatedDate
          : 0,
      sorting:
        sortByManualsTitle != 0
          ? "title"
          : sortByManualsCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "manuals") {
      dispatch(getAllManuals(data));
    }
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Map to Section Popup
  function setShowGroupModal() {
    dispatch(setManualsModal(true));
  }

  // Map to Section Popup
  function setUpdateManualModal() {
    dispatch(setUpdateGroupModal(true));
  }
  // Edit/Update a Manual Popup
  const [editingManualId, setEditingManualId] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);

  const updateManual = (manualId, sectionId) => {
    setEditingManualId(manualId);
    setEditingSectionId(sectionId);
    setUpdateManualModal(true);
  };

  // Delete a Manual Modal
  const [deleteManualModal, setDeleteManualModal] = useState(false);
  const [deleteManualId, setDeleteManualId] = useState(null);
  const [deleteManualTitle, setDeleteManualTitle] = useState("");
  const [deleteSectionId, setDeleteSectionId] = useState(null);

  const confirmDeleteManual = (stat, id, section_id, title) => {
    setDeleteManualModal(stat);
    setDeleteManualId(id);
    setDeleteManualTitle(title);
    setDeleteSectionId(section_id);
  };

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      filter: {},
      sort:
        sortByManualsTitle != 0
          ? sortByManualsTitle
          : sortByManualsCreatedDate != 0
          ? sortByManualsCreatedDate
          : 0,
      sorting:
        sortByManualsTitle != 0
          ? "title"
          : sortByManualsCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "manuals") {
      dispatch(getAllManuals(data));
    }
  }, [searchQuery]);

  // Search Manuals
  const handleSearchChange = (searchData) => {
    dispatch(changeSketchesSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      limit: 10,
      model_id: model_id,
      filter: filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByManualsTitle != 0
          ? sortByManualsTitle
          : sortByManualsCreatedDate != 0
          ? sortByManualsCreatedDate
          : 0,
      sorting:
        sortByManualsTitle != 0
          ? "title"
          : sortByManualsCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "manuals") {
      dispatch(getAllManuals(data));
    }
  };

  // Manuals Sort
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

  return (
    <>
      <Tab.Panel>
        <div className="flex md:flex-col xl:flex-row items-center mb-8 px-4">
          {(permissions.includes("all_manuals") ||
            permissions.includes("read_manuals") ||
            permissions.includes("Admin")) && (
            <div className="relative w-full xl:w-auto overflow-hidden">
              <input
                type="search"
                className="w-full xl:w-[400px] bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                name="manuals_search"
                id="manuals_search"
                placeholder="Search for Manuals..."
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
            {(permissions.includes("all_manuals") ||
              permissions.includes("write_manuals") ||
              permissions.includes("Admin")) &&
              (permissions.includes("all_section") ||
                permissions.includes("read_section") ||
                permissions.includes("Admin")) && (
                <button
                  type="button"
                  onClick={() => setShowGroupModal(manualsModal)}
                  className="text-sm 2xl:text-base bg-primary text-white font-medium border border-primary px-6 py-2 mr-6 rounded-full shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus-visible:outline-none"
                >
                  Add New Manual +
                </button>
              )}

            {/* Filters : Start */}
            {(permissions.includes("all_manuals") ||
              permissions.includes("read_manuals") ||
              permissions.includes("Admin")) && (
              <Filters
                filters={filters}
                getListAction={getAllManuals}
                search={searchQuery}
                model_id={model_id}
                limit={10}
                sort={
                  sortByManualsTitle != 0
                    ? sortByManualsTitle
                    : sortByManualsCreatedDate != 0
                    ? sortByManualsCreatedDate
                    : 0
                }
                sorting={
                  sortByManualsTitle != 0
                    ? "title"
                    : sortByManualsCreatedDate != 0
                    ? "created_at"
                    : ""
                }
              />
            )}
          </div>
        </div>

        {/* Applied Filters */}
        <div className="px-4 xl:px-8">
          <AppliedFilters
            model_id={model_id}
            page={0}
            limit={10}
            search={searchQuery}
            sort={
              sortByManualsTitle != 0
                ? sortByManualsTitle
                : sortByManualsCreatedDate != 0
                ? sortByManualsCreatedDate
                : 0
            }
            sorting={
              sortByManualsTitle != 0
                ? "title"
                : sortByManualsCreatedDate != 0
                ? "created_at"
                : ""
            }
            filters={filters}
            getActionList={getAllManuals}
          />
        </div>

        {/* Table List of Media Uploads */}
        <div className="w-full min-h-[500px] h-full xl:h-[500px] xl:px-4 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          {!(
            permissions.includes("all_manuals") ||
            permissions.includes("read_manuals") ||
            permissions.includes("Admin")
          ) ? (
            <PermissionsMessage
              additionalClassName="h-full py-[200px]"
              title="Manuals"
              message="read manuals"
            />
          ) : (
            <>
              <table className="table-auto text-left relative min-w-full max-h-full">
                <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                  <tr>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortByManualsTitle,
                          "sortByManualsTitle",
                        )
                      }
                      scope="col"
                      width="50%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByManualsTitle == 1 || sortByManualsTitle == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Title
                        </span>
                        {sortByManualsTitle == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByManualsTitle == 2 ? (
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
                      Section Title
                    </th>
                    <th
                      scope="col"
                      width="20%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      Linked Media
                    </th>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortByManualsCreatedDate,
                          "sortByManualsCreatedDate",
                        )
                      }
                      scope="col"
                      width="20%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByManualsCreatedDate == 1 ||
                            sortByManualsCreatedDate == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Created On
                        </span>
                        {sortByManualsCreatedDate == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByManualsCreatedDate == 2 ? (
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
                      {(permissions.includes("all_manuals") ||
                        permissions.includes("update_manuals") ||
                        permissions.includes("delete_manuals") ||
                        permissions.includes("Admin")) && <span>Actions</span>}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {manualsLoading ? (
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
                      {manualsList && manualsList.length > 0 ? (
                        <>
                          {manualsList.map((manual, index) => {
                            const {
                              id,
                              title,
                              linked_medias,
                              section_id,
                              section_title,
                              created_at,
                            } = manual;
                            return (
                              <tr
                                valign="top"
                                key={id}
                                className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                              >
                                <td width="50%" className="px-4 py-4">
                                  <div className="text-sm font-medium capitalize">
                                    {title}
                                  </div>
                                </td>
                                <td width="50%" className="px-4 py-4">
                                  <div className="text-sm font-medium capitalize">
                                    {section_title}
                                  </div>
                                </td>
                                <td width="20%" className="px-4 py-4">
                                  <span className="text-sm">
                                    {linked_medias}
                                  </span>
                                </td>
                                <td width="20%" className="px-4 py-4">
                                  <span className="text-sm  whitespace-nowrap">
                                    {created_at}
                                  </span>
                                </td>
                                <td
                                  width="10%"
                                  className="px-4 py-4 whitespace-nowrap"
                                >
                                  {(permissions.includes("all_manuals") ||
                                    permissions.includes("delete_manuals") ||
                                    permissions.includes("Admin")) && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        confirmDeleteManual(
                                          true,
                                          id,
                                          section_id,
                                          title,
                                        )
                                      }
                                      className=" focus-visible:outline-none"
                                      title="Delete"
                                    >
                                      <img
                                        src="/assets/icons/icon-delete.svg"
                                        alt="icon-delete"
                                        className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                      />
                                    </button>
                                  )}

                                  {(permissions.includes("all_manuals") ||
                                    permissions.includes("update_manuals") ||
                                    permissions.includes("Admin")) &&
                                    (permissions.includes("all_section") ||
                                      permissions.includes("read_section") ||
                                      permissions.includes("Admin")) && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateManual(id, section_id)
                                        }
                                        className=" focus-visible:outline-none"
                                        title="Edit"
                                      >
                                        <img
                                          src="/assets/icons/icon-edit.svg"
                                          alt="icon-edit"
                                          className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                        />
                                      </button>
                                    )}

                                  <button
                                    type="button"
                                    onClick={() =>
                                      assetNotesListEvent(true, id)
                                    }
                                    className="focus:outline-0"
                                    title="Notes"
                                  >
                                    <img
                                      src="/assets/icons/icon-note.svg"
                                      alt="icon-note"
                                      className="min-w-[20px] min-h-[20px] w-[20px] h-[20px] ml-4 opacity-80 dark:invert transition-all duration-300 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                    />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <ListDataNotFound
                          colSpan={4}
                          searchQuery={searchQuery}
                          listLength={manualsList && manualsList.length}
                          filters={filters}
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
        {(permissions.includes("all_manuals") ||
          permissions.includes("read_manuals") ||
          permissions.includes("Admin")) && (
          <div className="flex justify-end mt-8 px-4">
            {manualsLoading ? (
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
                current_page={pagination.current_page}
                totalEntries={pagination && pagination.total_entries}
              />
            )}
          </div>
        )}
        {/* Adding a Group Comp to every Individual Media : Start */}
        {manualsModal && (
          <CreateGroup
            showGroupModal={manualsModal}
            sketch_type={1}
            addSketchAction={addManual}
            title="Manual"
            model_id={model_id}
            label="Manual"
          />
        )}

        {/* Update Manual Modal */}
        {updateGroupsModal && (
          <UpdateManual
            manual_id={editingManualId}
            updateManualModal={updateGroupsModal}
            model_id={model_id}
            section_id={editingSectionId}
            limit={limit}
          />
        )}

        {/* Delete Manual Modal */}
        {deleteManualModal && (
          <DeleteModal
            head="Remove Manual"
            body={[
              "Are you sure you want to remove",
              <strong className="capitalize break-all">
                {" "}
                "{deleteManualTitle}"{" "}
              </strong>,
              "Manual from the list?",
            ]}
            deleteAction={deleteManual}
            modalAction={setDeleteManualModal}
            modalValue={deleteManualModal}
            parentmodel={false}
            id={deleteManualId}
            model_id={model_id}
            section_id={deleteSectionId}
            deleteLoading={deleteManualLaoding}
          />
        )}

        {viewAssetNotesListModal && (
          <AssetNotesListModal
            activeSubTab={3}
            model_id={model_id}
            viewAssetNotesListModal={viewAssetNotesListModal}
            setViewAssetNotesListModal={setViewAssetNotesListModal}
            assetNotiableType="Sketch"
            assetNotiableTypeId={assetNotiableTypeId}
          />
        )}
      </Tab.Panel>
    </>
  );
};
export default ManualsPanel;
