import React from "react";

const SystemOverview = ({ totalModels, activeDevices, draftDevices, totalDevices }) => {
  return (
    <>
      <div className="w-full h-full bg-white dark:bg-darkBg border border-gray2 dark:border-opacity-10 py-4 px-10 2xl:px-16 rounded-3xl drop-shadow-md dark:dorp-shadow-none">
        <div className="flex items-start">
          <div className="py-6 xl:py-10">
            <div className="text-2xl xl:text-4xl font-bold text-navyblue1 dark:text-gray4 mb-6 xl:mb-[60px]">Models</div>
            <div className="text-2xl xl:text-5xl font-black leading-none dark:text-gray4 "> {totalModels} </div>
            <div className="text-sm font-medium dark:text-gray4 ">Total </div>
          </div>

          <div className="flex flex-col justify-center ml-auto xl:border-l border-gray2 dark:border-opacity-20 xl:pl-[50px] 2xl:pl-[70px]  py-6 xl:py-10 ">
            <div className="text-2xl xl:text-4xl font-bold text-navyblue1 dark:text-gray4  mb-6 xl:mb-[60px]">Serial No/Devices</div>
            <div className="flex items-end">
              <div>
                <div className="text-2xl xl:text-5xl font-black leading-none dark:text-gray4 "> {activeDevices} </div>
                <div className="text-sm font-medium dark:text-gray4 ">Active </div>
              </div>
              <div className="ml-10  lg:ml-[60px] 2xl:ml-[150px]">
                <div className="text-2xl xl:text-5xl font-semibold leading-none dark:text-gray4 "> {draftDevices} </div>
                <div className="text-sm font-medium dark:text-gray4 ">Draft </div>
              </div>
              <div className="ml-10 lg:ml-[60px] 2xl:ml-[150px]">
                <div className="text-2xl xl:text-5xl font-black leading-none dark:text-gray4 "> {totalDevices} </div>
                <div className="text-sm font-medium dark:text-gray4 ">Total Devices</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default SystemOverview;