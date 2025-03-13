import React, { useState, useEffect, Fragment } from "react";
import { Tab, Transition, Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import {
  getAllWrittenIssues,
  deleteWrittenIssue,
  setWrittenIssuesModal,
  changeWrittenIssuesSearch,
} from "../../redux/reduxes/writtenIssues/writtenIssueAction";
import CreateWrittenIssue from "./createWrittenIssue";
import WrittenIssueDetails from "./writtenIssueDetails";
import DeleteModal from "../common/deleteModal";
import Filters from "../common/filters";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import AppliedFilters from "../common/appliedFilters";
import PermissionsMessage from "../common/permissionsMessage";
import ListDataNotFound from "../common/listDataNotFound";
// import AssetNotesListModal from "../assetNotes/assetNotesListModal";

const WrittenIssuesPanel = ({ model_id, activeSubTab }) => {
  const dispatch = useDispatch();

  // Fetch the data
  const issuesLoading = useSelector(
    (state) => state.written_issues.writtenIssuesLoading,
  );
  const issues = useSelector((state) => state.written_issues.writtenIssuesList);
  const allWIPagination = useSelector(
    (state) => state.written_issues.allWrittenIssuesPagination,
  );
  const filters = useSelector((state) => state.written_issues.filters);
  const createdNewWrittenIssue = useSelector(
    (state) => state.written_issues.createdNewWrittenIssue,
  );
  const createdWrittenIssueDetails = useSelector(
    (state) => state.written_issues.createdWrittenIssueDetails,
  );
  const sort = useSelector((state) => state.sort);
  const sortByWrittenIssueName = useSelector(
    (state) => state.sort.sortByWrittenIssueName,
  );
  const sortByWrittenIssueCreatedDate = useSelector(
    (state) => state.sort.sortByWrittenIssueCreatedDate,
  );
  const writtenIssuesModal = useSelector(
    (state) => state.written_issues.writtenIssuesModal,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.written_issues.searchWrittenIssuesQuery,
  );
  const deleteWrittenIssueLoading = useSelector(
    (state) => state.written_issues.deleteWrittenIssueLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);
  // Dispatch Sort Data
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByWrittenIssueName != 0
          ? sortByWrittenIssueName
          : sortByWrittenIssueCreatedDate != 0
          ? sortByWrittenIssueCreatedDate
          : 0,
      sorting:
        sortByWrittenIssueName != 0
          ? "name"
          : sortByWrittenIssueCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "written-issues") {
      delayLoading && dispatch(getAllWrittenIssues(data));
    }
  }, [sort]);

  // Dispatch All
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByWrittenIssueName != 0
          ? sortByWrittenIssueName
          : sortByWrittenIssueCreatedDate != 0
          ? sortByWrittenIssueCreatedDate
          : 0,
      sorting:
        sortByWrittenIssueName != 0
          ? "name"
          : sortByWrittenIssueCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "written-issues") {
      dispatch(getAllWrittenIssues(data));
    }
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Set Pagination
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    setPagination(allWIPagination);
  }, [allWIPagination]);

  function setAddWrittenIssueModal() {
    dispatch(setWrittenIssuesModal(true));
  }

  // Create/Add Written Issue Modal
  const [showWrittenIssueModal, setShowWrittenIssueModal] = useState(false);
  // const [addWrittenIssueModal, setAddWrittenIssueModal] = useState(false);
  const [editWrittenIssueId, setEditWrittenIssueId] = useState(null);
  const [editSectionId, setEditSectionId] = useState(null);

  // Open Written Issue
  const openWrittenIssue = (wi_id, section_id) => {
    setShowWrittenIssueModal(true);
    setEditWrittenIssueId(wi_id);
    setEditSectionId(section_id);
  };

  // Open the Steps Modal
  useEffect(() => {
    createdNewWrittenIssue &&
      createdWrittenIssueDetails &&
      openWrittenIssue(
        createdWrittenIssueDetails.id,
        createdWrittenIssueDetails.section_id,
      );
  }, [createdNewWrittenIssue]);

  // Edit the Written Issue
  const editThisWrittenIssue = (wi_id, section_id) => {
    setEditWrittenIssueId(wi_id);
    setEditSectionId(section_id);
    setShowWrittenIssueModal(true);
  };

  // Delete the Written Issue
  const [deleteWrittenIssueModal, setDeleteWrittenIssueModal] = useState(false);
  const [deleteWrittenIssueId, setDeleteWrittenIssueId] = useState(false);
  const [deleteWrittenIssueName, setDeleteWrittenIssueName] = useState("");
  const [deleteSectionId, setDeleteSectionId] = useState(null);

  const deleteThisWrittenIssue = (x, name, section_id) => {
    setDeleteWrittenIssueId(x);
    setDeleteSectionId(section_id);
    setDeleteWrittenIssueName(name);
    setDeleteWrittenIssueModal(true);
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
        sortByWrittenIssueName != 0
          ? sortByWrittenIssueName
          : sortByWrittenIssueCreatedDate != 0
          ? sortByWrittenIssueCreatedDate
          : 0,
      sorting:
        sortByWrittenIssueName != 0
          ? "name"
          : sortByWrittenIssueCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "written-issues") {
      dispatch(getAllWrittenIssues(data));
    }
  }, [searchQuery]);

  // Search
  const handleSearchChange = (searchData) => {
    dispatch(changeWrittenIssuesSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      page: e.selected,
      search: searchQuery,
      limit: 10,
      model_id: model_id,
      filter: filters.selected ? filters.selected : {},
      sort:
        sortByWrittenIssueName != 0
          ? sortByWrittenIssueName
          : sortByWrittenIssueCreatedDate != 0
          ? sortByWrittenIssueCreatedDate
          : 0,
      sorting:
        sortByWrittenIssueName != 0
          ? "name"
          : sortByWrittenIssueCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "written-issues") {
      dispatch(getAllWrittenIssues(data));
    }
  };

  // Backdrop that stops from Closing the Modal
  const handleModalBackdrop = () => {};

  // Wriiten Issues Sort
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

  // const assetNotesListEvent = (stat, written_issue_id) => {
  //   setViewAssetNotesListModal(stat);
  //   setAssetNotiableTypeId(written_issue_id);
  // }

  return (
    <>
      <Tab.Panel>
        <div className="flex md:flex-col xl:flex-row items-center mb-8 px-4">
          {(permissions.includes("all_writtenissue") ||
            permissions.includes("read_writtenissue") ||
            permissions.includes("Admin")) && (
            <div className="relative w-full xl:w-auto overflow-hidden">
              <input
                type="search"
                className="w-full xl:w-[400px] bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                name="manuals_search"
                id="manuals_search"
                placeholder="Search for Written Issues..."
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
            {(permissions.includes("all_writtenissue") ||
              (permissions.includes("write_writtenissue") &&
                permissions.includes("read_writtenissue")) ||
              permissions.includes("Admin")) &&
              (permissions.includes("all_section") ||
                permissions.includes("read_section") ||
                permissions.includes("Admin")) && (
                <button
                  type="button"
                  onClick={() => setAddWrittenIssueModal(true)}
                  className="bg-primary text-white text-sm 2xl:text-base font-medium border border-primary px-6 py-2 mr-6 rounded-full shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                >
                  Add Written Issue +
                </button>
              )}

            {/* Filters : Start */}
            {(permissions.includes("all_writtenissue") ||
              permissions.includes("read_writtenissue") ||
              permissions.includes("Admin")) && (
              <Filters
                filters={filters}
                getListAction={getAllWrittenIssues}
                model_id={model_id}
                limit={10}
                sort={
                  sortByWrittenIssueName != 0
                    ? sortByWrittenIssueName
                    : sortByWrittenIssueCreatedDate != 0
                    ? sortByWrittenIssueCreatedDate
                    : 0
                }
                sorting={
                  sortByWrittenIssueName != 0
                    ? "name"
                    : sortByWrittenIssueCreatedDate != 0
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
              sortByWrittenIssueName != 0
                ? sortByWrittenIssueName
                : sortByWrittenIssueCreatedDate != 0
                ? sortByWrittenIssueCreatedDate
                : 0
            }
            sorting={
              sortByWrittenIssueName != 0
                ? "name"
                : sortByWrittenIssueCreatedDate != 0
                ? "created_at"
                : ""
            }
            filters={filters}
            getActionList={getAllWrittenIssues}
          />
        </div>

        {/* Table List of Media Uploads */}
        <div className="w-full min-h-[500px] h-full xl:h-[500px] xl:px-4 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          {!(
            permissions.includes("all_writtenissue") ||
            permissions.includes("read_writtenissue") ||
            permissions.includes("Admin")
          ) ? (
            <PermissionsMessage
              additionalClassName="h-full py-[200px]"
              title="Written Issues"
              message="read written issues"
            />
          ) : (
            <>
              <table className="table-auto text-left relative min-w-full max-h-full">
                <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                  <tr>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortByWrittenIssueName,
                          "sortByWrittenIssueName",
                        )
                      }
                      scope="col"
                      width="30%"
                      className="px-4 py-3 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByWrittenIssueName == 1 ||
                            sortByWrittenIssueName == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Issue
                        </span>
                        {sortByWrittenIssueName == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByWrittenIssueName == 2 ? (
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
                      className="px-4 py-3 text-sm uppercase whitespace-nowrap"
                    >
                      Section Title
                    </th>
                    <th
                      scope="col"
                      width="15%"
                      className="px-4 py-3 text-sm uppercase whitespace-nowrap"
                    >
                      Solution
                    </th>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortByWrittenIssueCreatedDate,
                          "sortByWrittenIssueCreatedDate",
                        )
                      }
                      scope="col"
                      width="20%"
                      className="px-4 py-3 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByWrittenIssueCreatedDate == 1 ||
                            sortByWrittenIssueCreatedDate == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Created On
                        </span>
                        {sortByWrittenIssueCreatedDate == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByWrittenIssueCreatedDate == 2 ? (
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
                      className="px-4 py-3 text-sm uppercase whitespace-nowrap"
                    >
                      {(permissions.includes("all_writtenissue") ||
                        permissions.includes("read_writtenissue") ||
                        permissions.includes("write_writtenissue") ||
                        permissions.includes("delete_writtenissue") ||
                        permissions.includes("Admin")) && <span>Actions</span>}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {issuesLoading ? (
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
                      {issues && issues.length > 0 ? (
                        <>
                          {issues.map((issue, index) => {
                            const {
                              id,
                              name,
                              section_title,
                              solution_count,
                              section_id,
                              created_at,
                            } = issue;
                            return (
                              <tr
                                valign="top"
                                key={id}
                                className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                              >
                                <td width="30%" className="px-4 py-4">
                                  {!(
                                    permissions.includes("all_writtenissue") ||
                                    permissions.includes("read_writtenissue") ||
                                    permissions.includes("Admin")
                                  ) ? (
                                    <div className="w-[200px] text-ellipsis whitespace-nowrap overflow-hidden text-left text-sm font-medium capitalize">
                                      {name}
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      title={name}
                                      onClick={() =>
                                        openWrittenIssue(id, section_id)
                                      }
                                      className="w-[200px] text-ellipsis whitespace-nowrap overflow-hidden text-left text-sm font-medium capitalize text-primary opacity-75 underline transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0"
                                    >
                                      {name}
                                    </button>
                                  )}
                                </td>
                                <td width="20%" className="px-4 py-4">
                                  {section_title}
                                </td>
                                <td width="15%" className="px-4 py-4">
                                  {solution_count}
                                </td>
                                <td
                                  width="20%"
                                  className="px-4 py-4 text-sm whitespace-nowrap"
                                >
                                  {created_at}
                                </td>
                                <td
                                  width="15%"
                                  className="px-4 py-4 whitespace-nowrap"
                                >
                                  {(permissions.includes("all_writtenissue") ||
                                    permissions.includes(
                                      "delete_writtenissue",
                                    ) ||
                                    permissions.includes("Admin")) && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteThisWrittenIssue(
                                          id,
                                          name,
                                          section_id,
                                        )
                                      }
                                      className=""
                                      title="Delete"
                                    >
                                      <img
                                        src="/assets/icons/icon-delete.svg"
                                        alt="icon-delete"
                                        className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                      />
                                    </button>
                                  )}

                                  {(permissions.includes("all_writtenissue") ||
                                    permissions.includes("read_writtenissue") ||
                                    permissions.includes("Admin")) && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        editThisWrittenIssue(id, section_id)
                                      }
                                      className=""
                                      title="Edit"
                                    >
                                      <img
                                        src="/assets/icons/icon-edit.svg"
                                        alt="icon-edit"
                                        className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                      />
                                    </button>
                                  )}

                                  {/* {(permissions.includes("all_writtenissue") || permissions.includes("write_writtenissue") || permissions.includes("Admin")) &&
                                    <button type="button" onClick={() => assetNotesListEvent(true, id)} className="focus:outline-0">
                                      <img src="/assets/icons/icon-note.svg" alt="icon-note" className="min-w-[20px] min-h-[20px] w-[20px] h-[20px] ml-4 opacity-80 dark:invert transition-all duration-300 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all" />
                                    </button>
                                  } */}
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <ListDataNotFound
                          colSpan={5}
                          searchQuery={searchQuery}
                          listLength={issues && issues.length}
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
        {(permissions.includes("all_writtenissue") ||
          permissions.includes("read_writtenissue") ||
          permissions.includes("Admin")) && (
          <div className="flex justify-end mt-8 px-4">
            {issuesLoading ? (
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

        {/* Add/Create Written Issue */}
        {writtenIssuesModal && (
          <CreateWrittenIssue
            showWrittenIssueModal={writtenIssuesModal}
            // setShowWrittenIssueModal={setAddWrittenIssueModal}
            model_id={model_id}
          />
        )}
        {/*  Written Issue Details Popup  : Start */}
        <Transition appear show={showWrittenIssueModal} as={Fragment}>
          <Dialog
            as="div"
            open={showWrittenIssueModal}
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
                <WrittenIssueDetails
                  tabName="Step 1"
                  addNewTab="Add Step"
                  actionName="Add"
                  section_id={editSectionId}
                  model_id={model_id}
                  setShowWrittenIssueModal={setShowWrittenIssueModal}
                  wi_id={editWrittenIssueId}
                />
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
        {/*  Written Issue Details Popup : End */}

        {/* Delete Written Issue Modal */}
        {deleteWrittenIssueModal && (
          <DeleteModal
            head="Remove Written Issue"
            body={[
              "Are you sure you want to remove",
              <strong className="capitalize break-all">
                {" "}
                "{deleteWrittenIssueName}"{" "}
              </strong>,
              "Written Issue from the list?",
            ]}
            deleteAction={deleteWrittenIssue}
            modalAction={setDeleteWrittenIssueModal}
            modalValue={deleteWrittenIssueModal}
            parentmodel={false}
            wi_id={deleteWrittenIssueId}
            model_id={model_id}
            section_id={deleteSectionId}
            deleteLoading={deleteWrittenIssueLoading}
          />
        )}

        {/* View Asset Notes List Modal */}
        {/* {viewAssetNotesListModal &&
        <AssetNotesListModal
          activeSubTab={1}
          model_id={model_id}
          viewAssetNotesListModal={viewAssetNotesListModal}
          setViewAssetNotesListModal={setViewAssetNotesListModal}
          assetNotiableType="WrittenIssue"
          assetNotiableTypeId={assetNotiableTypeId}
        />
      } */}
      </Tab.Panel>
    </>
  );
};
export default WrittenIssuesPanel;
