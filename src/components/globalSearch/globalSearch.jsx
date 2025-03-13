import React, { useState, useEffect } from 'react';
import { Tab } from "@headlessui/react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGlobalSearch } from '../../redux/reduxes/globalSearch/globalSearchAction';
import Skeleton from 'react-loading-skeleton';
import PermissionsMessage from '../common/permissionsMessage';



// Tab List
const tabs = [
  { title: 'All' },
  { title: 'Devices' },
  { title: 'Models' },
  { title: 'Parts' },
  { title: '3D' },
  { title: 'Workorders' },
  { title: 'Users' },
]

const GlobalSearch = ({ searchGlobalQuery, setSearchGlobalQuery }) => {
  const dispatch = useDispatch();

  // On Tab Change
  const [currentTab, setCurrentTab] = useState("all");
  const onSearchTabChange = (index) => {
    if (index == 0) {
      const data = {
        search: searchGlobalQuery,
        type: "all",
      }
      setCurrentTab('all');
      dispatch(getAllGlobalSearch(data));
    }
    if (index == 1) {
      const data = {
        search: searchGlobalQuery,
        type: "device",
      }
      setCurrentTab('device');
      dispatch(getAllGlobalSearch(data));
    }
    if (index == 2) {
      const data = {
        search: searchGlobalQuery,
        type: "model",
      }
      setCurrentTab('model');
      dispatch(getAllGlobalSearch(data));
    }
    if (index == 3) {
      const data = {
        search: searchGlobalQuery,
        type: "part",
      }
      setCurrentTab('part');
      dispatch(getAllGlobalSearch(data));
    }
    if (index == 4) {
      const data = {
        search: searchGlobalQuery,
        type: "section",
      }
      setCurrentTab('section');
      dispatch(getAllGlobalSearch(data));
    }
    if (index == 5) {
      const data = {
        search: searchGlobalQuery,
        type: "work_order",
      }
      setCurrentTab('workorder');
      dispatch(getAllGlobalSearch(data));
    }
    if (index == 6) {
      const data = {
        search: searchGlobalQuery,
        type: "user",
      }
      setCurrentTab('user');
      dispatch(getAllGlobalSearch(data));
    }
  }

  // Fetch Data
  const all = useSelector(state => state.globalsearch.allSearchList);
  const allLoading = useSelector(state => state.globalsearch.allSearchLoading);
  const permissions = useSelector(state => state.auth.allPermissions);

  useEffect(() => {
    const data = {
      search: searchGlobalQuery,
      type: currentTab,
    }
    dispatch(getAllGlobalSearch(data))
  }, [searchGlobalQuery])

  const closeTheSearch = () => {
    console.log("coming inside LPLPLPLPLPLP");
  }

  return (
    <>
      <div className="flex justify-start fixed left-auto  top-[60px] z-[50] w-full h-full ml-[220px] xl:ml-[285px]">
        <div className='w-[65%] xl:w-[50%] h-[50vh] xl:h-[75vh] bg-white dark:bg-darkBg border-l border-b border-r border-gray4 dark:border-opacity-20 rounded-b-3xl shadow-md overflow-hidden'>
          <Tab.Group onChange={(index) => onSearchTabChange(index)}>
            <Tab.List className="mb-3 px-6 py-4 whitespace-nowrap">
              {tabs.map((tab, index) => {
                const { title } = tab;
                return (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      selected ?
                        'text-base text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-6 focus:outline-none focus-visible:ring-0 '
                        :
                        'text-base text-black2 dark:text-gray2 opacity-50 font-bold mr-6 border-none hover:opacity-100 focus:outline-none focus-visible:ring-0 '
                    }
                  >
                    {title}
                  </Tab>
                )
              })}
            </Tab.List>

            <Tab.Panels>
              {/* All Tab : Start */}
              <Tab.Panel>
                <div className='w-full h-[50vh] xl:h-[75vh] pb-20 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                  {allLoading ?
                    <Skeleton
                      count={10}
                      height={55}
                      baseColor="#f5f5f5"
                      highlightColor='#e1e1e1'
                      borderRadius="0"
                      enableAnimation="true"
                      duration={2.5}
                      inline={true}
                      className="dark:bg-darkMainBg"
                    />
                    :
                    <>
                      {currentTab == "all" &&
                        <>
                          {all.devices && (all.devices.length + all.models.length + all.users.length + all.work_orders.length + all.anaglyphs.length + all.parts.length) == 0 ?

                            <div className='text-danger text-center py-[280px]'>No Devices, Models, Workorders or Users Found</div>
                            :
                            <>
                              {/* All Devices */}
                              {(permissions.includes("all_device") || permissions.includes("read_device") || permissions.includes("Admin")) &&
                                <>
                                  {all.devices && all.devices.length > 0 &&
                                    <div className='mb-10'>
                                      <div className="text-sm font-medium text-primary mb-2 px-6">Devices</div>
                                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                                        {all.devices && all.devices.length > 0 && all.devices.map((device, index) => {
                                          return (
                                            <li key={device.id} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                              <div>
                                                <div className="text-base font-medium capitalize leading-tight mb-1 w-[500px] text-ellipsis whitespace-nowrap overflow-hidden" title={device.name}>{device.name}</div>
                                                <p className='text-xs'>
                                                  Device ID: <span className='font-medium'>{device.device_id}</span> |
                                                  Manufactured by: <span className='font-medium'>{device.manufactured_by}</span> |
                                                  Location: <span className='font-medium'>{device.device_location}</span>
                                                </p>
                                              </div>

                                              <Link target={'_blank'} to={`/device-details/${device.id}?page_from=device`} exact={true} className='ml-auto'>
                                                <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                                              </Link>
                                            </li>
                                          )
                                        })}
                                      </ul>
                                    </div>
                                  }
                                </>
                              }

                              {/* All Models */}
                              {(permissions.includes("all_model") || permissions.includes("read_model") || permissions.includes("Admin")) &&
                                <>
                                  {all.models && all.models.length > 0 &&
                                    <div className='mb-10'>
                                      <div className="text-sm font-medium text-primary mb-2 px-6">Models</div>
                                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                                        {all.models && all.models.length > 0 && all.models.map((model, index) => {
                                          return (
                                            <li key={model.id} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                              <div>
                                                <div className="text-base font-medium capitalize leading-tight mb-1 w-[500px] text-ellipsis whitespace-nowrap overflow-hidden" title={model.title}>{model.title}</div>
                                                <p className='text-xs'>
                                                  Model ID: <span className='font-medium'>{model.model_id}</span>
                                                </p>
                                              </div>

                                              <Link target={'_blank'} to={`/device-model/${model.id}`} exact={true} className='ml-auto'>
                                                <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                                              </Link>
                                            </li>
                                          )
                                        })}
                                      </ul>
                                    </div>
                                  }
                                </>
                              }

                              {/* All Anaglyphs */}
                              {(permissions.includes("all_model") || permissions.includes("read_model") || permissions.includes("Admin")) &&
                                <>
                                  {all.anaglyphs && all.anaglyphs.length > 0 &&
                                    <div className='mb-10'>
                                      <div className="text-sm font-medium text-primary mb-2 px-6">Anaglyphs</div>
                                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                                        {all.anaglyphs && all.anaglyphs.length > 0 && all.anaglyphs.map((anaglyph, index) => {
                                          return (
                                            <li key={anaglyph.id} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                              <div>
                                                <div className="text-base font-medium capitalize leading-tight mb-1 w-[500px] text-ellipsis whitespace-nowrap overflow-hidden" title={anaglyph.title}>{anaglyph.title}</div>
                                                <p className='text-xs'>
                                                  Model ID: <span className='font-medium'>{anaglyph.model.title}</span>
                                                </p>
                                              </div>

                                              <Link target={'_blank'} to={`/device-model/${anaglyph.model.id}/asset-info/3d/${anaglyph.id}`} exact={true} className='ml-auto'>
                                                <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                                              </Link>
                                            </li>
                                          )
                                        })}
                                      </ul>
                                    </div>
                                  }
                                </>
                              }

                              {/* All Parts */}
                              {(permissions.includes("all_model") || permissions.includes("read_model") || permissions.includes("Admin")) &&
                                <>
                                  {all.parts && all.parts.length > 0 &&
                                    <div className="mb-10">
                                      <div className="text-sm font-medium text-primary px-6">Parts</div>
                                      <ul className="border border-gray2 border-opacity-70 dark:border-opacity-10">
                                        {all.parts && all.parts.length > 0 && all.parts.map((part, index) => (
                                          <li key={part.id} className="shadow-md p-5 dark:bg-black3 dark:text-gray2 border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                            <div className="flex items-center justify-between w-full mb-6">
                                              <div className="w-4/5 mb-4 md:mb-0">
                                                <p className="text-sm text-gray3 dark:text-gray4">
                                                  Model:
                                                  <span className="font-semibold text-black2 dark:text-white"> {part.anaglyph.model.title}</span>
                                                </p>
                                                <p className="text-sm text-gray3 dark:text-gray4">
                                                  Section Name:
                                                  <span className="font-semibold text-black2 dark:text-white"> {part.anaglyph.title}</span>
                                                </p>
                                              </div>

                                              <div className="w-1/5 flex justify-end">
                                                <Link
                                                  target={'_blank'}
                                                  to={`/device-model/${part.anaglyph.model.id}/asset-info/3d/${part.anaglyph.id}`}
                                                  className="flex items-center bg-transparent text-black3 dark:text-gray2 md:text-sm 2xl:text-base font-medium 
                                                              border border-primary rounded-full px-6 py-2 shadow-sm transition-all duration-300 
                                                              hover:bg-primary hover:text-white focus:outline-0"
                                                >
                                                  {/* <img src="/assets/icons/icon-link.svg" alt="icon-link" className="w-4 h-4 mr-1" /> */}
                                                  View Details
                                                </Link>
                                              </div>
                                            </div>

                                            {/* Right Section - Part Details */}
                                            <div className="w-full grid grid-cols-4 gap-4 text-sm text-black3 dark:text-gray6 font-roboto">
                                              <p className='uppercase text-amber-900'>Part Name: <span className="block font-medium text-primary">{part.part_name}</span></p>
                                              <p>Description: <span className="block font-medium text-secondary">{part.part_description}</span></p>
                                              <p>MFR Code: <span className="block font-medium text-navyblue1">{part.manufacturer_code}</span></p>
                                              <p>NSN: <span className="block font-medium text-blue2">{part.nsn_number}</span></p>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                  }
                                </>
                              }

                              {/* All Workorders */}
                              {(permissions.includes("all_work_order") || permissions.includes("read_work_order") || permissions.includes("Admin")) &&
                                <>
                                  {all.work_orders && all.work_orders.length > 0 &&
                                    <div className='mb-10'>
                                      <div className="text-sm font-medium text-primary mb-2 px-6">Work Orders</div>
                                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                                        {all.work_orders && all.work_orders.length > 0 && all.work_orders.map((workorder, index) => {
                                          return (
                                            <li key={workorder.id} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                              <div>
                                                <div className="text-base font-medium capitalize leading-tight">{workorder.title}</div>
                                                <p className='text-sm'>Work Order Number: {workorder.work_order_number}</p>
                                              </div>

                                              <Link target={'_blank'} to={`/workorder-details/${workorder.id}?status=&transmitted=search`} exact={true} className='ml-auto'>
                                                <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                                              </Link>
                                            </li>
                                          )
                                        })}
                                      </ul>
                                    </div>
                                  }
                                </>
                              }

                              {/* All Users */}
                              {(permissions.includes("all_user") || permissions.includes("read_user") || permissions.includes("Admin")) &&
                                <>
                                  {all.users && all.users.length > 0 &&
                                    <div className='mb-10'>
                                      <div className="text-sm font-medium text-primary mb-2 px-6">Users</div>
                                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                                        {all.users && all.users.length > 0 && all.users.map((user, index) => {
                                          return (
                                            <li key={user.id} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                              <div>
                                                <div className="text-base font-medium capitalize leading-tight mb-1 w-[500px] text-ellipsis whitespace-nowrap overflow-hidden" title={`${user.first_name} ${user.last_name}`}>{user.first_name} {user.last_name}</div>
                                                <p className='text-xs'>
                                                  User ID: <span className='font-medium'>{user.user_id}</span> |
                                                  Email: <span className='font-medium'>{user.email}</span> |
                                                  Mobile: <span className='font-medium'>{user.mobile_number}</span>
                                                </p>
                                              </div>

                                              <Link target={'_blank'} to={`/edit-user/${user.id}`} exact={true} className='ml-auto'>
                                                <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                                              </Link>
                                            </li>
                                          )
                                        })}
                                      </ul>
                                    </div>
                                  }
                                </>
                              }
                            </>
                          }
                        </>
                      }
                    </>
                  }
                </div>
              </Tab.Panel>


              {/* Devices Tab : Start */}
              <Tab.Panel>
                <div className='w-full h-[50vh] xl:h-[75vh] pr-6 pb-20 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black1 scrollbar-track-gray4 dark:scrollbar-track-darkMainBg  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                  {!(permissions.includes("all_device") || permissions.includes("read_device") || permissions.includes("Admin")) ?
                    <PermissionsMessage
                      additionalClassName="py-40 px-8"
                      title="All Devices"
                      message="read device"
                    />
                    :
                    <>
                      <div className="text-sm font-medium text-primary mb-2 px-6">Devices</div>
                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                        {allLoading ?
                          <Skeleton
                            count={10}
                            height={55}
                            baseColor="#f5f5f5"
                            highlightColor='#e1e1e1'
                            borderRadius="0"
                            enableAnimation="true"
                            duration={2.5}
                            inline={true}
                            className="dark:bg-darkMainBg"
                          />
                          :
                          <>
                            {all.devices && all.devices.length > 0 ?
                              <>
                                {all.devices && all.devices.length > 0 && all.devices.map((device, index) => {
                                  return (
                                    <li key={device.id} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                      <div>
                                        <div className="text-base font-medium capitalize leading-tight mb-1">{device.name}</div>
                                        <p className='text-xs'>
                                          Device ID: <span className='font-medium'>{device.device_id}</span> |
                                          Manufactured by: <span className='font-medium'>{device.manufactured_by}</span> |
                                          Location: <span className='font-medium'>{device.device_location}</span>
                                        </p>
                                      </div>

                                      <Link target={'_blank'} to={`/device-details/${device.id}?page_from=device`} exact={true} className='ml-auto'>
                                        <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                                      </Link>
                                    </li>
                                  )
                                })}
                              </>
                              :
                              <div className='text-danger text-center py-[280px]'>No Devices Found</div>
                            }
                          </>
                        }
                      </ul>
                    </>
                  }
                </div>
              </Tab.Panel>


              {/* Models Tab : Start */}
              <Tab.Panel>
                <div className='w-full h-[50vh] xl:h-[75vh] pr-6 pb-20 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black1 scrollbar-track-gray4 dark:scrollbar-track-darkMainBg  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                  {!(permissions.includes("all_model") || permissions.includes("read_model") || permissions.includes("Admin")) ?
                    <PermissionsMessage
                      additionalClassName="py-40 px-8"
                      title="All Models"
                      message="read model"
                    />
                    :
                    <>
                      <div className="text-sm font-medium text-primary mb-2 px-6">Models</div>
                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                        {allLoading ?
                          <Skeleton
                            count={10}
                            height={55}
                            baseColor="#f5f5f5"
                            highlightColor='#e1e1e1'
                            borderRadius="0"
                            enableAnimation="true"
                            duration={2.5}
                            inline={true}
                            className="dark:bg-darkMainBg"
                          />
                          :
                          <>
                            {all.models && all.models.length > 0 ?
                              <>
                                {all.models && all.models.length > 0 && all.models.map((model, index) => {
                                  return (
                                    <li key={model.id} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                      <div>
                                        <div className="text-base font-medium capitalize leading-tight mb-1 w-[500px] text-ellipsis whitespace-nowrap overflow-hidden" title={model.title}>{model.title}</div>
                                        <p className='text-xs'>Model ID: <span className='font-medium'>{model.model_id}</span></p>
                                      </div>

                                      <Link target={'_blank'} to={`/device-model/${model.id}`} exact={true} className='ml-auto'>
                                        <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                                      </Link>
                                    </li>
                                  )
                                })}
                              </>
                              :
                              <div className='text-danger text-center py-[280px]'>No Models Found</div>
                            }
                          </>
                        }
                      </ul>
                    </>
                  }
                </div>
              </Tab.Panel>

              {/* Parts Tab : Start */}
              <Tab.Panel>
                <div className='w-full h-[50vh] xl:h-[75vh] pr-6 pb-20 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black1 scrollbar-track-gray4 dark:scrollbar-track-darkMainBg  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                  {!(permissions.includes("all_model") || permissions.includes("read_model") || permissions.includes("Admin")) ?
                    <PermissionsMessage
                      additionalClassName="py-40 px-8"
                      title="All Models"
                      message="read model"
                    />
                    :
                    <>
                      <div className="text-sm font-medium text-primary mb-2 px-6">Parts</div>
                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                        {allLoading ?
                          <Skeleton
                            count={10}
                            height={55}
                            baseColor="#f5f5f5"
                            highlightColor='#e1e1e1'
                            borderRadius="0"
                            enableAnimation="true"
                            duration={2.5}
                            inline={true}
                            className="dark:bg-darkMainBg"
                          />
                          :
                          <>
                            {all.parts && all.parts.length > 0 ?
                              <>
                                {all.parts && all.parts.length > 0 && all.parts && all.parts.length > 0 && all.parts.map((part, index) => (
                                  <li key={part.id} className="shadow-md p-5 dark:bg-black3 dark:text-gray2 border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                    <div className="flex items-center justify-between w-full mb-6">
                                      <div className="w-4/5 mb-4 md:mb-0">
                                        <p className="text-sm text-gray3 dark:text-gray4">
                                          Model:
                                          <span className="font-semibold text-black2 dark:text-white"> {part.anaglyph.model.title}</span>
                                        </p>
                                        <p className="text-sm text-gray3 dark:text-gray4">
                                          Section Name:
                                          <span className="font-semibold text-black2 dark:text-white"> {part.anaglyph.title}</span>
                                        </p>
                                      </div>

                                      <div className="w-1/5 flex justify-end">
                                        <Link
                                          target={'_blank'}
                                          to={`/device-model/${part.anaglyph.model.id}/asset-info/3d/${part.anaglyph.id}`}
                                          className="flex items-center bg-transparent text-black3 dark:text-gray2 md:text-sm 2xl:text-base font-medium 
                                                        border border-primary rounded-full px-6 py-2 shadow-sm transition-all duration-300 
                                                        hover:bg-primary hover:text-white focus:outline-0"
                                        >
                                          {/* <img src="/assets/icons/icon-link.svg" alt="icon-link" className="w-4 h-4 mr-1" /> */}
                                          View Details
                                        </Link>
                                      </div>
                                    </div>

                                    {/* Right Section - Part Details */}
                                    <div className="w-full grid grid-cols-4 gap-4 text-sm text-black3 dark:text-gray6 font-roboto">
                                      <p className='uppercase text-amber-900'>Part Name: <span className="block font-medium text-primary">{part.part_name}</span></p>
                                      <p>Description: <span className="block font-medium text-secondary">{part.part_description}</span></p>
                                      <p>MFR Code: <span className="block font-medium text-navyblue1">{part.manufacturer_code}</span></p>
                                      <p>NSN: <span className="block font-medium text-blue2">{part.nsn_number}</span></p>
                                    </div>
                                  </li>
                                ))
                                }
                              </>
                              :
                              <div className='text-danger text-center py-[280px]'>No Parts Found</div>
                            }
                          </>
                        }
                      </ul>
                    </>
                  }
                </div>
              </Tab.Panel>


              {/* Section Tab : Start */}
              <Tab.Panel>
                <div className='w-full h-[50vh] xl:h-[75vh] pr-6 pb-20 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black1 scrollbar-track-gray4 dark:scrollbar-track-darkMainBg  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                  {!(permissions.includes("all_model") || permissions.includes("read_model") || permissions.includes("Admin")) ?
                    <PermissionsMessage
                      additionalClassName="py-40 px-8"
                      title="All Models"
                      message="read model"
                    />
                    :
                    <>
                      <div className="text-sm font-medium text-primary mb-2 px-6">3D/Anaglyphs</div>
                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                        {allLoading ?
                          <Skeleton
                            count={10}
                            height={55}
                            baseColor="#f5f5f5"
                            highlightColor='#e1e1e1'
                            borderRadius="0"
                            enableAnimation="true"
                            duration={2.5}
                            inline={true}
                            className="dark:bg-darkMainBg"
                          />
                          :
                          <>
                            {all.anaglyphs && all.anaglyphs.length > 0 ?
                              <>
                                {all.anaglyphs && all.anaglyphs.length > 0 && all.anaglyphs.map((anaglyph, index) => {
                                  return (
                                    <li key={anaglyph.id} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                      <div>
                                        <div className="text-base font-medium capitalize leading-tight mb-1 w-[500px] text-ellipsis whitespace-nowrap overflow-hidden" title={anaglyph.title}>{anaglyph.title}</div>
                                        <p className='text-xs'>
                                          Model ID: <span className='font-medium'>{anaglyph.model.title}</span>
                                        </p>
                                      </div>

                                      <Link target={'_blank'} to={`/device-model/${anaglyph.model.id}/asset-info/3d/${anaglyph.id}`} exact={true} className='ml-auto'>
                                        <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                                      </Link>
                                    </li>
                                  )
                                })}
                              </>
                              :
                              <div className='text-danger text-center py-[280px]'>No 3D/Anaglyphs Found</div>
                            }
                          </>
                        }
                      </ul>
                    </>
                  }
                </div>
              </Tab.Panel>

              {/* Workorders Tab : Start */}
              <Tab.Panel>
                <div className='w-full h-[50vh] xl:h-[75vh] pr-6 pb-20 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black1 scrollbar-track-gray4 dark:scrollbar-track-darkMainBg  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                  {!(permissions.includes("all_work_order") || permissions.includes("read_work_order") || permissions.includes("Admin")) ?
                    <PermissionsMessage
                      additionalClassName="py-40 px-8"
                      title="All Workorders"
                      message="read work order"
                    />
                    :
                    <>
                      <div className="text-sm font-medium text-primary mb-2 px-6">Work Orders</div>
                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                        {allLoading ?
                          <Skeleton
                            count={10}
                            height={55}
                            baseColor="#f5f5f5"
                            highlightColor='#e1e1e1'
                            borderRadius="0"
                            enableAnimation="true"
                            duration={2.5}
                            inline={true}
                            className="dark:bg-darkMainBg"
                          />
                          :
                          <>
                            {all.work_orders && all.work_orders.length > 0 ?
                              <>
                                {all.work_orders && all.work_orders.length > 0 && all.work_orders.map((workorder, index) => {
                                  return (
                                    <li key={workorder.id} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                      <div>
                                        <div className="text-base font-medium capitalize leading-tight mb-1 w-[500px] text-ellipsis whitespace-nowrap overflow-hidden" title={workorder.title}>{workorder.title}</div>
                                        <p className='text-xs'>Work Order Number: <span className='font-medium'>{workorder.work_order_number}</span></p>
                                      </div>

                                      <Link target={'_blank'} to={`/workorder-details/${workorder.id}?status=&transmitted=search`} exact={true} className='ml-auto'>
                                        <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                                      </Link>
                                    </li>
                                  )
                                })}
                              </>
                              :
                              <div className='text-danger text-center py-[280px]'>No Workorders found</div>
                            }
                          </>
                        }
                      </ul>
                    </>
                  }
                </div>

                {/* <div className='w-full h-[50vh] xl:h-[75vh] pr-6 pb-20 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black2 scrollbar-track-gray4 dark:scrollbar-track-black3  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                  <div className="text-sm font-medium text-primary mb-2 px-6">Workorder</div>
                  <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                  {models && models.map((model, index) => {
                    const { title, model_id, which_category } = model;
                    return (
                      <li  key={index} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                        <div>
                          <div className="text-base font-medium capitalize leading-tight max-w-[500px] text-ellipsis whitespace-nowrap overflow-hidden">{title}</div>
                          <p className='text-sm'>{`${model_id} | ${which_category}`}</p>
                        </div>

                        <Link to="" exact={true}  className='ml-auto'>
                            <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                        </Link>
                      </li>
                    )
                  })}
                  </ul>
                </div> */}
              </Tab.Panel>


              {/* Users Tab : Start */}
              <Tab.Panel>
                <div className='w-full h-[50vh] xl:h-[75vh] pr-6 pb-20 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black1 scrollbar-track-gray4 dark:scrollbar-track-darkMainBg  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                  {!(permissions.includes("all_user") || permissions.includes("read_user") || permissions.includes("Admin")) ?
                    <PermissionsMessage
                      additionalClassName="py-40 px-8"
                      title="All Users"
                      message="read user"
                    />
                    :
                    <>
                      <div className="text-sm font-medium text-primary mb-2 px-6">Users</div>
                      <ul className='border border-gray2 border-opacity-70 dark:border-opacity-10'>
                        {allLoading ?
                          <Skeleton
                            count={10}
                            height={55}
                            baseColor="#f5f5f5"
                            highlightColor='#e1e1e1'
                            borderRadius="0"
                            enableAnimation="true"
                            duration={2.5}
                            inline={true}
                            className="dark:bg-darkMainBg"
                          />
                          :
                          <>
                            {all.users && all.users.length > 0 ?
                              <>
                                {all.users && all.users.length > 0 && all.users.map((user, index) => {
                                  return (
                                    <li key={user.id} className="flex items-start border-b border-gray2 border-opacity-70 dark:border-black3 dark:text-gray2 last-of-type:border-none py-4 px-6 odd:bg-gray4 odd:bg-opacity-60 dark:odd:bg-opacity-10">
                                      <div>
                                        <div className="text-base font-medium capitalize leading-tight mb-1 w-[500px] text-ellipsis whitespace-nowrap overflow-hidden" title={`${user.first_name} ${user.last_name}`}>{user.first_name} {user.last_name}</div>
                                        <p className='text-xs'>
                                          User ID: <span className='font-medium'>{user.user_id}</span> |
                                          Email: <span className='font-medium'>{user.email}</span> |
                                          Mobile: <span className='font-medium'>{user.mobile_number}</span>
                                        </p>
                                      </div>

                                      <Link target={'_blank'} to={`/edit-user/${user.id}`} exact={true} className='ml-auto'>
                                        <img src="/assets/icons/icon-link.svg" alt="icon-link" />
                                      </Link>
                                    </li>
                                  )
                                })}
                              </>
                              :
                              <div className='text-danger text-center py-[280px]'>No Users Found</div>
                            }
                          </>
                        }
                      </ul>
                    </>
                  }
                </div>
              </Tab.Panel>

            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>``
    </>
  )
}
export default GlobalSearch;