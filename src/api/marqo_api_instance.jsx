import axios from "axios";

export const marqoUploadFilesInstance = (url, data, contentType) => {
  const headers = {
    "Content-type": contentType,
  };
  const client = axios({
    url,
    method: "PUT",
    headers,
    data,
  });
  return client;
};
