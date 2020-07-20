import ResultPage from "./ResultPage";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import searchSelector from "../../../selectors/searchSelector";
import historySelector from "../../../selectors/historySelector";
import {getHistoryThunk} from "../../../reducers/historyReducer";
import {getSongByUrlThunk} from "../../../reducers/searchReducer";
import renderList from "../../../utils/desktopRenderer";

let ResultPageContainer = (props) => {
    useEffect(() => {
        props.getHistory()
    }, props.historyList.length);

    let resultList = renderList(props.resultSet, true);
    let historyList = renderList(props.historyList);
    window.scrollTo(0,0);
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