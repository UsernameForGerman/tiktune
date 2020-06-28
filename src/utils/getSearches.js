import {FormattedMessage} from "react-intl";
import React from "react";

const getSearches = (number, locale) => {
    if (locale !== 'ru'){
        if (locale === 'en' && number === '1') return 'search';
        return (<FormattedMessage id={"requests_label"}/>);
    } else {
        let str = "" + number;
        if (str.indexOf('K') !== -1 || str.indexOf('M') !== -1){
            return "поисков"
        } else {
            number = number % 100;
            if (number <= 10){
                if (number === 1){
                    return "поиск";
                } else if (number <= 4){
                    return "поиска"
                } else {
                    return "поисков"
                }
            } else if (number <= 20){
                return "поисков"
            } else {
                let digit = number % 10;
                if (digit === 1){
                    return "поиск";
                } else if (digit <= 4 && digit > 0){
                    return "поиска"
                } else {
                    return "поисков"
                }
            }
        }
    }
}

export default getSearches;