import classes from "./SearchInput.module.css"
import React, {useState} from "react";
import MobileContainer from "../../Containers/MobileContainer/MobileContainer";
import Adsense from "../../Adsense/Adsense";
import SearchBtn from "../../common/SearchBtn/SearchBtn";
let SearchInput = (props) => {
    let ref = React.createRef();
    let [hidden, setHidden] = useState(true);
    let checkHidden = () => {
        let bool = ref.current.value === "";
        setHidden(bool);
    }
    return(
        <MobileContainer>
            <div className={classes.SearchInput}>
                <div className={classes.label}>
                    Вставьте ссылкy
                </div>
                <div className={classes.inputWrapper}>
                    <input type={"text"} ref={ref} className={classes.input} onChange={checkHidden}/>
                    <SearchBtn hidden={hidden}/>
                </div>
            </div>
            <Adsense/>
        </MobileContainer>
    )
}

export default SearchInput;