import axios from "axios";
import { APIPath } from "../helpers";

const instance = axios.create({
  baseURL: APIPath,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    admin: "true",
    // timeout : 1000,
  },
});

export const nodeInstance = axios.create({
  baseURL: APIPath,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    admin: "true",
    // timeout : 1000,
  },
});

export default instance;
