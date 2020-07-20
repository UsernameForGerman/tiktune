import stats_api from "../DAL/stats_api/stats_api";
import visit_api from "../DAL/visit_api/visit_api";

let initialState = {
    isVisited : false,
    isSending : false
}

const TOGGLE_VISITED = "VISIT/TOGGLE_VISITED";
const TOGGLE_SENDING = "VISIT/TOGGLE_SENDING";

let copyState = (state) => {
    return {...state};
}

let visitReducer = (state = initialState, action) => {
    let stateCopy = copyState(state);
    switch (action.type) {
        case TOGGLE_VISITED : {
            stateCopy.isVisited = !stateCopy.isVisited;
            break;
        }

        case TOGGLE_SENDING : {
            stateCopy.isSending = !stateCopy.isSending;
            break;
        }

        default : {
            break;
        }
    }
    return stateCopy;
}

let toggleVisitedAC = () => {
    return {
        type : TOGGLE_VISITED
    }
}

let toggleSendingAC = () => {
    return {
        type : TOGGLE_SENDING
    }
}

let visitThunk = () => {
    return (dispatch) => {
        dispatch(toggleSendingAC())
        visit_api.visit()
            .then(resp => {
                dispatch(toggleVisitedAC());
                dispatch(toggleSendingAC());
            })
            .catch(console.log);
    }
}

export {visitThunk, visitReducer}