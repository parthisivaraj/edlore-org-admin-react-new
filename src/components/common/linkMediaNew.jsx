import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMedias } from "../../redux/reduxes/medias/mediasAction";
import AddNewMediaTabs from "../media/addNewMediaTabs";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "./pagination";
import ImageViewer from "./imageViewer";
import PermissionsMessage from "./permissionsMessage";
import { Document, Page } from "react-pdf";
import { FileTypes } from "../../helpers";
import VideoThumbnail from "react-video-thumbnail";

const LinkMedia = ({
  selectedFilesIds,
  updateTheSelected,
  limit,
  showOnly,
  type,
  typeId,
  model_id,
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

  // Dispatch Media
  useEffect(() => {
    const mediaData = {
      page: 0,
      limit: limit,
      search: "",
      organization_id: authData.org_id,
      showOnly: showOnly != "all" ? showOnly : "",
      type: type,
      typeId: typeId,
      model_id: model_id,
      name: "",
    };
    dispatch(getAllMedias(mediaData));
  }, [typeId]);

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

  // OnChange Handler
  const fileChangeHandler = (event, data) => {
    if (event.target.checked) {
      updateTheSelected([...selectedFilesIds, data.id]);
    } else {
      updateTheSelected(selectedFilesIds.filter((id) => id !== data.id));
    }
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

  // Image Viewer
  const [showMedia, setShowMedia] = useState(false);
  const [showingMedia, setShowingMedia] = useState("");
  const [showingMediaTitle, setShowingMediaTitle] = useState("");

  const openViewer = (e, file_type, url, title) => {
    if (file_type == "image") {
      setShowMedia(true);
      setShowingMedia(url);
      setShowingMediaTitle(title);
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <div>
        {/* Upload New Media */}
        {(permissions.includes("all_media") ||
          permissions.includes("write_media") ||
          permissions.includes("Admin")) && (
          <div className="relative h-[108px]">
            <div className="absolute top-0 left-0 w-full flex items-center justify-between bg-white dark:bg-darkMainBg  dark:text-gray2 border border-gray2 dark:border-opacity-40 rounded-xl md:p-4 xl:p-8 cursor-pointer">
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
              {/* <div className="relative before:content:[''] before:absolute before:left-2.5 before:-top-6 before:h-5 before:border before:border-dashed before:border-gray2 after:content:[''] after:absolute after:left-2.5 after:-bottom-6 after:h-5 after:border after:border-dashed after:border-gray2">OR</div> */}
              <button
                type="button"
                onClick={() => setShowFileUploader(true)}
                className="bg-primary text-white text-sm font-medium border border-primary rounded-full py-1.5 xl:py-2 px-4 xl:px-6 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0"
              >
                Add File
              </button>
            </div>
          </div>
        )}

        {/* Link from Existing Media Library */}
        <div className="relative mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="md:text-sm xl:text-base font-medium md:mr-3 dark:text-gray2">
                Link from library
              </div>
              <div className="relative  overflow-hidden">
                <input
                  type="search"
                  className="md:w-[250px] xl:w-[350px] bg-white dark:bg-darkBg dark:text-gray2 bg-opacity-60 dark:bg-opacity-100 text-sm px-4 py-2.5 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
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
              <div className="w-full h-[400px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                <div className="flex items-stretch flex-wrap">
                  {allMediasLoading ? (
                    <Skeleton
                      width={120}
                      height={120}
                      count={40}
                      baseColor="#ebebeb"
                      highlightColor="#e1e1e1"
                      borderRadius="10px"
                      enableAnimation="true"
                      duration={2.5}
                      containerClassName="flex flex-wrap gap-3 z-0"
                      className="dark:bg-darkMainBg"
                    />
                  ) : (
                    <>
                      {allMedias && allMedias.length > 0 ? (
                        <div className="flex items-start flex-wrap w-full h-full gap-x-4">
                          {allMedias.map((file, index) => {
                            const { file_type, url, thumb_url, title, id } =
                              file;
                            return (
                              <div
                                key={id}
                                className="flex flex-col justify-start relative mt-2 mb-[20px] w-[100px] xl:w-[120px]"
                              >
                                <label className="relative w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] bg-white dark:bg-darkMainBg border border-gray2 dark:border-darkBg rounded-xl select-none cursor-pointer">
                                  <div className="w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] rounded-xl overflow-hidden">
                                    {file_type == "image" ? (
                                      <img
                                        src={url}
                                        alt={title}
                                        className="w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] object-cover object-center"
                                      />
                                    ) : file_type === "pdf" ? (
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
                                        className="w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] object-cover object-center"
                                      />
                                    )}
                                  </div>

                                  <div className="flex flex-col items-end justify-end absolute -right-[2px] -bottom-[2px] z-2 w-full h-full bg-black3 dark:bg-darkMainBg bg-opacity-20 dark:bg-opacity-20 rounded-xl transition-all duration-300 hover:bg-opacity-10 hover:transition-all">
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
                                    type="checkbox"
                                    id="procedure_media_upload"
                                    name="procedure_media_upload"
                                    className="absolute -top-1 -right-1.5 w-5 h-5"
                                    // value={id}
                                    checked={selectedFilesIds.includes(id)}
                                    onChange={(e) => fileChangeHandler(e, file)}
                                  />
                                </label>

                                <button
                                  type="button"
                                  onClick={(e) =>
                                    openViewer(e, file_type, url, title)
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                  title={title}
                                  className="w-[120px] h-[40px] text-sm dark:text-gray2 text-left capitalize px-2 mt-1 line-clamp-2 cursor-pointer transition-all duration-300 hover:text-primary dark:hover:text-primary hover:underline hover:transition-all hover:duration-300 focus:outline-0"
                                >
                                  {title}
                                </button>
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
      </div>

      {/* Add New Media Tabs Modal */}
      <AddNewMediaTabs
        addNewMediaModal={showFileUploader}
        setAddNewMediaModal={setShowFileUploader}
        uploadType="all"
        showOnly={showOnly}
      />

      {/* Image Viewer */}
      {showMedia && (
        <ImageViewer
          showMedia={showMedia}
          setShowMedia={setShowMedia}
          showingMedia={showingMedia}
          alt={showingMediaTitle}
        />
      )}
    </>
  );
};

export default LinkMedia;
