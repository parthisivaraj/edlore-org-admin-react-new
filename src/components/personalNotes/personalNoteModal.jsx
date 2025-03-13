import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPersonalNote,
  getPersonalNoteDetails,
  setPersonalNotesModal,
  updatePersonalNote,
} from "../../redux/reduxes/personalNotes/personalNotesActions";
import LinkMedia from "../common/linkMediaNew";
import { RTEEditor } from "../common/editor";

const PersonalNoteModal = ({
  showPersonalNotesModal,
  update,
  setUpdate,
  personalNoteId,
  setPersonalNoteId,
}) => {
  const dispatch = useDispatch();

  // Fetch Data
  const personalNoteDetails = useSelector(
    (state) => state.notes.personalNoteDetails,
  );
  const createPersonalNoteLoading = useSelector(
    (state) => state.notes.createPersonalNoteLoading,
  );
  const createPersonalNoteError = useSelector(
    (state) => state.notes.createPersonalNoteError,
  );
  const updatePersonalNoteLoading = useSelector(
    (state) => state.notes.updatePersonalNoteLoading,
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
    if (createPersonalNoteError.length > 0) {
      createPersonalNoteError.forEach((error) => {
        if (error.title == "title") {
          errors.title = error.message;
        }
      });
    } else {
      errors.title = "";
    }
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
    }));
  }, [createPersonalNoteError]);

  // Dispatch to Personal Note Details
  useEffect(() => {
    if (personalNoteId) {
      const data = {
        id: personalNoteId,
      };
      dispatch(getPersonalNoteDetails(data));
    }
  }, [personalNoteId]);

  // Update Personal Note
  useEffect(() => {
    let stepFiles = [];
    personalNoteDetails.attached_medias &&
      personalNoteDetails.attached_medias.length > 0 &&
      personalNoteDetails.attached_medias.forEach((attached, index) => {
        stepFiles.push(attached.active_storage_attachment_id);
      });
    if (update) {
      personalNoteDetails &&
        personalNoteDetails.title &&
        setState((prevProps) => ({
          ...prevProps,
          title: personalNoteDetails.title,
          description: personalNoteDetails.description,
          existingFiles: personalNoteDetails.medias,
          selectedFilesIds: stepFiles,
          existingFilesIdsUnchanged: stepFiles,
        }));
    }
  }, [personalNoteDetails]);

  // Valid Form
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
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
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case "title":
        errors.title =
          value === "" || value.replace(/\s+/g, "").length == 0
            ? "Enter Note Title"
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

  // Change Handler for Description
  const changeEditorHandler = (event, editor) => {
    let errors = state.errors;
    errors.description = "";
    setState((prevProps) => ({
      ...prevProps,
      description: event,
      errors,
    }));
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
      const postData = {
        id: personalNoteId && personalNoteId,
        title: state.title.replace(/\s+/g, " ").trim(),
        description: state.description,
        attached_medias_attributes: media_attributes,
      };
      if (update) {
        dispatch(updatePersonalNote(postData));
      } else {
        dispatch(createPersonalNote(postData));
      }
    } else {
      let errors = state.errors;
      if (state.title == "") {
        errors.title = "Enter Note Title";
      }
      if (state.description == "") {
        errors.description = "Enter Note Description";
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

  // Reset the Form On Closing Modal
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
    setPersonalNoteId(null);
    dispatch(getPersonalNoteDetails(data));
    dispatch(setPersonalNotesModal(false));
  };

  // Backdrop that Stops from Closing Modal
  const handleBackdropModal = () => {};

  return (
    <>
      <Transition appear show={showPersonalNotesModal} as={Fragment}>
        <Dialog
          as="div"
          open={showPersonalNotesModal}
          onClose={() => handleBackdropModal(false)}
          className="fixed inset-0 z-50 py-20 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60"
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
            <Dialog.Panel className="relative w-[96%] lg:w-[80%] xl:w-[65%] 2xl:w-[50%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl py-10 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center mb-8">
                {update ? "Update" : "Add New"} Personal Note
              </Dialog.Title>

              <form onSubmit={(e) => handleFormSubmit(e)}>
                <div className="relative w-full h-[650px] px-8 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl h-[80vh]">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-start-1 col-span-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        <span className="whitespace-nowrap capitalize">
                          Title
                        </span>
                        <span className="text-danger">*</span>
                        <span className="text-gray3 text-sm ml-1">
                          {" "}
                          (Please enter unique Title, Limit: 150 chars)
                        </span>
                      </label>
                      <br />
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter Note Title"
                        value={state.title}
                        onChange={(e) => onChangeHandler(e)}
                        className="w-full text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
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
                      onChange={changeEditorHandler}
                    />
                  </div>

                  <div className="mb-20">
                    <LinkMedia
                      model_id=""
                      existingFiles={state.existingFiles}
                      selectedFilesIds={state.selectedFilesIds}
                      existingFilesIdsUnchanged={
                        state.existingFilesIdsUnchanged
                      }
                      updateTheSelected={updateTheSelected}
                      limit={48}
                      showOnly="all"
                      type="note"
                      typeId={personalNoteId}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end fixed bottom-0 right-0 w-full bg-gray4 dark:bg-darkBg py-8 px-8 mt-10 rounded-b-3xl">
                  <button
                    type="button"
                    onClick={(e) => onCancelTheEdit(e)}
                    className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      createPersonalNoteLoading || updatePersonalNoteLoading
                    }
                    className={`${
                      createPersonalNoteLoading || updatePersonalNoteLoading
                        ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                        : ""
                    } text-sm 2xl:text-base  font-medium bg-secondary text-white border border-secondary rounded-full px-8 py-2 ml-4 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                  >
                    {update
                      ? updatePersonalNoteLoading
                        ? "Updating..."
                        : "Update Note"
                      : createPersonalNoteLoading
                      ? "Adding..."
                      : "Add Note"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
export default PersonalNoteModal;
