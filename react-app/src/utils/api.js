import axios from 'axios'

const headers = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('omnifyAccessToken') || null,
}

const axiosApi = axios.create({
    withCredentials: false,
    baseURL: process.env.REACT_APP_API_URL + '/api/',
    headers,
})

axiosApi.interceptors.response.use(
    (response) => response,
    (err) => {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem('omnifyAccessToken');
            window.location.reload();
        }
        return Promise.reject(err)
    },
)

export default axiosApi;