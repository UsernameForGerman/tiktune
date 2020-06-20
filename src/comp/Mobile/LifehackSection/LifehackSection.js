import classes from "./LifehackSection.module.css";
import React from "react";
import share from "../../../assets/img/share.png";
import addIcon from "../../../assets/img/addIcon.png";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
import {FormattedMessage} from "react-intl";
let LifehackSection = (props) => {
    return(
        <section className={classes.Lifehack}>
            <MobileContainer withShadow>
                <div className={classes.lifehackWrapper}>
                    <span className={classes.desc}>
                        <FormattedMessage id={"lifehack_label"}/>
                    </span>
                    <div className={classes.iosLabel}>
                        ios
                    </div>
                    <div className={classes.labeledIcon}>
                        <img className={classes.icon} src={share} alt={"ios share icon"}/>
                        <span className={classes.label}>
                            <FormattedMessage id={"tap_share_label"}/>
                        </span>
                    </div>
                    <div className={classes.labeledIcon}>
                        <img className={classes.icon} src={addIcon} alt={"ios add icon"}/>
                        <span className={classes.label}>
                            <FormattedMessage id={"choose_icon_label"}/>
                        </span>
                    </div>
                </div>
            </MobileContainer>
        </section>
    );
}

export default LifehackSection;