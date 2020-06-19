import SongListItem from "../../SongListItem/SongListItem";
import React from "react";
import classes from "./ResultPage.module.css";
import SearchBtn from "../../common/SearchBtn/SearchBtn";
import Adsense from "../../Adsense/Adsense";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
import {FormattedMessage} from "react-intl";
let ResultPage = (props) => {
    return(
        <MobileContainer>
            {props.name
                ? <div className={classes.result}>
                    <div className={classes.desc}>
                        <FormattedMessage id={"search_result_label"}/>
                    </div>
                    <SongListItem {...props}/>
                    <div className={classes.search}>
                        <SearchBtn/>
                    </div>
                </div>
                : <div className={classes.result}>
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
                    <div className={classes.search}>
                        <SearchBtn/>
                    </div>
                </div>
            }
            <Adsense/>
        </MobileContainer>
    )
}

export default ResultPage;