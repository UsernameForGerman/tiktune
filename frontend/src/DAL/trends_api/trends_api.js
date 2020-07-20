import api from "../api/api";

const TRENDS_URL = "/trends/";

class trends_api extends api{
    constructor(props) {
        super(TRENDS_URL)
    }

    getTrendsSongs = () => {
        return this.get();
    }
}

export default new trends_api();
