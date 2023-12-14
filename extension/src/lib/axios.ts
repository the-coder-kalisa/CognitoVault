import axiosImport from 'axios';

const axios = axiosImport.create({
  baseURL: 'http://localhost:5000/api/v1/',
});

export default axios;