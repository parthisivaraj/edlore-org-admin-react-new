import React, { Fragment, useState } from 'react';
import { Transition, Dialog } from "@headlessui/react";


const EditCategory = ({ setShowCategoryModal, showCategoryModal, setEditSecondaryCategoryModal }) => {

    const [addCategory, setAddCategory] = useState(0);
    const [editCategory, setEditCategory] = useState(false);

    // Delete Secondary Field
    const deleteCategoryField = (id) => {
        setAddCategory(addCategory.filter(item => item.id !== id));
    }

    // Add/Edit Secondary Field
    const handleCategoryField = () => {
        let i = 0;
        let inputs = [];
        for (i = 0; i < addCategory; i++) {
            inputs.push(<>
                <div className='relative mb-3 overflow-hidden'>
                    <input
                        type="text"
                        id="category_secondary"
                        name="category_secondary"
                        placeholder='Secondary Category'
                        className='w-full text-sm border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus:outline-0 focus-visible:outline-0'
                    />
                    <div className="absolute right-[4px] top-[16px]">
                        <button type='button' onClick={() => setEditSecondaryCategoryModal(true)} className='bg-white focus:outline-0 focus-visible:outline-0' title="Edit">
                            <img src="../assets/icons/icon-edit.svg" alt="icon-edit" className='opacity-80 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300' />
                        </button>
                        <button onClick={() => deleteCategoryField()} type='button' className='bg-white px-4 focus:outline-0 focus-visible:outline-0' title="Delete">
                            <img src="../assets/icons/icon-delete.svg" alt="icon-delete" className='opacity-80 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300' />
                        </button>
                    </div>
                </div>
            </>)
        }
        return inputs;
    }

    return (
        <>
            <Transition appear show={showCategoryModal} as={Fragment}>
                <Dialog as="div" open={showCategoryModal} onClose={() => setShowCategoryModal(false)} className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="md:w-[80%] xl:w-[60%] 2xl:w-[40%]  h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 rounded-3xl p-10 shadow-lg">
                            <Dialog.Title className="dark:text-black3 text-3xl font-bold text-center mb-10">Edit Category</Dialog.Title>

                            <form>
                                <div className='mb-6'>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="category_primary" className='text-sm font-medium dark:text-black3'>Primary Category <span className='text-danger'>*</span></label>
                                        {editCategory === false ?
                                            <button onClick={() => setEditCategory(true)} type='button' className='text-sm font-medium text-primary opacity-75 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>Edit</button>
                                            :
                                            <button onClick={() => setEditCategory(true)} type='button' className='text-sm font-medium text-primary opacity-75 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>Save</button>
                                        }
                                    </div>
                                    {editCategory ?
                                        <input
                                            type="text"
                                            id="category_primary"
                                            name="category_primary"
                                            placeholder='Primary Category'
                                            className='w-full text-sm border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 mt-1 focus:border-secondary focus-visible:outline-none'
                                        />

                                        :

                                        <select
                                            name="category_primary"
                                            id="category_primary"
                                            className='ed-form__select appearance-none relative w-full text-sm border border-gray2 rounded-md py-3 px-4 mt-1 focus:border-secondary focus-visible:outline-none'
                                        >
                                            <option defaultValue disabled>Select</option>
                                            <option value="">Primary Category 1</option>
                                        </select>
                                    }
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="category_secondary" className='text-sm font-medium dark:text-black3'>Secondary Category</label>
                                        <button onClick={() => setAddCategory(addCategory + 1)} type='button' className='text-sm font-medium text-primary opacity-75 transition-all duration-300 hover:opacity-100 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>Add Secondary Category +</button>
                                    </div>
                                </div>

                                <div className='h-[250px]  pr-2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-black2 scrollbar-track-gray4 dark:scrollbar-track-black3  scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl'>
                                    {handleCategoryField()}
                                </div>

                                <div className="flex items-center justify-end mt-10">
                                    <button type='button' onClick={() => setShowCategoryModal(false)} className='bg-transparent text-sm text-black2  font-medium border border-black2 rounded-full px-8 py-2.5 shadow-sm transition-all duration-300 hover:bg-black2 hover:text-white hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                                        Cancel
                                    </button>
                                    <button type='button' className='bg-secondary text-sm text-white font-medium border border-secondary rounded-full px-8 py-2.5 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0'>
                                        Add Category
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
}

export default EditCategory;