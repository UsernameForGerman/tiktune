import React from "react";
import classes from "./SongListItem.module.css";
import apple from "../../assets/img/appleMusic.png"
import googlePlay from "../../assets/img/googlePlay.png"
let SongListItem = (props) => {
    return(
        <div className={`${classes.SongListItem}`}>
            <div className={classes.ava}>
                <img className={`${classes.picture}`} src={props.imgLink} alt={"Music picture"}/>
                <span className={classes.downloads}>
                    {props.downloads}
                </span>
            </div>
            <div className={classes.info}>
                <div className={classes.name}>
                    {props.name}
                </div>
                <div className={classes.singer}>
                    {props.singer}
                </div>
                <div className={classes.btns}>
                    <a className={classes.appleLink} href={props.appleLink}>
                        <div className={`${classes.icon}`}>
                            <img src={apple} className={classes.appleIcon} alt={"Apple music icon"}/>
                        </div>
                        <div className={classes.appleInfo}>
                            <div className={classes.listen}>
                                Listen on
                            </div>
                            <div className={classes.appleMusic}>
                                Apple Music
                            </div>
                        </div>
                    </a>
                    <a className={classes.googlePlayLink} href={props.googleLink}>
                        <img src={googlePlay} className={classes.googlePlayLinkIcon} alt={"Google play btn"}/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SongListItem;