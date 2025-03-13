import React from "react";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Layout from '../../layout';




const PaymentInfo = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment Information</title>
      </Helmet>

      <Layout>
        <section>
          <div>
            {/* Breadcrumbs */}
            <div className="flex items-center">
              <img src="../assets/icons/icon-home.svg" alt="icon-home" className="dark:invert" />
              <Link to="/" exact={true} className="ml-2 text-xs text-black dark:text-gray2  font-medium">Packages &amp; features  /</Link>
              <span className="ml-1 text-xs text-black dark:text-gray2  font-medium">Available Packages</span>
            </div>
            <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2  font-bold mb-10">Edlore Basics</h1>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="col-start-1 md:col-span-2 xl:col-span-1">
              <div className="w-full bg-white dark:bg-black3 border border-gray2 dark:border-black2 rounded-2xl p-8">
                <h3 className="text-xl text-black2 dark:text-gray2 font-medium border-b border-dashed border-gray2 dark:border-opacity-40 pb-5 mb-10">Billing Information</h3>

                <form>
                  <div className="mb-5">
                    <label htmlFor="billing_username" className="text-sm font-medium dark:text-gray2">Full Name <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="billing_username"
                      id="billing_username"
                      placeholder="Full Name"
                      className="w-full h-auto py-3 px-4 mt-1 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-start-1 mb-5">
                      <label htmlFor="billing_country" className="text-sm font-medium dark:text-gray2">Country <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="billing_country"
                        id="billing_country"
                        placeholder="Country"
                        className="w-full h-auto py-3 px-4 mt-1 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                      />
                    </div>

                    <div className="col-start-2 mb-5">
                      <label htmlFor="billing_state" className="text-sm font-medium dark:text-gray2">State</label>
                      <input
                        type="text"
                        name="billing_state"
                        id="billing_state"
                        placeholder="State"
                        className="w-full h-auto py-3 px-4 mt-1 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="billing_address1" className="text-sm font-medium dark:text-gray2">Billing Address 1 <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      name="billing_address1"
                      id="billing_address1"
                      placeholder="Billing Address 1"
                      className="w-full h-auto py-3 px-4 mt-1 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="billing_address2" className="text-sm font-medium dark:text-gray2">Billing Address 2</label>
                    <input
                      type="text"
                      name="billing_address2"
                      id="billing_address2"
                      placeholder="Billing Address 2"
                      className="w-full h-auto py-3 px-4 mt-1 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="billing_postal_code" className="text-sm font-medium dark:text-gray2">Postal Code <span className="text-danger">*</span></label>
                    <input
                      type="number"
                      name="billing_postal_code"
                      id="billing_postal_code"
                      placeholder="Postal Code"
                      className="w-full h-auto py-3 px-4 mt-1 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="col-start-2 md:col-span-2 xl:col-span-1">
              <div className="w-full bg-white dark:bg-black3 border border-gray2 dark:border-black2 rounded-2xl p-8">
                <div className="flex items-center justify-between pb-5 mb-10 border-b border-dashed border-gray2 dark:border-opacity-40">
                  <h5 className="text-xl text-black2 dark:text-gray2 font-medium">Total cost summary</h5>
                  <div className="text-xl text-black2 dark:text-gray2 font-medium">$690</div>
                </div>

                <form>
                  <h4 className="text-2xl text-black2 dark:text-gray2 font-medium mb-3">Add a new card</h4>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                      <div>
                        <input
                          type="number"
                          className="w-full h-auto py-3 px-4 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                          id="card_number"
                          name="card_number"
                          placeholder="Card Number"
                        />
                      </div>
                    </div>

                    <div className="col-start-1">
                      <div>
                        <input
                            type="number"
                            className="w-full h-auto py-3 px-4 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                            id="card_expiry"
                            name="card_expiry"
                            placeholder="MM/YY"
                        />
                      </div>
                    </div>

                    <div className="col-start-2">
                      <div>
                        <input
                            type="number"
                            className="w-full h-auto py-3 px-4 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                            id="card_cvv"
                            name="card_cvv"
                            placeholder="CVV"
                        />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div>
                        <input
                            type="text"
                            className="w-full h-auto py-3 px-4 bg-gray4 dark:bg-black3 bg-opacity-50 dark:text-gray2 border border-gray2 rounded-md focus:border-secondary focus:outline-none"
                            id="card_holder_name"
                            name="card_holder_name"
                            placeholder="Card Holder's Name"
                        />
                      </div>
                    </div>
                  </div>
              </form>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-14 mb-3">
            <button type="button" className="bg-transparent text-black2 dark:text-gray2 border border-black2 dark:border-gray2 rounded-full px-10 py-2 text-sm font-medium transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black2 hover:transition-all focus-visible:outline-none">
              Back
            </button>

            <button type="submit" className="bg-secondary text-white border border-secondary rounded-full px-8 py-2 ml-4 text-sm font-medium transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none">
              Confirm Payment
            </button>
          </div>
        </section>
      </Layout>
    </>
  );
}
export default PaymentInfo;