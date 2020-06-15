import search_api from "../DAL/search_api/search_api";

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

const TOGGLE_FETCHING = "SEARCH/FETCHING";
const SET_LIST = "SEARCH/SET_LIST";
const SET_ERROR_MSG = "SEARCH/SET_ERROR"

let searchReducer = (state = initialState, action) => {
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

let getSongByUrlThunk = (url) => {
    return (dispatch) => {
        debugger;
        dispatch(toggleFetchAC());
        search_api.getSongByUrl(url)
            .then((resp) => {
                debugger;
                setList(resp.data);
                dispatch(toggleFetchAC());
            })
            .catch((err) => {
                debugger;
                let status = err.status;
                dispatch(setErrorMsg("Ошибка"));
                dispatch(toggleFetchAC());
            })
    }
}

export {searchReducer, getSongByUrlThunk};