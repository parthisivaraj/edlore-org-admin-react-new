import React from "react";
import { Link } from "react-router-dom";



const ActiveBillingCard = (props) => {
  return (
    <>
      <div key={props.key} className="w-full bg-white dark:bg-black3  dark:text-gray2 border border-gray2 dark:border-black2 rounded-3xl px-5 py-8">
        <div className="flex items-center mb-10">
          <div className="w-10 h-10 rounded-full bg-primary flex flex-col justify-center items-center">
            <img src="../assets/icons/icon-package.svg" alt="icon-package" className="w-6 h-6" />
          </div>
          <h6 className="text-base text-black capitalize font-medium ml-3">{props.title}</h6>
        </div>

        <div className="ml-10">
          <div className="flex flex-start  mb-8">
            <div>
              <div className="text-xl text-black font-bold mb-2">Features</div>
              <div className="text-black text-2xl">
                {props.availableCount}/
                <span className="text-lg text-gray3 opacity-60 dark:opacity-100">{props.totalCount}</span>
              </div>
            </div>

            <div className="ml-14">
              <div className="text-xl text-black font-bold mb-2">Payment</div>
              <div className="text-black text-2xl">
                Subscription
                <span className="bg-gray2 bg-opacity-50 text-xs text-secondary font-medium uppercase px-2 py-0.5 rounded-sm ml-2">Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <Link to={`/${props.url}`} exact={true} className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-6 py-2 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none">
              View Plan
            </Link>
            <button type="button" className="bg-transparent text-black2 dark:text-gray2 text-sm font-medium border border-black2 dark:border-gray2 rounded-full px-6 py-2 ml-6 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:trasnsition-all focus-visible:outline-none">
              Cancel renewal
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ActiveBillingCard;