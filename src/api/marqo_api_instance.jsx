import axios from "axios";

export const uploadFilesInstance = (url, data, contentType) => {
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

export const marqoInstance = axios.create({
  baseURL: process.env.REACT_APP_MARQO_URL,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    admin: "true",
  },
});
