import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePart,
  deleteAllParts,
  getAllParts,
  setCsvUploadUrlModal,
  setCsvUploadMediaModal,
  changePartsSearch,
  getUploadingCsvPartUpload,
  anaglyphDetails,
} from "../../redux/reduxes/anaglyph/anaglyphAction";
import Skeleton from "react-loading-skeleton";
import AddNewPartModal from "./addNewPartModal";
import PaginatedItems from "../common/pagination";
import DeleteModal from "../common/deleteModal";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import { Menu, Transition } from "@headlessui/react";
import UploadCSVMedia from "./uploadCSVMedia";
import UploadCSVUrl from "./uploadCSVUrl";
import PermissionsMessage from "../common/permissionsMessage";
import ListDataNotFound from "../common/listDataNotFound";
import AssetNotesListModal from "../assetNotes/assetNotesListModal";
import { ServerPath } from "../../helpers";

const PartsList = ({ model_id, activeSubTab, anaglyph_id }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const allPartsLoading = useSelector(
    (state) => state.anaglyph.allPartsLoading,
  );
  const parts = useSelector((state) => state.anaglyph.allPartsList);
  const allPartsPagination = useSelector(
    (state) => state.anaglyph.allPartsPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByPartName = useSelector((state) => state.sort.sortByPartName);
  const sortByPartId = useSelector((state) => state.sort.sortByPartId);
  const sortByLayerId = useSelector((state) => state.sort.sortByLayerId);
  const sortByPartCreatedDate = useSelector(
    (state) => state.sort.sortByPartCreatedDate,
  );
  const uploadingCsvsStatus = useSelector(
    (state) => state.anaglyph.uploadingCsvsStatus,
  );
  const csvUploadAvailable = useSelector(
    (state) => state.anaglyph.csvUploadAvailable,
  );
  const uploadCsvUrlModal = useSelector(
    (state) => state.anaglyph.uploadCsvUrlModal,
  );
  const uploadCsvMediaModal = useSelector(
    (state) => state.anaglyph.uploadCsvMediaModal,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector((state) => state.anaglyph.searchPartsQuery);
  const deletePartLoading = useSelector(
    (state) => state.anaglyph.deletePartLoading,
  );
  const deleteAllPartsLoading = useSelector(
    (state) => state.anaglyph.deleteAllPartsLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Data
  useEffect(() => {
    const data = {
      model_id: model_id,
      anaglyph_id: anaglyph_id,
      search: searchQuery,
      page: 0,
      limit: 50,
      sort:
        sortByPartName != 0
          ? sortByPartName
          : sortByPartId != 0
          ? sortByPartId
          : sortByLayerId != 0
          ? sortByLayerId
          : sortByPartCreatedDate != 0
          ? sortByPartCreatedDate
          : 0,
      sorting:
        sortByPartName != 0
          ? "part_name"
          : sortByPartId != 0
          ? "part_id"
          : sortByLayerId != 0
          ? "layer_id"
          : sortByPartCreatedDate != 0
          ? "created_at"
          : "",
    };
    delayLoading && dispatch(getAllParts(data));
  }, [sort]);

  // Dispatch All Data
  useEffect(() => {
    const data = {
      model_id: model_id,
      anaglyph_id: anaglyph_id,
      search: searchQuery,
      page: 0,
      limit: 50,
      sort:
        sortByPartName != 0
          ? sortByPartName
          : sortByPartId != 0
          ? sortByPartId
          : sortByLayerId != 0
          ? sortByLayerId
          : sortByPartCreatedDate != 0
          ? sortByPartCreatedDate
          : 0,
      sorting:
        sortByPartName != 0
          ? "part_name"
          : sortByPartId != 0
          ? "part_id"
          : sortByLayerId != 0
          ? "layer_id"
          : sortByPartCreatedDate != 0
          ? "created_at"
          : "",
    };
    if (activeSubTab == "3d") {
      dispatch(getAllParts(data));
      setTimeout(function () {
        setDelayLoading(true);
      }, 1000);
    }
  }, []);

  // Dispatch to Upload Media
  useEffect(() => {
    const data = {
      model_id: model_id,
      anaglyph_id: anaglyph_id,
    };
    dispatch(getUploadingCsvPartUpload(data));
  }, []);

  // Add & Update Part ================================================
  const [showPartsModal, setShowPartsModal] = useState(false);
  const [partId, setPartId] = useState(null);
  const [update, setUpdate] = useState(false);

  const addPartHandler = () => {
    setPartId(null);
    setShowPartsModal(true);
    setUpdate(false);
  };

  const updatePartHandler = (partId) => {
    setPartId(partId);
    setShowPartsModal(true);
    setUpdate(true);
  };

  // Delete Part
  const [deletePartModal, setDeletePartModal] = useState(false);
  const [deletePartId, setDeletePartId] = useState(null);
  const [deletePartName, setDeletePartName] = useState("");

  const confirmDeletePart = (stat, id, partName) => {
    setDeletePartModal(stat);
    setDeletePartId(id);
    setDeletePartName(partName);
  };

  // Delete All Parts
  const [deleteAllPartsModal, setDeleteAllPartsModal] = useState(false);
  const confirmDeleteAllParts = () => {
    setDeleteAllPartsModal(true);
  };

  // Add Parts via CSV Upload Media & URL
  function setShowUploadCsvMediaModal(stat) {
    dispatch(setCsvUploadMediaModal(stat));
  }
  function setShowUploadCsvUrlModal(stat) {
    dispatch(setCsvUploadUrlModal(stat));
  }

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 50,
      model_id: model_id,
      anaglyph_id: anaglyph_id,
      sort:
        sortByPartName != 0
          ? sortByPartName
          : sortByPartId != 0
          ? sortByPartId
          : sortByLayerId != 0
          ? sortByLayerId
          : sortByPartCreatedDate != 0
          ? sortByPartCreatedDate
          : 0,
      sorting:
        sortByPartName != 0
          ? "part_name"
          : sortByPartId != 0
          ? "part_id"
          : sortByLayerId != 0
          ? "layer_id"
          : sortByPartCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllParts(data));
  }, [searchQuery]);

  // 3D Parts Search
  const handleSearchChange = (searchData) => {
    dispatch(changePartsSearch(searchData));
  };

  // 3D Parts Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      limit: 50,
      model_id: model_id,
      anaglyph_id: anaglyph_id,
      sort:
        sortByPartName != 0
          ? sortByPartName
          : sortByPartId != 0
          ? sortByPartId
          : sortByLayerId != 0
          ? sortByLayerId
          : sortByPartCreatedDate != 0
          ? sortByPartCreatedDate
          : 0,
      sorting:
        sortByPartName != 0
          ? "part_name"
          : sortByPartId != 0
          ? "part_id"
          : sortByLayerId != 0
          ? "layer_id"
          : sortByPartCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllParts(data));
  };

  // Parts Sort
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

  // Part Notes List
  // const [viewPartNotesListModal, setViewPartNotesListModal] = useState(false);
  // const [viewPartNotesId, setViewPartNotesId] = useState(null);
  // const [viewPartNotesModelId, setViewPartNotesModelId] = useState(null);

  // const partNotesListEvent = (stat, part_id, model_id) => {
  //   setViewPartNotesListModal(stat);
  //   setViewPartNotesId(part_id);
  //   setViewPartNotesModelId(model_id);
  // }

  // Asset Notes List
  const [viewAssetNotesListModal, setViewAssetNotesListModal] = useState(false);
  const [assetNotiableTypeId, setAssetNotiableTypeId] = useState(null);

  const assetNotesListEvent = (stat, trouble_id) => {
    setViewAssetNotesListModal(stat);
    setAssetNotiableTypeId(trouble_id);
  };

  // Refresh Part List after CSV Upload
  const refreshPartListCSVUpload = () => {
    const anaglyphDetailsData = {
      model_id: model_id,
      id: anaglyph_id,
    };
    const partListData = {
      model_id: model_id,
      anaglyph_id: anaglyph_id,
      search: searchQuery,
      page: 0,
      limit: 50,
      sort:
        sortByPartName != 0
          ? sortByPartName
          : sortByPartId != 0
          ? sortByPartId
          : sortByLayerId != 0
          ? sortByLayerId
          : sortByPartCreatedDate != 0
          ? sortByPartCreatedDate
          : 0,
      sorting:
        sortByPartName != 0
          ? "part_name"
          : sortByPartId != 0
          ? "part_id"
          : sortByLayerId != 0
          ? "layer_id"
          : sortByPartCreatedDate != 0
          ? "created_at"
          : "",
    };
    const csvUploadMediaData = {
      model_id: model_id,
      anaglyph_id: anaglyph_id,
    };
    dispatch(anaglyphDetails(anaglyphDetailsData));
    dispatch(getAllParts(partListData));
    dispatch(getUploadingCsvPartUpload(csvUploadMediaData));
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <>
      <div className="border-t border-gray2 dark:border-opacity-20 pt-4 xl:pt-6 px-4 xl:px-8">
        <div className="flex items-center">
          <h5 className="text-lg font-bold dark:text-gray2">Manage 3D Parts</h5>
          <div className="flex items-center ml-auto">
            {(permissions.includes("all_part") ||
              permissions.includes("write_part") ||
              permissions.includes("Admin")) &&
              (permissions.includes("all_media") ||
                permissions.includes("read_media") ||
                permissions.includes("Admin")) && (
                <>
                  <Menu
                    as="div"
                    className="inline-block relative text-left ml-auto"
                  >
                    <Menu.Button className="flex items-center bg-transparent text-black3 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2 shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:transition-all hover:duration-300 focus:outline-0">
                      Upload CSV
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-[100] mt-2 w-[250px]  rounded-lg bg-white dark:bg-darkMainBg dark:text-gray2 p-2 shadow-2xl ring ring-gray2 ring-opacity-30 dark:ring-black1 focus:outline-0">
                        <Menu.Item
                          as="button"
                          onClick={() => setShowUploadCsvUrlModal(true)}
                          className="w-full text-sm text-left font-medium px-6 py-3 border-b border-gray4 dark:border-opacity-20 rounded-sm transition-all duration-300 hover:bg-gray4 dark:hover:bg-opacity-10 hover:transition-all hover:duration-300"
                        >
                          Upload CSV Url
                        </Menu.Item>
                        <Menu.Item
                          as="button"
                          onClick={() => setShowUploadCsvMediaModal(true)}
                          className="w-full text-sm text-left font-medium px-6 py-3 border-b border-gray4 dark:border-opacity-20 rounded-sm transition-all duration-300 hover:bg-gray4 dark:hover:bg-opacity-10 hover:transition-all hover:duration-300"
                        >
                          Upload CSV Media
                        </Menu.Item>

                        <Menu.Item
                          as="div"
                          className="w-full text-sm text-left font-medium rounded-sm transition-all duration-300 hover:bg-gray4 dark:hover:bg-opacity-10 hover:transition-all hover:duration-300"
                        >
                          <a
                            href={`${ServerPath}/parts.csv`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex w-full px-6 py-3 "
                          >
                            Download CSV Format
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              )}

            {(permissions.includes("all_part") ||
              permissions.includes("write_part") ||
              permissions.includes("Admin")) && (
              <button
                type="button"
                onClick={() => addPartHandler()}
                className="bg-primary text-white text-sm 2xl:text-base font-medium border border-primary rounded-full py-2 px-6 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
              >
                Add Part +
              </button>
            )}

            {(permissions.includes("all_part") ||
              (permissions.includes("delete_part") &&
                permissions.includes("delete_all_parts")) ||
              permissions.includes("Admin")) && (
              <>
                {parts && parts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => confirmDeleteAllParts()}
                    className="ml-5 opacity-75 transition-all duration-300 hover:transition-all hover:duration-300 hover:opacity-100 focus:outline-0 focus-visible:outline-0"
                    title="Delete"
                  >
                    <img
                      src="/assets/icons/icon-delete.svg"
                      alt="icon-delete"
                      className="dark:invert"
                    />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* uploading Csv Status uploadingCsvsStatus */}
        {csvUploadAvailable && (
          <>
            {uploadingCsvsStatus && uploadingCsvsStatus.completed == true ? (
              <>
                {parts && parts.length > 0 && (
                  <div className="flex items-center text-lg text-blue2 mt-3">
                    {` CSV extraction is completed upto (${
                      uploadingCsvsStatus &&
                      uploadingCsvsStatus.completion_status
                    }%).`}
                    <button
                      onClick={() => refreshPartListCSVUpload()}
                      type="button"
                      className="ml-2"
                      title="Refresh"
                    >
                      <img
                        src="/assets/icons/icon-refresh.svg"
                        alt="icon-refresh"
                        className="min-w-[20px] min-h-[20px] w-[20px] h-[20px] dark:invert"
                      />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {uploadingCsvsStatus &&
                uploadingCsvsStatus.completion_status == null ? (
                  <div className="flex items-center text-lg text-blue2 mt-3">
                    {` CSV extraction is in Progress`}
                    <button
                      onClick={() => refreshPartListCSVUpload()}
                      type="button"
                      className="ml-2"
                      title="Refresh"
                    >
                      <img
                        src="/assets/icons/icon-refresh.svg"
                        alt="icon-refresh"
                        className="min-w-[20px] min-h-[20px] w-[20px] h-[20px] dark:invert"
                      />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center text-lg text-blue2 mt-3">
                    {` CSV extraction is in Progress (${
                      uploadingCsvsStatus &&
                      uploadingCsvsStatus.completion_status
                    }%).`}
                    <button
                      onClick={() => refreshPartListCSVUpload()}
                      type="button"
                      className="ml-2"
                      title="Refresh"
                    >
                      <img
                        src="/assets/icons/icon-refresh.svg"
                        alt="icon-refresh"
                        className="min-w-[20px] min-h-[20px] w-[20px] h-[20px] dark:invert"
                      />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="relative overflow-hidden">
            <input
              type="search"
              className="w-[400px] bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 text-sm border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
              name="3d_search"
              id="3d_search"
              placeholder="Search for 3D Parts..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <div className="absolute top-3 right-4 block m-auto focus:outline-none">
              <img
                src="/assets/icons/icon-search.svg"
                alt="icon-search"
                className="w-4 h-4 block m-auto dark:invert"
              />
            </div>
          </div>

          {/* Filters : Start */}
          {/* <Filters /> */}
        </div>

        {/* Parts Table List */}
        <div className="w-full h-[300px] dark:text-gray2 mt-2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          {!(
            permissions.includes("all_part") ||
            permissions.includes("read_part") ||
            permissions.includes("Admin")
          ) ? (
            <PermissionsMessage
              additionalClassName="h-full py-10"
              title="All Parts"
              message="read part"
            />
          ) : (
            <>
              <table className="table-auto relative text-left w-full max-h-full">
                <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                  <tr>
                    <th
                      onClick={() =>
                        handleChangeSort(sortByPartName, "sortByPartName")
                      }
                      scope="col"
                      width="25%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center w-full">
                        <span
                          className={
                            sortByPartName == 1 || sortByPartName == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Part Name*
                        </span>
                        {sortByPartName == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByPartName == 2 ? (
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
                        handleChangeSort(sortByPartId, "sortByPartId")
                      }
                      scope="col"
                      width="5%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        <span
                          className={
                            sortByPartId == 1 || sortByPartId == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Part ID*
                        </span>
                        {sortByPartId == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByPartId == 2 ? (
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
                        handleChangeSort(sortByLayerId, "sortByLayerId")
                      }
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        <span
                          className={
                            sortByLayerId == 1 || sortByLayerId == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Layer ID*
                        </span>
                        {sortByLayerId == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByLayerId == 2 ? (
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
                    {/* <th
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      Linked Medias
                    </th> */}
                    <th
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      Manufacturer Code
                    </th>
                    <th
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      Nomenclature
                    </th>
                    <th
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      NSN Number
                    </th>
                    <th
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      Part Description
                    </th>
                    <th
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      Purchase URL
                    </th>
                    <th
                      scope="col"
                      width="5%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      Quantity
                    </th>

                    <th
                      onClick={() =>
                        handleChangeSort(
                          sortByPartCreatedDate,
                          "sortByPartCreatedDate",
                        )
                      }
                      scope="col"
                      width="15%"
                      className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        <span
                          className={
                            sortByPartCreatedDate == 1 ||
                            sortByPartCreatedDate == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Created On
                        </span>
                        {sortByPartCreatedDate == 1 ? (
                          <img
                            src="/assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByPartCreatedDate == 2 ? (
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
                      {" "}
                      Actions{" "}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allPartsLoading ? (
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
                      {parts && parts.length > 0 ? (
                        <>
                          {parts.map((part, index) => {
                            const {
                              id,
                              part_name,
                              part_id,
                              layer_id,
                              // medias,
                              manufacturer_code,
                              nomenclature,
                              nsn_number,
                              part_description,
                              purchase_url,
                              quantity,
                              created_at,
                            } = part;
                            return (
                              <tr
                                valign="top"
                                key={id}
                                className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                              >
                                <td width="25%" className="px-4 py-4">
                                  <div
                                    className="text-sm font-medium capitalize max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden"
                                    title={part_name}
                                  >
                                    {part_name}
                                  </div>
                                </td>
                                <td width="5%" className="px-4 py-4 text-sm">
                                  {part_id}
                                </td>
                                <td width="15%" className="px-4 py-4 text-sm">
                                  {layer_id}
                                </td>
                                {/* <td width="15%" className="px-4 py-4 text-sm">
                                  {" "}
                                  {medias.length}
                                </td> */}
                                <td className="px-4 py-4">
                                  {manufacturer_code}
                                </td>
                                <td className="px-4 py-4">{nomenclature}</td>
                                <td className="px-4 py-4">{nsn_number}</td>
                                <td className="px-4 py-4">
                                  {stripHtmlTags(part_description)}
                                </td>
                                <td className="px-4 py-4">
                                  <a
                                    href={purchase_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {purchase_url}
                                  </a>
                                </td>
                                <td className="px-4 py-4">{quantity}</td>

                                <td
                                  width="15%"
                                  className="px-4 py-4 text-sm whitespace-nowrap"
                                >
                                  {" "}
                                  {created_at}
                                </td>
                                <td
                                  width="15%"
                                  className="px-4 py-4 whitespace-nowrap"
                                >
                                  {(permissions.includes("all_part") ||
                                    permissions.includes("delete_part") ||
                                    permissions.includes("Admin")) && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        confirmDeletePart(true, id, part_name)
                                      }
                                      className=" focus-visible:outline-none"
                                      title="Delete"
                                    >
                                      <img
                                        src="/assets/icons/icon-delete.svg"
                                        alt="icon-delete"
                                        className="w-4 h-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                      />
                                    </button>
                                  )}

                                  {(permissions.includes("all_part") ||
                                    permissions.includes("update_part") ||
                                    permissions.includes("Admin")) && (
                                    <button
                                      type="button"
                                      onClick={() => updatePartHandler(id)}
                                      className=" focus-visible:outline-none mx-4"
                                      title="Edit"
                                    >
                                      <img
                                        src="/assets/icons/icon-edit.svg"
                                        alt="icon-edit"
                                        className="w-4 h-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                      />
                                    </button>
                                  )}
                                  {(permissions.includes("all_part_notes") ||
                                    permissions.includes("update_part_notes") ||
                                    permissions.includes("Admin")) && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        assetNotesListEvent(true, id)
                                      }
                                      className=" focus-visible:outline-none"
                                      title="Notes"
                                    >
                                      <img
                                        src="/assets/icons/icon-note.svg"
                                        alt="icon-note"
                                        className="w-4.5 h-4.5 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                      />
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <ListDataNotFound
                          colSpan={6}
                          searchQuery={searchQuery}
                          listLength={parts && parts.length}
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
        <div className="flex justify-end mt-8 px-4">
          {allPartsLoading ? (
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
              itemsPerPage={allPartsPagination && allPartsPagination.per_page}
              handlePageClick={handlePageClick}
              pageCount={
                allPartsPagination &&
                Math.ceil(
                  allPartsPagination.total_entries /
                    allPartsPagination.per_page,
                )
              }
              current_page={
                allPartsPagination && allPartsPagination.current_page
              }
              totalEntries={
                allPartsPagination && allPartsPagination.total_entries
              }
            />
          )}
        </div>
      </div>

      {/* Add Part Modal */}
      {showPartsModal && (
        <AddNewPartModal
          showPartsModal={showPartsModal}
          setShowPartsModal={setShowPartsModal}
          model_id={model_id}
          anaglyph_id={anaglyph_id}
          update={update}
          partId={partId}
          setPartId={setPartId}
          paginate={allPartsPagination}
        />
      )}

      {/* Delete Part Modal */}
      {deletePartModal && (
        <DeleteModal
          head="Remove Part"
          body={[
            "Are you sure you want to remove",
            <strong className="capitalize break-all">
              {" "}
              "{deletePartName}"{" "}
            </strong>,
            "Part from the list?",
          ]}
          deleteAction={deletePart}
          modalAction={setDeletePartModal}
          parentmodel={false}
          modalValue={deletePartModal}
          id={deletePartId}
          model_id={model_id}
          anaglyph_id={anaglyph_id}
          deleteLoading={deletePartLoading}
        />
      )}

      {/* Delete All Parts Modal */}
      {deleteAllPartsModal && (
        <DeleteModal
          head="Remove All Parts"
          body={["Are you sure you want to remove all 3D Parts from the list?"]}
          deleteAction={deleteAllParts}
          modalAction={setDeleteAllPartsModal}
          parentmodel={false}
          modalValue={deleteAllPartsModal}
          model_id={model_id}
          anaglyph_id={anaglyph_id}
          deleteLoading={deleteAllPartsLoading}
        />
      )}

      {/* Add Parts via CSV Upload URL */}
      {uploadCsvUrlModal && (
        <UploadCSVUrl
          showUploadCsvUrlModal={uploadCsvUrlModal}
          // setShowUploadCsvUrlModal={setCsvUploadUrlModal}
          model_id={model_id}
          anaglyph_id={anaglyph_id}
        />
      )}

      {/* Add Parts via CSV Upload Media */}
      {uploadCsvMediaModal && (
        <UploadCSVMedia
          showUploadCsvMediaModal={uploadCsvMediaModal}
          // setShowUploadCsvMediaModal={setShowUploadCsvMediaModal}
          model_id={model_id}
          anaglyph_id={anaglyph_id}
        />
      )}

      {/* View Asset Notes List Modal */}
      {viewAssetNotesListModal && (
        <AssetNotesListModal
          activeSubTab=""
          model_id={model_id}
          viewAssetNotesListModal={viewAssetNotesListModal}
          setViewAssetNotesListModal={setViewAssetNotesListModal}
          assetNotiableType="Part"
          assetNotiableTypeId={assetNotiableTypeId}
        />
      )}
    </>
  );
};
export default PartsList;
