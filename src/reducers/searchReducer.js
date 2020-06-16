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
        function resend() {
             setTimeout(async function hangle(){
                return await search_api.getSongByUrl(url);
            },6000)
        }
        return (dispatch) => {
            dispatch(this.toggleFetchAC());
            search_api.getSongByUrl(url)
                .then((resp) => {
                    let status = resp.status;
                    while (status !== 200){
                        debugger;
                        if (status >= 400){
                            dispatch(this.setErrorMsg(resp));
                            dispatch(this.toggleFetchAC());
                            break;
                        } else {
                            let resp = resend();
                            status = resp.status;
                        }
                    }
                    if (status === 200){
                        dispatch(this.setList(resp.data));
                        dispatch(this.toggleFetchAC());
                    }
                })
                .catch((err) => {
                    let resp = err.response;
                    dispatch(this.setErrorMsg(resp.data));
                    dispatch(this.toggleFetchAC());
                })
        }
    }
}

let obj = new SearchReducer();
let searchReducer = obj.searchReducer;
let getSongByUrlThunk = obj.getSongByUrlThunk;

export {searchReducer, getSongByUrlThunk}