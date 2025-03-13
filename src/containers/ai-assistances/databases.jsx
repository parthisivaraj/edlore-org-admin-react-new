import React, { useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../layout";
import { AddNewDatabase } from "../../components/databases/addNewDatabase";
import {
  deleteDatabase,
  deleteDatabaseDocument,
  getAllDatabases,
  setDatabaseDetails,
  setDatabaseModal,
  updateDatabase,
} from "../../redux/reduxes/databases/datebaseAction";
import { MediaItemList } from "../../components/media/mediaListItem";
import { FileTypes } from "../../helpers";
import DeleteDatabaseConfirmation from "./deleteDatabaseModal";

export const AIAssistanceDatabases = () => {
  const dispatch = useDispatch();

  const processing = useSelector((state) => state.databases.processing);
  const databasesList = useSelector((state) => state.databases.databasesList);
  const pendingFiles = useSelector((state) => state.databases.pedningFiles);

  // Add a New Database Modal
  const showModal = useSelector((state) => state.databases.showDatabaseModal);

  // Details
  const details = useSelector((state) => state.databases.details);

  const medias = useMemo(
    () =>
      (details?.documents || []).map((item) => ({
        url: item.url,
        title: item.fileName,
        file_type: FileTypes.pdf,
      })),
    [details],
  );

  const selectedIndex = useMemo(
    () => (databasesList || []).findIndex((x) => x.id === details?.id),
    [details, databasesList],
  );

  const [files, setFiles] = useState([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const inProgressFiles = useMemo(() => {
    const pendings = Object.keys(pendingFiles);
    return files.filter((x) => pendings.includes(x.toLowerCase()));
  }, [files, pendingFiles]);

  const [uploadErrors, setUploadErrors] = useState({
    files: "",
    sizeExceeds: [],
  });

  useEffect(() => {
    dispatch(getAllDatabases());
  }, []);

  // Set Modal
  const showDatabaseModal = (stat) => {
    dispatch(setDatabaseModal(stat));
  };

  const tabChangeHandler = (index) => {
    dispatch(setDatabaseDetails({ ...databasesList[index] }));
  };

  const readPDF = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      dispatch(
        updateDatabase({
          loadData: e.target.result,
          id: details?.id,
          file: file,
          fileName: file.name,
        }),
      );
    };
    fileReader.readAsArrayBuffer(file);
  };

  // Select Files
  const selectedFiles = (e) => {
    let statefile = Array.prototype.slice.call(e.target.files);
    let clearedHeaveyFiles = [];
    let errors = { ...uploadErrors };
    errors.files = "";
    errors.sizeExceeds = [];
    statefile.forEach((file) => {
      if (file.size < 25 * 1024 * 1024) {
        if (clearedHeaveyFiles.length < 25) {
          readPDF(file);
          clearedHeaveyFiles.push(file.name);
        } else {
          errors.files = "Cannot upload more than 25 files at once";
        }
      } else {
        errors.sizeExceeds = [
          ...errors.sizeExceeds,
          `${file.name} file is exceeding the size of 2GB.`,
        ];
      }
    });
    setFiles([...files, ...clearedHeaveyFiles]);
    setUploadErrors(errors);
    e.target.value = null;
  };

  const deleteDocument = (document) => {
    dispatch(
      deleteDatabaseDocument({
        id: details?.id,
        document: document.url,
      }),
    );
  };

  const openViewer = (_, url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (processing !== "Deleting" && isDeleteModalOpen) {
      setDeleteModalOpen(false);
    }
  }, [processing]);


  const handleDeleteDatabase = async () => {
    if (details && details.id) {
      await dispatch(deleteDatabase({ id: details.id }));
    }
  
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>AI Assistance - Databases</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid xl:grid-cols-2 xl:gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img
                    src="../assets/icons/icon-devices.svg"
                    alt="icon-devices"
                    className="invert dark:invert-0 w-4 h-4 opacity-50"
                  />
                  <div className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                    AI Assistance /
                  </div>
                  <span className="ml-1 text-xs text-secondary font-semibold">
                    {" "}
                    All Database
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  Databases
                </h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                <button
                  onClick={() => showDatabaseModal(true)}
                  className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0"
                >
                  Add New Database +
                </button>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          <div>
            <div className="grid grid-cols-1 relative">
              {/* Sub Tabs : Start */}
              <Tab.Group
                as="div"
                vertical
                manual
                selectedIndex={selectedIndex}
                onChange={(index) => tabChangeHandler(index)}
                className="flex md:flex-col xl:flex-row w-full min-h-[700px] h-full bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md"
              >
                <Tab.List className="flex md:flex-row xl:flex-col items-start xl:justify-between w-full xl:w-[25%] 2xl:w-[20%]  bg-gray4 dark:bg-black1 dark:bg-opacity-50 rounded-2xl xl:rounded-r-none p-3 2xl:p-4 overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <div className="flex flex-row xl:flex-col items-start xl:justify-between xl:w-full relative">
                    {databasesList.map((item) => {
                      return (
                        <Tab
                          key={item.id}
                          className={({ selected }) =>
                            selected
                              ? 'w-full xl:flex items-center relative bg-white dark:bg-opacity-10 text-black2 dark:text-gray2 text-base font-medium md:text-center xl:text-left px-4 2xl:px-6 py-3 2xl:py-4 mb-2 xl:mb-0 rounded-xl whitespace-nowrap xl:before:content-[""]  xl:before:absolute xl:before:left-[6px] 2xl:before:left-[12px] xl:before:w-[4px] xl:before:h-[28%] xl:before:bg-primary xl:before:rounded-full focus:outline-0 focus-visible:ring-0'
                              : "w-full xl:flex items-center md:text-center xl:text-left text-black2 dark:text-gray2 opacity-50 text-base font-medium px-4 2xl:px-6 py-3 2xl:py-4 mb-2 xl:mb-0 whitespace-nowrap transition-all duration-300 hover:duration-300 hover:opacity-100 focus:outline-none focus-visible:ring-0"
                          }
                        >
                          <span>{item.name}</span>
                          <img
                            src="../assets/icons/icon-arrow-right.svg"
                            alt="icon-arrow-right"
                            className="md:hidden xl:block ml-auto dark:invert"
                          />
                        </Tab>
                      );
                    })}
                  </div>
                </Tab.List>

                {details?.id && (
                  <Tab.Panels className="w-full xl:w-[75%] 2xl:w-[80%] min-h-[700px] h-full py-6  overflow-hidden">
                    <Tab.Panel static>
                      <div className="container mx-auto px-4 sm:px-6 lg:px-8 dark:text-gray2">
                        <div className="flex items-center justify-between mb-8">
                          <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold capitalize w-[400px] text-ellipsis overflow-hidden whitespace-nowrap">
                            {details?.name}
                          </h1>
                          <button
                            className="text-danger text-sm font-medium underline hover:text-danger-dark focus:outline-none ml-5"
                            onClick={() => setDeleteModalOpen(true)}
                          >
                            Delete Database
                          </button>
                        </div>

                        <div className="relative h-[108px]">
                          <input
                            type="file"
                            id="add_new_media"
                            name="add_new_media"
                            className="absolute z-20 w-full h-[108px] opacity-0  cursor-pointer"
                            multiple
                            accept={"application/pdf"}
                            onChange={(e) => selectedFiles(e)}
                          />
                          <div className="absolute top-0 left-0 w-full flex items-center justify-between bg-white dark:bg-darkMainBg border border-dashed border-gray2 dark:border-opacity-20 rounded-xl p-8">
                            <div className="flex items-center">
                              <img
                                src="../assets/images/devices/folder.png"
                                alt="icon-file"
                              />
                              <span className="ml-4 text-sm opacity-75 leading-tight">
                                Add or drag your documents <br /> here to start
                                uploading
                              </span>
                            </div>
                            <div className="bg-primary text-white text-sm border border-primary rounded-full py-1.5 px-6 shadow-sm transition-all hover:bg-transparent hover:text-primary hover:transition-all">
                              Browse files
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium flex justify-between py-2">
                          <div>Supported format(s): .pdf</div>
                          <div>Maximum size: 25MB</div>
                        </div>
                        {uploadErrors.files && (
                          <div className="text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium flex justify-between my-6">
                            <div>{uploadErrors.files}</div>
                          </div>
                        )}
                        {uploadErrors.sizeExceeds.length > 0 && (
                          <div className="text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium flex justify-between  my-6">
                            <div>
                              {uploadErrors.sizeExceeds.map((item) => (
                                <div key={item}>{item}</div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex my-5 w-full flex-col border-t border-gray2 dark:border-opacity-50">
                          {inProgressFiles.map((item) => (
                            <div
                              key={item}
                              className="w-full py-3 flex items-center text-sm border-b border-gray2 dark:border-opacity-20"
                            >
                              <div role="status">
                                <svg
                                  aria-hidden="true"
                                  className="w-4 h-4  animate-spin fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="white"
                                  />
                                </svg>
                                <span className="sr-only">Loading...</span>
                              </div>
                              <div className="ml-1">{item}</div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div className="flex">
                            <h1 className="text-xl text-black dark:text-gray2 font-bold">
                              Files ·{" "}
                              <span className=" text-black3 text-opacity-75 dark:text-gray3">
                                {medias.length}
                              </span>
                            </h1>
                          </div>
                          <div className="flex items-start flex-wrap w-full gap-x-4 my-5">
                            {medias.map((media) => {
                              return (
                                <MediaItemList
                                  media={media}
                                  key={media.url}
                                  hasEditPermission={false}
                                  deleteMedia={() => deleteDocument(media)}
                                  openViewer={openViewer}
                                />
                              );
                            })}
                            {medias.length === 0 && (
                              <>
                                {/* If no data found, display the below info */}
                                <div
                                  className="w-full text-center"
                                  style={{ margin: "8rem auto" }}
                                >
                                  <p className="text-lg text-gray3 dark:text-gray2 mb-5">
                                    No documents uploaded for
                                    <br className="hidden xl:block" />{" "}
                                    {details?.name}
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                )}
              </Tab.Group>
              {/* Sub Tabs : End */}
            </div>
          </div>

          {/* Add a New Database Model : Start */}
          {showModal && <AddNewDatabase />}
          {/* Add a New Database Model : End */}

          <DeleteDatabaseConfirmation
              isDeleteModalOpen={isDeleteModalOpen}
              setDeleteModalOpen={setDeleteModalOpen}
              handleDeleteDatabase={handleDeleteDatabase}
              />
        </section>
      </Layout>
    </>
  );
};
