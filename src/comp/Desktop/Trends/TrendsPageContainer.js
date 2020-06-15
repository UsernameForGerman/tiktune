import TrendsPage from "./TrendsPage";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import trendsSelector from "../../../selectors/trendsSelector";
import {getTrendSongsThunk} from "../../../reducers/trendsReducer";

let TrendsPageContainer = (props) => {
    useEffect(() => {
        props.getTrends();
    }, props.songsList);

    debugger;
    return(
        <TrendsPage/>
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