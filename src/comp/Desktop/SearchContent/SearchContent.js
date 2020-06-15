import classes from "./SearchContent.module.css"
import React from "react";
import logo from "../../../assets/img/logo@2x.png"
import Instruction from "../../Instruction/Instruction";
import SearchInput from "../../common/SearchInput/SearchInput";
let SearchContent = (props) => {
    let ref = React.createRef();
    let handleClick = () => {
        let link = ref.current.value;
        window.localStorage.setItem('last_link', link);
        props.search(link);
    }
    return(
        <div className={classes.SearchInput}>
            <Instruction
                styles={{
                    flexDirection : "column"
                }}
                iconClass={classes.iconClass}
            />
            <div className={classes.search}>
                <img src={logo} className={classes.logo}/>
                <SearchInput refer={ref} click={handleClick}/>
            </div>
        </div>
    )
}

export default SearchContent;