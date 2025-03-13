import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import AddNewSection from "./addNewSection";
import {
  getAllSections,
  deleteSection,
  setSectionModal,
  changeSectionsSearch,
} from "../../redux/reduxes/sections/sectionAction";
import DeleteModal from "../common/deleteModal";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import ListDataNotFound from "../common/listDataNotFound";
import PermissionsMessage from "../common/permissionsMessage";

const SectionPanel = ({ model_id, activeMainTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const sectionsLoading = useSelector(
    (state) => state.sections.allSectionsLoading,
  );
  const sectionsList = useSelector((state) => state.sections.sectionsList);
  const pagination = useSelector(
    (state) => state.sections.allSectionsPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortBySectionTitle = useSelector(
    (state) => state.sort.sortBySectionTitle,
  );
  const sortByAnimationCreatedDate = useSelector(
    (state) => state.sort.sortByAnimationCreatedDate,
  );
  const showSectionModal = useSelector(
    (state) => state.sections.showSectionModal,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.sections.searchSectionsQuery,
  );
  const deleteSectionLoading = useSelector(
    (state) => state.sections.deleteSectionLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Data
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      sort:
        sortBySectionTitle != 0
          ? sortBySectionTitle
          : sortByAnimationCreatedDate != 0
          ? sortByAnimationCreatedDate
          : 0,
      sorting:
        sortBySectionTitle != 0
          ? "title"
          : sortByAnimationCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeMainTab === 3 && data?.model_id) {
      console.log(data?.model_id);
      delayLoading && dispatch(getAllSections(data));
    }
  }, [sort]);

  // Dispatch Sections
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      sort:
        sortBySectionTitle != 0
          ? sortBySectionTitle
          : sortByAnimationCreatedDate != 0
          ? sortByAnimationCreatedDate
          : 0,
      sorting:
        sortBySectionTitle != 0
          ? "title"
          : sortByAnimationCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeMainTab === 3 && data?.model_id) {
      dispatch(getAllSections(data));
    }
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Set Modal
  function showSectionsModal(stat) {
    dispatch(setSectionModal(stat));
  }

  // Update Section Modal
  const [secId, setSecId] = useState(null);
  const [update, setUpdate] = useState(false);

  // Add Section
  const addSection = () => {
    setSecId(null);
    showSectionsModal(true);
    setUpdate(false);
  };

  // Update Section
  const updateSection = (section_id) => {
    setSecId(section_id);
    showSectionsModal(true);
    setUpdate(true);
  };

  // Delete a Section Modal
  const [deleteSectionModal, setDeleteSectionModal] = useState(false);
  const [deleteSectionId, setDeleteSectionId] = useState(null);
  const [deleteSectionTitle, setDeleteSectionTitle] = useState("");

  const confirmDeleteSection = (stat, id, title) => {
    setDeleteSectionModal(stat);
    setDeleteSectionId(id);
    setDeleteSectionTitle(title);
  };

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      sort:
        sortBySectionTitle != 0
          ? sortBySectionTitle
          : sortByAnimationCreatedDate != 0
          ? sortByAnimationCreatedDate
          : 0,
      sorting:
        sortBySectionTitle != 0
          ? "title"
          : sortByAnimationCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeMainTab === 3 && data?.model_id) {
      dispatch(getAllSections(data));
    }
  }, [searchQuery]);

  // Search Section
  const handleSearchChange = (searchData) => {
    dispatch(changeSectionsSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      limit: 10,
      model_id: model_id,
      sort:
        sortBySectionTitle != 0
          ? sortBySectionTitle
          : sortByAnimationCreatedDate != 0
          ? sortByAnimationCreatedDate
          : 0,
      sorting:
        sortBySectionTitle != 0
          ? "title"
          : sortByAnimationCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeMainTab === 3 && data?.model_id) {
      dispatch(getAllSections(data));
    }
  };

  // Sections Sort
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
        <div className="w-full h-full bg-white dark:bg-darkBg pb-8 text-black2 dark:text-gray2 border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md">
          <div className="flex md:flex-col xl:flex-row items-center px-6 xl:px-8 pt-8 mb-8">
            {/* Search : Start */}
            {(permissions.includes("all_section") ||
              permissions.includes("read_section") ||
              permissions.includes("Admin")) && (
              <div className="flex items-center justify-between w-full xl:w-[400px]">
                <div className="relative w-full xl:w-[400px] overflow-hidden">
                  <input
                    type="search"
                    className="w-full bg-white dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                    name="section_search"
                    id="section_search"
                    placeholder="Search for Section..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                  <div className="absolute top-3.5 right-5 block m-auto">
                    <img
                      src="../assets/icons/icon-search.svg"
                      alt="icon-search"
                      className="w-4 h-4 block m-auto dark:invert"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center ml-auto md:mt-5 xl:mt-0">
              {(permissions.includes("all_section") ||
                permissions.includes("write_section") ||
                permissions.includes("Admin")) && (
                <button
                  type="button"
                  onClick={() => addSection()}
                  className="text-sm 2xl:text-base bg-primary text-white font-medium border border-primary px-6 py-2 rounded-full shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                >
                  Add New Section +
                </button>
              )}

              {/* Filters : Start */}
              {/* <Filters /> */}
            </div>
          </div>

          {/* Sections Table List : Start */}
          <div className="w-full min-h-[500px] h-full xl:h-[520px] mb-8 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
            {!(
              permissions.includes("all_section") ||
              permissions.includes("read_section") ||
              permissions.includes("Admin")
            ) ? (
              <PermissionsMessage
                additionalClassName="h-full py-[200px]"
                title="All Sections"
                message="read section"
              />
            ) : (
              <>
                <table className="table-auto text-left relative min-w-full max-h-full">
                  <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                    <tr>
                      <th
                        onClick={() =>
                          handleChangeSort(
                            sortBySectionTitle,
                            "sortBySectionTitle",
                          )
                        }
                        scope="col"
                        width="60%"
                        className="px-4 xl:px-8 py-4 text-sm uppercase  whitespace-nowrap"
                      >
                        <div className="flex items-center">
                          <span
                            className={
                              sortBySectionTitle == 1 || sortBySectionTitle == 2
                                ? "text-primary"
                                : ""
                            }
                          >
                            Section Name
                          </span>
                          {sortBySectionTitle == 1 ? (
                            <img
                              src="../assets/icons/icon-sort-asc.svg"
                              alt="icon-sort-asc"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          ) : sortBySectionTitle == 2 ? (
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
                        onClick={() =>
                          handleChangeSort(
                            sortByAnimationCreatedDate,
                            "sortByAnimationCreatedDate",
                          )
                        }
                        scope="col"
                        width="25%"
                        className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                      >
                        <div className="flex items-center justify-start">
                          <span
                            className={
                              sortByAnimationCreatedDate == 1 ||
                              sortByAnimationCreatedDate == 2
                                ? "text-primary"
                                : ""
                            }
                          >
                            Created On
                          </span>
                          {sortByAnimationCreatedDate == 1 ? (
                            <img
                              src="../assets/icons/icon-sort-asc.svg"
                              alt="icon-sort-asc"
                              className="w-[15px] h-[15px] ml-[2px] dark:invert"
                            />
                          ) : sortByAnimationCreatedDate == 2 ? (
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
                        width="15%"
                        className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                      >
                        {(permissions.includes("all_section") ||
                          permissions.includes("update_section") ||
                          permissions.includes("delete_section") ||
                          permissions.includes("Admin")) && (
                          <span>Actions</span>
                        )}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {sectionsLoading ? (
                      <tr>
                        <td colSpan="3">
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
                        {sectionsList && sectionsList.length > 0 ? (
                          <>
                            {sectionsList.map((section, index) => {
                              const { id, title, created_at } = section;
                              return (
                                <tr
                                  valign="top"
                                  className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                  key={id}
                                >
                                  <td
                                    width="60%"
                                    className="px-4 xl:px-8 py-4 break-all capitalize"
                                  >
                                    {" "}
                                    {title}
                                  </td>
                                  <td
                                    width="25%"
                                    className="px-4 xl:px-8 py-4 text-sm"
                                  >
                                    {" "}
                                    {created_at}
                                  </td>
                                  <td
                                    width="15%"
                                    className="px-4 xl:px-8 py-4 whitespace-nowrap"
                                  >
                                    {title != "General Section" && (
                                      <>
                                        {(permissions.includes("all_section") ||
                                          permissions.includes(
                                            "delete_section",
                                          ) ||
                                          permissions.includes("Admin")) && (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              confirmDeleteSection(
                                                true,
                                                id,
                                                title,
                                              )
                                            }
                                            className=" focus-visible:outline-none"
                                            title="Delete"
                                          >
                                            <img
                                              src="../assets/icons/icon-delete.svg"
                                              alt="icon-delete"
                                              className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                            />
                                          </button>
                                        )}

                                        {(permissions.includes("all_section") ||
                                          permissions.includes(
                                            "update_section",
                                          ) ||
                                          permissions.includes("Admin")) && (
                                          <button
                                            type="button"
                                            onClick={() => updateSection(id)}
                                            className=" focus-visible:outline-none"
                                            title="Edit"
                                          >
                                            <img
                                              src="../assets/icons/icon-edit.svg"
                                              alt="icon-edit"
                                              className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                            />
                                          </button>
                                        )}
                                      </>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        ) : (
                          <ListDataNotFound
                            colSpan={2}
                            searchQuery={searchQuery}
                            filter={[]}
                            listLength={sectionsList && sectionsList.length}
                          />
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>
          {/* Sections Table List : End */}

          {/* Pagination */}
          {(permissions.includes("all_section") ||
            permissions.includes("read_section") ||
            permissions.includes("Admin")) && (
            <div className="flex justify-end mt-8 px-4">
              {sectionsLoading ? (
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
      </Tab.Panel>

      {/* Add New Section Modal Component */}
      {showSectionModal && (
        <AddNewSection
          showSectionsModal={showSectionModal}
          // setShowSectionsModal={setShowSectionsModal}
          id={model_id}
          update={update}
          secId={secId}
          setSecId={setSecId}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteSectionModal && (
        <DeleteModal
          head="Remove Section"
          body={[
            "If you wish to delete",
            <strong className="capitalize break-all">
              {" "}
              "{deleteSectionTitle}"{" "}
            </strong>,
            "all Manuals, Device Drawings, Animations and Written Issues linked to the same will automatically move to the General Section. Please Confirm.",
          ]}
          deleteAction={deleteSection}
          modalAction={setDeleteSectionModal}
          modalValue={deleteSectionModal}
          parentmodel={false}
          id={deleteSectionId}
          model_id={model_id}
          deleteLoading={deleteSectionLoading}
        />
      )}
    </>
  );
};
export default SectionPanel;
