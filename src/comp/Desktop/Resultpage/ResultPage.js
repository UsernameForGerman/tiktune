import React from "react";
import classes from "./ResultPage.module.css";
import SearchInput from "../../common/SearchInput/SearchInput";
import Preloader from "../../common/Preloader/Preloader";
import {FormattedMessage} from "react-intl";
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
            :    props.resultSet
                    ? <div className={classes.result}>
                        <SearchInput click={handleClick} refer={ref}/>
                        <div className={classes.desc}>
                            <FormattedMessage id={"search_result_label"}/>
                        </div>
                        {props.resultList}
                    </div>
                    : <div className={classes.result}>
                        <SearchInput click={handleClick} refer={ref}/>
                        <div className={classes.desc}>
                            <FormattedMessage id={"not_found_label"}/>
                        </div>
                        <div className={classes.reasons}>
                            <div className={classes.reasonsHeading}>
                                <FormattedMessage id={"probably_label"}/>
                            </div>
                            <ul className={classes.reasonsList}>
                                <li className={classes.reasonsListItem}>
                                    <FormattedMessage id={"song_is_not_in_stores_label"}/>
                                </li>
                                <li className={classes.reasonsListItem}>
                                    <FormattedMessage id={"unable_to_resolve_label"}/>
                                </li>
                            </ul>
                        </div>
                    </div>
            }
            {props.isHistoryFetching ? <></> :
                <>
                    <h2><FormattedMessage id={"search_result_label"}/></h2>
                    {props.historyList}
                </>
            }
        </>
    )
}

export default ResultPage;