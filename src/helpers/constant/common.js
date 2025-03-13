export const FileTypes = {
  image: "image",
  pdf: "pdf",
  "3dZip": "3d-zip",
  video: "video",
};

export const ServerPath = `${process.env.REACT_APP_SERVER_URL}`;
export const APIPath = `${ServerPath}/api/v1/`;

export const Clients = {
  airforce: "AIRFORCE",
};

export const EnvironmentConstant = {
  mode: process.env.REACT_APP_MODE,
  machine: process.env.REACT_APP_MACHINE,
  client: process.env.REACT_APP_CLIENT,
};

export const QuillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ align: [] }],
    ["clean"], // This will add the "clear formatting" button
  ],
};
