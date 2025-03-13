import React, { Fragment, useState, useEffect } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { editSecondaryCategories, setShowSecondaryCategoryModal } from "../../redux/reduxes/categories/categoryAction";
import { useSelector, useDispatch } from 'react-redux';


const EditSecondaryCategory = ({
    editSecondaryCategoryModal,
    setEditSecondaryCategoryModal,
    allCategories,
    selectedPrimCateId,
    editingSecondaryCategory,
    editingSecondaryCategoryName,
    editingSecondaryCategoryId,
    primaryCategoryForEdit,
    org_id
}) => {
    const dispatch = useDispatch();
    const [changedSecondaryCategory, setChangedSecondaryCategory] = useState(editingSecondaryCategory);

    // Fetch Data
    const editSecondaryCategoriesLoading = useSelector(state => state.categories.editSecondaryCategoriesLoading);
    const editCategoriesError = useSelector(state => state.categories.editCategoriesError);

    // States
    const [state, setState] = useState({
        selectedPrimaryId: null,
        errors: {
            name: "",
            subCategoryName: [],
            s_name: "",
            p_id: "",
        }
    });

    useEffect(() => {
        setState((prevProps) => ({
            ...prevProps,
            selectedPrimaryId: primaryCategoryForEdit.id,
        }));
    }, [primaryCategoryForEdit]);

    // set category errors
    useEffect(() => {
        let errors = state.errors;
        let secondary_category_errors = [];
        if (editCategoriesError.length > 0) {
            editCategoriesError.forEach(error => {
                switch (error.name) {
                    case 'primary_category_name':
                        errors.name = error.message
                        break;
                    case 'secondary_category_name':
                        errors.s_name = error.message;
                        break;

                    default:
                        break;
                }
            })
            errors.subCategoryName = secondary_category_errors;
        } else {
            errors.name = "";
            errors.s_name = "";
            errors.subCategoryName = [];
        }
        setState((prevProps) => ({
            ...prevProps,
            errors,
        }));

    }, [editCategoriesError]);

    useEffect(() => {
        setChangedSecondaryCategory(editingSecondaryCategory);
    }, []);

    useEffect(() => {
        setSecondaryNameChanged(editingSecondaryCategoryName);
    }, [editingSecondaryCategoryName]);

    useEffect(() => {
        setChangedPrimaryCategory(selectedPrimCateId);
    }, [selectedPrimCateId]);

    const [changedPrimaryCategory, setChangedPrimaryCategory] = useState(null);
    const [secondaryNameChanged, setSecondaryNameChanged] = useState(editingSecondaryCategoryName);

    // Validate Form
    const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        if (secondaryNameChanged == "" || primaryCategoryForEdit.id == "")
            valid = false;
        return valid;
    }

    const secondaryCategorySubmitHandler = (event) => {
        event.preventDefault();
        if (validate(state.errors)) {
            const data = {
                p_id: primaryCategoryForEdit.id,
                s_id: editingSecondaryCategoryId,
                s_name: secondaryNameChanged.replace(/\s+/g, ' ').trim(),
                parent_id: changedPrimaryCategory,
                org_id: org_id
            }
            dispatch(editSecondaryCategories(data));
        } else {
            let errors = state.errors;
            if (secondaryNameChanged == "") {
                errors.s_name = "Enter secondary category title"
            }
            if (primaryCategoryForEdit.id == "") {
                errors.p_id = "Select a primary category"
            }
            setState((prevProps) => ({
                ...prevProps,
                errors: errors
            }));
        }
    }
    const handleChangecesomdaryCategory = (event) => {
        event.preventDefault();
        setChangedSecondaryCategory({ name: event.target.value, id: editingSecondaryCategoryId });
        setSecondaryNameChanged(event.target.value);
        let errors = state.errors;
        errors.s_name = "";
        setState((prevProps) => ({
            ...prevProps,
            errors: errors
        }));
    }
    const primaryCategoryChangeHandler = (event) => {
        event.preventDefault();
        setChangedPrimaryCategory(event.target.value);
        setState((prevProps) => ({
            ...prevProps,
            selectedPrimaryId: event.target.value,
        }));

    }
    const handleModalBackdrop = () => { }
    const resetFormAndClose = () => {
        setSecondaryNameChanged(editingSecondaryCategoryName);
        setEditSecondaryCategoryModal(false);
    }
    return (
        <Transition appear show={editSecondaryCategoryModal} as={Fragment}>
            <Dialog as="div" open={editSecondaryCategoryModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-40">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="md:w-[80%] xl:w-[50%] 2xl:w-[40%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-3xl p-10 shadow-lg">
                        <Dialog.Title className="dark:text-gray2 text-2xl 2xl:text-3xl font-bold text-center mb-10">Edit Secondary Category</Dialog.Title>

                        <form onSubmit={(e) => secondaryCategorySubmitHandler(e)}>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='col-start-1 col-span-2 relative mb-3 overflow-hidden'>
                                    <label htmlFor="category_secondary" className='text-sm font-medium dark:text-gray2'>Secondary Category <span className='text-danger'>*</span></label> <br />

                                    <input
                                        type="text"
                                        id="category_secondary"
                                        name="category_secondary"
                                        placeholder='Secondary Category'
                                        className='w-full text-sm dark:bg-darkBg border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus-visible:outline-none'
                                        value={secondaryNameChanged}
                                        onChange={(e) => handleChangecesomdaryCategory(e)}
                                    />
                                    <div className='text-danger mt-1 ml-1'>{state.errors.s_name}</div>
                                </div>

                                <div className='col-start-1 col-span-2 mb-6'>
                                    <label htmlFor="category_primary" className='text-sm font-medium dark:text-gray2'>Primary Category <span className='text-danger'>*</span></label> <br />

                                    <select
                                        name="category_primary"
                                        id="category_primary"
                                        onChange={(e) => primaryCategoryChangeHandler(e)}
                                        className='ed-form__select appearance-none relative w-full text-sm dark:bg-darkBg border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus-visible:outline-none'
                                    >
                                        <option defaultValue disabled>Select</option>
                                        {allCategories.map((category, index) => {
                                            return <option value={category.id} selected={state.selectedPrimaryId == category.id}>{category.name}</option>
                                        })}
                                    </select>
                                    <div className='text-danger mt-1 ml-1'>{state.errors.p_id}</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-10">
                                <button type='reset' onClick={() => dispatch(setShowSecondaryCategoryModal(false))} className='bg-transparent text-sm 2xl:text-base text-black2 dark:text-gray2 font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    disabled={editSecondaryCategoriesLoading}
                                    className={`${editSecondaryCategoriesLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary md:text-sm 2xl:text-base text-white font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                                >
                                    {editSecondaryCategoriesLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}

export default EditSecondaryCategory;