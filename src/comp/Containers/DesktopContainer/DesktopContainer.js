import classes from "./DesktopContainer.module.css"
import React from "react";
let DesktopContainer = (props) => {
    return (
        <main className={classes.Container}>
            {props.children}
        </main>
    );
}

export default DesktopContainer;