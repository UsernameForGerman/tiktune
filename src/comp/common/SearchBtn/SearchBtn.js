import classes from "./SearchBtn.module.css";
import React from "react";
import {FormattedMessage} from "react-intl";

let SearchBtn = (props) => {
    return(
        <button className={`${classes.searchBtn} ${props.customClass}`} hidden={props.hidden} onClick={props.click}><FormattedMessage id="search_label"/></button>
    )
}

export default SearchBtn;