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
    let [isTouched, setTouched] = useState(false);
    let checkHidden = () => {
        let value = ref.current.value;
        let bool = value === "";
        setHidden(bool);
    }

    let handleClick = () => {
        setTouched(true);
    }

    let handleBlur = () => {
        let value = ref.current.value;
        let bool = value === "";
        setTouched(!bool);
    }

    let search = () => {
        props.search(ref.current.value);
    }
    return(
        <MobileContainer>
            <div className={classes.SearchInput}>
                <div className={classes.label} style={!isTouched ? {transform : "translateY(25px)"} : {}}>
                    <label htmlFor={"input"}>
                        <FormattedMessage id={"paste_link_label"}/>
                    </label>
                </div>
                <div className={classes.inputWrapper}>
                    <input type={"text"} id={"input"} ref={ref} style={!isTouched ? {width : "20%"} : {}} onClick={handleClick} onBlur={handleBlur} className={classes.input} onChange={checkHidden}/>
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