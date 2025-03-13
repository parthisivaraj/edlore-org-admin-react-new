import React, { useState, useEffect } from "react";
import FileUploader from "./uploader";
import { useSelector, useDispatch } from "react-redux";
import { getAllMedias } from "../../redux/reduxes/medias/mediasAction";
import { addToaster } from "../../redux/reduxes/toaster/tosterAction";

const AddNewMediaPanel = ({
  tabName,
  currentTab,
  setAddNewMediaModal,
  uploadType,
  uploadingStarted,
  index,
  addNewMediaModal,
}) => {
  const dispatch = useDispatch();

  // Fetch Data
  const authData = useSelector((state) => state.auth.authData);

  // States
  const [state, setState] = useState({
    files: [],
    errors: [],

    uploadErrors: {
      files: "",
      sizeExceeds: [],
    },
  });

  // Hide the Error Message after few seconds
  const [timer, setTimer] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 30000);
    return () => clearTimeout(timer);
  }, [timer]);

  const [uploadedCount, setUploadedCount] = useState(0);
  const [cancelledUpload, setCancelledUpload] = useState(false);

  // Select Files
  const selectedFiles = (e) => {
    const _file = e.target.files;
    let statefile = [
      ...state.files,
      ...Array.prototype.slice.call(e.target.files),
    ];
    let clearedHeaveyFiles = [];
    let errors = state.uploadErrors;
    errors.files = "";
    errors.sizeExceeds = [];
    statefile.forEach((file, index) => {
      if (file.size < 2097152000) {
        if (clearedHeaveyFiles.length < 25) {
          clearedHeaveyFiles.push(file);
        } else {
          errors.files = "Cannot upload more than 25 files at once";
          // const data = {
          //   content: `Cannot upload more than 25 files at once`,
          //   type: "failed"
          // }
          // dispatch(addToaster(data));
        }
      } else {
        errors.sizeExceeds = [
          ...errors.sizeExceeds,
          `${file.name} file is exceeding the size of 2GB.`,
        ];
        // const data = {
        //   content: `${file.name} is exceeding the file size of 2GB.`,
        //   type: "failed"
        // }
        // dispatch(addToaster(data));
      }
    });
    setState((prevProps) => ({
      ...prevProps,
      files: clearedHeaveyFiles,
      uploadErrors: errors,
    }));
    e.target.value = null;
  };

  // Remove from the List
  const removeFromList = (index) => {
    function alterTheError() {
      let newErr = [];
      state.errors
        .filter((x) => x != index)
        .forEach((y) => {
          y > index ? newErr.push(y - 1) : newErr.push(y);
        });
      return newErr;
    }

    setState((prevProps) => ({
      ...prevProps,
      files: state.files.filter((data, ind) => ind !== index),
      errors: alterTheError(),
    }));
  };

  // Clear All Selected Files
  const clearAllSelectedFiles = () => {
    setState((prevProps) => ({
      ...prevProps,
      files: [],
    }));
  };

  // Start Uploading
  const [startUploading, setStartUploading] = useState({
    index: 0,
    status: false,
  });
  const handleStartUploading = () => {
    uploadingStarted(true);
    setStartUploading({ index: 0, status: true });
  };
  // Upload Completion
  const uploadCompleted = () => {
    clearTimeout();
    setCancelledUpload(true);
    uploadingStarted(false);
    setAddNewMediaModal(false);
    const mediaData = {
      page: 0,
      search: "",
      limit: 48,
      showOnly:
        uploadType == "CSV" || uploadType == "csv"
          ? "csv"
          : uploadType == "3d-zip"
          ? "3d-zip"
          : uploadType == "pdf"
          ? "pdf"
          : "all",

      organization_id: authData.org_id,
    };
    dispatch(getAllMedias(mediaData));
  };
  const oneUpdated = (k) => {
    // setUploadedCount(uploadedCount + 1);
    setStartUploading({ index: k + 1, status: true });
  };

  // Dispatch Upload Status
  useEffect(() => {
    if (startUploading.status && uploadedCount == state.files.length) {
      uploadCompleted();
      setUploadedCount(0);
    }
  }, [uploadedCount]);
  const setErrormessage = (i, action) => {
    if (action == "add") {
      setState((prevProps) => ({
        ...prevProps,
        errors: [...state.errors, i],
      }));
    } else {
      setState((prevProps) => ({
        ...prevProps,
        errors: state.errors.filter((x) => x != i),
      }));
    }
  };

  return (
    <>
      {/* Upload Images/Media */}
      {!startUploading.status && (
        <div className="relative h-[108px]">
          <input
            type="file"
            id="add_new_media"
            name="add_new_media"
            className="absolute z-20 w-full h-[108px] opacity-0  cursor-pointer"
            multiple
            accept={
              tabName == "CSV"
                ? "text/csv"
                : tabName == "csv"
                ? "text/csv"
                : tabName == "PDF"
                ? "application/pdf"
                : tabName == "pdf"
                ? "application/pdf"
                : tabName == "Images"
                ? "image/*"
                : tabName == "Videos"
                ? "video/*"
                : tabName == "Audios"
                ? "audio/*"
                : tabName == "TXT"
                ? ".txt, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                : tabName == "3D | ZIP" || tabName == "3d-zip"
                ? ".zip"
                : tabName == "All files"
                ? ""
                : ""
            }
            // "image/png, image/gif, image/jpeg"
            onChange={(e) => selectedFiles(e)}
          />
          <div className="absolute top-0 left-0 w-full flex items-center justify-between bg-white dark:bg-darkMainBg border border-dashed border-gray2 dark:border-opacity-20 rounded-xl p-8">
            <div className="flex items-center">
              <img src="../assets/images/devices/folder.png" alt="icon-file" />
              <span className="ml-4 text-sm opacity-75 leading-tight">
                Add or drag your documents, photos, or videos <br /> here to
                start uploading
              </span>
            </div>
            <div className="bg-primary text-white text-sm border border-primary rounded-full py-1.5 px-6 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all">
              Browse files
            </div>
          </div>
        </div>
      )}

      {/* Upload Size Exceeds Error Msg */}
      <div className="mt-4 ml-2">
        {state.uploadErrors.sizeExceeds.length > 0 && (
          <>
            {state.uploadErrors.sizeExceeds.length > 0 &&
              state.uploadErrors.sizeExceeds.map((uploadError) => {
                return (
                  <div className="mr-auto text-danger my-auto">
                    {uploadError}
                  </div>
                );
              })}
          </>
        )}
      </div>

      {/* View Uploaded Media Files */}
      {state.files.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-base font-medium">
              {startUploading.status
                ? "Files uploading, click Close button to Finish or Abort."
                : "Files ready to upload"}
              <span className="ml-2 text-sm text-gray3">
                {!startUploading.status
                  ? "(Max. 25 files can be uploaded at once)"
                  : ""}
              </span>
            </div>

            {state.files.length > 0 && !startUploading.status && (
              <button
                onClick={() => clearAllSelectedFiles()}
                type="button"
                className="flex items-center ml-auto text-sm focus-visible:outline-none"
                title="Delete"
              >
                <span>Clear all</span>
                <img
                  src="../assets/icons/icon-delete.svg"
                  alt="icon-delete"
                  className="w-[15px] h-[15px] ml-1 dark:invert"
                />
              </button>
            )}
          </div>
          <div className="min-h-[350px] max-h-full overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
            <div className="flex flex-row items-stretch flex-wrap mt-3 gap-5">
              {state.files.map((media, index) => {
                return (
                  <FileUploader
                    cancelledUpload={cancelledUpload}
                    media={media}
                    index={index}
                    removeFromList={removeFromList}
                    startUploading={startUploading}
                    oneUpdated={oneUpdated}
                    setErrormessage={setErrormessage}
                    errors={state.errors}
                    addNewMediaModal={addNewMediaModal}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end fixed left-0 bottom-0 right-0 z-[50] bg-gray4 dark:bg-darkMainBg w-full py-6 px-4 2xl:px-10 rounded-b-2xl shadow-[20px_-15px_40px_-16px_rgba(229,229,229,0.2)] dark:shadow-[20px_-15px_40px_-16px_rgba(0,0,0,0.2)]">
        <div className="mr-auto text-danger my-auto">
          {state.uploadErrors.files}
        </div>

        <button
          type="button"
          onClick={() => uploadCompleted()}
          className="bg-gray dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0"
        >
          Close
        </button>
        {state.files.length > 0 &&
          !startUploading.status &&
          state.errors.length == 0 && (
            <button
              type="button"
              disabled={startUploading.status && state.errors.length > 0}
              onClick={(e) => handleStartUploading(e)}
              className="bg-secondary text-white text-sm font-medium border border-secondary px-8 py-2 ml-5 rounded-full shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
            >
              Start Upload
            </button>
          )}
      </div>
    </>
  );
};
export default AddNewMediaPanel;
