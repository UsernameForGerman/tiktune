import React, {useState} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {useMediaQuery} from "@material-ui/core";
import MobileApp from "./MobileApp";
import DesktopApp from "./DesktopApp";
import {Provider} from "react-redux";
import store from "./store";
import rus from "./translations/rus.json";
import eng from "./translations/eng.json";
import chinese from "./translations/ch.json";
import {IntlProvider} from "react-intl";

let messages = {
    ru : rus,
    en : eng,
    ch : chinese
}

function App() {
    let [locale, setLocale] = useState('ru');
    let isMobile = useMediaQuery('(max-width:1280px)');
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <Provider store={store}>
                <div className={"App"}>
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        {isMobile
                            ? <MobileApp setLoc={setLocale}/>
                            : <DesktopApp setLoc={setLocale}/>
                        }
                    </BrowserRouter>
                </div>
            </Provider>
        </IntlProvider>
  );
}

export default App;
