import React, { useEffect, Fragment, useState } from "react";
import { Tab, Transition, Menu } from "@headlessui/react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../layout";
import Device from "../../components/devices/device";
import AddNewModel from "../../components/model/addNewModel";
import PaginatedItems from "../../components/common/pagination";
import {
  getAllDevices,
  getDraftDevices,
  getActiveDevices,
  changeDevicesSearch,
} from "../../redux/reduxes/devices/deviceAction";
import { setModelModal } from "../../redux/reduxes/theModels/modelAction";
import SelectModelToAddDevice from "../../components/devices/selectModelToAddDevice";
import Skeleton from "react-loading-skeleton";
import Filters from "../../components/common/filters";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import AppliedFilters from "../../components/common/appliedFilters";
import PermissionsMessage from "../../components/common/permissionsMessage";

// Tabs
const tabs = [{ title: "All" }, { title: "Active" }, { title: "Draft" }];

const Devices = (props) => {
  const dispatch = useDispatch();

  // Fetch Data
  const devices = useSelector((state) => state.devices.allDevices);
  const activeDevicesLoading = useSelector(
    (state) => state.devices.activeDevicesLoading,
  );
  const activeDevices = useSelector((state) => state.devices.activeDevices);
  const draftDevicesLoading = useSelector(
    (state) => state.devices.draftDevicesLoading,
  );
  const draftDevices = useSelector((state) => state.devices.draftDevices);
  const allDevicesLoading = useSelector(
    (state) => state.devices.allDevicesLoading,
  );
  const allDevicePagination = useSelector(
    (state) => state.devices.allDevicePagination,
  );
  const activeDevicePagination = useSelector(
    (state) => state.devices.activeDevicePagination,
  );
  const draftDevicePagination = useSelector(
    (state) => state.devices.draftDevicePagination,
  );
  const filters = useSelector((state) => state.devices.filters);
  const sort = useSelector((state) => state.sort);
  const sortByDeviceName = useSelector((state) => state.sort.sortByDeviceName);
  const sortByDeviceCreatedDate = useSelector(
    (state) => state.sort.sortByDeviceCreatedDate,
  );
  const modelPopup = useSelector((state) => state.models.modelPopup);
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector((state) => state.devices.searchDevicesQuery);

  const [activeTab, setActiveTab] = useState(0);
  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Sort Data
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByDeviceName != 0
          ? sortByDeviceName
          : sortByDeviceCreatedDate != 0
          ? sortByDeviceCreatedDate
          : 0,
      sorting:
        sortByDeviceName != 0
          ? "name"
          : sortByDeviceCreatedDate
          ? "updated_at"
          : "",
    };
    if (activeTab == 0) {
      delayLoading && dispatch(getAllDevices(data));
    } else if (activeTab == 1) {
      delayLoading && dispatch(getActiveDevices(data));
    } else if (activeTab == 2) {
      delayLoading && dispatch(getDraftDevices(data));
    }
  }, [sort]);

  // Dispatch All
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: filters.selected_filters ? filters.selected_filters : {},
      sort: 0,
      sorting: "name",
    };
    if (activeTab == 0) {
      dispatch(getAllDevices(data));
    } else if (activeTab == 1) {
      dispatch(getActiveDevices(data));
    } else if (activeTab == 2) {
      dispatch(getDraftDevices(data));
    }
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
    // handleChangeSort(1, "sortByDeviceCreatedDate")
  }, []);

  // Add New Model Popup Modal
  function setShowModal() {
    dispatch(setModelModal(true));
  }
  const [showExistingModal, setShowExistingModal] = useState(false);

  const [filterQuery, setFilterQuery] = useState("");

  // Tab Change
  const tabChangeHandler = (tab) => {
    setActiveTab(tab);
    const passData = {
      search: searchQuery,
      page: 0,
      limit: 10,
      filter: filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByDeviceName != 0
          ? sortByDeviceName
          : sortByDeviceCreatedDate != 0
          ? sortByDeviceCreatedDate
          : 0,
      sorting:
        sortByDeviceName != 0
          ? "name"
          : sortByDeviceCreatedDate
          ? "updated_at"
          : "",
    };
    if (tab == 0) {
      dispatch(getAllDevices(passData));
    } else if (tab == 1) {
      dispatch(getActiveDevices(passData));
    } else if (tab == 2) {
      dispatch(getDraftDevices(passData));
    }
  };

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      filter: filters.selected_filters ? filters.selected_filters : {},
      limit: 10,
      sort:
        sortByDeviceName != 0
          ? sortByDeviceName
          : sortByDeviceCreatedDate != 0
          ? sortByDeviceCreatedDate
          : 0,
      sorting:
        sortByDeviceName != 0
          ? "name"
          : sortByDeviceCreatedDate
          ? "updated_at"
          : "",
    };
    if (activeTab == 0) {
      dispatch(getAllDevices(data));
    } else if (activeTab == 1) {
      dispatch(getActiveDevices(data));
    } else if (activeTab == 2) {
      dispatch(getDraftDevices(data));
    }
  }, [searchQuery]);

  // Handle Search
  const searchHandleChange = (search) => {
    dispatch(changeDevicesSearch(search));
  };

  // Filters
  const [filtersApplied, setFiltersApplied] = useState(false);
  useEffect(() => {
    filters &&
      filters.selected_filters &&
      Object.keys(filters.selected_filters).forEach(function (key) {
        if (filters.selected_filters[key].length > 0) {
          setFiltersApplied(true);
        }
      });
  }, [filters]);

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      limit: 10,
      filter: filters.selected_filters ? filters.selected_filters : {},
      sort:
        sortByDeviceName != 0
          ? sortByDeviceName
          : sortByDeviceCreatedDate != 0
          ? sortByDeviceCreatedDate
          : 0,
      sorting:
        sortByDeviceName != 0
          ? "name"
          : sortByDeviceCreatedDate
          ? "updated_at"
          : "",
    };
    if (activeTab == 0) {
      dispatch(getAllDevices(data));
    } else if (activeTab == 1) {
      dispatch(getActiveDevices(data));
    } else if (activeTab == 2) {
      dispatch(getDraftDevices(data));
    }
  };

  // Devices Sort
  const handleChangeSort = (v, n) => {
    // const getSort = (x) => {
    //   let sort = 0;
    //   if (x == 0 || x == 1) {
    //     sort = v + 1
    //   } else {
    //     sort = 0;
    //   }
    //   return sort;
    // }
    const data = {
      name: n,
      sort: v,
    };
    dispatch(updateSort(data));
  };

  // On Select Sort
  const onSortSelectChange = (event) => {
    const value = event.target.value;
    if (value == "name_desc") {
      handleChangeSort(1, "sortByDeviceName");
    }
    if (value == "name_asc") {
      handleChangeSort(2, "sortByDeviceName");
    }
    if (value == "created_asc") {
      handleChangeSort(1, "sortByDeviceCreatedDate");
    }
    if (value == "created_desc") {
      handleChangeSort(2, "sortByDeviceCreatedDate");
    }
    if (value == "none") {
      handleChangeSort(2, "sortByDeviceName");
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Devices</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid xl:grid-cols-2 xl:gap-4 mb-10">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img
                    src="../assets/icons/icon-devices.svg"
                    alt="icon-devices"
                    className="invert dark:invert-0 w-4 h-4 opacity-70"
                  />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                    Devices /
                  </span>
                  <span className="ml-1 text-xs text-secondary font-semibold">
                    {" "}
                    All Devices
                  </span>
                </div>
                <h1 className="md:text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  All Devices
                </h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                <div className="flex items-center">
                  {(permissions.includes("all_device") ||
                    permissions.includes("write_device") ||
                    permissions.includes("Admin")) &&
                    (permissions.includes("all_model") ||
                      (permissions.includes("read_model") &&
                        permissions.includes("write_model")) ||
                      permissions.includes("Admin")) &&
                    (permissions.includes("all_category") ||
                      permissions.includes("read_category") ||
                      permissions.includes("Admin")) && (
                      <Menu
                        as="div"
                        className="inline-block relative text-left ml-auto"
                      >
                        <Menu.Button className="flex items-center bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:duration-300 hover:bg-transparent hover:text-secondary hover:transition-all focus:outline-0">
                          Add New Device +
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
                          <Menu.Items className="absolute right-0 z-[10] mt-2 w-[250px]  rounded-lg bg-white dark:bg-darkBg dark:text-gray2 p-2 shadow-2xl ring ring-gray2 ring-opacity-30 dark:ring-opacity-10 focus:outline-none">
                            <Menu.Item
                              as="button"
                              onClick={() => setShowExistingModal(true)}
                              className="w-full text-sm text-left font-medium px-6 py-3 border-b border-gray4 dark:border-opacity-50 rounded-sm transition-all hover:bg-gray4 dark:hover:bg-darkMainBg hover:transition-all"
                            >
                              Add to Existing Model
                            </Menu.Item>
                            <Menu.Item
                              as="button"
                              onClick={() => setShowModal()}
                              className="w-full text-sm text-left font-medium px-6 py-3 rounded-sm transition-all hover:bg-gray4 dark:hover:bg-darkMainBg hover:transition-all"
                            >
                              Create new Model and add Device
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    )}
                </div>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Device Tabs  */}
          <div>
            <div className="grid grid-cols-1">
              <Tab.Group
                onChange={(index) => {
                  tabChangeHandler(index);
                }}
              >
                <Tab.List className="mb-8 xl:flex flex-row items-center">
                  <div className="flex items-center">
                    {tabs.map((tab, index) => {
                      const { title } = tab;

                      return (
                        <Tab
                          key={index}
                          className={({ selected }) =>
                            selected
                              ? "text-lg 2xl:text-xl text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-5 xl:mr-10 transition-all duration-200 hover:duration-200 hover:transition-all focus:outline-0 focus-visible:ring-0"
                              : "text-lg 2xl:text-xl text-black2 dark:text-gray2 opacity-50 font-bold border-b-4 border-transparent mr-5 xl:mr-10 transition-all duration-200 hover:duration-200 hover:opacity-100 hover:transition-all focus:outline-0 focus-visible:ring-0"
                          }
                        >
                          {title}
                          {() => setActiveTab(title)}
                        </Tab>
                      );
                    })}

                    {(permissions.includes("all_device") ||
                      permissions.includes("read_device") ||
                      permissions.includes("Admin")) && (
                      <div className="w-full xl:w-[400px] relative overflow-hidden ml-3">
                        <input
                          type="search"
                          className="w-full bg-gray dark:bg-darkMainBg bg-opacity-60 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                          name="user_search"
                          id="user_search"
                          placeholder="Search Devices..."
                          value={searchQuery}
                          onChange={(e) => searchHandleChange(e.target.value)}
                        />
                        <div className="absolute top-3.5 right-5 block m-auto">
                          <img
                            src="../assets/icons/icon-search.svg"
                            alt="icon-search"
                            className="w-4 h-4 block m-auto dark:invert"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {(permissions.includes("all_device") ||
                    permissions.includes("read_device") ||
                    permissions.includes("Admin")) && (
                    <div className="flex items-center ml-auto mt-5 xl:mt-0">
                      {/* Sort */}
                      <div className="flex items-center relative text-left mr-6">
                        <div className="font-medium mr-2 dark:text-gray2">
                          Sort By:
                        </div>
                        <select
                          onChange={(e) => onSortSelectChange(e)}
                          className="ed-form__select-sort appearance-none relative w-[180px] h-[38px] text-sm font-medium bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-1 px-3 mt-1 focus:border-secondary focus:outline-none"
                        >
                          <option
                            selected={sortByDeviceCreatedDate == 2}
                            value="created_desc"
                          >
                            Newest First
                          </option>
                          <option
                            value="created_asc"
                            selected={sortByDeviceCreatedDate == 1}
                          >
                            Oldest First
                          </option>
                          <option
                            value="name_desc"
                            selected={sortByDeviceName == 1}
                          >
                            Device Name (A-Z)
                          </option>
                          <option
                            value="name_asc"
                            selected={sortByDeviceName == 2}
                          >
                            Device Name (Z-A)
                          </option>
                          {/* <option value='none'>
                          None
                        </option> */}
                        </select>
                      </div>

                      {/* Filters : Start */}
                      <Filters
                        filters={filters}
                        getListAction={
                          activeTab == 0
                            ? getAllDevices
                            : activeTab == 1
                            ? getActiveDevices
                            : getDraftDevices
                        }
                        limit={10}
                        sort={
                          sortByDeviceName != 0
                            ? sortByDeviceName
                            : sortByDeviceCreatedDate
                        }
                        sorting={sortByDeviceName != 0 ? "name" : "updated_at"}
                      />
                    </div>
                  )}
                </Tab.List>

                <Tab.Panels>
                  {/* Applified Filters */}
                  <AppliedFilters
                    page={0}
                    limit={10}
                    search={searchQuery}
                    sort={
                      sortByDeviceName != 0
                        ? sortByDeviceName
                        : sortByDeviceCreatedDate
                    }
                    sorting={sortByDeviceName != 0 ? "name" : "updated_at"}
                    filters={filters}
                    getActionList={
                      activeTab == 0
                        ? getAllDevices
                        : activeTab == 1
                        ? getActiveDevices
                        : getDraftDevices
                    }
                  />

                  {/* All Devices Tab : Start */}
                  <Tab.Panel>
                    {!(
                      permissions.includes("all_device") ||
                      permissions.includes("read_device") ||
                      permissions.includes("Admin")
                    ) ? (
                      <PermissionsMessage
                        additionalClassName="w-full h-[70vh] bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md"
                        title="All Devices"
                        message="read device"
                      />
                    ) : (
                      <>
                        <div className="h-full">
                          {allDevicesLoading ? (
                            <Skeleton
                              count={10}
                              width="100%"
                              inline={true}
                              containerClassName="flex grid grid-cols-1 lg:grid-cols-2 md:gap-5 2xl:gap-8"
                              className="h-[220px] 2xl:h-[280px] border border-gray2 dark:border-opacity-5 dark:bg-darkMainBg"
                            />
                          ) : (
                            <>
                              {devices && devices.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-5 2xl:gap-8">
                                  {devices.map((device, index) => {
                                    const {
                                      image_url,
                                      name,
                                      category,
                                      model_name,
                                      procedure_count,
                                      id,
                                      status,
                                    } = device;
                                    return (
                                      <div key={id}>
                                        <Device
                                          loading={allDevicesLoading}
                                          img={image_url}
                                          name={name}
                                          category={category}
                                          modelName={model_name}
                                          proceduresCount={
                                            procedure_count
                                              ? procedure_count
                                              : 0
                                          }
                                          url={`/device-details/${id}?page_from=device`}
                                          status={status ? status : "Draft"}
                                          statusClassName={`${
                                            status == "active"
                                              ? "bg-secondary dark:bg-opacity-40"
                                              : "bg-black2"
                                          }`}
                                          id={id}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <>
                                  {searchQuery != "" && devices.length <= 0 ? (
                                    <div className="w-full h-full bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md">
                                      <div className="text-danger text-center">
                                        No Search Results Found
                                      </div>
                                    </div>
                                  ) : filtersApplied ? (
                                    <div className="w-full h-full bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md">
                                      <div className="text-danger text-center mb-5">
                                        No Filter Results Found
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-full h-full bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md">
                                      <h3 className="text-xl xl:text-2xl text-black dark:text-gray2 font-bold mb-2">
                                        Get Started by adding Devices
                                      </h3>

                                      {(permissions.includes("all_device") ||
                                        permissions.includes("write_device") ||
                                        permissions.includes("Admin")) &&
                                        (permissions.includes("all_model") ||
                                          (permissions.includes("read_model") &&
                                            permissions.includes(
                                              "write_model",
                                            )) ||
                                          permissions.includes("Admin")) &&
                                        (permissions.includes("all_category") ||
                                          permissions.includes(
                                            "read_category",
                                          ) ||
                                          permissions.includes("Admin")) && (
                                          <Menu
                                            as="div"
                                            className="inline-block relative text-left ml-auto"
                                          >
                                            <Menu.Button className="flex items-center bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-6 py-1.5 shadow-md transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus:outline-none">
                                              Add New Device +
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
                                              <Menu.Items className="absolute right-0 z-[10] mt-2 w-[250px]  rounded-lg bg-white p-2 shadow-2xl ring ring-gray2 ring-opacity-30 focus:outline-none">
                                                <Menu.Item
                                                  as="button"
                                                  onClick={() =>
                                                    setShowExistingModal(true)
                                                  }
                                                  className="w-full text-sm text-left font-medium px-6 py-3 border-b border-gray4 rounded-sm transition-all hover:bg-gray4 hover:transition-all"
                                                >
                                                  Add to Existing Model
                                                </Menu.Item>
                                                <Menu.Item
                                                  as="button"
                                                  onClick={() => setShowModal()}
                                                  className="w-full text-sm text-left font-medium px-6 py-3 rounded-sm transition-all hover:bg-gray4 hover:transition-all"
                                                >
                                                  Create new Model and add
                                                  Device
                                                </Menu.Item>
                                              </Menu.Items>
                                            </Transition>
                                          </Menu>
                                        )}
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-end mt-8 px-4">
                          {allDevicesLoading ? (
                            <Skeleton
                              count={1}
                              width={200}
                              height={40}
                              baseColor="#f5f5f5"
                              highlightColor="#e1e1e1"
                              enableAnimation="true"
                              duration={2.5}
                              inline={true}
                              className=" dark:bg-darkMainBg"
                            />
                          ) : (
                            <PaginatedItems
                              itemsPerPage={allDevicePagination.per_page}
                              handlePageClick={handlePageClick}
                              pageCount={
                                allDevicePagination &&
                                Math.ceil(
                                  allDevicePagination.total_entries /
                                    allDevicePagination.per_page,
                                )
                              }
                              current_page={
                                allDevicePagination &&
                                allDevicePagination.current_page
                              }
                              totalEntries={
                                allDevicePagination &&
                                allDevicePagination.total_entries
                              }
                            />
                          )}
                        </div>
                      </>
                    )}
                  </Tab.Panel>
                  {/* All Devices Tab : End */}

                  {/* Active Devices Tab : Start */}
                  <Tab.Panel>
                    {!(
                      permissions.includes("all_device") ||
                      permissions.includes("read_device") ||
                      permissions.includes("Admin")
                    ) ? (
                      <PermissionsMessage
                        additionalClassName="w-full h-[70vh] bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md"
                        title="All Devices"
                        message="read device"
                      />
                    ) : (
                      <>
                        <div className="h-full">
                          {activeDevicesLoading ? (
                            <Skeleton
                              count={10}
                              width="100%"
                              inline={true}
                              containerClassName="flex grid grid-cols-1 lg:grid-cols-2 md:gap-5 2xl:gap-8"
                              className="h-[220px] 2xl:h-[280px] border border-gray2 dark:border-opacity-5 dark:bg-darkMainBg"
                            />
                          ) : (
                            <>
                              {activeDevices && activeDevices.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  {activeDevices.map((device, index) => {
                                    const {
                                      image,
                                      name,
                                      category,
                                      model_name,
                                      procedure_count,
                                      id,
                                      status,
                                    } = device;
                                    return (
                                      <div key={id}>
                                        <Device
                                          loading={allDevicesLoading}
                                          img={image}
                                          name={name}
                                          category={category}
                                          modelName={model_name}
                                          proceduresCount={
                                            procedure_count
                                              ? procedure_count
                                              : 0
                                          }
                                          url={`/device-details/${id}?page_from=device`}
                                          statusClassName="bg-secondary dark:bg-opacity-40"
                                          status={status}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <>
                                  {searchQuery != "" && devices.length <= 0 ? (
                                    <div className="w-full h-full bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md">
                                      <div className="text-danger text-center">
                                        No Search Results Found
                                      </div>
                                    </div>
                                  ) : filtersApplied ? (
                                    <div className="w-full h-full bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md">
                                      <div className="text-danger text-center mb-5">
                                        No Filter Results Found
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-full h-full bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md">
                                      <h3 className="text-xl xl:text-2xl text-black dark:text-gray2 font-bold mb-2">
                                        Get Started by adding Devices
                                      </h3>

                                      {(permissions.includes("all_device") ||
                                        permissions.includes("write_device") ||
                                        permissions.includes("Admin")) &&
                                        (permissions.includes("all_model") ||
                                          (permissions.includes("read_model") &&
                                            permissions.includes(
                                              "write_model",
                                            )) ||
                                          permissions.includes("Admin")) &&
                                        (permissions.includes("all_category") ||
                                          permissions.includes(
                                            "read_category",
                                          ) ||
                                          permissions.includes("Admin")) && (
                                          <Menu
                                            as="div"
                                            className="inline-block relative text-left ml-auto"
                                          >
                                            <Menu.Button className="flex items-center bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-6 py-2 shadow-md transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus:outline-none">
                                              Add New Device +
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
                                              <Menu.Items className="absolute right-0 z-[10] mt-2 w-[250px]  rounded-lg bg-white p-2 shadow-2xl ring ring-gray2 ring-opacity-30 focus:outline-none">
                                                <Menu.Item
                                                  as="button"
                                                  onClick={() =>
                                                    setShowExistingModal(true)
                                                  }
                                                  className="w-full text-sm text-left font-medium px-6 py-3 border-b border-gray4 rounded-sm transition-all hover:bg-gray4 hover:transition-all"
                                                >
                                                  Add to Existing Model
                                                </Menu.Item>
                                                <Menu.Item
                                                  as="button"
                                                  onClick={() => setShowModal()}
                                                  className="w-full text-sm text-left font-medium px-6 py-3 rounded-sm transition-all hover:bg-gray4 hover:transition-all"
                                                >
                                                  Create new Model and add
                                                  Device
                                                </Menu.Item>
                                              </Menu.Items>
                                            </Transition>
                                          </Menu>
                                        )}
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-end mt-8 px-4">
                          {activeDevicesLoading ? (
                            <Skeleton
                              count={1}
                              width={200}
                              height={40}
                              baseColor="#f5f5f5"
                              highlightColor="#e1e1e1"
                              enableAnimation="true"
                              duration={2.5}
                              inline={true}
                              className=" dark:bg-darkMainBg"
                            />
                          ) : (
                            <PaginatedItems
                              itemsPerPage={activeDevicePagination.per_page}
                              handlePageClick={handlePageClick}
                              pageCount={
                                activeDevicePagination &&
                                Math.ceil(
                                  activeDevicePagination.total_entries /
                                    activeDevicePagination.per_page,
                                )
                              }
                              current_page={
                                activeDevicePagination &&
                                activeDevicePagination.current_page
                              }
                              totalEntries={
                                activeDevicePagination &&
                                activeDevicePagination.total_entries
                              }
                            />
                          )}
                        </div>
                      </>
                    )}
                  </Tab.Panel>
                  {/* Active Devices Tab : End */}

                  {/* Draft Devices Tab : Start */}
                  <Tab.Panel>
                    {!(
                      permissions.includes("all_device") ||
                      permissions.includes("read_device") ||
                      permissions.includes("Admin")
                    ) ? (
                      <PermissionsMessage
                        additionalClassName="w-full h-[70vh] bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md"
                        title="All Devices"
                        message="read device"
                      />
                    ) : (
                      <>
                        <div className="h-full">
                          {draftDevicesLoading ? (
                            <Skeleton
                              count={10}
                              width="100%"
                              inline={true}
                              containerClassName="flex grid grid-cols-1 lg:grid-cols-2 md:gap-5 2xl:gap-8"
                              className="h-[220px] 2xl:h-[280px] border border-gray2 dark:border-opacity-5 dark:bg-darkMainBg"
                            />
                          ) : (
                            <>
                              {draftDevices && draftDevices.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  {draftDevices.map((device, index) => {
                                    const {
                                      image,
                                      name,
                                      category,
                                      model_name,
                                      procedure_count,
                                      id,
                                      status,
                                    } = device;
                                    return (
                                      <div key={id}>
                                        <Device
                                          loading={allDevicesLoading}
                                          img={image}
                                          name={name}
                                          category={category}
                                          modelName={model_name}
                                          proceduresCount={
                                            procedure_count
                                              ? procedure_count
                                              : 0
                                          }
                                          url={`/device-details/${id}?page_from=device`}
                                          statusClassName="bg-black2"
                                          status="Draft"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <>
                                  {searchQuery != "" && devices.length <= 0 ? (
                                    <div className="w-full h-full bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md">
                                      <div className="text-danger text-center">
                                        No Search Results Found
                                      </div>
                                    </div>
                                  ) : filtersApplied ? (
                                    <div className="w-full h-full bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md">
                                      <div className="text-danger text-center mb-5">
                                        No Filter Results Found
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-full h-full bg-white dark:bg-darkBg py-40 xl:py-60  text-center border border-gray2 dark:border-black1 drop-shadow-md">
                                      <h3 className="text-xl xl:text-2xl text-black dark:text-gray2 font-bold mb-2">
                                        Get Started by adding Devices
                                      </h3>

                                      {(permissions.includes("all_device") ||
                                        permissions.includes("write_device") ||
                                        permissions.includes("Admin")) &&
                                        (permissions.includes("all_model") ||
                                          (permissions.includes("read_model") &&
                                            permissions.includes(
                                              "write_model",
                                            )) ||
                                          permissions.includes("Admin")) &&
                                        (permissions.includes("all_category") ||
                                          permissions.includes(
                                            "read_category",
                                          ) ||
                                          permissions.includes("Admin")) && (
                                          <Menu
                                            as="div"
                                            className="inline-block relative text-left ml-auto"
                                          >
                                            <Menu.Button className="flex items-center bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-6 py-1.5 shadow-md transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus:outline-none">
                                              Add New Device +
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
                                              <Menu.Items className="absolute right-0 z-[10] mt-2 w-[250px]  rounded-lg bg-white p-2 shadow-2xl ring ring-gray2 ring-opacity-30 focus:outline-none">
                                                <Menu.Item
                                                  as="button"
                                                  onClick={() =>
                                                    setShowExistingModal(true)
                                                  }
                                                  className="w-full text-sm text-left font-medium px-6 py-3 border-b border-gray4 rounded-sm transition-all hover:bg-gray4 hover:transition-all"
                                                >
                                                  Add to Existing Model
                                                </Menu.Item>
                                                <Menu.Item
                                                  as="button"
                                                  onClick={() => setShowModal()}
                                                  className="w-full text-sm text-left font-medium px-6 py-3 rounded-sm transition-all hover:bg-gray4 hover:transition-all"
                                                >
                                                  Create new Model and add
                                                  Device
                                                </Menu.Item>
                                              </Menu.Items>
                                            </Transition>
                                          </Menu>
                                        )}
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-end mt-8 px-4">
                          {draftDevicesLoading ? (
                            <Skeleton
                              count={1}
                              width={200}
                              height={40}
                              baseColor="#f5f5f5"
                              highlightColor="#e1e1e1"
                              enableAnimation="true"
                              duration={2.5}
                              inline={true}
                              className=" dark:bg-darkMainBg"
                            />
                          ) : (
                            <PaginatedItems
                              itemsPerPage={draftDevicePagination.per_page}
                              handlePageClick={handlePageClick}
                              pageCount={
                                draftDevicePagination &&
                                Math.ceil(
                                  draftDevicePagination.total_entries /
                                    draftDevicePagination.per_page,
                                )
                              }
                              current_page={
                                draftDevicePagination &&
                                draftDevicePagination.current_page
                              }
                              totalEntries={
                                draftDevicePagination &&
                                draftDevicePagination.total_entries
                              }
                            />
                          )}
                        </div>
                      </>
                    )}
                  </Tab.Panel>
                  {/* Draft Devices Tab : End */}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>

          {/* Add a Device Modal : Start */}
          <AddNewModel
            showModal={modelPopup}
            editModel={false}
            // setShowModal={setShowModal}
          />
          {/* Add a Device Modal : End */}

          {/* Add to Existing Model : Start */}
          {showExistingModal && (
            <SelectModelToAddDevice
              showExistingModal={showExistingModal}
              setShowExistingModal={setShowExistingModal}
            />
          )}
          {/* Add to Existing Model : End */}
        </section>
      </Layout>
    </>
  );
};
export default Devices;
