import React, { useState } from 'react';
import { Dialog } from "@headlessui/react";
import { useDispatch } from 'react-redux';
import LinkMedia from "../common/linkMediaNew";
import { setManualsModal } from "../../redux/reduxes/sketches/sketchesAction";


const LinkFileModal = ({ submitCallBack, limit, model_id }) => {
  const dispatch = useDispatch();

  // States
  const [state, setState] = useState({
    selectedMedias: [],
    // section: section_id,
    selectedFilesIds: [],
    existingFilesIdsUnchanged: [],
    existingFiles: [],
    attached_medias: [],
  });

  // File Selection Handler
  const [selectedIds, setSelectedIds] = useState([]);
  const selectFileHandler = (event, file_id) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, file_id])
    } else {
      setSelectedIds(selectedIds.filter(x => x != file_id))
    }
  }

  // Update the Selected Medias
  const updateTheSelected = (m) => {
    setState((prevProps) => ({
      ...prevProps,
      selectedFilesIds: m
    }));
  };


  return (
    <Dialog.Panel className="w-[90%] xl:w-[75%] 2xl:w-[50%]  h-auto bg-gray4 dark:bg-darkBg border border-gray4 dark:border-opacity-20 rounded-2xl py-12 shadow-lg">
      <div className="relative h-[500px] mb-12">
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
          </div>
          <div className="w-full h-[430px] px-12 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thmub-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">

            <LinkMedia
              model_id={model_id}
              existingFiles={state.existingFiles}
              selectedFilesIds={state.selectedFilesIds}
              existingFilesIdsUnchanged={state.existingFilesIdsUnchanged}
              updateTheSelected={updateTheSelected}
              limit={48}
              showOnly="all"
            />
          </div>
          <div className="flex items-center justify-end mt-14 px-10">
            <button type="button" onClick={() => dispatch(setManualsModal(false))} className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
              Cancel
            </button>
            <button type="button" onClick={() => submitCallBack(state.selectedFilesIds)} className="text-sm 2xl:text-base  font-medium bg-secondary text-white border border-secondary rounded-full px-10 py-2 ml-4 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
              Done
            </button>
          </div>
        </div>
      </div>
    </Dialog.Panel>
  );
}

export default LinkFileModal;