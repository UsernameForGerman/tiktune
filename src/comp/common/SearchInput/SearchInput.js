import classes from "./SearchInput.module.css";
import {NavLink} from "react-router-dom";
import SearchBtn from "../SearchBtn/SearchBtn";
import React from "react";

let SearchInput = (props) => {
    return(
        <div className={classes.inputWrapper}>
            <input type={"text"} className={classes.input} ref={props.refer}/>
            <NavLink to={"/search"}>
                <SearchBtn customClass={classes.searchBtn} click={props.click}/>
            </NavLink>
        </div>
    )
}

export default SearchInput;