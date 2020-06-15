import React from "react";
import classes from "./StatisticsSection.module.css";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
let StatisticsSection = (props) => {
    return(
        <section className={classes.StatisticsSection}>
            <MobileContainer>
                <div className={classes.labeledNumber}>
                    <span className={classes.number}>
                        {props.requests}
                    </span>
                    <span className={classes.label}>
                        поисковых запросов
                    </span>
                </div>
                <div className={classes.labeledNumber}>
                    <span className={classes.number}>
                        {props.songs}
                    </span>
                    <span className={classes.label}>
                        песен найдено
                    </span>
                </div>
                <div className={classes.labeledNumber}>
                    <span className={classes.number}>
                        {props.visits}
                    </span>
                    <span className={classes.label}>
                        посещений tiktune
                    </span>
                </div>
            </MobileContainer>
        </section>
    )
}

export default StatisticsSection;