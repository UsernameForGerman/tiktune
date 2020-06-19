class StatsSelector {
    isFetching = (state) => {
        return state.stats.isFetching;
    }

    getData = (state) => {
        return state.stats.data;
    }
}

export default new StatsSelector();