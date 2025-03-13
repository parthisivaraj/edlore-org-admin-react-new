import React from "react";
import { Helmet } from "react-helmet";
import Layout from '../../layout';
import ActiveBillingCard from "../../components/billing/activeBillingCard";


const ViewPlan = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>View Plan</title>
      </Helmet>


      <Layout>
        <section>
          <div>
            <div className="grid grid-cols-1">
              {/* Breadcrumbs */}
              <div className="flex items-center">
                <img src="../assets/icons/icon-home.svg" alt="icon-home"  className="dark:invert" />
                <span className="ml-1 text-xs text-black dark:text-gray2 font-medium uppercase"> Billing</span>
              </div>
              <h1 className="md:text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold mb-10">Active Billing</h1>
            </div>
          </div>

          <div>
            <div className="text-lg font-normal mb-10 dark:text-gray2">
              Active Packages <span className="bg-black2 text-white text-xs font-medium rounded-xl px-2 py-1">02</span>
            </div>

            <div className="grid xl:grid-cols-2 gap-8">
              <div className="xl:col-start-1">
                <ActiveBillingCard
                  title="Edlore Basics"
                  availableCount="10"
                  totalCount="20"
                />
              </div>

              <div className="xl:col-start-2">
                <div className="w-full bg-white dark:bg-black3 dark:text-gray2 border border-gray2 dark:border-black2 rounded-3xl px-8 py-10">
                  <div className="flex items-start justify-between mb-16">
                    <div>
                      <div className="text-xl font-medium">Package Cost</div>
                      <div className="text-sm text-gray3 opacity-75 dark:opacity-100">Total package cost displayed below</div>
                    </div>

                    <div>
                      <div className="text-lg font-medium">Total Package cost</div>
                      <div className="text-2xl">$690</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-5">
                    <div className="col-start-1 col-span-2">
                      <div  className="text-base font-medium mb-2">Pricing type <span className="text-danger">*</span></div>

                      <label htmlFor="billing_subscription" className="flex items-center">
                        <input
                          type="radio"
                          id="billing_subscription"
                          name="billing_subscription"
                          className="w-5 h-5"
                        />
                        <span className="ml-2 text-lg">Subscription</span>
                      </label>
                    </div>

                    <div className="col-start-1">
                      <label htmlFor="billing_monthly" className="flex items-center">
                        <input
                          type="checkbox"
                          id="billing_monthly"
                          name="billing_monthly"
                          className="w-4 h-4"
                        />
                        <span className="ml-2 text-base">Monthly</span>
                      </label>

                      <div className="relative mt-4">
                        <input
                          type="number"
                          id="monthly_price"
                          name="monthly_price"
                          placeholder="555"
                          className="bg-gray4 bg-opacity-40 w-full border border-gray2 rounded-lg pl-8 pr-4 py-2"
                        />
                        <div className="absolute top-[9px] left-[14px] opacity-60">
                          $
                        </div>
                      </div>
                    </div>

                    <div className="col-start-2">
                      <label htmlFor="billing_quarterly" className="flex items-center">
                        <input
                          type="checkbox"
                          id="billing_quarterly"
                          name="billing_quarterly"
                          className="w-4 h-4"
                        />
                        <span className="ml-2 text-base">Quarterly</span>
                      </label>

                      <div className="relative mt-4">
                        <input
                          type="number"
                          id="quarterly_price"
                          name="quarterly_price"
                          placeholder="256"
                          className="bg-gray4 bg-opacity-40 w-full border border-gray2 rounded-lg pl-8 pr-4 py-2"
                        />
                        <div className="absolute top-[9px] left-[14px] opacity-60">
                          $
                        </div>
                      </div>
                    </div>

                    <div className="col-start-3">
                      <label htmlFor="billing_annually" className="flex items-center">
                        <input
                          type="checkbox"
                          id="billing_annually"
                          name="billing_annually"
                          className="w-4 h-4"
                        />
                        <span className="ml-2 text-base">Annually</span>
                      </label>

                      <div className="relative mt-4">
                        <input
                          type="number"
                          id="annual_price"
                          name="annual_price"
                          placeholder="856"
                          className="bg-gray4 bg-opacity-40 w-full border border-gray2 rounded-lg pl-8 pr-4 py-2"
                        />
                        <div className="absolute top-[9px] left-[14px] opacity-60">
                          $
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
export default ViewPlan;