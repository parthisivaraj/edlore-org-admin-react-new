import React, { Fragment, useEffect, useState } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from 'react-redux';
import LinkMedia from "../common/linkMediaSelectOne";
import { update3DThumbnail, setShowThumbnailUpdateModal } from "../../redux/reduxes/anaglyph/anaglyphAction";


const UpdateAnaglyphThumbnail = ({ model_id, id, update, showThumbnailUpdateModal }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const addAnaglyphLoading = useSelector(state => state.anaglyph.addAnaglyphLoading);
  const addAnaglyphError = useSelector(state => state.anaglyph.addAnaglyphError);
  const updateAnaglyphLoading = useSelector(state => state.anaglyph.updateAnaglyphLoading);
  const sectionsList = useSelector(state => state.sections.sectionsListNoPage);
  const details = useSelector(state => state.anaglyph.anaglyphDetails);

  // States
  const [state, setState] = useState({
    selectedThumbnailId: null,
    thumbnail_media_id_unchanged: null,

    errors: {
      selectedThumbnail: "",
    }
  })
  useEffect(() => {
    let errors = state.errors;
    errors.selectedThumbnail = "";
    setState((prevProps) => ({
      ...prevProps,
      errors,
    }));
  }, []);

  // Validate Form
  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (state.selectedThumbnailId == null)
      valid = false;
    return valid;
  };

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
      selectedThumbnailId: up,
    }));
  }

  // onSubmit Handler
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (validateForm(state.errors)) {
      if (state.selectedThumbnailId && String(state.selectedThumbnailId).length > 0) {
        const updateData = {
          anaglyph_thumbnail_file_attributes: state.selectedThumbnailId,
          model_id: model_id,
          anaglyphId: id
        };
        dispatch(update3DThumbnail(updateData));

        // setShowAddAnaglyph(false);
      }
    } else {
      let errors = state.errors;
      if (state.selectedThumbnailId == null) {
        errors.anaglyph = "Select one thumbnail fot the anaglyph"
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors,
      }));

    }
  }

  // Stop Modal from Closing
  const handleModalBackdrop = () => { }
  return (
    <>
      <Transition appear show={showThumbnailUpdateModal} as={Fragment}>
        <Dialog as="div" open={showThumbnailUpdateModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
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
              <Dialog.Title className="text-2xl 2xl:text-3xl font-bold text-center mb-8">Update 3D Thumbnail</Dialog.Title>
              <form onSubmit={(e) => onSubmitHandler(e)}>

                <div className=" mb-12">
                  <label htmlFor="map_section" className="text-sm font-medium">Select thumbnail for 3D file<span className="text-danger">*</span></label><br />
                  <LinkMedia
                    model_id={model_id}
                    changingTheMediaId={changingTheMediaId}
                    selectedFileId={state.selectedFileId}
                    select="single"
                    limit={48}
                    showOnly="image"
                    type="image"
                    typeId="image"
                  />
                  <div className='text-danger mt-1 ml-1'>{state.errors.anaglyph}</div>
                </div>

                <div className="flex items-center justify-end my-10">
                  <button type="button" onClick={() => dispatch(setShowThumbnailUpdateModal(false))} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
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
    </>
  );
}

export default UpdateAnaglyphThumbnail;