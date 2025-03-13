import { Helmet } from "react-helmet";
import Layout from "../../layout";
import { useState } from "react";
import { UnityModal } from "../../components/unitiyModel/UnityModal";

export const ModelScreen = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Unity Model</title>
      </Helmet>

      <Layout>
        <div className="col-start-2 m-auto mr-0">
          <button
            onClick={() => setOpen(true)}
            className="bg-primary text-white md:text-sm 2xl:text-base font-medium border border-primary rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:bg-transparent hover:text-primary hover:transition-all hover:duration-300 focus:outline-0"
          >
            View 3D
          </button>
        </div>

        {open && (
          <UnityModal
            open={open}
            onClose={() => setOpen(false)}
            partName={"123"}
          />
        )}
      </Layout>
    </>
  );
};
