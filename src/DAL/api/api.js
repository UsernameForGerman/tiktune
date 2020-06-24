import axios from "axios";
import "regenerator-runtime/runtime.js";

const TIKTUNE_BASE_URL = process.env.TIKTUNE_API_URL;
console.log(process.env);

class api {
   constructor(url) {
      this.api = axios.create({
         baseURL: "http://"+ TIKTUNE_BASE_URL +"/api/v1" + url,
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