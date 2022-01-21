function stock(ticker, name, value, risk) {
    this.ticker = ticker,
    this.name = name,
    this.currentValue = value,
    this.risk = risk,
    this.value = () => {
        switch (this.risk) {
            case "high":
                return Math.random()*10;

            case "medium":
                return Math.random()*5;
            
            case "low":
                return Math.random()*2;
        
            default:
                break;
        }
    }
}

let newValue = null;
let arrayTickers = [];
let stockContainer = document.getElementById("stockContainer");
let stockTicker = document.getElementById("ticker");
let stockName = document.getElementById("name");
let stockValue = document.getElementById("value");

const simulation = (ticker) => {
    if (Math.floor(Math.random()*2) === 1) {
        console.log("-");
        newValue = ticker.currentValue-(ticker.currentValue*ticker.value()/100);
    } else {
        console.log("+");
        newValue = ticker.currentValue+(ticker.currentValue*ticker.value()/100);
    }
    ticker.currentValue = newValue;
    document.getElementById(ticker.ticker+"Symbol").innerText = ticker.ticker;
    document.getElementById(ticker.ticker+"Name").innerText = ticker.name;
    document.getElementById(ticker.ticker+"Value").innerText = Math.round(ticker.currentValue*100)/100;
}

const IBA = new stock("IBA", "Erhvervsakademi Kolding", 32, "low");
const EAMV = new stock("EAMV", "Erhvervsakademi Midtvest", 26, "low");
const MR = new stock("MR", "Maybe Revision", 48, "high");
const MINC = new stock("MINC", "Mile Incorporated", 42, "medium");
arrayTickers.push(IBA, EAMV, MR, MINC);
let buyButtons = [];
let sellButtons = [];

const setup = () => {
    arrayTickers.forEach(ticker => {
        let paragraphSymbol = document.createElement("p");
        paragraphSymbol.setAttribute("id", ticker.ticker+"Symbol");
        
        let paragraphName = document.createElement("p");
        paragraphName.setAttribute("id", ticker.ticker+"Name");
        
        let paragraphValue = document.createElement("p");
        paragraphValue.setAttribute("id", ticker.ticker+"Value");
        
        let tickerSymbol = document.createTextNode(ticker.ticker);
        let tickerName = document.createTextNode(ticker.name);
        let tickerValue = document.createTextNode(ticker.currentValue);
        
        let buyButton = document.createElement("button");
        buyButton.setAttribute("id", ticker.ticker+"Buy");
        buyButton.innerText = "Buy";
        buyButtons.push(buyButton);

        let sellButton = document.createElement("button");
        sellButton.setAttribute("id", ticker.ticker+"Sell");
        sellButton.innerText = "Sell";
        sellButtons.push(sellButton);

        paragraphSymbol.appendChild(tickerSymbol);
        paragraphName.appendChild(tickerName);
        paragraphValue.appendChild(tickerValue);
        
        stockContainer.appendChild(paragraphSymbol);
        stockContainer.appendChild(paragraphName);
        stockContainer.appendChild(paragraphValue);
        stockContainer.appendChild(buyButton);
        stockContainer.appendChild(sellButton);
    });
}

setup();

/*
let buyClick = () => {
    buyButtons.forEach(button => {
        document.addEventListener("click", function() {
            console.log(button);
        });
    });
}

buyClick();
*/

const testing = (arrayTickers) => {
    arrayTickers.forEach(element => {
        simulation(element);
    });
}

let eventTimer = setInterval(function(){testing(arrayTickers)}, 1000);