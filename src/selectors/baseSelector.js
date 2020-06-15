class BaseSelector {
    constructor(statePart) {
        this.part = statePart;
    }

    isFetching = (state) => {
        return state[this.part].isFetching;
    }

    getList = (state) => {
        return state[this.part].songsList;
    }

    getError = (state) => {
        return state[this.part].errorMsg;
    }
}

export default BaseSelector;