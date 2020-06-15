import React from "react";
import classes from "./Intruction.module.css"
import share from "../../assets/img/share@2x.png";
import copy from "../../assets/img/instrLink.png";

let Instruction = (props) => {
    return(
        <div className={classes.Instruction} style={props.styles}>
            <div className={classes.instructionPoint}>
                <img src={share} className={`${classes.img} ${props.iconClass}`} alt={"Share icon"}/>
                <span className={classes.instructionDesc}>
                    Нажмите <br/> «Поделиться»
                </span>
            </div>
            <div className={classes.instructionPoint}>
                <img src={copy} className={`${classes.img} ${props.iconClass}`} alt={"Copy icon"}/>
                <span className={classes.instructionDesc}>
                    Скопируйте <br/> ссылку
                </span>
            </div>
        </div>
    )
}

export default Instruction;