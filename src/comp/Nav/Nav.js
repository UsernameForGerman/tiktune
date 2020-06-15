import classes from "./Nav.module.css"
import React from "react";
import {NavLink} from "react-router-dom";
let Nav = (props) => {
    return(
        <div className={classes.Nav} style={props.styles}>
            <NavLink className={classes.link} activeClassName={classes.active} to={"/trends"}>
                Тренды
            </NavLink>
            <NavLink className={classes.link} activeClassName={classes.active} to={"/"} exact>
                Поиск
            </NavLink>
        </div>
    );
}

export default Nav;