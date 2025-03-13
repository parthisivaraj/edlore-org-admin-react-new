import React from "react";


const WorkorderStatusCard = ({ icon, title, description, work_order_status }) => {
  return (
    <>
      <div className="flex items-start 2xl:items-center w-full h-full bg-white dark:bg-darkBg py-7 px-7 border border-gray2 dark:border-opacity-10 rounded-3xl drop-shadow-md dark:dorp-shadow-none">
        <div className="flex items-start 2xl:items-center">
          <div>
            <img src={`../assets/icons/icon-${icon}.svg`} alt={title} className="min-w-[36px] min-h-[36px] w-[36px] h-[36px] dark:invert" />
          </div>
          <div className="ml-3">
            <div className="font-semibold text-black2 dark:text-gray4">{title}</div>
            <div className="text-sm text-black2 dark:text-gray4 dark:text-opacity-50">{description}</div>
          </div>
        </div>

        <div className="text-5xl font-bold ml-auto text-black3 dark:text-gray4">{work_order_status}</div>
      </div>
    </>
  )
}
export default WorkorderStatusCard;