import axios from 'axios';
import CONFIG from '../config';
import Swal from "sweetalert2";

const axiosService = axios.create({
  baseURL: CONFIG.DISCOGS_API,
})

axiosService.interceptors.request.use((config) => {
  const token = CONFIG.DISCOGS_TOKEN;

  if (token) {
    config.headers = {
      Authorization: `Discogs token=${token}`
    }
  }

  return config;
})

axiosService.interceptors.response.use(
  (value) => value,
  (error) => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error.response.data.error.message
    })
  }
)

export default axiosService