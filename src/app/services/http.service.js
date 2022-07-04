import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const isContainSlash = /\/$/gi.test(config.url);
      config.url =
        (isContainSlash ? config.url.slice(0, -1) : config.url) + '.json';
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key]
      }))
    : data;
}

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  function (err) {
    const expectedErrors =
      err.respones && err.respones.status >= 400 && err.respones.status < 500;

    if (!expectedErrors) {
      toast.error('Unexpected error');
    }
    return Promise.reject(err);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};

export default httpService;
