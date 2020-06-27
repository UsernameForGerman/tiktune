import classes from "./SearchContent.module.css"
import React from "react";
import logo from "../../../assets/img/logo@2x.png"
import Instruction from "../../Instruction/Instruction";
import SearchInput from "../../common/SearchInput/SearchInput";
let SearchContent = (props) => {
    let ref = React.createRef();
    let handleClick = (e) => {
        let link = ref.current.value;
        window.localStorage.setItem('last_link', link);
        if (link.length > 0){
            props.search(link);
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    return(
        <div className={classes.SearchInput}>
            <img src={logo} className={classes.logo}/>
            <div className={classes.search}>
                <Instruction
                    styles={{
                        flexDirection : "column"
                    }}
                    iconClass={classes.iconClass}
                    pointClass={classes.point}
                />
                <SearchInput refer={ref} click={handleClick} class={classes.wrapper}/>
            </div>
        </div>
    )
}

export default SearchContent;