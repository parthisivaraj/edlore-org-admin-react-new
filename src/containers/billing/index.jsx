import React from "react";
import { Helmet } from "react-helmet";
import Layout from '../../layout';
import ActiveBillingCard from "../../components/billing/activeBillingCard";


const billings = [
  { title: 'Edlore Basics', count: '15', total: '40', url: 'view-plan' },
  { title: 'Edlore Part Tracker', count: '12', total: '50', url: 'view-plan' },
]

const Billing = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Billing</title>
      </Helmet>

      <Layout>
        <section>
          <div>
            <div className="grid grid-cols-1">
              {/* Breadcrumbs */}
              <div className="flex items-center">
                <img src="../assets/icons/icon-home.svg" alt="icon-home" className="dark:invert" />
                <span className="ml-1 text-xs text-black dark:text-gray2 font-medium uppercase"> Billing</span>
              </div>
              <h1 className="md:text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold mb-10">Active Billing</h1>
            </div>
          </div>

          <div>
            <div className="text-lg font-normal mb-10 dark:text-gray2">
              Active Packages <span className="bg-black2 text-white  text-xs font-medium rounded-xl px-2 py-1">02</span>
            </div>

            <div className="grid xl:grid-cols-2 gap-8">
              {billings.map((billing, index) => {
                const { title, count, total, url } = billing;
                return (
                  <ActiveBillingCard
                    key={index}
                    title={title}
                    availableCount={count}
                    totalCount={total}
                    url={url}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
export default Billing;