import axios from 'axios';
import * as util from '../utilities';
const create = (baseURL = util.constants.BASEURL) => {
  const api = axios.create({
    headers: {
      'Cache-Control': 'no-cache',
    },
    timeout: 10000,
  });
  const getPosts = params => {
    return new Promise((resolve, reject) => {
      api
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  return {
    getPosts,
  };
};
export default {
  create,
};
