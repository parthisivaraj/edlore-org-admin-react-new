import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from '../../layout';

// Components
import DeviceInfo from '../../components/devices/deviceInfo';
import DeviceLog from "../../components/devices/deviceLog";
import DeviceActiveWorkOrders from "../../components/devices/deviceActiveWorkorders";

// Images
import ICON_HOME from '../../assets/icons/icon-home.svg';


const ViewDevice = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>View Device</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img src={ICON_HOME} alt="icon-home" className="dark:invert" />
                  <Link to="/devices" exact={true} className="ml-2 text-xs text-black dark:text-gray2 font-medium transition-all hover:text-secondary hover:transition-all">Devices</Link>
                  <span className="ml-1 text-xs text-black dark:text-gray2 font-medium transition-all hover:text-secondary hover:transition-all">/ All devices</span>
                </div>
                <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2 font-bold">Device Name</h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                <Link to="/device-model" exact={true}  className="bg-transparent text-black dark:text-gray2 font-medium border border-primary rounded-full  px-6 py-2 shadow-sm transition-all hover:bg-primary hover:text-white hover:transition-all">
                  <span>Back to Model</span>
                </Link>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          <div>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-start-1 md:col-span-2 xl:col-span-3">
                <DeviceInfo />
              </div>

              <div className="col-start-1 md:col-span-2 xl:col-span-1">
                <DeviceLog />
              </div>

              <div className="col-start-2 md:col-span-2">
                <DeviceActiveWorkOrders />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
export default ViewDevice;