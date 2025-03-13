import React from "react";
import { Link } from 'react-router-dom';


const AvailablePackage = (props) => {
  return (
    <>
      <div key={props.key} className="bg-white dark:bg-black3 w-full h-full rounded-3xl px-6 py-6 border border-gray2 dark:border-black2">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex flex-col justify-center items-center">
            <img src="../assets/icons/icon-package.svg" alt="icon-package" className="w-6 h-6" />
          </div>
          <h6 className="text-lg text-black dark:text-gray2 capitalize font-medium ml-3">{props.title}</h6>
        </div>
        <p className="text-base text-black dark:text-gray2 font-normal ml-14">{props.description}</p>

        <div className="ml-14">
          <div className="flex items-start my-8">
            <div>
              <div className="md:text-lg 2xl:text-xl text-black dark:text-gray2 font-bold mb-2">Features available</div>
              <div className="text-black dark:text-gray2 text-xl">
                {props.available}/
                <span className="text-lg text-gray3 dark:text-gray2 opacity-60 ">{props.totalCount}</span>
              </div>
            </div>

            <div className="ml-10">
              <div className="md:text-lg 2xl:text-xl text-black dark:text-gray2 font-semibold mb-2">Total Package Cost</div>
              <div className="text-black dark:text-gray2 text-xl">  ${props.cost} </div>
            </div>
          </div>

          <Link to={`/${props.url}`} exact={true} className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-6 py-2 transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none">
            See all
          </Link>
        </div>
      </div>
    </>
  );
}
export default AvailablePackage;