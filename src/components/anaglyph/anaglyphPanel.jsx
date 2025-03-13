import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAnaglyph,
  deleteAnaglyph,
  changeAnaglyphSearch,
  setAnaglyphModal,
} from "../../redux/reduxes/anaglyph/anaglyphAction";
import Skeleton from "react-loading-skeleton";
import AddAnaglyph from "./addAnaglyph";
import DeleteModal from "../common/deleteModal";
import PermissionsMessage from "../common/permissionsMessage";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import ListDataNotFound from "../common/listDataNotFound";
import PaginatedItems from "../common/pagination";
import AnaglyphDetails from "./anaglyphDetails";
import AssetNotesListModal from "../assetNotes/assetNotesListModal";

const AnaglyphPanel = ({ model_id, activeSubTab, anaglyph_id = null }) => {
  useEffect(() => {
    console.log("resource_id", anaglyph_id);

    if (anaglyph_id !== null) viewAnaglyphDetailsEvent(anaglyph_id);
  }, [anaglyph_id]);

  const dispatch = useDispatch();

  // Anaglyph List Data Fetch
  const permissions = useSelector((state) => state.auth.allPermissions);
  const allAnaglyphLoading = useSelector(
    (state) => state.anaglyph.allAnaglyphLoading,
  );
  const anaglyphList = useSelector((state) => state.anaglyph.anaglyphList);
  const pagination = useSelector(
    (state) => state.anaglyph.allAnaglyphPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByAnaglyphTitle = useSelector(
    (state) => state.sort.sortByAnaglyphTitle,
  );
  const sortByAnaglyphSectionTitle = useSelector(
    (state) => state.sort.sortByAnaglyphSectionTitle,
  );
  const sortByAnaglyphCreatedDate = useSelector(
    (state) => state.sort.sortByAnaglyphCreatedDate,
  );
  const deleteAnaglyphLoading = useSelector(
    (state) => state.anaglyph.deleteAnaglyphLoading,
  );
  const searchQuery = useSelector(
    (state) => state.anaglyph.searchAnaglyphQuery,
  );
  const setShowAnaglyphModal = useSelector(
    (state) => state.anaglyph.setShowAnaglyphModal,
  );
  const [delayLoading, setDelayLoading] = useState(false);
  const [showAnaglyphDetails, setShowAnaglyphDetails] = useState(false);
  // Asset Notes List
  const [viewAssetNotesListModal, setViewAssetNotesListModal] = useState(false);
  const [assetNotiableTypeId, setAssetNotiableTypeId] = useState(null);

  const assetNotesListEvent = (stat, error_code_id) => {
    setViewAssetNotesListModal(stat);
    setAssetNotiableTypeId(error_code_id);
  };

  // Dispatch Data to Anaglyph
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      sort:
        sortByAnaglyphTitle != 0
          ? sortByAnaglyphTitle
          : sortByAnaglyphSectionTitle != 0
          ? sortByAnaglyphSectionTitle
          : sortByAnaglyphCreatedDate
          ? sortByAnaglyphCreatedDate
          : 0,
      sorting:
        sortByAnaglyphTitle != 0
          ? "title"
          : sortByAnaglyphSectionTitle != 0
          ? "section_title"
          : sortByAnaglyphCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "3d") {
      delayLoading && dispatch(getAllAnaglyph(data));
    }
  }, [sort]);

  // Dispatch to Anaglyph
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      sort:
        sortByAnaglyphTitle != 0
          ? sortByAnaglyphTitle
          : sortByAnaglyphSectionTitle != 0
          ? sortByAnaglyphSectionTitle
          : sortByAnaglyphCreatedDate
          ? sortByAnaglyphCreatedDate
          : 0,
      sorting:
        sortByAnaglyphTitle != 0
          ? "title"
          : sortByAnaglyphSectionTitle != 0
          ? "section_title"
          : sortByAnaglyphCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "3d") {
      dispatch(getAllAnaglyph(data));
    }
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      sort:
        sortByAnaglyphTitle != 0
          ? sortByAnaglyphTitle
          : sortByAnaglyphSectionTitle != 0
          ? sortByAnaglyphSectionTitle
          : sortByAnaglyphCreatedDate
          ? sortByAnaglyphCreatedDate
          : 0,
      sorting:
        sortByAnaglyphTitle != 0
          ? "title"
          : sortByAnaglyphSectionTitle != 0
          ? "section_title"
          : sortByAnaglyphCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "3d") {
      dispatch(getAllAnaglyph(data));
    }
  }, [searchQuery, showAnaglyphDetails]);

  // Search Bar
  const handleSearchChange = (searchData) => {
    dispatch(changeAnaglyphSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      limit: 10,
      model_id: model_id,
      sort:
        sortByAnaglyphTitle != 0
          ? sortByAnaglyphTitle
          : sortByAnaglyphSectionTitle != 0
          ? sortByAnaglyphSectionTitle
          : sortByAnaglyphCreatedDate
          ? sortByAnaglyphCreatedDate
          : 0,
      sorting:
        sortByAnaglyphTitle != 0
          ? "title"
          : sortByAnaglyphSectionTitle != 0
          ? "section_title"
          : sortByAnaglyphCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "3d") {
      dispatch(getAllAnaglyph(data));
    }
  };

  // Dispatch Sort
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

  // Add and  Update 3D Modal
  // const [showAddAnaglyph, setShowAddAnaglyph] = useState(false);
  const [anaglyphId, setAnaglyphId] = useState(null);
  const [update, setUpdate] = useState(false);

  const addNewAnaglyph = () => {
    // setShowAddAnaglyph(true);
    dispatch(setAnaglyphModal(true));
    setAnaglyphId(null);
    setUpdate(false);
  };

  const updateAnaglyph = (id) => {
    // setShowAddAnaglyph(true);
    dispatch(setAnaglyphModal(true));
    setAnaglyphId(id);
    setUpdate(true);
  };

  // Delete 3D Modal
  const [deleteAnaglyphModal, setDeleteAnaglyphModal] = useState(false);
  const [deleteAnaglyphId, setDeleteAnaglyphId] = useState(null);
  const [deleteAnaglyphTitle, setDeleteAnaglyphTitle] = useState("");

  const confirmDeleteAnaglyph = (stat, id, title) => {
    setDeleteAnaglyphModal(stat);
    setDeleteAnaglyphId(id);
    setDeleteAnaglyphTitle(title);
  };

  // To switch between Anaglyph List and Details
  const [anaglyphDetailsId, setAnaglyphDetailsId] = useState(null);

  const viewAnaglyphDetailsEvent = (id) => {
    setShowAnaglyphDetails(true);
    setAnaglyphDetailsId(id);
  };

  return (
    <>
      <Tab.Panel>
        {!showAnaglyphDetails ? (
          <div>
            {/* 3D Table List */}
            <div className="flex md:flex-col xl:flex-row items-center mb-8 px-4">
              {(permissions.includes("all_anaglyph") ||
                permissions.includes("read_anaglyph") ||
                permissions.includes("Admin")) && (
                <div className="relative w-full xl:w-auto overflow-hidden">
                  <input
                    type="search"
                    className="w-full xl:w-[400px] bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                    name="anaglyph_search"
                    id="anaglyph_search"
                    placeholder="Search for 3D/Anaglyph..."
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
                {(permissions.includes("all_anaglyph") ||
                  permissions.includes("write_anaglyph") ||
                  permissions.includes("Admin")) &&
                  (permissions.includes("all_section") ||
                    permissions.includes("read_section") ||
                    permissions.includes("Admin")) && (
                    <button
                      type="button"
                      onClick={() => addNewAnaglyph()}
                      className="text-sm 2xl:text-base bg-primary text-white font-medium border border-primary px-6 py-2 rounded-full shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                    >
                      Add New 3D +
                    </button>
                  )}
              </div>
            </div>

            {/* Table List of Media Uploads */}
            <div className="w-full min-h-[500px] h-full xl:h-[500px] xl:px-4 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
              {!(
                permissions.includes("all_anaglyph") ||
                permissions.includes("read_anaglyph") ||
                permissions.includes("Admin")
              ) ? (
                <PermissionsMessage
                  additionalClassName="h-full py-[200px]"
                  title="3D/Anaglyph"
                  message="read 3D/anaglyph"
                />
              ) : (
                <>
                  <table className="table-auto text-left relative min-w-full max-h-full">
                    <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                      <tr>
                        <th
                          onClick={() =>
                            handleChangeSort(
                              sortByAnaglyphTitle,
                              "sortByAnaglyphTitle",
                            )
                          }
                          scope="col"
                          width="25%"
                          className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center ">
                            <span
                              className={
                                sortByAnaglyphTitle == 1 ||
                                sortByAnaglyphTitle == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Title
                            </span>
                            {sortByAnaglyphTitle == 1 ? (
                              <img
                                src="/assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByAnaglyphTitle == 2 ? (
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
                          onClick={() =>
                            handleChangeSort(
                              sortByAnaglyphSectionTitle,
                              "sortByAnaglyphSectionTitle",
                            )
                          }
                          className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center ">
                            <span
                              className={
                                sortByAnaglyphSectionTitle == 1 ||
                                sortByAnaglyphSectionTitle == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              {" "}
                              Section Title
                            </span>
                            {sortByAnaglyphSectionTitle == 1 ? (
                              <img
                                src="/assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByAnaglyphSectionTitle == 2 ? (
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
                          className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          Parts Count
                        </th>
                        <th
                          onClick={() =>
                            handleChangeSort(
                              sortByAnaglyphCreatedDate,
                              "sortByAnaglyphCreatedDate",
                            )
                          }
                          scope="col"
                          width="20%"
                          className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center ">
                            <span
                              className={
                                sortByAnaglyphCreatedDate == 1 ||
                                sortByAnaglyphCreatedDate == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Created On
                            </span>
                            {sortByAnaglyphCreatedDate == 1 ? (
                              <img
                                src="/assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByAnaglyphCreatedDate == 2 ? (
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
                          {(permissions.includes("all_anaglyph") ||
                            permissions.includes("update_anaglyph") ||
                            permissions.includes("delete_anaglyph") ||
                            permissions.includes("Admin")) && (
                            <span>Actions</span>
                          )}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {allAnaglyphLoading ? (
                        <tr>
                          <td colSpan="5">
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
                          {anaglyphList && anaglyphList.length > 0 ? (
                            <>
                              {anaglyphList.map((drawing, index) => {
                                const {
                                  id,
                                  title,
                                  section,
                                  parts_count,
                                  created_at,
                                } = drawing;
                                return (
                                  <tr
                                    valign="top"
                                    key={index}
                                    className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                  >
                                    <td width="25%" className="px-4 py-4">
                                      {!(
                                        permissions.includes("all_anaglyph") ||
                                        permissions.includes("read_anaglyph") ||
                                        permissions.includes("Admin")
                                      ) ? (
                                        <div className="w-[200px] text-ellipsis whitespace-nowrap overflow-hidden text-left text-sm font-medium capitalize">
                                          {title}
                                        </div>
                                      ) : (
                                        <button
                                          type="button"
                                          title={title}
                                          onClick={() =>
                                            viewAnaglyphDetailsEvent(id)
                                          }
                                          className="w-[200px] text-ellipsis whitespace-nowrap overflow-hidden text-left text-sm font-medium capitalize text-primary opacity-75 underline transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0"
                                        >
                                          {title}
                                        </button>
                                      )}
                                    </td>
                                    <td width="20%" className="px-4 py-4">
                                      <span className="w-[200px] text-ellipsis whitespace-nowrap overflow-hidden text-left text-sm font-medium capitalize">
                                        {section && section.title}
                                      </span>
                                    </td>
                                    <td width="15%" className="px-4 py-4">
                                      <span className="text-sm whitespace-nowrap">
                                        {parts_count}
                                      </span>
                                    </td>
                                    <td width="20%" className="px-4 py-4">
                                      <span className="text-sm whitespace-nowrap">
                                        {created_at}
                                      </span>
                                    </td>
                                    <td
                                      width="20%"
                                      className="px-4 py-4 whitespace-nowrap"
                                    >
                                      {(permissions.includes("all_anaglyph") ||
                                        permissions.includes(
                                          "delete_anaglyph",
                                        ) ||
                                        permissions.includes("Admin")) && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            confirmDeleteAnaglyph(
                                              true,
                                              id,
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

                                      {(permissions.includes("all_anaglyph") ||
                                        permissions.includes(
                                          "update_anaglyph",
                                        ) ||
                                        permissions.includes("Admin")) &&
                                        (permissions.includes("all_section") ||
                                          permissions.includes(
                                            "read_section",
                                          ) ||
                                          permissions.includes("Admin")) && (
                                          <button
                                            type="button"
                                            onClick={() => updateAnaglyph(id)}
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
                              colSpan={5}
                              searchQuery={searchQuery}
                              listLength={anaglyphList && anaglyphList.length}
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
            {(permissions.includes("all_anaglyph") ||
              permissions.includes("read_anaglyph") ||
              permissions.includes("Admin")) && (
              <div className="flex justify-end mt-8 px-4">
                {allAnaglyphLoading ? (
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
          </div>
        ) : (
          // A
          <AnaglyphDetails
            model_id={model_id}
            anaglyphDetailsId={anaglyphDetailsId}
            activeSubTab={activeSubTab}
            showAnaglyphDetails={showAnaglyphDetails}
            setShowAnaglyphDetails={setShowAnaglyphDetails}
          />
        )}
      </Tab.Panel>

      {/* Add Anaglyph */}
      {setShowAnaglyphModal && (
        <AddAnaglyph
          setShowAnaglyphModal={setShowAnaglyphModal}
          model_id={model_id}
          id={anaglyphId}
          setAnaglyphId={setAnaglyphId}
          update={update}
          setUpdate={setUpdate}
        />
      )}

      {/* Delete Anaglyph Modal */}
      {deleteAnaglyphModal && (
        <DeleteModal
          head="Remove 3D & Parts"
          body={[
            "Deleting",
            <strong className="capitalize break-all">
              {" "}
              "{deleteAnaglyphTitle}"{" "}
            </strong>,
            "3D & Parts will delete all 3D files and part data",
          ]}
          deleteAction={deleteAnaglyph}
          modalAction={setDeleteAnaglyphModal}
          modalValue={deleteAnaglyphModal}
          model_id={model_id}
          parentmodel={false}
          id={deleteAnaglyphId}
          deleteLoading={deleteAnaglyphLoading}
        />
      )}

      {viewAssetNotesListModal && (
        <AssetNotesListModal
          activeSubTab={3}
          model_id={model_id}
          viewAssetNotesListModal={viewAssetNotesListModal}
          setViewAssetNotesListModal={setViewAssetNotesListModal}
          assetNotiableType="Anaglyph"
          assetNotiableTypeId={assetNotiableTypeId}
        />
      )}
    </>
  );
};
export default AnaglyphPanel;
