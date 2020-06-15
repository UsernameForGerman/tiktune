import SongListItem from "../../comp/SongListItem/SongListItem";
import React from "react";

let formatResponse = (resp) => {
    let formatted = {...resp};
    formatted.artists = resp.artists.reduce((a = "", b) => {
        return a + " & " + b;
    })

    if (formatted.amount >= 1000000){
        formatted.amount = Number(formatted.amount / 1000000.0) + "M"
    } else if (formatted.amount >= 1000){
        formatted.amount = Number(formatted.amount / 1000.0) + "K"
    }

    return formatted;
}

let renderSong = (resp) => {
    let formatted = formatResponse(resp);
    return (
        <SongListItem {...formatted}/>
    )
}

let renderList = (data) => {
    return data.map(elem => {
        return renderSong(elem);
    })
}

export default renderList;