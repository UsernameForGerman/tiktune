import not_found from "../assets/img/not_found.png";

let formatResponse = (resp) => {
    let formatted = {...resp};
    if (formatted.artists[0]){
        if (formatted.artists[0].name.length){
            formatted.artists[0].name = formatted.artists[0].name.replace(";", " & ");
        }
    }

    if (formatted.amount >= 1000000){
        formatted.amount = Number(formatted.amount / 1000000.0) + "M"
    } else if (formatted.amount >= 1000){
        formatted.amount = Number(formatted.amount / 1000.0) + "K"
    }

    if (formatted.image === ""){
        formatted.image = not_found;
    }

    return formatted;
}

export default formatResponse;