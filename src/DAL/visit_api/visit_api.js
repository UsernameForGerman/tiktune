import api from "../api/api";
const BASE_URL = "/visit/"
class Visit_api extends api{
    constructor() {
        super(BASE_URL);
    }

    visit = () => {
        return this.api.post("", {}).then(resp => resp.data);
    }
}

export default new Visit_api();