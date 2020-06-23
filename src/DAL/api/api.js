import axios from "axios";
import "regenerator-runtime/runtime.js";

class api {
   constructor(url) {
      this.api = axios.create({
         baseURL: "http://45.143.138.48:9000/api/v1" + url,
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