import React, { useState, useEffect, Fragment } from "react";
import { Transition, Dialog, Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import {
  deleteErrorCode,
  errorCodeDetails,
  getAllProcedureLinkedErrorCode,
  getAllTroubleshootLinkedErrorCode,
  setErrorCodeModal,
} from "../../redux/reduxes/errorCodes/errorCodesAction";
import DeleteModal from "../common/deleteModal";
import ProcedureDetails from "../procedures/procedureDetails";
import { setTroubleshootModal } from "../../redux/reduxes/troubleshoot/troubleshootAction";
import TroubleshootDetails from "../troubleshoot/troubleshootDetails";
import PermissionsMessage from "../common/permissionsMessage";

const tabs = [{ title: "Procedure" }, { title: "Troubleshoot" }];
const ErrorCodeDetails = ({
  viewErrorCodeModal,
  setViewErrorCodeModal,
  model_id,
  errorCodeId,
  error_type,
}) => {
  const dispatch = useDispatch();

  // Fetch Data
  const eCodeDetailsLoading = useSelector(
    (state) => state.error_codes.errorCodeDetailsLoading,
  );
  const eCodeDetails = useSelector(
    (state) => state.error_codes.errorCodeDetails,
  );
  const linkedProcedureListLoading = useSelector(
    (state) => state.error_codes.linkedProcedureListLoading,
  );
  const linkedProceduresList = useSelector(
    (state) => state.error_codes.linkedProcedureList.procedures,
  );
  const linkedProcedureListPagination = useSelector(
    (state) => state.error_codes.linkedProcedureListPagination,
  );
  const linkedTroubleshootListLoading = useSelector(
    (state) => state.error_codes.linkedTroubleshootListLoading,
  );
  const linkedTroubleshootList = useSelector(
    (state) => state.error_codes.linkedTroubleshootList.troubleshoots,
  );
  const linkedTroubleshootListPagination = useSelector(
    (state) => state.error_codes.linkedTroubleshootListPagination,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const deleteErrorCodeLoading = useSelector(
    (state) => state.error_codes.deleteErrorCodeLoading,
  );

  // Dispatch Details and Procedures
  useEffect(() => {
    const data = {
      model_id: model_id,
      errorCodeId: errorCodeId,
      error_type: error_type,
      page: 0,
      limit: 10,
    };
    dispatch(errorCodeDetails(data));
  }, []);

  useEffect(() => {
    const data = {
      model_id: model_id,
      errorCodeId: errorCodeId,
      error_type: error_type,
      page: 0,
      limit: 10,
    };
    // dispatch(errorCodeDetails(data));
    dispatch(getAllProcedureLinkedErrorCode(data));
    dispatch(getAllTroubleshootLinkedErrorCode(data));
  }, [eCodeDetails]);

  // Tab Change
  const [activeTab, setActiveTab] = useState(false);
  const tabChangeHandler = (tab) => {
    setActiveTab(tab);
    const data = {
      model_id: model_id,
      errorCodeId: errorCodeId,
      error_type: error_type,
      page: 0,
      limit: 10,
    };
    if (tab === 0) {
      dispatch(getAllProcedureLinkedErrorCode(data));
    }
    if (tab === 1) {
      dispatch(getAllTroubleshootLinkedErrorCode(data));
    }
  };

  // Update an Error Code Model
  const updateErrorCode = (error_type, eCodeId) => {
    const data = {
      error_type: error_type,
      codeId: eCodeId,
      show: true,
    };
    dispatch(setErrorCodeModal(data));
  };

  // Delete an Error Code Modal
  const [deleteErrorCodeModal, setDeleteErrorCodeModal] = useState(false);
  const [deleteErrorCodeId, setDeleteErrorCodeId] = useState(null);

  const confirmDeleteErrorCode = (stat, id) => {
    setDeleteErrorCodeModal(stat);
    setDeleteErrorCodeId(id);
  };

  // Procedures Pagination
  const handlePageClick = (e) => {
    const data = {
      page: e.selected,
      limit: 10,
    };
    dispatch(getAllProcedureLinkedErrorCode(data));
  };

  // Backdrop Modal stops from Closing Popup
  const handleModalBackdrop = () => {};

  // View Procedure Details
  const [viewProcedureModal, setViewProcedureModal] = useState(false);
  const [procedureId, setProcedureId] = useState(null);

  const viewProcedureEvent = (stat, procedure_id) => {
    setViewProcedureModal(stat);
    setProcedureId(procedure_id);
  };

  // View Troubleshoot
  const [viewTroubleshootModal, setViewTroubleshootModal] = useState(false);
  const [troubleshootId, setTroubleshootId] = useState(null);

  const viewTroubleshootEvent = (stat, trouble_id) => {
    setViewTroubleshootModal(stat);
    setTroubleshootId(trouble_id);
  };

  return (
    <>
      <Transition appear show={viewErrorCodeModal} as={Fragment}>
        <Dialog
          as="div"
          open={viewErrorCodeModal}
          onClose={() => handleModalBackdrop(false)}
          className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[96%] lg:w-[80%] 2xl:w-[60%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl py-8  shadow-lg">
              <Dialog.Title className="dark:text-gray2 text-2xl 2xl:text-3xl font-bold text-center mb-10 px-8 capitalize">
                {eCodeDetails.title} - Details{" "}
                <>
                  (
                  {error_type == 1
                    ? "Error Code"
                    : error_type == 2
                    ? "M Code"
                    : error_type == 3
                    ? "Alarm Code"
                    : ""}
                  )
                </>{" "}
              </Dialog.Title>
              <div>
                {/* Error Code Table List : Start */}
                <div className="w-full h-full  overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <table className="table-auto text-left w-full">
                    <thead className="border-b border-gray2 dark:border-gray4 dark:border-opacity-20">
                      <tr>
                        <th
                          scope="col"
                          width="25%"
                          className="px-4 py-4 text-sm uppercase whitespace-nowrap flex items-center"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          width="20%"
                          className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {error_type == 1
                            ? "Error Code"
                            : error_type == 2
                            ? "M Code"
                            : error_type == 3
                            ? "Alarm Code"
                            : ""}
                        </th>
                        {error_type == 2 && (
                          <th
                            scope="col"
                            className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                          >
                            Machine Type
                          </th>
                        )}
                        <th
                          scope="col"
                          width="30%"
                          className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          width="15%"
                          className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          Procedures
                        </th>
                        <th
                          scope="col"
                          width="10%"
                          className="px-4 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {((error_type == 1 &&
                            (permissions.includes("all_error_codes") ||
                              permissions.includes("delete_error_codes") ||
                              permissions.includes("Admin"))) ||
                            (error_type == 2 &&
                              (permissions.includes("all_mcodes") ||
                                permissions.includes("delete_mcodes") ||
                                permissions.includes("Admin"))) ||
                            (error_type == 3 &&
                              (permissions.includes("all_alarm_codes") ||
                                permissions.includes("delete_alarm_codes") ||
                                permissions.includes("Admin")))) && (
                            <span>Actions</span>
                          )}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {eCodeDetailsLoading ? (
                        <tr>
                          <td colSpan="6">
                            <Skeleton
                              count={1}
                              height={50}
                              baseColor="#e9e9e9"
                              highlightColor="#e1e1e1"
                              borderRadius="0"
                              enableAnimation="true"
                              duration={2.5}
                              inline={true}
                              className="dark:bg-darkMainBg"
                            />
                          </td>
                        </tr>
                      ) : (
                        <tr
                          valign="top"
                          className="border-b border-gray2 dark:border-gray4 dark:border-opacity-10 dark:bg-gray3 dark:bg-opacity-10"
                        >
                          <td
                            width="25%"
                            className="px-4 py-4 text-sm font-medium capitalize max-w-[200px] whitespace-nowrap text-ellipsis overflow-hidden"
                          >
                            {eCodeDetails.title}
                          </td>
                          <td
                            width="20%"
                            className="px-4 py-4 text-sm whitespace-nowrap"
                          >
                            {eCodeDetails.code}
                          </td>
                          {error_type == 2 && (
                            <td className="px-4 py-4 text-sm">
                              {eCodeDetails &&
                                eCodeDetails.error_code_machine_type &&
                                eCodeDetails.error_code_machine_type
                                  .machine_type}
                            </td>
                          )}
                          <td width="30%" className="px-4 py-4 text-sm">
                            {eCodeDetails.description}
                          </td>
                          <td
                            width="15%"
                            className="px-4 py-4 text-sm whitespace-nowrap"
                          >
                            {eCodeDetails.procedure_count}
                          </td>
                          <td width="10%" className="px-4 py-4">
                            <div className="flex items-center">
                              {((error_type == 1 &&
                                (permissions.includes("all_error_codes") ||
                                  permissions.includes("delete_error_codes") ||
                                  permissions.includes("Admin"))) ||
                                (error_type == 2 &&
                                  (permissions.includes("all_mcodes") ||
                                    permissions.includes("delete_mcodes") ||
                                    permissions.includes("Admin"))) ||
                                (error_type == 3 &&
                                  (permissions.includes("all_alarm_codes") ||
                                    permissions.includes(
                                      "delete_alarm_codes",
                                    ) ||
                                    permissions.includes("Admin")))) && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    confirmDeleteErrorCode(
                                      true,
                                      eCodeDetails.id,
                                      eCodeDetails.error_type,
                                    )
                                  }
                                  className="focus:outline-0 focus-visible:outline-0"
                                  title="Delete"
                                >
                                  <img
                                    src="../assets/icons/icon-delete.svg"
                                    alt="icon-delete"
                                    className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300"
                                  />
                                </button>
                              )}

                              {((error_type == 1 &&
                                (permissions.includes("all_error_codes") ||
                                  permissions.includes("update_error_codes") ||
                                  permissions.includes("Admin"))) ||
                                (error_type == 2 &&
                                  (permissions.includes("all_mcodes") ||
                                    permissions.includes("update_mcodes") ||
                                    permissions.includes("Admin"))) ||
                                (error_type == 3 &&
                                  (permissions.includes("all_alarm_codes") ||
                                    permissions.includes(
                                      "update_alarm_codes",
                                    ) ||
                                    permissions.includes("Admin")))) && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateErrorCode(
                                      eCodeDetails.error_type,
                                      eCodeDetails.id,
                                    )
                                  }
                                  className="focus:outline-0 focus-visible:outline-0"
                                  title="Edit"
                                >
                                  <img
                                    src="../assets/icons/icon-edit.svg"
                                    alt="icon-edit"
                                    className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300"
                                  />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* <div className="col-start-1 col-span-2 text-left"> */}
                <Tab.Group onChange={(index) => tabChangeHandler(index)}>
                  <Tab.List className="mt-10 mb-5 px-8 whitespace-nowrap overflow-x-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                    {tabs.map((tab, index) => {
                      const { title } = tab;
                      return (
                        <Tab
                          key={index}
                          className={({ selected }) =>
                            selected
                              ? "inline-flex items-center 2xl:text-lg text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-5 xl:mr-10  focus:outline-none focus-visible:ring-0 "
                              : "inline-flex items-center 2xl:text-lg text-black2 dark:text-gray2 opacity-50 font-bold mr-5 xl:mr-10 border-none transition-all hover:opacity-100 hover:transition-all  focus:outline-none focus-visible:ring-0"
                          }
                        >
                          {title}
                          {() => tabChangeHandler(title)}
                        </Tab>
                      );
                    })}
                  </Tab.List>

                  <Tab.Panels>
                    <Tab.Panel>
                      {!(
                        permissions.includes("all_procedure") ||
                        permissions.includes("read_procedure") ||
                        permissions.includes("Admin")
                      ) ? (
                        <PermissionsMessage
                          additionalClassName="h-full py-20"
                          title="Procedures"
                          message="read procedure"
                        />
                      ) : (
                        <>
                          <div className="w-full h-[250px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                            <table className="table-auto text-left relative min-w-full max-h-full">
                              <thead className="sticky top-0 z-10 w-full bg-gray2 dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                                <tr>
                                  <th
                                    scope="col"
                                    width="50%"
                                    className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                                  >
                                    {" "}
                                    Title
                                  </th>
                                  <th
                                    scope="col"
                                    width="25%"
                                    className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                                  >
                                    {" "}
                                    Procedure Steps{" "}
                                  </th>
                                  <th
                                    scope="col"
                                    width="25%"
                                    className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                                  >
                                    {(permissions.includes("all_procedure") ||
                                      permissions.includes("read_procedure") ||
                                      permissions.includes("Admin")) && (
                                      <span>Action</span>
                                    )}
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {linkedProcedureListLoading ? (
                                  <tr>
                                    <td colSpan="3">
                                      <Skeleton
                                        count={4}
                                        height={50}
                                        baseColor="#e9e9e9"
                                        highlightColor="#e1e1e1"
                                        borderRadius="0"
                                        enableAnimation="true"
                                        duration={2.5}
                                        inline={true}
                                        className="dark:bg-darkMainBg"
                                      />
                                    </td>
                                  </tr>
                                ) : (
                                  <>
                                    {/* eCodeDetails && eCodeDetails.procedures&&eCodeDetails.procedures.length */}
                                    {linkedProceduresList &&
                                    linkedProceduresList.length > 0 ? (
                                      <>
                                        {linkedProceduresList.map(
                                          (procedure, index) => {
                                            const { id, title, steps_count } =
                                              procedure;
                                            return (
                                              <tr
                                                valign="top"
                                                key={id}
                                                className="border-b border-gray2 dark:border-gray4 dark:border-opacity-10 odd:bg-white dark:odd:bg-gray2 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                              >
                                                <td
                                                  width="50%"
                                                  className="px-8 py-4"
                                                >
                                                  <div className="text-sm font-medium w-[300px] text-ellipsis whitespace-nowrap overflow-hidden">
                                                    {title || ""}
                                                  </div>
                                                </td>

                                                <td
                                                  width="25%"
                                                  className="px-8 py-4 opacity-75"
                                                >
                                                  <span className="text-sm whitespace-nowrap">
                                                    {steps_count} Steps
                                                  </span>
                                                </td>
                                                <td
                                                  width="25%"
                                                  className="px-8 py-4"
                                                >
                                                  {(permissions.includes(
                                                    "all_procedure",
                                                  ) ||
                                                    permissions.includes(
                                                      "read_procedure",
                                                    ) ||
                                                    permissions.includes(
                                                      "Admin",
                                                    )) && (
                                                    <button
                                                      onClick={() =>
                                                        viewProcedureEvent(
                                                          true,
                                                          id,
                                                        )
                                                      }
                                                      type="button"
                                                      className="group flex items-center whitespace-nowrap text-[14px] text-primary font-medium opacity-75 underline transition-all hover:opacity-100 hover:transition-all focus:outline-0"
                                                    >
                                                      <span>
                                                        View Procedure
                                                      </span>
                                                      <img
                                                        src="../assets/icons/icon-link.svg"
                                                        alt="icon-link"
                                                        className="ml-2 w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-[8px] group-hover:transition-all group-hover:duration-300"
                                                      />
                                                    </button>
                                                  )}
                                                </td>
                                              </tr>
                                            );
                                          },
                                        )}
                                      </>
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="3"
                                          align="center"
                                          className="p-8 text-danger"
                                        >
                                          No Procedure List found for this{" "}
                                          {error_type == 1
                                            ? "Error Code"
                                            : error_type == 2
                                            ? "M Code"
                                            : error_type == 3
                                            ? "Alarm Code"
                                            : ""}
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>

                          {/* Pagination */}
                          <div className="flex justify-end mt-8 px-4">
                            {linkedProcedureListLoading ? (
                              <Skeleton
                                count={1}
                                width={200}
                                height={40}
                                baseColor="#fafafa"
                                highlightColor="#e1e1e1"
                                borderRadius="30"
                                enableAnimation="true"
                                duration={2.5}
                                inline={true}
                                className=" dark:bg-darkMainBg"
                              />
                            ) : (
                              <PaginatedItems
                                itemsPerPage={
                                  linkedProcedureListPagination &&
                                  linkedProcedureListPagination.per_page
                                }
                                handlePageClick={handlePageClick}
                                pageCount={
                                  linkedProcedureListPagination &&
                                  Math.ceil(
                                    linkedProcedureListPagination.total_entries /
                                      linkedProcedureListPagination.per_page,
                                  )
                                }
                                current_page={
                                  linkedProcedureListPagination &&
                                  linkedProcedureListPagination.current_page
                                }
                                totalEntries={
                                  linkedProcedureListPagination &&
                                  linkedProcedureListPagination.total_entries
                                }
                              />
                            )}
                          </div>
                        </>
                      )}
                    </Tab.Panel>

                    <Tab.Panel>
                      {!(
                        permissions.includes("all_troubleshoot") ||
                        permissions.includes("read_troubleshoot") ||
                        permissions.includes("Admin")
                      ) ? (
                        <PermissionsMessage
                          additionalClassName="h-full py-20"
                          title="Troubleshoot"
                          message="read troubleshoot"
                        />
                      ) : (
                        <>
                          <div className="w-full h-[250px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                            <table className="table-auto text-left relative min-w-full max-h-full">
                              <thead className="sticky top-0 z-10 w-full bg-gray2 dark:bg-darkBg  border-b border-gray2 dark:border-opacity-20">
                                <tr>
                                  <th
                                    scope="col"
                                    width="50%"
                                    className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                                  >
                                    {" "}
                                    Title
                                  </th>
                                  <th
                                    scope="col"
                                    width="25%"
                                    className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                                  >
                                    Causes
                                  </th>
                                  <th
                                    scope="col"
                                    width="25%"
                                    className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                                  >
                                    {(permissions.includes(
                                      "all_troubleshoot",
                                    ) ||
                                      permissions.includes(
                                        "read_troubleshoot",
                                      ) ||
                                      permissions.includes("Admin")) && (
                                      <span>Action</span>
                                    )}
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {linkedTroubleshootListLoading ? (
                                  <tr>
                                    <td colSpan="3">
                                      <Skeleton
                                        count={4}
                                        height={50}
                                        baseColor="#e9e9e9"
                                        highlightColor="#e1e1e1"
                                        borderRadius="0"
                                        enableAnimation="true"
                                        duration={2.5}
                                        inline={true}
                                        className="dark:bg-darkMainBg"
                                      />
                                    </td>
                                  </tr>
                                ) : (
                                  <>
                                    {linkedTroubleshootList &&
                                    linkedTroubleshootList.length > 0 ? (
                                      <>
                                        {linkedTroubleshootList.map(
                                          (trouble, index) => {
                                            const { id, title, steps_count } =
                                              trouble;
                                            return (
                                              <tr
                                                key={id}
                                                className="border-b border-gray2 dark:border-gray4 dark:border-opacity-10 odd:bg-white dark:odd:bg-gray2 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                              >
                                                <td
                                                  width="50%"
                                                  className="px-8 py-4"
                                                >
                                                  <div className="text-sm font-medium w-[300px] text-ellipsis whitespace-nowrap overflow-hidden">
                                                    {title || ""}
                                                  </div>
                                                </td>

                                                <td
                                                  width="25%"
                                                  className="px-8 py-4 opacity-75"
                                                >
                                                  <span className="text-sm whitespace-nowrap">
                                                    {steps_count} Steps
                                                  </span>
                                                </td>
                                                <td
                                                  width="25%"
                                                  className="px-8 py-4"
                                                >
                                                  {(permissions.includes(
                                                    "all_troubleshoot",
                                                  ) ||
                                                    permissions.includes(
                                                      "read_troubleshoot",
                                                    ) ||
                                                    permissions.includes(
                                                      "Admin",
                                                    )) && (
                                                    <button
                                                      onClick={() =>
                                                        viewTroubleshootEvent(
                                                          true,
                                                          id,
                                                        )
                                                      }
                                                      type="button"
                                                      className="group flex items-center whitespace-nowrap text-[14px] text-primary font-medium opacity-75 underline transition-all hover:opacity-100 hover:transition-all focus:outline-0"
                                                    >
                                                      <span>
                                                        View Troubleshoot
                                                      </span>
                                                      <img
                                                        src="../assets/icons/icon-link.svg"
                                                        alt="icon-link"
                                                        className="ml-2 w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-[8px] group-hover:transition-all group-hover:duration-300"
                                                      />
                                                    </button>
                                                  )}
                                                </td>
                                              </tr>
                                            );
                                          },
                                        )}
                                      </>
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan="3"
                                          align="center"
                                          className="p-8 text-danger"
                                        >
                                          No Troubleshoot List found for this{" "}
                                          {error_type == 1
                                            ? "Error Code"
                                            : error_type == 2
                                            ? "M Code"
                                            : error_type == 3
                                            ? "Alarm Code"
                                            : ""}
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>

                          {/* Pagination */}
                          <div className="flex justify-end mt-8 px-4">
                            {linkedTroubleshootListLoading ? (
                              <Skeleton
                                count={1}
                                width={200}
                                height={40}
                                baseColor="#fafafa"
                                highlightColor="#e1e1e1"
                                borderRadius="30"
                                enableAnimation="true"
                                duration={2.5}
                                inline={true}
                                className=" dark:bg-darkMainBg"
                              />
                            ) : (
                              <PaginatedItems
                                itemsPerPage={
                                  linkedTroubleshootListPagination &&
                                  linkedTroubleshootListPagination.per_page
                                }
                                handlePageClick={handlePageClick}
                                pageCount={
                                  linkedTroubleshootListPagination &&
                                  Math.ceil(
                                    linkedTroubleshootListPagination.total_entries /
                                      linkedTroubleshootListPagination.per_page,
                                  )
                                }
                                current_page={
                                  linkedTroubleshootListPagination &&
                                  linkedTroubleshootListPagination.current_page
                                }
                                totalEntries={
                                  linkedTroubleshootListPagination &&
                                  linkedTroubleshootListPagination.total_entries
                                }
                              />
                            )}
                          </div>
                        </>
                      )}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>

              {/* </div> */}

              <div className="flex justify-end mt-12 px-10">
                <button
                  type="button"
                  onClick={() => setViewErrorCodeModal(false)}
                  className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Update Error Code Modal*/}
      {/* {(errorCodeModal && error_type === "error_codes") &&
        <CreateErrorCode
          addErrorCodeModal={updateErrorCodeModal}
          model_id={model_id}
          update={true}
          error_type={error_type}
          errorCodeId={updateErrorCodeId}
          setErrorCodeId={setUpdateErrorCodeId}
        />
      } */}

      {/* Update mCode Modal */}
      {/* {(errorCodeModal && error_type === "mCodes") &&
        <CreatemCode
          addMCodeModal={updateMCodeModal}
          model_id={model_id}
          update={true}
          error_type={error_type}
          errorCodeId={updateErrorCodeId}
          setErrorCodeId={setUpdateErrorCodeId}
        />
      } */}

      {/* Update Alarm Modal */}
      {/* {(errorCodeModal && error_type === "alarm_codes") &&
        <CreateAlarmCode
          addAlarmCodeModal={updateAlarmCodeModal}
          model_id={model_id}
          updateAlarmCodeModal={true}
          error_type={error_type}
          errorCodeId={updateErrorCodeId}
          setErrorCodeId={setUpdateErrorCodeId}
        />
      } */}

      {/* Delete an Error Code Modal */}
      {deleteErrorCode && (
        <DeleteModal
          head="Remove Error Code"
          body={[
            "Are you sure you want to remove",
            <strong className="capitalize break-all">
              {" "}
              "{eCodeDetails && eCodeDetails.title}"{" "}
            </strong>,
            "Error Code from the list?",
          ]}
          deleteAction={deleteErrorCode}
          modalAction={setDeleteErrorCodeModal}
          modalValue={deleteErrorCodeModal}
          parentmodel={true}
          closeParentPopup={setViewErrorCodeModal}
          id={deleteErrorCodeId}
          model_id={model_id}
          error_type={error_type}
          deleteLoading={deleteErrorCodeLoading}
        />
      )}

      {/* View Procedure Details */}
      {viewProcedureModal && (
        <Transition appear show={viewProcedureModal} as={Fragment}>
          <Dialog
            as="div"
            open={viewProcedureModal}
            onClose={() => setViewProcedureModal(false)}
            className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[98%] md:w-[95%] xl:w-[80%] 2xl:w-[85%]  h-auto bg-gray4 dark:bg-black3 rounded-2xl shadow-lg">
                {viewProcedureModal && (
                  <ProcedureDetails
                    tabName="Step 1"
                    addNewTab="Add Step"
                    actionName="Update"
                    procedure_id={procedureId}
                    model_id={model_id}
                    setShowProcedureModal={setViewProcedureModal}
                    error_id={errorCodeId}
                    callingFrom="error_code"
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      )}

      {/* View Troubleshoot Details */}
      {viewTroubleshootModal && (
        <Transition appear show={viewTroubleshootModal} as={Fragment}>
          <Dialog
            as="div"
            open={viewTroubleshootModal}
            onClose={() => setTroubleshootModal(false)}
            className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[96%] xl:w-[80%] 2xl:w-[75%]  h-auto bg-gray4 dark:bg-black3 rounded-2xl shadow-lg">
                {viewTroubleshootModal && (
                  <TroubleshootDetails
                    tabName="Cause 1"
                    addNewTab="Add Cause"
                    actionName="Update"
                    trouble_id={troubleshootId}
                    model_id={model_id}
                    setShowTroubleshootModal={setViewTroubleshootModal}
                    error_id={errorCodeId}
                    callingFrom="error_code"
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      )}
    </>
  );
};
export default ErrorCodeDetails;
