import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../common/pagination";
import CreateErrorCode from "./createErrorCode";
import {
  deleteErrorCode,
  getAllErrorCodes,
  setErrorCodeModal,
  changeErrorCodesSearch,
} from "../../../redux/reduxes/errorCodes/errorCodesAction";
import DeleteModal from "../../common/deleteModal";
import ErrorCodeDetails from "../errorCodeDetails";
import { updateSort } from "../../../redux/reduxes/sort/sortAction";
import PermissionsMessage from "../../common/permissionsMessage";
import ListDataNotFound from "../../common/listDataNotFound";
import AssetNotesListModal from "../../assetNotes/assetNotesListModal";

const ErrorCodesPanel = ({ model_id, activeSubTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const errorCodesLoading = useSelector(
    (state) => state.error_codes.errorCodesLoading,
  );
  const eCodes = useSelector((state) => state.error_codes.errorCodesList);
  const pagination = useSelector(
    (state) => state.error_codes.errorCodesPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByErrorCodeTitle = useSelector(
    (state) => state.sort.sortByErrorCodeTitle,
  );
  const sortByErrorCode = useSelector((state) => state.sort.sortByErrorCode);
  const sortByErrorCodeCreatedDate = useSelector(
    (state) => state.sort.sortByErrorCodeCreatedDate,
  );
  const errorCodeModal = useSelector(
    (state) => state.error_codes.errorCodeModal,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.error_codes.searchErrorCodesQuery,
  );
  const deleteErrorCodeLoading = useSelector(
    (state) => state.error_codes.deleteErrorCodeLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Error Code Sort Data
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      filter: {},
      sort:
        sortByErrorCodeTitle != 0
          ? sortByErrorCodeTitle
          : sortByErrorCode != 0
          ? sortByErrorCode
          : sortByErrorCodeCreatedDate != 0
          ? sortByErrorCodeCreatedDate
          : 0,
      sorting:
        sortByErrorCodeTitle != 0
          ? "title"
          : sortByErrorCode != 0
          ? "code"
          : sortByErrorCodeCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "error-codes") {
      delayLoading && dispatch(getAllErrorCodes(data));
    }
  }, [sort, activeSubTab]);

  // Dispatch  All Error Codes
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByErrorCodeTitle != 0
          ? sortByErrorCodeTitle
          : sortByErrorCode != 0
          ? sortByErrorCode
          : sortByErrorCodeCreatedDate != 0
          ? sortByErrorCodeCreatedDate
          : 0,
      sorting:
        sortByErrorCodeTitle != 0
          ? "title"
          : sortByErrorCode != 0
          ? "code"
          : sortByErrorCodeCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "error-codes") {
      dispatch(getAllErrorCodes(data));
    }
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Create an Error Code Modal

  const addErrorCode = (error_type) => {
    const data = {
      error_type: error_type,
      codeId: "",
      show: true,
    };
    dispatch(setErrorCodeModal(data));
  };
  const [errorCodeId, setErrorCodeId] = useState(null);

  const updateErrorCode = (error_type, eCodeId) => {
    const data = {
      error_type: error_type,
      codeId: eCodeId,
      show: true,
    };
    dispatch(setErrorCodeModal(data));
  };

  const [viewErrorCodeModal, setViewErrorCodeModal] = useState(false);

  const viewErrorCode = (stat, id) => {
    setViewErrorCodeModal(stat);
    setErrorCodeId(id);
  };

  // Close and Refresh Data after deleting on Modal
  const closeAndRefreshErrorCode = () => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      model_id: model_id,
      error_type: 3,
      filter: {},
      sort:
        sortByErrorCodeTitle != 0
          ? sortByErrorCodeTitle
          : sortByErrorCode != 0
          ? sortByErrorCode
          : sortByErrorCodeCreatedDate != 0
          ? sortByErrorCodeCreatedDate
          : 0,
      sorting:
        sortByErrorCodeTitle != 0
          ? "title"
          : sortByErrorCode != 0
          ? "code"
          : sortByErrorCodeCreatedDate != 0
          ? "created_at"
          : "",
    };
    setViewErrorCodeModal(false);
    dispatch(getAllErrorCodes(data));
  };

  // Delete an Error Code Modal
  const [deleteErrorCodeModal, setDeleteErrorCodeModal] = useState(false);
  const [deleteErrorCodeId, setDeleteErrorCodeId] = useState(null);
  const [deleteErrorCodeTitle, setDeleteErrorCodeTitle] = useState("");

  const confirmDeleteErrorCode = (stat, id, title) => {
    setDeleteErrorCodeModal(stat);
    setDeleteErrorCodeId(id);
    setDeleteErrorCodeTitle(title);
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
        sortByErrorCodeTitle != 0
          ? sortByErrorCodeTitle
          : sortByErrorCode != 0
          ? sortByErrorCode
          : sortByErrorCodeCreatedDate != 0
          ? sortByErrorCodeCreatedDate
          : 0,
      sorting:
        sortByErrorCodeTitle != 0
          ? "title"
          : sortByErrorCode != 0
          ? "code"
          : sortByErrorCodeCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "error-codes") {
      dispatch(getAllErrorCodes(data));
    }
  }, [searchQuery]);

  // Search Error Codes
  const handleSearchChange = (searchData) => {
    dispatch(changeErrorCodesSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      page: e.selected,
      search: searchQuery,
      limit: 10,
      model_id: model_id,
      filter: {},
      sort:
        sortByErrorCodeTitle != 0
          ? sortByErrorCodeTitle
          : sortByErrorCode != 0
          ? sortByErrorCode
          : sortByErrorCodeCreatedDate != 0
          ? sortByErrorCodeCreatedDate
          : 0,
      sorting:
        sortByErrorCodeTitle != 0
          ? "title"
          : sortByErrorCode != 0
          ? "code"
          : sortByErrorCodeCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab === "error-codes") {
      dispatch(getAllErrorCodes(data));
    }
  };

  // Error Code Sort
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

  const assetNotesListEvent = (stat, error_code_id) => {
    setViewAssetNotesListModal(stat);
    setAssetNotiableTypeId(error_code_id);
  };

  return (
    <>
      <Tab.Panel>
        <div className="flex md:flex-col xl:flex-row items-center mb-8 px-4">
          {(permissions.includes("all_error_codes") ||
            permissions.includes("read_error_codes") ||
            permissions.includes("Admin")) && (
            <div className="relative w-full xl:w-auto overflow-hidden">
              <input
                type="search"
                className="w-full xl:w-[400px] bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                name="manuals_search"
                id="manuals_search"
                placeholder="Search for Error Codes..."
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
          )}

          <div className="flex items-center ml-auto md:mt-5 xl:mt-0">
            {(permissions.includes("all_error_codes") ||
              permissions.includes("write_error_codes") ||
              permissions.includes("Admin")) && (
              <button
                type="button"
                onClick={() => addErrorCode("error_codes")}
                className="text-sm 2xl:text-base bg-primary text-white font-medium border border-primary px-6 py-2 rounded-full shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
              >
                Add Error Code +
              </button>
            )}
          </div>
        </div>

        {/* Table List of Error Codes */}
        <div className="w-full min-h-[500px] h-full xl:h-[500px] xl:px-4 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          {!(
            permissions.includes("all_error_codes") ||
            permissions.includes("read_error_codes") ||
            permissions.includes("Admin")
          ) ? (
            <PermissionsMessage
              additionalClassName="h-full py-[200px]"
              title="Error Codes"
              message="read error codes"
            />
          ) : (
            <>
              <table className="table-auto text-left relative min-w-full max-h-full">
                <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                  <tr>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortByErrorCodeTitle,
                          "sortByErrorCodeTitle",
                        )
                      }
                      scope="col"
                      width="25%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByErrorCodeTitle == 1 ||
                            sortByErrorCodeTitle == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Title
                        </span>
                        {sortByErrorCodeTitle == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByErrorCodeTitle == 2 ? (
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
                        handleChangeSort(sortByErrorCode, "sortByErrorCode")
                      }
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByErrorCode == 1 || sortByErrorCode == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Error Code
                        </span>
                        {sortByErrorCode == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByErrorCode == 2 ? (
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
                      Description
                    </th>
                    <th
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      Procedures
                    </th>
                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortByErrorCodeCreatedDate,
                          "sortByErrorCodeCreatedDate",
                        )
                      }
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center ">
                        <span
                          className={
                            sortByErrorCodeCreatedDate == 1 ||
                            sortByErrorCodeCreatedDate == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Created On
                        </span>
                        {sortByErrorCodeCreatedDate == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByErrorCodeCreatedDate == 2 ? (
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
                      {" "}
                      Actions{" "}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {errorCodesLoading ? (
                    <tr>
                      <td colSpan="6">
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
                      {eCodes && eCodes.length > 0 ? (
                        <>
                          {eCodes.map((error, index) => {
                            const {
                              id,
                              title,
                              code,
                              description,
                              procedure_count,
                              created_at,
                              error_type,
                            } = error;
                            return (
                              <tr
                                valign="top"
                                className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                key={id}
                              >
                                <td width="25%" className="px-4 py-4">
                                  <button
                                    type="button"
                                    onClick={() => viewErrorCode(true, id)}
                                    className="text-sm text-left text-primary opacity-75 font-medium capitalize underline transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 w-[100px] text-ellipsis whitespace-nowrap overflow-hidden focus:outline-0"
                                    title={title}
                                  >
                                    {title}
                                  </button>
                                </td>
                                <td width="15%" className="px-4 py-4 text-sm">
                                  {code}
                                </td>
                                <td
                                  width="20%"
                                  className="px-4 py-4 text-sm first-letter:capitalize"
                                >
                                  {description}
                                </td>
                                <td width="15%" className="px-4 py-4 text-sm">
                                  {procedure_count}
                                </td>
                                <td
                                  width="15%"
                                  className="px-4 py-4 text-sm  whitespace-nowrap"
                                >
                                  {created_at}
                                </td>
                                <td
                                  width="10%"
                                  className="px-4 py-4 whitespace-nowrap"
                                >
                                  {(permissions.includes("all_error_codes") ||
                                    permissions.includes(
                                      "delete_error_codes",
                                    ) ||
                                    permissions.includes("Admin")) && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        confirmDeleteErrorCode(true, id, title)
                                      }
                                      className="focus:outline-0 focus-visible:outline-0"
                                      title="Delete"
                                    >
                                      <img
                                        src="/assets/icons/icon-delete.svg"
                                        alt="icon-delete"
                                        className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                      />
                                    </button>
                                  )}

                                  {(permissions.includes("all_error_codes") ||
                                    permissions.includes(
                                      "update_error_codes",
                                    ) ||
                                    permissions.includes("Admin")) && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateErrorCode(error_type, id)
                                      }
                                      className="focus:outline-0 focus-visible:outline-0"
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
                          colSpan={6}
                          searchQuery={searchQuery}
                          listLength={eCodes && eCodes.length}
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
        {(permissions.includes("all_error_codes") ||
          permissions.includes("read_error_codes") ||
          permissions.includes("Admin")) && (
          <div className="flex justify-end mt-8 px-4">
            {errorCodesLoading ? (
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
        {/* Add/Update Error Code Modal */}
        {errorCodeModal && <CreateErrorCode model_id={model_id} />}

        {/* View an Error Code Modal */}
        {viewErrorCodeModal && (
          <ErrorCodeDetails
            viewErrorCodeModal={viewErrorCodeModal}
            setViewErrorCodeModal={closeAndRefreshErrorCode}
            model_id={model_id}
            errorCodeId={errorCodeId}
            error_type={1}
          />
        )}

        {/* Delete an Error Code Modal */}
        {deleteErrorCodeModal && (
          <DeleteModal
            head="Remove Error Code"
            body={[
              "Are you sure you want to remove",
              <strong className="capitalize break-all">
                {" "}
                "{deleteErrorCodeTitle}"{" "}
              </strong>,
              "Error Code from the list?",
            ]}
            deleteAction={deleteErrorCode}
            modalAction={setDeleteErrorCodeModal}
            parentmodel={false}
            modalValue={deleteErrorCodeModal}
            id={deleteErrorCodeId}
            model_id={model_id}
            error_type={1}
            deleteLoading={deleteErrorCodeLoading}
          />
        )}

        {/* View Asset Notes List Modal */}
        {viewAssetNotesListModal && (
          <AssetNotesListModal
            activeSubTab={3}
            model_id={model_id}
            viewAssetNotesListModal={viewAssetNotesListModal}
            setViewAssetNotesListModal={setViewAssetNotesListModal}
            assetNotiableType="ErrorCode"
            assetNotiableTypeId={assetNotiableTypeId}
          />
        )}
      </Tab.Panel>
    </>
  );
};
export default ErrorCodesPanel;
