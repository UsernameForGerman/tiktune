import classes from "./SearchInput.module.css";
import {NavLink} from "react-router-dom";
import SearchBtn from "../SearchBtn/SearchBtn";
import React, {useState} from "react";

let SearchInput = (props) => {
    let [value, setValue] = useState(window.localStorage.getItem("last_link"))
    let handleChange = () => {
        let val = props.refer.current.value;
        setValue(val);
        window.localStorage.setItem("last_link", val);
    }
    return(
        <div className={classes.inputWrapper}>
            <input type={"text"} className={classes.input} value={value} ref={props.refer} onChange={handleChange} style={props.styles}/>
            <NavLink to={"/search"}>
                <SearchBtn customClass={classes.searchBtn} click={props.click}/>
            </NavLink>
        </div>
    )
}

export default SearchInput;