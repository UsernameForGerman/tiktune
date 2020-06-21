import classes from "./TrendsPage.module.css"
import React from "react";
import Adsense from "../../Adsense/Adsense";
import Preloader from "../../common/Preloader/Preloader";
let TrendsPage = (props) => {
    return(
        <section className={classes.Trends}>
            {props.isFetching
                ? <Preloader/>
                : <div className={`${classes.list} ${classes.col}`}>
                      {props.list}
                  </div>
            }
            <div className={classes.col2}>
                <Adsense/>
                <Adsense/>
            </div>
        </section>
    )
}

export default TrendsPage;