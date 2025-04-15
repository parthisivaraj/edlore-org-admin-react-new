import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import { getModelDevices } from "../../redux/reduxes/theModels/modelAction";
import { useSelector, useDispatch } from "react-redux";
import Filters from "../common/filters";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import AppliedFilters from "../common/appliedFilters";
import ListDataNotFound from "../common/listDataNotFound";
import PermissionsMessage from "../common/permissionsMessage";
import {
  changeModelDevicesSearch,
  deleteDevice,
} from "../../redux/reduxes/devices/deviceAction";
import DeleteModal from "../common/deleteModal";
import { useHistory } from "react-router-dom";

const ModelDeviceListing = ({ model_id, setShowModal }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  // Fetch Data
  const devices = useSelector((state) => state.models.modelDevices);
  const modelDevicesLoading = useSelector(
    (state) => state.models.modelDevicesLoading,
  );
  const pagination = useSelector(
    (state) => state.models.modelDevicesPagination,
  );
  const filters = useSelector((state) => state.models.filters);
  const sort = useSelector((state) => state.sort);
  const sortByModelDeviceName = useSelector(
    (state) => state.sort.sortByModelDeviceName,
  );
  const sortByModelDeviceId = useSelector(
    (state) => state.sort.sortByModelDeviceId,
  );
  const sortByModelDeviceSerialNumber = useSelector(
    (state) => state.sort.sortByModelDeviceSerialNumber,
  );
  const sortByModelDeviceCreatedDate = useSelector(
    (state) => state.sort.sortByModelDeviceCreatedDate,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.devices.searchModelDevicesQuery,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  const [showDeviceDeleteModal, setShowDeviceDeleteModal] = useState(false);
  const [deletingDevice, setDeletingDevice] = useState(null);
  const deleteDeviceLoading = useSelector(
    (state) => state.devices.deleteDeviceLoading,
  );

  // Dispatch Model Device Name Sort
  useEffect(() => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      paginate: true,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByModelDeviceName != 0
          ? sortByModelDeviceName
          : sortByModelDeviceId != 0
          ? sortByModelDeviceId
          : sortByModelDeviceSerialNumber != 0
          ? sortByModelDeviceSerialNumber
          : sortByModelDeviceCreatedDate != 0
          ? sortByModelDeviceCreatedDate
          : 0,
      sorting:
        sortByModelDeviceName != 0
          ? "name"
          : sortByModelDeviceId != 0
          ? "device_id"
          : sortByModelDeviceSerialNumber != 0
          ? "serial_number"
          : sortByModelDeviceCreatedDate != 0
          ? "created_at"
          : "",
    };
    delayLoading && dispatch(getModelDevices(data));
  }, [sort]);

  useEffect(() => {
    const data = {
      model_id: model_id,
      search: "",
      paginate: true,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByModelDeviceName != 0
          ? sortByModelDeviceName
          : sortByModelDeviceId != 0
          ? sortByModelDeviceId
          : sortByModelDeviceSerialNumber != 0
          ? sortByModelDeviceSerialNumber
          : sortByModelDeviceCreatedDate != 0
          ? sortByModelDeviceCreatedDate
          : 0,
      sorting:
        sortByModelDeviceName != 0
          ? "name"
          : sortByModelDeviceId != 0
          ? "device_id"
          : sortByModelDeviceSerialNumber != 0
          ? "serial_number"
          : sortByModelDeviceCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getModelDevices(data));
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
      paginate: true,
      filter: {},
      sort:
        sortByModelDeviceName != 0
          ? sortByModelDeviceName
          : sortByModelDeviceId != 0
          ? sortByModelDeviceId
          : sortByModelDeviceSerialNumber != 0
          ? sortByModelDeviceSerialNumber
          : sortByModelDeviceCreatedDate != 0
          ? sortByModelDeviceCreatedDate
          : 0,
      sorting:
        sortByModelDeviceName != 0
          ? "name"
          : sortByModelDeviceId != 0
          ? "device_id"
          : sortByModelDeviceSerialNumber != 0
          ? "serial_number"
          : sortByModelDeviceCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getModelDevices(data));
  }, [searchQuery]);

  // Search Bar Handler
  const handleSearchChange = (searchData) => {
    dispatch(changeModelDevicesSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      model_id: model_id,
      search: searchQuery,
      page: e.selected,
      limit: 10,
      paginate: true,
      filter: filters.selected ? filters.selected : {},
      sort:
        sortByModelDeviceName != 0
          ? sortByModelDeviceName
          : sortByModelDeviceId != 0
          ? sortByModelDeviceId
          : sortByModelDeviceSerialNumber != 0
          ? sortByModelDeviceSerialNumber
          : sortByModelDeviceCreatedDate != 0
          ? sortByModelDeviceCreatedDate
          : 0,
      sorting:
        sortByModelDeviceName != 0
          ? "name"
          : sortByModelDeviceId != 0
          ? "device_id"
          : sortByModelDeviceSerialNumber != 0
          ? "serial_number"
          : sortByModelDeviceCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getModelDevices(data));
  };

  // Model Devices Sort
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

  // Delete Device
  const deleteThisDevice = (device) => {
    setDeletingDevice({ ...device });
    setShowDeviceDeleteModal(true);
  };

  const navigateToDetails = (id) => {
    history.push(`/device-details/${id}?page_from=model`);
  };

  return (
    <>
      <div className="flex items-center justify-between pt-5 px-5">
        <h6 className="text-lg text-black2 dark:text-gray2 font-bold">
          Manage Serial Number
        </h6>

        {(permissions.includes("all_device") ||
          permissions.includes("write_device") ||
          permissions.includes("Admin")) && (
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full py-2 px-5 shadow-md transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0"
          >
            Add Serial Number +
          </button>
        )}
      </div>

      {!(
        permissions.includes("all_device") ||
        permissions.includes("read_device") ||
        permissions.includes("Admin")
      ) ? (
        <PermissionsMessage
          additionalClassName="h-[45vh] py-10"
          title="All Devices"
          message="read device"
        />
      ) : (
        <>
          {/* Search and Filter : Start */}
          <div className="flex items-center justify-between my-6 px-5">
            <div className="relative md:w-[280px] xl:w-[400px]  overflow-hidden">
              <input
                type="search"
                className="w-full bg-white dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                name="device_search"
                id="device_search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search device, name, id..."
              />
              <div className="absolute top-3.5 right-5 block m-auto">
                <img
                  src="/assets/icons/icon-search.svg"
                  alt="icon-search"
                  className="w-4 h-4 block m-auto dark:invert"
                />
              </div>
            </div>

            {/* Filters : Start */}
            <Filters
              filters={filters}
              getListAction={getModelDevices}
              model_id={model_id}
              limit={10}
              sort={
                sortByModelDeviceName != 0
                  ? sortByModelDeviceName
                  : sortByModelDeviceId != 0
                  ? sortByModelDeviceId
                  : sortByModelDeviceSerialNumber != 0
                  ? sortByModelDeviceSerialNumber
                  : sortByModelDeviceCreatedDate != 0
                  ? sortByModelDeviceCreatedDate
                  : 0
              }
              sorting={
                sortByModelDeviceName != 0
                  ? "name"
                  : sortByModelDeviceId != 0
                  ? "device_id"
                  : sortByModelDeviceSerialNumber != 0
                  ? "serial_number"
                  : sortByModelDeviceCreatedDate != 0
                  ? "created_at"
                  : ""
              }
            />
          </div>

          {/* Applied Filters */}
          <div className="px-4 xl:px-8">
            <AppliedFilters
              model_id={model_id}
              page={0}
              limit={10}
              search={searchQuery}
              sort={
                sortByModelDeviceName != 0
                  ? sortByModelDeviceName
                  : sortByModelDeviceId != 0
                  ? sortByModelDeviceId
                  : sortByModelDeviceSerialNumber != 0
                  ? sortByModelDeviceSerialNumber
                  : sortByModelDeviceCreatedDate != 0
                  ? sortByModelDeviceCreatedDate
                  : 0
              }
              sorting={
                sortByModelDeviceName != 0
                  ? "name"
                  : sortByModelDeviceId != 0
                  ? "device_id"
                  : sortByModelDeviceSerialNumber != 0
                  ? "serial_number"
                  : sortByModelDeviceCreatedDate != 0
                  ? "created_at"
                  : ""
              }
              filters={filters}
              getActionList={getModelDevices}
            />
          </div>

          {/* Manage Device Table List : Start */}
          <div className="w-full h-full min-h-[300px] xl:h-[300px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
            <table className="table-auto text-left relative min-w-full max-h-full">
              <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                <tr>
                  <th
                    scope="col"
                    width="5%"
                    className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                  ></th>
                  <th
                    onClick={() =>
                      handleChangeSort(
                        sortByModelDeviceSerialNumber,
                        "sortByModelDeviceSerialNumber",
                      )
                    }
                    scope="col"
                    width="20%"
                    className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                  >
                    <div className="flex items-center ">
                      <span
                        className={
                          sortByModelDeviceSerialNumber == 1 ||
                          sortByModelDeviceSerialNumber == 2
                            ? "text-primary"
                            : ""
                        }
                      >
                        Serial No
                      </span>
                      {sortByModelDeviceSerialNumber == 1 ? (
                        <img
                          src="/assets/icons/icon-sort-asc.svg"
                          alt="icon-sort-asc"
                          className="w-[15px] h-[15px] ml-[2px] dark:invert"
                        />
                      ) : sortByModelDeviceSerialNumber == 2 ? (
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
                        sortByModelDeviceName,
                        "sortByModelDeviceName",
                      )
                    }
                    scope="col"
                    width="20%"
                    className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                  >
                    <div className="flex items-center ">
                      <span
                        className={
                          sortByModelDeviceName == 1 ||
                          sortByModelDeviceName == 2
                            ? "text-primary"
                            : ""
                        }
                      >
                        Device Name
                      </span>
                      {sortByModelDeviceName == 1 ? (
                        <img
                          src="/assets/icons/icon-sort-asc.svg"
                          alt="icon-sort-asc"
                          className="w-[15px] h-[15px] ml-[2px] dark:invert"
                        />
                      ) : sortByModelDeviceName == 2 ? (
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
                        sortByModelDeviceId,
                        "sortByModelDeviceId",
                      )
                    }
                    scope="col"
                    width="15%"
                    className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                  >
                    <div className="flex items-center ">
                      <span
                        className={
                          sortByModelDeviceId == 1 || sortByModelDeviceId == 2
                            ? "text-primary"
                            : ""
                        }
                      >
                        Device ID
                      </span>
                      {sortByModelDeviceId == 1 ? (
                        <img
                          src="/assets/icons/icon-sort-asc.svg"
                          alt="icon-sort-asc"
                          className="w-[15px] h-[15px] ml-[2px] dark:invert"
                        />
                      ) : sortByModelDeviceId == 2 ? (
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
                        sortByModelDeviceCreatedDate,
                        "sortByModelDeviceCreatedDate",
                      )
                    }
                    scope="col"
                    width="15%"
                    className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                  >
                    <div className="flex items-center ">
                      <span
                        className={
                          sortByModelDeviceCreatedDate == 1 ||
                          sortByModelDeviceCreatedDate == 2
                            ? "text-primary"
                            : ""
                        }
                      >
                        Created On
                      </span>
                      {sortByModelDeviceCreatedDate == 1 ? (
                        <img
                          src="/assets/icons/icon-sort-asc.svg"
                          alt="icon-sort-asc"
                          className="w-[15px] h-[15px] ml-[2px] dark:invert"
                        />
                      ) : sortByModelDeviceCreatedDate == 2 ? (
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
                    className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    width="20%"
                    className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {modelDevicesLoading ? (
                  <tr>
                    <td colSpan="7">
                      <Skeleton
                        count={10}
                        height={75}
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
                    {devices && devices.length > 0 ? (
                      <>
                        {devices.map((detail, index) => {
                          const {
                            image,
                            name,
                            device_id,
                            serial_number,
                            id,
                            status,
                            created_at,
                          } = detail;
                          return (
                            <tr
                              valign="top"
                              className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300 cursor-pointer"
                              key={id}
                              onClick={() => navigateToDetails(id)}
                            >
                              <td
                                width="5%"
                                className="px-4 xl:px-8 py-4 capitalize"
                              >
                                <div className="min-w-[60px] min-h-[60px] w-[60px] h-[60px] rounded-md bg-gray2 border border-gray2 overflow-hidden">
                                  <img
                                    src={image}
                                    alt={name}
                                    className="w-[60px] h-[60px] bg-gray2 rounded-md object-contain"
                                  />
                                </div>
                              </td>
                              <td width="20%" className="px-4 xl:px-8 py-4">
                                <div
                                  className="w-[200px] text-ellipsis overflow-hidden whitespace-nowrap"
                                  title={serial_number}
                                >
                                  {serial_number}
                                </div>
                              </td>
                              <td width="20%" className="px-4 xl:px-8 py-4">
                                <div
                                  className="w-[200px] text-ellipsis overflow-hidden whitespace-nowrap line-clamp-1"
                                  title={name}
                                >
                                  {name}
                                </div>
                              </td>
                              <td width="15%" className="px-4 xl:px-8 py-4">
                                {device_id}
                              </td>
                              <td
                                width="10%"
                                className="px-4 xl:px-8 py-4 whitespace-nowrap"
                              >
                                {created_at}
                              </td>
                              <td
                                width="10%"
                                className="px-4 xl:px-8 py-4 whitespace-nowrap capitalize"
                              >
                                {status}
                              </td>
                              <td
                                width="20%"
                                className="px-4 xl:px-8 py-4 whitespace-nowrap"
                              >
                                <div className="flex items-center">
                                  {(permissions.includes("all_device") ||
                                    permissions.includes("update_device") ||
                                    permissions.includes("Admin")) && (
                                    <Link
                                      to={`/edit-device/${id}`}
                                      exact={true}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <img
                                        src="/assets/icons/icon-edit.svg"
                                        alt="icon-edit"
                                        className="w-[18px] h-[18px] ml-8 opacity-80 hover:opacity-100 dark:invert transition-all duration-300 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                        title="Edit"
                                      />
                                    </Link>
                                  )}
                                  {(permissions.includes("all_device") ||
                                    permissions.includes("delete_device") ||
                                    permissions.includes("Admin")) && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteThisDevice(detail);
                                      }}
                                      className="focus:outline-0"
                                      title="Delete"
                                    >
                                      <img
                                        src="/assets/icons/icon-delete.svg"
                                        alt="icon-delete"
                                        className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-12 xl:ml-8 opacity-80 hover:opacity-100 dark:invert transition-all duration-300 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                      />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <ListDataNotFound
                        searchQuery={searchQuery}
                        listLength={devices && devices.length}
                        filters={filters}
                        colSpan={7}
                      />
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-8 px-4">
            {modelDevicesLoading ? (
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
                current_page={
                  pagination &&
                  pagination.current_page &&
                  pagination.current_page
                }
                totalEntries={pagination && pagination.total_entries}
              />
            )}
          </div>
          {/* Manage Device Table List : End */}

          {/* Delete Device Modal */}
          {deleteDevice && (
            <DeleteModal
              head="Remove Device"
              body={[
                "Are you sure you want to remove",
                <strong className="capitalize break-all">
                  {" "}
                  "{deletingDevice?.name || "-"}"{" "}
                </strong>,
                "Device?",
              ]}
              deleteAction={deleteDevice}
              modalAction={setShowDeviceDeleteModal}
              modalValue={showDeviceDeleteModal}
              parentmodel={false}
              id={deletingDevice?.id}
              model_id={deletingDevice?.modelId}
              deletingFrom={deletingDevice?.from}
              deleteLoading={deleteDeviceLoading}
            />
          )}
        </>
      )}
    </>
  );
};

export default ModelDeviceListing;
