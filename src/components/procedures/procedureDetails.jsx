import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import {
  getProcedureDetails,
  updateProcedureSteps,
  addProcedureSteps,
  deleteProcedureSteps,
  deleteProcedure,
  setToDefault,
  updateProcedureStepOrder,
  setProcedureModal,
  getModelProcedure,
} from "../../redux/reduxes/procedure/procedureAction";
import { useSelector, useDispatch } from "react-redux";
import DeleteProcedureStep from "./deleteProcedureStep";
import DeleteModal from "../common/deleteModal";
import CreateProcedure from "./createProcedure";
import Skeleton from "react-loading-skeleton";
import LinkMedia from "../common/linkMediaNew";
import AssetNotesListModal from "../assetNotes/assetNotesListModal";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  TouchSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RTEEditor } from "../common/editor";

const TabItem = ({ step, tabClick, state, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: step.id,
  });

  const style = {
    opacity: isDragging ? "0.4" : "1",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Tab
      key={step.id}
      ref={setNodeRef}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        tabClick(step);
      }}
      selected={state.step_id === step.id}
      style={{ ...style }}
      {...attributes}
      {...listeners}
      className={
        step.step_order === state.stepOrder
          ? "w-full bg-gray4 dark:bg-darkBg text-black2 dark:text-gray2 border border-gray4 dark:border-opacity-20 text-sm font-medium text-left py-4 px-4 rounded-xl  focus:outline-none focus-visible:ring-0"
          : "w-full bg-white dark:bg-transparent text-left text-black2 dark:text-gray2 text-sm font-medium py-4 px-4 rounded-xl  focus:outline-none focus-visible:ring-0"
      }
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="../assets/icons/icon-stepper.svg"
            alt="icon-stepper"
            className="w-[16px] h-[16px] dark:invert"
          />
          <span className="ml-1 capitalize w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">
            {step.title}
          </span>
        </div>
        <div className="flex items-center ml-2">
          {/* <img src="../assets/icons/icon-delete.svg" onClick={() => deleteThisStep(step.id)} alt="icon-delete" className="mx-2 w-[15px] h-[15px]" /> */}
          <img
            src="../assets/icons/icon-arrow-right.svg"
            alt="icon-arrow-right"
            className="w-[15px] h-[15px] dark:invert"
          />
        </div>
      </div>
      <div className="w-full text-sm text-black3 text-opacity-50 dark:text-gray3 mt-2 ml-5">
        Step Order {index + 1}
      </div>
    </Tab>
  );
};

