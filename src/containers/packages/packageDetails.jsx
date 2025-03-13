import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Tab } from "@headlessui/react";

import Layout from "../../layout";


// Tabs
const tabs = [
  { title: 'Basics and features' },
  { title: 'Devices allowed' },
  { title: 'Users allowed' }
]

// Features List
const features = [
  { title: 'Manuals' },
  { title: 'Drawings' },
  { title: 'Video & Animations' },
  { title: 'Voice Support' },
  { title: 'Video Support' },
  { title: 'Repair History' },
  { title: 'Procedures' },
  { title: 'nCodes' },
  { title: 'Alarm Codes' },
  { title: '3D' },
  { title: 'Media' },
  { title: 'Troubleshoot' },
  { title: 'Troubleshoot' },
]



const PackageDetails = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Package Details</title>
      </Helmet>

      <Layout>
        <section className="w-full h-full">
          <div>
            {/* Breadcrumbs */}
            <div className="flex items-center">
              <img src="../assets/icons/icon-home.svg" alt="icon-home" className="dark:invert" />
              <Link to="/" exact={true} className="ml-2 text-xs text-black dark:text-gray2 font-medium">Packages &amp; features /</Link>
              <span className="ml-1 text-xs text-black dark:text-gray2 font-medium">Packages</span>
            </div>
            <h1 className="md:text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold mb-10">Edlore Basics</h1>
          </div>

          {/* Tabs Section : Start */}
          <div>
            <div className="grid grid-cols-1">
              <Tab.Group>
                <Tab.List className="mb-6 whitespace-nowrap md:overflow-x-scroll xl:overflow-hidden">
                  {tabs.map((tab, index) => {
                    const { title } = tab;
                    return (
                      <Tab as="button"
                        key={index}
                        className={({ selected }) =>
                          selected ?
                            'text-lg text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-10 focus:outline-none focus-visible:ring-0'
                            :
                            'text-lg text-black2 dark:text-gray2 opacity-50 font-bold mr-10 border-none hover:opacity-100 focus:outline-none focus-visible:ring-0'
                        }
                      >
                        {title}
                      </Tab>
                    )
                  })}
                </Tab.List>

                <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="col-start-1">
                    {/* Package Basics : Start */}
                    <div className="bg-white dark:bg-black3 rounded-2xl rounded-b-none border border-gray2 dark:border-black2 p-8">
                      <div className="flex items-center mb-8">
                        <div className="w-10 h-10 rounded-full bg-primary flex flex-col justify-center items-center">
                          <img src="../assets/icons/icon-package.svg" alt="icon-package" className="w-6 h-6" />
                        </div>
                        <h6 className="text-lg text-black dark:text-gray2 capitalize font-medium ml-3">Edlore Basics</h6>
                      </div>
                      <div className="grid grid-cols-2 gap-5 md:ml-14 2xl:ml-12">
                        <div>
                          <div className="md:text-lg 2xl:text-xl text-black dark:text-gray2  font-bold mb-1">Features</div>
                          <div className="md:text-lg 2xl:text-xl text-black dark:text-gray2 mb-5">
                            20/
                            <span className="text-lg text-gray3 dark:text-gray2 opacity-60">40</span>
                          </div>

                          <div className="md:text-lg 2xl:text-xl text-black dark:text-gray2  font-bold mb-1">Devices allowed</div>
                          <div className="md:text-lg 2xl:text-xl text-black dark:text-gray2">  200 </div>
                        </div>
                        <div>
                          <div className="md:text-lg 2xl:text-xl text-black dark:text-gray2  font-bold mb-1">Billing</div>
                          <div className="md:text-lg 2xl:text-xl text-black dark:text-gray2 mb-5">
                            Subscription
                            <span className="bg-gray2 dark:bg-gray4  bg-opacity-50 text-xs text-secondary font-medium uppercase px-2 py-0.5 rounded-sm ml-2">Active</span>
                          </div>

                          <div className="md:text-lg 2xl:text-xl text-black dark:text-gray2  font-bold mb-1">Users allowed</div>
                          <div className="md:text-lg 2xl:text-xl text-black dark:text-gray2">  120 </div>
                        </div>
                      </div>
                    </div>
                    {/* Package Basics : End */}

                    {/* Package Description : Start */}
                    <div className="bg-white dark:bg-black3 rounded-3xl border border-gray2 dark:border-black2 mt-6 py-10 md:px-10 2xl:px-20">
                      <p className="text-base text-black2 dark:text-gray2  font-normal">
                        Short description about the package. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali
                      </p>
                    </div>
                    {/* Package Description : End */}
                  </div>

                  <div className="md:col-start-1 xl:col-start-2">
                    <Tab.Panels>
                      {/* Basic & Features Tab : Start */}
                      <Tab.Panel>
                        <div>
                          {/* Features : Start */}
                          <div className="bg-white dark:bg-black3 border border-gray2 dark:border-black2 rounded-2xl p-8 pb-0">
                            <h3 className="text-black2 dark:text-gray2  text-xl font-medium">Features</h3>
                            <p className="text-sm text-black2 dark:text-gray2  font-normal mb-6">Enable/disable features for this package</p>

                            <div className="relative">
                              <input
                                type="search"
                                className="w-full bg-gray4 dark:bg-black3 bg-opacity-40 dark:text-gray2 border border-gray2 rounded-full px-4 py-2 text-base text-black2  focus:border-secondary focus:outline-none"
                                placeholder="Search"
                                id="features_search"
                                name="features_search"
                              />
                              <div className="absolute right-2 top-1.5 p-2">
                                <img src="../assets/icons/icon-search.svg" alt="icon-search" className="w-4 h-4 block mx-auto dark:invert" />
                              </div>
                            </div>

                            {/* Features List */}
                            <ul className="h-96 mt-8 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black2 scrollbar-track-gray4 dark:scrollbar-track-black3  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                              {features.map((feature, index) => {
                                const { title } = feature;
                                return (
                                  <li key={index} className="mb-3">
                                    <label htmlFor={title} className="flex items-center">
                                      <input
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray3 rounded-xl"
                                        id={title}
                                        name={title}
                                      />
                                      <span className="dark:text-gray2 ml-2 select-none">{title}</span>
                                    </label>
                                  </li>
                                );
                              })}

                              <li className="mb-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <img src="../assets/icons/icon-lock.svg" alt="icon-lock" />
                                    <span className="text-black2 dark:text-gray2  text-base ml-2">Error codes</span>
                                  </div>

                                  <Link to="" exact={true} className="text-secondary text-base underline mx-3">
                                    Request feature
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </div>
                          {/* Features : End */}
                        </div>
                      </Tab.Panel>
                      {/* Basic & Features Tab : End */}


                      {/* Devices Allowed Tab : Start */}
                      <Tab.Panel>
                        <div className="w-full bg-white dark:bg-black3 border border-gray2 dark:border-black2 rounded-2xl p-8">
                          <h6 className="text-xl text-black2 dark:text-gray2  font-medium">Devices allowed</h6>
                          <p className="text-sm text-black2 dark:text-gray2  font-normal">Enable/disable features for this package</p>

                          <div className="text-2xl text-black2 dark:text-gray2  font-medium mt-8 mb-4">
                            <span>142</span>
                            <span className="text-lg text-gray3 dark:text-gray2  opacity-70 font-normal mr-2"> / 200</span>
                            used
                          </div>

                          <button className="bg-primary text-white border border-primary rounded-full px-6 py-2 shadow-md transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none">
                            Request More
                          </button>
                        </div>
                      </Tab.Panel>
                      {/* Devices Allowed Tab : End */}


                      {/* Users Allowed Tab : Start */}
                      <Tab.Panel>
                        <div className="w-full bg-white dark:bg-black3 border border-gray2 dark:border-black2 rounded-2xl p-8">
                          <h6 className="text-xl text-black2 dark:text-gray2  font-medium">Users allowed</h6>
                          <p className="text-sm text-black2 dark:text-gray2  font-normal">Enable/disable features for this package</p>

                          <div className="text-2xl text-black2 dark:text-gray2  font-medium mt-8 mb-4">
                            <span>05</span>
                            <span className="text-lg text-gray3 dark:text-gray2  opacity-70 font-normal mr-2"> / 20</span>
                            used
                          </div>

                          <button className="bg-primary text-white border border-primary rounded-full px-6 py-2 shadow-md transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none">
                            Request More
                          </button>
                        </div>
                      </Tab.Panel>
                      {/* Users Allowed Tab : End */}
                    </Tab.Panels>
                  </div>
                </div>
              </Tab.Group>

              <button className="bg-gray4 text-black2 font-medium border border-gray3 rounded-full px-10 py-2 block ml-auto mt-8 shadow-sm transition-all hover:bg-black2 dark:hover:bg-black3 hover:text-white hover:transition-all focus-visible:outline-none">
                Back
              </button>
            </div>
          </div>
          {/* Tabs Section : End */}
        </section>
      </Layout>
    </>
  );
}
export default PackageDetails;