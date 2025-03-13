import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import ListDataNotFound from "../../components/common/listDataNotFound";
import Layout from "../../layout";
import { getSlaveMachines } from "../../redux/reduxes/sync/syncAction";

const SyncScreen = () => {
  const dispatch = useDispatch();

  // Fetch Data;
  const machinesLoading = useSelector((state) => state.sync.machinesLoading);
  const machines = useSelector((state) => state.sync.machines);

  // Dispatch
  useEffect(() => {
    dispatch(getSlaveMachines());
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sync Data</title>
      </Helmet>

      <Layout>
        <section>
          {/* Breadcrumbs : Start */}
          <div>
            <div className="grid xl:grid-cols-2 xl:gap-4 mb-8">
              <div className="col-start-1">
                <div className="flex items-center">
                  <img
                    src="../assets/icons/icon-note.svg"
                    alt="icon-note"
                    className="invert dark:invert-1 w-4 h-4"
                  />
                  <span className="ml-1 text-xs text-black3 text-opacity-75 dark:text-gray3 font-semibold">
                    {" "}
                    Sync Data
                  </span>
                </div>
                <h1 className="text-2xl 2xl:text-3xl text-black dark:text-gray2 font-bold">
                  Sync Data
                </h1>
              </div>
            </div>
          </div>
          {/* Breadcrumbs : End */}

          {/* Model Table List : Start */}
          <div className="w-full bg-white dark:bg-darkBg pb-8 border border-gray2 dark:border-black1 rounded-3xl drop-shadow-md">
            <div className="w-full min-h-[500px] h-full 2xl:h-[62vh]  dark:text-gray2 overflow-scroll scrollbar-thin scrollbar-thumb-gray2 dark:scrollbar-thumb-darkMainBg scrollbar-track-gray4 dark:scrollbar-track-black1 scrollbar-thumb-rounded-3xl scrollbar-track-rounded-3xl">
              <table className="table-auto text-left relative min-w-full max-h-full">
                <thead className="sticky top-0 z-10 w-full bg-white dark:bg-darkBg border-b border-gray2 dark:border-opacity-20">
                  <tr>
                    <th
                      scope="col"
                      width="10%"
                      className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      {" "}
                      ID
                    </th>
                    <th
                      scope="col"
                      width="15%"
                      className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      {" "}
                      Name
                    </th>
                    <th
                      scope="col"
                      width="20%"
                      className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        <span>IP</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      width="40%"
                      className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      {" "}
                      Details{" "}
                    </th>
                    <th
                      scope="col"
                      width="15%"
                      className="px-4 xl:px-8 py-4 text-sm uppercase whitespace-nowrap"
                    >
                      <div className="flex items-center">
                        <span>Created On</span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {machinesLoading ? (
                    <tr>
                      <td colSpan="6">
                        <Skeleton
                          count={10}
                          height={50}
                          baseColor="#f5f5f5"
                          highlightColor="#e1e1e1"
                          borderRadius="0"
                          enableAnimation="true"
                          duration={2.5}
                          inline={true}
                          className="dark:bg-darkMainBg"
                        />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {machines && machines.length > 0 ? (
                        <>
                          {machines.map((machine, index) => {
                            const {
                              id,
                              name,
                              ipaddress,
                              is_syncing,
                              created_at,
                              sync_start_at,
                              sync_end_at,
                              last_sync_at,
                            } = machine;
                            return (
                              <tr
                                valign="top"
                                className="border-b border-gray2 dark:border-black3 odd:bg-gray2 odd:bg-opacity-25 dark:odd:bg-opacity-10 transition-all duration-300 ease-in-out group-hover:transition-all hover:bg-gray2 dark:hover:bg-opacity-20 hover:transition-all hover:duration-300"
                                key={id}
                              >
                                <td
                                  width="10%"
                                  className="px-4 xl:px-8 py-4 text-sm 2xl:text-base whitespace-nowrap"
                                >
                                  {id}
                                </td>
                                <td width="15%" className="px-4 xl:px-8 py-4">
                                  <div
                                    className="text-sm 2xl:text-base font-medium capitalize w-[100px] text-ellipsis whitespace-nowrap overflow-hidden"
                                    title={name}
                                  >
                                    {name}
                                  </div>
                                </td>
                                <td width="20%" className="px-4 xl:px-8 py-4">
                                  {ipaddress}
                                </td>
                                <td
                                  width="35%"
                                  className="px-4 xl:px-8 py-4 text-sm 2xl:text-base"
                                >
                                  <div>
                                  {is_syncing ? "Yes" : "No"}
                                  </div>
                                  <div>
                                    Sync Start: {sync_start_at}
                                  </div>
                                  <div>
                                    Sync End: {sync_end_at}
                                  </div>
                                  <div>
                                    Last Sync At: {last_sync_at}
                                  </div>
                                </td>
                                <td
                                  width="15%"
                                  className="px-4 xl:px-8 py-4 text-sm 2xl:text-base"
                                >
                                  {created_at}
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <ListDataNotFound colSpan={6} filters={[]} />
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default SyncScreen;
