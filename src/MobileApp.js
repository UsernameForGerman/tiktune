import {BrowserRouter, Redirect, Route} from "react-router-dom";
import MobileHeaderContainer from "./comp/Header/MobileHeader/MobileHeaderContainer";
import Nav from "./comp/Nav/Nav";
import SearchInput from "./comp/Mobile/SearchInput/SearchInput";
import LifehackSection from "./comp/Mobile/LifehackSection/LifehackSection";
import StatisticsSection from "./comp/Mobile/StatisticsSection/StatisticsSection";
import SongListItem from "./comp/SongListItem/SongListItem";
import addIcon from "./assets/img/addIcon.png";
import ResultPage from "./comp/Mobile/ResultPage/ResultPage";
import Footer from "./comp/Mobile/Footer/Footer";
import React from "react";

let MobileApp = (props) => {
    return(
        <>
            <Route path={"/:link?"}>
                <MobileHeaderContainer/>
                </Route>
                <Route path={"/"} exact>
                    <Nav/>
                    <SearchInput/>
                    <LifehackSection/>
                    <StatisticsSection
                        requests={3453}
                        songs={1245}
                        visits={6439}
                    />
                </Route>
                <Route path={"/trends"}>
                    <Nav/>
                    <SongListItem
                        imgLink={addIcon}
                        downloads={"100k"}
                        name={"Название песни"}
                        singer={"Имя артиста"}
                        googleLink={"#"}
                        appleLink={"#"}
                    />
                </Route>
                <Route path={"/search"}>
                    <ResultPage/>
                </Route>
                <Route>
                    <Redirect to={"/"}/>
                </Route>
                <Footer setLoc={props.setLoc}/>
        </>
    );
}

export default MobileApp;