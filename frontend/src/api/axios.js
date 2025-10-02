import axios from 'axios';
// const axiosInstance =axios.create({
//     //baseURL: 'https:/localhost:8000/api',
//     withCredentials: true,
//     // timeout: 5000,
//     // header: {
//     //     'accept': 'application/json'
//     // }
// })
// export default axiosInstance;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // đổi thành URL server thật khi deploy
  withCredentials: true,
  timeout: 10000, // 10s, bạn có thể thay đổi
  headers: {
    'Accept': 'application/json',
  },
});

export default axiosInstance;