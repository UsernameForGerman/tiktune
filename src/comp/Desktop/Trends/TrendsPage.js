import classes from "./TrendsPage.module.css"
import React from "react";
import Adsense from "../../Adsense/Adsense";
import Preloader from "../../common/Preloader/Preloader";
let TrendsPage = (props) => {
    window.scrollTo(0,0);
    return(
        <section className={classes.Trends}>
            {props.isFetching
                ? <div className={classes.preloadWrapper}><Preloader/></div>
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