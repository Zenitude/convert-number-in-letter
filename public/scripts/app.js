const number = {
    unit: ["un","deux","trois","quatre","cinq","six","sept","huit","neuf"],
    dizunit: ["onze","douze","treize","quatorze","quinze","seize", "dix-sept", "dix-huit", "dix-neuf"],
}

const input = document.querySelector('#register');
const transformBtn = document.querySelector('.transform');
const clearBtn = document.querySelector('.clear');
const response = document.querySelector(".response");
let value = "";

transformBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // Negative number or not?
    let symbol = input.value[0] === '-' ? "moins " : "";
    let inputValue = '';

    if(input.value[0] === '-') {
        let tempValue = input.value.split('');
        tempValue.shift();
        inputValue = tempValue.join('');
    } else {
        inputValue = input.value;
    }

    // Convert number
    if(inputValue == 0) {
        value = "zéro";
    } else if(inputValue > 0 && inputValue <= 9) {
        value = `${number.unit[inputValue - 1]}`;
    } else if(inputValue > 9 && inputValue < 100) {
        value = convertTens(inputValue);
    } else if(inputValue >= 100) {
        value = convertHundreds(inputValue);
    } else if(isNaN(inputValue)) {
        value = "Utilisez uniquement des chiffres"
    }

    response.innerText = symbol + value;
})

// Clean input and message
clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    response.innerText = '';
    input.value = '';
})

// Function for convert tens
function convertTens(valueField) {
    let dizaine = "";
    let d, dd;

    if(valueField >= 100) { 
        d = valueField[1]; 
        dd = parseInt(valueField[2])
    } 
    else { 
        d = valueField[0]; 
        dd = parseInt(valueField[1])
    }

    let diz = "";

    switch(d) {
        case "2" : diz = "vingt"; break;
        case "3" : diz = "trente"; break;
        case "4" : diz = "quarante"; break;
        case "5" : diz = "cinquante"; break;
        case "6" : diz = "soixante"; break;
        case "7" : diz = "soixante"; break;
        case "8" : diz = "quatre-vingt"; break;
        case "9" : diz = "quatre-vingt"; break;
        default : diz = "dix";
    }
   
    if(dd === 0) {
        switch(d) {
            case "7" : dizaine = `${diz}-dix`; break;
            case "9" : dizaine = `${diz}-dix`; break;
            default:  dizaine = `${diz}`;
        }
    } else if(dd === 1) {
        switch(d) {
            case "1" : dizaine = `onze`; break;
            case "7" : dizaine = `${diz} et onze`; break;
            case "8" : dizaine = `${diz}-un`; break;
            case "9" : dizaine = `${diz}-onze`; break;
            default :  dizaine = `${diz} et un`;
        }
    } else {
        switch(d) {
            case "1" : dizaine = `${number.dizunit[dd - 1]}`; break;
            case "7" : dizaine = `${diz}-${number.dizunit[dd - 1]}`; break;
            case "9" : dizaine = `${diz}-${number.dizunit[dd - 1]}`; break;
            default : dizaine = `${diz}-${number.unit[dd - 1]}`;
        }
    }
    return dizaine;
}

function convertHundreds(valueField) {
    let c = valueField[0];
    let cent = "";
    let centaine = "";
    
    switch(c) {
        case "1" : cent = `cent`; break;
        default : cent = `${number.unit[c - 1]}-cent`;
    }
    
    if(c != "1" && valueField[1] == 0 && valueField[2] == 0) {
        centaine = `${cent}s`;
    } else if (c == "1" && valueField[1] == 0 && valueField[2] == 0) {
        centaine = `${cent}`;
    }else {
        centaine = `${cent}-${convertTens(valueField)}`;
    }

    return centaine;
}