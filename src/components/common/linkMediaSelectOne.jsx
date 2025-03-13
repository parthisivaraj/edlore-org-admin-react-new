import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMedias } from "../../redux/reduxes/medias/mediasAction";
import AddNewMediaTabs from "../media/addNewMediaTabs";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import PermissionsMessage from "./permissionsMessage";
import { Document, Page } from "react-pdf";
import VideoThumbnail from "react-video-thumbnail";
import { FileTypes } from "../../helpers";

const LinkMedia = ({
  procedure_id,
  model_id,
  attatchedMedias,
  alreadyLinkedFiles,
  setTheUnlinking,
  setTheLinking,
  removeTheUnlinking,
  removeTheLinking,
  select,
  selectedFileId,
  changingTheMediaId,
  limit,
  showOnly,
  type,
  typeId,
}) => {
  const dispatch = useDispatch();

  // Fetch Data
  const authData = useSelector((state) => state.auth.authData);
  const allMediasLoading = useSelector(
    (state) => state.medias.allMediasLoading,
  );
  const allMedias = useSelector((state) => state.medias.allMedias);
  const pagination = useSelector((state) => state.medias.allMediasPagination);
  const permissions = useSelector((state) => state.auth.allPermissions);

  const [showFileUploader, setShowFileUploader] = useState(false);

  // States
  const [state, setState] = useState({
    medias: [],
    stepFiles: [],
  });

  // Dispatch Media
  useEffect(() => {
    const mediaData = {
      page: 0,
      limit: limit,
      search: "",
      organization_id: authData.org_id,
      showOnly: showOnly,
      type: type,
      typeId: typeId,
      model_id: model_id,
    };
    dispatch(getAllMedias(mediaData));
  }, []);

  // Media Files in Steps
  useEffect(() => {
    let stpFiles = [];
    attatchedMedias &&
      attatchedMedias.length > 0 &&
      attatchedMedias.forEach((media) => {
        stpFiles.push(media.active_storage_attachment_id);
      });
    setState((prevProps) => ({
      ...prevProps,
      stepFiles: stpFiles,
    }));
  }, [attatchedMedias]);

  // Search Handler
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (searchData) => {
    setSearchQuery(searchData);
    const data = {
      search: searchData,
      page: 0,
      limit: limit,
      organization_id: authData.org_id,
      showOnly: showOnly,
      type: type,
      typeId: typeId,
      model_id: model_id,
    };
    dispatch(getAllMedias(data));
  };

  const onChangeCheckbox = (event, id) => {
    if (event.target.value == "on") {
    }
    changingTheMediaId(id);
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: "",
      page: e.selected,
      limit: limit,
      organization_id: authData.org_id,
      showOnly: showOnly,
      type: type,
      typeId: typeId,
      model_id: model_id,
    };
    dispatch(getAllMedias(data));
  };

  return (
    <>
      {(permissions.includes("all_media") ||
        permissions.includes("write_media") ||
        permissions.includes("Admin")) && (
        <>
          {/* Upload New Media */}
          <div className="relative h-[108px]">
            <div className="absolute top-0 left-0 w-full flex items-center justify-between bg-white dark:bg-darkMainBg  border border-gray2 dark:border-opacity-20 rounded-xl p-4 xl:p-6 2xl:p-8">
              <div className="flex items-center">
                <img
                  src="../assets/images/devices/folder.png"
                  alt="icon-file"
                />
                <span className="ml-4 text-sm opacity-75 leading-tight">
                  Add your documents, photos, or videos <br /> here to start
                  uploading
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowFileUploader(true)}
                className="bg-primary text-white md:text-sm text-sm font-medium border border-primary rounded-full py-1.5 xl:py-2 px-4 xl:px-6 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0"
              >
                Add File
              </button>
            </div>
          </div>
        </>
      )}

      {/* Link from Existing Media Library */}
      <div className="relative mt-4 2xl:mt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="md:text-sm xl:text-base font-medium md:mr-3">
              Link from library
            </div>
            <div className="relative  overflow-hidden">
              <input
                type="search"
                className="w-[350px] bg-white dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 text-sm px-4 py-2.5 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                name="media_search"
                id="media_search"
                placeholder="Search for media and documents..."
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <div className="absolute top-3.5 right-4 block m-auto focus-visible:outline-none">
                <img
                  src="../assets/icons/icon-search.svg"
                  alt="icon-search"
                  className="w-4 h-4 block m-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Existing Media Files */}
        {!(
          permissions.includes("all_media") ||
          permissions.includes("read_media") ||
          permissions.includes("Admin")
        ) ? (
          <PermissionsMessage
            additionalClassName="h-full py-[80px]"
            title="Media Library"
            message="read media"
          />
        ) : (
          <>
            <div className="w-full h-[160px] 2xl:h-[200px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
              <div className="flex items-stretch flex-wrap">
                {allMediasLoading ? (
                  <Skeleton
                    width={120}
                    height={120}
                    count={20}
                    baseColor="#ebebeb"
                    highlightColor="#e1e1e1"
                    borderRadius="10px"
                    enableAnimation="true"
                    duration={2.5}
                    containerClassName="flex flex-wrap gap-3"
                    className="dark:bg-darkMainBg"
                  />
                ) : (
                  <>
                    {allMedias && allMedias.length > 0 ? (
                      <div className="flex items-start flex-wrap w-full h-full gap-x-4">
                        {allMedias.map((file, index) => {
                          const { file_type, thumb_url, url, title, id } = file;
                          return (
                            <div className="flex flex-col justify-start relative mt-2 mb-[20px] w-[100px] 2xl:w-[120px] h-[130px] 2xl:h-[160px]">
                              <label
                                key={id}
                                className="relative w-[100px] 2xl:w-[120px] h-[100px] 2xl:h-[120px] bg-white dark:bg-darkMainBg border border-gray2 dark:border-darkBg rounded-xl cursor-pointer select-none"
                              >
                                <div className="w-[100px] 2xl:w-[120px] h-[100px] 2xl:h-[120px] dark:bg-darkMainBg dark:border dark:border-darkBg rounded-xl overflow-hidden">
                                  {file_type === "pdf" ? (
                                    <Document
                                      file={url}
                                      className="pdf-preview"
                                    >
                                      <Page
                                        pageNumber={1}
                                        customTextRenderer={null}
                                      />
                                    </Document>
                                  ) : file_type === FileTypes.video ? (
                                    <VideoThumbnail
                                      videoUrl={url}
                                      className="w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] object-cover object-center rounded-xl"
                                    />
                                  ) : (
                                    <img
                                      src={thumb_url}
                                      alt={title}
                                      className="w-[100px] 2xl:w-[120px] h-[100px] 2xl:h-[120px] object-cover"
                                    />
                                  )}
                                </div>

                                <div className="flex flex-col items-end justify-end absolute -right-[1px] -bottom-[1px] z-2 w-full h-full bg-black3 dark:bg-darkMainBg bg-opacity-20 dark:bg-opacity-20 rounded-xl transition-all duration-300 hover:bg-opacity-10 hover:transition-all">
                                  {file_type == "pdf" ? (
                                    <img
                                      src="../assets/icons/icon-pdf.svg"
                                      alt="icon-pdf"
                                      className="w-[40px] h-[20px] rounded-tl-lg rounded-br-lg"
                                    />
                                  ) : file_type == "3d-zip" ? (
                                    <img
                                      src="../assets/icons/icon-zip.svg"
                                      alt="icon-zip"
                                      className="w-[40px] h-[20px] rounded-tl-lg rounded-br-lg"
                                    />
                                  ) : file_type == "video" ? (
                                    <img
                                      src="../assets/icons/icon-video.svg"
                                      alt="icon-video"
                                      className="w-[40px] h-[20px] rounded-tl-lg rounded-br-lg"
                                    />
                                  ) : file_type == "image" ? (
                                    <img
                                      src="../assets/icons/icon-image.svg"
                                      alt="icon-img"
                                      className="w-[40px] h-[20px] rounded-tl-lg rounded-br-lg"
                                    />
                                  ) : null}
                                </div>

                                <input
                                  type="radio"
                                  id="procedure_media_upload"
                                  name="procedure_media_upload"
                                  className="absolute -top-1 -right-1.5 appearance-none w-[20px] 2xl:w-[22px] h-[20px] 2xl:h-[22px] text-base font-medium bg-gray2 border-[3px] border-white ring-2 ring-gray2 rounded-full transition-all checked:bg-primary checked:ring-primary"
                                  // className=""
                                  // value={id}
                                  checked={
                                    selectedFileId &&
                                    id == selectedFileId &&
                                    "checked"
                                  }
                                  onChange={(e) => onChangeCheckbox(e, id)}
                                />
                              </label>
                              <div className="text-sm dark:text-gray2 capitalize px-2 mt-1">
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="line-clamp-2 transition-all duration-300 hover:text-primary hover:underline hover:duration-300 hover:transition-all"
                                  title={title}
                                >
                                  {title}{" "}
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : searchQuery !== "" && allMedias.length <= 0 ? (
                      <div className="w-full text-center text-danger py-12">
                        No Search Results Found
                      </div>
                    ) : (
                      <div className="w-full text-center text-danger py-12">
                        No Medias Found
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-8 px-4">
              {allMediasLoading ? (
                <Skeleton
                  count={1}
                  width={200}
                  height={40}
                  baseColor="#fafafa"
                  highlightColor="#e1e1e1"
                  borderRadius="30"
                  enableAnimation="true"
                  duration={2.5}
                  inline={true}
                  className=" dark:bg-darkMainBg"
                />
              ) : (
                <PaginatedItems
                  itemsPerPage={pagination && pagination.per_page}
                  handlePageClick={handlePageClick}
                  pageCount={
                    pagination &&
                    Math.ceil(pagination.total_entries / pagination.per_page)
                  }
                  current_page={pagination && pagination.current_page}
                  totalEntries={pagination && pagination.total_entries}
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* Add New Media Tabs Modal */}
      <AddNewMediaTabs
        addNewMediaModal={showFileUploader}
        setAddNewMediaModal={setShowFileUploader}
        uploadType={showOnly}
      />
    </>
  );
};

export default LinkMedia;
