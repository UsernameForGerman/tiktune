import axios from "axios";
import "regenerator-runtime/runtime.js";

class api {
   constructor(url) {
      this.api = axios.create({
<<<<<<< HEAD
         baseURL: "http://localhost:8000/api/v1" + url,
=======
         baseURL: "http://45.143.138.48:9000/api/v1" + url,
>>>>>>> f26716b326fab797ccb9f76595810fb60140153c
         withCredentials: true,
         headers: {
            "Content-Type": "application/json"
         }
      });
   }

   get = (url = "", params = {}) => {
      return this.api.get(url, params).then(resp => {
         return resp;
      })
   }

   getInline = (url = "", params = "") => {
      return this.api.get(url + params).then(resp => {
         return resp;
      })
   }
}


export default api;