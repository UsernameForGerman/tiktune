import SongListItem from "../../comp/SongListItem/SongListItem";
import React from "react";
import SongList from "../../comp/common/SongList/SongList";
import not_found from "../../assets/img/not_found.png";

let formatResponse = (resp) => {
    let formatted = {...resp};
    formatted.artists = resp.artists.reduce((a = "", b) => {
        return a + " & " + b.name;
    })

    if (formatted.amount >= 1000000){
        formatted.amount = Number(formatted.amount / 1000000.0) + "M"
    } else if (formatted.amount >= 1000){
        formatted.amount = Number(formatted.amount / 1000.0) + "K"
    }

    if (formatted.image === null){
        formatted.image = not_found;
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
    return(<SongList list={
        data.map(elem => {
            return renderSong(elem);
        })
    }/>);
}

export default renderList;