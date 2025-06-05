import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Tab, Transition, Dialog } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../layout";
import Skeleton from "react-loading-skeleton";
import { modelDetails } from "../../redux/reduxes/theModels/modelAction";
import CreateGroup from "../../components/model/createGroup";
import AddNewDevice from "../../components/devices/addNewDevice";
import OverviewPanel from "../../components/model/overviewPanel";
import ProcedurePanel from "../../components/model/procedurePanel";
import { getModelProcedure } from "../../redux/reduxes/procedure/procedureAction";
import { getAllSections } from "../../redux/reduxes/sections/sectionAction";
import SectionPanel from "../../components/sections/sectionPanel";
import {
  getAllAnimations,
  getAllDrawings,
  getAllManuals,
} from "../../redux/reduxes/sketches/sketchesAction";
import ManualsPanel from "../../components/manuals/manualsPanel";
import DrawingsPanel from "../../components/drawings/drawingsPanel";
import AnimationsPanel from "../../components/animations/animationsPanel";
import TroubleshootPanel from "../../components/troubleshoot/troubleshootPanel";
import { getAllTroubleshoot } from "../../redux/reduxes/troubleshoot/troubleshootAction";
import { getAllWrittenIssues } from "../../redux/reduxes/writtenIssues/writtenIssueAction";
import WrittenIssuesPanel from "../../components/issues/writtenIssuesPanel";
import ErrorCodesPanel from "../../components/errorCodes/eCodes/errorCodesPanel";
import MCodesPanel from "../../components/errorCodes/mCodes/mCodesPanel";
import {
  getAllAlarmCodes,
  getAllErrorCodes,
  getAllmCodes,
} from "../../redux/reduxes/errorCodes/errorCodesAction";
import AlarmCodesPanel from "../../components/errorCodes/aCodes/alarmCodesPanel";
import SafetyMeasuresPanel from "../../components/safetyMeasures/safetyMeasuresPanel";
import { getAllSafetyMeasures } from "../../redux/reduxes/safetyMeasures/safetyMeasuresAction";
import AnaglyphPanel from "../../components/anaglyph/anaglyphPanel";
import { getAllAnaglyph } from "../../redux/reduxes/anaglyph/anaglyphAction";
import { Clients, EnvironmentConstant } from "../../helpers";

// Tabs
const tabs = [
  { id: 0, title: "Overview", slug: "overview" },
  { id: 1, title: "Procedures", slug: "procedures" },
  { id: 2, title: "Model Asset Info", slug: "asset-info" },
  { id: 3, title: "Sections", slug: "sections" },
];

// Media/3D Sub Tabs
let subtabs = [
  { id: "troubleshoot", title: "Troubleshoot", slug: "troubleshoot" },
  { id: "written-issues", title: "Written Issues", slug: "written-issues" },
  { id: "safety-measures", title: "Safety Measures", slug: "safety-measures" },
  { id: "error-codes", title: "Error Codes", slug: "error-codes" },
  { id: "m-codes", title: "mCodes", slug: "m-codes" },
  { id: "alarm-codes", title: "Alarm Codes", slug: "alarm-codes" },
  { id: "manuals", title: "Manuals", slug: "manuals" },
  { id: "drawings", title: "Device Drawings", slug: "drawings" },
  { id: "animations", title: "Video & Animations", slug: "animations" },
  { id: "3d", title: "3D", slug: "3d" },
];

if (EnvironmentConstant.client !== Clients.airforce) {
  subtabs = subtabs.filter((tab) => tab.id !== "m-codes");
}

