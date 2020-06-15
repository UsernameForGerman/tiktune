import {Route} from "react-router-dom";
import DesktopHeader from "./comp/Header/DesktopHeader/DesktopHeader";
import SearchContent from "./comp/Desktop/SearchContent/SearchContent";
import Adsense from "./comp/Adsense/Adsense";
import Footer from "./comp/Desktop/Footer/Footer";
import DesktopContainer from "./comp/Containers/DesktopContainer/DesktopContainer";
import React from "react";
import TrendsPage from "./comp/Desktop/Trends/TrendsPage";
import ResultPage from "./comp/Desktop/Resultpage/ResultPage";
import MainPage from "./comp/Desktop/MainPage/MainPage";

let DesktopApp = (props) => {
    return(
        <>
            <DesktopContainer>
                <Route path={"/:link"}>
                    <DesktopHeader withLogo/>
                </Route>
                <Route path={"/"} exact>
                    <MainPage/>
                </Route>
                <Route path={"/search"}>
                    <ResultPage/>
                </Route>
                <Route path={"/trends"}>
                    <TrendsPage/>
                </Route>
                <Footer/>
            </DesktopContainer>
        </>
    )
}

export default DesktopApp;