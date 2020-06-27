import SongListItem from "../comp/SongListItem/SongListItem";
import React from "react";
import SongList from "../comp/common/SongList/SongList";
import not_found from "../assets/img/not_found.png";
import formatResponse from "./responseFormatter";
import classes from "../comp/SongListItem/SongListItem.module.css";
import spotify from "../assets/img/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png";
import apple from "../assets/img/Apple_Music_Badge/Web_SVG/US-UK_Apple_Music_Badge_RGB.png";
import appleLogo from "../assets/img/appleMusic.png";
import googlePlay from "../assets/img/googlePlay.png";

let renderSong = (resp) => {
    let props = formatResponse(resp);
        return(
        <div className={`${classes.SongListItem}`} style={!props.amount ? {width : "30vw"} : {}}>
            <div className={classes.ava}>
                <img className={`${classes.picture}`} src={props.image} alt={"Music picture"}/>
                <div className={classes.downloads}>
                    {props.amount}
                </div>
            </div>
            <div className={classes.desktop_info} style={!props.amount ? {width : "20vw"} : {}}>
                <div className={classes.name}>
                    {props.name}
                </div>
                <div className={classes.singer}>
                    {props.artists[0].name}
                </div>
            </div>
            {props.amount
                ? <div className={classes.desktop_btns}>
                    {props.play_url
                        ? <a className={classes.googlePlayLink} href={props.play_url} target={"blank"}>
                              <img src={googlePlay} className={classes.googlePlayLinkIcon} alt={"Google play btn"}/>
                          </a>
                        : <></>
                    }
                    {props.itunes_url
                        ? <a className={classes.appleLink} href={props.itunes_url} target={"blank"}>
                            <img src={apple} className={classes.appleWrapper} alt={"apple icon"}/>
                            <img src={appleLogo} className={classes.appleIcon} alt={"apple"}/>
                          </a>
                        : <></>
                    }
                 </div>
                : <></>
            }
        </div>
    )
}

let renderList = (data, result = false) => {
    return(<SongList result={result} list={
        data.map(elem => {
            return renderSong(elem);
        })
    }/>);
}

export default renderList;