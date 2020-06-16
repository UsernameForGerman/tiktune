import React from "react";
import classes from "./SongListItem.module.css";
import apple from "../../assets/img/appleMusic.png";
import spotify from "../../assets/img/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png"
import googlePlay from "../../assets/img/googlePlay.png";
let SongListItem = (props) => {
    debugger;
    let appleLink = (<a className={classes.appleLink} href={props.itunes_url}>
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
                    </a>);
    return(
        <div className={`${classes.SongListItem}`}>
            <div className={classes.ava}>
                <img className={`${classes.picture}`} src={props.image} alt={"Music picture"}/>
                <span className={classes.downloads}>
                    {props.amount}
                </span>
            </div>
            <div className={classes.info}>
                <div className={classes.name}>
                    {props.name}
                </div>
                <div className={classes.singer}>
                    {props.artists.name}
                </div>
                <div className={classes.btns}>
                    <a href={props.spotify_url}>
                        <img src={spotify} className={classes.spotify} alt={"spotify icon"}/>
                    </a>
                    <a className={classes.googlePlayLink} href={props.play_url}>
                        <img src={googlePlay} className={classes.googlePlayLinkIcon} alt={"Google play btn"}/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SongListItem;