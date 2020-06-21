import classes from "../../comp/SongListItem/SongListItem.module.css";
import spotify from "../../assets/img/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png";
import apple from "../../assets/img/Apple_Music_Badge/Web_SVG/US-UK_Apple_Music_Badge_RGB.png";
import appleLogo from "../../assets/img/appleMusic.png";
import not_found from "../../assets/img/not_found.png";
import React from "react";
import SongList from "../../comp/common/SongList/SongList";
import {FormattedMessage} from "react-intl";

let formatResponse = (resp) => {
    let formatted = {...resp};
    formatted.artists = resp.artists.reduce((a = "", b) => {
        return a + " & " + b.name;
    })

    if (formatted.amount >= 1000000){
        formatted.amount = Number(formatted.amount / 1000000.0) + "M"
    } else if (formatted.amount >= 1000){
        formatted.amount = Number(formatted.amount / 1000.0) + "K"
    }

    if (formatted.image === ""){
        formatted.image = not_found;
    }

    return formatted;
}

let renderSong = (resp) => {
    let props = formatResponse(resp);
        return(
        <div className={`${classes.searchResult}`}>
            <div className={classes.row}>
                <div className={classes.ava}>
                    <img className={`${classes.picture}`} src={props.image} alt={"Music picture"}/>
                </div>
                <div className={classes.info}>
                    <div className={classes.name}>
                        {props.name}
                    </div>
                    <div className={classes.singer}>
                        {props.artists.name}
                    </div>
                    <span className={classes.downloads}>
                        {props.amount}
                        <FormattedMessage id={"requests_label"}/>
                    </span>
                </div>
            </div>
            <div className={`${classes.btns} ${classes.row} ${classes.resultBtns}`}>
                <a href={props.spotify_url}>
                    <img src={spotify} className={classes.spotify} alt={"spotify icon"}/>
                </a>
                <a className={classes.appleLink} href={props.itunes_url}>
                    <img src={apple} className={classes.appleWrapper} alt={"apple icon"}/>
                    <img src={appleLogo} className={classes.appleIcon} alt={"apple"}/>
                </a>
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