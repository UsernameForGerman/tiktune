import React from "react";
import classes from "./ResultPage.module.css";
import SearchInput from "../../common/SearchInput/SearchInput";
import Preloader from "../../common/Preloader/Preloader";
import {FormattedMessage} from "react-intl";
import Adsense from "../../Adsense/Adsense";
let ResultPage = (props) => {
    window.scrollTo(0,0);
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
                                </div>
                            : <></>
                    }
                    {props.isHistoryFetching ? <></> :
                        <div className={classes.historyList}>
                            {props.historyList}
                        </div>
                    }
                </div>
                <Adsense styles={{width : "20%"}}/>
            </div>
        </div>
    )
}

export default ResultPage;