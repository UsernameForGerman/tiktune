import BaseSelector from "./baseSelector";

class HistorySelector extends BaseSelector{
    constructor() {
        super('history');
    }
}

export default new HistorySelector();