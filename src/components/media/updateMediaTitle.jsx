import React, { Fragment, useState } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import DeleteModal from '../common/deleteModal';
import { deleteMedia, updateMedia } from "../../redux/reduxes/medias/mediasAction";
import { useDispatch, useSelector } from 'react-redux';


const UpdateMediaTitle = ({ updateMediaModal, setUpdateMediaModal, id, details }) => {
  const dispatch = useDispatch();

  // Fetch Auth Data
  const authData = useSelector(state => state.auth.authData);
  const permissions = useSelector(state => state.auth.allPermissions);
  const deleteMediaLoading = useSelector(state => state.medias.deleteMediaLoading);

  // States
  const [state, setState] = useState({
    title: details.title,

    errors: {
      title: "",
    }
  })

  // Validate
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (val = false));
    if (state.title == "" || state.title.replace(/\s+/g, '').length == 0)
      valid = false;
    return valid;
  }

  // Change Handler
  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    let errors = state.errors;
    switch (name) {
      case 'title':
        errors.title = (value === "" || value.replace(/\s+/g, '').length == 0) ? "Enter Media Title" : "";
        break;
      default:
        break;
    }
    setState((prevProps) => ({
      ...prevProps,
      errors, [name]: value,
    }))
  }

  // Form Submit Event
  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    if (validate(state.errors)) {
      const data = {
        title: state.title.replace(/\s+/g, ' ').trim(),
        id: id,
        org_id: authData.org_id
      }
      dispatch(updateMedia(data));
      setUpdateMediaModal(false);
    } else {
      let errors = state.errors;
      if (state.title == "" || state.title.replace(/\s+/g, ' ').trim().length == 0) {
        errors.title = "Enter Media Title"
      }
      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));
    }
  }

  // Delete Media
  const [deleteMediaId, setDeleteMediaId] = useState(null);
  const [deleteMediaModal, setDeleteMediaModal] = useState(false);
  const [deleteMediaTitle, setDeleteMediaTitle] = useState("");

  const confirmDeleteMedia = (id, stat, title) => {
    setDeleteMediaId(id);
    setDeleteMediaModal(stat);
    setDeleteMediaTitle(title);
  }

  // Backdrop that stops Modal from Closing
  const handleBackdropModal = () => { }

  return (
    <>
      <Transition appear show={updateMediaModal} as={Fragment}>
        <Dialog as="div" open={updateMediaModal} onClose={() => handleBackdropModal(false)} className="fixed inset-0 z-50 py-20 flex items-start justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[80%] lg:w-[60%] xl:w-[50%] 2xl:w-[35%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-3xl px-10 py-10 shadow-lg">
              <Dialog.Title className="dark:text-gray2 text-2xl font-bold text-center mb-8">Update Media Title</Dialog.Title>

              <div>
                <div>
                  <label htmlFor="title" className='text-sm font-medium'>Media Title <span className='text-danger'>*</span></label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    className="w-full text-base dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md px-4 py-3 mt-1 focus:border-secondary focus:outline-none"
                    value={state.title}
                    onChange={onChangeHandler}
                  />
                  <div className='text-danger mt-1 ml-1'>{state.errors.title}</div>
                </div>

                <div className="flex items-center justify-between mt-10 mb-4">
                  {(permissions.includes("all_media") || permissions.includes("delete_media") || permissions.includes("Admin")) &&
                    <button type='button' onClick={() => confirmDeleteMedia(id, true, state.title)} className='bg-transparent text-sm text-danger  font-medium border border-danger rounded-full px-6 py-2 shadow-sm transition-all hover:bg-danger hover:text-white hover:transition-all focus:outline-0 focus-visible:outline-0'>
                      Delete Media
                    </button>
                  }

                  <div>
                    <button type='button' onClick={() => setUpdateMediaModal(false)} className="bg-transparent text-black2 dark:text-gray2 border border-black2 dark:border-gray2 md:text-sm 2xl:text-base font-medium rounded-full shadow-sm px-6 py-2 max-w-[150px] xl:max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0">
                      Cancel
                    </button>
                    <button type='submit' onClick={(e) => handleSubmitEvent(e)} className='bg-secondary text-sm text-white font-medium border border-secondary rounded-full px-8 py-2 ml-3 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Delete Media Modal */}
      {deleteMediaModal &&
        <DeleteModal
          head="Remove Media"
          body={["Are you sure you want to remove", <strong className="capitalize break-all"> "{deleteMediaTitle}" </strong>, "Media from the list?"]}
          additionalText={[<strong className="capitalize break-all">Note: </strong>, " If this media is linked to any work orders, procedures, or other modules, it will also be removed from them"]}
          deleteAction={deleteMedia}
          modalAction={setDeleteMediaModal}
          modalValue={deleteMediaModal}
          parentmodel={true}
          closeParentPopup={setUpdateMediaModal}
          id={deleteMediaId}
          org_id={authData.org_id}
          deleteLoading={deleteMediaLoading}
        />
      }
    </>
  )
}
export default UpdateMediaTitle;