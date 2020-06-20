import {connect} from "react-redux";
import StatsSelector from "../../../selectors/statsSelector";
import {getDataThunk} from "../../../reducers/statsReducer";
import React, {useEffect} from "react";
import StatisticsSection from "./StatisticsSection";

let StatisticSectionContainer = (props) => {
    useEffect(() => {
        props.getStats();
    }, props.data.length);

    return (
        <>
            {props.isFetching
                ? <></>
                : <StatisticsSection data={props.data}/>
            }
        </>
    );
}

let mapStateToProps = (state) => {
    return {
        isFetching : StatsSelector.isFetching(state),
        data : StatsSelector.getData(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getStats : () => {
            dispatch(getDataThunk());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticSectionContainer);