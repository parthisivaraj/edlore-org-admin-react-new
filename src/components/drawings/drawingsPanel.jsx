import React, { useState, useEffect, Fragment } from "react";
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import CreateGroup from "../../components/model/createGroup";
import {
  addDrawing,
  changeSketchesSearch,
  deleteDrawing,
  getAllDrawings,
  setManualsModal,
  setUpdateGroupModal,
} from "../../redux/reduxes/sketches/sketchesAction";
import DeleteModal from "../common/deleteModal";
import UpdateDrawing from "./updateDrawing";
import Filters from "../common/filters";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import AppliedFilters from "../common/appliedFilters";
import PermissionsMessage from "../common/permissionsMessage";
import ListDataNotFound from "../common/listDataNotFound";
import AssetNotesListModal from "../assetNotes/assetNotesListModal";

const DrawingsPanel = ({ model_id, activeSubTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const drawingsLoading = useSelector(
    (state) => state.sketches.allDrawingsLoading,
  );
  const drawingsList = useSelector((state) => state.sketches.allDrawings);
  const filters = useSelector((state) => state.sketches.allDrawingsFilters);
  const pagination = useSelector(
    (state) => state.sketches.allDrawingsPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByDeviceDrawingsTitle = useSelector(
    (state) => state.sort.sortByDeviceDrawingsTitle,
  );
  const sortByDeviceDrawingsCreatedDate = useSelector(
    (state) => state.sort.sortByDeviceDrawingsCreatedDate,
  );
  const manualsModal = useSelector((state) => state.sketches.manualsModal);
  const updateGroupsModal = useSelector(
    (state) => state.sketches.updateGroupsModal,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.sketches.searchSketchesQuery,
  );
  const deleteDrawingLoading = useSelector(
    (state) => state.sketches.deleteDrawingLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Data
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByDeviceDrawingsTitle != 0
          ? sortByDeviceDrawingsTitle
          : sortByDeviceDrawingsCreatedDate != 0
          ? sortByDeviceDrawingsCreatedDate
          : 0,
      sorting:
        sortByDeviceDrawingsTitle != 0
          ? "title"
          : sortByDeviceDrawingsCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "drawings") {
      delayLoading && dispatch(getAllDrawings(data));
    }
  }, [sort]);

  // Dispatch Drawings
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByDeviceDrawingsTitle != 0
          ? sortByDeviceDrawingsTitle
          : sortByDeviceDrawingsCreatedDate != 0
          ? sortByDeviceDrawingsCreatedDate
          : 0,
      sorting:
        sortByDeviceDrawingsTitle != 0
          ? "title"
          : sortByDeviceDrawingsCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "drawings") {
      dispatch(getAllDrawings(data));
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
  function setUpdateDrawingModal() {
    dispatch(setUpdateGroupModal(true));
  }
  const [editingDrawingId, setEditingDrawingId] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);

  const updateDrawing = (drawingId, sectionId) => {
    setEditingDrawingId(drawingId);
    setEditingSectionId(sectionId);
    setUpdateDrawingModal(true);
  };

  // Delete a Drawing
  const [deleteDrawingModal, setDeleteDrawingModal] = useState(false);
  const [deleteDrawingId, setDeleteDrawingId] = useState(null);
  const [deleteDrawingTitle, setDeleteDrawingTitle] = useState("");
  const [deleteSectionId, setDeleteSectionId] = useState(null);
  // Asset Notes List
  const [viewAssetNotesListModal, setViewAssetNotesListModal] = useState(false);
  const [assetNotiableTypeId, setAssetNotiableTypeId] = useState(null);

  const assetNotesListEvent = (stat, error_code_id) => {
    setViewAssetNotesListModal(stat);
    setAssetNotiableTypeId(error_code_id);
  };

  const confirmDeleteDrawing = (stat, id, section_id, title) => {
    setDeleteDrawingModal(stat);
    setDeleteDrawingId(id);
    setDeleteDrawingTitle(title);
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
        sortByDeviceDrawingsTitle != 0
          ? sortByDeviceDrawingsTitle
          : sortByDeviceDrawingsCreatedDate != 0
          ? sortByDeviceDrawingsCreatedDate
          : 0,
      sorting:
        sortByDeviceDrawingsTitle != 0
          ? "title"
          : sortByDeviceDrawingsCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "drawings") {
      dispatch(getAllDrawings(data));
    }
  }, [searchQuery]);

  // Search Drawings
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
        sortByDeviceDrawingsTitle != 0
          ? sortByDeviceDrawingsTitle
          : sortByDeviceDrawingsCreatedDate != 0
          ? sortByDeviceDrawingsCreatedDate
          : 0,
      sorting:
        sortByDeviceDrawingsTitle != 0
          ? "title"
          : sortByDeviceDrawingsCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "drawings") {
      dispatch(getAllDrawings(data));
    }
  };

  // Drawings Sort
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
          {(permissions.includes("all_device_drawing") ||
            permissions.includes("read_device_drawing") ||
            permissions.includes("Admin")) && (
            <div className="relative w-full xl:w-auto overflow-hidden">
              <input
                type="search"
                className="w-full xl:w-[400px] bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                name="drawings_search"
                id="drawings_search"
                placeholder="Search for Drawings..."
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
            {(permissions.includes("all_device_drawing") ||
              permissions.includes("write_device_drawing") ||
              permissions.includes("Admin")) &&
              (permissions.includes("all_section") ||
                permissions.includes("read_section") ||
                permissions.includes("Admin")) && (
                <button
                  type="button"
                  onClick={() => setShowGroupModal()}
                  className="text-sm 2xl:text-base bg-primary text-white font-medium border border-primary px-6 py-2 mr-6 rounded-full shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                >
                  Add Device Drawing +
                </button>
              )}

            {/* Filters : Start */}
            {(permissions.includes("all_device_drawing") ||
              permissions.includes("read_device_drawing") ||
              permissions.includes("Admin")) && (
              <Filters
                filters={filters}
                getListAction={getAllDrawings}
                model_id={model_id}
                limit={10}
                sort={
                  sortByDeviceDrawingsTitle != 0
                    ? sortByDeviceDrawingsTitle
                    : sortByDeviceDrawingsCreatedDate != 0
                    ? sortByDeviceDrawingsCreatedDate
                    : 0
                }
                sorting={
                  sortByDeviceDrawingsTitle != 0
                    ? "title"
                    : sortByDeviceDrawingsCreatedDate != 0
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
              sortByDeviceDrawingsTitle != 0
                ? sortByDeviceDrawingsTitle
                : sortByDeviceDrawingsCreatedDate != 0
                ? sortByDeviceDrawingsCreatedDate
                : 0
            }
            sorting={
              sortByDeviceDrawingsTitle != 0
                ? "title"
                : sortByDeviceDrawingsCreatedDate != 0
                ? "created_at"
                : ""
            }
            filters={filters}
            getActionList={getAllDrawings}
          />
        </div>

        {/* Table List of Media Uploads */}
        <div className="w-full min-h-[500px] h-full xl:h-[500px] xl:px-4 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          {!(
            permissions.includes("all_device_drawing") ||
            permissions.includes("read_device_drawing") ||
            permissions.includes("Admin")
          ) ? (
            <PermissionsMessage
              additionalClassName="h-full py-[200px]"
              title="Device Drawings"
              message="read device drawing"
            />
          ) : (
            <>
              <table className="table-auto text-left relative min-w-full max-h-full">
                <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                  <tr>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortByDeviceDrawingsTitle,
                          "sortByDeviceDrawingsTitle",
                        )
                      }
                      scope="col"
                      width="50%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByDeviceDrawingsTitle == 1 ||
                            sortByDeviceDrawingsTitle == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Title
                        </span>
                        {sortByDeviceDrawingsTitle == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByDeviceDrawingsTitle == 2 ? (
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
                          sortByDeviceDrawingsCreatedDate,
                          "sortByDeviceDrawingsCreatedDate",
                        )
                      }
                      scope="col"
                      width="20%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByDeviceDrawingsCreatedDate == 1 ||
                            sortByDeviceDrawingsCreatedDate == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Created On
                        </span>
                        {sortByDeviceDrawingsCreatedDate == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByDeviceDrawingsCreatedDate == 2 ? (
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
                      width="10%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      {(permissions.includes("all_device_drawing") ||
                        permissions.includes("update_device_drawing") ||
                        permissions.includes("delete_device_drawing") ||
                        permissions.includes("Admin")) && <span>Actions</span>}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {drawingsLoading ? (
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
                      {drawingsList && drawingsList.length > 0 ? (
                        <>
                          {drawingsList.map((drawing, index) => {
                            const {
                              id,
                              title,
                              linked_medias,
                              section_id,
                              section_title,
                              created_at,
                            } = drawing;
                            return (
                              <tr
                                valign="top"
                                key={id}
                                className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                              >
                                <td width="50%" className="px-4 py-4">
                                  <div className="text-sm font-medium capitalize break-all">
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
                                  <span className="text-sm whitespace-nowrap">
                                    {created_at}
                                  </span>
                                </td>
                                <td
                                  width="10%"
                                  className="px-4 py-4 whitespace-nowrap"
                                >
                                  {(permissions.includes(
                                    "all_device_drawing",
                                  ) ||
                                    permissions.includes(
                                      "delete_device_drawing",
                                    ) ||
                                    permissions.includes("Admin")) && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        confirmDeleteDrawing(
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

                                  {(permissions.includes(
                                    "all_device_drawing",
                                  ) ||
                                    permissions.includes(
                                      "update_device_drawing",
                                    ) ||
                                    permissions.includes("Admin")) &&
                                    (permissions.includes("all_section") ||
                                      permissions.includes("read_section") ||
                                      permissions.includes("Admin")) && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateDrawing(id, section_id)
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
                          listLength={drawingsList && drawingsList.length}
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
        {(permissions.includes("all_device_drawing") ||
          permissions.includes("read_device_drawing") ||
          permissions.includes("Admin")) && (
          <div className="flex justify-end mt-8 px-4">
            {drawingsLoading ? (
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
        {/* Adding a Group Comp to every Individual Media : Start */}
        {manualsModal && (
          <CreateGroup
            showGroupModal={manualsModal}
            sketch_type={2}
            addSketchAction={addDrawing}
            title="Device Drawings"
            model_id={model_id}
            label="Device Drawings"
          />
        )}
        {/* Adding a Group Comp to every Individual Media : End  */}

        {/* Update Drawing Modal */}
        {updateGroupsModal && (
          <UpdateDrawing
            updateDrawingModal={updateGroupsModal}
            drawing_id={editingDrawingId}
            model_id={model_id}
            section_id={editingSectionId}
          />
        )}

        {/* Delete Drawing Modal */}
        {deleteDrawingModal && (
          <DeleteModal
            head="Remove Drawing"
            body={[
              "Are you sure you want to remove",
              <strong className="capitalize break-all">
                {" "}
                "{deleteDrawingTitle}"{" "}
              </strong>,
              "Drawing from the list?",
            ]}
            deleteAction={deleteDrawing}
            modalAction={setDeleteDrawingModal}
            modalValue={deleteDrawingModal}
            parentmodel={false}
            id={deleteDrawingId}
            model_id={model_id}
            section_id={deleteSectionId}
            deleteLoading={deleteDrawingLoading}
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
export default DrawingsPanel;
