import history_api from "../DAL/history_api/history_api";
import BaseReducer from "./baseReducer";

class HistoryReducer extends BaseReducer{
    constructor() {
        super('HISTORY');
    }

    historyReducer = this.reducer;

    getHistoryThunk = () => {
        return (dispatch) => {
            dispatch(this.toggleFetchAC());
            history_api.getHistory()
                .catch((err) => {
                    let status = err.status;
                    dispatch(this.setErrorMsg("Ошибка"));
                    dispatch(this.toggleFetchAC());
                })

                .then((resp) => {
                    if (resp.data[0]){
                        let songs = resp.data.map(elem => elem.song);
                        dispatch(this.setList(songs));
                    }
                    dispatch(this.toggleFetchAC());
                })
        }
    }
}
let obj = new HistoryReducer();
let historyReducer = obj.historyReducer;
let getHistoryThunk = obj.getHistoryThunk;

export {historyReducer, getHistoryThunk};