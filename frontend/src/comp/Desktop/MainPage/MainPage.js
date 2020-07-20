import DesktopHeader from "../../Header/DesktopHeader/DesktopHeader";
import SearchContent from "../SearchContent/SearchContent";
import Adsense from "../../Adsense/Adsense";
import React from "react";
import {connect} from "react-redux";
import {getSongByUrlThunk} from "../../../reducers/searchReducer";

let MainPage = (props) => {
    window.scrollTo(0,0);
    return (
        <>
            <DesktopHeader {...props}/>
            <SearchContent {...props}/>
            <div style={{height : "33vh"}}/>
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
export default connect(mapStateToProps,mapDispatchToProps)(MainPage);