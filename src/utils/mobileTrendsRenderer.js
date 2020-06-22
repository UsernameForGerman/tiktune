import SongList from "../comp/common/SongList/SongList";
import React from "react";
import SongListItem from "../comp/SongListItem/SongListItem";

let renderList = (data) => {
    return(<SongList list={
        data.map(elem => {
            let renderSong = (song) => {
                return <SongListItem {...song}/>
            }

            return renderSong(elem);
        })
    }/>);
}

export default renderList;