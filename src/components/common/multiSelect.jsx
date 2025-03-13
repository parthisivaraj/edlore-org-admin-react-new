import React, { useState, useEffect, Fragment } from 'react';
import { Disclosure, Combobox, Dialog, Transition } from "@headlessui/react";
import CreateProcedure from '../procedures/createProcedure';
import { useDispatch, useSelector } from 'react-redux';
import { setProcedureModal } from '../../redux/reduxes/procedure/procedureAction';
import { setTroubleshootModal } from "../../redux/reduxes/troubleshoot/troubleshootAction";
import { setErrorCodeModal } from '../../redux/reduxes/errorCodes/errorCodesAction';
import CreateTroubleshoot from '../troubleshoot/createTroubleshoot';
import ProcedureDetails from "../procedures/procedureDetails";
import TroubleshootDetails from "../troubleshoot/troubleshootDetails";


const MultiSearchSelect = ({ options, selectedOptions, setSelectedOptions, showPreview, sectiontitle, showShowPreview, model_id, permissionsWriteCondition, usedIn }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const procedureModal = useSelector(state => state.procedure.procedureModal)
  const addedProcedure = useSelector(state => state.procedure.createdNewProcedure);
  const addedProcedureDetails = useSelector(state => state.procedure.createdProcedure);
  const createdNewTroubleshoot = useSelector(state => state.troubleshoot.createdNewTroubleshoot);
  const createdTroubleshootDetails = useSelector(state => state.troubleshoot.createdTroubleshootDetails);
  const troubleshootModal = useSelector(state => state.troubleshoot.troubleshootModal);
  const [resultSearch, setResultSearch] = useState([]);
  const [editingProcedure, setEditingProcedure] = useState(null);

  // Create Procedure, Troubleshoot and Error Codes
  const [showProcedureModal, setShowProcedureModal] = useState(false);
  const [selected, setSelected] = useState(null);

  // Troubleshoot Details Popup
  const [showTroubleshootDetailsModal, setShowTroubleshootDetailsModal] = useState(false);
  const [updateTroubleshootId, setUpdateTroubleshootId] = useState(null);
  const [detailsTroubleshootId, setDetailsTroubleshootId] = useState(null)

  const [search, setSearch] = useState('');
  const setQuery = (e) => {
    setSearch(e);
    let newOption = [];
    const loCaseQry = e.toLowerCase();
    options.forEach(item => {
      if (item.title && item.title.length > 0 && item.title.toLowerCase().match(loCaseQry) && !selectedOptions.includes(item.id)) {
        newOption.push(item);
      }
    });
    setResultSearch(newOption)
  }
  // Open Create Troubleshoot Modal
  const openTroubleshoot = (trouble_id) => {
    setShowTroubleshootDetailsModal(true);
    setUpdateTroubleshootId(trouble_id);
  }
  // const closeTroubleshoot = () => {
  //   setShowTroubleshootDetailsModal(false);
  //   setUpdateTroubleshootId("");
  // }
  // Close Troubleshoot Modal
  // Open Procedure Modal
  const openProcedure = (selected) => {
    !showProcedureModal && setShowProcedureModal(true);

    setEditingProcedure(selected);
  }


  // Show procedure Steps Modal
  useEffect(() => {
    if (addedProcedure && addedProcedureDetails && sectiontitle == "Procedure") {
      openProcedure(addedProcedureDetails.id);
    }
  }, [addedProcedure]);

  // Show Troubleshoot Steps Modal
  useEffect(() => {
    if (createdNewTroubleshoot && createdTroubleshootDetails && sectiontitle == "Troubleshoot") {
      openTroubleshoot(createdTroubleshootDetails.troubleshoot && createdTroubleshootDetails.troubleshoot.id && createdTroubleshootDetails.troubleshoot.id);
    }
  }, [createdNewTroubleshoot, createdTroubleshootDetails]);



  // Add to Selected Options
  const addToselected = (id) => {
    setSelectedOptions([...selectedOptions, id])
  }

  // Remove from the added Items
  const removeFromSelected = (id) => {
    setSelectedOptions(selectedOptions.filter(selectedOptionId => selectedOptionId != id))
  }

  // Filter the Options
  const [filteredOptions, setFilteredOptions] = useState([]);
  useEffect(() => {
    options && options.length > 0 && setFilteredOptions(options.filter(opt => !selectedOptions.includes(opt.id)))
  }, [selectedOptions, options]);
  const getTheName = (id) => {
    let name = "";
    options && options.length > 0 && options.forEach(item => {
      if (id == item.id) {
        name = item.title;
      }
    })
    return name
  }


  const createNewForMultiSelect = (stat) => {
    if (stat == "Procedure") {
      const data = {
        show: true,
        edit: false,
        id: "",
        name: "",
      };
      dispatch(setProcedureModal(data));
    } else if (stat == "Troubleshoot") {
      const data = {
        show: true,
        edit: false,
        id: "",
        name: "",
      };
      dispatch(setTroubleshootModal(data));
    } else if (stat == "Error Code") {
      const data = {
        error_type: "error_codes",
        codeId: "",
        show: true,
      }
      dispatch(setErrorCodeModal(data));
      // dispatch(setErrorCodeModal(true));
      // setAddingErrorCode("Error Code");
    } else if (stat == "mCode") {
      const data = {
        error_type: "mcodes",
        codeId: "",
        show: true,
      }
      dispatch(setErrorCodeModal(data));
      // dispatch(setErrorCodeModal(true));
      // setAddingErrorCode("mCode");
    } else { }
    // else {
    //   const data = {
    //     error_type: "alarm_codes",
    //     codeId: "",
    //     show: true,
    //   }
    //   dispatch(setErrorCodeModal(data));
    // }
  }

  // Backdrop that stops from Closing the Modal
  const showTheDetails = (title, mod_id, selected_id) => {
    if (title == "Procedure") {
      // const data = {
      //   show: true,
      //   edit: true,
      //   id: selected_id,
      //   name: "",
      // };
      // dispatch(setProcedureModal(data));
      setShowProcedureModal(true);
      setEditingProcedure(selected_id);
    } else if (title == "Troubleshoot") {
      // const data = {
      //   show: true,
      //   edit: true,
      //   id: selected_id,
      //   name: "",
      // };
      // dispatch(setTroubleshootModal(data));
      setShowTroubleshootDetailsModal(true);
      setUpdateTroubleshootId(selected_id);
    } else if (title == "Error Code") {
      const data = {
        error_type: "error_codes",
        codeId: selected_id,
        show: true,
      }
      dispatch(setErrorCodeModal(data));
      // dispatch(setErrorCodeModal(true));
      // setAddingErrorCode("Error Code");
    } else if (title == "mCode") {
      const data = {
        error_type: "mcodes",
        codeId: selected_id,
        show: true,
      }
      dispatch(setErrorCodeModal(data));
      // dispatch(setErrorCodeModal(true));
      // setAddingErrorCode("mCode");
    } else { }
  }

  const handleModalBackdrop = () => { }
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex items-center w-full text-black dark:text-gray2 py-3 border-b border-gray2 dark:border-opacity-50 round transition-all hover:opacity-100 hover:transition-all">
            <span className='font-medium  ml-1'>{sectiontitle}s
              <span className='text-danger'>{usedIn == "wo" && sectiontitle == "Procedure" && "*"}</span>

            </span>
            <span className="ml-auto">
              <img src="../assets/icons/icon-arrow-down.svg" alt="icon-arrow-down" className={`w-6 h-6 transition-all dark:invert ${open ? 'rotate-180 transition-all' : ''}`} />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="bg-gray3 bg-opacity-10 rounded-sm mt-2 p-5">
            <div className="flex items-center mb-3">
              <div className="text-base text-black dark:text-gray2 font-medium">Select existing {sectiontitle}s</div>
              {permissionsWriteCondition &&
                <button type="button" onClick={() => createNewForMultiSelect(sectiontitle)} className="ml-auto text-sm font-medium dark:text-gray2 opacity-80 hover:opacity-100 transition-all duration-300 hover:transition-all hover:duration-300 focus:outline-0">+ Create New {sectiontitle}</button>
              }
            </div>

            <>
              {/* Selected Options */}
              <ul className='flex items-center flex-wrap mb-2'>
                {selectedOptions.length > 0 && selectedOptions.map((selected, index) => (
                  <li key={index} className='flex items-center bg-primary text-white text-xs py-1 px-3 rounded-full mr-2 mb-2'>
                    <p className='cursor-pointer' title="View" onClick={() => showTheDetails(sectiontitle, model_id, selected)}>
                      {getTheName(selected)}
                    </p>
                    <span className='ml-3 cursor-pointer'>
                      <img onClick={() => removeFromSelected(selected)} src="../assets/icons/icon-cancel.svg" alt="icon-delete" className='w-[8px] h-[8px] invert hover:invert-0 transition-all duration-300 hover:transition-all' />
                    </span>
                  </li>
                ))}
              </ul>

              {/* Options */}
              <Combobox value={selected} onChange={setSelected} className="w-full">
                <div className='w-full'>
                  <div className="relative w-full flex items-center justify-between">
                    <Combobox.Input
                      //displayValue={(option) => option.value}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder={`Select ${sectiontitle}s`}
                      className="bg-white dark:bg-darkBg w-full h-full px-4 py-3 border border-gray2 dark:border-opacity-50 rounded-md focus:outline-0 focus-visible:border focus-visible:border-secondary"
                    />
                    <Combobox.Button className='flex justify-end absolute right-2 bottom-3 w-full'>
                      <img src="../assets/icons/icon-arrow-down.svg" alt="icon-arrow" />
                    </Combobox.Button>
                  </div>

                  <Combobox.Options className="px-2 py-2 bg-white dark:bg-darkBg dark:text-gray2 h-[200px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                    {search == "" ?
                      <>
                        {filteredOptions.length > 0 ? filteredOptions.map((option, index) => {
                          return (
                            <div key={option.id} className="flex items-center justify-between last-of-type:mb-4">
                              <Combobox.Option onClick={() => addToselected(option.id)} className="w-full first-letter:capitalize px-2 mb-2 cursor-pointer">
                                <div className="text-sm">{option.title} </div>
                              </Combobox.Option>
                              {/* {showShowPreview &&
                                <button onClick={() => showPreview(sectiontitle, option.id, true)} type='button' className='text-sm text-primary opacity-80 underline mr-5 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0'>Preview</button>
                              } */}
                            </div>
                          )
                        }) :
                          <div className='text-center text-danger py-5'>No options found</div>
                        }
                      </>
                      :
                      <>
                        {resultSearch.length > 0 ? resultSearch.map((option, index) => {
                          return (
                            <div key={option.id} className="flex items-center justify-between">
                              <Combobox.Option onClick={() => addToselected(option.id)} className="w-full first-letter:capitalize px-2 mb-2 cursor-pointer">
                                <div className="text-sm">{option.title} </div>
                              </Combobox.Option>
                              {/* {showShowPreview &&
                                <button onClick={() => showPreview(sectiontitle, option.id, true)} type='button' className='text-sm text-primary opacity-80 underline mr-5 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0'>Preview</button>
                              } */}
                            </div>
                          )
                        }) :
                          <div className='text-center text-danger py-5'>No options found</div>
                        }
                      </>
                    }
                  </Combobox.Options>
                </div>
              </Combobox>
            </>
          </Disclosure.Panel>

          {/* Create New Procedure */}
          {procedureModal &&
            <CreateProcedure
              model_id={model_id}
              showProcedureModal={procedureModal}
              update={false}
            />
          }
          {showProcedureModal &&
            <Transition appear show={showProcedureModal} as={Fragment}>
              <Dialog as="div" open={showProcedureModal} onClose={() => handleModalBackdrop()} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
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
                      actionName="Add"
                      procedure_id={editingProcedure}
                      model_id={model_id}
                      setShowProcedureModal={setShowProcedureModal}
                      callingFrom="multi_select"
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </Dialog>
            </Transition>
          }


          {/* Create Troubleshoot  */}
          {troubleshootModal &&
            <CreateTroubleshoot
              showTroubleshootModal={troubleshootModal}
              model_id={model_id}
              update={false}
            />
          }
          {showTroubleshootDetailsModal &&
            <Transition appear show={showTroubleshootDetailsModal} as={Fragment}>
              <Dialog as="div" open={showTroubleshootDetailsModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-[98%] md:w-[95%] xl:w-[80%] h-auto bg-gray4 dark:bg-black3 rounded-2xl shadow-lg">
                    <TroubleshootDetails
                      tabName="Step 1"
                      addNewTab="Add Cause"
                      actionName="Add"
                      model_id={model_id}
                      setShowTroubleshootModal={setShowTroubleshootDetailsModal}
                      trouble_id={updateTroubleshootId}
                    // editable={false}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </Dialog>
            </Transition>
          }

        </>
      )}
    </Disclosure>
  );
}

export default MultiSearchSelect;