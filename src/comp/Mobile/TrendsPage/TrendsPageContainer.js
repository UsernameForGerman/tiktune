import Preloader from "../../common/Preloader/Preloader";
import React, {useEffect} from "react";
import TrendsPage from "./TrendsPage";
import renderList from "../../../utils/mobileTrendsRenderer";
import TrendsSelector from "../../../selectors/trendsSelector";
import {connect} from "react-redux";
import {getTrendSongsThunk} from "../../../reducers/trendsReducer";
import Nav from "../../Nav/Nav";
import classes from "./TrendsPage.module.css";
import LifehackSection from "../LifehackSection/LifehackSection";
import StatisticsSectionContainer from "../StatisticsSection/StatisticsSectionContainer";

let TrendsPageContainer = (props) => {
    useEffect(() => {
        props.getSongs();
    }, props.list.length)
    let list = renderList(props.list);
    return (
        <>
            <Nav/>
            {props.isFetching
                ? <div className={classes.preloader}><Preloader/></div>
                : <>
                    <TrendsPage list={list}/>
                    <LifehackSection/>
                    <StatisticsSectionContainer/>
                  </>
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