import Preloader from "../../common/Preloader/Preloader";
import React, {useEffect} from "react";
import TrendsPage from "./TrendsPage";
import renderList from "../../../DAL/utils/renderer";
import TrendsSelector from "../../../selectors/trendsSelector";
import {connect} from "react-redux";
import {getTrendSongsThunk} from "../../../reducers/trendsReducer";
import Nav from "../../Nav/Nav";

let TrendsPageContainer = (props) => {
    useEffect(() => {
        props.getSongs();
    }, props.list.length)
    let list = renderList(props.list);
    return (
        <>
            <Nav/>
            {props.isFetching
                ? <Preloader/>
                : <TrendsPage list={list}/>
            }
        </>
    );
}

let mapStateToProps = (state) => {
    return {
        isFetching : TrendsSelector.isFetching(state),
        list : TrendsSelector.getList(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getSongs : () => {
            dispatch(getTrendSongsThunk());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendsPageContainer)