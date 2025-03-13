import React, { Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";

const files = [
  { img: '../images/d1.png' },
  { img: '../images/d2.png' },
  { img: '../images/d3.png' },
  { img: '../images/d4.png' },
  { img: '../images/d4.png' },
  { img: '../images/d3.png' },
  { img: '../images/d2.png' },
]


const MediaUpload = () => {
  return (
    <>
      <div className="bg-gray4 dark:bg-gray2 rounded-2xl md:p-6 xl:p-10 2xl:p-16">
        <div className="relative h-[108px] mb-8">
          <input type="file"
            id="add_new_media"
            name="add_new_media"
            className="absolute z-20 w-full h-[108px] opacity-0"
          />
          <div className="absolute top-0 left-0 w-full flex items-center justify-between bg-white dark:bg-opacity-50 border border-dashed border-gray2 rounded-xl md:p-6 xl:p-8 select-none">
            <div className="flex items-center">
              <img src="../assets/images/devices/folder.png" alt="icon-file" />
              <span className="ml-4 text-sm opacity-75 leading-tight">Add your documents, photos, or videos <br /> here to start uploading</span>
            </div>
            <div className="relative before:content:[''] before:absolute before:left-2.5 before:-top-6 before:h-5 before:border before:border-dashed before:border-gray2 after:content:[''] after:absolute after:left-2.5 after:-bottom-6 after:h-5 after:border after:border-dashed after:border-gray2">OR</div>
            <div className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full py-1.5 px-6 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all">
              Browse files
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="relative overflow-hidden">
              <input
                type="search"
                className="md:w-[280px] xl:w-[350px] bg-white bg-opacity-60 text-sm px-4 py-2.5 border border-gray2 rounded-full  focus:border-secondary focus:outline-none"
                name="user_search"
                id="user_search"
                placeholder="Search for media and documents..."
              />
              <div className="absolute top-3.5 right-4 block m-auto  focus-visible:outline-none">
                <img src="../assets/icons/icon-search.svg" alt="icon-search" className="w-4 h-4 block m-auto" />
              </div>
            </div>

            {/* Filters : Start */}
            <Menu as="div" className="inline-block relative text-left ml-3">
              <Menu.Button className="focus-visible:outline-none">
                <img src="../assets/icons/icon-filter.svg" alt="icon-filter" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-[100] mt-2 w-[220px]  rounded-md bg-white shadow-lg ring ring-gray4 ring-opacity-30 focus:outline-none">
                  <Menu.Item as="button" className="w-full text-sm text-left px-4 py-3 rounded-sm hover:bg-gray4">
                    Sort by recently added
                  </Menu.Item>
                  <Menu.Item as="button" className="w-full text-sm text-left px-4 py-3 rounded-sm hover:bg-gray4">
                    Other filters
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div className="grid grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-6 gap-5">
            {files.map((file, index) => {
              const { img } = file;
              return (
                <label key={index} className="relative md:w-[90px] 2xl:w-[120px] md:h-[90px] 2xl:h-[120px] bg-white border border-gray2 rounded-xl cursor-pointer select-none">
                  <div className="md:w-[90px] 2xl:w-[120px] md:h-[90px] 2xl:h-[120px] rounded-xl overflow-hidden">
                    <img src={img} alt="" />
                  </div>

                  <input
                    type="checkbox"
                    id="media_upload"
                    name="media_upload"
                    className="absolute -top-1 -right-1 w-5 h-5"
                  />
                </label>

              );
            })}
          </div>

          <div className="flex items-center justify-end mt-14">
            <button type="button" className="md:text-sm 2xl:text-base font-medium text-black2 border border-black2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 hover:text-white hover:transition-all focus-visible:outline-none">
              Cancel
            </button>
            <button type="button" className="md:text-sm 2xl:text-base font-medium bg-secondary text-white border border-secondary rounded-full px-10 py-2 ml-4 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none">
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default MediaUpload;