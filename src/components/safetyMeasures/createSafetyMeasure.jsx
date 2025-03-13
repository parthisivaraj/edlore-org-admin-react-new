import React, { useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  addSafetyMeasure,
  safetyMeasuresDetails,
  updateSafetyMeasure,
  setSafetyMeasuresModal,
  resetSafetyMeasuresErrors,
  setUpdating,
} from "../../redux/reduxes/safetyMeasures/safetyMeasuresAction";
import LinkMedia from "../common/linkMediaNew";
import { RTEEditor } from "../common/editor";

const CreateSafetyMeasure = ({ model_id, id }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const measureDetails = useSelector(
    (state) => state.safety_measures.safetyMeasuresDetails,
  );
  const addSafetyMeasureLoading = useSelector(
    (state) => state.safety_measures.addSafetyMeasureLoading,
  );
  const addSafetyMeasureError = useSelector(
    (state) => state.safety_measures.addSafetyMeasureError,
  );
  const safetyMeasuresModal = useSelector(
    (state) => state.safety_measures.safetyMeasuresModal,
  );
  const cloning = useSelector((state) => state.safety_measures.cloning);
  const updateSafetyMeasureLoading = useSelector(
    (state) => state.safety_measures.updateSafetyMeasureLoading,
  );
  const updating = useSelector((state) => state.safety_measures.updating);

  // Dispatch to All Medias
  useEffect(() => {
    const detailsData = {
      model_id: model_id,
      id: id,
      limit: 10,
    };
    dispatch(safetyMeasuresDetails(detailsData));
    dispatch(resetSafetyMeasuresErrors());
  }, []);

  const [state, setState] = useState({
    title: "",
    description: "",
    enabled: false,
    selectedFilesIds: [],
    existingFilesIdsUnchanged: [],
    existingFiles: [],
    errors: {
      title: "",
      description: "",
    },
  });

  // set errrors
  useEffect(() => {
    let errors = state.errors;
    if (addSafetyMeasureError.length > 0) {
      addSafetyMeasureError.forEach((error) => {
        switch (error.name) {
          case "title":
            errors.title = error.message;
            break;
          default:
            break;
        }
      });
    } else {
      errors.title = "";
    }

    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [addSafetyMeasureError]);

  // Update a Section
  useEffect(() => {
    if (updating || cloning) {
      let medias = [];
      measureDetails.attached_medias &&
        measureDetails.attached_medias.forEach((attached, index) => {
          medias.push(attached.active_storage_attachment_id);
        });
      measureDetails &&
        measureDetails.title &&
        setState((prevProps) => ({
          ...prevProps,
          title: measureDetails.title,
          description: measureDetails.description,
          selectedFilesIds: medias,
          existingFilesIdsUnchanged: medias,
          existingFiles:
            measureDetails.attached_medias.length > 0 &&
            measureDetails.attached_medias,
        }));
    } else {
      let errors = state.errors;
      errors.title = "";
      errors.description = "";
      setState((prevProps) => ({
        ...prevProps,
        errors,
        title: "",
        description: "",
        enabled: false,
      }));
    }
    if (measureDetails.enabled == "enabled") {
      setState((prevProps) => ({
        ...prevProps,
        enabled: true,
      }));
    }
  }, [measureDetails]);

  // Form Validation
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (val = false));
    if (
      state.title == "" ||
      state.title.length > 150 ||
      state.description == ""
    )
      valid = false;
    return valid;
  };

  // Change Handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case "title":
        errors.title =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Enter Safety Measure Title"
            : value.length > 150
            ? "Title shouldn't exceed more than 150 characters"
            : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }));
    dispatch(resetSafetyMeasuresErrors());
  };

  // Change Handler for Description
  const editorChangeHandler = (value, id) => {
    let errors = state.errors;
    if (value.length <= 0) {
      errors.description = "Enter Safety Measure Description";
    } else {
      errors.description = "";
    }
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
      description: value,
    }));
  };

  // Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate(state.errors)) {
      let media_attributes = [];
      let clone_media_attributes = [];
      state.selectedFilesIds.forEach((theId) => {
        clone_media_attributes.push({ active_storage_attachment_id: theId });
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
        id: id,
        model_id: model_id,
        title: state.title.replace(/\s+/g, " ").trim(),
        description: state.description.replace(/\s+/g, " ").trim(),
        attached_medias_attributes: media_attributes,
        enabled: state.enabled == true ? 1 : 2,
      };
      const cloneData = {
        id: id,
        model_id: model_id,
        title: state.title.replace(/\s+/g, " ").trim(),
        description: state.description.replace(/\s+/g, " ").trim(),
        attached_medias_attributes: clone_media_attributes,
        enabled: state.enabled == true ? 1 : 2,
      };

      if (updating && !cloning) {
        dispatch(updateSafetyMeasure(data));
      } else {
        dispatch(addSafetyMeasure(cloneData));
      }
      // setAddSafetyMeasuresModal(false);
    } else {
      let errors = state.errors;
      if (state.title === "") {
        errors.title = "Enter Safety Measure Title";
      }
      if (state.description === "") {
        errors.description = "Enter Safety Measure Description";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Status Change Handler
  const statusChangeHandler = (event) => {
    if (event.target.checked) {
      setState((prevProps) => ({
        ...prevProps,
        enabled: true,
      }));
    } else {
      setState((prevProps) => ({
        ...prevProps,
        enabled: false,
      }));
    }
  };

  // Backdrop that stops closing Modal
  const handleModalBackdrop = () => {};

  // Update the Selected Medias
  const updateTheSelected = (m) => {
    setState((prevProps) => ({
      ...prevProps,
      selectedFilesIds: m,
    }));
  };

  // Close Modal
  function closeModal() {
    let errors = state.errors;
    errors.title = "";
    errors.description = "";
    setState((prevProps) => ({
      ...prevProps,
      errors,
      title: "",
      description: "",
      enabled: false,
    }));
    dispatch(setSafetyMeasuresModal(false));
    dispatch(setUpdating(false));
  }

  return (
    <>
      <Transition appear show={safetyMeasuresModal} as={Fragment}>
        <Dialog
          as="div"
          open={safetyMeasuresModal}
          onClose={() => handleModalBackdrop(false)}
          className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-30"
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
            <Dialog.Panel className="w-[96%] xl:w-[70%] 2xl:w-[50%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl  shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl  font-bold text-center pt-10 mb-10">
                {updating && !cloning ? "Update" : "Create New"} Safety Measure
              </Dialog.Title>

              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="w-full h-[450px] 2xl:h-[550px] pb-10 px-10 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <div className="mb-4">
                    <label htmlFor="title" className="font-medium">
                      <span className="whitespace-nowrap">Title</span>
                      <span className="text-danger">*</span>
                      <span className="text-gray3 text-sm ml-1">
                        {" "}
                        (Please enter unique Title, Limit: 150 chars)
                      </span>
                    </label>
                    <br />
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Safety Measure Title"
                      className="w-full bg-white dark:bg-darkBg text-black2 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                      value={state.title}
                      onChange={(e) => onChangeHandler(e)}
                      maxLength={150}
                    />
                    <div className="text-danger mt-1 ml-1">
                      {state.errors.title}
                    </div>
                  </div>

                  <RTEEditor
                    value={state.description}
                    error={state.errors.description}
                    label="Description"
                    onChange={editorChangeHandler}
                  />

                  <LinkMedia
                    model_id={model_id}
                    existingFiles={state.existingFiles}
                    selectedFilesIds={state.selectedFilesIds}
                    existingFilesIdsUnchanged={state.existingFilesIdsUnchanged}
                    updateTheSelected={updateTheSelected}
                    limit={48}
                    showOnly="all"
                    type="safety_measure"
                    typeId={id}
                  />
                </div>

                <div className="flex items-center my-8 px-10">
                  {updating && (
                    <div>
                      <label
                        htmlFor="written_issues"
                        className="flex items-center cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          id="written_issues"
                          name="written_issues"
                          className="w-4 h-4"
                          checked={state.enabled}
                          onChange={(e) => statusChangeHandler(e)}
                        />
                        <span className="text-sm font-medium capitalize select-none ml-2">
                          Enabled
                        </span>
                      </label>
                    </div>
                  )}

                  <div className="ml-auto">
                    <button
                      type="button"
                      onClick={() => closeModal(false)}
                      className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={
                        addSafetyMeasureLoading || updateSafetyMeasureLoading
                      }
                      className={`${
                        addSafetyMeasureLoading || updateSafetyMeasureLoading
                          ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                          : ""
                      } bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-10 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                    >
                      {updating
                        ? updateSafetyMeasureLoading
                          ? "Updating..."
                          : "Update"
                        : addSafetyMeasureLoading
                        ? "Adding..."
                        : "Add"}
                    </button>
                  </div>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
export default CreateSafetyMeasure;
