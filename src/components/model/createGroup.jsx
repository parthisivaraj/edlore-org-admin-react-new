import { Fragment, useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import LinkFileModal from "../media/linkFileModal";
import { getAllSectionsNoPaginate } from "../../redux/reduxes/sections/sectionAction";
import {
  setManualsModal,
  resetManualsErrors,
} from "../../redux/reduxes/sketches/sketchesAction";

const CreateGroup = ({
  id,
  title,
  label,
  showGroupModal,
  model_id,
  sketch_type,
  addSketchAction,
}) => {
  const dispatch = useDispatch();

  // Fetch Data
  const sectionsList = useSelector(
    (state) => state.sections.sectionsListNoPage,
  );
  const addSketchesError = useSelector(
    (state) => state.sketches.addSketchesError,
  );

  // Stepper Segment
  const [groupModalSegment, setGroupModalSegment] = useState(0);
  const [resetIdOnCancel, setResetIdOnCancel] = useState(null);

  // States
  const [state, setState] = useState({
    sketch_title: "",
    map_section: "",

    errors: {
      sketch_title: "",
      map_section: "",
    },
  });

  // set errrors
  useEffect(() => {
    let errors = state.errors;
    if (addSketchesError.length > 0) {
      addSketchesError.forEach((error) => {
        switch (error.name) {
          case "title":
            errors.sketch_title = error.message;
            break;
          default:
            break;
        }
      });
      setGroupModalSegment(0);
    } else {
      errors.sketch_title = "";
    }

    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [addSketchesError]);

  // Dispatch Sections without Paginate and reset error on load
  useEffect(() => {
    if (model_id) {
      const sectionData = {
        id: model_id,
        search: "",
        anaglyph: false,
      };
      dispatch(getAllSectionsNoPaginate(sectionData));
      dispatch(resetManualsErrors());
    }
  }, [model_id]);

  // Validate Form
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  // First Segment Handle Change
  const handleChangeStepOne = (event) => {
    event.preventDefault();
    let errors = state.errors;
    const { name, value } = event.target;
    if (name == "sketch_title") {
      errors.sketch_title = "";
      setState((prevProps) => ({
        ...prevProps,
        sketch_title: value,
      }));
    }
    if (name == "map_section") {
      errors.map_section = "";
      setState((prevProps) => ({
        ...prevProps,
        map_section: value,
      }));
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
    dispatch(resetManualsErrors());
  };

  // First Segment Validation and Mapping
  const handleMappingSegment = (event) => {
    event.preventDefault();
    if (
      state.sketch_title != "" &&
      state.map_section != "" &&
      state.map_section != "selected"
    ) {
      setGroupModalSegment(1);
    } else {
      let errors = state.errors;
      if (
        state.sketch_title == "" ||
        state.sketch_title.replace(/\s+/g, "").length == 0
      ) {
        errors.sketch_title = "Enter Group Name";
      } else {
        errors.sketch_title = "";
      }
      if (state.map_section == "" || state.map_section == "selected") {
        errors.map_section = "Select a Section to Map";
      } else {
        errors.map_section = "";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  };

  // Submit Handler
  const submitHandler = (selectedIds) => {
    const fileArray = [];
    selectedIds.forEach((selectedId) => {
      fileArray.push({ active_storage_attachment_id: selectedId });
    });
    const data = {
      title: state.sketch_title.replace(/\s+/g, " ").trim(),
      sketch_type: sketch_type,
      attached_medias_attributes: fileArray,
      section_id: state.map_section,
      model_id: model_id,
    };
    dispatch(addSketchAction(data));
  };

  // Reset the values when Cancelling the Edit
  const onCancelTheEdit = () => {
    const data = {
      sketch_title: "",
      map_section: "",
    };
    setState((prevProps) => ({
      ...prevProps,
      sketch_title: "",
      map_section: "",

      errors: {
        sketch_title: "",
        map_section: "",
      },
    }));
    dispatch(setManualsModal(false));
    setResetIdOnCancel(null);
  };

  // Stop Modal from Closing
  const handleModalBackdrop = () => {};

  return (
    <Transition appear show={showGroupModal} as={Fragment}>
      <Dialog
        as="div"
        open={showGroupModal}
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
          {groupModalSegment === 0 ? (
            <Dialog.Panel className="w-[85%] lg:w-[65%] xl:w-[50%] 2xl:w-[35%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl p-8 xl:p-10 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center mb-8">
                Create New {title} Group
              </Dialog.Title>

              <form onSubmit={(e) => handleMappingSegment(e)}>
                <div className="mb-6">
                  <label htmlFor="sketch_title" className="text-sm font-medium">
                    <span className="capitalize whitespace-nowrap">
                      {label} Group
                    </span>
                    <span className="text-danger">*</span>
                    <span className="text-gray3 text-sm ml-1">
                      {" "}
                      (Please enter unique Group, Limit: 150 chars)
                    </span>
                  </label>
                  <br />
                  <input
                    type="text"
                    name="sketch_title"
                    id="sketch_title"
                    placeholder="Enter Group Name"
                    className="w-full text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100  border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                    onChange={(e) => handleChangeStepOne(e)}
                    maxLength={150}
                  />
                  <div className="text-danger mt-1 ml-1">
                    {state.errors.sketch_title}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="map_section" className="text-sm font-medium">
                    Map to Section<span className="text-danger">*</span>
                  </label>
                  <br />
                  <select
                    name="map_section"
                    id="map_section"
                    className="ed-form__select appearance-none relative w-full h-[50px] text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 capitalize border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                    onChange={(e) => handleChangeStepOne(e)}
                  >
                    <option value="selected" defaultValue>
                      Select
                    </option>
                    {sectionsList &&
                      sectionsList.length > 0 &&
                      sectionsList.map((section) => (
                        <option
                          selected={section.id == state.map_section}
                          value={section.id && section.id}
                        >
                          {section.title && section.title}
                        </option>
                      ))}
                  </select>
                  <div className="text-danger mt-1 ml-1">
                    {state.errors.map_section}
                  </div>
                </div>

                <div className="flex items-center justify-end mt-14">
                  <button
                    type="button"
                    onClick={(e) => onCancelTheEdit(e)}
                    className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-secondary text-white md:text-sm 2xl:text-base  font-medium border border-secondary rounded-full px-10 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                  >
                    Next
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          ) : groupModalSegment === 1 ? (
            <LinkFileModal
              submitCallBack={submitHandler}
              limit={48}
              model_id={model_id}
            />
          ) : null}
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
export default CreateGroup;
