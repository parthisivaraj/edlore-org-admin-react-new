import React, { useEffect } from "react";
import { Disclosure, Tab, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllsubmittedWoPdf } from "../../redux/reduxes/workorders/workorderAction";
import PaginatedItems from "../common/pagination";
import Skeleton from "react-loading-skeleton";
import PermissionsMessage from "../common/permissionsMessage";

const SubmittedWorkorderPanel = ({ wo_id, activeTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const submittedWoPdfLoading = useSelector(state => state.workorders.getSubmittedWoPdfLoading);
  const submittedWoPdf = useSelector(state => state.workorders.submittedWoPdf);
  const pagination = useSelector(state => state.workorders.submittedWoPdfPagination);
  const permissions = useSelector(state => state.auth.allPermissions);

  // console.log(submittedWoPdf.pdf_progress, "submittedWoPdf LPLPLP");
  // Get the submitted pdfs
  useEffect(() => {
    const data = {
      id: wo_id,
      page: 0,
      limit: 5,
    }
    if (activeTab === 1) {
      dispatch(getAllsubmittedWoPdf(data));
    }
  }, []);

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      page: e.selected,
      limit: 5,
      id: wo_id,
    }
    if (activeTab === 1) {
      dispatch(getAllsubmittedWoPdf(data));
    }
  }


  return (
    <>
      <Tab.Panel>
        <div>
          {!(permissions.includes("all_work_order") || permissions.includes("read_work_order") || permissions.includes("Admin")) ?
            <PermissionsMessage
              additionalClassName="h-[75vh] bg-white dark:bg-darkBg p-20 border border-gray2 dark:border-black1 rounded-3xl drop-shadow-md"
              title="Work Order"
              message="read work order"
            />
            :
            <>
              {/* Repeat Occurance : Start */}
              {submittedWoPdfLoading ?
                <Skeleton
                  count={5}
                  height={100}
                  fbaseColor="#f7f6f5"
                  highlightColor='#e1e1e1'
                  borderRadius="2"
                  enableAnimation="true"
                  className="mb-3 border border-gray3 border-opacity-10 dark:bg-darkMainBg"
                  duration={2.5}
                  inline={true}
                />
                :
                <>
                  {submittedWoPdf && submittedWoPdf.length > 0 ?
                    <>
                      {submittedWoPdf.map((task, index) => {
                        const { completed_at, pdf_url, id, due_date, pdf_progress } = task;
                        return (
                          <Disclosure as="div" key={index} className="bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl p-8 mb-5">
                            {({ open }) => (
                              <>
                                {pdf_url == null ?
                                  <div className="flex items-center text-sm w-full">
                                    <span className="text-black3 dark:text-gray3 font-bold mr-2">{id} </span>
                                    <span className="dark:text-gray3">|</span>
                                    {pdf_url == null ?
                                      <span className="ml-2 text-gray3"><strong>In progress</strong></span> :
                                      <>{due_date && <span className="ml-2 text-gray3">Due date <strong>{due_date}</strong></span>}</>
                                    }
                                  </div>
                                  :
                                  <Disclosure.Button as="button" className="flex items-center w-full text-sm">
                                    <span className="text-black3 dark:text-gray3 font-bold mr-2">{id}</span>
                                    <span className="dark:text-gray3">|</span>
                                    {pdf_url == null ?
                                      <span className="ml-2 text-gray3"><strong>In progress</strong></span> :
                                      <>{completed_at && <span className="ml-2 text-gray3">Completed on <strong>{completed_at}</strong></span>}</>
                                    }

                                    <div className="ml-auto">
                                      {open ?
                                        <img src="../assets/icons/icon-arrow-up.svg" alt="icon-arrow-up" className="w-[14px] h-[14px]" />
                                        :
                                        <img src="../assets/icons/icon-arrow-down.svg" alt="icon-arrow-down" className="w-[25px] h-[25px]" />
                                      }
                                    </div>
                                  </Disclosure.Button>
                                }

                                <Transition
                                  show={open}
                                  enter="transition duration-100 ease-out"
                                  enterFrom="transform scale-95 opacity-0"
                                  enterTo="transform scale-100 opacity-100"
                                  leave="transition duration-75 ease-out"
                                  leaveFrom="transform scale-100 opacity-100"
                                  leaveTo="transform scale-95 opacity-0"
                                >{pdf_progress == "completed" ?
                                  <Disclosure.Panel>
                                    <div className="mt-5">
                                      <iFrame
                                        src={pdf_url}
                                        width="100%"
                                        height="700"
                                      />
                                    </div>
                                  </Disclosure.Panel> :
                                  <Disclosure.Panel>
                                    <div className="mt-5">
                                      <div className="text-center text-danger">
                                        Report generation is in progress. Please try after some time.
                                      </div>
                                    </div>
                                  </Disclosure.Panel>
                                  }
                                </Transition>
                              </>
                            )}
                          </Disclosure>)
                      })}
                    </>
                    :

                    <div className="flex flex-col justify-center w-full h-[72vh] bg-white dark:bg-darkBg text-center border border-gray2 dark:border-black1 rounded-3xl drop-shadow-sm">
                      <div className="text-center text-danger">
                        No Submitted Work Order PDF's Found
                      </div>
                    </div>
                  }
                </>
              }

              {/* Pagination */}
              <div className="flex justify-end my-8 px-4">
                {submittedWoPdfLoading ?
                  <Skeleton
                    count={1}
                    width={200}
                    height={40}
                    baseColor="#f5f5f5"
                    highlightColor='#e1e1e1'
                    borderRadius="30"
                    enableAnimation="true"
                    duration={2.5}
                    inline={true}
                    className=" dark:bg-darkMainBg"
                  />
                  :
                  <PaginatedItems
                    itemsPerPage={pagination && pagination.per_page}
                    handlePageClick={handlePageClick}
                    pageCount={pagination && Math.ceil(pagination.total_entries / pagination.per_page)}
                    current_page={pagination && pagination.current_page}
                    totalEntries={pagination && pagination.total_entries}
                  />
                }
              </div>
            </>
          }
        </div>
      </Tab.Panel>
    </>
  )
}
export default SubmittedWorkorderPanel;