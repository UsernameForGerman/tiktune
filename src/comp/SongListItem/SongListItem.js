import React from "react";
import classes from "./SongListItem.module.css";
import apple from "../../assets/img/Apple_Music_Badge/Web_SVG/US-UK_Apple_Music_Badge_RGB.png";
import appleLogo from "../../assets/img/appleMusic.png"
import googlePlay from "../../assets/img/googlePlay.png";
let SongListItem = (props) => {
    return(
        <div className={`${classes.SongListItem}`}>
            <div className={classes.ava}>
                <img className={`${classes.picture}`} src={props.image} alt={"Music picture"}/>
                <div className={classes.downloads}>
                    {props.amount}
                </div>
            </div>
            <div className={classes.info}>
                <div className={classes.desktop_info}>
                    <div className={classes.name}>
                        {props.name}
                    </div>
                    <div className={classes.singer}>
                        {props.artists[0].name}
                    </div>
                </div>
                <div className={classes.btns}>
                    {props.play_url
                        ? <a className={classes.googlePlayLink} href={props.play_url}>
                              <img src={googlePlay} className={classes.googlePlayLinkIcon} alt={"Google play btn"}/>
                          </a>
                        : <></>
                    }
                    {props.itunes_url
                        ? <a className={classes.appleLink} href={props.itunes_url}>
                            <img src={apple} className={classes.appleWrapper} alt={"apple icon"}/>
                            <img src={appleLogo} className={classes.appleIcon} alt={"apple"}/>
                          </a>
                        : <></>
                    }
                 </div>
            </div>
        </div>
    )
}

export default SongListItem;