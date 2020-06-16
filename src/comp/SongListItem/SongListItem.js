import React from "react";
import classes from "./SongListItem.module.css";
import apple from "../../assets/img/Small_Badge/Apple_Music_Small_Badge_RGB.png";
import spotify from "../../assets/img/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png"
import googlePlay from "../../assets/img/googlePlay.png";
let SongListItem = (props) => {
    let googleLink = (<a className={classes.googlePlayLink} href={props.play_url}>
                        <img src={googlePlay} className={classes.googlePlayLinkIcon} alt={"Google play btn"}/>
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
                    <a className={classes.appleLink} href={props.itunes_url}>
                        <img src={apple} alt={"apple icon"}/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SongListItem;