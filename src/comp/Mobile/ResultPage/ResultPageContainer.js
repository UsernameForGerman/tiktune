import {connect} from "react-redux";
import searchSelector from "../../../selectors/searchSelector";
import renderList from "../../../DAL/utils/renderer";
import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import ResultPage from "./ResultPage";
import classes from "./ResultPage.module.css"

let ResultPageContainer = (props) => {
    let renderedList = renderList(props.list);
    return(
        <>
            {props.isFetching
                ? <div className={classes.preloader}><Preloader/></div>
                : <ResultPage {...props} renderedList={renderedList}/>
            }
        </>
    )
}

let mapStateToProps = (state) => {
    return {
        list : searchSelector.getList(state),
        isFetching : searchSelector.isFetching(state)
    }
}

export default connect(mapStateToProps)(ResultPageContainer);