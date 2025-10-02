import axios from 'axios';
const axiosInstance =axios.create({
    timeout: 1000,
    header: {
        'accept': 'application/json'
    }
})
export default axiosInstance;