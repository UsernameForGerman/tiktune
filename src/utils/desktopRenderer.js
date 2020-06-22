import SongListItem from "../comp/SongListItem/SongListItem";
import React from "react";
import SongList from "../comp/common/SongList/SongList";
import not_found from "../assets/img/not_found.png";
import formatResponse from "./responseFormatter";
import classes from "../comp/SongListItem/SongListItem.module.css";
import spotify from "../assets/img/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png";
import apple from "../assets/img/Apple_Music_Badge/Web_SVG/US-UK_Apple_Music_Badge_RGB.png";
import appleLogo from "../assets/img/appleMusic.png";

let renderSong = (resp) => {
    let props = formatResponse(resp);
        return(
        <div className={`${classes.SongListItem}`}>
            <div className={classes.ava}>
                <img className={`${classes.picture}`} src={props.image} alt={"Music picture"}/>
                <div className={classes.downloads}>
                    {props.amount}
                </div>
            </div>
            <div className={classes.info}>
                <div className={classes.name}>
                    {props.name}
                </div>
                <div className={classes.singer}>
                    {props.artists[0].name}
                </div>
            </div>
            <div className={classes.desktop_btns}>
                {props.spotify_url
                    ? <a href={props.spotify_url}>
                        <img src={spotify} className={classes.spotify} alt={"spotify icon"}/>
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
    )
}

let renderList = (data) => {
    return(<SongList list={
        data.map(elem => {
            return renderSong(elem);
        })
    }/>);
}

export default renderList;