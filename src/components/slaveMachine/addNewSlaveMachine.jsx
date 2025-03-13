import React, { useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { nodeInstance } from "../../api/api_instance";

const AddNewSlaveMachine = ({
  showModal,
  closeModal,
  modelData,
  isEditMode,
}) => {
  const authData = useSelector((state) => state.auth.authData);
  const history = useHistory();

  const [name, setName] = useState("");
  const [ipaddress, setIpAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal && isEditMode && modelData) {
      setName(modelData.name);
      setIpAddress(modelData.ipaddress);
    } else {
      setName("");
      setIpAddress("");
      setError("");
    }
  }, [showModal, isEditMode, modelData]);

  const saveHandler = async () => {
    if (!name || !ipaddress) {
      setError("Both fields are required.");
      return;
    }
    const data = {
      name: name.trim(),
      ipaddress: ipaddress.trim(),
      org_id: authData.org_id,
    };

    try {
      setLoading(true);
      if (isEditMode && modelData && modelData.id) {
        await nodeInstance({
          url: `slave_machines/${modelData.id}`,
          method: "PUT",
          data,
        });

        // message.success(`Slave machine "${data.name}" updated successfully!`);
      } else {
        await nodeInstance({
          url: `slave_machines`,
          method: "POST",
          data,
        });
        // message.success(`Slave machine "${data.name}" added successfully!`);
      }

      resetFormAndClose();
    } catch (error) {
      console.error("Error saving slave machine:", error);
      setError("Failed to save the machine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetFormAndClose = () => {
    setName("");
    setIpAddress("");
    setError("");
    closeModal();
  };

  const cancelHandler = () => {
    resetFormAndClose();
    history.push("/slave-machine");
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
              {isEditMode ? "Update Slave Machine" : "Add New Slave Machine"}
            </Dialog.Title>
            <div className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md text-sm dark:bg-darkBg dark:text-gray2"
                  placeholder="Enter machine name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="ipaddress"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  IP Address
                </label>
                <input
                  type="text"
                  id="ipaddress"
                  value={ipaddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md text-sm dark:bg-darkBg dark:text-gray2"
                  placeholder="Enter IP address"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm mt-2">{error}</div>
              )}

              <div className="mt-6 flex justify-end gap-4">
                <Link
                  to="/"
                  exact={true}
                  className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white hover:dark:text-black3 hover:transition-all focus-visible:outline-none"
                >
                  Back
                </Link>

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

export default AddNewSlaveMachine;
