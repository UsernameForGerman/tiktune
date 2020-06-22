import {FormattedMessage} from "react-intl";
import React from "react";

let getEmptySong = () => {
    return {
        name : <FormattedMessage id={"unknown_song_label"}/>,
        artists : [{name :<FormattedMessage id={"not_found_label"}/>}],
        image : ""
    }
}

export default getEmptySong;