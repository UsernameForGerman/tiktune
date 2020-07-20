import api from "../api/api";

const STATS_URL = "/stats/";

class stats_api extends api{
    constructor() {
        super(STATS_URL);
    }

    getStats = () => {
        return this.get();
    }
}

export default new stats_api()