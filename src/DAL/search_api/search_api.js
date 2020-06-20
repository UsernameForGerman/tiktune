import api from "../api/api";

const SEARCH_API = "/search/";

class search_api extends api{
    constructor(props) {
        super(SEARCH_API)
    }

    getSongByUrl = (url) => {
        return this.getInline("","?url=" + url.toString());
    }
}

export default new search_api();