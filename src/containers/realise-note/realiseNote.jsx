import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Layout from "../../layout";
import { nodeInstance } from "../../api/api_instance";

const RealiseNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      title,
      description,
    };

    try {
      const response = await nodeInstance({
        url: `realise_note`,
        method: "POST",
        data,
      });

      if (response.status === 201) {
        setTitle("");
        setDescription("");
      } else {
      }
    } catch (error) {
      console.error(error);
      setError("Failed to save realise note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Realise Note</title>
      </Helmet>

      <Layout>
        <section>
          <div>
            <div className="grid xl:grid-cols-2 xl:gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img
                    src="../assets/icons/icon-settings.svg"
                    alt="icon-settings"
                    className="invert dark:invert-0 w-4 h-4 opacity-70"
                  />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-semibold">
                    Realise Note
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  Realise Note
                </h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="w-full bg-white dark:bg-darkBg pb-8 border border-gray2 dark:border-black1 rounded-2xl drop-shadow-md p-8">
              <div className="grid grid-cols-2 xl:grid-cols-2 gap-6">
                <div className="col-start-1 col-span-1">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium leading-9 dark:text-gray2"
                  >
                    Description <span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                    placeholder="Description"
                  />
                </div>

                <div className="col-start-2 col-span-1">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium leading-9 dark:text-gray2"
                  >
                    Title<span className="text-danger">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="w-full text-base bg-gray4 bg-opacity-60 dark:bg-darkBg dark:bg-opacity-100 dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                    placeholder="Title"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-600 mt-4">
                <p>{error}</p>
              </div>
            )}

            <div className="flex items-center justify-end mt-12">
              <Link
                to="/"
                exact={true}
                className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all hover:bg-black2 dark:hover:bg-gray2 hover:text-white hover:dark:text-black3 hover:transition-all focus-visible:outline-none"
              >
                Back
              </Link>
              <button
                type="submit"
                className="bg-secondary text-white md:text-sm 2xl:text-base font-medium border border-secondary rounded-full px-8 py-2 ml-2 shadow-sm transition-all hover:bg-transparent hover:text-secondary hover:transition-all focus-visible:outline-none"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </section>
      </Layout>
    </>
  );
};

export default RealiseNote;
