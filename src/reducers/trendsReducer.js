import BaseReducer from "./baseReducer";
import trends_api from "../DAL/trends_api/trends_api";

class TrendsReducer extends BaseReducer{
    constructor() {
        super('TRENDS');
    }

    trendsReducer = this.reducer;

    getTrendSongsThunk = () => {
        return (dispatch) => {
            dispatch(this.toggleFetchAC());
            trends_api.getTrendsSongs()
                .catch((err) => {
                    let status = err.status;
                    dispatch(this.setErrorMsg("Ошибка"));
                    dispatch(this.toggleFetchAC());
                })

                .then((resp) => {
                    this.setList(resp.data);
                    dispatch(this.toggleFetchAC());
                })
        }
    }
}

let obj = new TrendsReducer();

let trendsReducer = obj.trendsReducer;
let getTrendSongsThunk = obj.getTrendSongsThunk();

export {trendsReducer, getTrendSongsThunk}