import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/common/deleteModal";
import ListDataNotFound from "../../components/common/listDataNotFound";
import PaginatedItems from "../../components/common/pagination";
import PersonalNoteModal from "../../components/personalNotes/personalNoteModal";
import Layout from "../../layout";
import {
  changePersonalNotesSearch,
  deletePersonalNote,
  getAllPersonalNotes,
  setPersonalNotesModal,
} from "../../redux/reduxes/personalNotes/personalNotesActions";
import { updateSort } from "../../redux/reduxes/sort/sortAction";

const PersonalNotes = () => {
  const dispatch = useDispatch();

  // Fetch Data;
  const allPersonalNotesLoading = useSelector(
    (state) => state.notes.allPersonalNotesLoading,
  );
  const allPersonalNotesList = useSelector(
    (state) => state.notes.allPersonalNotesList,
  );
  const allPersonalNotesPagination = useSelector(
    (state) => state.notes.allPersonalNotesPagination,
  );
  const showPersonalNotesModal = useSelector(
    (state) => state.notes.showPersonalNotesModal,
  );
  const searchQuery = useSelector(
    (state) => state.notes.searchPersonalNotesQuery,
  );
  const sort = useSelector((state) => state.sort);
  const sortByPersonalNotesTitle = useSelector(
    (state) => state.sort.sortByPersonalNotesTitle,
  );
  const sortByPersonalNotesCreatedDate = useSelector(
    (state) => state.sort.sortByPersonalNotesCreatedDate,
  );
  const deletePersonalNoteLoading = useSelector(
    (state) => state.notes.deletePersonalNoteLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      sort:
        sortByPersonalNotesTitle != 0
          ? sortByPersonalNotesTitle
          : sortByPersonalNotesCreatedDate != 0
          ? sortByPersonalNotesCreatedDate
          : 0,
      sorting:
        sortByPersonalNotesTitle != 0
          ? "title"
          : sortByPersonalNotesCreatedDate != 0
          ? "created_at"
          : "",
    };
    delayLoading && dispatch(getAllPersonalNotes(data));
  }, [sort]);

  // Dispatch All
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      sort:
        sortByPersonalNotesTitle != 0
          ? sortByPersonalNotesTitle
          : sortByPersonalNotesCreatedDate != 0
          ? sortByPersonalNotesCreatedDate
          : 0,
      sorting:
        sortByPersonalNotesTitle != 0
          ? "title"
          : sortByPersonalNotesCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllPersonalNotes(data));
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Search Query
  useEffect(() => {
    const data = {
      search: searchQuery,
      page: 0,
      limit: 10,
      sort:
        sortByPersonalNotesTitle != 0
          ? sortByPersonalNotesTitle
          : sortByPersonalNotesCreatedDate != 0
          ? sortByPersonalNotesCreatedDate
          : 0,
      sorting:
        sortByPersonalNotesTitle != 0
          ? "title"
          : sortByPersonalNotesCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllPersonalNotes(data));
  }, [searchQuery]);

  // Search Notes
  const handleSearchChange = (searchData) => {
    dispatch(changePersonalNotesSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const data = {
      search: searchQuery,
      page: e.selected,
      limit: 10,
      sort:
        sortByPersonalNotesTitle != 0
          ? sortByPersonalNotesTitle
          : sortByPersonalNotesCreatedDate != 0
          ? sortByPersonalNotesCreatedDate
          : 0,
      sorting:
        sortByPersonalNotesTitle != 0
          ? "title"
          : sortByPersonalNotesCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getAllPersonalNotes(data));
  };

  // Notes Sorting
  const handleChangeSort = (v, n) => {
    const getSort = (x) => {
      let sort = 0;
      if (x == 0 || x == 1) {
        sort = v + 1;
      } else {
        sort = 0;
      }
      return sort;
    };
    const data = {
      name: n,
      sort: getSort(v),
    };
    dispatch(updateSort(data));
  };

  // Open Modal Function
  const showPersonalNotesModalEvent = (stat) => {
    dispatch(setPersonalNotesModal(stat));
  };

  // Add New Note and Update Note
  const [update, setUpdate] = useState(false);
  const [personalNoteId, setPersonalNoteId] = useState(null);

  const addPersonalNoteEvent = () => {
    showPersonalNotesModalEvent(true);
    setUpdate(false);
  };

  const updatePersonalNoteEvent = (note_id) => {
    showPersonalNotesModalEvent(true);
    setUpdate(true);
    setPersonalNoteId(note_id);
  };

  // Delete a Note
  const [deletePersonalNotesModal, setDeletePersonalNotesModal] =
    useState(false);
  const [deletePersonalNoteId, setDeletePersonalNoteId] = useState(null);
  const [deletePersonalNoteTitle, setDeletePersonalNoteTitle] = useState("");

  const confirmDeletePersonalNote = (stat, note_id, title) => {
    setDeletePersonalNotesModal(stat);
    setDeletePersonalNoteId(note_id);
    setDeletePersonalNoteTitle(title);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Personal Notes</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid xl:grid-cols-2 xl:gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img
                    src="../assets/icons/icon-note.svg"
                    alt="icon-note"
                    className="invert dark:invert-1 w-4 h-4"
                  />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-semibold">
                    {" "}
                    Personal Notes
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  Personal Notes
                </h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                <button
                  onClick={() => addPersonalNoteEvent()}
                  className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0"
                >
                  Add New Note +
                </button>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Model Table List : Start */}
          <div className="w-full bg-white dark:bg-darkBg pb-8 border border-gray2 dark:border-black1 rounded-3xl drop-shadow-md">
            {/* Search and Filter : Start */}
            <div className="flex items-center justify-between px-4 py-8 xl:px-6">
              <div className="w-[75%] xl:w-[400px] relative overflow-hidden">
                <input
                  type="search"
                  className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                  name="search_notes"
                  id="search_notes"
                  placeholder="Search for Personal Notes..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <div className="absolute top-3.5 right-5 block m-auto">
                  <img
                    src="../assets/icons/icon-search.svg"
                    alt="icon-search"
                    className="w-4 h-4 block m-auto dark:invert"
                  />
                </div>
              </div>
            </div>
            {/* Search and Filter : End */}

            {/* Notes Table List : Start */}
            <div className="w-full min-h-[500px] h-full 2xl:h-[62vh]  dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
              <table className="table-auto text-left relative min-w-full max-h-full">
                <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                  <tr>
                    <th
                      scope="col"
                      width="15%"
                      onClick={() =>
                        handleChangeSort(
                          sortByPersonalNotesTitle,
                          "sortByPersonalNotesTitle",
                        )
                      }
                      className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        <span
                          className={
                            sortByPersonalNotesTitle == 1 ||
                            sortByPersonalNotesTitle == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Title
                        </span>
                        {sortByPersonalNotesTitle == 1 ? (
                          <img
                            src="../assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByPersonalNotesTitle == 2 ? (
                          <img
                            src="../assets/icons/icon-sort-desc.svg"
                            alt="icon-sort-desc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : (
                          <img
                            src="../assets/icons/icon-sort.svg"
                            alt="icon-sort"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      width="35%"
                      className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      {" "}
                      Description{" "}
                    </th>
                    <th
                      scope="col"
                      width="15%"
                      className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      {" "}
                      Media Count{" "}
                    </th>
                    <th
                      scope="col"
                      width="15%"
                      onClick={() =>
                        handleChangeSort(
                          sortByPersonalNotesCreatedDate,
                          "sortByPersonalNotesCreatedDate",
                        )
                      }
                      className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        <span
                          className={
                            sortByPersonalNotesCreatedDate == 1 ||
                            sortByPersonalNotesCreatedDate == 2
                              ? "text-primary"
                              : ""
                          }
                        >
                          Created On
                        </span>
                        {sortByPersonalNotesCreatedDate == 1 ? (
                          <img
                            src="../assets/icons/icon-sort-asc.svg"
                            alt="icon-sort-asc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : sortByPersonalNotesCreatedDate == 2 ? (
                          <img
                            src="../assets/icons/icon-sort-desc.svg"
                            alt="icon-sort-desc"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        ) : (
                          <img
                            src="../assets/icons/icon-sort.svg"
                            alt="icon-sort"
                            className="w-[15px] h-[15px] ml-[2px] dark:invert"
                          />
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      width="10%"
                      className="px-8 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allPersonalNotesLoading ? (
                    <tr>
                      <td colSpan="6">
                        <Skeleton
                          count={10}
                          height={50}
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="0"
                          enableAnimation="true"
                          duration={2.5}
                          inline={true}
                          className="dark:bg-darkMainBg"
                        />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {allPersonalNotesList &&
                      allPersonalNotesList.length > 0 ? (
                        <>
                          {allPersonalNotesList.map((note, index) => {
                            const {
                              id,
                              title,
                              description,
                              media_count,
                              created_at,
                            } = note;
                            return (
                              <tr
                                valign="top"
                                className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out group-hover:transition-all hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                key={id}
                              >
                                <td width="15%" className="px-4 xl:px-8 py-4">
                                  <div
                                    className="text-sm 2xl:text-base font-medium capitalize w-[100px] text-ellipsis whitespace-nowrap overflow-hidden"
                                    title={title}
                                  >
                                    {title}
                                  </div>
                                </td>
                                <td width="35%" className="px-4 xl:px-8 py-4">
                                  <div
                                    className="2xl:text-base first-letter:uppercase w-[250px] 2xl:w-[350px]"
                                    dangerouslySetInnerHTML={{
                                      __html: description,
                                    }}
                                  />
                                </td>
                                <td
                                  width="15%"
                                  className="px-4 xl:px-8 py-4 text-sm 2xl:text-base"
                                >
                                  {media_count}
                                </td>
                                <td
                                  width="15%"
                                  className="px-4 xl:px-8 py-4 text-sm 2xl:text-base"
                                >
                                  {created_at}
                                </td>
                                <td width="10%" className="px-8 py-4">
                                  <div className="flex items-center">
                                    <button
                                      onClick={() =>
                                        confirmDeletePersonalNote(
                                          true,
                                          id,
                                          title,
                                        )
                                      }
                                      type="button"
                                      className=" focus-visible:outline-none"
                                      title="Delete"
                                    >
                                      <img
                                        src="../assets/icons/icon-delete.svg"
                                        alt="icon-delete"
                                        className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                      />
                                    </button>

                                    <button
                                      onClick={() =>
                                        updatePersonalNoteEvent(id)
                                      }
                                      type="button"
                                      className=" focus-visible:outline-none"
                                      title="Edit"
                                    >
                                      <img
                                        src="../assets/icons/icon-edit.svg"
                                        alt="icon-edit"
                                        className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                      />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <ListDataNotFound
                          colSpan={6}
                          searchQuery={searchQuery}
                          listLength={
                            allPersonalNotesList && allPersonalNotesList.length
                          }
                          filters={[]}
                        />
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {/* Notes Table List : End */}

            {/* Pagination */}
            <div className="flex justify-end mt-8 px-4">
              {allPersonalNotesLoading ? (
                <Skeleton
                  count={1}
                  width={200}
                  height={40}
                  baseColor="#f5f5f5"
                  highlightColor="#e1e1e1"
                  borderRadius="30"
                  enableAnimation="true"
                  duration={2.5}
                  inline={true}
                  className=" dark:bg-darkMainBg"
                />
              ) : (
                <PaginatedItems
                  itemsPerPage={allPersonalNotesPagination.per_page}
                  handlePageClick={handlePageClick}
                  pageCount={
                    allPersonalNotesPagination &&
                    Math.ceil(
                      allPersonalNotesPagination.total_entries /
                        allPersonalNotesPagination.per_page,
                    )
                  }
                  current_page={
                    allPersonalNotesPagination &&
                    allPersonalNotesPagination.current_page
                  }
                  totalEntries={
                    allPersonalNotesPagination &&
                    allPersonalNotesPagination.total_entries
                  }
                />
              )}
            </div>
          </div>
        </section>

        {/* Add New Note */}
        {showPersonalNotesModal && (
          <PersonalNoteModal
            showPersonalNotesModal={showPersonalNotesModal}
            update={update}
            setUpdate={setUpdate}
            personalNoteId={personalNoteId}
            setPersonalNoteId={setPersonalNoteId}
          />
        )}

        {/* Delete Note Confirmation Modal */}
        {deletePersonalNotesModal && (
          <DeleteModal
            head="Remove Note"
            body={[
              "Are you sure you want to remove",
              <strong className="capitalize break-all">
                {" "}
                "{deletePersonalNoteTitle}"{" "}
              </strong>,
              "Manual from the list?",
            ]}
            deleteAction={deletePersonalNote}
            modalAction={setDeletePersonalNotesModal}
            modalValue={deletePersonalNotesModal}
            parentmodel={false}
            id={deletePersonalNoteId}
            deleteLoading={deletePersonalNoteLoading}
          />
        )}
      </Layout>
    </>
  );
};
export default PersonalNotes;
