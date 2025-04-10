import React, { useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { nodeInstance } from "../../api/api_instance";

const AddNewPartFields = ({
  showModal,
  closeModal,
  modelData,
  isEditMode,
}) => {
  const authData = useSelector((state) => state.auth.authData);
  const history = useHistory();

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal && isEditMode && modelData) {
      setName(modelData.name);
    } else {
      setName("");
      setError("");
    }
  }, [showModal, isEditMode, modelData]);

  const saveHandler = async () => {
    if (!name) {
      setError("Name required.");
      return;
    }
    const data = {
      name: name.trim(),
      org_id: authData.org_id,
    };

    try {
      setLoading(true);
      if (isEditMode && modelData && modelData.id) {
        await nodeInstance({
          url: `part_fields/${modelData.id}`,
          method: "PUT",
          data,
        });

      } else {
        await nodeInstance({
          url: `part_fields`,
          method: "POST",
          data,
        });
      }

      resetFormAndClose();
    } catch (error) {
      console.error("Error saving part field:", error);
      setError("Failed to save the part field Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetFormAndClose = () => {
    setName("");
    setError("");
    closeModal();
  };

  const cancelHandler = () => {
    resetFormAndClose();
    history.push("/part-fields");
  };

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as="div"
        open={showModal}
        onClose={cancelHandler}
        className="fixed inset-0 z-50 py-10 2xl:py-48 flex items-start xl:items-center justify-center bg-black2 bg-opacity-40 dark:bg-darkMainBg dark:bg-opacity-60"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-[96%] lg:w-[80%] xl:w-[50%] 2xl:w-[50%] h-auto bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-20 rounded-3xl p-10 shadow-xl">
            <Dialog.Title className="text-xl font-semibold">
              {isEditMode ? "Update Part Field" : "Add New Part Field"}
            </Dialog.Title>
            <div className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                  <span className="text-danger">*</span>
                </label>
                
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md text-sm dark:bg-darkBg dark:text-gray2"
                  placeholder="Enter name"
                />
              </div>

              {error && (
                <div className="text-danger text-red-600 text-sm mt-2">{error}</div>
              )}

              <div className="mt-6 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={(e) => cancelHandler(e)}
                    className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                  >
                    Cancel
                </button>

                <button
                  type="button"
                  onClick={saveHandler}
                  className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-2 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default AddNewPartFields;
