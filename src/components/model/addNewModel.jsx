import React, { Fragment, useState, useEffect } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { getAllCategories, getSecondaryCategories, setShowCategoryModal } from "../../redux/reduxes/categories/categoryAction";
import { createModel, setModelModal, resetModelErrors, updateModel } from "../../redux/reduxes/theModels/modelAction";
import { useSelector, useDispatch } from 'react-redux';
import AddNewCategory from "../../components/categories/addNewCategory";

const AddNewModel = ({ showModal, editingModelId, editModel }) => {
    const dispatch = useDispatch();

    // Fetch Data
    const authData = useSelector(state => state.auth.authData);
    const allCategories = useSelector(state => state.categories.allCategories);
    const secondaryCategories = useSelector(state => state.categories.secondaryCategories);
    const createModelsError = useSelector(state => state.models.createModelsError);
    const showEditCategoriesModal = useSelector(state => state.categories.showEditCategoriesModal);
    const details = useSelector(state => state.models.modelDetails);
    const createModelsLoading = useSelector(state => state.models.createModelsLoading);
    const updateModelsLoading = useSelector(state => state.models.updateModelsLoading);
    const permissions = useSelector(state => state.auth.allPermissions);

    // Dispatch to All Categories
    useEffect(() => {
        const data = {
            org_id: authData.org_id,
            paginate: false,
        }
        dispatch(getAllCategories(data));
    }, [authData]);

    // useEffect(() => {
    //     const data = {
    //         org_id: authData.org_id,
    //         paginate: false,
    //     }
    //     dispatch(getAllCategories(data));
    // }, [authData]);

    useEffect(() => {
        editModel && setModalSegment(1);
    }, []);


    // States
    const [state, setState] = useState({
        device_primary_category: "",
        device_secondary_category: null,
        model_name: "",
        model_id: "",
        errors: {
            device_primary_category: '',
            device_secondary_category: '',
            model_name: "",
            model_id: "",
        }
    });
    useEffect(() => {
        if (state.device_primary_category != "") {
            dispatch(getSecondaryCategories(state.device_primary_category));
        }

    }, [allCategories]);

    // set the details to state here
    useEffect(() => {
        let primary_categoryId = null;
        let secondary_categoryId = null;
        if (details && details.primary_category && details.primary_category.id && details.primary_category.id) {
            primary_categoryId = details.primary_category.id;
            dispatch(getSecondaryCategories(details.primary_category.id));
        } else if (details && details.secondary_category && details.secondary_category.super_category && details.secondary_category.super_category.id) {
            secondary_categoryId = details.secondary_category.id;
            primary_categoryId = details.secondary_category.super_category.id
            dispatch(getSecondaryCategories(details.secondary_category.super_category.id));
        }
        editModel && setState((prevProps) => ({
            ...prevProps,
            device_primary_category: primary_categoryId,
            device_secondary_category: secondary_categoryId,
            model_name: details && details.title && details.title,
            model_id: details && details.model_id && details.model_id,
        }));
    }, [details]);

    // set errrors
    useEffect(() => {
        let errors = state.errors;
        if (createModelsError.length > 0) {
            createModelsError.forEach(error => {

                switch (error.name) {
                    case 'title':
                        errors.model_name = error.message
                        break;
                    case 'model_id':
                        errors.model_id = error.message
                        break;
                    default:
                        break;
                }
            })
        } else {
            errors.model_name = ""
            errors.model_id = ""
        }
        setState((prevProps) => ({
            ...prevProps,
            errors,
        }));
    }, [createModelsError]);

    const [modalSegment, setModalSegment] = useState(0);

    // Category Segment Handler
    const categoryAssignment = (event) => {
        event.preventDefault();
        if (state.device_primary_category && state.device_primary_category != "") {
            setModalSegment(2);
        } else {
            let errors = state.errors;
            errors.device_primary_category = "Select category"
            setState((prevProps) => ({
                ...prevProps,
                errors: errors
            }));
        }
    }

    // Form Validation
    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };

    // Handle Segment One Changes
    const handleChangeStepOne = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name == "device_primary_category") {
            setState((prevProps) => ({
                ...prevProps,
                device_primary_category: value,
                device_secondary_category: null
            }));
            //here get all secondary
            dispatch(getSecondaryCategories(value));
        }
        if (name == "device_secondary_category") {
            setState((prevProps) => ({
                ...prevProps,
                device_secondary_category: value
            }));
        }
    }

    // Handle Segment Two Changes
    const handleChangeStepTwo = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = state.errors;
        switch (name) {
            case 'model_name':
                errors.model_name = value == "" ? "Model Name must be atleast 3 characters long" : value.length > 150 ? "Model Name shouldn't exceed more than 150 characters" : ""
                break;
            case 'model_id':
                errors.model_id = value == "" ? "Enter Model Number" : value.length > 150 ? "Model Number shouldn't exceed more than 150 characters" : ""
                break;
            default:
                break;
        }
        setState((prevProps) => ({
            ...prevProps,
            [name]: value,
            errors
        }));
        dispatch(resetModelErrors());
    }

    // Validate User Form
    const validateUserForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (val = false));
        if (state.model_name == "" ||
            state.model_name.replace(/\s+/g, '').length == 0 ||
            state.model_name.length > 150 ||
            state.model_id == "" ||
            state.model_id.replace(/\s+/g, '').length == 0 ||
            state.model_id.length > 150
        )
            valid = false;
        return valid;
    }

    // Form Submit
    const submitModel = (event) => {
        event.preventDefault();
        if (validateUserForm(state.errors)) {
            const data = {
                category_id: (state.device_secondary_category == null || state.device_secondary_category == "") ? state.device_primary_category : state.device_secondary_category,
                which_category: (state.device_secondary_category == null || state.device_secondary_category == "") ? 1 : 2,
                title: state.model_name.replace(/\s+/g, ' ').trim(),
                model_id: state.model_id.replace(/\s+/g, ' ').trim(),
            }
            const updateData = {
                category_id: (state.device_secondary_category == null || state.device_secondary_category == "") ? state.device_primary_category : state.device_secondary_category,
                which_category: (state.device_secondary_category == null || state.device_secondary_category == "") ? 1 : 2,
                title: state.model_name.replace(/\s+/g, ' ').trim(),
                model_id: state.model_id.replace(/\s+/g, ' ').trim(),
                id: editingModelId,
            }
            if (editModel) {
                dispatch(updateModel(updateData));
            } else {
                dispatch(createModel(data));
            }

            // setTimeout(function () {
            //     setShowModal(false)
            // }, 1000);
        } else {
            let errors = state.errors;
            if (state.model_name == "" || state.model_name.replace(/\s+/g, '').length == 0)
                errors.model_name = "Enter Model Name"
            if (state.model_id == "" || state.model_id.replace(/\s+/g, '').length == 0)
                errors.model_id = "Enter Model Id"

            setState((prevProps) => ({
                ...prevProps,
                errors: errors
            }));
        }
    }

    // Category States
    // const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    const [primaryCategoryForEdit, setPrimaryCategoryForEdit] = useState({});

    // Edit Category Modal
    const setShowEditCategoryModal = (way, changingPrimary) => {
        let editingCategory = {}
        changingPrimary && allCategories.length > 0 && allCategories.forEach(data => {
            if (data.id == changingPrimary) {
                editingCategory = data;
            }
        })
        // const cateDetails = changingPrimary && changingPrimary.length > 0 && allCategories.filter(c => c.id == changingPrimary)
        setEditCategory(way);
        setPrimaryCategoryForEdit(editingCategory);
        // setShowCategoryModal(true);
        const data = {
            show: true,
            pCateId: editingCategory
        }
        dispatch(setShowCategoryModal(data));
    }

    // Backdrop that stops Modal from Closing
    const handleModalBackdrop = () => { }

    // Reset the Form Values on Close
    const resetFormAndClose = () => {
        setState((prevProps) => ({
            ...prevProps,
            device_primary_category: "",
            device_secondary_category: "",
            model_name: "",
            model_id: "",
            errors: {
                device_primary_category: '',
                device_secondary_category: '',
                model_name: "",
                model_id: "",
            }
        }));
        setModalSegment(0);
        // setShowModal(false);
        dispatch(setModelModal(false));
    }

    return (
        <>
            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" open={showModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        {modalSegment === 0 ?
                            <Dialog.Panel className="w-[96%] lg:w-[80%] xl:w-[75%] 2xl:w-[60%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl text-center p-8 shadow-lg">
                                <Dialog.Title className="text-2xl 2xl:text-3xl font-bold">{editModel ? "Edit Model" : "Add New Model"}</Dialog.Title>
                                <Dialog.Description className="text-base 2xl:text-lg opacity-50 mb-10 xl:mb-20">{editModel ? "Modify the specifications of an existing Model" : "Get started by adding a new model"}</Dialog.Description>

                                <div className="grid grid-cols-3 gap-8">
                                    <div className="col-start-1 mb-12">
                                        <div className="text-base font-medium text-center mb-4">1. Assign Device Category</div>
                                        <div className='w-full h-full border bg-gray2 dark:bg-darkMainBg border-gray2 dark:border-darkMainBg rounded-md'>
                                            <img src="../assets/images/devices/category-details.gif" alt="assign-device-category" className="w-full h-full bg-gray2 dark:bg-darkMainBg border border-gray2 dark:border-darkMainBg rounded-md" />
                                        </div>
                                    </div>

                                    <div className="col-start-2 mb-12">
                                        <div className="text-base font-medium text-center mb-4">2. Add Models</div>
                                        <div className='w-full h-full border bg-gray2 dark:bg-darkMainBg border-gray2 dark:border-darkMainBg rounded-md'>
                                            <img src="../assets/images/devices/model-details.gif" alt="assign-device-model" className="w-full h-full bg-gray2 dark:bg-darkMainBg border border-gray2 dark:border-darkMainBg rounded-md" />
                                        </div>
                                    </div>

                                    <div className="col-start-3 mb-12">
                                        <div className="text-base font-medium text-center mb-4">3. Add Devices</div>
                                        <div className='w-full h-full border bg-gray2 dark:bg-darkMainBg border-gray2 dark:border-darkMainBg rounded-md'>
                                            <img src="../assets/images/devices/device-details.gif" alt="assign-device" className="w-full h-full bg-gray2 dark:bg-darkMainBg border border-gray2 dark:border-darkMainBg rounded-md" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-12">
                                    <button
                                        type="button"
                                        onClick={() => resetFormAndClose()}
                                        className="bg-gray dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0"
                                        onClick={() => setModalSegment(1)}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </Dialog.Panel>

                            : modalSegment === 1 ?
                                <Dialog.Panel className="w-[96%] lg:w-[80%] xl:w-[75%] 2xl:w-[60%] h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl p-12 shadow-lg">
                                    <Dialog.Title className="text-2xl 2xl:text-3xl text-center font-bold capitalize  mb-10 xl:mb-20">Assign device category</Dialog.Title>
                                    {/* <Dialog.Description className="text-base 2xl:text-lg text-center opacity-50 mb-10 xl:mb-20">Lorem ipsum dolor sit amet, consetr</Dialog.Description> */}
                                    <form onSubmit={(e) => categoryAssignment(e)}>
                                        <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                                            <div className="col-start-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label htmlFor="device_primary_category" className="text-sm font-medium">Primary Category <span className="text-danger">*</span></label>
                                                    {(permissions.includes("all_category") || permissions.includes("write_category") || permissions.includes("Admin")) &&
                                                        <button type="button" onClick={() => setShowEditCategoryModal(false, {})} className="text-sm text-primary font-medium">Add new primary category +</button>
                                                    }
                                                </div>
                                                {allCategories &&
                                                    <select
                                                        name="device_primary_category"
                                                        id="device_primary_category"
                                                        className="ed-form__select appearance-none relative w-full h-[45px] 2xl:h-[50px] text-sm 2xl:text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-1 2xl:py-3 px-4 focus:border-secondary focus:outline-none"
                                                        onChange={(e) => handleChangeStepOne(e)}
                                                    >
                                                        <option value="" defaultValue >Select</option>
                                                        {allCategories.map(category => (<option value={category.id && category.id}
                                                            selected={category.id == state.device_primary_category}
                                                        >{category.name && category.name}</option>))}
                                                        {/* <option value="" disabled>Select</option>
                                        <option value="">Air Compressor</option>
                                        <option value="">Air Compressor</option> */}
                                                    </select>
                                                }
                                                <div className='text-danger mt-1 ml-1'>{state.errors.device_primary_category}</div>
                                            </div>
                                            {state.device_primary_category &&
                                                <div className="xl:col-start-2">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <label htmlFor="device_secondary_category" className="text-sm font-medium">Secondary Category</label>
                                                        {(permissions.includes("all_category") || permissions.includes("write_category") || permissions.includes("Admin")) &&
                                                            <button onClick={() => setShowEditCategoryModal(true, state.device_primary_category)} type="button" className="text-sm text-primary font-medium">Add new secondary category +</button>
                                                        }
                                                    </div>
                                                    <select
                                                        name="device_secondary_category"
                                                        id="device_secondary_category"
                                                        className="ed-form__select appearance-none relative w-full h-[45px] 2xl:h-[50px] text-sm 2xl:text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-1 2xl:py-3 px-4 focus:border-secondary focus:outline-none"
                                                        onChange={(e) => handleChangeStepOne(e)}
                                                    >
                                                        <option value="" defaultValue disabled>Select</option>
                                                        <option value="" >Add model to the primary category</option>
                                                        {secondaryCategories.map(category => (<option value={category.id}
                                                            selected={state.device_secondary_category == category.id}
                                                        >{category.name}</option>))}
                                                    </select>
                                                </div>
                                            }
                                        </div>

                                        <div className="flex items-center justify-end mt-14">
                                            <button
                                                type="button"
                                                onClick={() => setModalSegment(0)}
                                                className="bg-gray dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="reset"
                                                onClick={() => resetFormAndClose()}
                                                className="bg-gray dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 ml-5  shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3  hover:transition-all hover:duration-300 focus:outline-0"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-12 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0"
                                            // onClick={(e) => categoryAssignment(e)}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </form>
                                    <AddNewCategory
                                        // setShowCategoryModal={setShowCategoryModal}
                                        showCategoryModal={showEditCategoriesModal}
                                        editCategory={editCategory}
                                        primaryCategoryForEdit={primaryCategoryForEdit}
                                    />
                                </Dialog.Panel>

                                : modalSegment === 2 ?
                                    <Dialog.Panel className="w-[96%] lg:w-[80%] xl:w-[75%] 2xl:w-[60%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl p-12 shadow-lg">
                                        <Dialog.Title className="text-2xl 2xl:text-3xl text-center font-bold">{editModel ? "Edit Model" : "Add New Model"}</Dialog.Title>
                                        <Dialog.Description className="text-base 2xl:text-lg text-center opacity-50 mb-10 xl:mb-20">{editModel ? "Modify the specifications of an existing Model" : "Get started by adding a new model"}</Dialog.Description>
                                        <form onSubmit={(e) => submitModel(e)} >
                                            <div className="grid xl:grid-cols-2 md:gap-5 2xl:gap-8">
                                                <div className="col-start-1">
                                                    <div>
                                                        <label htmlFor="model_name" className="text-sm font-medium">
                                                            <span className='whitespace-nowrap'>Model Name</span>
                                                            <span className="text-danger">*</span>
                                                            <span className='text-gray3 text-sm ml-1'> (Please enter unique Name, Limit: 150 chars)</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="model_name"
                                                            id="model_name"
                                                            value={state.model_name}
                                                            placeholder="Enter Model Name"
                                                            onChange={(e) => handleChangeStepTwo(e)}
                                                            className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                                                            maxLength={150}
                                                        />
                                                    </div>
                                                    <div className='text-danger mt-1 ml-1'>{state.errors.model_name}</div>
                                                </div>

                                                <div className="col-start-1 xl:col-start-2">
                                                    <div>
                                                        <label htmlFor="model_id" className="text-sm font-medium">
                                                            <span className='whitespace-nowrap'>Model Number</span>
                                                            <span className="text-danger">*</span>
                                                            <span className='text-gray3 text-sm ml-1'> (Please enter unique Number, Limit: 150 chars)</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="model_id"
                                                            id="model_id"
                                                            value={state.model_id}
                                                            placeholder="Enter Model Number"
                                                            onChange={(e) => handleChangeStepTwo(e)}
                                                            className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-none"
                                                            maxLength={150}
                                                        />
                                                    </div>
                                                    <div className='text-danger mt-1 ml-1'>{state.errors.model_id}</div>
                                                </div>
                                            </div>


                                            <div className="flex items-center justify-end mt-14">
                                                <button
                                                    type="button"
                                                    onClick={() => setModalSegment(1)}
                                                    className="bg-gray dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => resetFormAndClose()}
                                                    className="bg-gray dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={createModelsLoading || updateModelsLoading}
                                                    className={`${createModelsLoading || updateModelsLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-12 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0`}
                                                >
                                                    {editModel ? (updateModelsLoading ? "Updating..." : "Update") : (createModelsLoading ? "Saving..." : "Save")}
                                                </button>
                                            </div>
                                        </form >
                                    </Dialog.Panel>
                                    : null
                        }
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
}

export default AddNewModel;