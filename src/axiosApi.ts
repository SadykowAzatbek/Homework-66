import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://sadyk-u-azatbek-js-20-default-rtdb.europe-west1.firebasedatabase.app/',
})

export default axiosApi;