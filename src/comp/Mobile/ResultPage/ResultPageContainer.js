import {connect} from "react-redux";
import searchSelector from "../../../selectors/searchSelector";
import renderList from "../../../DAL/utils/renderer";
import Preloader from "../../common/Preloader/Preloader";
import React from "react";
import ResultPage from "./ResultPage";

let ResultPageContainer = (props) => {
    let renderedList = renderList(props.list);
    debugger;
    return(
        <>
            {props.isFetching
                ? <Preloader/>
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