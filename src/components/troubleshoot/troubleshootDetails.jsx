import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTroubleshootStep,
  deleteTroubleshoot,
  deleteTroubleshootStep,
  setToDefaultTroubleshootStep,
  troubleshootDetails,
  updateTroubleshoot,
  updateTroubleshootStepOrder,
  approveTroubleshootStep,
  getAllTroubleshoot,
  setTroubleshootModal,
} from "../../redux/reduxes/troubleshoot/troubleshootAction";
import CreateTroubleshoot from "./createTroubleshoot";
import DeleteModal from "../common/deleteModal";
import DeleteTroubleshootStep from "./deleteTroubleshootStep";
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

const TabItem = ({ step, tabClick, state, index, approveThisCause }) => {
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
      <div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <img
              src="../assets/icons/icon-stepper.svg"
              alt="icon-stepper"
              className="w-[12px] h-[18px] dark:invert"
            />
            <span className="ml-2 capitalize w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">
              {step.title}
            </span>
          </div>
          <div className="flex items-center">
            {/* <img onClick={() => deleteThisStep(step.id)} src="../assets/icons/icon-delete.svg" alt="icon-delete" className="mx-2 w-[15px] h-[15px]" /> */}
            <img
              src="../assets/icons/icon-arrow-right.svg"
              alt="icon-arrow-right"
              className="w-[10px] h-[15px] dark:invert"
            />
          </div>
        </div>

        <div className="w-full text-sm text-black3 text-opacity-50 dark:text-gray3 ml-5">
          Step Order {index + 1}
        </div>
        <div
          className={`mt-2 ml-5 text-xs font-medium uppercase ${
            step.approval_status == "waiting"
              ? "text-danger"
              : "text-secondary "
          }`}
        >
          {step.approval_status == "waiting" ? "Waiting..." : "Approved"}
        </div>
        {step.approval_status == "waiting" && (
          <div className="w-full mt-5">
            <div className="text-sm font-normal">Waiting for Approval</div>
            <div className="flex items-center mt-3">
              <button
                type="button"
                onClick={(e) => approveThisCause(false, step.id)}
                className="text-xs font-medium bg-transparent text-black2 dark:text-gray2 border border-black2 dark:border-gray2 rounded-full px-6 py-1 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all focus-visible:outline-none"
              >
                Deny
              </button>
              <button
                type="button"
                onClick={(e) => approveThisCause(true, step.id)}
                className="text-xs font-medium bg-secondary text-black border border-secondary rounded-full px-6 py-1 ml-4 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none"
              >
                Approve
              </button>
            </div>
          </div>
        )}
      </div>
    </Tab>
  );
};

