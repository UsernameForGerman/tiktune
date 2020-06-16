import ResultPage from "./ResultPage";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import searchSelector from "../../../selectors/searchSelector";
import historySelector from "../../../selectors/historySelector";
import {getHistoryThunk} from "../../../reducers/historyReducer";
import {getSongByUrlThunk} from "../../../reducers/searchReducer";
import renderList from "../../../DAL/utils/renderer";

let ResultPageContainer = (props) => {
    useEffect(() => {
        props.getHistory()
    }, props.historyList.length);

    debugger;
    let resultList = renderList(props.resultSet);
    let historyList = renderList(props.historyList);
    return(
        <ResultPage {...props} resultList={resultList} historyList={historyList}/>
    )
}

let mapStateToProps = (state) => {
    return {
        isSongFetching : searchSelector.isFetching(state),
        isHistoryFetching : historySelector.isFetching(state),
        historyList : historySelector.getList(state),
        resultSet : searchSelector.getList(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getHistory : () => {
            dispatch(getHistoryThunk())
        },

        getSong : (link) => {
            dispatch(getSongByUrlThunk(link))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultPageContainer);