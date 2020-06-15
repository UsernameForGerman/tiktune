import classes from "./SearchBtn.module.css";
import React from "react";

let SearchBtn = (props) => {
    return(
        <button className={`${classes.searchBtn} ${props.customClass}`} hidden={props.hidden} onClick={props.click}>Поиск</button>
    )
}

export default SearchBtn;