import SongListItem from "../../SongListItem/SongListItem";
import React from "react";
import classes from "./ResultPage.module.css";
import SearchBtn from "../../common/SearchBtn/SearchBtn";
import Adsense from "../../Adsense/Adsense";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
import {FormattedMessage} from "react-intl";
import {NavLink} from "react-router-dom";
let ResultPage = (props) => {
    return(
        <MobileContainer>
            {props.list.length > 0
                ? <div className={classes.result}>
                    <div className={classes.desc}>
                        <FormattedMessage id={"search_result_label"}/>
                    </div>
                    {props.renderedList}
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
                        <NavLink to={"/"}>
                            <SearchBtn/>
                        </NavLink>
                    </div>
                </div>
            }
            <Adsense/>
        </MobileContainer>
    )
}

export default ResultPage;