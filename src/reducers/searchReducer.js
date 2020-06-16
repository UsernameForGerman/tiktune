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
        return (dispatch) => {
            dispatch(this.toggleFetchAC());
            search_api.getSongByUrl(url)
                .then((resp) => {
                    let status = resp.status;
                    if (status === 200){
                        dispatch(this.setList(resp.data));
                        dispatch(this.toggleFetchAC());
                    } else {
                        setTimeout(
                            search_api.getSongByUrl(url)
                                .then(resp => {
                                    if (resp.status === 200){
                                        dispatch(this.setList(resp.data));
                                        dispatch(this.toggleFetchAC());
                                    } else {
                                        setTimeout(() => {
                                            search_api.getSongByUrl(url)
                                                .then(resp => {
                                                    if (resp.status === 200){
                                                        dispatch(this.setList(resp.data));
                                                        dispatch(this.toggleFetchAC());
                                                    } else {
                                                        debugger;
                                                        dispatch(this.setList([]));
                                                        dispatch(this.toggleFetchAC());
                                                    }
                                                })
                                                .catch((err) => {
                                                    let resp = err.response;
                                                    dispatch(this.setErrorMsg(resp.data));
                                                    dispatch(this.toggleFetchAC());
                                                })
                                        },10000);
                                    }
                                })
                                .catch((err) => {
                                    let resp = err.response;
                                    dispatch(this.setErrorMsg(resp.data));
                                    dispatch(this.toggleFetchAC());
                                })
                            ,10000);
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