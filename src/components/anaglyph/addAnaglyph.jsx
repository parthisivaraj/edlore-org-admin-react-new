import React, { Fragment, useEffect, useState } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from 'react-redux';
import LinkMedia from "../common/linkMediaSelectOne";
import { addAnaglyph, anaglyphDetails, setAnaglyphModal, updateAnaglyph } from "../../redux/reduxes/anaglyph/anaglyphAction";
import { getAllSectionsNoPaginate } from '../../redux/reduxes/sections/sectionAction';

const AddAnaglyph = ({ setShowAnaglyphModal, model_id, id, setAnaglyphId, update, setUpdate, }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const addAnaglyphLoading = useSelector(state => state.anaglyph.addAnaglyphLoading);
  const addAnaglyphError = useSelector(state => state.anaglyph.addAnaglyphError);
  const updateAnaglyphLoading = useSelector(state => state.anaglyph.updateAnaglyphLoading);
  const sectionsList = useSelector(state => state.sections.sectionsListNoPage);
  const details = useSelector(state => state.anaglyph.anaglyphDetails);

  // States
  const [state, setState] = useState({
    title: "",
    map_section: null,
    selectedFileId: null,
    media_id_unchanged: null,
    selectedThumbnailId: null,
    thumbnail_media_id_unchanged: null,

    errors: {
      title: "",
      map_section: "",
      anaglyph: ""
    }
  })

  // Dispatch Sections without Paginate
  useEffect(() => {
    const sectionData = {
      id: model_id,
      search: "",
      anaglyph: update && setAnaglyphId ? false : true,
    }
    dispatch(getAllSectionsNoPaginate(sectionData));
  }, []);

  // Restrict the Duplicate Inputs
  useEffect(() => {
    let errors = state.errors;
    addAnaglyphError && addAnaglyphError.forEach(error => {
      switch (error.name) {
        case 'title':
          errors.title = error.message;
          break;
        case 'map_section':
          errors.map_section = error.message
          break;
        case 'anaglyph':
          errors.anaglyph = error.message
          break;
        default:
          break;
      }
    });
    if (addAnaglyphError && addAnaglyphError.length == 0) {
      errors.title = ""
      errors.map_section = null
      errors.anaglyph = ""
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }))
  }, [addAnaglyphError]);

  // Dispatch to Details
  useEffect(() => {
    let errors = state.errors;
    errors.title = "";
    errors.map_section = "";
    errors.selectedFileId = "";

    const data = {
      id: id && id,
      model_id: model_id,
    }
    dispatch(anaglyphDetails(data));
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, []);

  // Update an Anaglyph
  useEffect(() => {
    if (update) {
      details && details.title && setState((prevProps) => ({
        ...prevProps,
        id: details && details.id,
        title: details && details.title,
        map_section: details && details.section && details.section.id,
        selectedFileId: details && details.media && details.media.active_storage_attachment_id,
        media_id_unchanged: details && details.media && details.media.id
      }))
    } else {
      setState((prevProps) => ({
        ...prevProps,
        title: "",
        map_section: null,
      }))
    }
  }, [details]);

  // Validate Form
  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (state.title == "" || state.title.length > 150 || state.map_section == null || state.map_section == "selected" || state.selectedFileId == null)
      valid = false;
    return valid;
  };

  // onChange Handler
  const onChangeHandler = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'title':
        errors.title = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter 3D Title" : value.length > 150 ? "Title shouldn't exceed more than 150 characters" : "";
        break;
      case 'map_section':
        errors.map_section = value == "selected" ? "Select one Section" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors,
      [name]: value,
    }))
  }

  // Changing the 3D Id
  const changingTheMediaId = (up) => {
    let errors = state.errors;
    errors.anaglyph = ""
    setState((prevProps) => ({
      ...prevProps,
      errors: errors,
    }));
    setState((prevProps) => ({
      ...prevProps,
      selectedFileId: up,
    }));
  }

  // onSubmit Handler
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      if (state.selectedFileId && String(state.selectedFileId).length > 0) {
        const updateData = {
          title: state.title.replace(/\s+/g, ' ').trim(),
          section_id: state.map_section,
          anaglyph_file_attributes: state.selectedFileId,
          model_id: model_id,
          id: id,
          mediaId: state.media_id_unchanged
        };
        const postData = {
          title: state.title.replace(/\s+/g, ' ').trim(),
          section_id: state.map_section,
          anaglyph_file_attributes: state.selectedFileId,
          model_id: model_id,
        };
        if (update) {
          dispatch(updateAnaglyph(updateData));
        } else {
          dispatch(addAnaglyph(postData));
        }
        // setShowAddAnaglyph(false);
      }
    } else {
      let errors = state.errors;
      if (state.title == "") {
        errors.title = "Enter 3D Title";
      }
      if (state.map_section == "selected" || state.map_section == null) {
        errors.map_section = "Select one Section";
      }
      if (state.selectedFileId == null) {
        errors.anaglyph = "Select one 3D file";
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));
    }
  }

  //Reset the form values on Closing Modal
  const onCancelTheEdit = () => {
    const data = {
      id: "",
    }
    setState((prevProps) => ({
      ...prevProps,
      title: "",
      map_section: null,

      errors: {
        title: "",
        map_section: null,
        anaglyph: "",
      }
    }))
    dispatch(setAnaglyphModal(false));
    setAnaglyphId(null);
    dispatch(anaglyphDetails(data));
  }

  // Stop Modal from Closing
  const handleModalBackdrop = () => { }

  return (
    <Transition appear show={setShowAnaglyphModal} as={Fragment}>
      <Dialog as="div" open={setShowAnaglyphModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-[96%] lg:w-[80%] xl:w-[75%] 2xl:w-[50%]   h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-2xl px-8 xl:px-12 pt-12 shadow-lg">
            <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center mb-8">{update ? "Update" : "Add New"} 3D  </Dialog.Title>
            <form onSubmit={(e) => onSubmitHandler(e)}>
              <div className="grid grid-cols-2 gap-8">
                <div className="col-start-1 mb-8">
                  <label htmlFor="title" className="text-sm font-medium dark:text-gray2">
                    3D Title
                    <span className="text-danger">*</span>
                    <span className='text-gray3 text-sm ml-1'> (Limit: 150 chars)</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="3D Title"
                    className="bg-white dark:bg-darkBg w-full text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                    value={state.title}
                    onChange={(e) => onChangeHandler(e)}
                    maxLength={150}
                  />
                  <div className='text-danger mt-1 ml-1'>{state.errors.title}</div>
                </div>

                <div className="col-start-2 mb-8">
                  <label htmlFor="map_section" className="text-sm font-medium">Map to Section<span className="text-danger">*</span></label><br />
                  <select
                    name="map_section"
                    id="map_section"
                    className="ed-form__select appearance-none relative w-full h-[48px] text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 capitalize border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                    onChange={(e) => onChangeHandler(e)}
                  >
                    <option value="selected" defaultValue>Select</option>
                    {sectionsList && sectionsList.length > 0 &&
                      sectionsList.map((section) => (
                        <option
                          selected={(section.id == (update && (details && details.section && details.section.id)))}
                          key={section && section.id}
                          value={section.id && section.id}
                        >
                          {section.title && section.title}
                        </option>))}
                  </select>
                  {(sectionsList && sectionsList.length == 0) &&
                    <div className='text-danger mt-1 ml-1'>All the sections are already have 3D</div>
                  }
                  <div className='text-danger mt-1 ml-1'>{state.errors.map_section}</div>
                </div>
              </div>

              <div className=" mb-12">
                <label htmlFor="map_section" className="text-sm font-medium">Select 3D file<span className="text-danger">*</span></label><br />
                <LinkMedia
                  model_id={model_id}
                  changingTheMediaId={changingTheMediaId}
                  selectedFileId={state.selectedFileId}
                  select="single"
                  limit={48}
                  showOnly="3d-zip"
                  type="anaglyph"
                  typeId={update ? id : id}
                />
                <div className='text-danger mt-1 ml-1'>{state.errors.anaglyph}</div>
              </div>

              {/* <div className=" mb-12">
                <label htmlFor="map_section" className="text-sm font-medium">Select thumbnail for 3D file<span className="text-danger">*</span></label><br />
                <LinkMedia
                  model_id={model_id}
                  changingTheMediaId={changingTheMediaId}
                  selectedFileId={state.selectedFileId}
                  select="single"
                  limit={48}
                  showOnly="image"
                  type="image"
                  typeId={update ? id : id}
                />
                <div className='text-danger mt-1 ml-1'>{state.errors.anaglyph}</div>
              </div> */}
              <div className="flex items-center justify-end my-10">
                <button type="button" onClick={() => onCancelTheEdit()} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addAnaglyphLoading || updateAnaglyphLoading}
                  className={`${addAnaglyphLoading || updateAnaglyphLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} text-sm 2xl:text-base  font-medium bg-secondary text-white border border-secondary rounded-full px-10 py-2 ml-4 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                >
                  {update ? (updateAnaglyphLoading ? "Updating..." : "Update") : (addAnaglyphLoading ? "Adding..." : "Add")}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default AddAnaglyph;