const DeviceModels = (props) => {
  const { id, top_level_tab_id, nested_tab_id, resource_id } =
    props.match.params;

  const dispatch = useDispatch();

  // Fetch Data
  const details = useSelector((state) => state.models.modelDetails);
  const detailsLoading = useSelector(
    (state) => state.models.modelDetailsLoading,
  );

  // Active Tab States
  const [activeMainTab, setActiveMainTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const tabKey = useMemo(() => subtabs[activeSubTab].id, [activeSubTab]);

  useEffect(() => {
    if (activeMainTab == 0) {
      dispatch(modelDetails(id));
    }
  }, [id]);

  useEffect(() => {
    const matchedTab = tabs.find((tab) => tab.slug === top_level_tab_id);

    if (matchedTab) {
      mainTabChangeHandler(matchedTab.id);
    } else {
      setActiveMainTab(0);
    }
  }, [top_level_tab_id]);

  useEffect(() => {
    const matchedSubTab = subtabs.findIndex(
      (tab) => tab.slug === nested_tab_id,
    );
    if (matchedSubTab > 0) {
      subTabChangeHandler(matchedSubTab);
    } else {
      setActiveSubTab(0);
    }
  }, [nested_tab_id]);

  // Main Tab Change Handler
  const mainTabChangeHandler = (tab) => {
    setActiveMainTab(tab);
    const data = {
      model_id: id,
      search: "",
      page: 0,
      filter: {},
      limit: 10,
      sort: "",
      sorting: "",
      paginate: true,
    };
    if (tab == 0) {
      dispatch(modelDetails(id));
    }
    if (tab == 1) {
      dispatch(getModelProcedure(data));
    }
    if (tab == 2) {
      dispatch(getAllTroubleshoot(data));
    }
    if (tab == 3 && data?.model_id) {
      dispatch(getAllSections(data));
    }
  };

  // Sub Tab Change Handler in Media Asset Info
  const subTabChangeHandler = (subTabIndex) => {
    setActiveSubTab(subTabIndex);
    const subTab = subtabs[subTabIndex].id;
    const data = {
      model_id: id,
      search: "",
      page: 0,
      limit: 10,
      filter: {},
      sort: "",
      sorting: "",
      paginate: true,
    };
    if (subTab == "troubleshoot") {
      dispatch(getAllTroubleshoot(data));
    }
    if (subTab == "written-issues") {
      dispatch(getAllWrittenIssues(data));
    }
    if (subTab == "safety-measures") {
      dispatch(getAllSafetyMeasures(data));
    }
    if (subTab == "error-codes") {
      dispatch(getAllErrorCodes(data));
    }
    if (subTab == "m-codes") {
      dispatch(getAllmCodes(data));
    }
    if (subTab == "alarm-codes") {
      dispatch(getAllAlarmCodes(data));
    }
    if (subTab == "manuals") {
      dispatch(getAllManuals(data));
    }
    if (subTab == "drawings") {
      dispatch(getAllDrawings(data));
    }
    if (subTab == "animations") {
      dispatch(getAllAnimations(data));
    }
    if (subTab == "3d") {
      dispatch(getAllAnaglyph(data));
    }
  };

  // Add a New Device Modal
  const [showModal, setShowModal] = useState(false);

  // Create Group Modal for every individual Media
  const [showGroupModal, setShowGroupModal] = useState(false);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Model Details</title>
      </Helmet>

      <Layout>
        <section>
          <div>
            {/* Breadcrumbs */}
            <div className="flex items-center">
              <img
                src="/assets/icons/icon-devices.svg"
                alt="icon-devices"
                className="invert dark:invert-0 w-4 h-4 opacity-70"
              />
              <div className="ml-2 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                Devices /
              </div>
              <Link
                to="/models"
                exact={true}
                className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"
              >
                {" "}
                All Models /
              </Link>
              <span className="ml-1 text-xs text-secondary font-semibold">
                {" "}
                Model Details
              </span>
            </div>
            {detailsLoading ? (
              <Skeleton
                width="400px"
                height="30px"
                className="mb-8 dark:bg-darkMainBg"
              />
            ) : (
              <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold capitalize mb-8 w-[400px] text-ellipsis overflow-hidden whitespace-nowrap">
                {details.title}
              </h1>
            )}
          </div>

          <div>
            <div className="grid grid-cols-1 relative">
              <Tab.Group
                onChange={(index) => mainTabChangeHandler(index)}
                selectedIndex={activeMainTab}
              >
                <Tab.List className="mb-4 pb-2 whitespace-nowrap overflow-x-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  {tabs.map((tab, index) => {
                    const { id, title } = tab;
                    return (
                      <Tab
                        key={index}
                        className={({ selected }) =>
                          selected
                            ? "text-lg 2xl:text-xl text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-5 xl:mr-10 transition-all duration-200 hover:duration-200 hover:transition-all focus:outline-0 focus-visible:ring-0"
                            : "text-lg 2xl:text-xl text-black2 dark:text-gray2 opacity-50 font-bold border-b-4 border-transparent mr-5 xl:mr-10 transition-all duration-200 hover:duration-200 hover:opacity-100 hover:transition-all focus:outline-0 focus-visible:ring-0"
                        }
                      >
                        {title}
                        {id == 1 && title === "Procedures" && (
                          <span className="bg-primary px-2 py-[3px] rounded-xl text-xs text-white font-medium ml-1">
                            {details && details.procedures_count}
                          </span>
                        )}
                      </Tab>
                    );
                  })}
                </Tab.List>

                <Tab.Panels>
                  {/* Model Overview Tab : Start */}
                  <OverviewPanel
                    setShowModal={setShowModal}
                    id={id}
                    activeMainTab={activeMainTab}
                  />
                  {/* Model Overview Tab : End */}

                  {/* Procedures Tab : Start */}
                  <ProcedurePanel activeMainTab={activeMainTab} id={id} />
                  {/* Procedures Tab : End */}

                  {/* Media, codes & 3D Tab : Start */}
                  <Tab.Panel>
                    <>
                      {/* Sub Tabs : Start */}
                      <Tab.Group
                        onChange={(index) => {
                          subTabChangeHandler(index);
                        }}
                        selectedIndex={activeSubTab}
                        as="div"
                        vertical
                        className="flex md:flex-col xl:flex-row w-full min-h-[700px] h-full bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md"
                      >
                        <Tab.List className="flex md:flex-row xl:flex-col items-start xl:justify-between w-full xl:w-[25%] 2xl:w-[20%]  bg-gray4 dark:bg-black1 dark:bg-opacity-50 rounded-2xl xl:rounded-r-none p-3 2xl:p-4 overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                          <div className="flex flex-row xl:flex-col items-start xl:justify-between xl:w-full relative">
                            {subtabs.map((subtab, index) => {
                              const { title } = subtab;
                              return (
                                <Tab
                                  key={index}
                                  className={({ selected }) =>
                                    selected
                                      ? 'w-full xl:flex items-center relative bg-white dark:bg-opacity-10 text-black2 dark:text-gray2 text-base font-medium md:text-center xl:text-left px-4 2xl:px-6 py-3 2xl:py-4 mb-2 xl:mb-0 rounded-xl whitespace-nowrap xl:before:content-[""]  xl:before:absolute xl:before:left-[6px] 2xl:before:left-[12px] xl:before:w-[4px] xl:before:h-[28%] xl:before:bg-primary xl:before:rounded-full focus:outline-0 focus-visible:ring-0'
                                      : "w-full xl:flex items-center md:text-center xl:text-left text-black2 dark:text-gray2 opacity-50 text-base font-medium px-4 2xl:px-6 py-3 2xl:py-4 mb-2 xl:mb-0 whitespace-nowrap transition-all duration-300 hover:duration-300 hover:opacity-100 focus:outline-none focus-visible:ring-0"
                                  }
                                >
                                  <span>{title}</span>
                                  {() => setActiveSubTab(title)}
                                  <img
                                    src="/assets/icons/icon-arrow-right.svg"
                                    alt="icon-arrow-right"
                                    className="md:hidden xl:block ml-auto dark:invert"
                                  />
                                </Tab>
                              );
                            })}
                          </div>
                        </Tab.List>

                        <Tab.Panels className="w-full xl:w-[75%] 2xl:w-[80%] min-h-[700px] h-full py-6  overflow-hidden">
                          {/*  Troubleshoot SubTab : Start */}
                          <TroubleshootPanel
                            model_id={id}
                            activeSubTab={tabKey}
                          />

                          {/*  Written Issues SubTab : Start */}
                          <WrittenIssuesPanel
                            model_id={id}
                            activeSubTab={tabKey}
                          />

                          {/* Safety Measures Tab : Start */}
                          <SafetyMeasuresPanel
                            model_id={id}
                            activeSubTab={tabKey}
                          />

                          {/* Error Codes Sub Tab : Start */}
                          <ErrorCodesPanel
                            model_id={id}
                            activeSubTab={tabKey}
                          />

                          {/* mCodes Sub Tab : Start */}
                          {EnvironmentConstant.client === Clients.airforce && (
                            <MCodesPanel model_id={id} activeSubTab={tabKey} />
                          )}

                          {/* Alarm Codes Sub Tab : Start */}
                          <AlarmCodesPanel
                            model_id={id}
                            activeSubTab={tabKey}
                          />

                          {/* Manuals SubTab : Start */}
                          <ManualsPanel model_id={id} activeSubTab={tabKey} />

                          {/*  Device Drawings SubTab : Start */}
                          <DrawingsPanel model_id={id} activeSubTab={tabKey} />

                          {/* Video and Animations SubTab : Start */}
                          <AnimationsPanel
                            model_id={id}
                            activeSubTab={tabKey}
                          />

                          {/* 3D Sub Tab : Start */}
                          <AnaglyphPanel
                            model_id={id}
                            activeSubTab={tabKey}
                            anaglyph_id={resource_id}
                          />
                        </Tab.Panels>
                      </Tab.Group>
                      {/* Sub Tabs : End */}
                    </>
                  </Tab.Panel>
                  {/* Media, codes & 3D Tab : End */}

                  {/* Sections Tab : Start */}
                  <SectionPanel model_id={id} activeMainTab={activeMainTab} />
                  {/* Sections Tab : End */}
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>

          {/* Add a New Device Model : Start */}
          <AddNewDevice
            model_id={id}
            showModal={showModal}
            setShowModal={setShowModal}
            model_name={details.title}
          />
          {/* Add a New Device Model : End */}

          {/* Adding a Group Comp to every Individual Media : Start */}
          <CreateGroup
            showGroupModal={showGroupModal}
            setShowGroupModal={setShowGroupModal}
            title="Manual"
            id="1"
            label="Manual"
          />
          {/* Adding a Group Comp to every Individual Media : End  */}
        </section>
      </Layout>
    </>
  );
};
export default DeviceModels;
