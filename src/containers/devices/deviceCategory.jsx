import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import { Transition, Menu, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrimaryCategories,
  deleteCategories,
  setShowCategoryModal,
  changeCategoriesSearch,
} from "../../redux/reduxes/categories/categoryAction";
// import { getSecondaryCategories } from "../../redux/reduxes/categories/categoryAction";
import Skeleton from "react-loading-skeleton";
import AddNewCategory from "../../components/categories/addNewCategory";
import PaginatedItems from "../../components/common/pagination";
import ConfirmDeleteCategory from "../../components/categories/deleteCategoryConfirmation";
import { updateSort } from "../../redux/reduxes/sort/sortAction";
import DeleteCategory from "../../components/categories/deleteCategory";
import PreviewSecondaryCategoryList from "../../components/categories/previewSecondaryCategoryList";
import PermissionsMessage from "../../components/common/permissionsMessage";
import ListDataNotFound from "../../components/common/listDataNotFound";

const DeviceCategory = () => {
  const dispatch = useDispatch();

  // Fetch Data
  const authData = useSelector((state) => state.auth.authData);
  const primaryCategoriesLoading = useSelector(
    (state) => state.categories.primaryCategoriesLoading,
  );
  const primaryCategories = useSelector(
    (state) => state.categories.primaryCategories,
  );
  const pagination = useSelector(
    (state) => state.categories.primaryCategoriesPagination,
  );
  const sort = useSelector((state) => state.sort);
  const sortByCategoryId = useSelector((state) => state.sort.sortByCategoryId);
  const sortByCategoryName = useSelector(
    (state) => state.sort.sortByCategoryName,
  );
  const sortByCategoryCreatedDate = useSelector(
    (state) => state.sort.sortByCategoryCreatedDate,
  );
  const showAssignAndDelete = useSelector(
    (state) => state.categories.showAssignAndDelete,
  );
  const showEditCategoriesModal = useSelector(
    (state) => state.categories.showEditCategoriesModal,
  );
  const permissions = useSelector((state) => state.auth.allPermissions);
  const searchQuery = useSelector(
    (state) => state.categories.searchCategoriesQuery,
  );
  const deleteCategoriesLoading = useSelector(
    (state) => state.categories.deleteCategoriesLoading,
  );

  const [delayLoading, setDelayLoading] = useState(false);

  // Dispatch Data
  useEffect(() => {
    const categoryData = {
      orgId: authData.org_id,
      query: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByCategoryName != 0
          ? sortByCategoryName
          : sortByCategoryId != 0
          ? sortByCategoryId
          : sortByCategoryCreatedDate != 0
          ? sortByCategoryCreatedDate
          : 0,
      sorting:
        sortByCategoryName != 0
          ? "name"
          : sortByCategoryId != 0
          ? "id"
          : sortByCategoryCreatedDate != 0
          ? "created_at"
          : "",
    };
    delayLoading && dispatch(getPrimaryCategories(categoryData));
  }, [sort]);

  // Hide Delete Popup
  useEffect(() => {
    setDeleteCategoryModal(false);
    setChangeModelsDeleteCategory(showAssignAndDelete);
  }, [showAssignAndDelete]);

  // Dispatch All Data
  useEffect(() => {
    const categoryData = {
      orgId: authData.org_id,
      query: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByCategoryName != 0
          ? sortByCategoryName
          : sortByCategoryId != 0
          ? sortByCategoryId
          : sortByCategoryCreatedDate != 0
          ? sortByCategoryCreatedDate
          : 0,
      sorting:
        sortByCategoryName != 0
          ? "name"
          : sortByCategoryId != 0
          ? "id"
          : sortByCategoryCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getPrimaryCategories(categoryData));
    setTimeout(function () {
      setDelayLoading(true);
    }, 1000);
  }, []);

  // Add and Edit Category Modal
  const [addCategory, setAddCategory] = useState(0);
  const [editCategory, setEditCategory] = useState(false);
  const [primaryCategoryForEdit, setPrimaryCategoryForEdit] = useState({});
  function showCategoryModal(changingPrimary) {
    const data = {
      show: true,
      pCateId: changingPrimary,
    };
    dispatch(setShowCategoryModal(data));
  }

  // const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const setShowEditCategoryModal = (way, changingPrimary) => {
    showCategoryModal(changingPrimary);
    setEditCategory(way);
    setPrimaryCategoryForEdit(changingPrimary);
  };

  const createNewCategory = (event) => {
    event.preventDefault();
  };

  // Delete Category
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [changeModelsDeleteCategory, setChangeModelsDeleteCategory] =
    useState(false);
  const [deletingCateId, setDeletingCateId] = useState(null);
  const confirmDeleteCategory = (stat, id) => {
    setDeleteCategoryModal(stat);
    setDeletingCateId(id);
  };

  // Search Query
  useEffect(() => {
    const queryData = {
      orgId: authData.org_id,
      query: searchQuery,
      page: 0,
      limit: 10,
      filter: {},
      sort:
        sortByCategoryName != 0
          ? sortByCategoryName
          : sortByCategoryId != 0
          ? sortByCategoryId
          : sortByCategoryCreatedDate != 0
          ? sortByCategoryCreatedDate
          : 0,
      sorting:
        sortByCategoryName != 0
          ? "name"
          : sortByCategoryId != 0
          ? "id"
          : sortByCategoryCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getPrimaryCategories(queryData));
  }, [searchQuery]);

  // Search Category
  const handleSearchChange = (searchData) => {
    dispatch(changeCategoriesSearch(searchData));
  };

  // Pagination
  const handlePageClick = (e) => {
    const queryData = {
      orgId: authData.org_id,
      query: searchQuery,
      page: e.selected,
      limit: 10,
      filter: {},
      sort:
        sortByCategoryName != 0
          ? sortByCategoryName
          : sortByCategoryId != 0
          ? sortByCategoryId
          : sortByCategoryCreatedDate != 0
          ? sortByCategoryCreatedDate
          : 0,
      sorting:
        sortByCategoryName != 0
          ? "name"
          : sortByCategoryId != 0
          ? "id"
          : sortByCategoryCreatedDate != 0
          ? "created_at"
          : "",
    };
    dispatch(getPrimaryCategories(queryData));
  };

  // Category Sort
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

  // Show Sub Category List
  const [showSubCategoryList, setShowSubCategoryList] = useState(false);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const displayAllSubCategoryList = (stat, sub_categories) => {
    setShowSubCategoryList(stat);
    setSubCategoryList(sub_categories);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Device Category</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center">
                <img
                  src="../assets/icons/icon-devices.svg"
                  alt="icon-devices"
                  className="invert dark:invert-0 w-4 h-4 opacity-70"
                />
                <Link
                  to="/devices"
                  exact={true}
                  className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium"
                >
                  Devices /
                </Link>
                <span className="ml-1 text-xs text-secondary font-semibold">
                  {" "}
                  Device Category
                </span>
              </div>
              <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                Device Category
              </h1>
            </div>

            {(permissions.includes("all_category") ||
              permissions.includes("write_category") ||
              permissions.includes("Admin")) && (
              <button
                type="button"
                onClick={() => setShowEditCategoryModal(false, {})}
                className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary px-6 py-2 rounded-full shadow-sm transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
              >
                Add New Category +
              </button>
            )}
          </div>

          {/* Table Card : Start */}
          <div className="w-full h-full pb-8 bg-white dark:bg-darkBg border border-gray2 dark:border-black1 rounded-3xl drop-shadow-md">
            {!(
              permissions.includes("all_category") ||
              permissions.includes("read_category") ||
              permissions.includes("Admin")
            ) ? (
              <PermissionsMessage
                additionalClassName="h-[75vh] py-10"
                title="Device Categories"
                message="read category"
              />
            ) : (
              <>
                {/* Search Bar */}
                <div className="flex items-center mb-8 pt-8 px-4 xl:px-8">
                  <div className="w-[75%] xl:w-[400px] relative overflow-hidden">
                    <input
                      type="search"
                      className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full  focus:border-secondary focus:outline-none"
                      name="user_search"
                      value={searchQuery}
                      id="user_search"
                      placeholder="Search for Category..."
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                    <div className="absolute top-3.5 right-4 block m-auto focus-visible:outline-none">
                      <img
                        src="../assets/icons/icon-search.svg"
                        alt="icon-search"
                        className="w-4 h-4 block m-auto dark:invert"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Table List : Start */}
                <div className="w-full min-h-[500px] h-full 2xl:h-[58vh] mb-8 dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
                  <table className="table-auto text-left relative min-w-full max-h-full">
                    <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                      <tr>
                        <th
                          onClick={() =>
                            handleChangeSort(
                              sortByCategoryName,
                              "sortByCategoryName",
                            )
                          }
                          scope="col"
                          width="30%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center ">
                            <span
                              className={
                                sortByCategoryName == 1 ||
                                sortByCategoryName == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Category
                            </span>
                            {sortByCategoryName == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByCategoryName == 2 ? (
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
                          width="20%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          Sub-category
                        </th>
                        <th
                          scope="col"
                          width="15%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          Models
                        </th>
                        <th
                          onClick={() =>
                            handleChangeSort(
                              sortByCategoryCreatedDate,
                              "sortByCategoryCreatedDate",
                            )
                          }
                          scope="col"
                          width="15%"
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          <div className="flex items-center ">
                            <span
                              className={
                                sortByCategoryCreatedDate == 1 ||
                                sortByCategoryCreatedDate == 2
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              Created On
                            </span>
                            {sortByCategoryCreatedDate == 1 ? (
                              <img
                                src="../assets/icons/icon-sort-asc.svg"
                                alt="icon-sort-asc"
                                className="w-[15px] h-[15px] ml-[2px] dark:invert"
                              />
                            ) : sortByCategoryCreatedDate == 2 ? (
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
                          className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                        >
                          {(permissions.includes("all_category") ||
                            permissions.includes("update_category") ||
                            (permissions.includes("delete_category") &&
                              permissions.includes("update_model")) ||
                            permissions.includes("Admin")) && (
                            <span>Actions</span>
                          )}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {primaryCategoriesLoading ? (
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
                          {primaryCategories && primaryCategories.length > 0 ? (
                            <>
                              {primaryCategories.map((category, index) => {
                                const {
                                  id,
                                  name,
                                  sub_categories,
                                  model_count,
                                  created_at,
                                } = category;
                                return (
                                  <tr
                                    valign="top"
                                    key={id}
                                    className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                  >
                                    <td
                                      width="30%"
                                      className="px-4 xl:px-8 py-4 text-base font-medium capitalize w-[250px] 2xl:w-[400px] text-ellipsis block whitespace-nowrap overflow-hidden"
                                      title={name}
                                    >
                                      {name}
                                    </td>
                                    <td
                                      width="20%"
                                      className="px-4 xl:px-8 py-4 text-base relative"
                                    >
                                      <button
                                        onClick={() =>
                                          displayAllSubCategoryList(
                                            true,
                                            sub_categories,
                                          )
                                        }
                                        type="button"
                                        className="underline text-primary"
                                      >
                                        {sub_categories.length}
                                      </button>
                                    </td>
                                    <td
                                      width="15%"
                                      className="px-4 xl:px-8 py-4 text-base whitespace-nowrap"
                                    >
                                      {model_count}
                                    </td>
                                    <td
                                      width="15%"
                                      className="px-4 xl:px-8 py-4 text-base whitespace-nowrap"
                                    >
                                      {created_at}
                                    </td>
                                    <td
                                      width="10%"
                                      className="px-4 xl:px-8 py-4 text-base whitespace-nowrap"
                                    >
                                      {(permissions.includes("all_category") ||
                                        permissions.includes(
                                          "delete_category",
                                        ) ||
                                        permissions.includes("Admin")) &&
                                        (permissions.includes("all_model") ||
                                          permissions.includes(
                                            "update_model",
                                          ) ||
                                          permissions.includes("Admin")) && (
                                          <button
                                            onClick={() =>
                                              confirmDeleteCategory(true, id)
                                            }
                                            type="button"
                                            className="focus:outline-0 focus-visible:outline-0"
                                            title="Delete"
                                          >
                                            <img
                                              src="../assets/icons/icon-delete.svg"
                                              alt="icon-delete"
                                              className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                            />
                                          </button>
                                        )}
                                      {(permissions.includes("all_category") ||
                                        permissions.includes(
                                          "update_category",
                                        ) ||
                                        permissions.includes("Admin")) &&
                                        (permissions.includes("all_model") ||
                                          permissions.includes(
                                            "update_model",
                                          ) ||
                                          permissions.includes("Admin")) && (
                                          <button
                                            onClick={() =>
                                              setShowEditCategoryModal(
                                                true,
                                                category,
                                              )
                                            }
                                            type="button"
                                            className="focus:outline-0 focus-visible:outline-0"
                                            title="Edit"
                                          >
                                            <img
                                              src="../assets/icons/icon-edit.svg"
                                              alt="icon-edit"
                                              className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] ml-4 dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:duration-300 dark:opacity-60 dark:hover:opacity-100 dark:hover:transition-all"
                                            />
                                          </button>
                                        )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </>
                          ) : (
                            <ListDataNotFound
                              searchQuery={searchQuery}
                              listLength={
                                primaryCategories && primaryCategories.length
                              }
                              filters={[]}
                              colSpan={6}
                            />
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Category Table List : End */}

                {/* Pagination : Start */}
                <div className="flex justify-end mt-8 px-4">
                  {primaryCategoriesLoading ? (
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
                      itemsPerPage={pagination.per_page}
                      handlePageClick={handlePageClick}
                      pageCount={
                        pagination &&
                        Math.ceil(
                          pagination.total_entries / pagination.per_page,
                        )
                      }
                      current_page={pagination && pagination.current_page}
                      totalEntries={pagination && pagination.total_entries}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          {/* Table Card : End */}

          {/* Add Category Modal : Start */}
          {showEditCategoriesModal && (
            <AddNewCategory
              // setShowCategoryModal={setShowCategoryModal}
              showCategoryModal={showEditCategoriesModal}
              editCategory={editCategory}
              primaryCategoryForEdit={primaryCategoryForEdit}
            />
          )}

          {/* Show Sub Category Modal : Start */}
          {showSubCategoryList && (
            <PreviewSecondaryCategoryList
              showSubCategoryList={showSubCategoryList}
              setShowSubCategoryList={setShowSubCategoryList}
              subCategoryList={subCategoryList}
            />
          )}

          {/* Delete Category after assign other: Start */}
          {changeModelsDeleteCategory && (
            <DeleteCategory
              deleteCategoryModal={changeModelsDeleteCategory}
              setDeleteCategoryModal={setChangeModelsDeleteCategory}
              deleteAction={deleteCategories}
              id={deletingCateId}
              deleteFrom="primary"
            />
          )}

          {/* Remove Category Modal : Start */}
          {deleteCategoryModal && (
            <ConfirmDeleteCategory
              head="Remove Category"
              body="Are you sure you want to remove Category from the list?"
              deleteAction={deleteCategories}
              modalAction={setDeleteCategoryModal}
              modalValue={deleteCategoryModal}
              id={deletingCateId}
              deleteLoading={deleteCategoriesLoading}
            />
          )}
          {/* Remove Category Modal : End */}
        </section>
      </Layout>
    </>
  );
};
export default DeviceCategory;
