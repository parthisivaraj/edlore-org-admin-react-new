import { Fragment, useState, useEffect } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { drawingDetails, updateDrawing, resetManualsErrors, setUpdateGroupModal } from "../../redux/reduxes/sketches/sketchesAction";
import LinkMedia from "../common/linkMediaNew";
import { getAllSectionsNoPaginate } from "../../redux/reduxes/sections/sectionAction";

const UpdateDrawing = ({ updateDrawingModal, drawing_id, model_id, section_id }) => {
  const dispatch = useDispatch();

  // Fetch Auth Data
  const addSketchesError = useSelector(state => state.sketches.addSketchesError);
  const updateDrawingLoading = useSelector(state => state.sketches.updateDrawingLoading);

  // States
  const [state, setState] = useState({
    title: "",
    selectedMedias: [],
    section: section_id,
    sketch_type: 2,
    selectedFilesIds: [],
    existingFilesIdsUnchanged: [],
    existingFiles: [],
    errors: {
      title: "",
      section: "",
    }
  });

  // set errrors
  useEffect(() => {
    let errors = state.errors;
    if (addSketchesError.length > 0) {
      addSketchesError.forEach(error => {
        switch (error.name) {
          case 'title':
            errors.title = error.message;
            break;
          default:
            break;
        }
      })
    } else {
      errors.title = "";
    }

    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, [addSketchesError]);

  // Dispatch to Medias and Drawing Details
  useEffect(() => {
    const drawingData = {
      id: drawing_id,
      model_id: model_id,
      section_id: section_id,
      limit: 10,
    }
    const sectionData = {
      id: model_id,
      search: "",
      anaglyph: false,
    }
    dispatch(getAllSectionsNoPaginate(sectionData));
    dispatch(drawingDetails(drawingData));
    dispatch(resetManualsErrors());
  }, []);

  // Fetch Data
  const sketchDetails = useSelector(state => state.sketches.drawingDetails);
  const sectionsList = useSelector(state => state.sections.sectionsListNoPage);

  // Update Drawing Details
  useEffect(() => {
    const selectedFiles = [];
    sketchDetails.attached_medias && sketchDetails.attached_medias.length > 0 && sketchDetails.attached_medias.forEach(a => {
      selectedFiles.push(a.active_storage_attachment_id);
    })
    setState((prevProps) => ({
      ...prevProps,
      title: sketchDetails.title,
      selectedFilesIds: selectedFiles,
      existingFilesIdsUnchanged: selectedFiles,
      existingFiles: sketchDetails.attached_medias,
    }));
  }, [sketchDetails])

  // Change Handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'title':
        errors.title = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Group Title" : value.length > 150 ? "Drawing Group shouldn't exceed more than 150 characters" : "";
        break;
      case 'section':
        errors.section = value != "selected" ? "" : "Select a Section";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  }

  // Form Validation
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (
      state.title == "" ||
      state.title.length > 150 ||
      state.selected == "selected"
    )
      valid = false;
    return valid;
  }

  // Form Submit Handler
  const submitHandler = (event) => {
    event.preventDefault();
    // let stepMedias = [];
    let media_attributes = [];
    state.selectedFilesIds.forEach(theId => {
      if (state.existingFilesIdsUnchanged.includes(theId)) {
        //these are already existing there...
      } else {
        //newly added
        media_attributes.push({ "active_storage_attachment_id": theId });
      }
    })
    let difference = state.existingFilesIdsUnchanged.filter(x => !state.selectedFilesIds.includes(x));
    difference.length > 0 && difference.forEach(id => {

      state.existingFiles.forEach(x => {
        if (id == x.active_storage_attachment_id) {
          media_attributes.push({ "id": x.id, "_destroy": true });
        }
        return true;
      })
    })
    const postData = {
      drawing_id: drawing_id,
      model_id: model_id,
      section_id: section_id,
      updated_section_id: state.section,
      title: state.title.replace(/\s+/g, ' ').trim(),
      sketch_type: 2,
      attached_medias_attributes: media_attributes
    }

    if (validate(state.errors)) {
      dispatch(updateDrawing(postData));
    } else {
      let errors = state.errors;
      if (state.title == "")
        errors.title = "Enter Group Title"
      if (state.section == "selected")
        errors.section = "Select a Section"
    }
  }

  // Backdrop that stops Modal from Closing
  const handleBackdropModal = () => { }

  const updateTheSelected = (m) => {
    setState((prevProps) => ({
      ...prevProps,
      selectedFilesIds: m
    }));
  }
  return (
    <>
      <Transition appear show={updateDrawingModal} as={Fragment}>
        <Dialog as="div" open={updateDrawingModal} onClose={() => handleBackdropModal(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >

            <Dialog.Panel className="w-[96%] lg:w-[80%] xl:w-[65%] 2xl:w-[50%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl py-8 shadow-lg">
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center mb-8">Update Drawing</Dialog.Title>

              <form onSubmit={(e) => submitHandler(e)}>
                <div className="relative w-full h-[650px] px-12 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-start-1 col-span-2">
                      <label htmlFor="sketch_title" className="text-sm font-medium">
                        <span className='whitespace-nowrap capitalize'>Drawing Group</span>
                        <span className="text-danger">*</span>
                        <span className='text-gray3 text-sm ml-1'> (Please enter unique Group, Limit: 150 chars)</span>
                      </label><br />
                      <input
                        type="text"
                        name="title"
                        id="sketch_title"
                        placeholder="Enter Group Name"
                        value={state.title}
                        onChange={(e) => onChangeHandler(e)}
                        className="w-full text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                        maxLength={150}
                      />
                      <div className='text-danger mt-1 ml-1'>{state.errors.title}</div>
                    </div>

                    <div className="col-start-1 col-span-2 mb-6">
                      <label htmlFor="map_section" className="text-sm font-medium">Map to Section<span className="text-danger">*</span></label><br />
                      <select
                        name="section"
                        id="map_section"
                        onChange={(e) => onChangeHandler(e)}
                        className="ed-form__select appearance-none relative w-full h-[50px] text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                      >
                        <option value="selected" defaultValue>Select</option>
                        {sectionsList && sectionsList.length > 0 && sectionsList.map((section) => (<option value={section.id && section.id} selected={section.id == section_id}>{section.title && section.title}</option>))}
                      </select>
                      <div className='text-danger mt-1 ml-1'>{state.errors.section}</div>
                    </div>
                  </div>

                  <div className="mb-20">
                    <LinkMedia
                      // procedure_id={procedure_id}
                      model_id={model_id}
                      existingFiles={state.existingFiles}
                      selectedFilesIds={state.selectedFilesIds}
                      existingFilesIdsUnchanged={state.existingFilesIdsUnchanged}
                      updateTheSelected={updateTheSelected}
                      limit={48}
                      showOnly="all"
                      type="sketch"
                      typeId={drawing_id}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end fixed bottom-0 right-0 w-full bg-gray4 dark:bg-darkBg py-6 px-12 mt-10 rounded-b-3xl">
                  <button type="button" onClick={() => dispatch(setUpdateGroupModal(false))} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={updateDrawingLoading}
                    className={`${updateDrawingLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} text-sm 2xl:text-base  font-medium bg-secondary text-white border border-secondary rounded-full px-10 py-2 ml-4 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                  >
                    {updateDrawingLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}
export default UpdateDrawing;