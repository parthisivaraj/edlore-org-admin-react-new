import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import Markdown from "react-markdown";
import Layout from "../../layout";
import {
  getAllDatabases,
  runAIQuery,
} from "../../redux/reduxes/databases/datebaseAction";
import { QueryFiles } from "../../components/databases/queryFiles";
import { UnityModal } from "../../components/unitiyModel/UnityModal";
import { PDFModal } from "../../components/databases/PDFModal";

export const AIQuery = () => {
  const dispatch = useDispatch();

  const databasesList = useSelector((state) => state.databases.databasesList);
  const conversations = useSelector((state) => state.databases.conversations);
  const queryProcessing = useSelector(
    (state) => state.databases.queryProcessing,
  );
  const [selectedDB, setSelectedDB] = useState(null);
  const [query, setQuery] = useState(null);
  const [open3DModal, setOpen3DModal] = useState(false);
  const [modelPart, setModelPart] = useState("");
  const [openPDF, setOpenPDF] = useState(false);
  const [pdfData, setPDFData] = useState({
    url: "",
    page: 1,
  });

  useEffect(() => {
    dispatch(getAllDatabases());
  }, []);

  useEffect(() => {
    if (!selectedDB) {
      setSelectedDB(databasesList.length > 0 ? databasesList[0].id : null);
    }
  }, [selectedDB, databasesList]);

  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversations]); // This hook runs every time the 'conversations' array changes

  const search = () => {
    dispatch(
      runAIQuery({
        query,
        database: selectedDB,
      }),
    );
    setQuery("");
    // const element = document.querySelector(".chat-container");
    // if (element) {
    //   element.scrollIntoView({
    //     behavior: "smooth",
    //     block: "end",
    //   });
    // }
  };

  const redirect = (databaseId, item) => {
    const tempDocument = databasesList.find((x) => x.id === databaseId);
    const tempLink = (tempDocument?.documents || []).find(
      (x) => x.fileName.toLowerCase() === item.filename.toLowerCase(),
    );
    if (tempLink) {
      window.open(`${tempLink.url}#page=${item.pagenumber}`, "_blank");
      // setPDFData({
      //   url: tempLink.url,
      //   page: item.pagenumber,
      // });
      // setOpenPDF(true);
    }
  };

  const open3D = (part) => {
    setModelPart(part.partName);
    setOpen3DModal(true);
  };

  const close3DModal = () => {
    setModelPart("");
    setOpen3DModal(false);
  };

  const closePDFModal = () => {
    setPDFData({
      url: "",
      page: 1,
    });
    setOpenPDF(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>AI Assistance - Query</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid xl:grid-cols-2 xl:gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img
                    src="../assets/icons/icon-devices.svg"
                    alt="icon-devices"
                    className="invert dark:invert-0 w-4 h-4 opacity-50"
                  />
                  <div className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-medium">
                    AI Assistance /
                  </div>
                  <span className="ml-1 text-xs text-secondary font-semibold">
                    {" "}
                    Query
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          <div
            className="container mx-auto px-4 sm:px-6 lg:px-8 dark:text-gray2 grid "
            style={{
              gridTemplateRows: "auto 130px",
              height: "calc(100vh - 150px)",
              gridGap: "10px",
            }}
          >
            {conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center overflow-auto">
                <div>
                  <img
                    src="../assets/icons/icon-hello.svg"
                    alt="Hello"
                    className="w-[60px] h-[60px] rounded-lg object-cover"
                  />
                </div>
                <div class="font-semibold text-black2 dark:text-gray4">
                  Hello
                </div>
                <div class="text-sm text-black2 dark:text-gray4 dark:text-opacity-50">
                  Let’s begin by asking a question
                </div>
              </div>
            ) : (
              <div
                className="w-full h-full bg-white dark:bg-darkBg py-7 px-7 border border-gray2 dark:border-opacity-10 rounded-3xl drop-shadow-md dark:dorp-shadow-none overflow-y-auto chat-container"
                ref={chatContainerRef}
              >
                {conversations.map((item) => (
                  <div
                    key={item.id}
                    className="grid mb-5"
                    style={{
                      gridTemplateColumns: "32px auto",
                      columnGap: "10px",
                    }}
                  >
                    <img
                      src={item.image}
                      alt="Hello"
                      className="w-[32px] h-[32px] rounded-lg object-cover"
                    />
                    <div>
                      <div
                        class={`font-semibold text-black2 dark:text-gray4 ${
                          item.robot && "edlore-ai"
                        }`}
                      >
                        {item.person}
                      </div>
                      <div class="text-sm text-black2 dark:text-gray4">
                        <Markdown>{item.text}</Markdown>
                      </div>
                      {(item.files || []).length > 0 && (
                        <QueryFiles
                          files={item.files}
                          redirect={(file) => redirect(item.databaseId, file)}
                          open3D={open3D}
                          databasesList={databasesList}
                          databaseId={item.databaseId}
                        />
                      )}
                    </div>
                  </div>
                ))}
                {queryProcessing && (
                  <div
                    key={1}
                    className="grid mb-5"
                    style={{
                      gridTemplateColumns: "32px auto",
                      columnGap: "10px",
                    }}
                  >
                    <img
                      src={"../assets/edlore.svg"}
                      alt="Edlore AI"
                      className="w-[32px] h-[32px] rounded-lg object-cover"
                    />
                    <div>
                      <div class="font-semibold text-black2 dark:text-gray4 edlore-ai">
                        Edlore AI
                      </div>
                      <div class="text-sm text-black2 dark:text-gray4">
                        Finding answer...
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="w-full h-full bg-white dark:bg-darkBg py-7 px-7 border border-gray2 dark:border-opacity-10 rounded-3xl drop-shadow-md dark:dorp-shadow-none">
              <select
                name="database"
                id="database"
                onChange={(e) => setSelectedDB(e.target.value)}
                class="bg-none mb-2"
                style={{ background: "none" }}
              >
                {databasesList.map((database) => (
                  <option
                    value={database.id}
                    selected={database.id === selectedDB}
                    key={database.id}
                  >
                    {database.name}
                  </option>
                ))}
              </select>

              <div className="flex flex-items">
                <input
                  type="text"
                  name="query"
                  className="w-full text-base bg-gray4 dark:bg-darkBg bg-opacity-60 dark:bg-opacity-100 border border-gray2 dark:border-opacity-50 rounded-md py-3 px-4 focus:border-secondary focus:outline-none"
                  placeholder="Ask your question"
                  maxLength={150}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={handleKeyPress}
                />
                <button
                  type="button"
                  className={`${
                    !query || !selectedDB || queryProcessing
                      ? "bg-gray3 text-gray6 border-gray3 hover:bg-gray3 hover:text-gray6"
                      : ""
                  } bg-secondary text-white text-sm 2xl:text-base font-medium border border-secondary rounded-full px-10 py-2 ml-5 shadow-sm transition-all duration-300 hover:bg-transparent hover:text-secondary hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0`}
                  onClick={search}
                  disabled={!query || !selectedDB || queryProcessing}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
      {openPDF && (
        <PDFModal
          currentPageNumber={pdfData.page}
          pdf={pdfData.url}
          open={openPDF}
          onClose={closePDFModal}
        />
      )}
      {open3DModal && (
        <UnityModal
          open={open3DModal}
          onClose={close3DModal}
          partName={modelPart}
        />
      )}
    </>
  );
};
