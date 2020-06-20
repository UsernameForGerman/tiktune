import {withRouter} from "react-router-dom";
import MobileHeader from "./MobileHeader";
import React from "react";

let MobileHeaderContainer = (props) => {
    let link = props.match.params.link;
    return(
        <MobileHeader isTrends={Boolean(link)}/>
    )
}

export default withRouter(MobileHeaderContainer);