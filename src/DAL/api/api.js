import axios from "axios";
import "regenerator-runtime/runtime.js";

const TIKTUNE_BASE_URL = process.env.TIKTUNE_API_URL;

class api {
   constructor(url) {
      this.api = this.createApi(url);
   }

   createApi = (url, baseUrl = TIKTUNE_BASE_URL +"/api/v1") => {
      return axios.create({
         baseURL: baseUrl + url,
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