import axios from 'axios'
import { BASE_URL } from './apiPaths'

const axiosInstance = axios.create( {
    baseURL : BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type' : 'application/json',
        Accept : 'application/json'
    }
})

//REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('token'); 

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
},
 (error) => {
    return Promise.reject(error);
  }
);

//RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response ){
        if(error.response.status === 401) {
            window.location.href ='/'
        }else if (error.response.status === 500){
            console.error("Server error")
        }
    }else if (error.code === 'ECONNABORTED'){
            console.error("Request Timeout")
        }

        return Promise.reject(error)
    }
);

export default axiosInstance