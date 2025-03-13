import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from '../../layout';
import { Link } from 'react-router-dom';
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import SelectDevicePanel from "../../components/workorders/selectDevicePanel";
import WorkorderTaskPanel from "../../components/workorders/workorderTaskPanel";
import AssignToTabPanel from "../../components/workorders/assignedToTabPanel";
import { resetWoDetails, getWorkorderDetails, changeStepInCreation } from "../../redux/reduxes/workorders/workorderAction";

// Tab List
const tabs = [
  { id: 1, title: 'Select Device' },
  { id: 2, title: 'Create WO Task' },
  { id: 3, title: 'Assign' }
]

const CreateWorkorder = (props) => {
  const dispatch = useDispatch();
  const { id } = props;
  const { wo_id } = props.match.params;

  // Fetch Data
  const activeTab = useSelector(state => state.workorders.activeTab);
  const details = useSelector(state => state.workorders.workOrderDetails);

  //states
  // const [modelId, setModelId] = useState("");

  // Reset the Wo...
  useEffect(() => {
    if (wo_id !== "new") {
      const data = {
        id: wo_id,
        details_page: "false",
      }
      dispatch(getWorkorderDetails(data));
    } else {
      dispatch(resetWoDetails());
      // dispatch(getWorkorderDetails());
    }
  }, [wo_id, activeTab]);
  useEffect(() => {
    dispatch(changeStepInCreation(0));
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{wo_id == "new" ? "Create" : "Update"} Work Order</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div className="mb-10">
            <div className="flex items-center">
              <img src="../assets/icons/icon-workorders.svg" alt="icon-workorders" className="w-[18px] h-[18px] invert dark:invert-0 opacity-70" />
              <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3  font-medium">Work Orders /</span>
              {details.work_order_status == "draft" ?
                <Link to="/drafts" exact={true} className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"> Draft Work Orders /</Link> :
                <Link to="/active-workorders/all?device=all&all&device_specific=false" exact={true} className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium transition-all duration-300 ease-linear hover:text-secondary hover:dark:text-secondary hover:transition-all hover:duration-300 hover:ease-linear"> Active Work Orders /</Link>
              }
              <span className="ml-1 text-xs text-secondary font-semibold">{wo_id == "new" ? "Create Work Order" : "Edit Work Order"}</span>
            </div>
            <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2  font-bold">{wo_id == "new" ? "Create Work Order" : "Edit Work Order"} {details && details.title && `(${details.title})`}</h1>
          </div>
          {/* Breadcrumbs : End */}

          {/* Tabs Section : Start */}
          <div>
            <Tab.Group selectedIndex={activeTab}>
              <Tab.List className="mb-6 whitespace-nowrap md:overflow-x-scroll xl:overflow-x-hidden">
                {tabs.map((tab, index) => {
                  const { id, title } = tab;
                  return (
                    <Tab
                      disabled={index != activeTab}
                      key={index}
                      className={({ selected }) =>
                        selected ?
                          'inline-flex text-lg text-black2 dark:text-gray2 font-bold mr-10 border-none focus:outline-none focus-visible:ring-0 cursor-default'
                          :
                          'inline-flex text-lg text-black2 dark:text-gray2 opacity-50 font-bold mr-10 border-none focus:outline-none focus-visible:ring-0 cursor-default'
                      }
                    >
                      <div className={`${activeTab >= index ? 'bg-primary' : 'bg-gray3'} flex flex-col justify-center min-w-[25px] min-h-[25px] text-sm text-white font-medium rounded-full`}>
                        {id}
                      </div>
                      <span className="ml-2">{title}</span>
                    </Tab>
                  )
                })}
              </Tab.List>

              <Tab.Panels >
                {/* Select Device Tab : Start */}
                <SelectDevicePanel
                  wo_id={wo_id}
                  activeTab={activeTab}
                />
                {/* Select Device Tab : End */}
              </Tab.Panels>

              <Tab.Panels >
                {/* Create WO Task Tab : Start */}
                <WorkorderTaskPanel
                  // model_id={model_id}
                  id={id}
                  wo_id={wo_id}
                  activeTab={activeTab}
                />
                {/* Create WO Task Tab : End */}
              </Tab.Panels>

              <Tab.Panels>
                {/* Assign Tab : Start */}
                <AssignToTabPanel
                  wo_id={wo_id}
                  activeTab={activeTab}
                />
                {/* Assign Tab : End */}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
      </Layout>

    </>
  );
}
export default CreateWorkorder;