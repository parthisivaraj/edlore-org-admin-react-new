import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const NotificationList = ({ time, title, task_name, notifiable_id, description, notifiable_type }) => {

  // Fetch Data
  const permissions = useSelector(state => state.auth.allPermissions);

  return (
    <>
      <li className="mb-3">
        <div className="w-full h-full bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl p-6 xl:p-8 mb-4 drop-shadow-sm">
          <div className="md:flex items-start">
            <div>
              <p className="text-xs text-gray3">{time}  </p>
              <div className="text-xs font-medium dark:text-gray2 mb-2">{task_name}</div>
              <h6 className="text-lg font-medium first-letter:uppercase text-black2 dark:text-gray2">{title}</h6>
              <p className="text-base text-gray3">{description}</p>
            </div>
            <>
              {notifiable_type == "WorkOrder" ?
                <> {((permissions.includes("all_work_order") || permissions.includes("read_work_order") || permissions.includes("Admin")) &&
                  (permissions.includes("all_category") || permissions.includes("read_category") || permissions.includes("Admin")) &&
                  (permissions.includes("all_model") || permissions.includes("read_model") || permissions.includes("Admin")) &&
                  (permissions.includes("all_device") || permissions.includes("read_device") || permissions.includes("Admin")) &&
                  (permissions.includes("all_task_type") || permissions.includes("read_task_type") || permissions.includes("Admin")) &&
                  (permissions.includes("all_troubleshoot") || permissions.includes("read_troubleshoot") || permissions.includes("Admin")) &&
                  (permissions.includes("all_procedure") || permissions.includes("read_procedure") || permissions.includes("Admin")) &&
                  (permissions.includes("all_error_codes") || permissions.includes("read_error_codes") || permissions.includes("Admin")) &&
                  (permissions.includes("all_mcodes") || permissions.includes("read_mcodes") || permissions.includes("Admin")) &&
                  (permissions.includes("all_alarm_codes") || permissions.includes("read_alarm_codes") || permissions.includes("Admin")) &&
                  (permissions.includes("all_group") || permissions.includes("read_group") || permissions.includes("Admin")) &&
                  (permissions.includes("all_user") || permissions.includes("read_user") || permissions.includes("Admin"))) &&
                  (permissions.includes("all_media") || permissions.includes("read_media") || permissions.includes("Admin")) &&
                  <div className="mt-5 md:mt-auto ml-auto my-auto text-right">
                    <Link to={`/workorder-details/${notifiable_id}`} exact={true} className='bg-transparent text-sm text-black2 dark:text-gray2 whitespace-nowrap font-medium border border-black2 dark:border-gray2 rounded-full px-6 py-[10px] shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                      View Workorder
                    </Link>
                  </div>
                }</>
                : notifiable_type == "Group" ?
                  <> {(permissions.includes("all_group") || (permissions.includes("update_group") && permissions.includes("read_user")) || permissions.includes("Admin")) &&
                    <div className="mt-5 md:mt-auto ml-auto my-auto text-right">
                      <Link to={`/edit-user-group/${notifiable_id}`} exact={true} className='bg-transparent text-sm text-black2 dark:text-gray2 whitespace-nowrap font-medium border border-black2 dark:border-gray2 rounded-full px-6 py-[10px] shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                        View Group
                      </Link>
                    </div>
                  }</> : ""
              }
            </>
          </div>
        </div>
      </li>
    </>
  )
}
export default NotificationList;