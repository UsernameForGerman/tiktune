
import React from "react";
import classes from "./LanguageSwitch.module.css"
import {FormattedMessage} from "react-intl";
let LanguageSwitch = (props) => {
    let setRus = () => props.setLoc('ru');
    let setEng = () => props.setLoc('en');
    let setCh = () => props.setLoc('ch');
    return(
        <div className={classes.LanguageSwitch} style={props.styles}>
            <div className={classes.language} onClick={setRus}>
                <FormattedMessage id={"rus_label"}/>
            </div>
            <div className={classes.language} onClick={setEng}>
                <FormattedMessage id={"eng_label"}/>
            </div>
            <div className={classes.language} onClick={setCh}>
                <FormattedMessage id={"chinese_label"}/>
            </div>
        </div>
    )
}

export default LanguageSwitch;