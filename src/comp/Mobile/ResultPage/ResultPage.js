import SongListItem from "../../SongListItem/SongListItem";
import React from "react";
import classes from "./ResultPage.module.css";
import SearchBtn from "../../common/SearchBtn/SearchBtn";
import Adsense from "../../Adsense/Adsense";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
let ResultPage = (props) => {
    return(
        <MobileContainer>
            {props.name
                ? <div className={classes.result}>
                    <div className={classes.desc}>
                        Результат поиска
                    </div>
                    <SongListItem {...props}/>
                    <div className={classes.search}>
                        <div className={classes.searchLabel}>
                            Не то, что искали?
                        </div>
                        <SearchBtn/>
                    </div>
                </div>
                : <div className={classes.result}>
                    <div className={classes.desc}>
                        К сожалению мы ничего не нашли :(
                    </div>
                    <div className={classes.reasons}>
                        <div className={classes.reasonsHeading}>
                            Возможно:
                        </div>
                        <ul className={classes.reasonsList}>
                            <li className={classes.reasonsListItem}>
                                Данной песни нет ни в Apple Music, ни в Google Play Music
                            </li>
                            <li className={classes.reasonsListItem}>
                                Песня неразборчива
                            </li>
                        </ul>
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchLabel}>
                            Попробуйте еще
                        </div>
                        <SearchBtn/>
                    </div>
                </div>
            }
            <Adsense/>
        </MobileContainer>
    )
}

export default ResultPage;