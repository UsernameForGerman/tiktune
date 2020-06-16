class BaseReducer {
    constructor(name) {
        this.TOGGLE_FETCHING = name.toUpperCase() + "/TOGGLE_FETCHING";
        this.SET_LIST = name.toUpperCase() + "/SET_LIST";
        this.SET_ERROR_MSG = name.toUpperCase() + "/SET_ERROR_MSG";
        this.initialState = {
            isFetching : false,
            songsList : [],
            errorMsg : ""
        }
    }

    copyState = (state) => {
        let copy = {...state};
        copy.songsList = [...state.songsList];
        return copy;
    }

    reducer = (state = this.initialState, action) => {
        let stateCopy = this.copyState(state);
        debugger;
        switch (action.type) {
            case this.TOGGLE_FETCHING : {
                stateCopy.isFetching = !stateCopy.isFetching;
                break;
            }

            case this.SET_LIST : {
                stateCopy.songsList = action.list;
                break;
            }

            case this.SET_ERROR_MSG : {
                stateCopy.errorMsg = action.msg;
                break;
            }

            default : {
                break;
            }
        }

        return stateCopy;
    }

    toggleFetchAC = () => {
        return {
            type : this.TOGGLE_FETCHING
        }
    }

    setList = (list) => {
        debugger;
        return {
            type : this.SET_LIST,
            list : list
        }
    }

    setErrorMsg = (msg) => {
        return {
            type : this.SET_ERROR_MSG,
            msg : msg
        }
    }
}

export default BaseReducer;
