import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const Device = (props) => {
  return (
    <>
      <div className="w-full h-[220px] 2xl:h-[280px] flex items-start bg-white dark:bg-darkBg text-black2 dark:text-gray2 border border-gray2 dark:border-opacity-10 shadow-lg shadow-gray2 dark:shadow-none overflow-hidden">
        {props.loading ? (
          <Skeleton
            width="250px"
            height="300px"
            className="dark:bg-darkMainBg"
          />
        ) : (
          <div className="w-[250px] xl:w-[350px] 2xl:min-w-[200px] bg-white dark:bg-gray3">
            <img
              src={props.img}
              alt={props.name}
              className="w-[250px] 2xl:min-w-[200px] h-[220px] 2xl:h-[280px] rounded-r-none object-cover"
            />
          </div>
        )}

        <div className="w-full h-full flex flex-col justify-between">
          <div className="w-full relative p-3 2xl:p-8">
            {props.loading ? (
              <Skeleton count={2} className="dark:bg-darkMainBg" />
            ) : (
              <>
                <h6
                  className="text-lg font-bold w-[150px] 2xl:w-[250px] text-ellipsis whitespace-nowrap overflow-hidden first-letter:uppercase"
                  title={props.name}
                >
                  {props.name != "" ? props.name : "--"}
                </h6>
                <p className="text-sm font-normal line-clamp-1">
                  {props.category}
                </p>
              </>
            )}
            {props.loading ? (
              <Skeleton count={2} className="dark:bg-darkMainBg" />
            ) : (
              <div className="grid grid-cols-2 gap-4 md:mb-4 2xl:mb-8 border-t border-gray2 dark:border-opacity-25  mt-4 pt-4">
                <div className="col-start-1">
                  <div className="text-sm 2xl:text-base opacity-80 line-clamp-1 break-all">
                    Model Name
                  </div>
                  <div
                    className="font-medium first-letter:capitalize w-[100px] text-ellipsis whitespace-nowrap overflow-hidden"
                    title={props.modelName}
                  >
                    {props.modelName}
                  </div>
                </div>
                <div className="col-start-2">
                  <div className="text-sm 2xl:text-base  opacity-80">
                    Procedures
                  </div>
                  <div className="2xl:text-xl font-medium">
                    {props.proceduresCount}
                  </div>
                </div>
              </div>
            )}

            {props.loading ? (
              <Skeleton width="25%" className="dark:bg-darkMainBg" />
            ) : (
              <>
                <Link
                  to={props.url}
                  exact={true}
                  className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-6 md:py-[6px] 2xl:py-2 shadow-sm transition-all duration-300 hover:duration-300 hover:bg-transparent hover:text-primary hover:transition-all focus:outline-0 focus-visible:outline-0"
                >
                  View Device
                </Link>
              </>
            )}
          </div>

          <div className="relative">
            {props.loading ? (
              <Skeleton width="25%" className="dark:bg-darkMainBg" />
            ) : (
              <div className="absolute bottom-0 right-0">
                <div
                  className={`${props.statusClassName} bg-black2 text-white dark:text-gray2 text-sm 2xl:text-base w-full px-6 py-[8px] 2xl:py-2 font-medium rounded-tl-3xl  mx-auto capitalize`}
                >
                  {props.status}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Device;
