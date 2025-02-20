import axios from "axios";

const BASEURL = "https://json-1-row8.onrender.com";

export const apiCall = (url: string, method: string, data: any) => {
  return axios({
    url: `${BASEURL}${url}`,
    method,
    data,
  });
};
