import React from "react";
import { Helmet } from "react-helmet";

import Layout from '../../layout';
import AvailablePackage from "../../components/packages/availablePackage";


const packages = [
  { title: 'Edlore Basics', desc: 'Short description about the package. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia', count: '25', total: '42', cost: '390', url:'package-features' },
  { title: 'Edlore Asset Tracker', desc: 'Short description about the package. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia', count: '25', total: '42', cost: '420', url:'package-features' },
  { title: 'Edlore Remote Expert', desc: 'Short description about the package. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia', count: '25', total: '42', cost: '450', url:'package-features' },
]

const AvailablePackages = () => {
  return (
    <>
       <Helmet>
        <meta charSet="utf-8" />
        <title>Available Packages</title>
      </Helmet>

      <Layout>
        <section className="w-full h-full">
          <div>
            {/* Breadcrumbs */}
            <div className="flex items-center">
              <img src="../assets/icons/icon-home.svg" alt="icon-home"  className='dark:invert' />
              <span className="ml-2 text-xs text-black dark:text-gray2 font-medium">Packages &amp; features</span>
            </div>
            <h1 className="md:text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold mb-10">Available Packages</h1>
          </div>

          <div>
            <div className="w-full h-full">
              <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                {packages.map((item, index) => {
                  const { id, title, desc, count, total, cost, url } = item;
                  return (

                    <AvailablePackage
                      key={id}
                      title={title}
                      description={desc}
                      available={count}
                      totalCount={total}
                      cost={cost}
                      url={url}
                    />

                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
export default AvailablePackages;