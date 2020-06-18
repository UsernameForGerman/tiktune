
import history_api from "../DAL/history_api/history_api";

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

const TOGGLE_FETCHING = "HISTORY/FETCHING";
const SET_LIST = "HISTORY/SET_LIST";
const SET_ERROR_MSG = "HISTORY/SET_ERROR"

let historyReducer = (state = initialState, action) => {
    let stateCopy = copyState(state);
    switch (action.type) {
        case TOGGLE_FETCHING : {
            stateCopy.isFetching = !stateCopy.isFetching;
            break;
        }

        case SET_LIST : {
            stateCopy.songsList = action.list;
            break;
        }

        case SET_ERROR_MSG : {
            stateCopy.errorMsg = action.msg;
            break;
        }

        default : {
            break;
        }
    }

    return stateCopy;
}

let toggleFetchAC = () => {
    return {
        type : TOGGLE_FETCHING
    }
}

let setList = (list) => {
    return {
        type : SET_LIST,
        list : list
    }
}

let setErrorMsg = (msg) => {
    return {
        type : SET_ERROR_MSG,
        msg : msg
    }
}

let getHistoryThunk = () => {
    return (dispatch) => {
        dispatch(toggleFetchAC());
        history_api.getHistory()
            .catch((err) => {
                debugger;
                let status = err.status;
                dispatch(setErrorMsg("Ошибка"));
                dispatch(toggleFetchAC());
            })

            .then((resp) => {

                setList([]);
                dispatch(toggleFetchAC());
            })
    }
}

export {historyReducer, getHistoryThunk};