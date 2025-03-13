import React, { Fragment, useEffect, useState } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getSecondaryCategoriesInDropDown, moveModelAndDeleteModal } from "../../redux/reduxes/categories/categoryAction";
import PreviewSecondaryCategoryList from './previewSecondaryCategoryList';

const DeleteCategory = ({ deleteCategoryModal, setDeleteCategoryModal, deleteAction, pCateId }) => {
  const dispatch = useDispatch();

  // Fetch Data
  const allCategories = useSelector(state => state.categories.allCategories);
  const secondaryCategories = useSelector(state => state.categories.secondaryCategoriesInDropDown);
  const authData = useSelector(state => state.auth.authData);
  const deletingCategoryId = useSelector(state => state.categories.deletingCategoryId);
  const deleteCategoriesLoading = useSelector(state => state.categories.deleteCategoriesLoading);
  const primary_category = useSelector(state => state.categories.primary_category);
  const secondary_category_count = useSelector(state => state.categories.secondary_category_count)
  const deletingModelsCount = useSelector(state => state.categories.deletingModelsCount);
  const deletingPrimaryCategoryId = useSelector(state => state.categories.deletingPrimaryCategoryId);
  const categoryName = useSelector(state => state.categories.categoryName);
  const secondaryCategoriesList = useSelector(state => state.categories.secondaryCategoriesList);

  console.log(categoryName, "vejvker");

  // States
  const [state, setState] = useState({
    device_primary_category: "",
    device_secondary_category: "",
    all_primary: [],
    all_secondary: [],
    errors: {
      device_primary_category: '',
      device_secondary_category: '',
    }
  });

  // Dispatch Categories Details
  useEffect(() => {
    if (primary_category) {
      let allCate = allCategories && allCategories.length > 0 && allCategories.filter(data => data.id != deletingCategoryId);
      setState((prevProps) => ({
        ...prevProps,
        all_primary: allCate ? allCate : []
      }));
    } else {
      setState((prevProps) => ({
        ...prevProps,
        all_primary: allCategories
      }));
    }

    if (!primary_category) {
      let secoCate = secondaryCategories && secondaryCategories.length > 0 && secondaryCategories.filter(data => data.id != deletingCategoryId);
      setState((prevProps) => ({
        ...prevProps,
        all_secondary: secoCate ? secoCate : []
      }));
    } else {
      setState((prevProps) => ({
        ...prevProps,
        all_secondary: secondaryCategories
      }));
    }
  }, [allCategories, secondaryCategories]);

  // Dispatch to All Categories
  useEffect(() => {
    const data = {
      org_id: authData.org_id,
      paginate: false,
    }
    dispatch(getAllCategories(data));
  }, [authData]);


  // Handle Segment One Changes
  const handleChangeStepOne = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name == "device_primary_category") {
      setState((prevProps) => ({
        ...prevProps,
        device_primary_category: value
      }));
      //here get all secondary
      dispatch(getSecondaryCategoriesInDropDown(value));
    }
    if (name == "device_secondary_category") {
      setState((prevProps) => ({
        ...prevProps,
        device_secondary_category: value
      }));
    }
    let errors = state.errors;
    errors.device_primary_category = ""
    setState((prevProps) => ({
      ...prevProps,
      errors: errors
    }));
  }

  // Validate User Form
  const validateUserForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    if (state.device_primary_category == "")
      valid = false;
    return valid;
  }

  const dispatchTheFunction = (event) => {
    event.preventDefault();
    if (validateUserForm(state.errors)) {
      const data = {
        assign: true,
        category_id: state.device_secondary_category != "" ? state.device_secondary_category : state.device_primary_category,
        id: deletingCategoryId,
        pCateId: deletingPrimaryCategoryId
      }
      dispatch(deleteAction(data));
      // dispatch(createModel(data));
      // setTimeout(function () {
      //     setShowModal(false)
      // }, 1000);
    } else {
      let errors = state.errors;
      if (state.device_primary_category == "")
        errors.device_primary_category = "Select category"
      setState((prevProps) => ({
        ...prevProps,
        errors: errors
      }));

    }
    // dispatch(deleteAction(data));
    // modalAction(false);
    // closeParentPopup(false);
  }

  // Show Secondary Category List
  const [showSecondaryCategories, setShowSecondaryCategories] = useState(false);
  const [secondaryCategoryList, setSecondaryCategoryList] = useState([]);

  const toggleSecondaryCategoriesList = (stat, list) => {
    setShowSecondaryCategories(stat);
    setSecondaryCategoryList(list);
  }


  return (
    <>
      <Transition appear show={deleteCategoryModal} as={Fragment}>
        <Dialog as="div" open={deleteCategoryModal} onClose={() => setDeleteCategoryModal(false, null)} className="fixed inset-0 z-50 py-20 flex items-start justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[96%] lg:w-[70%] xl:w-[50%] 2xl:w-[40%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-3xl px-8 py-10 shadow-lg">
              <Dialog.Title className="dark:text-gray2 text-2xl font-bold text-center mb-4">Remove Category</Dialog.Title>
              <div className="text-base text-black1 dark:text-gray2 text-center xl:px-10 pb-10">Before removing the category, <br /> please make sure to relocate all models and devices to an existing category.</div>
              <div className="text-base text-black1 dark:text-gray2 text-start xl:px-10 border-b border-gray2 dark:border-opacity-40 pb-8">
                <strong>Note: </strong><br />
                1. All the secondary categories that belong to this "<strong>{categoryName}</strong>" category will be re-associated with the selected primary category. <br />
                2. All models belonging to the "<strong>{categoryName}</strong>" category will be re-associated with the chosen primary category, and they can also be directly assigned to the selected secondary category.
              </div>

              {console.log('woring')}
              {
                primary_category ?
                  <div className='text-sm mb-5 pt-8'>
                    By deleting this category, <strong>{deletingModelsCount}</strong> model(s) from this Primary category and <strong>{secondaryCategoriesList && secondaryCategoriesList.length && secondaryCategoriesList.reduce((accumulator, currentValue) => accumulator + currentValue['model_count'], 0)} </strong> models from these
                    <button onClick={() => toggleSecondaryCategoriesList(true, secondaryCategoriesList)} type="button" className='px-1 underline text-primary focus:outline-0 focus-visible:outline-0' title="View">Secondary categories</button>,
                    will be reassigned to the chosen category.
                  </div>
                  :
                  <div className='text-sm mb-5 pt-8'>
                    By deleting this category, <strong>{deletingModelsCount}</strong> model(s) from this category will be reassigned to the chosen category.
                  </div>
              }


              <div className="grid grid-cols-2 gap-5">
                <div className="col-start-1">
                  <label htmlFor='device_primary_category' className='text-sm font-medium'>Primary Category <span className='text-danger'>*</span></label>
                  <select
                    name="device_primary_category"
                    id="device_primary_category"
                    className="ed-form__select appearance-none relative w-full h-[45px] 2xl:h-[50px] text-sm 2xl:text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-1 2xl:py-3 px-4 focus:border-secondary focus:outline-none"
                    onChange={(e) => handleChangeStepOne(e)}
                  >
                    <option value="" defaultValue>Select</option>
                    {state.all_primary && state.all_primary.length > 0 && state.all_primary.map(category => (<option value={category.id && category.id} >{category.name && category.name}</option>))}
                  </select>
                  <div className='text-danger mt-1 ml-1'>{state.errors.device_primary_category}</div>
                </div>

                {!primary_category &&
                  <div className="col-start-2">
                    <label htmlFor='device_secondary_category' className='text-sm font-medium'>Secondary Category </label>
                    <select
                      name="device_secondary_category"
                      id="device_secondary_category"
                      className="ed-form__select appearance-none relative w-full h-[45px] 2xl:h-[50px] text-sm 2xl:text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-1 2xl:py-3 px-4 focus:border-secondary focus:outline-none"
                      onChange={(e) => handleChangeStepOne(e)}
                    >
                      <option value="" defaultValue>Select</option>
                      <option value="" >Add model to the primary category</option>
                      {state.all_secondary.map(category => (<option value={category.id} >{category.name}</option>))}
                    </select>
                  </div>
                }
              </div>

              <div className="flex items-center justify-end mt-10">
                <button onClick={() => dispatch(moveModelAndDeleteModal(false))} type='button' className='bg-transparent text-sm text-black2 dark:text-gray2  font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                  Cancel
                </button>
                <button
                  onClick={(e) => dispatchTheFunction(e)}
                  type='button'
                  disabled={deleteCategoriesLoading}
                  className={`${deleteCategoriesLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-sm text-white font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                >
                  {deleteCategoriesLoading ? "Assigning and Removing..." : "Assign and Remove"}
                </button>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Show Secondary Categories List */}
      {showSecondaryCategories &&
        <PreviewSecondaryCategoryList
          showSubCategoryList={showSecondaryCategories}
          setShowSubCategoryList={setShowSecondaryCategories}
          subCategoryList={secondaryCategoryList}
        />
      }
    </>
  )
}
export default DeleteCategory;