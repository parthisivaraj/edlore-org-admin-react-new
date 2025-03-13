import axiosInstance, { nodeInstance } from "../../api/api_instance";
import TokenService from "./tokenServices";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (
        (originalConfig.url !== "sign_in" ||
          originalConfig.url != "refresh_access_token") &&
        err.response
      ) {
        if (err.response.status == 500 || err.response.status == 0) {
          // window.location.href = "/server-error";
        }
        // Access Token was expired
        if (err.response.status === 410 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("refresh_access_token", {
              refreshToken: TokenService.getLocalAccessToken(),
            });
            const { access_token } = rs.data;
            TokenService.updateLocalAccessToken(access_token);
            // return axiosInstance(originalConfig);
          } catch (_error) {
            TokenService.removeLocalAccessTokenAndLogout();
            return Promise.reject(_error);
          }
        }
      }
      // else {
      // TokenService.removeLocalAccessTokenAndLogout();
      // }
      return Promise.reject(err);
    },
  );

  nodeInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  nodeInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (
        (originalConfig.url !== "sign_in" ||
          originalConfig.url != "refresh_access_token") &&
        err.response
      ) {
        if (err.response.status == 500 || err.response.status == 0) {
          // window.location.href = "/server-error";
        }
        // Access Token was expired
        if (err.response.status === 410 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.get("refresh_access_token", {
              refreshToken: TokenService.getLocalAccessToken(),
            });
            const { access_token } = rs.data;
            TokenService.updateLocalAccessToken(access_token);
            // return axiosInstance(originalConfig);
          } catch (_error) {
            TokenService.removeLocalAccessTokenAndLogout();
            return Promise.reject(_error);
          }
        }
      }
      // else {
      // TokenService.removeLocalAccessTokenAndLogout();
      // }
      return Promise.reject(err);
    },
  );
};

export default setup;
