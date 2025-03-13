import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import ImageViewer from "../../components/common/imageViewer";
import { MediaItemList } from "./mediaListItem";
import InfiniteScroll from "react-infinite-scroll-component";

export const MediaList = ({
  mediasLoading,
  medias,
  pagination,
  searchQuery,
  setAddNewMediaModal,
  handlePageClick,
  confirmUpdateMedia,
}) => {
  // Fetch Auth Data
  const permissions = useSelector((state) => state.auth.allPermissions);

  const hasEditPermission = useMemo(
    () =>
      permissions.includes("all_media") ||
      permissions.includes("update_media") ||
      permissions.includes("Admin"),
    [permissions],
  );

  // Image Viewer
  const [showMedia, setShowMedia] = useState(false);
  const [showingMedia, setShowingMedia] = useState("");
  const [showingMediaTitle, setShowingMediaTitle] = useState("");

  const openViewer = (e, url, file_type, title) => {
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
      {/* Media Library */}
      <div
        id="scrollableDiv"
        className="w-full min-h-[500px] h-full xl:h-[500px] overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl"
      >
        {mediasLoading && medias.length === 0 && (
          <div className="flex items-stretch flex-wrap">
            <Skeleton
              width={120}
              height={130}
              count={25}
              baseColor="#ebebeb"
              highlightColor="#e1e1e1"
              borderRadius="10px"
              className="mb-3 dark:bg-darkMainBg"
              enableAnimation="true"
              duration={2.5}
              containerClassName="flex flex-wrap gap-3"
            />
          </div>
        )}
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          dataLength={medias.length || 10}
          next={handlePageClick}
          hasMore={medias.length < pagination.total_entries} // Replace with a condition based on your data source
          loader={
            <div className="flex items-stretch flex-wrap">
              <Skeleton
                width={120}
                height={130}
                count={25}
                baseColor="#ebebeb"
                highlightColor="#e1e1e1"
                borderRadius="10px"
                className="mb-3 dark:bg-darkMainBg"
                enableAnimation="true"
                duration={2.5}
                containerClassName="flex flex-wrap gap-3"
              />
            </div>
          }
        >
          <div className="flex items-start flex-wrap w-full gap-x-4">
            {medias.map((media) => {
              return (
                <MediaItemList
                  media={media}
                  key={media.id}
                  openViewer={openViewer}
                  confirmUpdateMedia={confirmUpdateMedia}
                  hasEditPermission={hasEditPermission}
                />
              );
            })}
            {!mediasLoading && medias.length === 0 && (
              <>
                {searchQuery ? (
                  <div className="w-full my-40 text-center text-danger">
                    No Search Results Found
                  </div>
                ) : (
                  <>
                    {/* If no data found, display the below info */}
                    <div className="w-full text-center my-40">
                      <h4 className="dark:text-gray2 text-2xl font-bold mb-2">
                        Upload media and documents here
                      </h4>
                      <p className="text-lg text-gray3 dark:text-gray2 mb-5">
                        Media and documents uploaded here{" "}
                        <br className="hidden xl:block" /> can be linked to
                        devices
                      </p>

                      {(permissions.includes("all_media") ||
                        permissions.includes("write_media") ||
                        permissions.includes("Admin")) && (
                        <button
                          type="button"
                          onClick={() => setAddNewMediaModal(true)}
                          className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-8 py-2 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all focus-visible:outline-none"
                        >
                          Upload New Media +
                        </button>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </InfiniteScroll>
      </div>

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
