import React, { useState, useEffect } from 'react';
import DeleteCategory from '../../components/categories/deleteCategory';
import ConfirmDeleteCategory from "../../components/categories/deleteCategoryConfirmation";
import { deleteCategories, resetErrors } from "../../redux/reduxes/categories/categoryAction";
import { useSelector, useDispatch } from 'react-redux';

const SecondaryCategoryList = ({ i, pCate, editSecondaryMaped, deleteCategoryField, selectedPrimCateId }) => {

  // Fetch Data
  const showAssignAndDelete = useSelector(state => state.categories.showAssignAndDelete);


  const dispatch = useDispatch();
  // Hide Delete Popup
  useEffect(() => {
    setDeleteCategoryModal(false);
    // setChangeModelsDeleteCategory(showAssignAndDelete);
  }, [showAssignAndDelete]);

  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [deletingCateId, setDeletingCateId] = useState(null)
  const confirmDeleteCategory = (stat, id) => {
    setDeleteCategoryModal(stat);
    setDeletingCateId(id)
  }

  const changingSecoCateName = () => {
    dispatch(resetErrors());
  }
  return (
    <>
      <div key={i} className='relative mb-3 overflow-hidden'>
        <input
          disabled={true}
          type="text"
          id="category_secondary"
          name="category_secondary"
          placeholder='Secondary Category'
          value={pCate.name}
          onChange={() => changingSecoCateName()}
          className='w-full text-sm dark:bg-darkMainBg border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus-visible:outline-none'
        />
        <div className="absolute right-[4px] top-[16px]">
          <button type='button' onClick={() => editSecondaryMaped(pCate.name, pCate.id)} className=' focus-visible:outline-none' title="Edit">
            <img src="../assets/icons/icon-edit.svg" alt="icon-edit" className='dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300' />
          </button>
          <button onClick={() => confirmDeleteCategory(true, pCate.id)} type='button' className=' px-4 focus-visible:outline-none' title="Delete">
            <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className='dark:invert opacity-80 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300' />
          </button>
        </div>
      </div>

      {/* Delete Category after assign other: Start */}
      {/* {showAssignAndDelete &&
        <DeleteCategory
          deleteCategoryModal={showAssignAndDelete}
          // setDeleteCategoryModal={setChangeModelsDeleteCategory}
          deleteAction={deleteCategories}
          pCateId={selectedPrimCateId}
          deleteFrom="seco"
        // id={deletingCateId}
        />
      } */}

      {/* Remove Category Modal : Start */}
      {deleteCategoryModal &&
        <ConfirmDeleteCategory
          head="Remove Category"
          body='Are you sure you want to remove Category from the list?'
          deleteAction={deleteCategories}
          modalAction={setDeleteCategoryModal}
          modalValue={deleteCategoryModal}
          id={deletingCateId}
          pCateId={selectedPrimCateId}
        />
      }
    </>
  );
}

export default SecondaryCategoryList;