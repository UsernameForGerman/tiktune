import classes from "./TrendsPage.module.css"
import React from "react";
import Adsense from "../../Adsense/Adsense";
import addIcon from "../../../assets/img/addIcon.png";
import SongListItem from "../../SongListItem/SongListItem";
let TrendsPage = (props) => {
    return(
        <section className={classes.Trends}>
            <div className={`${classes.list} ${classes.col}`}>
                <SongListItem
                    imgLink={addIcon}
                    downloads={"100k"}
                    name={"Название песни"}
                    singer={"Имя артиста"}
                    googleLink={"#"}
                    appleLink={"#"}
                />
                <SongListItem
                    imgLink={addIcon}
                    downloads={"100k"}
                    name={"Название песни"}
                    singer={"Имя артиста"}
                    googleLink={"#"}
                    appleLink={"#"}
                />
                <SongListItem
                    imgLink={addIcon}
                    downloads={"100k"}
                    name={"Название песни"}
                    singer={"Имя артиста"}
                    googleLink={"#"}
                    appleLink={"#"}
                />
                <SongListItem
                    imgLink={addIcon}
                    downloads={"100k"}
                    name={"Название песни"}
                    singer={"Имя артиста"}
                    googleLink={"#"}
                    appleLink={"#"}
                />
            </div>
            <div className={classes.col}>
                <Adsense/>
                <Adsense/>
            </div>
        </section>
    )
}

export default TrendsPage;