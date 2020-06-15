import api from "../api/api";

const HISTORY_URL = "/history/";

class history_api extends api{
    constructor(props) {
        super(HISTORY_URL)
    }

    getHistory = () => {
        return this.get();
    }
}

export default new history_api();