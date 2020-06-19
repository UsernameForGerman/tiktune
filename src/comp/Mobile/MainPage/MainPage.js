import Nav from "../../Nav/Nav";
import SearchInput from "../SearchInput/SearchInput";
import LifehackSection from "../LifehackSection/LifehackSection";
import StatisticSectionContainer from "../StatisticsSection/StatisticsSectionContainer";
import {Route} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {getSongByUrlThunk} from "../../../reducers/searchReducer";

let MainPage = (props) => {
    return (
        <>
            <Nav/>
            <SearchInput {...props}/>
            <LifehackSection/>
            <StatisticSectionContainer/>
        </>
    )
}

let mapStateToProps = (state) => {
    return {}
}

let mapDispatchToProps = (dispatch) => {
    return {
        search : (link) => {
            dispatch(getSongByUrlThunk(link))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);