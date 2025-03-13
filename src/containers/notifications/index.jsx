import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from '../../layout';
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";
import { getAllNotifications, clearAllNotifications } from "../../redux/reduxes/notifications/notificationAction";
import PaginatedItems from "../../components/common/pagination";
import ClearAllModal from "../../components/common/clearAllModal";
import NotificationList from "../../components/notifications/notificationList";


const Notifications = () => {
  const dispatch = useDispatch()

  // Fetch Data
  const notificationsLoading = useSelector(state => state.notifications.allNotificationsLoading);
  const olderNotificationsList = useSelector(state => state.notifications.olderNotificationsList);
  const todayNotificationsList = useSelector(state => state.notifications.todayNotificationsList);
  const yesterdayNotificationsList = useSelector(state => state.notifications.yesterdayNotificationsList);
  const type = useSelector(state => state.notifications.type);
  const allNotifications = useSelector(state => state.notifications.allNotifications);
  const pagination = useSelector(state => state.notifications.pagination);
  const clearAllNotificationsLoading = useSelector(state => state.notifications.clearAllNotificationsLoading);

  // States
  const [confirmClear, setConfirmClear] = useState(false);
  const [clearingType, setClearingType] = useState("all");
  const [notificationType, setnotificationType] = useState("all");

  // Dispatch Notifications
  useEffect(() => {
    const data = {
      type: notificationType,
      page: 0,
      limit: 10,
    }
    dispatch(getAllNotifications(data));
  }, [notificationType]);


  // Pagination
  const handlePageClick = (e) => {
    const data = {
      type: notificationType,
      page: e.selected,
      limit: 10,
    }
    dispatch(getAllNotifications(data));
  }

  // Clear Notifications
  const clearNotifications = (type) => {
    setConfirmClear(true);
    setClearingType(type);
  }

  // View All Notifications
  const viewAllNotifications = (type) => {
    setnotificationType(type);
  }


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Notifications</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div className="grid xl:grid-cols-2 gap-4 mb-8">
            <div className="col-start-1">
              <div className="flex items-center">
                <img src="../assets/icons/icon-bell.svg" alt="icon-notification" className="dark:invert" />
                <span className="ml-1 text-xs text-black dark:text-gray2 font-medium">Notifications</span>
              </div>
              <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2 font-bold">
                {type == "all" ? "All Notifications" :
                  type == "today" ? "Today's Notifications" :
                    type == "yesterday" ? "Yesterday's  Notifications" :
                      type == "older" ? "Older Notifications" : ""
                }
              </h1>
            </div>
            {type != "all" &&
              <div className="col-start-2 my-auto ml-auto">
                <button onClick={() => viewAllNotifications("all")} type="button" className="bg-transparent text-primary md:text-sm font-medium border border-primary rounded-full px-8 py-1.5 shadow-sm transition-all hover:bg-primary hover:text-white hover:transition-all focus:outline-none">
                  Back
                </button>
              </div>
            }
          </div>
          {/* Breadcrumbs : End */}


          {/* Notifications : Start */}
          <div>
            {notificationsLoading ?
              <Skeleton
                width="100%"
                height={140}
                count={8}
                baseColor="#ebebeb"
                highlightColor='#e1e1e1'
                borderRadius="10px"
                className="border border-gray4 dark:border-opacity-5 mb-3 dark:bg-darkMainBg"
                enableAnimation="true"
                duration={2.5}
              />
              :
              <>
                {type == "all" ?
                  (olderNotificationsList.length == 0 && todayNotificationsList.length == 0 && yesterdayNotificationsList.length == 0) ?
                    <div className="flex flex-col items-center justify-center w-full h-[78vh] bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl drop-shadow-md">
                      <div className="text-lg text-danger">No Notifications Found</div>
                    </div>
                    :
                    <>
                      {/* Today Notifications : Start */}
                      {todayNotificationsList && todayNotificationsList.length > 0 &&
                        <ul className="mb-10">
                          <div className="flex items-center mb-3 px-2">
                            <div className="text-base font-bold dark:text-gray2">Today</div>

                            <div className="flex items-center ml-auto ">
                              <button type="button" onClick={() => clearNotifications("today")} className="flex items-center text-sm text-danger text-opacity-80 font-medium capitalize transition-all hover:text-opacity-100 hover:transition-all focus-visible:outline-none" title="Delete">
                                <span className="mr-[6px] mt-1">Clear All</span>
                                <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="w-4 h-4 dark:invert" />
                              </button>
                              <button type="button" onClick={() => viewAllNotifications("today")} className="flex items-center text-sm text-primary text-opacity-80 font-medium capitalize ml-8 transition-all hover:text-opacity-100 hover:transition-all focus-visible:outline-none">
                                <span className="mr-[1px] mt-[1px]">View all</span>
                                <img src="../assets/icons/icon-arrow-right-blue.svg" alt="icon-arrow-right" className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {todayNotificationsList && todayNotificationsList.length > 0 && todayNotificationsList.map((noti, index) => {
                            const { id, time, task_name, title, notifiable_id, description, notifiable_type } = noti;
                            return (
                              <NotificationList
                                key={id}
                                time={time}
                                title={title}
                                task_name={task_name}
                                notifiable_id={notifiable_id}
                                description={description}
                                notifiable_type={notifiable_type}
                              />
                            )
                          })}

                        </ul>
                      }

                      {/* Yesterday's Notifications */}
                      {yesterdayNotificationsList && yesterdayNotificationsList.length > 0 &&
                        <ul className="mb-10">
                          <div className="flex items-center mb-3 px-2">
                            <div className="text-base font-bold dark:text-gray2">Yesterday</div>

                            <div className="flex items-center ml-auto ">
                              <button type="button" onClick={() => clearNotifications("yesterday")} className="flex items-center text-sm text-danger text-opacity-80 font-medium capitalize transition-all hover:text-opacity-100 hover:transition-all focus-visible:outline-none" title="Delete">
                                <span className="mr-[6px] mt-1">Clear All</span>
                                <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="w-4 h-4 dark:invert" />
                              </button>
                              <button type="button" onClick={() => viewAllNotifications("yesterday")} className="flex items-center text-sm text-primary text-opacity-80 font-medium capitalize ml-8 transition-all hover:text-opacity-100 hover:transition-all focus-visible:outline-none">
                                <span className="mr-[1px] mt-[1px]">View all</span>
                                <img src="../assets/icons/icon-arrow-right-blue.svg" alt="icon-arrow-right" className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {yesterdayNotificationsList && yesterdayNotificationsList.length > 0 && yesterdayNotificationsList.map((noti, index) => {
                            const { id, time, task_name, title, notifiable_id, description, notifiable_type } = noti;
                            return (
                              <NotificationList
                                key={id}
                                time={time}
                                title={title}
                                task_name={task_name}
                                notifiable_id={notifiable_id}
                                description={description}
                                notifiable_type={notifiable_type}
                              />
                            )
                          })}
                        </ul>
                      }

                      {/* Older Notifications */}
                      {olderNotificationsList && olderNotificationsList.length > 0 &&
                        <ul className="mb-10">
                          <div className="flex items-center mb-3 px-2">
                            <div className="text-base font-bold dark:text-gray2">Older</div>

                            <div className="flex items-center ml-auto ">
                              <button type="button" onClick={() => clearNotifications("older")} className="flex items-center text-sm text-danger text-opacity-80 font-medium capitalize transition-all hover:text-opacity-100 hover:transition-all focus-visible:outline-none" title="Delete">
                                <span className="mr-[6px] mt-1">Clear All</span>
                                <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="w-4 h-4 dark:invert" />
                              </button>
                              <button type="button" onClick={() => viewAllNotifications("older")} className="flex items-center text-sm text-primary text-opacity-80 font-medium capitalize ml-8 transition-all hover:text-opacity-100 hover:transition-all focus-visible:outline-none">
                                <span className="mr-[1px] mt-[1px]">View all</span>
                                <img src="../assets/icons/icon-arrow-right-blue.svg" alt="icon-arrow-right" className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {olderNotificationsList && olderNotificationsList.length > 0 && olderNotificationsList.map((noti, index) => {
                            const { id, time, task_name, title, notifiable_id, description, notifiable_type } = noti;
                            return (
                              <NotificationList
                                key={id}
                                time={time}
                                title={title}
                                task_name={task_name}
                                notifiable_id={notifiable_id}
                                description={description}
                                notifiable_type={notifiable_type}
                              />
                            )
                          })}
                        </ul>
                      }
                    </>
                  :

                  // All Notifications
                  <>
                    {allNotifications && allNotifications.length > 0 &&
                      <ul>
                        <div className="flex items-center mb-3 px-2">
                          <div className="text-base font-bold dark:text-gray2">
                            All  {type == "all" ? "All Notifications" :
                              type == "today" ? "Today's Notifications" :
                                type == "yesterday" ? "Yesterday's  Notifications" :
                                  type == "older" ? "Older Notifications" : ""
                            }
                          </div>
                          <button type="button" onClick={() => clearNotifications(type)} className="flex items-center ml-auto text-sm text-danger text-opacity-80 font-medium capitalize transition-all hover:text-opacity-100 hover:transition-all focus-visible:outline-none" title="Delete">
                            <span className="mr-[6px] mt-1">Clear All</span>
                            <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className="w-4 h-4 dark:invert" />
                          </button>
                        </div>

                        {allNotifications && allNotifications.length > 0 && allNotifications.map((noti, index) => {
                          const { id, time, task_name, title, notifiable_id, description, notifiable_type } = noti;
                          return (
                            <NotificationList
                              key={id}
                              time={time}
                              title={title}
                              task_name={task_name}
                              notifiable_id={notifiable_id}
                              description={description}
                              notifiable_type={notifiable_type}
                            />
                          )
                        })}
                      </ul>
                    }

                    {/* Pagination */}
                    {allNotifications && allNotifications.length > 0 &&
                      <div className="flex justify-end mt-8 px-4">
                        {notificationsLoading ?
                          <Skeleton
                            count={1}
                            width={200}
                            height={40}
                            baseColor="#f5f5f5"
                            highlightColor='#e1e1e1'
                            borderRadius="30"
                            enableAnimation="true"
                            duration={2.5}
                            inline={true}
                            className=" dark:bg-darkMainBg"
                          />
                          :
                          <PaginatedItems
                            itemsPerPage={pagination && pagination.per_page}
                            handlePageClick={handlePageClick}
                            pageCount={pagination && Math.ceil(pagination.total_entries / pagination.per_page)}
                            current_page={pagination && pagination.current_page}
                            totalEntries={pagination && pagination.total_entries}
                          />
                        }
                      </div>
                    }
                  </>
                }
              </>
            }
          </div>
          {/* Notifications : End */}
        </section>

        {/* Confirm Clear Notifications */}
        {confirmClear &&
          <ClearAllModal
            confirmClear={confirmClear}
            clearingType={clearingType}
            clearingAction={clearAllNotifications}
            setConfirmClear={setConfirmClear}
            head="Clear Notifications"
            body={
              ["Are you sure you want to clear",
                <strong className="capitalize px-1">
                  {
                    clearingType == "today" ? "Today's" :
                      clearingType == "yesterday" ? "Yesterday's" :
                        clearingType == "older" ? "Older" : ""
                  }
                </strong>,
                "notifications from the list?"
              ]}
            deleteLoading={clearAllNotificationsLoading}
          />
        }
      </Layout>
    </>
  );
}
export default Notifications;

