import React from "react";
import classes from "./SongList.module.css"
let SongList = (props) => {
    return(
        <div className={classes.list} style={props.list.length === 0 ? {overflow : "hidden"} : {}}>
            {props.list}
        </div>
    );
}

export default SongList;