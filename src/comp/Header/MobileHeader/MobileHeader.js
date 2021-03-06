import classes from "./MobileHeader.module.css"
import React from "react";
import logo from "../../../assets/img/logo@2x.png";
import share from "../../../assets/img/share@2x.png";
import copy from "../../../assets/img/instrLink.png";
import Instruction from "../../Instruction/Instruction";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
import {FormattedMessage} from "react-intl";
import {NavLink} from "react-router-dom";
let MobileHeader = (props) => {
    return(
        <div className={classes.background}>
            <MobileContainer withShadow>
                <header className={classes.HeaderWrapper}>
                    <div className={classes.Header}>
                        <NavLink to={"/"}><img src={logo} className={classes.logo} alt={"tiktune logo"}/></NavLink>
                        {!props.isTrends
                            ? <>
                                <div className={classes.desc}>
                                    <FormattedMessage id={"desc"}/>
                                </div>
                                <Instruction mobile/>
                            </>
                            : <></>
                        }
                    </div>
                </header>
            </MobileContainer>
        </div>
    );
}

export default MobileHeader;