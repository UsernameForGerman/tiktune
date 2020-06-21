import search_api from "../DAL/search_api/search_api";
import BaseReducer from "./baseReducer";

class SearchReducer extends BaseReducer {
    constructor() {
        super('SEARCH');
    }

    searchReducer = this.reducer;

    getSongByUrlThunk = (url) => {
        let loopSend = (dispatch) => {
            search_api.getSongByUrl(url).then(resp => {
                let status = resp.status;
                if (status === 200){
                    dispatch(this.setList(resp.data));
                    dispatch(this.toggleFetchAC());
                } else if (status === 202) {
                    let retry = resp.data['retry-after'];
                    setTimeout(() => {
                        loopSend(dispatch);
                    }, retry * 1000);
                } else {
                    dispatch(this.toggleFetchAC());
                }
            })
                .catch(err => {
                    dispatch(this.toggleFetchAC());
                })
        }
        return (dispatch) => {
            dispatch(this.toggleFetchAC());
            dispatch(this.setList([]));
            loopSend(dispatch);
        }
    }
}

let obj = new SearchReducer();
let searchReducer = obj.searchReducer;
let getSongByUrlThunk = obj.getSongByUrlThunk;

export {searchReducer, getSongByUrlThunk}