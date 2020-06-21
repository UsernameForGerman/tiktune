import {Route} from "react-router-dom";
import DesktopHeader from "./comp/Header/DesktopHeader/DesktopHeader";
import Footer from "./comp/Desktop/Footer/Footer";
import DesktopContainer from "./comp/Containers/DesktopContainer/DesktopContainer";
import React from "react";
import MainPage from "./comp/Desktop/MainPage/MainPage";
import TrendsPageContainer from "./comp/Desktop/Trends/TrendsPageContainer";
import ResultPageContainer from "./comp/Desktop/ResultPage/ResultPageContainer";

let DesktopApp = (props) => {
    return(
        <>
            <DesktopContainer>
                <Route path={"/:link"}>
                    <DesktopHeader withLogo setLoc={props.setLoc}/>
                </Route>
                <Route path={"/"} exact>
                    <MainPage setLoc={props.setLoc}/>
                </Route>
                <Route path={"/search"}>
                    <ResultPageContainer/>
                </Route>
                <Route path={"/trends"}>
                    <TrendsPageContainer/>
                </Route>
                <Footer/>
            </DesktopContainer>
        </>
    )
}

export default DesktopApp;