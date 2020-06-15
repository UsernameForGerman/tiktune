import MobileContainer from "../Containers/MobileContainer/MobileContainer";
import React from "react";
import classes from "./LanguageSwitch.module.css"
let LanguageSwitch = (props) => {
    return(
        <div className={classes.LanguageSwitch} style={props.styles}>
            <span className={classes.language}>
                Русский
            </span>
            <span className={classes.language}>
                English
            </span>
            <span className={classes.language}>
                Chineese
            </span>
        </div>
    )
}

export default LanguageSwitch;