import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePurchaseUrl,
  getAllParts,
  anaglyphDetails,
  setShowThumbnailUpdateModal,
  anaglyphThumbnailDelete,
} from "../../redux/reduxes/anaglyph/anaglyphAction";
import Skeleton from "react-loading-skeleton";
import UpdateAnaglyphThumbnail from "./updateAnaglyphThumbnail";
import PartsList from "./partsList";
import PermissionsMessage from "../common/permissionsMessage";
import DeleteModal from "../common/deleteModal";
import { UnityModal } from "../unitiyModel/UnityModal";
import AddAssetNoteModal from "../assetNotes/addAssetNoteModal";
import { setAssetNotesModal } from "../../redux/reduxes/assetNotes/actions";

const AnaglyphDetails = ({
  model_id,
  activeSubTab,
  showAnaglyphDetails,
  setShowAnaglyphDetails,
  anaglyphDetailsId,
}) => {
  const dispatch = useDispatch();

  // Anaglyph Details Data Fetch
  const permissions = useSelector((state) => state.auth.allPermissions);
  const anaglyphDetailsLoading = useSelector(
    (state) => state.anaglyph.anaglyphDetailsLoading,
  );
  const details = useSelector((state) => state.anaglyph.anaglyphDetails);
  const showThumbnailUpdateModal = useSelector(
    (state) => state.anaglyph.thumbnailUpdateModel,
  );
  const deleteAnaglyphThumbnailLoading = useSelector(
    (state) => state.anaglyph.deleteAnaglyphThumbnailLoading,
  );

  const modelPartData = useMemo(() => {
    return {
      ZipURL: details?.media?.url || "",
      Parts: details?.parts || [],
    };
  }, [details]);
  // const deleteAnaglyphLoading = useSelector(state => state.anaglyph.deleteAnaglyphLoading);
  // const setShowAnaglyphModal = useSelector(state => state.anaglyph.setShowAnaglyphModal);

  const showAssetNotesModal = useSelector(
    (state) => state.asset_notes.showAssetNotesModal,
  );

  // States
  const [state, setState] = useState({
    activeAnaglyphFile: null,
    id: null,
  });

  const [selectedPartId, setSelectedPartId] = useState(null);
  const [open3DModal, setOpen3DModal] = useState(false);

  // Dispatch Angalyph Details
  useEffect(() => {
    const data = {
      model_id: model_id,
      id: anaglyphDetailsId && anaglyphDetailsId,
    };
    dispatch(anaglyphDetails(data));
  }, []);

  // Edit Anaglyph
  // const [showAddAnaglyph, setShowAddAnaglyph] = useState(false);
  // const [anaglyphId, setAnaglyphId] = useState(null);
  // const [update, setUpdate] = useState(false);

  // const updateAnaglyph = (id) => {
  //   dispatch(setAnaglyphModal(true));
  //   setAnaglyphId(id);
  //   setUpdate(true);
  // }

  // // Link and UnLink Angalyph
  // const linkUnlinkAnaglyph = (mode) => {
  //   const data = {
  //     model_id: model_id,
  //     type: mode
  //   }
  //   dispatch(unlinkAnaglyph(data));
  // }

  // Add Anaglyph Purchase URL (Copy)
  const [showCopied, setShowCopied] = useState(false);
  const copyToClipBoard = (data) => {
    navigator.clipboard.writeText(data);
    setShowCopied(true);
  };

  // Edit Anaglyph Purchase URL (Copy)
  const [editingPurchaseUrl, setEditingPurchaseUrl] = useState(false);
  const cancelEditing = () => {
    setEditingPurchaseUrl(false);
    setState((prevProps) => ({
      ...prevProps,
      purchaseLink: details.purchase_link,
    }));
  };

  // Dispatch Copied URL
  useEffect(() => {
    if (showCopied) {
      setTimeout(function () {
        setShowCopied(false);
      }, 3000);
    }
  }, [showCopied]);

  // Change Handler
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    // let errors = state.errors;
    // switch (name) {
    //   case 'purchaseLink':
    //     errors.purchaseLink = value != "" ? "" : "Add a link";
    //     break;
    //   default:
    //     break;
    // }
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
      // errors: errors
    }));
  };

  // Submit Handler
  const updatePathUrl = (event) => {
    event.preventDefault();
    const postData = {
      purchase_link: state.purchaseLink,
      model_id: model_id,
      anaglyph_id: anaglyphDetailsId && anaglyphDetailsId,
    };
    dispatch(updatePurchaseUrl(postData));
    setEditingPurchaseUrl(false);
  };

  // Delete 3D Modal
  // const [deleteAnaglyphModal, setDeleteAnaglyphModal] = useState(false);
  // const [deleteAnaglyphId, setDeleteAnaglyphId] = useState(null);
  // const [deleteAnaglyphTitle, setDeleteAnaglyphTitle] = useState("");

  // const confirmDeleteAnaglyph = (stat, id, title) => {
  //   setDeleteAnaglyphModal(stat);
  //   setDeleteAnaglyphId(id);
  //   setDeleteAnaglyphTitle(title);
  // }

  // Dispatch Parts
  useEffect(() => {
    setState((prevProps) => ({
      ...prevProps,
      purchaseLink: details.purchase_link,
      activeAnaglyphFile:
        details.media && details.media.active_storage_attachment_id,
      id: details.media && details.media.id,
    }));
    if (details && details.id && showAnaglyphDetails) {
      const data = {
        search: "",
        page: 0,
        limit: 50,
        model_id: model_id,
        anaglyph_id: anaglyphDetailsId && anaglyphDetailsId,
        sort: "",
        sorting: "",
      };
      dispatch(getAllParts(data));
    }
  }, [details]);

  // Hide/Show Tooltip on Link/UnLink and Replace 3D file
  // const [isHoverdOnLink, setIsHoveredOnLink] = useState(false);
  // const handleMouseEnterOnLink = () => setIsHoveredOnLink(true);
  // const handleMouseLeaveOnLink = () => setIsHoveredOnLink(false);

  // const [isHoverdOnUnLink, setIsHoveredOnUnLink] = useState(false);
  // const handleMouseEnterOnUnLink = () => setIsHoveredOnUnLink(true);
  // const handleMouseLeaveOnUnLink = () => setIsHoveredOnUnLink(false);

  const [isHoveredOnReplace, setIsHoveredOnReplace] = useState(false);
  const handleMouseEnterOnReplace = () => setIsHoveredOnReplace(true);
  const handleMouseLeaveOnReplace = () => setIsHoveredOnReplace(false);

  // const [showThumbnailUpdateModal, setShowThumbnailUpdateModal] = useState(false);
  const updateThumbnail = () => {
    dispatch(setShowThumbnailUpdateModal(true));
  };
  const [showThumbnailDeleteModal, setShowThumbnailDeleteModal] =
    useState(false);
  const deleteThumbnail = () => {
    setShowThumbnailDeleteModal(true);
  };

  const view3D = () => {
    setOpen3DModal(true);
  };

  const close3DModel = () => {
    setOpen3DModal(false);
  };

  const addPartNote = (partId) => {
    setSelectedPartId(partId);
    dispatch(setAssetNotesModal(true));
  };

  return (
    <>
      <div>
        {/* ANAGLYPH DETAILS SECTION */}
        {!(
          permissions.includes("all_anaglyph") ||
          permissions.includes("read_anaglyph") ||
          permissions.includes("Admin")
        ) ? (
          <PermissionsMessage
            additionalClassName="h-full py-[300px]"
            title="Anaglyph/3D"
            message="read anaglyph"
          />
        ) : (
          <>
            {/* Go Back to Anaglyph List */}
            <div className="flex items-center mb-6 px-4 xl:px-8">
              <button
                type="button"
                onClick={() => setShowAnaglyphDetails(false)}
              >
                <img
                  src="/assets/icons/icon-arrow-up.svg"
                  alt="icon-arrow-up"
                  className="rotate-[-90deg] dark:invert"
                />
              </button>
              <div className="ml-3">
                {anaglyphDetailsLoading ? (
                  <Skeleton
                    width="180px"
                    height="20px"
                    className="ml-3 mb-1 dark:bg-darkMainBg"
                  />
                ) : (
                  <div
                    className="dark:text-gray2 text-xl font-medium capitalize max-w-[200px] xl:max-w-[500px] text-ellipsis overflow-hidden whitespace-nowrap"
                    title={details && details.section && details.section.title}
                  >
                    {details && details.section && details.section.title}{" "}
                    Section
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start justify-between px-4 xl:px-8">
              <div className="flex items-center">
                {anaglyphDetailsLoading ? (
                  <Skeleton
                    width="60px"
                    height="60px"
                    className="dark:bg-darkMainBg"
                  />
                ) : (
                  <div className="w-[60px] h-[60px] bg-gray4 dark:bg-darkMainBg rounded-lg">
                    <img
                      src={
                        details && details.thumbnail_attached
                          ? details.thumb_url_display.url
                          : details &&
                            details.media &&
                            details.media.anaglyph_thumbnail
                      }
                      alt="3d"
                      className="w-[60px] h-[60px] rounded-lg object-cover"
                    />
                  </div>
                )}

                <div>
                  {anaglyphDetailsLoading ? (
                    <Skeleton
                      width="180px"
                      height="20px"
                      className="ml-3 mb-1 dark:bg-darkMainBg"
                    />
                  ) : (
                    <>
                      <div
                        className="dark:text-gray2 text-lg font-medium ml-3 capitalize max-w-[200px] xl:max-w-[500px] text-ellipsis overflow-hidden whitespace-nowrap"
                        title={details.media && details.media.title}
                      >
                        {details && details.title}{" "}
                        <div className="text-gray3 text-sm">
                          ({details && details.media && details.media.title})
                        </div>
                      </div>
                    </>
                  )}
                  {(permissions.includes("all_anaglyph") ||
                    permissions.includes("update_anaglyph") ||
                    permissions.includes("Admin")) && (
                    <button
                      type="button"
                      onClick={() => updateThumbnail()}
                      className="ml-3 text-primary opacity-80 text-sm font-medium transition-all hover:opacity-100 hover:transition-all"
                    >
                      Update Thumbnail
                    </button>
                  )}
                  {details &&
                    details.thumbnail_attached &&
                    (permissions.includes("all_anaglyph") ||
                      permissions.includes("update_anaglyph") ||
                      permissions.includes("Admin")) && (
                      <button
                        type="button"
                        onClick={() => deleteThumbnail()}
                        className="ml-3 text-primary opacity-80 text-sm font-medium transition-all hover:opacity-100 hover:transition-all"
                      >
                        Delete Thumbnail
                      </button>
                    )}
                  <button
                    type="button"
                    onClick={() => view3D()}
                    className="ml-3 text-primary opacity-80 text-sm font-medium transition-all hover:opacity-100 hover:transition-all"
                  >
                    View 3D
                  </button>
                </div>
              </div>
            </div>

            <div className="relative my-8 xl:my-6 px-4 xl:px-8">
              <div className="flex items-center">
                <label
                  htmlFor="part_purchase_url"
                  className="text-sm font-medium dark:text-gray2"
                >
                  Model Purchase URL <span className="text-danger">*</span>
                </label>

                {(permissions.includes("all_anaglyph") ||
                  permissions.includes("update_anaglyph") ||
                  permissions.includes("Admin")) && (
                  <>
                    {editingPurchaseUrl ? (
                      <div className="flex items-center ml-auto px-2">
                        <button
                          type="button"
                          onClick={() => cancelEditing()}
                          className="flex items-center text-black3 opacity-80 dark:text-gray2 text-base font-medium transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={(e) => updatePathUrl(e)}
                          className="flex items-center text-secondary opacity-80 text-base ml-5 font-medium transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingPurchaseUrl(true)}
                        className="ml-auto text-primary opacity-80 text-base font-medium transition-all hover:opacity-100 hover:transition-all"
                      >
                        {details.purchase_link ? "Edit URL" : "Add URL"}
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="relative overflow-hidden">
                {anaglyphDetailsLoading ? (
                  <Skeleton
                    width="100%"
                    height="45px"
                    className="mb-1 dark:bg-darkMainBg"
                  />
                ) : (
                  <>
                    <input
                      type="text"
                      id="part_purchase_url"
                      name="purchaseLink"
                      placeholder="Model Purchase URL"
                      value={state.purchaseLink}
                      disabled={!editingPurchaseUrl}
                      onChange={(e) => onChangeHandler(e)}
                      className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 text-sm border border-gray2 dark:border-opacity-50 rounded-lg py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                    />
                    {details.purchase_link != null && !editingPurchaseUrl && (
                      <button
                        type="button"
                        onClick={() => copyToClipBoard(details.purchase_link)}
                        className="absolute top-[7px] right-[3px] w-[160px] flex justify-end bg-gray4 dark:bg-darkBg py-[12px] px-3 rounded-tr-lg focus:border-secondary focus:outline-none"
                      >
                        {showCopied ? (
                          <div className="text-sm font-medium text-secondary -mt-[2px]">
                            Copied to Clipboard
                          </div>
                        ) : (
                          <img
                            src="/assets/icons/icon-duplicate.svg"
                            alt="icon-copy"
                            className="w-4 h-4 dark:invert transition-all dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                          />
                        )}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* <div className='text-danger mt-1 ml-1'>{state.errors.purchaseLink}</div> */}

            {/* Parts Info */}
            {details.id && (
              <PartsList
                model_id={model_id}
                anaglyph_id={details && details.id}
                activeSubTab={activeSubTab}
              />
            )}
          </>
        )}
      </div>

      {/* Edit and Update Anaglyph thumbnail */}
      {showThumbnailUpdateModal && (
        <UpdateAnaglyphThumbnail
          model_id={model_id}
          id={anaglyphDetailsId}
          showThumbnailUpdateModal={showThumbnailUpdateModal}
          // setAnaglyphId={anaglyphDetailsId}
          // update={update}
          // setUpdate={setUpdate}
        />
      )}

      {/* Delete Anaglyph Modal */}
      {showThumbnailDeleteModal && (
        <DeleteModal
          head="Remove Thumbnail?"
          body={[
            "Deleting thumbnail of anaglyph",
            <strong className="capitalize break-all">
              {" "}
              "{details && details.title}"{" "}
            </strong>,
            "",
          ]}
          deleteAction={anaglyphThumbnailDelete}
          modalAction={setShowThumbnailDeleteModal}
          modalValue={showThumbnailDeleteModal}
          model_id={model_id}
          parentmodel={false}
          id={details && details.id}
          deleteLoading={deleteAnaglyphThumbnailLoading}
        />
      )}
      {open3DModal && (
        <UnityModal
          onClose={close3DModel}
          open={open3DModal}
          partData={modelPartData}
          addNotes={addPartNote}
        />
      )}

      {showAssetNotesModal && (
        <AddAssetNoteModal
          model_id={model_id}
          showAssetNotesModal={!!showAssetNotesModal}
          assetNotiableType="Part"
          assetNotiableTypeId={selectedPartId}
        />
      )}
    </>
  );
};
export default AnaglyphDetails;
