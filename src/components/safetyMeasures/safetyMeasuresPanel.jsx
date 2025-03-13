import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeSafetyMeasuresSearch,
  deleteSafetyMeasure,
  getAllSafetyMeasures,
  setSafetyMeasuresModal,
  setUpdating,
} from "../../redux/reduxes/safetyMeasures/safetyMeasuresAction";
import Skeleton from "react-loading-skeleton";
import ChooseSafetyMeasures from "./chooseSafetyMeasures";
import DeleteModal from "../common/deleteModal";
import CreateSafetyMeasure from "./createSafetyMeasure";
import PaginatedItems from "../common/pagination";
import Filters from "../common/filters";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import AppliedFilters from "../common/appliedFilters";
import PermissionsMessage from "../common/permissionsMessage";
import ListDataNotFound from "../common/listDataNotFound";
import AssetNotesListModal from "../assetNotes/assetNotesListModal";

const SafetyMeasuresPanel = ({ model_id, activeSubTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const measures = useSelector(
    (state) => state.safety_measures.safetyMeasuresList,
  );
  const filters = useSelector((state) => state.safety_measures.filters);
  const pagination = useSelector(
    (state) => state.safety_measures.allSafetyMeasuresPagination,
  );
  const safetyMeasuresLoading = useSelector(
    (state) => state.safety_measures.allSafetyMeasuresLoading,
  );
  const sort = useSelector((state) => state.sort);
  const sortBySafetyMeasuresTitle = useSelector(
    (state) => state.sort.sortBySafetyMeasuresTitle,
  );
  const sortBySafetyMeasuresCreatedDate = useSelector(
    (state) => state.sort.sortBySafetyMeasuresCreatedDate,
  );
  const sortBySafetyMeasuresUpdatedDate = useSelector(
    (state) => state.sort.sortBySafetyMeasuresUpdatedDate,
  );
  const safetyMeasuresModal = useSelector(
    (state) => state.safety_measures.safetyMeasuresModal,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.safety_measures.searchSafetyMeasuresSearch,
  );
  const deleteSafetyMeasureLoading = useSelector(
    (state) => state.safety_measures.deleteSafetyMeasureLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Safety Measure Sort Data
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      filter: {},
      sort:
        sortBySafetyMeasuresTitle != 0
          ? sortBySafetyMeasuresTitle
          : sortBySafetyMeasuresCreatedDate != 0
          ? sortBySafetyMeasuresCreatedDate
          : sortBySafetyMeasuresUpdatedDate != 0
          ? sortBySafetyMeasuresUpdatedDate
          : 0,
      sorting:
        sortBySafetyMeasuresTitle != 0
          ? "title"
          : sortBySafetyMeasuresCreatedDate != 0
          ? "created_at"
          : sortBySafetyMeasuresUpdatedDate != 0
          ? "updated_at"
          : "",
    };
    if (activeSubTab === "safety-measures") {
      delayLoading && dispatch(getAllSafetyMeasures(data));
    }
  }, [sort]);

  // Dispatch to All Safety Measures
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      filter: {},
      sort:
        sortBySafetyMeasuresTitle != 0
          ? sortBySafetyMeasuresTitle
          : sortBySafetyMeasuresCreatedDate != 0
          ? sortBySafetyMeasuresCreatedDate
          : sortBySafetyMeasuresUpdatedDate != 0
          ? sortBySafetyMeasuresUpdatedDate
          : 0,
      sorting:
        sortBySafetyMeasuresTitle != 0
          ? "title"
          : sortBySafetyMeasuresCreatedDate != 0
          ? "created_at"
          : sortBySafetyMeasuresUpdatedDate != 0
          ? "updated_at"
          : "",
    };
    if (activeSubTab === "safety-measures") {
      dispatch(getAllSafetyMeasures(data));
    }
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Choose Safety Measures - Existing/New while Add a Safety Measure
  const [chooseSafetyMeasuresModal, setChooseSafetyMeasuresModal] =
    useState(false);

  const chooseSafetyMeasuresEvent = () => {
    setChooseSafetyMeasuresModal(true);
  };

  // Update Safety Measure Modal
  // const [updateSafetyMeasureModal, setUpdateSafetyMeasureModal] = useState(false);
  function setUpdateSafetyMeasureModal() {
    dispatch(setSafetyMeasuresModal(true));
  }
  const [updateSafetyMeasureId, setUpdateSafetyMeasureId] = useState(null);
  const updateSafetyMeasureEvent = (stat, id) => {
    setUpdateSafetyMeasureModal(stat);
    setUpdateSafetyMeasureId(id);

    dispatch(setUpdating(true));
  };

  // Delete Safety Measure Modal
  const [deleteSafetyMeasureModal, setDeleteSafetyMeasureModal] =
    useState(false);
  const [deleteSafetyMeasureId, setDeleteSafetyMeasureId] = useState(null);
  const [deleteSafetyMeasureTitle, setDeleteSafetyMeasureTitle] = useState("");

  const confirmDeleteSafetyMeasure = (stat, id, title) => {
    setDeleteSafetyMeasureModal(stat);
    setDeleteSafetyMeasureId(id);
    setDeleteSafetyMeasureTitle(title);
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
        sortBySafetyMeasuresTitle != 0
          ? sortBySafetyMeasuresTitle
          : sortBySafetyMeasuresCreatedDate != 0
          ? sortBySafetyMeasuresCreatedDate
          : sortBySafetyMeasuresUpdatedDate != 0
          ? sortBySafetyMeasuresUpdatedDate
          : 0,
      sorting:
        sortBySafetyMeasuresTitle != 0
          ? "title"
          : sortBySafetyMeasuresCreatedDate != 0
          ? "created_at"
          : sortBySafetyMeasuresUpdatedDate != 0
          ? "updated_at"
          : "",
    };
    if (activeSubTab === "safety-measures") {
      dispatch(getAllSafetyMeasures(data));
    }
  }, [searchQuery]);

  // Search Safety Measures
  const handleSearchChange = (searchData) => {
    dispatch(changeSafetyMeasuresSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      page: e.selected,
      limit: 10,
      search: searchQuery,
      model_id: model_id,
      filter: filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortBySafetyMeasuresTitle != 0
          ? sortBySafetyMeasuresTitle
          : sortBySafetyMeasuresCreatedDate != 0
          ? sortBySafetyMeasuresCreatedDate
          : sortBySafetyMeasuresUpdatedDate != 0
          ? sortBySafetyMeasuresUpdatedDate
          : 0,
      sorting:
        sortBySafetyMeasuresTitle != 0
          ? "title"
          : sortBySafetyMeasuresCreatedDate != 0
          ? "created_at"
          : sortBySafetyMeasuresUpdatedDate != 0
          ? "updated_at"
          : "",
    };
    if (activeSubTab === "safety-measures") {
      dispatch(getAllSafetyMeasures(data));
    }
  };

  // Safety Measures Sort
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
  const [viewAssetNotesListModal, setViewAssetNotesListModal] = useState(false);
  const [assetNotiableTypeId, setAssetNotiableTypeId] = useState(null);

  const assetNotesListEvent = (stat, trouble_id) => {
    setViewAssetNotesListModal(stat);
    setAssetNotiableTypeId(trouble_id);
  };

  return (
    <>
      <Tab.Panel>
        <div className="flex md:flex-col xl:flex-row items-center mb-8 px-4">
          {(permissions.includes("all_safety_measure") ||
            permissions.includes("read_safety_measure") ||
            permissions.includes("Admin")) && (
            <div className="relative w-full xl:w-auto overflow-hidden">
              <input
                type="search"
                className="w-full xl:w-[400px] bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                name="safety_measures_search"
                id="safety_measures_search"
                placeholder="Search for Safety Measures..."
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
            {(permissions.includes("all_safety_measure") ||
              permissions.includes("write_safety_measure") ||
              permissions.includes("Admin")) && (
              <button
                type="button"
                onClick={() => setChooseSafetyMeasuresModal(true)}
                className="bg-primary text-white text-sm 2xl:text-base font-medium border border-primary px-6 py-2 mr-6 rounded-full duration-300 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
              >
                Add Safety Measure +
              </button>
            )}

            {/* Filters : Start */}
            {(permissions.includes("all_safety_measure") ||
              permissions.includes("read_safety_measure") ||
              permissions.includes("Admin")) && (
              <Filters
                filters={filters}
                getListAction={getAllSafetyMeasures}
                model_id={model_id}
                limit={10}
                sort={
                  sortBySafetyMeasuresTitle != 0
                    ? sortBySafetyMeasuresTitle
                    : sortBySafetyMeasuresCreatedDate != 0
                    ? sortBySafetyMeasuresCreatedDate
                    : sortBySafetyMeasuresUpdatedDate != 0
                    ? sortBySafetyMeasuresUpdatedDate
                    : 0
                }
                sorting={
                  sortBySafetyMeasuresTitle != 0
                    ? "title"
                    : sortBySafetyMeasuresCreatedDate != 0
                    ? "created_at"
                    : sortBySafetyMeasuresUpdatedDate != 0
                    ? "updated_at"
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
              sortBySafetyMeasuresTitle != 0
                ? sortBySafetyMeasuresTitle
                : sortBySafetyMeasuresCreatedDate != 0
                ? sortBySafetyMeasuresCreatedDate
                : sortBySafetyMeasuresUpdatedDate != 0
                ? sortBySafetyMeasuresUpdatedDate
                : 0
            }
            sorting={
              sortBySafetyMeasuresTitle != 0
                ? "title"
                : sortBySafetyMeasuresCreatedDate != 0
                ? "created_at"
                : sortBySafetyMeasuresUpdatedDate != 0
                ? "updated_at"
                : ""
            }
            filters={filters}
            getActionList={getAllSafetyMeasures}
          />
        </div>

        {/* Table List of Troubleshoot */}
        <div className="w-full min-h-[500px] h-full xl:h-[500px] xl:px-4 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          {!(
            permissions.includes("all_safety_measure") ||
            permissions.includes("read_safety_measure") ||
            permissions.includes("Admin")
          ) ? (
            <PermissionsMessage
              additionalClassName="h-full py-[200px]"
              title="Safety Measures"
              message="read safety measure"
            />
          ) : (
            <>
              <table className="table-auto text-left relative min-w-full max-h-full">
                <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                  <tr>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortBySafetyMeasuresTitle,
                          "sortBySafetyMeasuresTitle",
                        )
                      }
                      scope="col"
                      width="30%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortBySafetyMeasuresTitle == 1 ||
                            sortBySafetyMeasuresTitle == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Title
                        </span>
                        {sortBySafetyMeasuresTitle == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortBySafetyMeasuresTitle == 2 ? (
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
                      Linked Media
                    </th>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortBySafetyMeasuresCreatedDate,
                          "sortBySafetyMeasuresCreatedDate",
                        )
                      }
                      scope="col"
                      width="20%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortBySafetyMeasuresCreatedDate == 1 ||
                            sortBySafetyMeasuresCreatedDate == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Created On
                        </span>
                        {sortBySafetyMeasuresCreatedDate == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortBySafetyMeasuresCreatedDate == 2 ? (
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
                      onClick={() =>
                        handleChangeSort(
                          sortBySafetyMeasuresUpdatedDate,
                          "sortBySafetyMeasuresUpdatedDate",
                        )
                      }
                      scope="col"
                      width="20%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortBySafetyMeasuresUpdatedDate == 1 ||
                            sortBySafetyMeasuresUpdatedDate == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Last Updated
                        </span>
                        {sortBySafetyMeasuresUpdatedDate == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortBySafetyMeasuresUpdatedDate == 2 ? (
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
                      Actions
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
                                key={id}
                                className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                              >
                                <td width="30%" className="px-4 py-4">
                                  {!(
                                    permissions.includes(
                                      "all_safety_measure",
                                    ) ||
                                    permissions.includes(
                                      "update_safety_measure",
                                    ) ||
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
                                        updateSafetyMeasureEvent(true, id)
                                      }
                                      className="w-[250px] text-ellipsis whitespace-nowrap overflow-hidden text-sm text-left font-medium capitalize text-primary break-all opacity-75 underline transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0"
                                    >
                                      {title}
                                    </button>
                                  )}
                                </td>
                                <td width="20%" className="px-4 py-4">
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
                                <td width="10%" className="px-4 py-4">
                                  <div className="flex items-center justify-start">
                                    {(permissions.includes(
                                      "all_safety_measure",
                                    ) ||
                                      permissions.includes(
                                        "delete_safety_measure",
                                      ) ||
                                      permissions.includes("Admin")) && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          confirmDeleteSafetyMeasure(
                                            true,
                                            id,
                                            title,
                                          )
                                        }
                                        className="focus:outline-0"
                                        title="Delete"
                                      >
                                        <img
                                          src="/assets/icons/icon-delete.svg"
                                          alt="icon-delete"
                                          className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert opacity-80 transition-all duration hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                        />
                                      </button>
                                    )}

                                    {(permissions.includes(
                                      "all_safety_measure",
                                    ) ||
                                      permissions.includes(
                                        "update_safety_measure",
                                      ) ||
                                      permissions.includes("Admin")) && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateSafetyMeasureEvent(true, id)
                                        }
                                        className="focus:outline-0"
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
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <ListDataNotFound
                          colSpan={5}
                          searchQuery={searchQuery}
                          listLength={measures && measures.length}
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
        {(permissions.includes("all_safety_measure") ||
          permissions.includes("read_safety_measure") ||
          permissions.includes("Admin")) && (
          <div className="flex justify-end mt-8 px-4">
            {safetyMeasuresLoading ? (
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
        {/* Choosing Safety Measures from Existing or Create New */}
        <ChooseSafetyMeasures
          chooseSafetyMeasuresModal={chooseSafetyMeasuresModal}
          setChooseSafetyMeasuresModal={setChooseSafetyMeasuresModal}
          model_id={model_id}
        />

        {/* Update Safety Measure Modal */}
        {safetyMeasuresModal && (
          <CreateSafetyMeasure
            addSafetyMeasuresModal={safetyMeasuresModal}
            // setAddSafetyMeasuresModal={setUpdateSafetyMeasureModal}
            model_id={model_id}
            id={updateSafetyMeasureId}
          />
        )}

        {/* Delete Safety Measure Modal */}
        {deleteSafetyMeasureModal && (
          <DeleteModal
            head="Remove Safety Measure"
            body={[
              "Are you sure you want to remove",
              <strong className="capitalize break-all">
                {" "}
                "{deleteSafetyMeasureTitle}"{" "}
              </strong>,
              "Safety Measure from the list?",
            ]}
            deleteAction={deleteSafetyMeasure}
            modalAction={setDeleteSafetyMeasureModal}
            modalValue={deleteSafetyMeasureModal}
            parentmodel={false}
            id={deleteSafetyMeasureId}
            model_id={model_id}
            deleteLoading={deleteSafetyMeasureLoading}
          />
        )}

        {/* View Asset Notes List Modal */}
        {viewAssetNotesListModal && (
          <AssetNotesListModal
            activeSubTab={2}
            model_id={model_id}
            viewAssetNotesListModal={viewAssetNotesListModal}
            setViewAssetNotesListModal={setViewAssetNotesListModal}
            assetNotiableType="SafetyMeasure"
            assetNotiableTypeId={assetNotiableTypeId}
          />
        )}
      </Tab.Panel>
    </>
  );
};
export default SafetyMeasuresPanel;
