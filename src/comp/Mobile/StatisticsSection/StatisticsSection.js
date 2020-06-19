import React from "react";
import classes from "./StatisticsSection.module.css";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
import {FormattedMessage} from "react-intl";
let StatisticsSection = (props) => {
    return(
        <section className={classes.StatisticsSection}>
            <MobileContainer>
                <div className={classes.labeledNumber}>
                    <span className={classes.number}>
                        {props.requests}
                    </span>
                    <span className={classes.label}>
                        <FormattedMessage id={"requests_label"}/>
                    </span>
                </div>
                <div className={classes.labeledNumber}>
                    <span className={classes.number}>
                        {props.songs}
                    </span>
                    <span className={classes.label}>
                        <FormattedMessage id={"songs_found_label"}/>
                    </span>
                </div>
                <div className={classes.labeledNumber}>
                    <span className={classes.number}>
                        {props.visits}
                    </span>
                    <span className={classes.label}>
                        <FormattedMessage id={"visits_label"}/>
                    </span>
                </div>
            </MobileContainer>
        </section>
    )
}

export default StatisticsSection;