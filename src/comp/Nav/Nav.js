import classes from "./Nav.module.css"
import React from "react";
import {NavLink} from "react-router-dom";
import {FormattedMessage} from "react-intl";
let Nav = (props) => {
    return(
        <div className={classes.Nav} style={props.styles}>
            <NavLink className={classes.link} activeClassName={classes.active} to={"/trends"}>
                <FormattedMessage id={"trends_label"}/>
            </NavLink>
            <NavLink className={classes.link} activeClassName={classes.active} to={"/search"} exact>
                <FormattedMessage id={"search_label"}/>
            </NavLink>
        </div>
    );
}

export default Nav;