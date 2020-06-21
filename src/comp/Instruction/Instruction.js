import React from "react";
import classes from "./Intruction.module.css"
import share from "../../assets/img/share@2x.png";
import copy from "../../assets/img/instrLink.png";
import {FormattedMessage} from "react-intl";

let Instruction = (props) => {
    return(
        <div className={classes.Instruction} style={props.styles}>
            <div className={classes.instructionPoint} style={props.mobile ? {width : "30%"} : {}}>
                <img src={share} className={`${classes.img} ${props.iconClass}`} alt={"Share icon"}/>
                <div className={classes.instructionDesc}>
                    <FormattedMessage id={"share_label"}/>
                </div>
            </div>
            <div className={classes.instructionPoint} style={props.mobile ? {width : "30%"} : {}}>
                <img src={copy} className={`${classes.img} ${props.iconClass}`} alt={"Copy icon"}/>
                <div className={classes.instructionDesc}>
                    <FormattedMessage id={"copy_link_label"}/>
                </div>
            </div>
        </div>
    )
}

export default Instruction;