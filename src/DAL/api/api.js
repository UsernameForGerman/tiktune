import axios from "axios";
import * as rax from 'retry-axios';
import "regenerator-runtime/runtime.js";
import axiosRetry from "axios-retry";

class api {
   constructor(url) {
      this.api = axios.create({
         baseURL: "http://localhost:8000/api/v1" + url,
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

   getRetry(url = "", params = "") {
      axiosRetry(this.api);
      return this.api.get(url + params, {
         'axios-retry' : {
            retries: 5,
            retryCondition : (resp) => {
               return resp.status !== 200
            },
            retryDelay: (retryCount) => {
              return 6 * 1000;
            }
         }
      }).then(resp => {
         return resp;
      })
   }
}


export default api;