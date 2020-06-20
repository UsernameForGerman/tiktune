import {Redirect, Route} from "react-router-dom";
import MobileHeaderContainer from "./comp/Header/MobileHeader/MobileHeaderContainer";
import Footer from "./comp/Mobile/Footer/Footer";
import React from "react";
import TrendsPageContainer from "./comp/Mobile/TrendsPage/TrendsPageContainer";
import MainPage from "./comp/Mobile/MainPage/MainPage";
import ResultPageContainer from "./comp/Mobile/ResultPage/ResultPageContainer";

let MobileApp = (props) => {
    return(
        <>
            <Route path={"/:link?"}>
                <MobileHeaderContainer/>
                </Route>
                <Route path={"/"} exact>
                    <MainPage/>
                </Route>
                <Route path={"/trends"} exact>
                    <TrendsPageContainer/>
                </Route>
                <Route path={"/search"}>
                    <ResultPageContainer/>
                </Route>
                <Route>
                    <Redirect to={"/"}/>
                </Route>
                <Footer setLoc={props.setLoc}/>
        </>
    );
}

export default MobileApp;