import React from "react";
import classes from "./ResultPage.module.css";
import SearchInput from "../../common/SearchInput/SearchInput";
import Preloader from "../../common/Preloader/Preloader";
let ResultPage = (props) => {
    let ref = React.createRef();
    let handleClick = () => {
        let text = ref.current.value;
        window.localStorage.setItem('last_link', text);
        props.getSong(text);
    }
    return(
        <>
            {props.isSongFetching ? <Preloader/>
            :    props.resultSet.length > 0
                    ? <div className={classes.result}>
                        <SearchInput click={handleClick} refer={ref}/>
                        <div className={classes.desc}>
                            Результат поиска
                        </div>
                        {props.resultList}
                    </div>
                    : <div className={classes.result}>
                        <SearchInput click={handleClick} refer={ref}/>
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
                    </div>
            }
            {props.isHistoryFetching ? <></> : props.historyList}
        </>
    )
}

export default ResultPage;