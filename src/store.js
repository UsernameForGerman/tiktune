import {applyMiddleware, combineReducers, createStore} from "redux";
import {historyReducer} from "./reducers/historyReducer";
import {trendsReducer} from "./reducers/trendsReducer";
import {searchReducer} from "./reducers/searchReducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
    history : historyReducer,
    trends : trendsReducer,
    search : searchReducer
})
let store = createStore(reducers, applyMiddleware(thunk));

export default store;