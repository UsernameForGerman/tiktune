import React from "react";
import classes from "./MobileContainer.module.css"
let MobileContainer = (props) => {
    return (
        <section style={props.withShadow ? {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.161)"
        } : undefined} className={classes.MobileContainer}>
            {props.children}
        </section>
    )
}

export default MobileContainer;