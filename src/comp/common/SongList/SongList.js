import React from "react";
import classes from "./SongList.module.css"
let SongList = (props) => {
    return(
        <div className={classes.list}>
            {props.list}
        </div>
    );
}

export default SongList;