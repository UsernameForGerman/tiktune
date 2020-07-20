import classes from "./DesktopHeader.module.css"
import React from "react";
import Nav from "../../Nav/Nav";
import logo from "../../../assets/img/logo@2x.png";
import LanguageSwitch from "../../LanguageSwitch/LanguageSwitch";
import {NavLink} from "react-router-dom";
let DesktopHeader = (props) => {
    return(
        <header className={classes.Header}>
            <div className={`${classes.col} ${classes.firstCol}`}>
                <Nav styles={{
                    width : "10vw"
                }}/>
                {props.withLogo
                    ? <NavLink to={"/"}><img src={logo} className={classes.logo} alt={"TikTune logo"}/></NavLink>
                    : <></>
                }
            </div>
            <div className={`${classes.col} ${classes.secondCol}`}>
                <LanguageSwitch {...props} styles={{
                    alignItems : "flex-end"
                }}/>
            </div>
        </header>
    )
}

export default DesktopHeader;