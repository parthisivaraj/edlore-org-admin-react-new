import React from "react";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Layout from '../../layout';



const features = [
  { title: '3D', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia' },
  { title: 'Drawings', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia' },
  { title: 'Video & Animations', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia' },
  { title: 'Media', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia' },
  { title: 'Codes', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia' },
  { title: '2D', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia' }
]



const PackageFeatures = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Package Features</title>
      </Helmet>

      <Layout>
        <section className="w-full h-full">
          <div>
            {/* Breadcrumbs */}
            <div className="flex items-center">
              <img src="../assets/icons/icon-home.svg" alt="icon-home" className="dark:invert" />
              <Link to="/" exact={true} className="ml-2 text-xs text-black dark:text-gray2  font-medium">Packages &amp; features  /</Link>
              <span className="ml-1 text-xs text-black dark:text-gray2  font-medium">Available Packages</span>
            </div>
            <h1 className="md:text-2xl 2xl:text-3xl text-black dark:text-gray2  font-bold mb-10">Edlore Basics</h1>
          </div>

          <div>
            <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-10 overflow-hidden">
              {/* Features Section : Start */}
              <div className="w-full h-full rounded-3xl border border-gray2 dark:border-black2">
                <div className="bg-gray4 dark:bg-black3 p-8 rounded-3xl rounded-b-none">
                  <h2 className="md:text-xl 2xl:text-2xl text-black dark:text-gray2  font-medium">Package Summary</h2>
                  <p className="md:text-sm 2xl:text-base text-black2 dark:text-gray2  opacity-80 font-normal">The package description comes here</p>
                  <div className="grid grid-cols-2 mt-8">
                    <div>
                      <div className="text-black2 dark:text-gray2  2xl:text-lg font-medium">Features available</div>
                      <div className="text-black2 dark:text-gray2 md:text-lg 2xl:text-xl mb-5">20</div>

                      <div className="text-black2 dark:text-gray2 2xl:text-lg font-medium">Users allowed</div>
                      <div className="text-black2 dark:text-gray2 md:text-lg 2xl:text-xl mb-5">05</div>

                      <div className="text-black2 dark:text-gray2 2xl:text-lg font-medium">System Memory</div>
                      <div className="text-black2 dark:text-gray2 md:text-lg 2xl:text-xl">30 GB</div>
                    </div>

                    <div>
                      <div className="text-black2 dark:text-gray2 2xl:text-lg font-medium">Total Package Cost</div>
                      <div className="text-black2 dark:text-gray2 md:text-lg 2xl:text-xl mb-5">20</div>

                      <div className="text-black2 dark:text-gray2 2xl:text-lg font-medium">File Storage</div>
                      <div className="text-black2 dark:text-gray2 md:text-lg 2xl:text-xl mb-5">1 TB</div>

                      <div className="text-black2 dark:text-gray2 2xl:text-lg font-medium">CPU Power</div>
                      <div className="text-black2 dark:text-gray2 md:text-lg 2xl:text-xl">1x</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-black2 rounded-3xl rounded-t-none  p-8 pb-0">
                  <ul className="h-80 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black2 scrollbar-track-gray4 dark:scrollbar-track-black3  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                    {features.map((feature, index) => {
                      const { title, desc } = feature;
                      return (
                        <li key={index} className="pb-4 mb-4 border-b border-dotted border-gray2 list-decimal">
                          <h6 className="text-black2  dark:text-gray2 2xl:text-lg font-medium mb-2">{title}</h6>
                          <p className="text-black2  dark:text-gray2 text-sm">{desc}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* Features Section : End */}


              {/* Total Cost Summary Section: Start */}
              <div className="w-full h-min bg-white dark:bg-black3 p-8 rounded-3xl border border-gray2 dark:border-black2">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="bg-black2 w-10 h-10 rounded-full flex flex-col justify-center overflow-hidden">
                      <img src="../assets/icons/icon-billing.svg" alt="icon-card" className="w-5 h-5 block mx-auto" />
                    </div>
                    <h5 className="md:text-xl 2xl:text-2xl text-black2 dark:text-gray2 font-bold ml-3">Total cost summary</h5>
                  </div>
                  <div className="text-xl text-black2 dark:text-gray2 font-medium">$690</div>
                </div>

                <form>
                  <div className="text-sm text-black2 dark:text-gray2 font-medium mb-3">Choose Billing Plan <span className="text-danger">*</span></div>

                  <div>
                    <label htmlFor="subscription_billing_plan" className="flex items-center mb-2 dark:text-gray2">
                      <input
                        type="radio"
                        name="billing_plan"
                        id="subscription_billing_plan"
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-base ml-2 select-none">Subscription</span>
                    </label>
                  </div>

                  <div className="border-b border-dashed border-gray2 pb-6">
                    <select
                      name=""
                      id=""
                      className="ed-form__select appearance-none relative w-full md:h-[40px] 2xl:h-[50px] py-2 px-3 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 text-base border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                    >
                      <option disabled>Select Subscription</option>
                      <option value=""> 1 Year </option>
                      <option value=""> 2 Years </option>
                      <option value=""> 3 Years</option>
                    </select>
                  </div>

                  <div className="pt-6">
                    <label htmlFor="one_time_billing_plan" className="flex items-center mb-2 dark:text-gray2">
                      <input
                        type="radio"
                        name="billing_plan"
                        id="one_time_billing_plan"
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-base ml-2 select-none">One-time</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end mt-10">
                    <button type="button" className="bg-transparent text-black2 dark:text-gray2 text-sm font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-black3 hover:text-white hover:transition-all focus-visible:outline-none">
                      Back
                    </button>

                    <Link to="/payment-info" exact={true}  className="bg-secondary text-white text-sm font-medium border border-secondary rounded-full px-6 py-2 ml-5 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none">
                      Proceed to Payment
                    </Link>
                  </div>
                </form>
              </div>
              {/* Total Cost Summary Section : End */}
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
export default PackageFeatures;