import React, { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMedias } from "../../redux/reduxes/medias/mediasAction";
import AddNewMediaTabs from "../media/addNewMediaTabs";
import Skeleton from "react-loading-skeleton";
import PaginatedItems from "../../components/common/pagination";
import PermissionsMessage from "./permissionsMessage";

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
  limit,
  showOnly,
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
    };
    dispatch(getAllMedias(data));
  };

  // OnChange Handler
  const fileChangeHandler = (event, data) => {
    if (event.target.checked) {
      if (alreadyLinkedFiles.includes(data.id)) {
        //alreadyThereNo need to add
      } else {
        // it will be a new one
        setTheLinking(data);
      }
      setState((prevProps) => ({
        ...prevProps,
        stepFiles: [...state.stepFiles, data.id],
      }));
    } else {
      if (alreadyLinkedFiles.includes(data.id)) {
        //unlinking the linked one
        setTheUnlinking(data);
      } else {
        // just removing a newly selected
        removeTheLinking(data);
      }
      let removed = [];
      removed =
        state.stepFiles.length > 0 &&
        state.stepFiles.filter((c) => c != data.id);
      setState((prevProps) => ({
        ...prevProps,
        stepFiles: removed,
      }));
    }
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: "",
      page: e.selected,
      limit: limit,
      organization_id: authData.org_id,
    };
    dispatch(getAllMedias(data));
  };

  return (
    <>
      {/* Upload New Media */}
      {(permissions.includes("all_media") ||
        permissions.includes("write_media") ||
        permissions.includes("Admin")) && (
        <div className="relative h-[108px]  mb-8">
          <div className="absolute top-0 left-0 w-full flex items-center justify-between bg-white  border border-gray2 rounded-xl md:p-4 xl:p-8 cursor-pointer">
            <div className="flex items-center">
              <img src="../assets/images/devices/folder.png" alt="icon-file" />
              <span className="ml-4 text-sm opacity-75 leading-tight">
                Add your documents, photos, or videos <br /> here to start
                uploading
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowFileUploader(true)}
              className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full py-1.5 xl:py-2 px-4 xl:px-6 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0"
            >
              Add File
            </button>
          </div>
        </div>
      )}

      {/* Link from Existing Media Library */}
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="md:text-sm xl:text-base font-medium md:mr-3">
              Link from library
            </div>
            <div className="relative  overflow-hidden">
              <input
                type="search"
                className="md:w-[250px] xl:w-[350px] bg-white bg-opacity-60 text-sm px-4 py-2.5 border border-gray2 rounded-full  focus:border-secondary focus:outline-none"
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

          {/* Filters : Start */}
          <Menu as="div" className="inline-block relative text-left ml-3">
            <Menu.Button className="focus:outline-0 focus-visible:outline-0">
              <img src="../assets/icons/icon-filter.svg" alt="icon-filter" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-[100] mt-2 w-[220px]  rounded-md bg-white shadow-lg ring ring-gray4 ring-opacity-30 focus:outline-none">
                <Menu.Item
                  as="button"
                  className="w-full text-sm text-left px-4 py-3 rounded-sm hover:bg-gray4"
                >
                  Sort by recently added
                </Menu.Item>
                <Menu.Item
                  as="button"
                  className="w-full text-sm text-left px-4 py-3 rounded-sm hover:bg-gray4"
                >
                  Other filters
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
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
            <div className="w-full h-[200px] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black2 scrollbar-track-gray4 dark:scrollbar-track-gray4  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
              <div className="flex items-stretch flex-wrap">
                {allMediasLoading ? (
                  <Skeleton
                    width={110}
                    height={110}
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
                      <>
                        {allMedias.map((file, index) => {
                          const { url, thumb_url, title, id } = file;
                          return (
                            <div className="flex flex-col justify-start relative mt-2 mb-[20px] w-[100px] xl:w-[120px] h-[130px] xl:h-[160px]">
                              <label
                                key={id}
                                className="relative w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] bg-white border border-gray4 rounded-xl cursor-pointer select-none"
                              >
                                <div className="w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] rounded-xl overflow-hidden">
                                  <img
                                    src={thumb_url}
                                    alt={title}
                                    className="w-[100px] xl:w-[120px] h-[100px] xl:h-[120px] object-cover"
                                  />
                                </div>

                                <input
                                  type="checkbox"
                                  id="procedure_media_upload"
                                  name="procedure_media_upload"
                                  className="absolute -top-1 -right-1 w-5 h-5"
                                  // value={id}
                                  checked={state.stepFiles.includes(id)}
                                  onChange={(e) => fileChangeHandler(e, file)}
                                />
                              </label>
                              <div className="text-sm dark:text-black3 capitalize px-2 mt-1 line-clamp-2">
                                {" "}
                                {title}{" "}
                              </div>
                            </div>
                          );
                        })}
                      </>
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
        uploadType="all"
      />
    </>
  );
};

export default LinkMedia;
