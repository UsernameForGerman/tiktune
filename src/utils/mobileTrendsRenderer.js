import SongList from "../comp/common/SongList/SongList";
import React from "react";
import SongListItem from "../comp/SongListItem/SongListItem";
import default_img from "../assets/img/not_found.png";
import classes from "../comp/SongListItem/SongListItem.module.css";
import googlePlay from "../assets/img/googlePlay.png";
import apple from "../assets/img/Apple_Music_Badge/Web_SVG/US-UK_Apple_Music_Badge_RGB.png";
import appleLogo from "../assets/img/appleMusic.png";
import formatResponse from "./responseFormatter";

let renderList = (data) => {
    return(<SongList list={
        data.map(elem => {
            let renderSong = (song) => {
                let props = formatResponse(song);
                return (
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
                            <div className={classes.btns}>
                                {props.play_url
                                    ? <a className={classes.mobileTrendsGooglePlayLink} href={props.play_url}>
                                          <img src={googlePlay} className={classes.googlePlayLinkIcon} alt={"Google play btn"}/>
                                      </a>
                                    : <></>
                                }
                                {props.itunes_url
                                    ? <a className={classes.appleLink} href={props.itunes_url}>
                                        <img src={apple} className={classes.mobileTrendsAppleWrapper} alt={"apple icon"}/>
                                        <img src={appleLogo} className={classes.mobileTrendsAppleIcon} alt={"apple"}/>
                                      </a>
                                    : <></>
                                }
                             </div>
                        </div>
                    </div>)
        }

            return renderSong(elem);
        })
    }/>);
}

export default renderList;