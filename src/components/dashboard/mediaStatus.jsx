import React, { useState } from "react";

const MediaStatus = ({ system_overview }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [tooltipId, setTooltipId] = useState(null);

  const handleMouseEnter = (id) => {
    setIsHovered(true);
    setTooltipId(id);
  }
  const handleMouseLeave = (id) => {
    setIsHovered(false);
    setTooltipId(id);
  }

  // Medias
  const medias = [
    { id: 1, title: 'Images', count: system_overview && system_overview.image, tooltipText: 'Includes file extensions of .jpeg/jpg, .png, .gif, .svg, .webp etc...' },
    { id: 2, title: "Documents", count: system_overview && system_overview.document, tooltipText: 'Includes file extensions of .text, .csv, .pdf etc...' },
    { id: 3, title: "3D/ZIP", count: system_overview && system_overview.zip, tooltipText: 'Includes file extensions of .zip' },
    { id: 4, title: "Audios", count: system_overview && system_overview.audio, tooltipText: 'Includes file extensions of .mp3, .aac, .wav etc...' },
    { id: 5, title: "Videos", count: system_overview && system_overview.video, tooltipText: 'Includes file extensions of .mp4, mov, .avi, .wmv, .webm etc...' },
    { id: 6, title: "Others", count: system_overview && system_overview.others, tooltipText: 'Get all other media files saved here' },
  ]

  return (
    <>
      <div className="w-full h-full bg-white dark:bg-darkBg border border-gray2 dark:border-opacity-10 p-8 rounded-3xl drop-shadow-md dark:dorp-shadow-none">
        <div className="flex items-center mb-5">
          <img src="../assets/icons/icon-file.svg" alt="icon-medias" className="w-[28px] h-[28px]" />
          <div className="ml-2 font-semibold text-navyblue1 dark:text-gray4">System Media</div>
        </div>

        {medias.map((media, index) => {
          const { title, count, id, tooltipText } = media;
          return (
            <div className="flex items-center mb-2" key={index}>
              <div className="flex items-center relative text-sm text-black2 text-opacity-75 dark:text-gray4 font-medium">
                {title}
                {tooltipText &&
                  <>
                    <span onMouseEnter={() => handleMouseEnter(id)} onMouseLeave={() => handleMouseLeave(id)} className="ml-2">
                      <img src="/assets/icons/icon-info.svg" alt="icon-info" className="invert-[50%]" />
                    </span>
                    {isHovered && tooltipId == id ?
                      <div className={`absolute z-20 min-w-[250px] xl:min-w-[160px] 2xl:min-w-[250px] left-[75px] w-full text-xs leading-snug rounded-md text-gray3 dark:text-gray5 bg-gray4 dark:bg-darkMainBg py-4 px-4 drop-shadow-sm ${id == 2 && "left-[100px]"}`}>
                        {tooltipText}
                      </div>
                      : ""
                    }
                  </>
                }
              </div>
              <div className="text-black2 dark:text-gray4 font-medium ml-auto">{count}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default MediaStatus;