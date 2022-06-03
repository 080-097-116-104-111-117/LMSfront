import axios from "axios";

const apiBase = axios.create({
  baseURL: "http://127.0.0.1:8000/api",   
  timeout : 1000,
  // headers : true,
});


// Add a request interceptor
apiBase.interceptors.request.use(function (config) {
  document.getElementById('spinner').style.display="flex";
  document.getElementById('root').style.display="none";
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
apiBase.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  document.getElementById('root').style.display="block";
  document.getElementById('spinner').style.display="none";
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
export default apiBase;