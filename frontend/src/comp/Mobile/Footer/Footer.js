import React from "react";
import classes from "./Footer.module.css";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
import LanguageSwitch from "../../LanguageSwitch/LanguageSwitch";
import {FormattedMessage} from "react-intl";
let Footer = (props) => {
    return(
        <footer className={classes.Footer}>
            <MobileContainer>
                <div className={classes.feedback}>
                    <span className={classes.desc}>
                        <FormattedMessage id={"have_ideas_label"}/>
                    </span>
                    <a href={"mailto:info@tiktune.io"} className={classes.link}>
                        info@tiktune.io
                    </a>
                </div>
                <div className={classes.feedback}>
                    <span className={classes.desc}>
                        <FormattedMessage id={"bug_found_label"}/>
                    </span>
                    <a href={"mailto:bugs@tiktune.io"} className={classes.link}>
                        bugs@tiktune.io
                    </a>
                </div>
                <LanguageSwitch setLoc={props.setLoc}/>
            </MobileContainer>
            <div className={classes.copyright}>
                &#169; Copyright 2020,TikTune
            </div>
        </footer>
    )
}

export default Footer;