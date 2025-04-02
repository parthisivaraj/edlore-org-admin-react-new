import React, { useState, Fragment, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import ThemeToggler from "../theme/themeToggler";
import { EnvironmentConstant } from "../helpers";

const menus = [
  {
    id: "1",
    icon: "devices",
    title: "Assets",
    links: [
      { id: 1, title: "All Models", url: "models" },
      { id: 2, title: "All Devices", url: "devices" },
      { id: 3, title: "Device Category", url: "device-category" },
      { id: 4, title: "Procedures", url: "procedures" },
    ],
  },

  {
    id: "2",
    icon: "workorders",
    title: "Work Orders",
    links: [
      {
        id: 1,
        title: "Active Work Orders",
        url: "active-workorders/all?device=all&all&device_specific=false",
      },
      { id: 2, title: "Drafts", url: "drafts" },
      {
        id: 3,
        title: "Completed Jobs",
        url: "completed-jobs/all?device=all&device_specific=false",
      },
      { id: 4, title: "Work Types", url: "workorder-types" },
    ],
  },
  {
    id: "3",
    icon: "users",
    title: "User Controls",
    links: [
      { id: 1, title: "Users", url: "users" },
      { id: 2, title: "User Roles", url: "user-roles" },
      { id: 3, title: "User Groups", url: "user-groups" },
    ],
  },
  {
    id: "4",
    icon: "users",
    title: "AI Assistance",
    links: [
      { id: 1, title: "Databases", url: "databases" },
      { id: 2, title: "Query", url: "ai-query" },
    ],
  },
];

const Sidebar = (props) => {
  const parentCollapseId = props.parentCollapseId;

  const manipulatedMenus = useMemo(() => {
    return menus.filter(
      (x) =>
        (EnvironmentConstant.mode === "offline" &&
          EnvironmentConstant.machine === "SERVER") ||
        x.title !== "AI Assistance",
    );
  }, []);

  // Sidebar Sub Menus
  const [collapseSubMenu, setCollapseSubMenu] = useState(false);
  const [collapseId, setCollapseId] = useState(
    localStorage.getItem("collapseId"),
  );

  const collapseMenuHandler = (id) => {
    if (id === collapseId && collapseSubMenu) {
      setCollapseId(null);
      setCollapseSubMenu(false);
    } else {
      setCollapseId(id);
      setCollapseSubMenu(true);
      localStorage.setItem("collapseId", id);
    }
  };

  const collapseOthers = (id) => {
    localStorage.setItem("collapseId", id);
  };
  const handleSubMenuCollapse = (parentCollapseId) => {
    setCollapseSubMenu(false);
    setCollapseId(parentCollapseId);
  };

  // Sidebar Toggler
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    props.expandContent(!showSidebar);
    if (showSidebar == true && collapseSubMenu == true) {
      setCollapseSubMenu(true);
    } else {
      setCollapseSubMenu(false);
    }
  };

  // Logout Confirmation
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logout = (event) => {
    Cookies.remove("access_token");
    Cookies.remove("isLogin");
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <>
      <div
        className={`${
          showSidebar
            ? "w-[100px] transition-all"
            : "w-[200px] xl:w-[280px] transition-all"
        } ed-sidebar fixed z-50 bg-black2 dark:bg-darkBg border-r dark:border-r border-black2 dark:border-black3 mt-[60px] h-[98%] rounded-r-3xl rounded-t-none transition-all`}
      >
        <div className="mb-16">
          <button
            type="button"
            onClick={toggleSidebar}
            className="block absolute -right-[16px] top-[10px] z-[100] bg-black2 dark:bg-black1 rounded-full ml-auto mt-5 p-[12px] shadow-[1px_0px_3px_rgba(0,0,0,0.5)] dark:shadow-[1px_0px_3px_rgba(25,25,25,0.6)] transition-all hover:bg-black3 dark:hover:bg-darkBg hover:transition-all focus:outline-none focus:shadow-none"
          >
            <img
              src="/assets/icons/icon-arrow-right-blue.svg"
              alt="icon-menu"
              className={`w-[14px] h-[14px] ${showSidebar ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        <div className="flex flex-col justify-between h-[90%] md:overflow-scroll 2xl:overflow-hidden md:scrollbar-thin 2xl:hover:scrollbar-thin scrollbar-thumb-black2 dark:scrollbar-thumb-black1 scrollbar-track-gray3 dark:scrollbar-track-darkMainBg scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          <ul
            className={`ed-sidebar__links mt-6 ${
              showSidebar
                ? "flex flex-col items-center justify-center w-[100px]"
                : ""
            }`}
          >
            <li data-title="Dashboard">
              <NavLink
                to="/dashboard"
                onClick={() => collapseOthers(null)}
                exact={true}
                className={({ activeClassName }) =>
                  activeClassName
                    ? "active text-opacity-100"
                    : "flex items-center w-full p-3 text-sm text-white text-opacity-50 transition-all hover:text-opacity-100 hover:transition-all"
                }
              >
                <img
                  src="/assets/icons/icon-dashboard.svg"
                  alt="icon-dashboard"
                  className={`w-[20px] h-[20px] opacity-50 ${({
                    activeClassName,
                  }) => (activeClassName ? "opacity-100 " : "")}`}
                />
                <span
                  className={`ed-sidebar__link ml-3 whitespace-nowrap ${
                    showSidebar ? "hidden" : ""
                  }`}
                >
                  Dashboard
                </span>
              </NavLink>
            </li>

            {manipulatedMenus.map((menu, index) => {
              const { id, icon, title } = menu;
              return (
                <li
                  key={id}
                  className={
                    collapseSubMenu === true && id === collapseId
                      ? "bg-white bg-opacity-10 dark:bg-black1 dark:bg-opacity-100"
                      : icon === "workorders" &&
                        EnvironmentConstant.mode === "offline"
                      ? "opacity-50"
                      : ""
                  }
                >
                  <button
                    onClick={() => collapseMenuHandler(id)}
                    data-title={title}
                    className={`flex items-center w-full text-sm text-white px-3 py-[10px] transition-all hover:text-opacity-100 hover:transition-all ${
                      id == collapseId ? "text-opacity-100" : "text-opacity-50"
                    }`}
                  >
                    <span className="flex items-center">
                      <img
                        src={`/assets/icons/icon-${icon}.svg`}
                        alt={title}
                        className={`w-[20px] h-[20px]  ${
                          id == collapseId ? "opacity-100" : "opacity-50"
                        }`}
                      />
                      <span
                        className={`ed-sidebar__link ml-3 mt-1 whitespace-nowrap ${
                          showSidebar ? "hidden" : ""
                        }`}
                      >
                        {title}
                      </span>
                    </span>
                    <span
                      className={`ed-sidebar__link ml-auto ${
                        showSidebar ? "hidden" : ""
                      } `}
                    >
                      {collapseSubMenu === true && id === collapseId ? (
                        <img
                          src="/assets/icons/icon-minus.svg"
                          alt="icon-minus"
                          className={`w-[16px] h-[16px] ${
                            collapseSubMenu === true && id === collapseId
                              ? "ed-collapse__icon marker:opacity-100"
                              : "opacity-50"
                          }`}
                        />
                      ) : (
                        <img
                          src="/assets/icons/icon-plus.svg"
                          alt="icon-plus"
                          className={`w-[16px] h-[16px] ${
                            collapseSubMenu === true && id === collapseId
                              ? "ed-collapse__icon opacity-100"
                              : "opacity-50"
                          }`}
                        />
                      )}
                    </span>
                  </button>

                  {/* {id === collapseId && collapseSubMenu && */}
                  <ul className={`${id == collapseId ? "block" : "hidden"}`}>
                    {menu.links.map((link, index) => {
                      const { id, title, url } = link;
                      return (
                        <li key={index}>
                          <NavLink
                            to={`/${url}`}
                            exact={true}
                            onClick={() =>
                              handleSubMenuCollapse(parentCollapseId)
                            }
                            className={({ activeClassName }) =>
                              activeClassName
                                ? "active"
                                : "block w-full text-sm text-white text-opacity-50 px-10 py-2 transition-all hover:text-opacity-100 hover:transition-all"
                            }
                          >
                            {title}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                  {/* } */}
                </li>
              );
            })}

            {/* Media Library */}
            <li data-title="Media Library">
              <NavLink
                to="/media-library"
                exact={true}
                onClick={() => collapseOthers(null)}
                className={({ activeClassName }) =>
                  activeClassName
                    ? "active text-opacity-100"
                    : "flex items-center w-full text-sm text-white text-opacity-50 p-3 transition-all hover:text-opacity-100 hover:transition-all"
                }
              >
                <img
                  src="/assets/icons/icon-media.svg"
                  alt="icon-media"
                  className={`w-[20px] h-[20px] opacity-50 ${({
                    activeClassName,
                  }) => (activeClassName ? "opacity-100" : "")}`}
                />
                <span
                  className={`ed-sidebar__link ml-3 whitespace-nowrap ${
                    showSidebar ? "hidden" : ""
                  }`}
                >
                  Media Library
                </span>
              </NavLink>
            </li>

            {/* Personal Notes */}
            <li data-title="Personal Notes">
              <NavLink
                to="/personal-notes"
                exact={true}
                onClick={() => collapseOthers(null)}
                className={({ activeClassName }) =>
                  activeClassName
                    ? "active text-opacity-100"
                    : "flex items-center w-full text-sm text-white text-opacity-50 p-3 transition-all hover:text-opacity-100 hover:transition-all"
                }
              >
                <img
                  src="/assets/icons/icon-note-light.svg"
                  alt="icon-notes"
                  className={`w-[20px] h-[20px] opacity-50 ${({
                    activeClassName,
                  }) => (activeClassName ? "opacity-100" : "")}`}
                />
                <span
                  className={`ed-sidebar__link ml-3 whitespace-nowrap ${
                    showSidebar ? "hidden" : ""
                  }`}
                >
                  Personal Notes
                </span>
              </NavLink>
            </li>

            {/* Part Fields */}
            <li data-title="Part Fields">
              <NavLink
                to="/part-fields"
                exact={true}
                onClick={() => collapseOthers(null)}
                className={({ activeClassName }) =>
                  activeClassName
                    ? "active text-opacity-100"
                    : "flex items-center w-full text-sm text-white text-opacity-50 p-3 transition-all hover:text-opacity-100 hover:transition-all"
                }
              >
                <img
                  src="/assets/icons/icon-package.svg"
                  alt="icon-part-fields"
                  className={`w-[20px] h-[20px] opacity-50 ${({
                    activeClassName,
                  }) => (activeClassName ? "opacity-100" : "")}`}
                />
                <span
                  className={`ed-sidebar__link ml-3 whitespace-nowrap ${
                    showSidebar ? "hidden" : ""
                  }`}
                >
                  Part Fields
                </span>
              </NavLink>
            </li>

            {/* Settings */}
            {/* <li data-title="Settings">
              <NavLink
                to="/version-control"
                exact={true}
                onClick={() => collapseOthers(null)}
                className={({ activeClassName }) =>
                  activeClassName
                    ? "active text-opacity-100"
                    : "flex items-center w-full text-sm text-white text-opacity-50 p-3 transition-all hover:text-opacity-100 hover:transition-all"
                }
              >
                <img
                  src="/assets/icons/icon-settings.svg"
                  alt="icon-settings"
                  className={`w-[20px] h-[20px] opacity-50 ${({
                    activeClassName,
                  }) => (activeClassName ? "opacity-100" : "")}`}
                />
                <span
                  className={`ed-sidebar__link ml-3 whitespace-nowrap ${
                    showSidebar ? "hidden" : ""
                  }`}
                >
                  Settings
                </span>
              </NavLink>
            </li> */}
            {EnvironmentConstant.mode === "offline" &&
              EnvironmentConstant.machine === "SERVER" && (
                <li data-title="Slave Machine">
                  <NavLink
                    to="/slave-machine"
                    exact={true}
                    onClick={() => collapseOthers(null)}
                    className={({ activeClassName }) =>
                      activeClassName
                        ? "active text-opacity-100"
                        : "flex items-center w-full text-sm text-white text-opacity-50 p-3 transition-all hover:text-opacity-100 hover:transition-all"
                    }
                  >
                    <img
                      src="/assets/icons/icon-settings.svg"
                      alt="icon-slave-machine"
                      className={`w-[20px] h-[20px] opacity-50 ${({
                        activeClassName,
                      }) => (activeClassName ? "opacity-100" : "")}`}
                    />
                    <span
                      className={`ed-sidebar__link ml-3 whitespace-nowrap ${
                        showSidebar ? "hidden" : ""
                      }`}
                    >
                      Slave Machine
                    </span>
                  </NavLink>
                </li>
              )}
            {/* <li data-title="Realise Note">
              <NavLink
                to="/realise-note"
                exact={true}
                onClick={() => collapseOthers(null)}
                className={({ activeClassName }) =>
                  activeClassName
                    ? "active text-opacity-100"
                    : "flex items-center w-full text-sm text-white text-opacity-50 p-3 transition-all hover:text-opacity-100 hover:transition-all"
                }
              >
                <img
                  src="/assets/icons/icon-note-light.svg"
                  alt="icon-realise-note"
                  className={`w-[20px] h-[20px] opacity-50 ${({
                    activeClassName,
                  }) => (activeClassName ? "opacity-100" : "")}`}
                />
                <span
                  className={`ed-sidebar__link ml-3 whitespace-nowrap ${
                    showSidebar ? "hidden" : ""
                  }`}
                >
                  Realise Note
                </span>
              </NavLink>
            </li> */}

            {/* Sync */}
            {/* {EnvironmentConstant.mode === "offline" &&
              EnvironmentConstant.machine === "SERVER" && (
                <li data-title="Sync">
                  <NavLink
                    to="/sync"
                    exact={true}
                    onClick={() => collapseOthers(null)}
                    className={({ activeClassName }) =>
                      activeClassName
                        ? "active text-opacity-100"
                        : "flex items-center w-full text-sm text-white text-opacity-50 p-3 transition-all hover:text-opacity-100 hover:transition-all"
                    }
                  >
                    <img
                      src="/assets/icons/icon-sync.svg"
                      alt="icon-sync"
                      className={`w-[20px] h-[20px] opacity-50 group-hover:opacity-100`}
                    />
                    <span
                      className={`ed-sidebar__link ml-3 whitespace-nowrap ${
                        showSidebar ? "hidden" : ""
                      }`}
                    >
                      Sync
                    </span>
                  </NavLink>
                </li>
              )} */}
          </ul>

          <div
            className={`ed-sidebar__btm mt-6 mb-10 p-4 ${
              showSidebar ? "flex flex-col justify-center items-center" : ""
            }`}
          >
            <ThemeToggler />

            <div
              className={`mt-8 ${
                showSidebar ? "flex flex-col justify-center" : "flex-row"
              }`}
            >
              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className={`ed-sidebar__links flex items-center opacity-50 transition-all hover:opacity-100 hover:transition-all focus-visible:outline-none ${
                  showSidebar ? "mx-auto" : ""
                }`}
              >
                <img
                  src="/assets/icons/icon-logout.svg"
                  alt="icon-logout"
                  className="w-5 h-5"
                />
                <span
                  className={`ed-sidebar__link ml-3 text-white ${
                    showSidebar ? "hidden" : ""
                  }`}
                >
                  Logout
                </span>
              </button>

              <div
                className={`ed-sidebar__logowrap flex items-end mt-8 whitespace-nowrap ${
                  showSidebar ? "flex-col items-center" : ""
                }`}
              >
                <img
                  src="/assets/logo.svg"
                  alt="logo"
                  className={`${showSidebar ? "w-[100px]" : "w-[100px]"}`}
                />
                <span
                  className={`text-xs text-gray2  ${
                    showSidebar ? "ml-0 mt-2" : "ml-auto"
                  }`}
                >
                  v 1.2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal : Start */}
      <Transition appear show={showLogoutModal} as={Fragment}>
        <Dialog
          as="div"
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          className="fixed inset-0 z-50 py-20 flex items-start justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="md:w-[50%] xl:w-[40%] 2xl:w-[30%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-3xl px-8 py-10 shadow-lg">
              <Dialog.Title className="dark:text-gray2 text-3xl font-bold text-center mb-4">
                Logout
              </Dialog.Title>

              <div>
                <div className="text-black text-center xl:px-10">
                  Are you sure you want to Logout?
                </div>
                <div className="flex items-center justify-center mt-10">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    type="button"
                    className="bg-transparent text-sm text-black2 dark:text-gray2 font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all focus-visible:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => logout()}
                    type="button"
                    className="bg-secondary text-sm text-white font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
      {/* Logout Confirmation Modal : End */}

      {/* {showSyncModal && <SyncModal />} */}
    </>
  );
};

export default Sidebar;
