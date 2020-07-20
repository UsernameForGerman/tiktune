class VisitSelector {
    static isVisited = (state) => {
        return state.visit.isVisited;
    }
    static isSending = (state) => {
        return state.visit.isSending;
    }
}

export default VisitSelector;