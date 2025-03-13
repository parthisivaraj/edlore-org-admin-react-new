import React from "react";


const DeviceLog = ({title, wo_number, wo_status, wo_completed_date}) => {
  return (
    <>
      <div className="flex items-start justify-between border-b border-gray2 dark:border-opacity-30 py-3 pr-4 last-of-type:border-none">
        <div className="w-[65%]">
          <div className="text-base text-black2 dark:text-gray2 dark:text-opacity-75 font-medium w-[200px] text-ellipsis overflow-hidden whitespace-nowrap" title={`${title} (${wo_number})`}>
            {title} <strong>({wo_number})</strong>
          </div>
          <div className="text-xs text-gray3 capitalize">{wo_status}</div>
        </div>
        <div className="w-[35%] text-sm text-gray3 dark:text-gray2 font-normal text-right">
          {wo_completed_date}
        </div>
      </div>
    </>
  );
}
export default DeviceLog;