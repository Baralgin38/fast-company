import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config.json';

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
  (res) => res,
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;
