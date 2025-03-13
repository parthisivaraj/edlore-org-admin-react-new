import React from "react";
import Layout from '../../layout';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

import ActivePackages from "../../components/packages/activePackages";



const activePackages = [
  { title: 'Edlore Basics', available: '21', total: '42' },
  { title: 'Edlore Asset Tracker', available: '25', total: '42' },
  { title: 'Edlore Remote Expert', available: '11', total: '42' },
]

const Packages = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Packages</title>
      </Helmet>

      <Layout>
        <section className="w-full h-full">
          {/* Breadcrumbs : Start */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center">
                <img src="../assets/icons/icon-home.svg" alt="icon-home" className='dark:invert' />
                <span className="ml-2 text-xs text-black dark:text-gray2 font-medium">Packages &amp; features</span>
              </div>
              <h1 className="md:text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold mb-10">Packages</h1>
            </div>

            <Link to="/available-packages" exact={true}  className="bg-secondary text-white text-sm font-medium border border-secondary px-6 py-2 rounded-full shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus:shadow-none focus-visible:outline-none">
              Browse all Packages +
            </Link>
          </div>

          <div>
            {/* Active Package Cards  */}
            <div className="w-full h-full">
              <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                {activePackages.map((active, index) => {
                  const { title, available, total } = active;
                  return (
                    <ActivePackages
                      key={index}
                      title={title}
                      availableCount={available}
                      totalCount={total}
                    />
                  );
                })}
              </div>
            </div>

            {/* if no Package date found, display this Add Package */}
            <div className="flex flex-col items-center justify-center w-full h-full mt-60 mb-10 text-center">
              <h3 className="text-3xl text-black dark:text-gray2 font-bold mb-2">Get Started by adding Modules</h3>
              <p className="text-xl text-black2 dark:text-gray2 opacity-60 font-normal">You can browse for available packages <br /> and add to Edlore</p>
              <Link to="/available-packages" exact={true} className="bg-secondary text-base text-white font-medium border border-secondary rounded-full px-6 py-2 mt-10 shadow-md transition-all hover:bg-transparent hover:text-secondary hover:transition-all  focus:shadow-none focus-visible:outline-none">
                Browse all Packages +
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
export default Packages;