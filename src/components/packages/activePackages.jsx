import React from "react";
import { Link } from 'react-router-dom';


const ActivePackages = (props) => {
  return (
    <>
      <div className="bg-white dark:bg-black3 w-full h-full rounded-3xl px-5 py-8 border border-gray2 dark:border-black2">
        <div className="flex items-center md:mb-4 2xl:mb-8">
          <div className="w-10 h-10 rounded-full bg-primary flex flex-col justify-center items-center">
            <img src="../assets/icons/icon-package.svg" alt="icon-package" className="w-6 h-6" />
          </div>
          <h6 className="text-lg text-black dark:text-gray2 capitalize font-medium ml-3">{props.title}</h6>
        </div>

        <div className="md:ml-14 2xl:ml-10">
          <div className="flex items-start md:mb-8 2xl:mb-12">
            <div>
              <div className="text-xl text-black dark:text-gray2 font-bold mb-2">Features</div>
              <div className="text-black dark:text-gray2 text-xl">
                {props.availableCount}/
                <span className="text-lg text-gray3 dark:text-gray2 opacity-60 ">{props.totalCount}</span>
              </div>
            </div>

            <div className="ml-6">
              <div className="text-xl text-black dark:text-gray2 font-bold mb-2">Payment</div>
              <div className="text-black dark:text-gray2 text-xl">
                Subscription
                <span className="bg-gray2 dark:bg-gray4 bg-opacity-50 text-xs text-secondary font-medium uppercase px-2 py-0.5 rounded-sm ml-2">Active</span>
              </div>
            </div>
          </div>

          <Link to="/package-details" exact={true} className="bg-primary text-white  text-sm font-medium border border-primary rounded-full px-5 py-2 transition-all hover:bg-transparent hover:text-primary hover:transition-all  focus:shadow-none focus-visible:outline-none">
            View Package
          </Link>
        </div>
      </div>
    </>
  );
}
export default ActivePackages;