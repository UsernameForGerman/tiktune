import classes from "./MobileHeader.module.css"
import React from "react";
import logo from "../../../assets/img/logo@2x.png";
import share from "../../../assets/img/share@2x.png";
import copy from "../../../assets/img/instrLink.png";
import Instruction from "../../Instruction/Instruction";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
let MobileHeader = (props) => {
    return(
        <div className={classes.background}>
            <MobileContainer withShadow>
                <header className={classes.HeaderWrapper}>
                    <div className={classes.Header}>
                        <img src={logo} className={classes.logo} alt={"tiktune logo"}/>
                        {!props.isTrends
                            ? <>
                                <span className={classes.desc}>
                                    <br/>Вся музыка из TikTok <br/>Уже в вашей медиатеке
                                </span>
                                <Instruction/>
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