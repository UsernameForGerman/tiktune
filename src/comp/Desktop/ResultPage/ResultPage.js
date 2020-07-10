import React from "react";
import classes from "./ResultPage.module.css";
import SearchInput from "../../common/SearchInput/SearchInput";
import Preloader from "../../common/Preloader/Preloader";
import {FormattedMessage} from "react-intl";
import Adsense from "../../Adsense/Adsense";
let ResultPage = (props) => {
    let ref = React.createRef();
    let handleClick = () => {
        let text = ref.current.value;
        window.localStorage.setItem('last_link', text);
        props.getSong(text);
    }
    return(
        <div className={classes.result}>
            <SearchInput click={handleClick} refer={ref} styles={
                {
                    width : "90%",
                    marginLeft : "10%"
                }
            }/>
            <div className={classes.row}>
                <div className={classes.col}>
                    {props.isSongFetching ? <div className={classes.preloadWrapper}><Preloader/></div>
                    :    props.resultSet.length > 0
                            ?
                                <div className={classes.list}>
                                    {props.resultList}
                                    <Adsense/>
                                </div>
                            : <></>
                    }
                    {props.isHistoryFetching ? <></> :
                        <div className={classes.historyList}>
                            {props.historyList}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ResultPage;