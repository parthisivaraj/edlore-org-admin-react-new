import React, { Fragment, useState, useEffect } from "react";
import { Tab, Transition, Dialog } from "@headlessui/react";
import ProcedureDetails from "../../components/procedures/procedureDetails";
import TroubleshootDetails from "../../components/troubleshoot/troubleshootDetails";
import ErrorCodeDetails from ".././errorCodes/errorCodeDetails";
import { useSelector, useDispatch } from "react-redux";
import { getWorkorderDetails } from "../../redux/reduxes/workorders/workorderAction";
import PermissionsMessage from "../common/permissionsMessage";
import Skeleton from "react-loading-skeleton";
import CreateAlarmCode from "../errorCodes/aCodes/createAlarmCode";

const TaskOverviewPanel = ({ wo_id }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const detailsLoading = useSelector(state => state.workorders.workorderDetailsLoading);
  const details = useSelector(state => state.workorders.workOrderDetails);
  const permissions = useSelector(state => state.auth.allPermissions);
  const errorCodeModal = useSelector(state => state.error_codes.errorCodeModal);

  // States
  const [state, setState] = useState({
    id: "",
    status: "",
    work_order_status: "",
    title: "",
    work_order_number: "",
    due_date: "",
    device_name: "",
    category_name: "",
    model_name: "",
    task_type_name: "",
    serial_number: "",
    repeat: false,
    repeat_type: "",
    custom_repetition_days: "",
    repetition_end_by: "",
    repetition_is_cancelled: false,
    assigned_to_type: "",
    troubleshoot: [],
    procedure: [],
    error_code: [],
    user_group: "",
    attached_medias: [],
    task_due_date: "",
    task_status: "",
    started_at: "",
    completed_at: "",
    note: "",
    model_id: "",
  })

  // Work Order Details
  useEffect(() => {
    if (details && details.id) {
      let troubleshoot = [];
      let procedure = [];
      let error_code = [];
      details && details.work_order_todos && details.work_order_todos.forEach(data => {
        if (data.taskable_type == "Troubleshoot") {
          troubleshoot.push(data);
        } else if (data.taskable_type == "Procedure") {
          procedure.push(data);
        } else if (data.taskable_type == "ErrorCode") {
          error_code.push(data);
        }
      })
      setState((prevProps) => ({
        ...prevProps,
        id: details.id ? details.id : "",
        status: details.status ? details.status : "",
        work_order_status: details.work_order_status ? details.work_order_status : "",
        title: details.title ? details.title : "",
        work_order_number: details.work_order_number ? details.work_order_number : "",
        due_date: details.due_date ? details.due_date : "",
        device_name: (details.device && details.device.name) ? details.device.name : "",
        category_name: (details.device && details.device && details.device.model && details.device.model.which_category) ? details.device.model.which_category == "primary" ? details.device.model.primary_category?.name : details.device.model.secondary_category?.name : "",
        model_name: (details.device && details.device && details.device.model && details.device.model.title) ? details.device.model.title : "",
        model_id: (details.device && details.device && details.device.model && details.device.model.id) ? details.device.model.id : "",
        task_type_name: (details.task_type && details.task_type.title) ? details.task_type.title : "",
        serial_number: (details.device && details.device.serial_number) ? details.device.serial_number : "",
        repeat: details && details.repeat && details.repeat,
        repeat_type: (details.repetition && details.repetition.repeat_type) ? details.repetition.repeat_type : "",
        custom_repetition_days: (details.repetition && details.repetition.custom_repetition_days) ? details.repetition.custom_repetition_days : "",
        repetition_end_type: (details.repetition && details.repetition.end_type) ? details.repetition.end_type : "",
        repetition_end_by: (details.repetition && details.repetition.end_by) ? details.repetition.end_by : "",
        repetition_is_cancelled: details && details.repetition && details.repetition.is_cancelled,
        assigned_to_type: details.assigned_to_type,
        priority: details.priority,
        troubleshoot: troubleshoot,
        procedure: procedure,
        error_code: error_code,
        user_group: (details.assigned_to && details.assigned_to.group && details.assigned_to.group.title) ? details.assigned_to.group.title : "",
        attached_medias: details.attached_medias ? details.attached_medias : [],
        user_role: (details && details.assigned_to_type) == "User" ? details.assigned_to && details.assigned_to.users && details.assigned_to.users.name && details.assigned_to.users.name : "",
        user_name: (details && details.assigned_to_type) == "User" ? details.assigned_to && details.assigned_to.role && details.assigned_to.role.title && details.assigned_to.role.title : "",
        task_due_date: details && details.task && details.task.due_date ? details.task.due_date : "",
        task_status: details && details.task && details.task.status ? details.task.status : "",
        started_at: details && details.task && details.task.started_on ? details.task.started_on : "",
        completed_at: details && details.task && details.task.completed_at ? details.task.completed_at : "",
        note: details && details.note ? details.note : "",
      }))
    }
  }, [details]);

  // Dispatch to WO details
  useEffect(() => {
    const data = {
      id: wo_id,
      details_page: "true",
    }
    dispatch(getWorkorderDetails(data));
  }, []);

  // Repeat Type
  function setRepeatType(data, custom_repetition_days) {
    let rtn = `Repeat ${data}`;
    if (data == "" || data == null) {
      rtn = `No repeat`
    }
    if (data == "custom") {
      rtn = `Repeat every ${custom_repetition_days} days`
    }
    return rtn;
  };

  // Set End Date By or After
  function setEndByOrAfter(end_type, end_by) {
    let rtn = "";
    if (end_type == "by") {
      rtn = `By ${end_by}`
    } else if (end_type == "after") {
      rtn = `After ${end_by} occurences`
    } else {
      rtn = end_type ? end_type : "__";
    }
    return rtn;
  }

  // Troubleshoot Preview
  const [showTroubleshootPreview, setShowTroubleshootPreview] = useState(false);
  const [troubleId, setTroubleId] = useState(null);
  const [troubleModelId, setTroubleModelId] = useState(null);
  const [showProcedureModal, setShowProcedureModal] = useState(false);

  const troubleshootPreview = (stat, trouble_id, model_id) => {
    setShowTroubleshootPreview(stat);
    setTroubleId(trouble_id);
    setTroubleModelId(model_id);
  }

  // Procedures Preview
  const [showProceduresPreview, setShowProceduresPreview] = useState(false);
  const [procedureId, setProcedureId] = useState(null);
  const [procedureModelId, setProcedureModelId] = useState(null);

  const procedurePreview = (stat, procedure_id, model_id) => {
    setShowProceduresPreview(stat);
    setProcedureId(procedure_id);
    setProcedureModelId(model_id);
  }

  // Error Codes Preview
  const [showErrorCodesPreview, setShowErrorCodesPreview] = useState(false);
  const [errorCodeId, setErrorCodeId] = useState(null);
  const [errorCodeModelId, setErrorCodeModelId] = useState(null);
  const [errorCodeType, setErrorCodeType] = useState(null);

  const errorCodePreview = (stat, error_code_id, model_id, error_type) => {
    setShowErrorCodesPreview(stat);
    setErrorCodeId(error_code_id);
    setErrorCodeModelId(model_id);
    setErrorCodeType(error_type);
  }
  function getTaskStatus(task_status, started_at, completed_at) {

    let rtn = ""
    if (task_status == "inprogress" || task_status == "notified") {
      rtn = started_at != "" ? started_at : "Not started yet"
    } if (task_status == "completed") {
      rtn = completed_at
    } if (task_status == null || task_status == "") {
      rtn = "Not started yet"
    }
    return rtn;
  }

  return (
    <>
      <Tab.Panel>
        <div className="w-full bg-white dark:bg-darkBg  border border-gray2 dark:border-black1 rounded-3xl p-8">
          <div className="border-b border-gray3 border-opacity-30 pb-8">
            <div className="grid grid-cols-5 gap-5">
              <div className="col-start-1">
                <div className="text-sm text-gray3 dark:text-gray3">Started on</div>
                <div className="text-base dark:text-gray2  font-medium">
                  {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> :
                    <>
                      {getTaskStatus(state.task_status, state.started_at, state.completed_at)}
                      {/* {state.task_status == "inprogress" ? state.started_at : state.task_status == "completed" ? state.completed_at : "-"} */}
                    </>
                  }
                </div>
              </div>

              {/* <div className="col-start-2">
                <div className="text-sm text-danger dark:text-gray3">Approved by</div>
                <div className="text-base dark:text-gray2  font-medium">-</div>
              </div> */}

              <div className="col-start-2">
                <div className="text-sm text-gray3 dark:text-gray3">Status</div>
                <div className="text-base dark:text-gray2 uppercase font-medium">
                  {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.work_order_status ? state.work_order_status : "-"}</>}
                </div>
              </div>
            </div>
          </div>

          {/* Device Details : Start */}
          <div className="border-b border-gray3 border-opacity-30 py-8">
            <div className="text-xl text-black2 dark:text-gray2 font-bold mb-6">Device Details</div>

            <div className="grid grid-cols-4 gap-5">
              <div className="col-start-1">
                <div className="text-sm text-gray3 dark:text-gray3">WO Name/Title</div>
                <div className="text-base dark:text-gray2 first-letter:uppercase font-medium break-all">
                  {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.title ? state.title : "-"}</>}
                </div>
              </div>

              <div className="col-start-2">
                <div className="text-sm text-gray3 dark:text-gray3">WO Number/ID</div>
                <div className="text-base dark:text-gray2  font-medium break-all">
                  {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.work_order_number ? state.work_order_number : "-"}</>}
                </div>
              </div>

              <div className="col-start-3">
                <div className="text-sm text-gray3  dark:text-gray3">Device Category</div>
                <div className="text-base dark:text-gray2 first-letter:uppercase font-medium break-all">
                  {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.category_name ? state.category_name : "-"}</>}
                </div>
              </div>

              <div className="col-start-4">
                <div className="text-sm text-gray3 dark:text-gray3">Model</div>
                <div className="text-base dark:text-gray2 first-letter:uppercase font-medium break-all">
                  {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.model_name ? state.model_name : "-"}</>}
                </div>
              </div>

              <div className="col-start-1">
                <div className="text-sm text-gray3 dark:text-gray3">Serial Number</div>
                <div className="text-base dark:text-gray2  font-medium break-all">
                  {detailsLoading ?
                    <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" />
                    :
                    <>{details.device ? details && details.device && details.device.serial_number && details.device.serial_number : "-"}</>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Workorder Task Details : Start */}
          <div className="border-b border-gray3 border-opacity-30 py-8">
            <div className="text-xl text-black2 dark:text-gray2 font-bold mb-6">Workorder Task Details</div>

            <div className="grid grid-cols-4 gap-5">
              <div className="col-start-1">
                <div className="text-sm text-gray3 dark:text-gray3">Task Type</div>
                <div className="text-base dark:text-gray2 first-letter:uppercase font-medium break-all">
                  {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.task_type_name ? state.task_type_name : "-"}</>}
                </div>
              </div>

              <div className="col-start-2">
                <div className="text-sm text-gray3 dark:text-gray3">Repeat WO</div>
                <div className="text-base dark:text-gray2 first-letter:uppercase font-medium">
                  {detailsLoading ?
                    <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" />
                    :
                    <>
                      {state.repetition_is_cancelled ? "Repetition Cancelled" : setRepeatType(state.repeat_type, state.custom_repetition_days)}
                    </>
                  }
                </div>
              </div>

              <div className="col-start-3">
                <div className="text-sm text-gray3 dark:text-gray3">End by/after</div>
                <div className="text-base dark:text-gray2  font-medium">
                  {detailsLoading ?
                    <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" />
                    :
                    <>
                      {setEndByOrAfter(state.repetition_end_type, state.repetition_end_by)}
                    </>
                  }
                </div>
              </div>

              <div className="col-start-4">
                <div className="text-sm text-gray3 dark:text-gray3">Task Due Date</div>
                <div className="text-base dark:text-gray2  font-medium">
                  {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{(state.task_due_date && state.task_due_date != "") ? state.task_due_date : "-"}</>}
                </div>
              </div>

              {/* <div className="col-start-1">
                <div className="text-sm text-gray3 dark:text-gray3">Work Template</div>
                <div className="text-base dark:text-gray2  font-medium">CNC Temp 1</div>
              </div> */}
            </div>

            <div className="w-full mt-12">
              <div className="text-base dark:text-gray2 font-semibold mb-4">Workorder Type (To Dos)</div>

              {/* Troubleshoot */}
              <div className="mb-5">
                <>
                  <div className="w-full text-sm text-gray3 dark:text-gray3 font-medium">Troubleshoot</div>
                  {detailsLoading ? <Skeleton width="100%" height="25px" className="dark:bg-darkMainBg" />
                    :
                    <ul className="flex items-start flex-wrap w-full">
                      {state.troubleshoot.length > 0 ? state.troubleshoot.map((task, index) => {
                        return (
                          <>
                            <li key={task.id} className="flex items-center text-sm mt-2 dark:text-gray2 mr-8">
                              <div className="max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap capitalize font-medium" title={task.troubleshoot && task.troubleshoot.title}>{task.troubleshoot && task.troubleshoot.title}</div>
                              <button onClick={() => troubleshootPreview(true, task.troubleshoot.id, details.device.model.id)} type="button" className="text-sm text-primary underline ml-5">Preview</button>
                            </li>
                          </>
                        )
                      })
                        :
                        <div className="text-sm text-danger">No Troubleshoots Found</div>
                      }
                    </ul>
                  }
                </>
              </div>

              {/* Procedures */}
              <div className="mb-5">
                <>
                  <div className="w-full text-sm text-gray3 dark:text-gray3 font-medium">Procedures</div>
                  {detailsLoading ? <Skeleton width="100%" height="25px" className="dark:bg-darkMainBg" />
                    :
                    <ul className="flex items-start flex-wrap w-full">
                      {state.procedure.length > 0 ? state.procedure.map((task, index) => {
                        return (
                          <>
                            <li key={task.id} className="flex items-center text-sm mt-2 dark:text-gray2 mr-8">
                              <div className="max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap capitalize font-medium" title={task.procedures && task.procedures.name}>{task.procedures && task.procedures.name}</div>
                              <button onClick={() => procedurePreview(true, task.procedures.id, details.device.model.id)} type="button" className="text-sm text-primary underline ml-5">Preview</button>
                            </li>
                          </>
                        )
                      }) : <div className="text-sm text-danger">No Procedures Found</div>
                      }
                    </ul>
                  }
                </>
              </div>

              {/* Error Codes */}
              <div className="mb-5">
                <>
                  <div className="w-full text-sm text-gray3 dark:text-gray3 font-medium">Error Codes</div>
                  {detailsLoading ? <Skeleton width="100%" height="25px" className="dark:bg-darkMainBg" />
                    :
                    <ul className="flex items-start flex-wrap w-full">
                      {state.error_code.length > 0 ? state.error_code.map((task, index) => {
                        return (
                          <>
                            <li key={task.id} className="flex items-center text-sm mt-2 dark:text-gray2 mr-8">
                              <div className="max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap capitalize font-medium" title={task.errors && task.errors.title}>{task.errors && task.errors.title} <>({task.error_code_type_taskable == "alarm_codes" ? "Alarm Code" : task.error_type == "error_codes" ? "Error Code" : "M Code"})</></div>
                              <button onClick={() => errorCodePreview(true, task.errors.id, details.device.model.id, task.error_code_type_taskable)} type="button" className="text-sm text-primary underline ml-5">Preview</button>
                            </li>
                          </>
                        )
                      })
                        :
                        <div className="text-sm text-danger">No Error codes Found</div>
                      }
                    </ul>
                  }
                </>
              </div>
            </div>
          </div>

          {/* Assigned to Details : Start */}
          <div className="py-8">
            <div className="text-xl text-black2 dark:text-gray2 font-bold mb-6">Assigned to</div>

            <div className="grid grid-cols-4 gap-5">
              <div className="col-start-1">
                <div className="text-sm text-gray3 dark:text-gray3">Assign to</div>
                <div className="text-base dark:text-gray2 first-letter:uppercase font-medium">
                  {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.assigned_to_type ? state.assigned_to_type : "-"}</>}
                </div>
              </div>

              {state.assigned_to_type == "Group" ?
                <div className="col-start-2">
                  <div className="text-sm text-gray3 dark:text-gray3 ">User Group</div>
                  <div className="text-base dark:text-gray2 first-letter:uppercase font-medium" title={state.user_group}>
                    {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.user_group ? state.user_group : "-"}</>}
                  </div>
                </div>
                :
                <>
                  <div className="col-start-2">
                    <div className="text-sm text-gray3 dark:text-gray3 ">Selected User Role</div>
                    <div className="text-base dark:text-gray2 first-letter:uppercase font-medium" title={state.user_name}>
                      {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.user_name ? state.user_name : "-"}</>}
                    </div>
                  </div>

                  <div className="col-start-3">
                    <div className="text-sm text-gray3 dark:text-gray3">Selected User</div>
                    <div className="text-base dark:text-gray2 first-letter:uppercase font-medium" title={state.user_role}>
                      {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.user_role ? state.user_role : "-"}</>}
                    </div>
                  </div>
                </>
              }
              <div className="col-start-4">
                <div className="text-sm text-gray3 dark:text-gray3">Task Priority</div>
                <div className="text-base dark:text-gray2 first-letter:uppercase font-medium">
                  {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.priority ? state.priority : "-"}</>}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="text-base dark:text-gray2 font-medium mb-5">Attach notes/instructions</div>
              <p className="text-base dark:text-gray2 mb-5 break-all">
                {detailsLoading ? <Skeleton width="200px" height="20px" className="dark:bg-darkMainBg" /> : <>{state.note} </>}
              </p>

              <ul className="flex items-center flex-wrap">
                {!(permissions.includes("all_media") || permissions.includes("read_media") || permissions.includes("Admin")) ?
                  <PermissionsMessage
                    additionalClassName="py-5"
                    title="Media"
                    message="read media"
                  />
                  :
                  <>
                    {detailsLoading ?
                      <Skeleton
                        count={12}
                        width="100px"
                        height="100px"
                        inline={true}
                        className="dark:bg-darkMainBg m-2"
                      />
                      :
                      <>
                        {state.attached_medias && state.attached_medias.length > 0 ?
                          <>
                            {state.attached_medias.map((data, index) => {
                              return (
                                <li key={index} className="relative mr-2 mb-2">
                                  <div className="w-[100px] h-[100px] bg-gray3 dark:bg-darkMainBg dark:border dark:border-darkMainBg rounded-lg overflow-hidden">
                                    <img src={data.blob.thumb_url} alt="" className="w-[100px] h-[100px] bg-gray3 dark:bg-darkMainBg dark:border dark:border-darkMainBg rounded-lg object-cover object-[100%]" />
                                  </div>
                                  <div className="flex flex-col items-center justify-center absolute left-0 top-0 w-full h-full z-2 bg-darkBg bg-opacity-75 dark:border dark:border-darkMainBg rounded-lg">
                                    <a href={data.url} target="_blank" rel="noreferrer" className="flex flex-col justify-center items-center w-full h-full text-white text-sm hover:text-primary hover:underline transition-all duration-300 ease-in-out hover:transition-all hover:duration-300 hover:ease-in-out">Preview</a>
                                  </div>
                                </li>
                              )
                            })}
                          </>
                          :
                          <div className="text-danger text-sm">No media/attachments found</div>
                        }

                      </>
                    }
                  </>
                }
              </ul>
            </div>
          </div>
        </div>
      </Tab.Panel>

      {/* procedure preview start */}
      {showProceduresPreview &&
        <Transition appear show={showProceduresPreview} as={Fragment}>
          <Dialog as="div" open={showProceduresPreview} onClose={() => setShowProceduresPreview(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[98%] md:w-[95%] xl:w-[80%] 2xl:w-[85%] h-auto bg-gray4 dark:bg-darkBg rounded-2xl shadow-lg">

                <ProcedureDetails
                  tabName="Step 1"
                  addNewTab="Add Step"
                  actionName="Update"
                  procedure_id={procedureId}
                  model_id={procedureModelId}
                  setShowProcedureModal={setShowProceduresPreview}
                />
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      }
      {/* procedure preview end */}

      {/* Troubleshoot Preview  Start */}
      {showTroubleshootPreview &&
        <Transition appear show={showTroubleshootPreview} as={Fragment}>
          <Dialog as="div" open={showTroubleshootPreview} onClose={() => setShowTroubleshootPreview(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[98%] md:w-[95%] xl:w-[80%] h-auto bg-gray4 dark:bg-darkBg rounded-2xl shadow-lg">
                {showTroubleshootPreview &&
                  <TroubleshootDetails
                    tabName="Step 1"
                    addNewTab="Add Cause"
                    actionName="Add"
                    model_id={troubleModelId}
                    setShowTroubleshootModal={setShowTroubleshootPreview}
                    trouble_id={troubleId}
                    editable={false}
                  />
                }
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      }

      {/* Error Codes Preview */}
      {showErrorCodesPreview &&
        <ErrorCodeDetails
          viewErrorCodeModal={showErrorCodesPreview}
          setViewErrorCodeModal={setShowErrorCodesPreview}
          model_id={errorCodeModelId}
          errorCodeId={errorCodeId}
          error_type={errorCodeType == "error_codes" ? 1 : errorCodeType == "mcodes" ? 2 : errorCodeType == "alarm_codes" ? 3 : ""}
        />
      }
      {/* Add/Update Error Code Modal */}
      {errorCodeModal &&
        <CreateAlarmCode
          addAlarmCodeModal={errorCodeModal}
          // setAddAlarmCodeModal={setAddAlarmCodeModal}
          model_id={state.model_id}
          // updateAlarmCodeModal={updateAlarmCodeModal}
          errorCodeId={errorCodeId}
          setErrorCodeId={setErrorCodeId}
        />
      }


    </>
  )
}
export default TaskOverviewPanel;