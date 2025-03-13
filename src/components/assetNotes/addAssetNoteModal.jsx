import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import LinkMedia from "../common/linkMediaNew";
import {
  addAssetNote,
  getAssetNoteDetails,
  setAssetNotesModal,
  updateAssetNote,
} from "../../redux/reduxes/assetNotes/actions";
import { RTEEditor } from "../common/editor";

const AddAssetNoteModal = ({
  showAssetNotesModal,
  update,
  model_id,
  assetNotiableType,
  assetNotiableTypeId,
  assetNoteId,
  setAssetNoteId,
}) => {
  const dispatch = useDispatch();

  // Fetch Data
  const addAssetNoteLoading = useSelector(
    (state) => state.asset_notes.addAssetNoteLoading,
  );
  const addAssetNoteError = useSelector(
    (state) => state.asset_notes.addAssetNoteError,
  );
  const assetNoteDetails = useSelector(
    (state) => state.asset_notes.assetNoteDetails,
  );
  const updateAssetNoteLoading = useSelector(
    (state) => state.anaglyph.updateAssetNoteLoading,
  );

  // States
  const [state, setState] = useState({
    title: "",
    description: "",
    selectedFilesIds: [],
    existingFilesIdsUnchanged: [],
    existingFiles: [],

    errors: {
      title: "",
      description: "",
    },
  });

  // Dispatch to Duplicate Errors
  useEffect(() => {
    let errors = state.errors;
    if (addAssetNoteError.length > 0) {
      addAssetNoteError.forEach((error) => {
        if (error.title == "title") {
          errors.title = error.message;
        }
        if (error.description == "description") {
          errors.description = error.message;
        }
      });
    } else {
      errors.title = "";
      errors.description = "";
    }
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
    }));
  }, [addAssetNoteError]);

  // Get Note Details
  useEffect(() => {
    if (update) {
      const data = {
        id: assetNoteId && assetNoteId,
      };
      dispatch(getAssetNoteDetails(data));
    }
  }, []);

  // Update Note
  useEffect(() => {
    const stepFiles =
      assetNoteDetails.attached_medias ||
      [].map((x) => x.active_storage_attachment_id);

    if (update) {
      assetNoteDetails &&
        assetNoteDetails.title &&
        setState((prevProps) => ({
          ...prevProps,
          title: assetNoteDetails.title,
          description: assetNoteDetails.description,
          existingFiles: assetNoteDetails.attached_medias,
          selectedFilesIds: stepFiles,
          existingFilesIdsUnchanged: stepFiles,
        }));
    } else {
      setState((prevProps) => ({
        ...prevProps,
        title: "",
        description: "",
      }));
    }
  }, [assetNoteDetails]);

  // Change Handler
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case "title":
        errors.title =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Enter Title"
            : value.length > 150
            ? "Title shouldn't exceed more than 150 characters"
            : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
      [name]: value,
    }));
  };

  // Change Handler
  const onEditorChangeHandler = (event, editor) => {
    let errors = state.errors;
    if (event == "") {
      errors.description = "Description shouldn't be empty";
    } else {
      errors.description = "";
    }

    setState((prevProps) => ({
      ...prevProps,
      description: event,
      errors,
    }));
  };

  // Validate Form
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (val = false));
    if (
      state.title.replace(/\s+/g, "") == "" ||
      state.title.length > 150 ||
      state.description === "" ||
      state.description.replace(/\s+/g, "").length == 0
    )
      valid = false;
    return valid;
  };

  // Form Submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
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

    if (validateForm(state.errors)) {
      const data = {
        id: assetNoteId,
        asset_notiable_type: assetNotiableType,
        asset_notiable_id: assetNotiableTypeId,
        title: state.title.replace(/\s+/g, " ").trim(),
        description: state.description.replace(/\s+/g, " ").trim(),
        attached_medias_attributes: media_attributes,
      };
      if (update) {
        dispatch(updateAssetNote(data));
      } else {
        dispatch(addAssetNote(data));
      }
      dispatch(setAssetNotesModal(false));
    } else {
      let errors = state.errors;
      if (state.title.replace(/\s+/g, "") === "") {
        errors.title = "Enter Title";
      }
      if (state.description.replace(/\s+/g, "") === "") {
        errors.description = "Enter Note description";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Update the selected Media
  const updateTheSelected = (m) => {
    setState((prevProps) => ({
      ...prevProps,
      selectedFilesIds: m,
    }));
  };

  // Reset the Form on Closing the Modal
  const onCancelTheEdit = () => {
    const data = {
      title: "",
      description: "",
    };
    setState((prevProps) => ({
      ...prevProps,
      title: "",
      description: "",

      errors: {
        title: "",
        description: "",
      },
    }));
    if (setAssetNoteId) {
      setAssetNoteId(null);
      dispatch(getAssetNoteDetails(data));
    }
    dispatch(setAssetNotesModal(false));
  };

  // Backdrop that stops from Closing Modal
  const handleBackdropModal = () => {};

  console.log(state, "state");

  return (
    <>
      <Transition appear show={showAssetNotesModal} as={Fragment}>
        <Dialog
          as="div"
          open={showAssetNotesModal}
          onClose={() => handleBackdropModal()}
          className="fixed inset-0 z-50 py-10 2xl:py-20 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60"
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
            <Dialog.Panel className="w-[90%] xl:w-[70%] 2xl:w-[60%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl py-10 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center dark:text-gray2 mb-8">
                {update ? "Update" : "Add New"} Note
              </Dialog.Title>
              <div className="h-full xl:h-[600px] 2xl:h-[700px] px-10 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg  scrollbar-track-white dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <div className="mb-5">
                    <label htmlFor="title" className="font-medium">
                      Title: <span className="text-danger">*</span>
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
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
                    onChange={onEditorChangeHandler}
                  />

                  <div className="mb-20">
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
                      type="asset_notes"
                      typeId={assetNoteId}
                    />
                  </div>

                  <div className="fixed right-[0] bottom-[0] z-[30] w-full bg-gray4 dark:bg-darkBg px-8 py-8 flex items-center justify-end mt-16 xl:mt-5 rounded-b-3xl">
                    <button
                      type="button"
                      onClick={(e) => onCancelTheEdit(e)}
                      className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={addAssetNoteLoading || updateAssetNoteLoading}
                      className={`${
                        addAssetNoteLoading || updateAssetNoteLoading
                          ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                          : ""
                      } bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none`}
                    >
                      {update
                        ? updateAssetNoteLoading
                          ? "Updating..."
                          : "Update Note"
                        : addAssetNoteLoading
                        ? "Adding..."
                        : "Add Note"}
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
export default AddAssetNoteModal;
