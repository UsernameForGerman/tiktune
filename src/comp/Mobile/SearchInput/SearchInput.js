import classes from "./SearchInput.module.css"
import React, {useState} from "react";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
import Adsense from "../../Adsense/Adsense";
import SearchBtn from "../../common/SearchBtn/SearchBtn";
import {FormattedMessage} from "react-intl";
import {NavLink} from "react-router-dom";
let SearchInput = (props) => {
    let ref = React.createRef();
    let [hidden, setHidden] = useState(true);
    let checkHidden = () => {
        let bool = ref.current.value === "";
        setHidden(bool);
    }

    let search = () => {
        props.search(ref.current.value);
    }
    return(
        <MobileContainer>
            <div className={classes.SearchInput}>
                <div className={classes.label}>
                    <FormattedMessage id={"paste_link_label"}/>
                </div>
                <div className={classes.inputWrapper}>
                    <input type={"text"} ref={ref} className={classes.input} onChange={checkHidden}/>
                    <NavLink to={"/search"}>
                        <SearchBtn hidden={hidden} click={search}/>
                    </NavLink>
                </div>
            </div>
            <Adsense/>
        </MobileContainer>
    )
}

export default SearchInput;