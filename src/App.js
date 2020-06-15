import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {useMediaQuery} from "@material-ui/core";
import MobileApp from "./MobileApp";
import DesktopApp from "./DesktopApp";
import {Provider} from "react-redux";
import store from "./store";

function App() {
    let isMobile = useMediaQuery('(max-width:1280px)');
    return (
        <Provider store={store}>
            <div className={"App"}>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    {isMobile
                        ? <MobileApp/>
                        : <DesktopApp/>
                    }
                </BrowserRouter>
            </div>
        </Provider>
  );
}

export default App;
