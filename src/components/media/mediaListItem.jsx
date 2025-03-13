import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { FileTypes } from "./../../helpers";
import VideoThumbnail from "react-video-thumbnail";

pdfjs.GlobalWorkerOptions.workerSrc = `node_modules/pdfjs-dist/build/pdf.worker.js`;

const FileImages = {
  [FileTypes.pdf]: "../assets/icons/icon-pdf.svg",
  [FileTypes["3dZip"]]: "../assets/icons/icon-zip.svg",
  [FileTypes.video]: "../assets/icons/icon-video.svg",
  [FileTypes.image]: "../assets/icons/icon-image.svg",
};

export const MediaItemList = ({
  media,
  openViewer,
  confirmUpdateMedia,
  hasEditPermission,
  deleteMedia,
}) => {
  const { url, thumb_url, id, title, file_type } = media;

  return (
    <div className="flex flex-col justify-start relative mt-2 mb-[20px] w-[100px] xl:w-[120px]">
      <div className="relative w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] bg-gray4 dark:bg-darkMainBg rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={(e) => openViewer(e, url, file_type, title)}
          target="_blank"
          rel="noreferrer"
          className="text-black overflow-hidden"
        >
          <div className="w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] bg-gray4 dark:bg-darkMainBg border border-gray2 dark:border-darkMainBg rounded-xl overflow-hidden">
            {file_type === FileTypes.image ? (
              <img
                src={url}
                alt={title}
                className="w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] object-cover object-center rounded-xl"
              />
            ) : file_type === FileTypes.pdf ? (
              <Document file={url} className="pdf-preview">
                <Page pageNumber={1} customTextRenderer={null} />
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
                className="w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] object-cover object-center rounded-xl"
              />
            )}
          </div>

          <div className="flex flex-col items-end justify-end absolute top-0 -right-[1px] bottom-0 z-2 w-full h-full bg-black3 bg-opacity-20 border border-gray2 dark:border-darkMainBg rounded-xl transition-all duration-300 hover:bg-opacity-10 hover:transition-all">
            {FileImages[file_type] && (
              <img
                src={FileImages[file_type]}
                alt={file_type}
                className="w-[40px] h-[20px] rounded-tl-lg"
              />
            )}
          </div>
        </button>
      </div>
      <div
        className="text-sm dark:text-gray2 font-medium capitalize px-2 mt-1 line-clamp-2"
        title={title}
      >
        {" "}
        {title}{" "}
      </div>
      {hasEditPermission && confirmUpdateMedia && (
        <button
          type="button"
          onClick={() => confirmUpdateMedia(true, id, media)}
          className="flex flex-col items-center justify-center absolute -top-2 -right-1 w-6 h-6 bg-black2 dark:bg-darkMainBg text-white rounded-sm transition-all hover:bg-primary dark:hover:bg-primary hover:transition-all"
          title="Edit"
        >
          <img
            src="../assets/icons/icon-edit.svg"
            alt="icon-edit"
            className="w-3 h-3 invert"
          />
        </button>
      )}
      {deleteMedia && (
        <button
          type="button"
          onClick={() => deleteMedia(media)}
          className="flex flex-col items-center justify-center absolute -top-2 -right-1 w-6 h-6 bg-black2 dark:bg-darkMainBg text-white rounded-sm transition-all hover:bg-primary dark:hover:bg-primary hover:transition-all"
          title="Edit"
        >
          <img
            src="../assets/icons/icon-delete.svg"
            alt="icon-edit"
            className="w-3 h-3 invert"
          />
        </button>
      )}
    </div>
  );
};