const TroubleshootDetails = ({
  model_id,
  trouble_id,
  addNewTab,
  setShowTroubleshootModal,
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
  const troubleDetailsLoading = useSelector(
    (state) => state.troubleshoot.troubleshootDetailsLoading,
  );
  const troubleDetails = useSelector(
    (state) => state.troubleshoot.troubleshootDetails,
  );
  const troubleshootModal = useSelector(
    (state) => state.troubleshoot.troubleshootModal,
  );
  const sortByTroubleshootTitle = useSelector(
    (state) => state.sort.sortByTroubleshootTitle,
  );
  const sortByTroubleshootCreatedDate = useSelector(
    (state) => state.sort.sortByTroubleshootCreatedDate,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const deleteTroubleshootLoading = useSelector(
    (state) => state.troubleshoot.deleteTroubleshootLoading,
  );
  const addTroubleshootStepLoading = useSelector(
    (state) => state.troubleshoot.addTroubleshootStepLoading,
  );
  const updateTroubleshootStepLoading = useSelector(
    (state) => state.troubleshoot.updateTroubleshootStepLoading,
  );
  const deleteTroubleshootStepLoading = useSelector(
    (state) => state.troubleshoot.deleteTroubleshootStepLoading,
  );

  const [lastAction, setLastAction] = useState("initial");
  const [lastUpdatingStep, setLastUpdatingStep] = useState(null);

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
    troubleshootDetails: {},

    errors: {
      title: "",
      description: "",
    },
  });

  // Dispatch to Troubleshoot Details
  useEffect(() => {
    const data = {
      model_id: model_id,
      trouble_id: trouble_id,
    };
    dispatch(troubleshootDetails(data));
  }, []);

  // Set Loader
  // useEffect(() => {
  //   setState((prevProps) => ({
  //     ...prevProps,
  //     updatingStep: false,
  //   }));
  // }, [troubleDetails]);

  // Delete Troubleshoot
  const [deleteStep, setDeleteStep] = useState(false);
  const [deleteStepId, setDeleteStepId] = useState(null);
  const [deleteTroubleshootStepTitle, setDeleteTroubleshootStepTitle] =
    useState("");
  const [deleteTroubleshootModal, setDeleteTroubleshootModal] = useState(false);

  // Update Troubleshoot Name
  // const [updateTroubleshootModal, setUpdateTroubleshootModal] = useState(false);
  function setUpdateTroubleshootModal() {
    const data = {
      show: true,
      edit: true,
      id: troubleDetails.id,
      name: troubleDetails.title,
    };
    dispatch(setTroubleshootModal(data));
  }

  const [update, setUpdate] = useState(false);
  const [troubleshootId, setTroubleshootId] = useState(null);
  const updateTroubleshootEvent = (trouble_id) => {
    setUpdateTroubleshootModal(true);
    setUpdate(true);
    setTroubleshootId(trouble_id);
  };

  // Change Troubleshoot Steps
  function stepsChanged(stepDetails) {
    let stepFiles = [];
    stepDetails &&
      stepDetails.medias.forEach((attached) => {
        stepFiles.push(attached.active_storage_attachment_id);
      });
    setState((prevProps) => ({
      ...prevProps,
      stepOrder: stepDetails && stepDetails.step_order,
      title: stepDetails && stepDetails.title,
      description: stepDetails && stepDetails.description,
      attached_medias: stepDetails && stepDetails.medias,
      stepFiles: stepFiles,
      step_id: stepDetails && stepDetails.id,
      existingFiles: stepDetails && stepDetails.medias,
      selectedFilesIds: stepFiles,
      existingFilesIdsUnchanged: stepFiles,
    }));
  }

  // Update Troubleshoot Details
  useEffect(() => {
    if (lastAction == "initial" || lastAction == "delete") {
      troubleDetails &&
        troubleDetails.troubleshoot_steps &&
        troubleDetails.troubleshoot_steps.length > 0 &&
        stepsChanged(troubleDetails.troubleshoot_steps[0]);
    } else if (lastAction == "addStep") {
      troubleDetails &&
        troubleDetails.troubleshoot_steps &&
        troubleDetails.troubleshoot_steps.length > 0 &&
        stepsChanged(
          troubleDetails.troubleshoot_steps[
            troubleDetails.troubleshoot_steps.length - 1
          ],
        );
    } else if (lastAction == "update" || lastAction == "stepUpdate") {
      troubleDetails &&
        troubleDetails.troubleshoot_steps &&
        troubleDetails.troubleshoot_steps.length > 0 &&
        stepsChanged(
          ...(troubleDetails &&
            troubleDetails.troubleshoot_steps &&
            troubleDetails.troubleshoot_steps.length > 0 &&
            troubleDetails.troubleshoot_steps.filter(
              (data) => data.id == lastUpdatingStep,
            )),
        );
    } else {
      troubleDetails &&
        troubleDetails.troubleshoot_steps &&
        troubleDetails.troubleshoot_steps.length > 0 &&
        stepsChanged(troubleDetails.troubleshoot_steps[0]);
    }
    // troubleDetails.troubleshoot_steps && troubleDetails.troubleshoot_steps.length > 0 && stepsChanged(troubleDetails.troubleshoot_steps[0]);
    troubleDetails &&
      troubleDetails.troubleshoot_steps &&
      setState((prevProps) => ({
        ...prevProps,
        steps: troubleDetails && troubleDetails.troubleshoot_steps,
        updatingStep: false,
      }));
  }, [troubleDetails]);

  // Changing Step Tabs
  const [selectedStep, setSelectedStep] = useState(0);
  const stepTabChanged = (index) => {
    stepsChanged(state.steps && state.steps[index]);
    // setSelectedStep(index);
  };

  // Add New Troubleshoot Step
  const addNewStep = () => {
    setState((prevProps) => ({
      ...prevProps,
      updatingStep: true,
    }));
    let unNamed = [];
    troubleDetails &&
      troubleDetails.troubleshoot_steps &&
      troubleDetails.troubleshoot_steps.forEach((step) => {
        if (
          step.title.split(" ")[0] == "Cause" &&
          !isNaN(step.title.split(" ")[1])
        ) {
          unNamed.push(Number(step.title.split(" ")[1]));
        }
      });
    unNamed = unNamed.sort(function (a, b) {
      return a - b;
    });
    const data = {
      model_id: model_id,
      trouble_id: troubleDetails && troubleDetails.id,
      name: troubleDetails && troubleDetails.title.replace(/\s+/g, " ").trim(),
      steps_attributes: [
        {
          title:
            unNamed.length > 0
              ? "Cause " + Number(unNamed[unNamed.length - 1] + 1)
              : "Cause 1",
          description: "Enter Description",
          step_order:
            troubleDetails &&
            troubleDetails.troubleshoot_steps &&
            troubleDetails.troubleshoot_steps[
              troubleDetails.troubleshoot_steps.length - 1
            ].step_order + 1,
          attached_medias_attributes: [],
        },
      ],
    };
    dispatch(addTroubleshootStep(data));
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
    if (state.title == "" || state.description == "") {
      valid = false;
    }
    return valid;
  };

  // Update Media Handler
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
          state.existingFiles.forEach((x) => {
            if (id == x.active_storage_attachment_id) {
              media_attributes.push({ id: x.id, _destroy: true });
            }
            return true;
          });
        });

      const data = {
        trouble_id: troubleDetails && troubleDetails.id,
        model_id: model_id,
        name: troubleDetails && troubleDetails.title,
        steps_attributes: [
          {
            id: state.step_id,
            title: state.title.replace(/\s+/g, " ").trim(),
            description: state.description,
            step_order: state.step,
            attached_medias_attributes: media_attributes,
          },
        ],
      };
      // dispatch(updateTroubleshootStep(data));
      dispatch(updateTroubleshoot(data));
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
    setDeleteTroubleshootStepTitle(title);
    setDeleteStep(true);
    // troubleDetails && troubleDetails.troubleshoot_steps && troubleDetails.troubleshoot_steps.length > 0
    setLastAction("delete");
    // if (troubleDetails && troubleDetails.troubleshoot_steps && troubleDetails.troubleshoot_steps.length > 0 && troubleDetails.troubleshoot_steps[0].id == stp_id) {
    //   stepsChanged(troubleDetails && troubleDetails.troubleshoot_steps && troubleDetails.troubleshoot_steps.length > 0 && troubleDetails.troubleshoot_steps[1]);
    //   setLastUpdatingStep(troubleDetails && troubleDetails.troubleshoot_steps && troubleDetails.troubleshoot_steps.length > 0 && troubleDetails.troubleshoot_steps[1].id);
    // }
    // else {
    //   stepsChanged(troubleDetails && troubleDetails.troubleshoot_steps && troubleDetails.troubleshoot_steps.length > 0 && troubleDetails.troubleshoot_steps[0]);
    //   setLastUpdatingStep(troubleDetails && troubleDetails.troubleshoot_steps && troubleDetails.troubleshoot_steps.length > 0 && troubleDetails.troubleshoot_steps[0].id);
    // }
  };

  // Close the First Modal
  const closeModal = () => {
    const data = {
      search: "",
      page: 0,
      limit: 10,
      model_id: model_id,
      sort:
        sortByTroubleshootTitle != 0
          ? sortByTroubleshootTitle
          : sortByTroubleshootCreatedDate != 0
          ? sortByTroubleshootCreatedDate
          : 0,
      sorting:
        sortByTroubleshootTitle != 0
          ? "title"
          : sortByTroubleshootCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllTroubleshoot(data));
    dispatch(setToDefaultTroubleshootStep());
    setShowTroubleshootModal(false);
  };

  const handleDrop = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      let errors = state.errors;
      errors.title = "";
      errors.description = "";

      const oldIndex = state.steps.findIndex((x) => x.id === active.id);
      const newIndex = state.steps.findIndex((x) => x.id === over.id);
      const newItems = arrayMove(state.steps, oldIndex, newIndex);

      setState((prevProps) => ({
        ...prevProps,
        steps: newItems,
        errors,
      }));
      const steps_attributes = [];
      newItems.forEach((step, index) => {
        steps_attributes.push({
          step_order: index + 1,
          id: step.id,
        });
      });

      const updatedData = {
        model_id: model_id,
        trouble_id: trouble_id,
        name: troubleDetails && troubleDetails.name,
        steps_attributes: steps_attributes,
      };
      dispatch(updateTroubleshootStepOrder(updatedData));
      setLastAction("stepUpdate");
      setLastUpdatingStep(state.step_id);
    }
  };

  // Update the Selected Medias
  const updateTheSelected = (m) => {
    setState((prevProps) => ({
      ...prevProps,
      selectedFilesIds: m,
    }));
  };

  // Cause Approval
  const approveThisCause = (status, theId) => {
    const data = {
      trouble_shoot_cause_id: theId,
      approval_status: status ? 2 : 3,
      model_id: model_id,
      trouble_id: trouble_id,
    };
    dispatch(approveTroubleshootStep(data));
  };

  // Tab Change
  const tabClick = (e) => {
    stepsChanged(e);
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
        <Tab.List className="flex flex-col items-start w-[35%] xl:w-[25%] 2xl:w-[20%] h-[85vh] 2xl:h-[90vh] relative z-20 bg-white dark:bg-darkMainBg p-4 border-r border-gray4 dark:border-opacity-10 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-darkBg scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
          <div className="w-full py-4 px-4 xl:px-2 mb-2">
            <div className="text-sm text-gray3 font-medium mb-1">
              Troubleshoot Title:
            </div>
            <div className="flex items-start justify-between mb-2">
              <h6 className="dark:text-gray2 text-base font-medium capitalize leading-snug w-[250px] break-all text-ellipsis line-clamp-2">
                {troubleDetailsLoading ? (
                  <Skeleton
                    width={180}
                    height={20}
                    className="dark:bg-darkMainBg"
                  />
                ) : (
                  troubleDetails.title
                )}
              </h6>

              {(permissions.includes("all_troubleshoot") ||
                permissions.includes("update_troubleshoot") ||
                permissions.includes("Admin")) && (
                <button
                  type="button"
                  onClick={() => updateTroubleshootEvent(troubleDetails.id)}
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

            {(permissions.includes("all_troubleshoot") ||
              permissions.includes("delete_troubleshoot") ||
              permissions.includes("Admin")) && (
              <button
                type="button"
                onClick={() => setDeleteTroubleshootModal(true)}
                className="text-sm font-medium text-danger text-opacity-75 underline transition-all hover:text-opacity-100 hover:transition-all"
              >
                Delete Troubleshoot
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
                  approveThisCause={approveThisCause}
                  key={step.id}
                />
              ))}
            </SortableContext>
          </DndContext>

          <div className="flex justify-between fixed left-0 bottom-0 z-10 w-[35%] xl:w-[25%] 2xl:w-[20%]  bg-white dark:bg-darkMainBg border-r border-gray4 dark:border-opacity-10 overflow-hidden px-4 py-6 rounded-bl-2xl">
            <button
              type="button"
              onClick={() => closeModal()}
              className="w-full xl:w-auto bg-white dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base  border border-black2 dark:border-gray2 text-base font-medium rounded-full shadow-sm px-4 2xl:px-8 py-2 mr-3 transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
            >
              Close
            </button>

            {(permissions.includes("all_troubleshoot") ||
              permissions.includes("update_troubleshoot") ||
              permissions.includes("Admin")) && (
              <button
                type="button"
                disabled={state.updatingStep || addTroubleshootStepLoading}
                onClick={() => addNewStep()}
                className={`${
                  addTroubleshootStepLoading
                    ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                    : ""
                } w-full xl:w-auto bg-primary text-white text-sm font-medium border border-primary rounded-full px-4 2xl:px-8 py-2 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
              >
                {addTroubleshootStepLoading ? "Adding..." : addNewTab}
              </button>
            )}
          </div>
        </Tab.List>

        <Tab.Panels
          selectedIndex={state.step_id}
          className="w-[65%] xl:w-[75%] 2xl:w-[80%] p-4 xl:p-10 bg-gray4 dark:bg-darkBg dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl"
        >
          {troubleDetailsLoading ? (
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
              {troubleDetails.troubleshoot_steps &&
                troubleDetails.troubleshoot_steps.length > 0 &&
                troubleDetails.troubleshoot_steps.map((data, index) => (
                  <Tab.Panel key={index} className="relative">
                    <div className="mb-20">
                      <form>
                        <div className="mb-4">
                          <label
                            htmlFor="troubleshoot_cause"
                            className="font-medium"
                          >
                            Cause <span className="text-danger">*</span>
                          </label>{" "}
                          <br />
                          <input
                            type="text"
                            id="troubleshoot_cause"
                            name="title"
                            placeholder="Cause"
                            className="w-full bg-white dark:bg-darkBg text-black2 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                            value={state.title}
                            onChange={(e) => onChangeHandler(e)}
                          />
                          <div className="text-danger mt-1 ml-1">
                            {state.errors.title}
                          </div>
                        </div>

                        <RTEEditor
                          value={state.description}
                          error={state.errors.description}
                          label="Solution"
                          onChange={changeHandler}
                        />

                        {state.step_id && (
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
                            type="troubleshoot_step"
                            typeId={state.step_id}
                          />
                        )}
                      </form>
                    </div>

                    <div className="flex items-center justify-between fixed left-[35%] xl:left-[25%] 2xl:left-[20%] bottom-0 right-0 z-[5] bg-white dark:bg-darkMainBg w-[65%] xl:w-[75%] 2xl:w-[80%] py-6 px-4 2xl:px-10 rounded-br-2xl shadow-[20px_-15px_40px_-16px_rgba(229,229,229,0.2)] dark:shadow-[20px_-15px_40px_-16px_rgba(0,0,0,0.2)]">
                      <button
                        type="button"
                        onClick={() => assetNotesListEvent(true, state.step_id)}
                        className="w-auto bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration focus:outline-0 focus-visible:outline-0"
                      >
                        Notes
                      </button>

                      {(permissions.includes("all_troubleshoot") ||
                        permissions.includes("update_troubleshoot") ||
                        permissions.includes("Admin")) && (
                        <div className="ml-auto">
                          {state.steps.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                deleteThisStep(state.step_id, state.title)
                              }
                              className="bg-transparent text-black2 dark:text-gray2 border border-black2 dark:border-gray2 md:text-sm ml-5 2xl:text-base font-medium rounded-full shadow-sm px-6 py-2 max-w-[150px] xl:max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                            >
                              Delete {state.title}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={(e) => updateHandler(e)}
                            disabled={updateTroubleshootStepLoading}
                            className={`${
                              updateTroubleshootStepLoading
                                ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                                : ""
                            } bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full py-2 px-6 ml-5 max-w-[150px] xl:max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                          >
                            {updateTroubleshootStepLoading
                              ? "Updating..."
                              : `Update ${state.title}`}
                          </button>
                        </div>
                      )}
                    </div>
                  </Tab.Panel>
                ))}
            </>
          )}
        </Tab.Panels>
      </Tab.Group>

      {/* Update Written Issue */}
      {troubleshootModal && (
        <CreateTroubleshoot
          showTroubleshootModal={troubleshootModal}
          // setShowTroubleshootModal={setUpdateTroubleshootModal}
          model_id={model_id}
          // trouble_id={troubleDetails.id}
          // update={true}
          // troubleshootTitle={troubleDetails.title}
        />
      )}

      {/* Delete Written Issue Modal */}
      {deleteTroubleshootModal && (
        <DeleteModal
          head="Remove Troubleshoot"
          body={[
            "Are you sure you want to remove",
            <strong className="capitalize break-all">
              {" "}
              "{troubleDetails && troubleDetails.title}"{" "}
            </strong>,
            "Troubleshoot from the list?",
          ]}
          deleteAction={deleteTroubleshoot}
          modalAction={setDeleteTroubleshootModal}
          modalValue={deleteTroubleshootModal}
          parentmodel={true}
          closeParentPopup={closeModal}
          model_id={model_id}
          trouble_id={troubleDetails.id}
          deleteLoading={deleteTroubleshootLoading}
        />
      )}

      {/* Delete Written Issue Step */}
      {deleteTroubleshootStep && (
        <DeleteTroubleshootStep
          head="Remove Troubleshoot Step"
          body={[
            "Are you sure you want to remove",
            <strong className="capitalize break-all">
              {" "}
              "{deleteTroubleshootStepTitle}"{" "}
            </strong>,
            "step from the list?",
          ]}
          deleteAction={deleteTroubleshootStep}
          modalAction={setDeleteStep}
          modalValue={deleteStep}
          step_id={deleteStepId}
          model_id={model_id}
          trouble_id={troubleDetails.id}
          deleteLoading={deleteTroubleshootStepLoading}
        />
      )}
      {viewAssetNotesListModal && (
        <AssetNotesListModal
          activeMainTab={1}
          model_id={model_id}
          viewAssetNotesListModal={viewAssetNotesListModal}
          setViewAssetNotesListModal={setViewAssetNotesListModal}
          assetNotiableType="TroubleshootStep"
          assetNotiableTypeId={assetNotiableTypeId}
        />
      )}
    </>
  );
};
export default TroubleshootDetails;
