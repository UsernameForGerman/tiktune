import TrendsPage from "./TrendsPage";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import trendsSelector from "../../../selectors/trendsSelector";
import {getTrendSongsThunk} from "../../../reducers/trendsReducer";
import renderList from "../../../utils/desktopRenderer";

let TrendsPageContainer = (props) => {
    useEffect(() => {
        props.getTrends();
    }, props.songsList.length);
    let list = renderList(props.songsList);
    window.scrollTo(0,0);
    return(
        <TrendsPage list={list} isFetching={props.isFetching}/>
    )
}

let mapStateToProps = (state) => {
    return {
        isFetching : trendsSelector.isFetching(state),
        songsList : trendsSelector.getList(state),
        err : trendsSelector.getError(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getTrends : () => {
            dispatch(getTrendSongsThunk())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendsPageContainer);