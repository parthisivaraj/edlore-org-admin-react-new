import React from "react";
import { Link } from "react-router-dom";


const DeviceActiveWorkOrders = ({ title, workOrderNumber, workOrderStatus, createdDate, wo_id }) => {
  return (
    <>
      <div className="relative flex items-start justify-between bg-white dark:bg-darkBg border border-white dark:border-opacity-10 rounded-lg drop-shadow-md dark:drop-shadow-none p-6 mt-[20px] mr-2">
        <div className="w-[70%] relative leading-snug">
          <div className="text-sm text-gray3 font-medium mb-2">{workOrderNumber}</div>
          <div className="text-base text-black3 dark:text-gray2 dark:text-opacity-75 font-bold first-letter:capitalize w-[300px] text-ellipsis whitespace-nowrap overflow-hidden" title={title}>{title}</div>
          <div className="text-xs text-gray3 dark:text-gray3 font-normal capitalize">{workOrderStatus.replace("_", " ")}</div>
        </div>
        <div className="w-[30%] text-right mr-2">
          <div className="text-xs text-gray3 dark:text-gray2">{createdDate}</div>
        </div>
        <Link to={`/workorder-details/${wo_id}?status=active&transmitted=list`} exact={true} className="absolute top-4 -right-4 z-5 bg-white dark:bg-darkMainBg border border-gray5 dark:border-darkMainBg rounded-full shadow-3xl p-3 transition-all hover:bg-black2 dark:hover:bg-darkBg hover:border-black2 hover:transition-all">
          <img src="../assets/icons/icon-arrow-right-orange.svg" alt="icon-arrow-right" />
        </Link>
      </div>
    </>
  );
}
export default DeviceActiveWorkOrders;