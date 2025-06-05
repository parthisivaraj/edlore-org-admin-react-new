import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export const UnityModal = ({ open, onClose, partName, partData, addNotes }) => {
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    requestFullscreen,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: partName
      ? "/build/AI3DViewer.loader.js"
      : "/build/3DViewer.loader.js",
    dataUrl: partName ? "/build/AI3DViewer.data" : "/build/3DViewer.data",
    frameworkUrl: partName
      ? "/build/AI3DViewer.framework.js"
      : "/build/3DViewer.framework.js",
    codeUrl: partName ? "/build/AI3DViewer.wasm" : "/build/3DViewer.wasm",
  });

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (isLoaded && (partName || partData)) {
      if (partName) {
        sendMessage("ModelViewport", "HighlightPart", partName);
      } else if (partData) {
        sendMessage(
          "ModelViewport",
          "Load3DModel",
          JSON.stringify(partData).replace(/”/g, ""),
        );
      }
    }
  }, [isLoaded, partName, sendMessage, partData]);

  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio,
  );

  const [size, setSize] = useState({
    height: window.innerHeight * 0.8, // 80vh
    width: window.innerHeight * 0.8 * (16 / 9), // Maintain 16:9 aspect ratio
  });

  useEffect(() => {
    const updateSize = () => {
      const newHeight = window.innerHeight * 0.8; // 80vh
      setSize({
        height: newHeight,
        width: newHeight * (16 / 9), // Maintain 16:9 aspect ratio
      });
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Call once to set initial size

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(
    function () {
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`,
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio],
  );

  const handlePartSelected = useCallback(
    (part) => {
      const partJSON = JSON.parse(part);
      setSelected({
        ...partJSON,
        details: partData.Parts.find((x) => x.part_id === partJSON.partId),
      });
    },
    [partData],
  );

  const closePartModal = () => {
    setSelected(null);
    sendMessage("ModelViewport", "DeselectPart");
  };

  useEffect(() => {
    if (addEventListener) {
      addEventListener("PartSelection", handlePartSelected);
    }
    return () => {
      removeEventListener("PartSelection", handlePartSelected);
    };
  }, [addEventListener, removeEventListener, handlePartSelected]);

  const handleClickEnterFullscreen = () => {
    requestFullscreen(true);
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          static
          as="div"
          open={open}
          onClose={() => null}
          className="fixed inset-0 z-50 flex items-center xl:items-center justify-center bg-black2 dark:bg-darkMainBg bg-opacity-40 dark:bg-opacity-60"
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
            <Dialog.Panel className="relative w-[90%] h-[auto] bg-gray4 dark:bg-darkBg dark:text-gray2 border border-gray4 dark:border-opacity-20 shadow-lg">
              <div className="flex items-center justify-center unity-container">
                {!isLoaded && (
                  <p className="loading-overlay">
                    Loading 3D Model... {Math.round(loadingProgression * 100)}%
                  </p>
                )}
                <Unity
                  unityProvider={unityProvider}
                  className="unity"
                  devicePixelRatio={devicePixelRatio}
                  style={{
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                  }}
                />
              </div>
              {selected?.partId && (
                <div class=" unity-model max-w-md mx-auto bg-white shadow-lg rounded-lg">
                  <div class="flex justify-between items-center unity-bg-green-500 text-white px-4 py-2 rounded-t-lg">
                    <h2 class="text-lg font-semibold">
                      {selected.details?.part_name}
                    </h2>
                    <button class="text-xl font-bold" onClick={closePartModal}>
                      &times;
                    </button>
                  </div>
                  <div class="p-4">
                    <div class="mb-4">
                      <h3 class="text-sm font-semibold text-gray-600">
                        Part Number:
                      </h3>
                      <p class="text-base text-gray-800">
                        {selected.details?.part_id}
                      </p>
                    </div>

                    <div class="mb-4">
                      <h3 class="text-sm font-semibold text-gray-600">
                        NSN Number:
                      </h3>
                      <p class="text-base text-gray-800">
                        {selected.details?.nsn_number || ""}
                      </p>
                    </div>

                    <div class="mb-4">
                      <h3 class="text-sm font-semibold text-gray-600">
                        Description:
                      </h3>
                      <p
                        class="text-base text-gray-800"
                        dangerouslySetInnerHTML={{
                          __html: selected?.details?.part_description || "",
                        }}
                      ></p>
                    </div>

                    <div class="mb-4">
                      <h3 class="text-sm font-semibold text-gray-600">
                        Total Count:
                      </h3>
                      <p class="text-base text-gray-800">
                        {selected.details?.quantity || 0}
                      </p>
                    </div>

                    <div class="space-y-3">
                      <button
                        onClick={() => addNotes(selected?.details?.id)}
                        class="w-full bg-gray-200 text-gray-800 py-2 rounded-md flex justify-between items-center px-4"
                      >
                        <span>Notes</span>
                        <span class="text-gray-500">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end bg-gray4 dark:bg-darkBg py-3 px-12">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleClickEnterFullscreen}
                  className="bg-transparent text-black2 dark:text-gray2 md:text-sm 2xl:text-base font-medium border border-black2 dark:border-gray2 rounded-full px-8 py-2 ml-4 shadow-sm transition-all duration-300 hover:bg-black2 dark:hover:bg-gray2 hover:text-white dark:hover:text-black3 hover:transition-all hover:duration-300 focus:outline-0 focus-visible:outline-0"
                >
                  Enter Fullscreen
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
