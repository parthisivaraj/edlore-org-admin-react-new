import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../layout";
import AddNewSlaveMachine from "../../components/slaveMachine/addNewSlaveMachine";
import DeleteSlaveMachineModal from "../../components/slaveMachine/deleteSlaveMachine";
import { nodeInstance } from "../../api/api_instance";

const SlaveMachine = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModelPopup, setDeleteModelPopup] = useState(false);
  const [editModelPopup, setEditModelPopup] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSlaveMachine = async () => {
    setLoading(true);
    try {
      const response = await nodeInstance({
        url: `slave_machines`,
        method: "GET",
      });

      setModels(response.data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch models. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlaveMachine();
  }, []);

  const handleSearchChange = (searchData) => {
    setSearchQuery(searchData);
  };

  const handleDeleteModel = (model) => {
    setSelectedModel(model);
    setDeleteModelPopup(true);
  };

  const handleEditModel = (model) => {
    setSelectedModel(model);
    setEditModelPopup(true);
  };

  const closeModal = () => {
    setEditModelPopup(false);
    fetchSlaveMachine();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Slave Machine</title>
      </Helmet>

      <Layout>
        <section>
          <div>
            <div className="grid xl:grid-cols-2 xl:gap-4 mb-8">
              <div className="col-start-1">
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  Slave Machine
                </h1>
              </div>
              <div className="col-start-2 m-auto mr-0">
                <button
                  onClick={() => setEditModelPopup(true)}
                  className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0"
                >
                  Add New Slave Machine +
                </button>
              </div>
            </div>
          </div>

          <div className="w-full bg-white dark:bg-darkBg pb-8 border border-gray2 dark:border-black1 rounded-3xl drop-shadow-md">
            {loading ? (
              <div className="text-center p-20">Loading...</div>
            ) : error ? (
              <div className="text-center p-20 text-red-500">{error}</div>
            ) : (
              <>
                <div className="flex items-center justify-between px-4 py-8 xl:p-8">
                  <div className="w-[75%] xl:w-[400px] relative overflow-hidden">
                    <input
                      type="search"
                      className="w-full bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 dark:text-gray2 px-4 py-2 border border-gray2 dark:border-opacity-50 rounded-full focus:border-secondary focus:outline-none"
                      placeholder="Search for Slave Machine..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full min-h-[500px] h-[65vh] dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 scrollbar-track-gray4">
                  <table className="table-auto text-left w-full">
                    <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                      <tr>
                        <th className="px-4 xl:px-8 py-4 text-sm uppercase">
                          Name
                        </th>
                        <th className="px-4 xl:px-8 py-4 text-sm uppercase">
                          IP Address
                        </th>
                        <th className="px-4 xl:px-8 py-4 text-sm uppercase">
                          Syncing
                        </th>
                        <th className="px-4 xl:px-8 py-4 text-sm uppercase">
                          Last Sync At
                        </th>
                        <th className="px-4 xl:px-8 py-4 text-sm uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {models
                        .filter((model) =>
                          model.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                        )
                        .map((model) => (
                          <tr
                            key={model.id}
                            className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out group-hover:transition-all hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                          >
                            <td className="px-4 xl:px-8 py-4">{model.name}</td>
                            <td className="px-4 xl:px-8 py-4">
                              {model.ipaddress}
                            </td>
                            <td className="px-4 xl:px-8 py-4">
                              {model.is_syncing ? "Yes" : "No"}
                            </td>
                            <td className="px-4 xl:px-8 py-4">
                              {model.last_sync_at}
                            </td>
                            <td className="px-4 xl:px-8 py-4">
                              <button
                                onClick={() => handleDeleteModel(model)}
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
                              <button
                                onClick={() => handleEditModel(model)}
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
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </section>
      </Layout>

      {deleteModelPopup && selectedModel && (
        <DeleteSlaveMachineModal
          head="Remove Slave Machine"
          body={[
            "Are you sure you want to remove",
            <strong
              key="title"
              className="capitalize break-all"
            >{` "${selectedModel.name}"`}</strong>,
          ]}
          deleteAction={() => {
            setDeleteModelPopup(false);
          }}
          modalAction={setDeleteModelPopup}
          parentmodel={false}
          modalValue={deleteModelPopup}
          id={selectedModel.id}
        />
      )}

      {editModelPopup && (
        <AddNewSlaveMachine
          showModal={editModelPopup}
          closeModal={closeModal}
          modelData={selectedModel}
          isEditMode={true}
        />
      )}
    </>
  );
};

export default SlaveMachine;
