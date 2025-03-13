import React, { useState, useEffect, Fragment } from "react";
import { Transition, Dialog, Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { addErrorCode, errorCodeDetails, updateErrorCode, setErrorCodeModal, resetErrorCodeErrors } from "../../../redux/reduxes/errorCodes/errorCodesAction";
import { getModelProcedure } from "../../../redux/reduxes/procedure/procedureAction";
import MultiSearchSelect from "../../common/multiSelect";
import { getAllTroubleshoot } from "../../../redux/reduxes/troubleshoot/troubleshootAction";
import PermissionsMessage from "../../common/permissionsMessage";
import AssetNotesListModal from '../../assetNotes/assetNotesListModal';

// Tabs
const tabs = [
  { title: 'Select Procedure' },
  { title: 'Select Troubleshoot' },
];

const CreateErrorCode = ({ model_id }) => {
  const dispatch = useDispatch();
  // Fetch Data
  const eCodeDetails = useSelector(state => state.error_codes.errorCodeDetails);
  const allProcedures = useSelector(state => state.procedure.modelProcedures);
  const troubleshoots = useSelector(state => state.troubleshoot.troubleshootList);
  const addErrorCodeLoading = useSelector(state => state.error_codes.addErrorCodeLoading);
  const addErrorCodeError = useSelector(state => state.error_codes.addErrorCodeError);
  const updateErrorCodeLoading = useSelector(state => state.error_codes.updateErrorCodeLoading);
  const permissions = useSelector(state => state.auth.allPermissions);
  const errorCodeModel = useSelector(state => state.error_codes.errorCodeModal);
  const errorCodeId = useSelector(state => state.error_codes.errorCodeId);

  const update = !errorCodeId == "";
  // States
  const [state, setState] = useState({
    title: "",
    code: "",
    description: "",

    selectedProcedures: [],
    existingProceduresUnchanged: [],
    existingProcedures: [],

    selectedTroubleshoot: [],
    existingTroubleshootUnchanged: [],
    existingTroubleshoot: [],

    errors: {
      title: "",
      code: "",
    }
  });
  // set errrors
  useEffect(() => {
    let errors = state.errors;
    addErrorCodeError.forEach(error => {

      switch (error.name) {
        case 'title':
          errors.title = error.message
          break;
        case 'code':
          errors.code = error.message
          break;
        default:
          break;
      }
    })
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [addErrorCodeError]);

  // Tab Change Handler
  const [activeTab, setActiveTab] = useState(false);

  const tabChangeHandler = (tab) => {
    setActiveTab(tab);
  }

  // Update Error Code
  useEffect(() => {
    const data = {
      model_id: model_id,
      errorCodeId: errorCodeId,
    }
    let errors = state.errors;
    errors.title = "";
    errors.code = "";
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
    errorCodeId && dispatch(errorCodeDetails(data));
    dispatch(resetErrorCodeErrors());
  }, []);

  useEffect(() => {
    if (update) {
      let procedure = [];
      let troubleshoot = [];
      eCodeDetails && eCodeDetails.procedures && eCodeDetails.procedures.length > 0 && eCodeDetails.procedures.forEach(data => {
        procedure.push(data.id);
      });
      eCodeDetails && eCodeDetails.troubleshoots && eCodeDetails.troubleshoots.length > 0 && eCodeDetails.troubleshoots.forEach(data => {
        troubleshoot.push(data.id);
      });
      eCodeDetails && eCodeDetails.title && setState((prevProps) => ({
        ...prevProps,
        title: eCodeDetails.title,
        code: eCodeDetails.code,
        description: eCodeDetails.description,
        selectedProcedures: procedure,
        existingProceduresUnchanged: procedure,
        existingProcedures: eCodeDetails.procedures,
        existingTroubleshootUnchanged: troubleshoot,
        existingTroubleshoot: eCodeDetails.troubleshoots,
        selectedTroubleshoot: troubleshoot,
      }))
    }
    const data = {
      model_id: model_id,
      search: "",
      page: 0,
      limit: 10,
      filter: {},
      sort: 0,
      sorting: "",
      paginate: false,
    }
    dispatch(getModelProcedure(data));
    const troubleData = {
      search: "",
      page: 0,
      limit: 10,
      model_id: model_id,
      sort: 0,
      sorting: "",
      paginate: false,
    }
    dispatch(getAllTroubleshoot(troubleData));
  }, [eCodeDetails]);


  // Form Validation
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (state.title == "" || state.title.length > 150 || state.code == "") {
      valid = false;
    }
    return valid;
  }

  // onChange Event Handler
  const handleChangeEvent = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'title':
        errors.title = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Error Code Title" : value.length > 150 ? "Title shouldn't exceed more than 150 characters" : "";
        break;
      case "code":
        errors.code = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Error Code" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors, [name]: value
    }));
    dispatch(resetErrorCodeErrors());
  }

  // onSubmit Handler
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {

      let error_code_linkings_attributes = [];
      state.selectedProcedures.forEach(theId => {
        if (state.existingProceduresUnchanged.includes(theId)) {
          //these are already existing there...
        } else {
          //newly added
          error_code_linkings_attributes.push({ linkable_type: "Procedure", linkable_id: theId });
        }
      })
      let procedureDifference = state.existingProceduresUnchanged.filter(x => !state.selectedProcedures.includes(x));
      procedureDifference.length > 0 && procedureDifference.forEach(id => {

        state.existingProcedures.forEach(x => {
          if (id == x.id) {
            error_code_linkings_attributes.push({ linkable_type: "Procedure", "id": x.link_id, "_destroy": true });
          }
          return true;
        })
      })

      state.selectedTroubleshoot.forEach(theId => {
        if (state.existingTroubleshootUnchanged.includes(theId)) {
          //these are already existing there...
        } else {
          //newly added
          error_code_linkings_attributes.push({ linkable_type: "Troubleshoot", linkable_id: theId });
        }
      })
      let troubleshootDifference = state.existingTroubleshootUnchanged.filter(x => !state.selectedTroubleshoot.includes(x));
      troubleshootDifference.length > 0 && troubleshootDifference.forEach(id => {

        state.existingTroubleshoot.forEach(x => {
          if (id == x.id) {
            error_code_linkings_attributes.push({ linkable_type: "Troubleshoot", "id": x.link_id, "_destroy": true });
          }
          return true;
        })
      })

      const data = {
        model_id: model_id,
        errorCodeId: errorCodeId,
        title: state.title.replace(/\s+/g, ' ').trim(),
        code: state.code.replace(/\s+/g, ' ').trim(),
        error_type: 1,
        description: state.description,
        error_code_linkings_attributes: error_code_linkings_attributes,
      }
      if (update) {
        dispatch(updateErrorCode(data));
      } else {
        dispatch(addErrorCode(data));
      }
      // const modalData = {
      //   error_type: "",
      //   codeId: "",
      //   show: false,
      // }
      // dispatch(setErrorCodeModal(modalData));
    } else {
      let errors = state.errors;
      if (state.title == "") {
        errors.title = "Enter Error Code Title"
      }
      if (state.code == "") {
        errors.code = "Enter Error Code"
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  }

  // Reset the values when Cancelling the Edit
  const onCancelTheEdit = () => {
    const data = {
      model_id: "",
      errorCodeId: "",
    }
    setState((prevProps) => ({
      ...prevProps,
      title: "",
      code: "",
      description: "",

      errors: {
        title: "",
        code: "",
      }
    }));
    const modalData = {
      error_type: "",
      codeId: "",
      show: false,
    }
    dispatch(setErrorCodeModal(modalData));
    dispatch(errorCodeDetails(data));
  }

  // Backdrop that stops Modal from Closing
  const handleModalBackdrop = () => { }

  const setSelectedProcedures = (opt) => {
    setState((prevProps) => ({
      ...prevProps,
      selectedProcedures: opt,
    }))
  }
  const setSelectedTroubleshoot = (opt) => {
    setState((prevProps) => ({
      ...prevProps,
      selectedTroubleshoot: opt,
    }))
  }

  // Asset Notes List
  const [viewAssetNotesListModal, setViewAssetNotesListModal] = useState(false);
  const [assetNotiableTypeId, setAssetNotiableTypeId] = useState(null);
  const assetNotesListEvent = (stat, procedure_step_id) => {
    setViewAssetNotesListModal(stat);
    setAssetNotiableTypeId(procedure_step_id);
  }
  return (
    <>
      <Transition appear show={errorCodeModel} as={Fragment}>
        <Dialog as="div" open={errorCodeModel} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 flex items-start justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[96%] lg:w-[80%] 2xl:w-[65%] h-[90vh] relative  bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl py-8 shadow-lg overflow-hidden">
              <Dialog.Title className="dark:text-gray2 text-2xl 2xl:text-3xl font-bold text-center mb-10">{update ? "Update" : "Add"} Error Code</Dialog.Title>

              <div className="h-[600px] px-8 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <form >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-start-1 col-span-2 xl:col-span-1">
                      <label htmlFor="title" className="text-sm font-medium dark:text-gray2">
                        <span className="whitespace-nowrap">Title</span>
                        <span className="text-danger">*</span>
                        <span className='text-gray3 text-sm ml-1'> (Please enter unique Title, Limit: 150 chars)</span>
                      </label> <br />
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Error Code Title"
                        className="w-full text-base dark:bg-darkBg  border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.title}
                        onChange={(e) => handleChangeEvent(e)}
                        maxLength={150}
                      />
                      <div className='text-danger mt-1 ml-1'>{state.errors.title}</div>
                    </div>

                    <div className="col-start-1 xl:col-start-2 col-span-2 xl:col-span-1">
                      <label htmlFor="code" className="text-sm font-medium dark:text-gray2">
                        <span className="whitespace-nowrap">Error Code</span>
                        <span className="text-danger">*</span>
                        <span className='text-gray3 text-sm ml-1'> (Please enter unique Error Code)</span>
                      </label> <br />
                      <input
                        type="text"
                        id="code"
                        name="code"
                        placeholder="Error Code"
                        className="w-full text-base dark:bg-darkBg border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.code}
                        onChange={(e) => handleChangeEvent(e)}
                      />
                      <div className='text-danger mt-1 ml-1'>{state.errors.code}</div>
                    </div>

                    <div className="col-span-2">
                      <label htmlFor="description" className="text-sm font-medium dark:text-gray2">Description </label> <br />
                      <textarea
                        rows="4"
                        cols="50"
                        id="description"
                        name="description"
                        placeholder="Error Code Description..."
                        className="w-full text-base dark:bg-darkBg border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        value={state.description}
                        onChange={(e) => handleChangeEvent(e)}
                      >
                      </textarea>
                      <div className='text-danger mt-1 ml-1'>{state.errors.description}</div>
                    </div>

                    <div className="col-start-1 col-span-2 text-left mb-[250px] 2xl:mb-[50px]">
                      <Tab.Group onChange={(index) => tabChangeHandler(index)}>
                        <Tab.List className="mb-2 whitespace-nowrap overflow-x-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                          {tabs.map((tab, index) => {
                            const { title } = tab;
                            return (
                              <Tab
                                key={index}
                                className={({ selected }) =>
                                  selected ?
                                    'inline-flex items-center text-black2 dark:text-gray2 font-bold border-b-4 border-primary mr-5 xl:mr-10  focus:outline-0 focus-visible:ring-0 '
                                    :
                                    'inline-flex items-center text-black2 dark:text-gray2 opacity-50 font-bold mr-5 xl:mr-10 border-none transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:ring-0'
                                }
                              >
                                {title}
                              </Tab>
                            );
                          })}
                        </Tab.List>

                        <Tab.Panels>
                          <Tab.Panel>
                            {!(permissions.includes("all_procedure") || permissions.includes("read_procedure") || permissions.includes("Admin")) ?
                              <PermissionsMessage
                                additionalClassName="h-full pt-10 pb-20"
                                title="Procedure"
                                message="read procedure"
                              />
                              :
                              <>
                                {allProcedures && allProcedures.length > 0 ?
                                  <MultiSearchSelect
                                    sectiontitle="Procedure"
                                    options={allProcedures}
                                    selectedOptions={state.selectedProcedures}
                                    setSelectedOptions={setSelectedProcedures}
                                    showShowPreview={false}
                                    model_id={model_id}
                                    permissionsWriteCondition={(permissions.includes("all_procedure") || (permissions.includes("write_procedure") && permissions.includes("read_procedure")) || permissions.includes("Admin"))}
                                  />
                                  : allProcedures && allProcedures.length <= 0 &&
                                  <div className="text-danger text-center py-8">No Procedures Found</div>
                                }
                              </>
                            }
                          </Tab.Panel>

                          <Tab.Panel>
                            {!(permissions.includes("all_troubleshoot") || permissions.includes("read_troubleshoot") || permissions.includes("Admin")) ?
                              <PermissionsMessage
                                additionalClassName="h-full pt-10 pb-20"
                                title="Troubleshoot"
                                message="read troubleshoot"
                              />
                              :
                              <>
                                {troubleshoots && troubleshoots.length > 0 ?
                                  <MultiSearchSelect
                                    sectiontitle="Troubleshoot"
                                    options={troubleshoots}
                                    selectedOptions={state.selectedTroubleshoot}
                                    setSelectedOptions={setSelectedTroubleshoot}
                                    showShowPreview={false}
                                    model_id={model_id}
                                    permissionsWriteCondition={(permissions.includes("all_troubleshoot") || (permissions.includes("write_troubleshoot") && permissions.includes("read_troubleshoot")) || permissions.includes("Admin"))}
                                  />
                                  : troubleshoots && troubleshoots.length <= 0 &&
                                  <div className="text-danger text-center py-8">No Troubleshoot Found</div>
                                }
                              </>
                            }

                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>

                  <div className="fixed bottom-0 right-0 z-[20] bg-gray4 dark:bg-darkBg w-full py-6 px-8 flex justify-between  ">
                    <div>
                      {update &&
                        <button
                          type="button"
                          onClick={() => assetNotesListEvent(true, errorCodeId)}
                          className="w-full xl:w-auto bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-4 2xl:px-8 py-2  shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration focus:outline-0 focus-visible:outline-0"
                        >
                          Notes
                        </button>
                      }
                    </div>
                    <div>
                      <button onClick={(e) => onCancelTheEdit(e)} type="button" className="bg-transparent text-black2 dark:text-gray2 md:text-sm ml-5 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleSubmit(e)}
                        disabled={addErrorCodeLoading || updateErrorCodeLoading}
                        className={`${addErrorCodeLoading || updateErrorCodeLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} text-sm bg-secondary text-white font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                      >
                        {update ? (updateErrorCodeLoading ? "Updating..." : "Update Error Code") : (addErrorCodeLoading ? "Adding..." : "Add Error Code")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {viewAssetNotesListModal &&
                <AssetNotesListModal
                  activeMainTab={1}
                  model_id={model_id}
                  viewAssetNotesListModal={viewAssetNotesListModal}
                  setViewAssetNotesListModal={setViewAssetNotesListModal}
                  assetNotiableType="ErrorCode"
                  assetNotiableTypeId={assetNotiableTypeId}
                />
              }
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
export default CreateErrorCode;