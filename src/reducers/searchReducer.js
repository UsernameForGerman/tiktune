import search_api from "../DAL/search_api/search_api";
import BaseReducer from "./baseReducer";

let initialState = {
    isFetching : false,
    songsList : [],
    errorMsg : ""
}

let copyState = (state) => {
    let copy = {...state};
    copy.songsList = [...state.songsList];
    return copy;
}

class SearchReducer extends BaseReducer {
    constructor() {
        super('SEARCH');
    }

    searchReducer = this.reducer;

    getSongByUrlThunk = (url) => {
        let loopSend = () => {
            search_api.getSongByUrl(url).then(resp => {
                debugger;
                let status = resp.status;
                if (status === 200){
                    return resp.data;
                } else if (status === 202) {
                    let retry = resp.data['retry-after'];
                    setTimeout(() => {
                        return loopSend();
                    }, retry * 1000);
                } else {
                    return resp;
                }
            })
        }
        return (dispatch) => {
            dispatch(this.toggleFetchAC());
            debugger;
            let resp = loopSend();
        }
    }
}

let obj = new SearchReducer();
let searchReducer = obj.searchReducer;
let getSongByUrlThunk = obj.getSongByUrlThunk;

export {searchReducer, getSongByUrlThunk}