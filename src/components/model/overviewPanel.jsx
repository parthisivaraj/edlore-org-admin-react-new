import React, { useState } from 'react';
import { Tab } from "@headlessui/react";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import ModelDeviceListing from "../model/modelDevicesListing";
import DeleteModal from "../common/deleteModal";
import { deleteModel, setModelModal } from "../../redux/reduxes/theModels/modelAction";
import AddNewModel from './addNewModel';
import { useDispatch, useSelector } from 'react-redux';

const OverviewPanel = ({ setShowModal, id, activeMainTab }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const details = useSelector(state => state.models.modelDetails);
  const detailsLoading = useSelector(state => state.models.modelDetailsLoading);
  const modelPopup = useSelector(state => state.models.modelPopup);
  const permissions = useSelector(state => state.auth.allPermissions);
  const deleteModelsLoading = useSelector(state => state.models.deleteModelsLoading);

  /// Update New Model Popup Modal
  // const [updatingModelId, setUpdatingModelId] = useState(null);
  function editModal(id) {
    dispatch(setModelModal(true));
  }

  // Delete Modal
  const [deleteModelPopup, setDeleteModelPopup] = useState(false);

  const handleDeleteModel = () => {
    setDeleteModelPopup(!deleteModelPopup)
  }

  return (
    <Tab.Panel>
      <>
        <div className="absolute right-0 -top-[70px]">
          <Link to="/models" exact={true} className="bg-transparent text-black3 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2.5 shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:transition-all hover:duration-300 focus:outline-0">
            Back to Models
          </Link>
        </div>

        <div className="w-full bg-white dark:bg-darkBg pb-8 border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md">
          <div className="border-b border-gray2 dark:border-opacity-20 py-5 px-5">
            <div className="flex flex-row items-start mb-8">
              {detailsLoading ? <Skeleton width="120px" height="15px" className="dark:bg-darkMainBg" /> :
                <div className="flex items-center text-sm text-black2 dark:text-gray2 font-medium">
                  <div className='max-w-[300px] text-ellipsis overflow-hidden whitespace-nowrap pr-1'>{details.primary_category ? details.primary_category.name : details.secondary_category && details.secondary_category.super_category && details.secondary_category.super_category.name}</div>  /
                  <div className='px-1'>{details.secondary_category && details.secondary_category.name} </div>
                  {/* <Link to="" exact={true} className="text-sm text-primary font-medium ml-2">Change device category +</Link> */}
                </div>
              }

              <div className="flex items-center justify-end ml-auto dark:text-gray2">

                {((permissions.includes("all_model") || permissions.includes("update_model") || permissions.includes("Admin")) &&
                  (permissions.includes("all_category") || permissions.includes("read_category") || permissions.includes("Admin"))) &&
                  <button onClick={(e) => editModal()} type="button" className="mx-6 focus-visible:outline-none" title="Edit Model" >
                    <img src="/assets/icons/icon-edit.svg" alt="icon-edit" className="dark:invert transition-all dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all" />
                  </button>
                }

                {(permissions.includes("all_model") || permissions.includes("delete_model") || permissions.includes("Admin")) &&
                  <button onClick={(e) => handleDeleteModel(e)} type="button" className="focus-visible:outline-none" title="Delete Model">
                    <img src="/assets/icons/icon-delete.svg" alt="icon-delete" className="dark:invert transition-all dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all" />
                  </button>
                }
              </div>
            </div>

            <div className="flex items-start md:mt-8 xl:mt-4">
              {detailsLoading ? <Skeleton count={2} width="120px" height="15px" className="dark:bg-darkMainBg" /> :
                <div>
                  <div className="text-sm text-gray3">Model Name</div>
                  <div className="text-base text-black2 dark:text-gray2 font-medium capitalize w-[300px] text-ellipsis overflow-hidden whitespace-nowrap">{details.title}</div>
                </div>
              }

              <div className="ml-20">
                {detailsLoading ? <Skeleton count={2} width="120px" height="15px" className="dark:bg-darkMainBg" /> :
                  <>
                    <div className="text-sm text-gray3">Model Number</div>
                    <div className="text-base text-black2 dark:text-gray2 font-medium w-[300px] text-ellipsis overflow-hidden whitespace-nowrap">{details.model_id}</div>
                  </>
                }
              </div>
            </div>
          </div>

          {/* Model Device Table List */}
          <ModelDeviceListing
            model_id={id}
            setShowModal={setShowModal}
          />
        </div>

        {/* Edit Model */}
        {modelPopup &&
          <AddNewModel
            showModal={modelPopup}
            editModel={true}
            editingModelId={details && details.id && details.id}
          />
        }

        {/* Delete model */}
        {deleteModelPopup &&
          <DeleteModal
            head="Remove Model"
            body={["Are you sure you want to remove", <strong className="capitalize break-all"> "{details && details.title}" </strong>, "model ? Deleting this model will delete all the devices, procedures, troubleshoot, written issues, safety measures, error codes, mcodes, alarm codes, manuals, device drawings, animations, 3D files and sections associated with it."]}
            deleteAction={deleteModel}
            modalAction={setDeleteModelPopup}
            parentmodel={false}
            modalValue={deleteModelPopup}
            deleteLoading={deleteModelsLoading}
            id={id}
          />
        }
      </>
    </Tab.Panel>
  );
}

export default OverviewPanel;