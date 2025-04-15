import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useSelector } from "react-redux";
import { APIPath, EnvironmentConstant } from "../../helpers";
import { nodeInstance } from "../../api/api_instance";
import { uploadFilesInstance } from "../../api/marqo_api_instance";

const chunkSize = 1048576 * 8;
let timer = null;

function FileUploader(props) {
  const {
    media,
    index,
    removeFromList,
    startUploading,
    oneUpdated,
    setErrormessage,
    errors,
    cancelledUpload,
    addNewMediaModal,
  } = props;

  // States
  const [showProgress, setShowProgress] = useState(false);
  const [counter, setCounter] = useState(1);
  const [fileToBeUpload, setFileToBeUpload] = useState({});
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
  const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
  const [progress, setProgress] = useState(0);
  const [fileGuid, setFileGuid] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);
  const [fileNames, setFileNames] = useState([]);
  const [fileNewName, setFileNewName] = useState("");
  const [error, setError] = useState("");
  let chunkTry = 0;
  const duration = ["5000", "15000", "20000", "20000"];

  useEffect(() => {
    console.log(cancelledUpload, "cancelledUpload in the FTFTFTFTFTF");
    if (cancelledUpload) {
      chunkTry = 5;
    }
  }, [cancelledUpload]);
  console.log(addNewMediaModal, "addNewMediaModal OKOKOKOKOK");

  // Fetch Data
  const authData = useSelector((state) => state.auth.authData);

  //Unmount
  useEffect(
    () => () => {
      console.log("coming inside unmount", timer);
      // clearTimeout()
      clearTimeout(timer);
      // return () => clearTimeout(timer);
    },
    [],
  );

  // Start Uploading
  useEffect(() => {
    if (startUploading.status && startUploading.index == index) {
      getFileContext();
    }
  }, [startUploading]);

  // Start Uploading
  useEffect(() => {
    setFileNewName(media.name.split(".").slice(0, -1).join("."));
  }, [media, index]);

  // Progress of Upload
  useEffect(() => {
    if (fileSize > 0) {
      if (EnvironmentConstant.mode.toLowerCase() === "offline") {
        fileUpload(counter);
      }
    }
  }, [fileToBeUpload, progress]);

  useEffect(() => {
    if (fileSize > 0) {
      if (EnvironmentConstant.mode.toLowerCase() === "online") {
        uploadAWS();
      }
    }
  }, [fileToBeUpload]);

  // Get File Info
  const getFileContext = (e) => {
    resetChunkProperties();
    const _file = media;
    setFileSize(_file.size);

    const _totalCount =
      _file.size % chunkSize == 0
        ? _file.size / chunkSize
        : Math.floor(_file.size / chunkSize) + 1;
    // Total count of chunks will have been upload to finish the file
    setChunkCount(_totalCount);

    setFileToBeUpload(_file);
    const _fileID = uuidv4() + "." + _file.name.split(".").pop();
    setFileGuid(_fileID);
  };

  // File Upload
  const fileUpload = () => {
    setCounter(counter + 1);
    if (counter <= chunkCount && chunkTry <= 3) {
      var chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
      uploadChunk(chunk);
    }
  };

  // Clear Uploaded File Names
  const clearUploadedChunks = (finalFileNames) => {
    var formData = new FormData();
    formData.append("file_names[]", fileNames);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      admin: "true",
    };
    axios.post(`${APIPath}media/clear_tmp_files`, finalFileNames, {
      headers: headers,
    });
  };

  // Upload Chunk
  const uploadChunk = async (chunk) => {
    try {
      const formData = new FormData();
      formData.append("file", chunk);
      formData.append("id", counter);
      formData.append("fileName", fileGuid);

      const response = await axios.post(`${APIPath}media/chunk`, formData, {
        // params: {
        //   id: counter,
        //   fileName: fileGuid,
        // },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          admin: "true",
        },
      });
      // .then(data => {
      // }).catch(err => {
      // });
      const data = response.data;
      console.log("🚀 ~ uploadChunk ~ data:", data, fileNames, chunkCount);
      if (data && data.is_sucess) {
        setFileNames([...fileNames, data.file_name]);
        setBeginingOfTheChunk(endOfTheChunk);
        setEndOfTheChunk(endOfTheChunk + chunkSize);
        if (counter == chunkCount) {
          // let finalFileNames=[]
          await uploadCompleted([...fileNames, data.file_name]);
        } else {
          var percentage = (counter / chunkCount) * 100;
          setProgress(percentage);
        }
      } else {
        chunkTry = chunkTry + 1;
        if (chunkTry <= 3) {
          timer = setTimeout(() => {
            fileUpload();
          }, duration[chunkTry - 1]);
          console.log("after setting timer", timer);
        } else {
          setError("Failed");
          oneUpdated(index);
        }
      }
    } catch (error) {
      chunkTry = chunkTry + 1;
      if (chunkTry <= 3) {
        timer = setTimeout(() => {
          fileUpload();
        }, duration[chunkTry - 1]);
        console.log("after setting timer", timer);
      } else {
        setError("Failed");
        oneUpdated(index);
      }
    }
  };

  const getMediaType = (media) => {
    let mediaType = "";

    switch (media.type.split("/").shift()) {
      case "image":
        mediaType = "image";
        break;
      case "video":
        mediaType = "video";
        break;
      case "audio":
        mediaType = "audio";
        break;
      case "text":
        if (media.type == "text/csv") {
          mediaType = "csv";
        } else if (media.type == "text/plain") {
          mediaType = "txt";
        } else {
          mediaType = "other";
        }
        break;
      case "application":
        if (media.type == "application/pdf") {
          mediaType = "pdf";
        } else if (
          media.type ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          mediaType = "txt";
        } else if (
          media.type == "application/x-zip-compressed" ||
          media.type == "application/zip"
        ) {
          mediaType = "3d-zip";
        } else if (media.type == "application/vnd.ms-excel") {
          mediaType = "csv";
        } else {
          mediaType = "other";
        }
        break;
      default:
        mediaType = "other";
        break;
    }
    return mediaType;
  };

  // Upload Completion
  const uploadCompleted = async (finalFileNames) => {
    var formData = new FormData();
    formData.append("file_names[]", fileNames);
    // let fileNames = [];
    const mediaType = getMediaType(media);

    await axios
      .post(`${APIPath}media/complete`, finalFileNames, {
        params: {
          original_file_name: fileGuid,
          organization_id: authData.org_id,
          media_type: encodeURIComponent(mediaType),
          media_title: fileNewName == "" ? media.title : fileNewName,
          //  media.type,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: fileNames,
      })
      .then((response) => {
        if (response.status) {
          setProgress(100);
          oneUpdated(index);
        }
      })
      .catch((err) => {
        setError("Failed");
        oneUpdated(index);
        clearUploadedChunks(finalFileNames);
      });
  };

  // Reset Chunk Properties
  const resetChunkProperties = () => {
    setShowProgress(true);
    setProgress(0);
    setCounter(1);
    setBeginingOfTheChunk(0);
    setEndOfTheChunk(chunkSize);
  };

  // File Name Change
  const nameChanged = (event) => {
    event.preventDefault();
    if (event.target.value.replace(/\s+/g, " ").trim() == "") {
      setErrormessage(index, "add");
    } else {
      setErrormessage(index, "remove");
    }
    setFileNewName(event.target.value);
  };

  const uploadAWS = async () => {
    const awsResponse = await nodeInstance({
      url: `aws/requestUploadUrl`,
      method: "POST",
      data: {
        ext: `.${media.name.split(".").pop()}`,
        contentType: media.type,
        isPublic: true,
      },
    });
    await uploadFilesInstance(awsResponse.data.signedUrl, media, media.type);

    const mediaType = getMediaType(media);
    try {
      await nodeInstance({
        url: `media/create_aws_media`,
        method: "POST",
        data: {
          original_file_name: fileGuid,
          media_type: encodeURIComponent(mediaType),
          media_title: fileNewName == "" ? media.title : fileNewName,
          mime_type: media.type,
          byte_size: 1000,
          key: awsResponse.data.keyOrUrl,
        },
      });
      setProgress(100);
      oneUpdated(index);
    } catch {
      setError("Failed");
      oneUpdated(index);
    }
  };

  return (
    <div
      key={index}
      className="relative w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] mb-[50px] bg-white dark:bg-darkMainBg  rounded-xl"
    >
      <div className="relative w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] border border-gray2 dark:border-opacity-20 rounded-xl overflow-hidden">
        {media.type.split("/").shift() == "image" ? (
          <img
            src={URL.createObjectURL(media)}
            alt="type-images"
            className="w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] object-cover"
          />
        ) : media.type.split("/").shift() == "video" ? (
          <img
            src="../assets/images/file-type/image-video.png"
            alt="video"
            className="w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] object-cover"
          />
        ) : media.type.split("/").shift() == "audio" ? (
          <img
            src="../assets/images/file-type/image-audio.png"
            alt="audio"
            className="w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] object-cover"
          />
        ) : media.type.split("/").shift() == "application" ? (
          <>
            {media.type == "application/pdf" ? (
              <img
                src="../assets/images/file-type/image-pdf.png"
                alt="pdf"
                className="w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] object-cover"
              />
            ) : media.type ==
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
              <img
                src="../assets/images/file-type/image-txt.png"
                alt="txt"
                className="w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] object-cover"
              />
            ) : media.type == "application/x-zip-compressed" ||
              media.type == "application/zip" ? (
              <img
                src="../assets/images/file-type/image-zip.png"
                alt="zip"
                className="w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] object-cover"
              />
            ) : media.type == "application/vnd.ms-excel" ? (
              <img
                src="../assets/images/file-type/image-csv.png"
                alt="csv"
                className="w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] object-cover"
              />
            ) : (
              <img
                src="../assets/images/file-type/image-default.png"
                alt="other"
                className="w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] object-cover"
              />
            )}
          </>
        ) : media.type == "text/csv" ? (
          <img
            src="../assets/images/file-type/image-csv.png"
            alt="csv"
            className="w-[90px] xl:w-[100px] h-[90px] xl:h-[100px] object-cover"
          />
        ) : null}

        {/* Upload Status */}
        <div className="flex flex-col justify-center absolute top-0 left-0 w-full h-full bg-black3 bg-opacity-70 p-1">
          {startUploading.status ? (
            <>
              {error != "" ? (
                <div className="text-center text-xs text-danger">{error}</div>
              ) : (
                <>
                  {Number(progress.toFixed()) === 100 ? (
                    <div className="text-center text-xs text-white">
                      Uploaded
                    </div>
                  ) : (
                    <>
                      <div className="w-full bg-gray3 rounded-full dark:bg-gray2 mt-3">
                        <div
                          className="bg-primary text-white text-xs font-medium  text-center p-[2.5px] leading-none rounded-full"
                          style={{ width: `${progress.toFixed()}%` }}
                        >
                          {" "}
                        </div>
                      </div>
                      <div className="text-center text-xs text-white">{`${progress.toFixed()}%`}</div>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="text-center text-xs text-white">
              Ready to Upload
            </div>
          )}
        </div>
      </div>

      {/* File Name Input */}
      <div className="mt-1">
        <input
          type="text"
          id="procedure_media_title"
          name="procedure_media_title"
          className="w-[90px] xl:w-[100px] text-sm bg-opacity-60 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md px-2 py-1 focus:border-secondary focus:outline-none"
          placeholder="Title"
          disabled={startUploading.status}
          value={fileNewName}
          onChange={(e) => nameChanged(e)}
        />
      </div>
      {errors.includes(index) && (
        <div className="text-danger text-sm mt-1 ml-1">Enter Title</div>
      )}

      {!startUploading.status && (
        <button
          onClick={() => removeFromList(index)}
          className="flex flex-col items-center justify-center absolute -top-1 -right-1 w-6 h-6 bg-black2 dark:bg-darkMainBg text-white rounded-sm transition-all duration-300 hover:bg-danger dark:hover:bg-danger hover:transition-all hover:duration-300 focus:outline-0"
          title="Delete"
        >
          <img
            src="../assets/icons/icon-delete.svg"
            alt="icon-delete"
            className="w-4 h-4 invert"
          />
        </button>
      )}
    </div>
  );
}

export default FileUploader;
