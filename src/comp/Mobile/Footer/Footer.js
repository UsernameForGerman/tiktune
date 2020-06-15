import React from "react";
import classes from "./Footer.module.css";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
import LanguageSwitch from "../../LanguageSwitch/LanguageSwitch";
let Footer = (props) => {
    return(
        <footer className={classes.Footer}>
            <MobileContainer>
                <div className={classes.feedback}>
                    <span className={classes.desc}>
                        Есть что сказать?
                    </span>
                    <a href={"mailto:info@tiktune.io"} className={classes.link}>
                        info@tiktune.io
                    </a>
                </div>
                <div className={classes.feedback}>
                    <span className={classes.desc}>
                        Нашли ошибку?
                    </span>
                    <a href={"mailto:bugs@tiktune.io"} className={classes.link}>
                        bugs@tiktune.io
                    </a>
                </div>
                <LanguageSwitch/>
            </MobileContainer>
            <div className={classes.copyright}>
                &#169; Copyright 2020,TikTune
            </div>
        </footer>
    )
}

export default Footer;