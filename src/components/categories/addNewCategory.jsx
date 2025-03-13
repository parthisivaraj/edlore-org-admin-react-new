import React, { Fragment, useState, useEffect } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { useSelector, useDispatch } from 'react-redux';
import EditSecondaryCategory from "./editSecondaryCategory";
import { getAllCategories, getSecondaryCategories, editCategories, setShowCategoryModal, resetErrors, setShowSecondaryCategoryModal, deleteCategories } from "../../redux/reduxes/categories/categoryAction";
import DeleteCategory from '../../components/categories/deleteCategory';
import SecondaryCategoryList from './secondaryCategoryList';

const AddNewCategory = ({ showCategoryModal, editCategory, primaryCategoryForEdit }) => {

	// Fetch Data
	const authData = useSelector(state => state.auth.authData);
	const createCategoryLoading = useSelector(state => state.categories.createCategoryLoading);
	const editCategoriesLoading = useSelector(state => state.categories.editCategoriesLoading);
	const editCategoriesError = useSelector(state => state.categories.editCategoriesError);
	const showAssignAndDelete = useSelector(state => state.categories.showAssignAndDelete);
	const showEditSecondartCategoriesModal = useSelector(state => state.categories.showEditSecondartCategoriesModal);

	const dispatch = useDispatch();


	// Reset the Details
	const [primaryCategoryNewName, setPrimaryCategoryNewName] = useState("");
	function resetThePageDetails() {
		setNewSecoCate([]);
		setPrimaryCategoryNewName("");
	};

	// Dispatch
	useEffect(() => {
		const data = {
			org_id: authData.org_id,
			paginate: false,

		}
		resetThePageDetails();
		dispatch(getAllCategories(data));

	}, []);

	// Dispatch
	useEffect(() => {
		showCategoryModal == true && resetThePageDetails();
	}, [showCategoryModal]);

	useEffect(() => {
		if (primaryCategoryForEdit && primaryCategoryForEdit.name) {
			setPrimaryCategoryNewName(primaryCategoryForEdit.name);
			setSelectedPrimCateId(primaryCategoryForEdit.id);
			dispatch(getSecondaryCategories(primaryCategoryForEdit.id));
		}
	}, [primaryCategoryForEdit]);

	// Fetch Data
	const allCategories = useSelector(state => state.categories.allCategories);
	const secondaryCategories = useSelector(state => state.categories.secondaryCategories);

	useEffect(() => {
		setSelectedSecoCate(secondaryCategories)
	}, [secondaryCategories]);

	// States
	const [state, setState] = useState({
		emptyErrors: [],
		errors: {
			name: "",
			subCategoryName: [],
			s_name: "",
		}
	});

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
						secondary_category_errors.push(error);
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


	function setEditSecondaryCategoryModal() {
		dispatch(setShowSecondaryCategoryModal(true));
	}


	const [selectedPrimCateId, setSelectedPrimCateId] = useState(null);
	const [selectedSecoCate, setSelectedSecoCate] = useState(secondaryCategories);
	const [newSecoCate, setNewSecoCate] = useState([]);
	const [editingSecondaryCategory, setEditingSecondaryCategory] = useState({});
	const [editingSecondaryId, setEditingSeconsaryId] = useState(null);
	const [categoryError, setCategoryError] = useState("");


	useEffect(() => {
		editCategoriesError && editCategoriesError.name && editCategoriesError.name.length != 0 && setCategoryError(editCategoriesError.name[0]);
		// editCategoriesError && editCategoriesError.sub_categories && editCategoriesError.sub_categories.name && editCategoriesError.sub_categories.name.length != 0 && setSubCategoryError(editCategoriesError.sub_categories.name.name[0]);
	}, [editCategoriesError])
	const deleteCategoryField = (cateId) => {
		const secoCate = selectedSecoCate.filter(item => item.id !== cateId);
		setSelectedSecoCate(secoCate);
	}
	const setErrormessage = (i, action) => {
		if (action == "add") {
			setState((prevProps) => ({
				...prevProps,
				emptyErrors: [...state.emptyErrors, i]
			}));
		} else {
			setState((prevProps) => ({
				...prevProps,
				emptyErrors: state.emptyErrors.filter(x => x != i)
			}));
		}
	}
	const newSecoCateNameChange = (event, index) => {
		let x = [];
		if (event.target.value.replace(/\s+/g, ' ').trim() == "") {
			setErrormessage(index, "add")
		} else {
			setErrormessage(index, "remove")
		}
		newSecoCate.forEach((data, i) => {
			if (index === i) {
				x.push({ name: event.target.value })
			} else {
				x.push({ name: data.name })
			}
		})
		setNewSecoCate(x);
		dispatch(resetErrors());
	}

	const editSecondaryMaped = (name, s_category_id) => {
		setEditSecondaryCategoryModal(true);
		setEditingSecondaryCategory({ name: name, id: s_category_id });
	}
	// Hide Delete Popup
	useEffect(() => {
		setDeleteCategoryModal(false);
		setChangeModelsDeleteCategory(showAssignAndDelete);

	}, [showAssignAndDelete]);

	const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
	const [changeModelsDeleteCategory, setChangeModelsDeleteCategory] = useState(false);
	const [deletingCateId, setDeletingCateId] = useState(null)
	const confirmDeleteCategory = (stat, id) => {
		setDeleteCategoryModal(stat);
		setDeletingCateId(id)
	}
	const listSecondaryategoryField = () => {
		let inputs = [];
		const removeCategoriesFromTheIndex = (ind) => {
			function alterTheError() {
				let newErr = [];
				state.emptyErrors.filter(x => x != ind).forEach(y => {
					y > ind ? newErr.push(y - 1) : newErr.push(y);
				})
				return newErr;
			}
			setNewSecoCate(newSecoCate.filter((c, index) => ind != index));
			setState((prevProps) => ({
				...prevProps,
				emptyErrors: alterTheError()
			}));
		}

		newSecoCate.map((data, index) => {
			inputs.push(
				<>
					<div className='relative mb-1 overflow-hidden mr-2'>
						<input
							type="text"
							id="category_secondary"
							name="category_secondary"
							placeholder='Secondary Category'
							value={data.name}
							onChange={(e) => newSecoCateNameChange(e, index)}
							className='w-full text-sm dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 overflow-hidden focus:border-secondary focus-visible:outline-none'
						/>
						<div className="flex flex-col justify-center absolute right-[1px] top-[5px] bg-gray2 dark:bg-darkMainBg w-[50px] h-[45px] border border-white dark:border-darkBg rounded-r-md">
							<button
								onClick={() => removeCategoriesFromTheIndex(index)}
								type='button' className='bg-transparent px-4 focus:outline-0 focus-visible:outline-0' title="Delete">
								<img src="../assets/icons/icon-delete.svg" alt="icon-delete" className='opacity-80 transition-all duration-300 dark:invert hover:opacity-100 hover:transition-all hover:duration-300' />
							</button>
						</div>
					</div>
					{state.emptyErrors.includes(index) && <div className='text-danger mt-1 ml-1'>Enter a title for the secondary category</div>}
					{state.errors.subCategoryName.map(err => {
						return err.index == index + selectedSecoCate.length ? <div className='text-danger mt-1 mb-3 ml-1'>{err.message}</div> : ""
					})}
				</>
			)
		}
		)
		editCategory && selectedSecoCate.map((pCate, i) => {
			inputs.push(
				<>
					<SecondaryCategoryList
						i={i}
						pCate={pCate}
						editSecondaryMaped={editSecondaryMaped}
						deleteCategoryField={deleteCategoryField}
						selectedPrimCateId={selectedPrimCateId}
					/>

				</>
			)
		})
		return inputs;
	}
	const changePrimartCateName = (v) => {
		setCategoryError("")
		setPrimaryCategoryNewName(v);
		dispatch(resetErrors());
	}
	const onChangePrimaryCategory = (event) => {
		setSelectedPrimCateId(event.target.value);
		dispatch(getSecondaryCategories(event.target.value));
	}
	const submitCategoryHandler = (event) => {
		event.preventDefault();
		const thePrimary = allCategories.filter(c => c.id == selectedPrimCateId);
		const remainingSecondaryCategoryId = [];

		selectedSecoCate.forEach((p) => {
			remainingSecondaryCategoryId.push(p.id);
		});
		let squishedSecondaryCategory = [];
		newSecoCate.forEach(data => {
			squishedSecondaryCategory.push({ name: data.name.replace(/\s+/g, ' ').trim() })
		})

		if (primaryCategoryNewName != "") {
			let data = {};
			if (editCategory) {
				data = {
					editCategory: editCategory,
					primaryCategoryNewName: primaryCategoryNewName.replace(/\s+/g, ' ').trim(),
					primaryCategoryId: selectedPrimCateId,
					name: primaryCategoryNewName.replace(/\s+/g, ' ').trim(),
					org_id: authData.org_id,
					remainingSecondaryCategoryId: remainingSecondaryCategoryId,
					newSecoCate: squishedSecondaryCategory,
					secondaryCategories: secondaryCategories
				};
			} else {
				data = {
					editCategory: editCategory,
					primaryCategoryNewName: primaryCategoryNewName.replace(/\s+/g, ' ').trim(),
					primaryCategoryId: selectedPrimCateId,
					name: primaryCategoryNewName.replace(/\s+/g, ' ').trim(),
					org_id: authData.org_id,
					remainingSecondaryCategoryId: remainingSecondaryCategoryId,
					newSecoCate: squishedSecondaryCategory,
					secondaryCategories: secondaryCategories
				};
			}
			dispatch(editCategories(data));
			// setShowCategoryModal(false);
			setCategoryError("");
			// resetFormAndClose();
		} else {
			setCategoryError("Enter Primary Category Name");
		}
	}
	const handleModalBackdrop = () => { }
	// const resetFormAndClose = () => {
	// 	setPrimaryCategoryNewName("");
	// 	setNewSecoCate([])
	// 	const data = {
	// 		show: false,
	// 	}
	// 	setShowCategoryModal(false);
	// }
	function colseTheModel() {
		const data = {
			org_id: authData.org_id,
			paginate: true,
		}
		const data2 = {
			show: false
		}
		dispatch(getAllCategories(data));
		dispatch(setShowCategoryModal(data2));
		dispatch(resetErrors());
	}

	return (
		<>
			<Transition appear show={showCategoryModal} as={Fragment}>
				<Dialog as="div" open={showCategoryModal} onClose={() => handleModalBackdrop(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel className="w-[96%] lg:w-[80%] xl:w-[50%] 2xl:w-[50%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl p-10 shadow-lg">
							<Dialog.Title className="dark:text-gray2 text-2xl 2xl:text-3xl font-bold text-center mb-10">{editCategory ? "Edit Category" : "Add	New Category"}</Dialog.Title>

							<form onSubmit={(e) => submitCategoryHandler(e)}>
								<div className='mb-6'>
									<div className="flex items-center justify-between">
										<label htmlFor="category_primary" className='text-sm font-medium dark:text-gray2'>Primary Category
											<span className='text-danger'> * </span>
											<span className='text-gray3'>(Please enter unique Name, Limit: 150 chars)</span>
										</label>
									</div>
									{
										<input
											type="text"
											id="category_primary"
											name="category_primary"
											placeholder='Primary Category'
											onChange={(e) => changePrimartCateName(e.target.value)}
											value={primaryCategoryNewName}
											maxLength={150}
											className='w-full text-sm dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-0 focus-visible:outline-0'
										/>

										// <select
										// 	name="category_primary"
										// 	id="category_primary"
										// 	onChange={(e) => onChangePrimaryCategory(e)}
										// 	className='ed-form__select appearance-none relative w-full text-sm border border-gray2 rounded-md py-3 px-4 mt-1 focus:border-secondary focus-visible:outline-none'
										// >
										// 	<option disabled>Select</option>
										// 	{allCategories.map((primaCat, index) => {
										// 		return (<option value={primaCat.id} selected={primaryCategoryForEdit.id == primaCat.id} key={index}>{primaCat.name}</option>)
										// 	})}
										// </select>
									}
									<div className='text-danger mt-1 ml-1'>{categoryError}</div>
									<div className='text-danger mt-1 ml-1'>{state.errors.name}</div>
								</div>


								<div>
									<div className="flex items-center justify-between mb-2">
										<label htmlFor="category_secondary" className='text-sm font-medium dark:text-gray2'>Secondary Category</label>
										<button onClick={() => setNewSecoCate([{ name: `Seconadry category ${newSecoCate.length + 1}` }, ...newSecoCate])} type='button' className='text-sm font-medium text-primary opacity-75 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>Add Secondary Category +</button>
									</div>
								</div>

								<div className='h-[250px]  pr-2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
									{listSecondaryategoryField()}
								</div>


								<div className="flex items-center justify-end mt-10">
									<button type='reset' onClick={() => colseTheModel()} className="bg-gray dark:bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0">
										Cancel
									</button>
									{state.emptyErrors.length == 0 &&
										<button
											type='submit'
											disabled={createCategoryLoading || editCategoriesLoading}
											className={`${createCategoryLoading || editCategoriesLoading ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6" : ""} bg-secondary text-sm 2xl:text-base text-white font-medium border border-secondary rounded-full px-8 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
										>
											{editCategory ? (editCategoriesLoading ? "Saving..." : 'Save Changes') : (createCategoryLoading ? "Adding..." : 'Add Category')}
										</button>
									}
								</div>
							</form>

							{/* Edit Secondary Category : Start */}
							{showEditSecondartCategoriesModal &&
								<EditSecondaryCategory
									allCategories={allCategories}
									selectedPrimCateId={selectedPrimCateId}
									editingSecondaryCategoryName={editingSecondaryCategory.name}
									editingSecondaryCategoryId={editingSecondaryCategory.id}
									editSecondaryCategoryModal={showEditSecondartCategoriesModal}
									editingSecondaryId={editingSecondaryId}
									// setEditSecondaryCategoryModal={setEditSecondaryCategoryModal}
									primaryCategoryForEdit={primaryCategoryForEdit}
									org_id={authData.org_id}
								/>
							}
							{/* Edit Secondary Category ; End */}
							{/* Delete Category after assign other: Start */}
							{changeModelsDeleteCategory && window.location.pathname != "/device-category" &&
								<DeleteCategory
									deleteCategoryModal={changeModelsDeleteCategory}
									setDeleteCategoryModal={setChangeModelsDeleteCategory}
									deleteAction={deleteCategories}
									id={selectedSecoCate}
									deleteFrom="primary"
								/>
							}

						</Dialog.Panel>
					</Transition.Child>
				</Dialog>
			</Transition>
		</>
	);
}

export default AddNewCategory;