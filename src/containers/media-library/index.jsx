import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import AddNewMedia from "../../components/media/addNewMediaTabs";
import { useSelector, useDispatch } from "react-redux";
import {
  changeMediaSearch,
  getAllMedias,
} from "../../redux/reduxes/medias/mediasAction";
import UpdateMediaTitle from "../../components/media/updateMediaTitle";
import Filters from "../../components/common/filters";
import AppliedFilters from "../../components/common/appliedFilters";
import PermissionsMessage from "../../components/common/permissionsMessage";
import { MediaList } from "../../components/media/mediaList";

const MediaLibrary = (props) => {
  const dispatch = useDispatch();

  // Fetch Auth Data
  const authData = useSelector((state) => state.auth.authData);
  const mediasLoading = useSelector((state) => state.medias.allMediasLoading);
  const medias = useSelector((state) => state.medias.allMedias);
  const pagination = useSelector((state) => state.medias.allMediasPagination);
  const filters = useSelector((state) => state.medias.filters);
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector((state) => state.medias.searchMediaQuery);

  // Dispatch Media
  useEffect(() => {
    const mediaData = {
      page: 0,
      limit: 25,
      search: "",
      organization_id: authData.org_id,
      filter: {},
    };
    dispatch(getAllMedias(mediaData));
  }, []);

  // Media Modal Popup
  const [addNewMediaModal, setAddNewMediaModal] = useState(false);

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 25,
      organization_id: authData.org_id,
      filter: {},
    };
    dispatch(getAllMedias(data));
  }, [searchQuery]);

  // Search Bar
  const handleSearchChange = (searchData) => {
    dispatch(changeMediaSearch(searchData));
  };

  // Update Media
  const [updateMediaModal, setUpdateMediaModal] = useState(false);
  const [updateMediaId, setUpdateMediaId] = useState(null);
  const [updateMediaDetails, setUpdateMediaDetails] = useState({});

  const confirmUpdateMedia = (stat, id, details) => {
    setUpdateMediaModal(stat);
    setUpdateMediaId(id);
    setUpdateMediaDetails(details);
  };

  // Pagination
  const handlePageClick = () => {
    const data = {
      page: pagination.current_page,
      limit: 25,
      search: searchQuery,
      organization_id: authData.org_id,
      filter: filters.selected_filters ? filters.selected_filters : {},
      infinite: true,
    };
    dispatch(getAllMedias(data));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Media Library</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img
                    src="../assets/icons/icon-media.svg"
                    alt="icon-media"
                    className="invert w-[14px] h-[14px] dark:invert-0 opacity-70"
                  />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-semibold">
                    Media Library
                  </span>
                </div>
                <h1 className="md:text-2xl xl:text-3xl text-black dark:text-gray2 font-bold">
                  Media Library
                </h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                {(permissions.includes("all_media") ||
                  permissions.includes("write_media") ||
                  permissions.includes("Admin")) && (
                  <button
                    type="button"
                    onClick={() => setAddNewMediaModal(true)}
                    className="bg-primary text-white text-sm font-medium border border-primary rounded-full px-6 py-2 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                  >
                    Upload New Media +
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Media Library : Start */}
          <div className="w-full h-full bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl py-8 px-5 lg:p-8 drop-shadow-md">
            {!(
              permissions.includes("all_media") ||
              permissions.includes("read_media") ||
              permissions.includes("Admin")
            ) ? (
              <PermissionsMessage
                additionalClassName=" h-[72vh] p-20"
                title="Media Library"
                message="read media"
              />
            ) : (
              <>
                {/* Search Bar and Filters */}
                <div className="flex items-center justify-between mb-12">
                  <div className="w-[400px] relative overflow-hidden">
                    <input
                      type="search"
                      className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 text-base px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                      name="media_search"
                      id="media_search"
                      placeholder="Search for Media..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <div className="block absolute top-3 right-4 m-auto focus-visible:outline-none">
                      <img
                        src="../assets/icons/icon-search.svg"
                        alt="icon-search"
                        className="w-4 h-4 block m-auto dark:invert"
                      />
                    </div>
                  </div>

                  {/* Filters : Start */}
                  <Filters
                    filters={filters}
                    getListAction={getAllMedias}
                    limit={25}
                    search={searchQuery}
                  />
                </div>

                {/* Applified Filters */}
                <AppliedFilters
                  page={0}
                  limit={25}
                  search={searchQuery}
                  filters={filters}
                  getActionList={getAllMedias}
                />

                <MediaList
                  confirmUpdateMedia={confirmUpdateMedia}
                  handlePageClick={handlePageClick}
                  medias={medias}
                  mediasLoading={mediasLoading}
                  pagination={pagination}
                  searchQuery={searchQuery}
                  setAddNewMediaModal={setAddNewMediaModal}
                />
              </>
            )}
          </div>

          {/* Add/Upload New Media */}
          {addNewMediaModal && (
            <AddNewMedia
              addNewMediaModal={addNewMediaModal}
              setAddNewMediaModal={setAddNewMediaModal}
              uploadType="all"
            />
          )}

          {/* Update Media Title Modal */}
          {updateMediaModal && (
            <UpdateMediaTitle
              updateMediaModal={updateMediaModal}
              setUpdateMediaModal={setUpdateMediaModal}
              details={updateMediaDetails}
              id={updateMediaId}
            />
          )}
        </section>
      </Layout>
    </>
  );
};
export default MediaLibrary;