const ProcedureDetails = ({
  procedure_id,
  model_id,
  tabName,
  addNewTab,
  actionName,
  setShowProcedureModal,
  error_id,
  callingFrom,
}) => {
  const dispatch = useDispatch();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  // Fetch Data
  const procedureDetailsLoading = useSelector(
    (state) => state.procedure.procedureDetailsLoading,
  );
  const procedureDetails = useSelector(
    (state) => state.procedure.proceduresDetails,
  );
  const procedureModal = useSelector((state) => state.procedure.procedureModal);
  const permissions = useSelector((state) => state.auth.allPermissions);
  const addProcedureStepLoading = useSelector(
    (state) => state.procedure.AddProcedureStepLoading,
  );
  const updateProcedureStepLoading = useSelector(
    (state) => state.procedure.updateProcedureStepLoading,
  );
  const deleteProcedureStepLoading = useSelector(
    (state) => state.procedure.deleteProcedureStepLoading,
  );

  // States
  const [state, setState] = useState({
    title: "",
    description: "",
    stepOrder: 1,
    step_id: null,
    attached_medias: [],
    newStep: [],
    stepFiles: [],
    steps: [],
    existingFiles: [],
    selectedFilesIds: [],
    existingFilesIdsUnchanged: [],
    updatingStep: false,

    errors: {
      title: "",
      description: "",
    },
  });

  // Dispatch to Procedure Details
  useEffect(() => {
    const data = {
      procedure_id: procedure_id,
      model_id: model_id,
    };
    dispatch(getProcedureDetails(data));
  }, []);

  //set Loader
  useEffect(() => {
    setState((prevProps) => ({
      ...prevProps,
      updatingStep: false,
    }));
  }, [procedureDetails]);

  // States
  const [deleteStep, setDeleteStep] = useState(false);
  const [deleteStepId, setDeleteStepId] = useState(false);
  const [deleteProcedureStepTitle, setDeleteProcedureStepTitle] = useState("");
  const [showDeleteProcedure, setShowDeleteProcedure] = useState(false);
  const [lastAction, setLastAction] = useState("initial");
  const [lastUpdatingStep, setLastUpdatingStep] = useState(null);

  // Update Procedure Name
  // const [updateProcedureModal, setUpdateProcedureModal] = useState(false);
  function setUpdateProcedureModal() {
    const data = {
      show: true,
      edit: true,
      id: procedureDetails.id,
      name: procedureDetails.name,
    };
    dispatch(setProcedureModal(data));
  }
  const [update, setUpdate] = useState(false);

  const updateProcedureName = () => {
    setUpdateProcedureModal(true);
    setUpdate(true);
  };

  // Change Procedure Step
  function stepChanged(stepDetails) {
    let stepFiles = [];
    stepDetails &&
      stepDetails.attached_medias.forEach((attached) => {
        stepFiles.push(attached.active_storage_attachment_id);
      });
    setState((prevProps) => ({
      ...prevProps,
      stepOrder: stepDetails && stepDetails.step_order,
      title: stepDetails && stepDetails.title,
      description: stepDetails && stepDetails.description,
      attached_medias: stepDetails && stepDetails.attached_medias,
      stepFiles: stepFiles,
      step_id: stepDetails && stepDetails.id,
      existingFiles: stepDetails && stepDetails.attached_medias,
      selectedFilesIds: stepFiles,
      existingFilesIdsUnchanged: stepFiles,
    }));
  }

  // Update Procedure Details
  useEffect(() => {
    if (lastAction == "initial" || lastAction == "delete") {
      procedureDetails &&
        procedureDetails.steps &&
        procedureDetails.steps.length > 0 &&
        stepChanged(procedureDetails && procedureDetails.steps[0]);
    } else if (lastAction == "addStep") {
      procedureDetails &&
        procedureDetails.steps &&
        procedureDetails.steps.length > 0 &&
        stepChanged(
          procedureDetails &&
            procedureDetails.steps[procedureDetails.steps.length - 1],
        );
    } else if (lastAction == "update" || lastAction == "stepUpdate") {
      procedureDetails &&
        procedureDetails.steps &&
        procedureDetails.steps.length > 0 &&
        stepChanged(
          ...(procedureDetails &&
            procedureDetails &&
            procedureDetails.steps &&
            procedureDetails.steps.length > 0 &&
            procedureDetails.steps.filter(
              (data) => data.id == lastUpdatingStep,
            )),
        );
    } else {
      procedureDetails &&
        procedureDetails.steps &&
        procedureDetails.steps.length > 0 &&
        stepChanged(procedureDetails && procedureDetails.steps[0]);
    }
    procedureDetails &&
      procedureDetails.steps &&
      setState((prevProps) => ({
        ...prevProps,
        steps: procedureDetails && procedureDetails.steps,
        stepMedias: procedureDetails && procedureDetails.steps,
      }));
  }, [procedureDetails]);

  // Step tab Changes
  const [selectedStep, setSelectedStep] = useState(0);
  const stepTabChanged = (index) => {
    stepChanged(state.steps && state.steps[index]);
    // setSelectedStep(index);
  };

  // Add New Step
  const addNewStep = () => {
    setState((prevProps) => ({
      ...prevProps,
      updatingStep: true,
    }));
    let unNamed = [];
    procedureDetails &&
      procedureDetails.steps &&
      procedureDetails.steps.forEach((step) => {
        if (
          step.title.split(" ")[0] == "Step" &&
          !isNaN(step.title.split(" ")[1])
        ) {
          unNamed.push(Number(step.title.split(" ")[1]));
        }
      });
    unNamed = unNamed.sort(function (a, b) {
      return a - b;
    });
    const data = {
      procedure_id: procedure_id,
      model_id: model_id,
      name:
        procedureDetails && procedureDetails.name.replace(/\s+/g, " ").trim(),
      steps_attributes: [
        {
          title:
            unNamed.length > 0
              ? "Step " + Number(unNamed[unNamed.length - 1] + 1)
              : "Step 1",
          description: "Enter Description",
          step_order:
            procedureDetails &&
            (procedureDetails.steps || []).length > 0 &&
            procedureDetails.steps[procedureDetails.steps.length - 1]
              .step_order + 1,
          attached_medias_attributes: [],
        },
      ],
    };
    dispatch(addProcedureSteps(data));
    setLastAction("addStep");
    setLastUpdatingStep(state.step_id);
  };

  // Change Handler for Description
  const changeHandler = (event, editor) => {
    let errors = state.errors;
    errors.title = "";
    errors.description = "";
    setState((prevProps) => ({
      ...prevProps,
      description: event,
      errors,
    }));
  };

  // Change Handler
  const onChangeHandler = (event) => {
    event.preventDefault();
    let errors = state.errors;
    const { value, name } = event.target;
    errors.title = "";
    errors.description = "";
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      errors,
    }));
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    if (
      state.title == "" ||
      state.title.length > 150 ||
      state.description == ""
    ) {
      valid = false;
    }
    return valid;
  };
  // Update File Upload Handler
  const updateHandler = (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      let media_attributes = [];
      state.selectedFilesIds.forEach((theId) => {
        if (state.existingFilesIdsUnchanged.includes(theId)) {
          //these are already existing there...
        } else {
          //newly added
          media_attributes.push({ active_storage_attachment_id: theId });
        }
      });
      let difference = state.existingFilesIdsUnchanged.filter(
        (x) => !state.selectedFilesIds.includes(x),
      );
      difference.length > 0 &&
        difference.forEach((id) => {
          state.existingFiles.length > 0 &&
            state.existingFiles.forEach((x) => {
              if (id == x.active_storage_attachment_id) {
                media_attributes.push({ id: x.id, _destroy: true });
              }
              return true;
            });
        });
      const data = {
        procedure_id: procedure_id,
        model_id: model_id,
        name: procedureDetails && procedureDetails.name,
        steps_attributes: [
          {
            id: state.step_id,
            title: state.title.replace(/\s+/g, " ").trim(),
            description: state.description,
            step_order: state.step,
            attached_medias_attributes: media_attributes,
          },
        ],
        callingFrom: callingFrom,
        error_id: error_id,
      };
      dispatch(updateProcedureSteps(data));
      setLastAction("update");
      setLastUpdatingStep(state.step_id);
    } else {
      let errors = state.errors;
      if (state.title == "") {
        errors.title = "Enter Title";
      }
      if (state.description == "") {
        errors.description = "Enter Description";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Delete the Step
  const deleteThisStep = (stp_id, title) => {
    setDeleteStepId(stp_id);
    setDeleteStep(true);
    setDeleteProcedureStepTitle(title);

    setLastAction("delete");

    // if (procedureDetails && procedureDetails.steps && procedureDetails.steps.length > 0 && procedureDetails.steps[0].id == stp_id) {
    //   stepChanged(procedureDetails && procedureDetails.steps && procedureDetails.steps.length > 0 && procedureDetails.steps[1]);
    //   setLastUpdatingStep(procedureDetails && procedureDetails.steps && procedureDetails.steps.length > 0 && procedureDetails.steps[1].id);
    // }
    // else {
    //   stepChanged(procedureDetails && procedureDetails.steps && procedureDetails.steps.length > 0 && procedureDetails.steps[0]);
    //   setLastUpdatingStep(procedureDetails && procedureDetails.steps && procedureDetails.steps.length > 0 && procedureDetails.steps[0].id);
    // }
  };

  // Close Modal
  const closeModal = () => {
    const data = {
      search: "",
      page: 0,
      limit: 10,
      model_id: model_id,
      sort: "",
      sorting: "",
      paginate: true,
    };
    dispatch(setToDefault());
    dispatch(getModelProcedure(data));
    setShowProcedureModal(false);
  };

  const handleDrop = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = state.steps.findIndex((x) => x.id === active.id);
      const newIndex = state.steps.findIndex((x) => x.id === over.id);
      const newItems = arrayMove(state.steps, oldIndex, newIndex);

      setState((prevProps) => ({
        ...prevProps,
        steps: newItems,
      }));
      const steps_attributes = [];
      newItems.forEach((step, index) => {
        steps_attributes.push({
          step_order: index + 1,
          id: step.id,
        });
      });

      const updatedData = {
        procedure_id: procedure_id,
        model_id: model_id,
        name: procedureDetails && procedureDetails.name,
        steps_attributes: steps_attributes,
      };
      setLastAction("stepUpdate");
      dispatch(updateProcedureStepOrder(updatedData));
      setLastUpdatingStep(state.step_id);
    }
  };

  const updateTheSelected = (m) => {
    setState((prevProps) => ({
      ...prevProps,
      selectedFilesIds: m,
    }));
  };

  const tabClick = (e) => {
    stepChanged(e);
  };

  // Asset Notes List
  const [viewAssetNotesListModal, setViewAssetNotesListModal] = useState(false);
  const [assetNotiableTypeId, setAssetNotiableTypeId] = useState(null);
  const assetNotesListEvent = (stat, procedure_step_id) => {
    setViewAssetNotesListModal(stat);
    setAssetNotiableTypeId(procedure_step_id);
  };
  return (
    <>
      <Tab.Group
        selectedIndex={state.step_id}
        onChange={(index) => stepTabChanged(index)}
        as="div"
        vertical
        className="bg-white dark:bg-darkBg w-full h-[85vh] 2xl:h-[90vh] flex flex-row border border-gray2 dark:border-opacity-20 overflow-hidden rounded-2xl"
      >
        <Tab.List className="w-[35%] xl:w-[25%] 2xl:w-[23%] h-[85vh] 2xl:h-[90vh] relative z-20 bg-white dark:bg-darkMainBg p-4 border-r border-gray4 dark:border-opacity-10 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkBg scrollbar-track-gray4 dark:scrollbar-track-darkMainBg  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          <div className="w-full py-4 px-4 xl:px-2 mb-2">
            <div className="text-sm text-gray3 font-medium mb-1">
              Procedure Title:
            </div>
            <div className="flex items-start justify-between mb-2">
              <h6 className="text-base dark:text-gray2 font-medium capitalize leading-snug w-[250px] break-all text-ellipsis line-clamp-2">
                {procedureDetailsLoading ? (
                  <Skeleton
                    width={150}
                    height={20}
                    className="dark:bg-darkMainBg"
                  />
                ) : (
                  procedureDetails && procedureDetails.name
                )}
              </h6>

              {(permissions.includes("all_procedure") ||
                permissions.includes("update_procedure") ||
                permissions.includes("Admin")) && (
                <button
                  type="button"
                  onClick={() =>
                    updateProcedureName(procedureDetails && procedureDetails.id)
                  }
                  className="ml-5"
                  title="Edit"
                >
                  <img
                    src="../assets/icons/icon-edit.svg"
                    alt="icon-edit"
                    className="w-4 h-4 dark:invert"
                  />
                </button>
              )}
            </div>

            {(permissions.includes("all_procedure") ||
              permissions.includes("delete_procedure") ||
              permissions.includes("Admin")) && (
              <button
                type="button"
                onClick={() => setShowDeleteProcedure(true)}
                className="text-sm font-medium text-danger text-opacity-75 underline transition-all duration-300 hover:text-opacity-100 hover:transition-all hover:duration-300 focus:outline-0"
              >
                Delete Procedure
              </button>
            )}
          </div>
          <DndContext
            autoScroll={false}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDrop}
          >
            <SortableContext items={state.steps.map((item) => item.id)}>
              {state.steps.map((step, index) => (
                <TabItem
                  index={index}
                  state={state}
                  step={step}
                  tabClick={tabClick}
                  key={step.id}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="flex justify-between fixed left-0 bottom-0 z-10 w-[35%] xl:w-[25%] 2xl:w-[23%] bg-white dark:bg-darkMainBg border-r border-gray4 dark:border-opacity-10 overflow-hidden px-4 py-6 rounded-bl-2xl">
            <button
              type="button"
              onClick={() => closeModal()}
              className="w-full xl:w-auto bg-white dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base  border border-black2 dark:border-gray2 text-base font-medium rounded-full shadow-sm px-4 2xl:px-8 py-2 mr-3 transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
            >
              Close
            </button>

            {(permissions.includes("all_procedure") ||
              permissions.includes("update_procedure") ||
              permissions.includes("Admin")) && (
              <button
                type="button"
                disabled={state.updatingStep || addProcedureStepLoading}
                onClick={() => addNewStep()}
                className={`${
                  addProcedureStepLoading
                    ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                    : ""
                } w-full xl:w-auto bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-4 2xl:px-8 py-2  shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration focus:outline-0 focus-visible:outline-0`}
              >
                {addProcedureStepLoading ? "Adding..." : addNewTab}
              </button>
            )}
          </div>
        </Tab.List>

        <Tab.Panels
          selectedIndex={state.step_id}
          className="w-[65%] xl:w-[75%] 2xl:w-[77%] p-4 xl:p-10 bg-gray4 dark:bg-darkBg overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl"
        >
          {procedureDetailsLoading ? (
            <Skeleton
              count={3}
              height={250}
              baseColor="#fcfcfc"
              highlightColor="#e1e1e1"
              borderRadius="0"
              enableAnimation="true"
              duration={2.5}
              inline={true}
              className="dark:bg-darkMainBg"
            />
          ) : (
            <>
              {state.steps.length > 0 &&
                state.steps.map((data, index) => (
                  <>
                    <Tab.Panel key={data.id} className="relative">
                      <div className="mb-20">
                        <form>
                          <div className="mb-4">
                            <label
                              htmlFor="procedure_title"
                              className="font-medium dark:text-gray2"
                            >
                              Title
                              <span className="text-danger">*</span>
                              <span className="text-gray3 text-sm">
                                {" "}
                                (Please enter unique Title, Limit: 150 chars)
                              </span>
                            </label>{" "}
                            <br />
                            <input
                              type="text"
                              id="procedure_title"
                              name="title"
                              placeholder="Procedure Title"
                              value={state.title}
                              onChange={(e) => onChangeHandler(e)}
                              maxLength={150}
                              className="w-full bg-white dark:bg-darkBg text-black2 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                            />
                            <div className="text-danger mt-1 ml-1">
                              {state.errors.title}
                            </div>
                          </div>

                          <RTEEditor
                            value={state.description}
                            error={state.errors.description}
                            label="Description"
                            onChange={changeHandler}
                          />

                          <LinkMedia
                            model_id={model_id}
                            existingFiles={state.existingFiles}
                            selectedFilesIds={state.selectedFilesIds}
                            existingFilesIdsUnchanged={
                              state.existingFilesIdsUnchanged
                            }
                            updateTheSelected={updateTheSelected}
                            limit={48}
                            showOnly="all"
                            type="procedure_step"
                            typeId={state.step_id}
                          />
                        </form>
                      </div>

                      <div className="flex items-center justify-between fixed left-[35%] xl:left-[25%] 2xl:left-[23%] bottom-0 right-0 z-[5] bg-white dark:bg-darkMainBg w-[65%] xl:w-[75%] 2xl:w-[77%] py-6 px-4 2xl:px-10 rounded-br-2xl shadow-[20px_-15px_40px_-16px_rgba(229,229,229,0.2)] dark:shadow-[20px_-15px_40px_-16px_rgba(0,0,0,0.2)]">
                        <button
                          type="button"
                          onClick={() =>
                            assetNotesListEvent(true, state.step_id)
                          }
                          className="w-auto bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-8 py-2  shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration focus:outline-0 focus-visible:outline-0"
                        >
                          Notes
                        </button>

                        {(permissions.includes("all_procedure") ||
                          permissions.includes("update_procedure") ||
                          permissions.includes("write_procedure") ||
                          permissions.includes("Admin")) && (
                          <div className="ml-auto">
                            {state.steps.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  deleteThisStep(state.step_id, state.title)
                                }
                                className="bg-transparent text-black2 dark:text-gray2 border border-black2 ml-5 dark:border-gray2 md:text-sm 2xl:text-base font-medium rounded-full shadow-sm px-6 py-2 max-w-[150px] xl:max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                              >
                                Delete {state.title}
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={(e) => updateHandler(e)}
                              disabled={updateProcedureStepLoading}
                              className={`${
                                updateProcedureStepLoading
                                  ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                                  : ""
                              } bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full py-2 px-6 ml-5 shadow-sm transition-all duration-300 max-w-[150px] xl:max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                            >
                              {updateProcedureStepLoading
                                ? "Updating..."
                                : `Update ${state.title}`}
                            </button>
                          </div>
                        )}
                      </div>
                    </Tab.Panel>
                  </>
                ))}
            </>
          )}

          {/* Tab1 : End */}
        </Tab.Panels>
      </Tab.Group>

      {/* Update the Procedure Name */}
      {procedureModal && (
        <CreateProcedure
          showProcedureModal={procedureModal}
          // setShowProcedureModal={setUpdateProcedureModal}
          model_id={model_id}
          procedureDetails={procedureDetails}
          // procedure_id={procedureDetails.id}
          // update={update}
          // procedureName={procedureDetails.name}
        />
      )}

      {/* Delete the Procedure Modal */}
      {showDeleteProcedure && (
        <DeleteModal
          head="Remove Procedure"
          body={[
            "Are you sure you want to remove",
            <strong className="capitalize break-all">
              {" "}
              "{procedureDetails && procedureDetails.name}"{" "}
            </strong>,
            "Procedure from the list?",
          ]}
          deleteAction={deleteProcedure}
          modalAction={setShowDeleteProcedure}
          modalValue={showDeleteProcedure}
          parentmodel={true}
          closeParentPopup={closeModal}
          id={procedure_id}
          model_id={model_id}
          // section_id={deleteSectionId}
        />
      )}

      {/* Delete the Procedure Step Modal */}
      {deleteStep && (
        <DeleteProcedureStep
          head="Remove Procedure Step"
          body={[
            "Are you sure you want to remove",
            <strong className="capitalize break-all">
              {" "}
              "{deleteProcedureStepTitle}"{" "}
            </strong>,
            "step from the list?",
          ]}
          deleteAction={deleteProcedureSteps}
          modalAction={setDeleteStep}
          modalValue={deleteStep}
          procedure_id={procedure_id}
          step_id={deleteStepId}
          model_id={model_id}
          deleteLoading={deleteProcedureStepLoading}
        />
      )}
      {/* View Asset Notes List Modal */}
      {viewAssetNotesListModal && (
        <AssetNotesListModal
          activeMainTab={1}
          model_id={model_id}
          viewAssetNotesListModal={viewAssetNotesListModal}
          setViewAssetNotesListModal={setViewAssetNotesListModal}
          assetNotiableType="Step"
          assetNotiableTypeId={assetNotiableTypeId}
        />
      )}
    </>
  );
};
export default ProcedureDetails;
