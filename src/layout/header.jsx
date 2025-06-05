import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ToastrSuccess from "../components/common/toastrSuccess";
import { stopToaster } from "../redux/reduxes/toaster/tosterAction";
import { getAllGlobalSearch } from "../redux/reduxes/globalSearch/globalSearchAction";
import GlobalSearch from "../components/globalSearch/globalSearch";
import { unreadNotificationCount } from "../redux/reduxes/notifications/notificationAction";

const Header = () => {
  const dispatch = useDispatch();

  const authData = useSelector((state) => state.auth.authData);
  const userProfileImage = useSelector((state) => state.auth.userProfileImage);
  const userProfileName = useSelector((state) => state.auth.userProfileName);
  const unreadNotification = useSelector(
    (state) => state.notifications.unreadNotificationCount,
  );
  const [showSearchResult, setShowSearchResult] = useState(false);
  const showToast = useSelector((state) => state.toaster.show);
  const toaster = useSelector((state) => state.toaster);
  const gotPermissionLastTime = useSelector(
    (state) => state.auth.gotPermissionLastTime,
  );
  const gotUserDetailsLastTime = useSelector(
    (state) => state.auth.gotUserDetailsLastTime,
  );
  const passwordUpdatedTime = useSelector(
    (state) => state.auth.password_updated_at,
  );

  useEffect(() => {
    const data = {
      gotPermissionLastTime: gotPermissionLastTime,
      gotUserDetailsLastTime: gotUserDetailsLastTime,
      passwordUpdatedTime: passwordUpdatedTime,
    };
    console.log("HERER", Date.now());
    dispatch(unreadNotificationCount(data));
  }, []);

  // Global Search
  const [searchGlobalQuery, setSearchGlobalQuery] = useState("");
  const handleGlobalSearch = (searchData) => {
    setShowSearchResult(true);
    setSearchGlobalQuery(searchData);
    const data = {
      search: searchData,
      type: "",
    };
    dispatch(getAllGlobalSearch(data));
  };

  return (
    <>
      <header className="fixed flex items-center z-50 bg-white dark:bg-darkBg dark:border-b dark:border-black3  w-full h-[60px] px-4 py-2 shadow-md dark:shadow-[229px_229px_229px_rgba(0,0,0,0.75)] overflow-hidden">
        <div className="w-full  flex items-center">
          <div className="w-[180px] xl:w-[250px] flex items-center">
            <Link
              to="/"
              exact={true}
              className="inline-block max-w-[200px] h-full overflow-hidden"
            >
              <img
                src={authData.org_logo}
                alt="organization-logo"
                className="max-w-[200px] h-[50px] object-contain my-auto"
              />
            </Link>
          </div>

          <div className="flex flex-row w-[280px] xl:w-[500px] relative overflow-hidden">
            <input
              type="search"
              className="ed-global__search w-full bg-gray dark:bg-darkBg dark:text-gray2 border text-sm border-gray2 dark:border-opacity-50 px-4 py-[7px]  rounded-full focus:border-secondary focus:outline-none"
              id="global_search"
              name="global_search"
              placeholder="Search Devices, Models, Work Orders, Users..."
              onChange={(e) => handleGlobalSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end  ml-auto">
            <Link
              to="/"
              exact={true}
              className="hidden lg:block md:text-xs 2xl:text-sm text-gray3 dark:text-white font-medium uppercase"
            >
              Organization Admin{" "}
            </Link>

            <Link
              to="/notifications"
              exact={true}
              className="relative text-base text-gray3 uppercase md:ml-4 xl:ml-8"
            >
              {/* {unreadNotification} */}
              <div className="relative">
                <img
                  src="../assets/icons/icon-bell.svg"
                  alt="icon-notification"
                  className="w-[20px] h-[20px] dark:invert transition-all opacity-70 hover:opacity-100 dark:hover:opacity-100 dark:hover:transition-all"
                />
                {unreadNotification > 0 && (
                  <div className="flex flex-col items-center justify-center absolute -right-2 -top-3 bg-primary text-white text-xs px-[6px] py-[1px] rounded-full shadow-sm">
                    {unreadNotification}
                  </div>
                )}
              </div>
            </Link>

            <Link
              to={`/edit-profile`}
              exact={true}
              className="flex items-center ml-6 pl-4 border-l border-gray2"
            >
              <span>
                <img
                  src="../assets/icons/icon-edit.svg"
                  alt="icon-edit"
                  className="min-w-4 m-h-4 dark:invert"
                  title="Edit"
                />
              </span>
              <span
                className="mx-2 md:text-sm 2xl:text-base text-black2 dark:text-white font-bold capitalize w-[100px] text-ellipsis whitespace-nowrap overflow-hidden"
                title={userProfileName}
              >
                {userProfileName}
              </span>
              <div className="flex items-center w-[45px] h-[45px] bg-gray2 dark:bg-black2 border border-gray2 dark:border-black2 rounded-full overflow-hidden">
                <img
                  src={userProfileImage}
                  alt="profile"
                  className="block mx-auto w-[45px] h-[45px] rounded-full object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>

      {showToast && (
        <ToastrSuccess
          toastrMessage={toaster.content}
          hideToastrAction={stopToaster}
        />
      )}

      {searchGlobalQuery && showSearchResult && (
        <div
          className={`fixed top-[60px] inset-0 z-[60] bg-black2 dark:bg-darkBg bg-opacity-50 dark:bg-opacity-50`}
        >
          <GlobalSearch
            searchGlobalQuery={searchGlobalQuery}
            setSearchGlobalQuery={setSearchGlobalQuery}
          />
        </div>
      )}
    </>
  );
};
export default Header;
