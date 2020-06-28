import React from "react";
import classes from "./TrendsPage.module.css";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
let TrendsPage = (props) => {
    window.scrollTo(0,0);
    return (
        <div className={classes.page}>
            <MobileContainer>
                {props.list}
            </MobileContainer>
        </div>
    )
}

export default TrendsPage;