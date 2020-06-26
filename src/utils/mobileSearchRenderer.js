import classes from "../comp/SongListItem/SongListItem.module.css";
import spotify from "../assets/img/spotify-icons-logos/icons/01_RGB/02_PNG/Spotify_Icon_RGB_Green.png";
import apple from "../assets/img/Apple_Music_Badge/Web_SVG/US-UK_Apple_Music_Badge_RGB.png";
import appleLogo from "../assets/img/appleMusic.png";
import React from "react";
import SongList from "../comp/common/SongList/SongList";
import {FormattedMessage} from "react-intl";
import formatResponse from "./responseFormatter";
import googlePlay from "../assets/img/googlePlay.png";

let renderSong = (resp) => {
    let props = formatResponse(resp);
        return(
        <div className={`${classes.searchResult}`}>
            <div className={classes.mobileRow}>
                <div className={classes.ava}>
                    <img className={`${classes.picture}`} src={props.image} alt={"Music picture"}/>
                </div>
                <div className={classes.info}>
                    <div className={classes.info_wrapper}>
                        <div className={classes.name}>
                            {props.name}
                        </div>
                        <div className={classes.singer}>
                            {props.artists[0].name}
                        </div>
                    </div>
                    <div className={classes.search_downloads}>
                        {props.amount}
                        {props.amount
                            ? <div className={classes.searchesLabel}>
                                 <FormattedMessage id={"searches_label"}/>
                              </div>
                            : <></>
                        }

                    </div>
                </div>
            </div>
            <div className={`${classes.btns} ${classes.resultBtns}`}>
                {props.play_url
                    ? <a className={classes.googlePlayLink} href={props.play_url}>
                          <img src={googlePlay} className={classes.googlePlayLinkIcon} alt={"Google play btn"}/>
                      </a>
                    : <></>
                }
                {props.itunes_url
                    ?<a className={classes.appleLink} href={props.itunes_url}>
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