import stats_api from "../DAL/stats_api/stats_api";

let initialState = {
    isFetching : false,
    data : {},
}

const TOGGLE_FETCHING = "STATS/TOGGLE_FETCHING";
const SET_DATA = "STATS/SET_DATA";

let copyState = (state) => {
    let copy = {...state};
    copy.data = {...state.data};
    return copy;
}

let statsReducer = (state = initialState, action) => {
    let stateCopy = copyState(state);
    switch (action.type) {
        case TOGGLE_FETCHING : {
            stateCopy.isFetching = !stateCopy.isFetching;
            break;
        }

        case SET_DATA : {
            stateCopy.data = action.data;
            if (action.data.visits === null){
                stateCopy.data.visits = 0;
            }
            break;
        }

        default : {
            break;
        }
    }
    return stateCopy;
}

let toggleFetchingAC = () => {
    return {
        type : TOGGLE_FETCHING
    }
}

let setDataAC = (data) => {
    return {
        type : SET_DATA,
        data : data
    }
}

let getDataThunk = () => {
    return (dispatch) => {
        dispatch(toggleFetchingAC());
        stats_api.getStats()
            .then(resp => {
                dispatch(setDataAC(resp.data));
                dispatch(toggleFetchingAC());
            })
            .catch(console.log);
    }
}

export {statsReducer, getDataThunk}