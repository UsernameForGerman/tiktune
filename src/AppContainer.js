import MobileApp from "./MobileApp";
import DesktopApp from "./DesktopApp";
import React from "react";
import {connect} from "react-redux";
import VisitSelector from "./selectors/visitSelector";
import {visitThunk} from "./reducers/visitReducer";

let AppContainer = (props) => {
    if (!props.isVisited && !props.isSending) props.visit();
    return (
        <>
            {props.isMobile
                ? <MobileApp setLoc={props.setLocale} locale={props.locale}/>
                : <DesktopApp setLoc={props.setLocale} locale={props.locale}/>
            }
        </>
    )
}

let mapStateToProps = (state) => {
    return {
        isVisited : VisitSelector.isVisited(state),
        isSending : VisitSelector.isSending(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        visit : () => {
            dispatch(visitThunk())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);