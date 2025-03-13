import { useMemo, useState } from "react";
import { findRelevantPart } from "../../utils";

export const QueryFiles = ({
  files,
  redirect,
  open3D,
  databasesList,
  databaseId,
}) => {
  const [open, setOpen] = useState(true);

  const currentDB = useMemo(
    () => (databasesList || []).find((x) => x.id === databaseId),
    [databaseId, databasesList],
  );

  const manipulatedFiles = useMemo(
    () =>
      files.map((file) => {
        const part = (currentDB?.name || "").toLowerCase().includes("makino")
          ? findRelevantPart(file.highlight)
          : null;
        if (part) {
          return {
            ...file,
            part,
          };
        }
        return file;
      }),
    [files, currentDB],
  );

  return (
    <div className="pt-4">
      <div
        className="text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium py-2 flex items-center"
        onClick={() => setOpen(!open)}
      >
        <div>Files found in</div>
        <img
          className="w-3 h-3"
          src={
            !open
              ? "../assets/icons/caret-right-fill.svg"
              : "../assets/icons/caret-up-fill.svg"
          }
          alt="Arrow"
        />
      </div>
      {open && (
        <article className="border border-gray2 dark:border-opacity-50 rounded-2xl">
          {manipulatedFiles.map((file, index) => (
            <div
              key={index}
              className={`${
                index < manipulatedFiles.length - 1 && "border-b border-gray2"
              } grid p-4  dark:border-opacity-50`}
              style={{
                gridTemplateColumns: "30px auto",
                columnGap: "10px",
                alignItems: "center",
              }}
            >
              <img
                src={
                  file.part
                    ? "../assets/icons/icon-window-maximize.svg"
                    : "../assets/icons/icon-ai-pdf.svg"
                }
                alt=""
                class="flex-none rounded-md bg-slate-100"
              />
              <div class="min-w-0 relative flex-auto">
                <div
                  class="text-black2 dark:text-gray4 truncate cursor-pointer hover:text-secondary"
                  title={file.text}
                  onClick={() => redirect(file)}
                >
                  {file.highlight || file.text}
                </div>
                <div className="flex gap-2">
                  <div class="text-xs text-black3 text-opacity-75 dark:text-gray3 truncate">
                    Page: {file.pagenumber} {file.filename}
                  </div>
                  {file.part && (
                    <div
                      onClick={() => open3D(file.part)}
                      className="text-primary text-opacity-75 text-xs font-medium hover:text-opacity-100 hover:transition-all hover:duration-300 cursor-pointer"
                    >
                      View 3D
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </article>
      )}
    </div>
  );
};
