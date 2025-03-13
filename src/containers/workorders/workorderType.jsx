import React from "react";
import Layout from '../../layout';
import { Tab } from "@headlessui/react";
import ICON_HOME from '../../assets/icons/icon-home.svg';
import ICON_SEARCH from '../../assets/icons/icon-search.svg';


// Tab List
const tabs = [
  { title: 'Task Type' },
  { title: 'Device Info' },
  { title: 'Assign to' }
]


// Error code list
const codes = [
  { title: 'EC01' },
  { title: 'EC02' },
  { title: 'EC03' },
  { title: 'EC04' },
  { title: 'EC05' },
  { title: 'EC06' },
]

// Procedures List
const procedures = [
  { title: 'Shaft Cleaning' },
  { title: 'Procedure Rotary' },
  { title: 'Rotary Screw' },
  { title: 'Shaft Cleaning' },
  { title: 'SMCloud' },
  { title: 'Shaft Cleaning' },
  { title: 'Rotary Screw' },
]


const WorkOrderType = () => {
  return (
    <>
      <Layout>
        <section>
           {/* Breadcrumbs : Start */}
           <div className="mb-10">
              <div className="flex items-center">
                <img src={ICON_HOME} alt="icon-home" />
                <span className="ml-1 text-xs text-black font-medium">Workorders</span>
              </div>
              <h1 className="md:text-2xl xl:text-3xl text-black font-bold">Workorder Type</h1>
          </div>
          {/* Breadcrumbs : End */}

          {/* Tabs Section : Start */}
          <div>
            <Tab.Group>
              <Tab.List className="mb-6 whitespace-nowrap md:overflow-x-scroll xl:overflow-x-hidden">
                {tabs.map((tab, index) => {
                  const { title } = tab;
                  return (
                    <Tab
                        key={index}
                        className={({ selected }) =>
                          selected ?
                            'text-lg text-black2 font-bold border-b-4 border-primary mr-8'
                            :
                            'text-lg text-black2 opacity-50 font-bold mr-8 border-none hover:opacity-100 focus:outline-0 focus-visible:outline-none'
                        }
                      >
                        {title}
                    </Tab>
                  )
                })}
              </Tab.List>

              <Tab.Panels>
                {/* Task Type Tab : Start */}
                <Tab.Panel>
                  <div className="w-full bg-white border border-gray2 rounded-3xl p-8">
                    <form>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-start-1 col-span-2">
                          <label htmlFor="wo_device_name" className="text-sm font-medium">Device Name <span className="text-danger">*</span></label>
                          <select
                            name="wo_device_name"
                            id="wo_device_name"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1"
                          >
                            <option disabled>Select</option>
                            <option value="">CNC Machine A02</option>
                          </select>
                        </div>

                        <div className="col-start-1 md:col-span-2 xl:col-span-1">
                          <div className="flex items-center justify-between">
                            <label htmlFor="wo_device_task_type" className="text-sm font-medium">Task Type <span className="text-danger">*</span></label>
                            <div className="ml-auto">
                              <span className="text-xs">New task type detected</span>
                              <button type="button" className="text-xs font-medium text-primary text-opacity-75 ml-4 transition-all hover:text-opacity-100 hover:transition-all">
                                Add to type +
                              </button>
                            </div>
                          </div>
                          <select
                            name="wo_device_task_type"
                            id="wo_device_task_type"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1"
                          >
                            <option disabled>Select</option>
                            <option value="">CNC A02</option>
                          </select>
                        </div>

                        <div className="col-start-2 md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_device_category" className="text-sm font-medium">Category <span className="text-danger">*</span></label>
                          <select
                            name="wo_device_category"
                            id="wo_device_category"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1"
                          >
                            <option disabled>Select</option>
                            <option value="">CNC</option>
                          </select>
                        </div>

                        <div className="col-start-1 col-span-2">
                          <label htmlFor="wo_device_trouble" className="text-sm font-medium">Task/Trouble <span className="text-danger">*</span></label>
                          <div className="flex md:flex-col xl:flex-row items-center">
                            <div className="md:w-full xl:w-[90%]">
                              <select
                                name="wo_device_trouble"
                                id="wo_device_trouble"
                                className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1"
                              >
                                <option disabled>Select</option>
                                <option value="">CNC</option>
                              </select>
                            </div>

                            <div className="md:w-full xl:w-[10%] text-right md:mt-2">
                              <button type="button" className="text-sm text-primary text-opacity-80 font-medium transition-all hover:text-opacity-100 hover:transition-all">Add Trouble +</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* List of Error Codes and Procedures */}
                      <div className="grid grid-cols-2 gap-5 mt-5">
                        <div className="col-start-1 md:col-span-2 xl:col-span-1">
                          <div className="text-sm font-medium mb-2">Error Codes</div>
                          <div className="bg-gray4 border border-gray2 rounded-xl p-4">
                            <div className="w-full relative overflow-hidden">
                              <input
                                type="search"
                                className="w-full bg-white  text-sm px-4 py-2 border border-gray2 rounded-full  focus:border-secondary focus:outline-none"
                                name="user_search"
                                id="user_search"
                                placeholder="Search for error codes..."
                              />
                              <button className="block absolute top-3 right-3 m-auto">
                                <img src={ICON_SEARCH} alt="icon-search" className="w-4 h-4 block m-auto" />
                              </button>
                            </div>

                            <div className="h-[150px] mt-4 md:overflow-scroll 2xl:overflow-hidden md:scrollbar-thin 2xl:hover:scrollbar-thin scrollbar-thumb-gray4 scrollbar-track-gray2 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                              {codes.map((code, index) => {
                                const { title } = code;
                                return (
                                  <label key={index} htmlFor="" className="flex items-center text-sm mb-2">
                                    <input
                                      type="checkbox"
                                      name=""
                                      id=""
                                      className="w-4 h-4"
                                    />
                                    <span className="ml-2">{title}</span>
                                  </label>
                                )
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="col-start-2  md:col-span-2 xl:col-span-1">
                          <div className="text-sm font-medium mb-2">Procedures</div>
                          <div className="bg-gray4 border border-gray2 rounded-xl p-4">
                            <div className="w-full relative overflow-hidden">
                              <input
                                type="search"
                                className="w-full bg-white  text-sm px-4 py-2 border border-gray2 rounded-full  focus:border-secondary focus:outline-none"
                                name="user_search"
                                id="user_search"
                                placeholder="Search for procedures..."
                              />
                              <button className="block absolute top-3 right-3 m-auto">
                                <img src={ICON_SEARCH} alt="icon-search" className="w-4 h-4 block m-auto" />
                              </button>
                            </div>

                            <div className="h-[150px] mt-4 md:overflow-scroll 2xl:overflow-hidden md:scrollbar-thin 2xl:hover:scrollbar-thin scrollbar-thumb-gray4 scrollbar-track-gray2 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                              {procedures.map((procedure, index) => {
                                const { title } = procedure;
                                return (
                                  <label key={index} htmlFor="" className="flex items-center w-full text-sm mb-2">
                                    <input
                                      type="checkbox"
                                      name=""
                                      id=""
                                      className="w-4 h-4"
                                    />
                                    <span className="ml-2">{title}</span>
                                  </label>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="flex items-center justify-end mt-6">
                    <button type="button" className="bg-transparent text-black2 text-sm font-bold border border-black2 rounded-full px-6 py-2 mr-6 shadow-sm transition-all hover:bg-black2 hover:text-white hover:transition-all">
                      Save draft &amp; exit
                    </button>
                    <button type="button" className="bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-10 py-2 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all">
                      Next
                    </button>
                  </div>
                </Tab.Panel>
                {/* Task Type Tab : End */}


                {/* Device Info Tab : Start */}
                <Tab.Panel>
                  <div className="w-full bg-white border border-gray2 rounded-3xl p-8">
                    <form>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-start-1 md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_device_id" className="text-sm font-medium">Device ID <span className="text-danger">*</span></label>
                          <select
                            name="wo_device_id"
                            id="wo_device_id"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1"
                          >
                            <option disabled>Select</option>
                            <option value="">CNC Machine A02</option>
                          </select>
                        </div>

                        <div className="col-start-2  md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_device_slno" className="text-sm font-medium">Serial Number </label>
                          <select
                            name="wo_device_slno"
                            id="wo_device_slno"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1"
                          >
                            <option disabled>Select</option>
                            <option value="">CNC A02</option>
                          </select>
                        </div>

                        <div className="col-start-1  md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_device_model_no" className="text-sm font-medium">Model No</label>
                          <input
                            type="text"
                            name="wo_device_model_no"
                            id="wo_device_model_no"
                            placeholder="Model No"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                          />
                        </div>

                        <div className="col-start-2 md:col-span-2 xl:col-span-1">
                          <label className="text-sm font-medium">WxDxL</label>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-start-1">
                              <input
                                type="text"
                                id="wo_device_w"
                                name="wo_device_w"
                                placeholder="W"
                                className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                              />
                            </div>
                            <div className="col-start-2">
                              <input
                                type="text"
                                id="wo_device_d"
                                name="wo_device_d"
                                placeholder="D"
                                className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                              />
                            </div>
                            <div className="col-start-3">
                              <input
                                type="text"
                                id="wo_device_l"
                                name="wo_device_l"
                                placeholder="L"
                                className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-start-1 md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_device_location" className="text-sm font-medium">Device Location</label>
                          <input
                            type="text"
                            name="wo_device_location"
                            id="wo_device_location"
                            placeholder="Device Location"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                          />
                        </div>

                        <div className="col-start-2 md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_device_manufactured_by" className="text-sm font-medium">Manufactured By</label>
                          <input
                            type="text"
                            name="wo_device_manufactured_by"
                            id="wo_device_manufactured_by"
                            placeholder="Manufactured By"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                          />
                        </div>

                        <div className="col-start-1 md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_device_manufactured_date" className="text-sm font-medium">Manufactured Date <span className="text-danger">*</span></label>
                          <input
                            type="date"
                            name="wo_device_manufactured_date"
                            id="wo_device_manufactured_date"
                            placeholder="Manufactured Date"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                          />
                        </div>

                        <div className="col-start-2 md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_device_warranty" className="text-sm font-medium">Warranty <span className="text-danger">*</span></label>
                          <input
                            type="date"
                            name="wo_device_warranty"
                            id="wo_device_warranty"
                            placeholder="Warranty"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="flex items-center justify-end mt-6">
                    <button type="button" className="bg-transparent text-black2 text-sm font-bold border border-black2 rounded-full px-6 py-2 mr-6 shadow-sm transition-all hover:bg-black2 hover:text-white hover:transition-all">
                      Save draft &amp; exit
                    </button>
                    <button type="button" className="bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-10 py-2 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all">
                      Next
                    </button>
                  </div>
                </Tab.Panel>
                {/* Device Info Tab : End */}


                {/* Assign to Tab : Start */}
                <Tab.Panel>
                  <div className="w-full bg-white border border-gray2 rounded-3xl p-8">
                    <form>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="col-start-1">
                          <label htmlFor="wo_assigned_to" className="text-sm font-medium">Assign To <span className="text-danger">*</span></label>
                          <select
                            name="wo_assigned_to"
                            id="wo_assigned_to"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1"
                          >
                            <option disabled>Select</option>
                            <option value="">Technician</option>
                          </select>
                        </div>

                        <div className="col-start-2">
                          <select
                            name="wo_assigned_to"
                            id="wo_assigned_to"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-7"
                          >
                            <option disabled>Select</option>
                            <option value="">Adam Levin</option>
                          </select>
                        </div>

                        <div className="col-start-1  md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_assigned_date" className="text-sm font-medium">Date <span className="text-danger">*</span></label>
                          <input
                            type="date"
                            name="wo_assigned_date"
                            id="wo_assigned_date"
                            placeholder="Date"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                          />
                        </div>

                        <div className="col-start-2 md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_assigned_priority" className="text-sm font-medium">Priority <span className="text-danger">*</span></label>
                          <select
                            name="wo_assigned_priority"
                            id="wo_assigned_priority"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                          >
                            <option disabled>Select</option>
                            <option value="">High</option>
                          </select>
                        </div>

                        <div className="col-start-1 md:col-span-2 xl:col-span-1">
                          <label htmlFor="wo_export_template" className="text-sm font-medium">Export Template <span className="text-danger">*</span></label>
                          <select
                            name="wo_export_template"
                            id="wo_export_template"
                            className="w-full bg-gray4 border border-gray2 rounded-md px-4 py-2 mt-1 focus:border-secondary focus:outline-none"
                          >
                            <option disabled>Select</option>
                            <option value="">Edlore TMP 01</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="flex items-center justify-end mt-6">
                    <button type="button" className="bg-transparent text-black2 text-sm font-bold border border-black2 rounded-full px-6 py-2 mr-6 shadow-sm transition-all hover:bg-black2 hover:text-white hover:transition-all">
                      Save draft &amp; exit
                    </button>
                    <button type="button" className="bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-10 py-2 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all">
                      Save &amp; Assign
                    </button>
                  </div>
                </Tab.Panel>
                {/* Assign to Tab : End */}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
      </Layout>
    </>
  );
}
export default WorkOrderType;