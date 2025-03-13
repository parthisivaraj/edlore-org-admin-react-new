import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import Layout from "../../layout";
import { useSelector, useDispatch } from "react-redux";
import ActiveWorkorderUsersPanel from "../../components/workorders/activeWorkorderUsersPanel";
import TaskOverviewPanel from "../../components/workorders/taskOverviewPanel";
import SubmittedWorkorderPanel from "../../components/workorders/submittedWorkorderPanel";
import { getAllActiveWorkorderUsers, getAllsubmittedWoPdf, getWorkorderDetails, publishTheDraft } from "../../redux/reduxes/workorders/workorderAction";
import { useLocation } from "react-router";
import ConfirmRedirect from "./confirmRedirectionAfterPublish";
import Skeleton from "react-loading-skeleton";
import CancelWorkorderRepeatModal from "../../components/workorders/cancelWorkorderRepeatModal";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const WorkorderDetails = (props) => {
  let tabs = [];
  let query = useQuery();
  const status = query.get("status");
  const transmitted = query.get("transmitted");
  const { wo_id } = props.match.params;
  const dispatch = useDispatch();

  // Fetch Data
  const detailsLoading = useSelector(state => state.workorders.workorderDetailsLoading);
  const details = useSelector(state => state.workorders.workOrderDetails);
  const editConfirmation = useSelector(state => state.workorders.editConfirmation);
  const permissions = useSelector(state => state.auth.allPermissions);

  const [activeTab, setActiveTab] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // tabs.push()
  if (status == "draft") {
    tabs.push({ title: 'Task Overview' })
  } else if (details && details.assigned_to_type == "User") {
    tabs = [
      { title: 'Task Overview' },
      { title: 'Submitted Work Order' },
    ]
  } else {
    tabs = [
      { title: 'Task Overview' },
      { title: 'Submitted Work Order' },
      { title: 'Active WO Users' }
    ]
  }

  // Tab Change Handler
  const tabChangeHandler = (tab) => {
    setActiveTab(tab);
    const pdfData = {
      wo_id: wo_id,
      page: 0,
      limit: 5,
    }

    const activeWOUsersData = {
      id: wo_id,
      search: "",
      page: 0,
      limit: 10,
      paginate: true,
      filter: {},
      sort: "",
      sorting: "",
    }

    if (tab == 0) {
      dispatch(getWorkorderDetails())
    }
    if (tab == 1) {
      dispatch(getAllsubmittedWoPdf(pdfData));
    }
    if (tab == 2) {
      dispatch(getAllActiveWorkorderUsers(activeWOUsersData))
    }
  }

  // Publish Workorder
  const publishProject = (e) => {
    dispatch(publishTheDraft({ wo_id: wo_id }))
  }

  // Cancel Workorder Repeat
  const [cancelWORepeatModal, setCancelWORepeatModal] = useState(false);
  const [cancelWORepeatId, setCancelWORepeatId] = useState(null);
  const [cancelWORepeatTitle, setCancelWORepeatTitle] = useState("");

  const cancelWorkorderRepeatEvent = (stat, id, title) => {
    setCancelWORepeatModal(stat);
    setCancelWORepeatId(id);
    setCancelWORepeatTitle(title);
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Work Order Details</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid xl:grid-cols-2 gap-4 mb-6">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img src="../assets/icons/icon-workorders.svg" alt="icon-workorders" className="w-[18px] h-[18px] invert dark:invert-0 opacity-70" />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">Work Orders /</span>
                  {status == "draft" ?
                    <Link to="/drafts" exact={true} className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"> Draft Work Orders /</Link> :
                    <Link to="/active-workorders/all?device=all&all&device_specific=false" exact={true} className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"> Active Work Orders /</Link>
                  }
                  <span className="ml-1 text-xs text-secondary font-semibold">Work Order Details</span>
                </div>
                <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2 font-bold leading-normal first-letter:uppercase">
                  {detailsLoading ? <Skeleton width="250px" height="30px" className="dark:bg-black1" /> : <>{details && details.title} Details </>}
                </h1>
              </div>
              {/* <div>{details.status}</div> */}
              <div className="col-start-2 ml-auto my-auto">
                <Link to="/active-workorders/all?device=all&all&device_specific=false" exact={true} className="bg-transparent text-black2 dark:text-gray2 text-sm font-medium border border-black2 dark:border-gray2 rounded-full px-6 py-2.5 mr-3 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all focus-visible:outline-none">
                  Go Back
                </Link>

                {(permissions.includes("all_work_order") || (permissions.includes("update_work_order") && permissions.includes("cancel_repeat_workorder")) || permissions.includes("Admin")) &&
                  <>
                    {(details && details.repetition && details.repetition.is_cancelled == false && status != "draft") &&
                      <button onClick={() => cancelWorkorderRepeatEvent(true, details && details.id, details && details.title)} type="button" className="bg-transparent text-black2 dark:text-gray2 text-sm font-medium border border-black2 dark:border-gray2 rounded-full px-6 py-2 mr-3 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all focus-visible:outline-none">
                        Cancel WO Repeat
                      </button>
                    }
                  </>
                }

                {((permissions.includes("all_work_order") || permissions.includes("update_work_order") || permissions.includes("Admin")) &&
                  (permissions.includes("all_category") || permissions.includes("read_category") || permissions.includes("Admin")) &&
                  (permissions.includes("all_model") || permissions.includes("read_model") || permissions.includes("Admin")) &&
                  (permissions.includes("all_device") || permissions.includes("read_device") || permissions.includes("Admin")) &&
                  (permissions.includes("all_task_type") || permissions.includes("read_task_type") || permissions.includes("Admin")) &&
                  (permissions.includes("all_troubleshoot") || permissions.includes("read_troubleshoot") || permissions.includes("Admin")) &&
                  (permissions.includes("all_procedure") || permissions.includes("read_procedure") || permissions.includes("Admin")) &&
                  (permissions.includes("all_error_codes") || permissions.includes("read_error_codes") || permissions.includes("Admin")) &&
                  (permissions.includes("all_mcodes") || permissions.includes("read_mcodes") || permissions.includes("Admin")) &&
                  (permissions.includes("all_alarm_codes") || permissions.includes("read_alarm_codes") || permissions.includes("Admin")) &&
                  (permissions.includes("all_role") || permissions.includes("read_role") || permissions.includes("Admin")) &&
                  (permissions.includes("all_group") || permissions.includes("read_group") || permissions.includes("Admin")) &&
                  (permissions.includes("all_user") || permissions.includes("read_user") || permissions.includes("Admin"))) &&
                  <>

                    {details.work_order_status != "completed" &&
                      (<Link to={`/workorder/${wo_id}`} exact={true} className="text-sm bg-primary text-white font-medium border border-primary px-6 py-2.5 rounded-full shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none">
                        Edit Work Order
                      </Link>)
                    }

                    {status == "draft" &&
                      <button type="button" onClick={(e) => publishProject(e)} className="text-sm bg-secondary text-white font-medium border border-secondary px-6 py-2 ml-6 rounded-full shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none">
                        Publish
                      </button>
                    }
                  </>
                }
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}


          {/* Workorder Details : Start */}
          <div className="grid grid-cols-1">
            <Tab.Group
              onChange={(index) => {
                tabChangeHandler(index);
              }}
            >
              <Tab.List className="mb-6 flex flex-row items-center">
                {tabs.map((tab, index) => {
                  const { title } = tab;

                  return (
                    <Tab
                      key={index}
                      className={({ selected }) =>
                        selected ?
                          'md:text-lg 2xl:text-xl text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-10 focus:outline-none focus-visible:ring-0'
                          :
                          'md:text-lg 2xl:text-xl text-black2 dark:text-gray2 opacity-50 font-bold border-b-4 border-transparent mr-10 transition-all hover:opacity-100 hover:transition-all focus:outline-none focus-visible:ring-0'
                      }
                    >
                      {title}
                      {() => setActiveTab(title)}

                    </Tab>
                  )
                })}
              </Tab.List>

              <Tab.Panels>
                {/* Workorder Details : Start */}

                <TaskOverviewPanel
                  wo_id={wo_id}
                  activeTab={activeTab}
                />

                {/* Workorder Details : End */}


                {/* Submitted Workorder : Start */}

                <SubmittedWorkorderPanel
                  wo_id={wo_id}
                  activeTab={activeTab}
                />

                {/* Submitted Workorder : End */}


                {/* Active WO Users : Start */}
                {details && details.assigned_to_type == "Group" &&
                  <ActiveWorkorderUsersPanel
                    wo_id={wo_id}
                    activeTab={activeTab}
                  />
                }

                {/* Active WO Users : End */}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>

        {/* Redirect */}
        <ConfirmRedirect
          showConfirmation={editConfirmation}
          wo_id={wo_id}
        />

        {/* Cancel Workorder Repeat Modal */}
        <CancelWorkorderRepeatModal
          head="Cancel Work Order Repetition"
          body={["Are you sure you want to cancel", <strong className="capitalize break-all"> "{cancelWORepeatTitle}" </strong>, "workorder Repetition?"]}
          cancelWORepeatModal={cancelWORepeatModal}
          setCancelWORepeatModal={setCancelWORepeatModal}
          cancelWORepeatId={cancelWORepeatId}
          setCancelWORepeatId={setCancelWORepeatId}
        />

      </Layout>
    </>
  )
}
export default WorkorderDetails;