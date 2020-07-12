import classes from "./TrendsPage.module.css"
import React from "react";
import Adsense from "../../Adsense/Adsense";
import Preloader from "../../common/Preloader/Preloader";
let TrendsPage = (props) => {
    return(
        <section className={classes.Trends}>
            {props.isFetching
                ? <div className={classes.preloadWrapper}><Preloader/></div>
                : <div className={`${classes.list}`}>
                      {props.list}
                  </div>
            }
        </section>
    )
}

export default TrendsPage;