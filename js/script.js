//In order for everything to wor the user needs to input a valid ticker into the box and then press search and then the user can press whatever buttons they want from there to see other information like articles, charts, fundaemntals , etc

//Link for the stock ticker API website: https://www.alphavantage.co/documentation/
const USDFORMAT = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});


import API_KEY_ALPHAVANTAGE from "./apikey";
import API_KEY_NEWSAPI from "./apikey";

function tickerLookUp(){ //Get the ticker provided by the user inside of the search Box in the header
    return document.getElementById('searchBox').value;
 }

async function getDataStockHistory(){
    //Create 4 empty arrays to store the information collected, this gives an all time outlook on the stock price.
    let tickerName = tickerLookUp(); //Assign tickerName to the function tickerLookUp which returns the ticker that the user entered. 
    let dates = [];
    let open = [];
    let close = [];
    let infoStorage = [];
    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${tickerName}&apikey=${API_KEY_ALPHAVANTAGE}&datatype=json`);
    let data = await response.json();
     for(var key in data ["Monthly Time Series"]){ 
        dates.push(key);
        open.push(data["Monthly Time Series"][key]["1. open"])
        close.push(data["Monthly Time Series"][key]['4. close'])
    }



   infoStorage.push(dates.reverse(), open.reverse(), close.reverse());
    return infoStorage;
}

 

document.getElementById('searchTicker').addEventListener('click', function(){ //Changes the headings of the different sections of the page. By listening for a ticker Name to be entered and then adding that to the display
    let tickerName = tickerLookUp()
    let stockHistName = document.getElementById('stockHistName');
    stockHistName.innerHTML = `${tickerName} History`
    let stockSemiAnnualBalanceName = document.getElementById('stockSemiAnnualBalanceName')
    stockSemiAnnualBalanceName.innerHTML = `${tickerName} Semi Annual Balance Sheet`
    let stockNewsName = document.getElementById('stockNewsName')
    stockNewsName.innerHTML = `${tickerName} News`
    let stockEspName = document.getElementById('stockEpsName')
    stockEspName.innerHTML = `${tickerName} EPS`
    console.log('test')
})


//Only need the date open close display weekly
async function getDataStockWeekly(){
    let tickerName = tickerLookUp();
    let dates = [];
    let open = [];
    let close = [];
    let infoStorage = [];
    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${tickerName}&apikey=${API_KEY_ALPHAVANTAGE}&datatype=json`);
    let data = await response.json();
        for(var key in data ["Time Series (Daily)"]){ 
                dates.push(key);
                open.push(data["Time Series (Daily)"][key]["1. open"])
                close.push(data["Time Series (Daily)"][key]['4. close'])
        }
  
    infoStorage.push(dates.reverse().slice(-5),  open.reverse().slice(-5),  close.reverse().slice(-5));
    return infoStorage;
}

async function getDataStockDaily(){//Return a day for the stock price, should be the current day but for some reason it is returning the previous day, might need to use a different API here.
    
    let tickerName = tickerLookUp();
    let dates = [];
    let open = [];
    let close = [];
    let infoStorage = [];
    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=60min&symbol=${tickerName}&apikey=${API_KEY_ALPHAVANTAGE}&datatype=json`);
    let data = await response.json();
        for(var key in data ["Time Series (60min)"]){ 
                dates.push(key);
                open.push(data["Time Series (60min)"][key]["1. open"])
                close.push(data["Time Series (60min)"][key]['4. close'])
        }
  
    infoStorage.push(dates.reverse().splice(-14),  open.reverse().splice(-14),  close.reverse().splice(-14));
    return infoStorage;
}

async function getDataStockMonthly(){  //Return a full monthly calendar of the stock price
    let tickerName = tickerLookUp();
    let dates = [];
    let open = [];
    let close = [];
    let infoStorage = [];
    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&interval=60min&symbol=${tickerName}&apikey=${API_KEY_ALPHAVANTAGE}&datatype=json`);
    let data = await response.json();
        for(var key in data ["Time Series (Daily)"]){ 
                dates.push(key);
                open.push(data["Time Series (Daily)"][key]["1. open"])
                close.push(data["Time Series (Daily)"][key]['4. close'])
        }
     infoStorage.push(dates.reverse().splice(-21),  open.reverse().splice(-21),  close.reverse().splice(-21));
    return infoStorage;
}

async function getDataStockYearly(){ //Returns a full calendar year of the stock price
    let tickerName = tickerLookUp();
    let dates = [];
    let open = [];
    let close = [];
    let infoStorage = [];
    let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&interval=60min&symbol=${tickerName}&apikey=${API_KEY_ALPHAVANTAGE}&datatype=json`);
    let data = await response.json();
        for(var key in data ["Weekly Time Series"]){ 
                dates.push(key);
                open.push(data["Weekly Time Series"][key]["1. open"])
                close.push(data["Weekly Time Series"][key]['4. close'])
        }
  
    infoStorage.push(dates.reverse().splice(-52),  open.reverse().splice(-52),  close.reverse().splice(-52)); //Have to do a reverse and splice to get the data in proper order and proper limits
    return infoStorage;
}

 

async function getBalanceSheet(){ //Returns all information one needs to know about a companies balanceSheet, this is annual data being returned here.
    let balanceSheetData = { //Create an object of empty arrays that stores all pertant balanceSheet information we wish to display
        cashAndCashEquivalentsAtCarryingValue: [],
        cashAndShortTermInvestments: [],
        commonStock: [],
        commonStockSharesOutstanding: [],
        currentAccountsPayable: [],
        currentDebt: [],
        currentLongTermDebt:[],
        intangibleAssets: [],
        intangibleAssetsExcludingGoodwill: [],
        inventory: [],
        investments: [],
        longTermDebt: [],
        longTermDebtNoncurrent: [],
        longTermInvestments: [],
        otherCurrentAssets: [],
        otherNonCurrentLiabilities: [],
        shortLongTermDebtTotal: [],
        shortTermInvestments: [],
        totalAssets: [],
        totalCurrentAssets: [],
        totalCurrentLiabilities: [],
        totalNonCurrentLiabilities: [],
        totalShareholderEquity: [],
    }
    tickerName = tickerLookUp();
    let response  = await fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${tickerName}&apikey=${API_KEY_ALPHAVANTAGE}&datatype=json`);
    let data = await response.json()
    // console.log(data)
    // console.log('This is the balance sheet', data.annualReports) //Make button that toggles between annualReports and quarterlyReports
    for(let i = 0; i < data.annualReports.length; i++){
        


        balanceSheetData.cashAndCashEquivalentsAtCarryingValue.push(data.annualReports[i].cashAndCashEquivalentsAtCarryingValue)
        balanceSheetData.cashAndShortTermInvestments.push(data.annualReports[i].cashAndShortTermInvestments)
        balanceSheetData.commonStock.push(data.annualReports[i].commonStock)
        balanceSheetData.commonStockSharesOutstanding.push(data.annualReports[i].commonStockSharesOutstanding)
        balanceSheetData.currentAccountsPayable.push(data.annualReports[i].currentAccountsPayable)
        balanceSheetData.currentDebt.push(data.annualReports[i].currentDebt)
        balanceSheetData.currentLongTermDebt.push(data.annualReports[i].currentLongTermDebt)
        balanceSheetData.intangibleAssets.push(data.annualReports[i].intangibleAssets)
        balanceSheetData.intangibleAssetsExcludingGoodwill.push(data.annualReports[i].intangibleAssetsExcludingGoodwill)
        balanceSheetData.inventory.push(data.annualReports[i].inventory)
        balanceSheetData.investments.push(data.annualReports[i].investments)
        balanceSheetData.longTermDebt.push(data.annualReports[i].longTermDebt)
        balanceSheetData.longTermDebtNoncurrent.push(data.annualReports[i].longTermDebtNoncurrent)
        balanceSheetData.longTermInvestments.push(data.annualReports[i].longTermInvestments)
        balanceSheetData.otherCurrentAssets.push(data.annualReports[i].otherCurrentAssets)
        balanceSheetData.otherNonCurrentLiabilities.push(data.annualReports[i].otherNonCurrentLiabilities)
        balanceSheetData.shortLongTermDebtTotal.push(data.annualReports[i].shortLongTermDebtTotal)
        balanceSheetData.shortTermInvestments.push(data.annualReports[i].shortTermInvestments)
        balanceSheetData.totalAssets.push(data.annualReports[i].totalAssets)
        balanceSheetData.totalCurrentAssets.push(data.annualReports[i].totalCurrentAssets)
        balanceSheetData.totalCurrentLiabilities.push(data.annualReports[i].totalCurrentLiabilities)
        balanceSheetData.totalNonCurrentLiabilities.push(data.annualReports[i].totalNonCurrentLiabilities)
        balanceSheetData.totalShareholderEquity.push(data.annualReports[i].totalShareholderEquity)
    }
    return balanceSheetData;
}
 

async function getEarnings(){ //This function gives quartrly earnings reports, the reason for quarterly instead of annually is because in annually the API does not provide estimatedEPS, fiscalDateEnding, surprise, surpisePercent
    tickerName = tickerLookUp();
    let epsData = { //EPS object that has the data from the query
        estimatedEPS: [],
        fiscalDateEnding: [],
        reportedDate: [],
        reportedEPS: [],
        surprise: [],
        surprisePercentage: [],
    }
    let response = await fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${tickerName}&apikey=${API_KEY_ALPHAVANTAGE}`);
    let data = await response.json();
    console.log("The earnings", data); //estimatedEPS

    for(let i = 0; i < data.quarterlyEarnings.length; i++){
        epsData.estimatedEPS.push(data.quarterlyEarnings[i].estimatedEPS)
        epsData.fiscalDateEnding.push(data.quarterlyEarnings[i].fiscalDateEnding);
        epsData.reportedDate.push(data.quarterlyEarnings[i].reportedDate);
        epsData.reportedEPS.push(data.quarterlyEarnings[i].reportedEPS);
        epsData.surprise.push(data.quarterlyEarnings[i].surprise);
        epsData.surprisePercentage.push(data.quarterlyEarnings[i].surprisePercentage);
    }
    console.log(epsData)
    return epsData;
}

async function getEarningsUpcoming(){
    let response = await fetch(`https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month&apikey=${API_KEY_ALPHAVANTAGE}`);
    let data = await response.json();
    console.log(data)
    return data;
}

//Link for the news API https://newsapi.org/docs/endpoints/everything
async function getStockNews(){ //<----------------------------------------------------------------------- Need to figure out how to set up the dates using date objects that update based on the day. Need to to be the current and need from to be the furthest date from the current date without going out of bounds on the API plan I am using
    let date = new Date();

    let year = date.getFullYear(); //current
    let month = date.getMonth() + 1; //current month
    let day = date.getDate(); //current day
 

    let previousMonth = month - 1; //The subscription (FREE plan) I am using to get news only allows me to return news from previous month so need to use this previousMonth to go back 1 month in time
    let author = [], publishDate = [], description = [], title = [], url = [], infoStorage = []; //Declare and intiialize empty arrays //yyyy-month-day
    let tickerName = tickerLookUp(); //get tickerName from user
    let response = await fetch(`https://newsapi.org/v2/everything?language=en&q=$${tickerName}&from=${year}-${previousMonth}-${day}&to=${year}-${month}-${day}&sortBy=publishedAt&apiKey=${API_KEY_NEWSAPI}`); //Query API to find related articles to the ticker
    let data = await response.json();
    // console.log('this is the news data', data);
    for(var key in data.articles){ //Pull needed information from the response, such as author Name, publish Date, desacription of article, the title of article, and the url linking to the article.
        author.push(data.articles[key].author);
        publishDate.push(data.articles[key].publishedAt)
        description.push(data.articles[key].description)
        title.push(data.articles[key].title)
        url.push(data.articles[key].url);
     }
     infoStorage.push(author, publishDate, description, title, url); //Pass all of the information as a    2D nested array
    return infoStorage;
}

 

 


function displayHistoricalData(){
    // console.log("hello world")
    //Create 3 empty arrays that will store the data that is collected from the async function of getDataStockHistory
    let date = [];
    let open = [];
    let close = [];
    displayChart(getDataStockHistory, date, open, close); //Call the displayChart function which takes a function name and 3 arrays
}

function displayHistoricalWeekly(){ //Display the historical weekly information 
    let date = [];
    let open = [];
    let close = [];

    displayChart(getDataStockWeekly, date, open, close);
}

function displayHistoricalDaily(){ //Displays the data for  weekly
    let date = [];
    let open = [];
    let close = []
    displayChart(getDataStockDaily, date, open, close);
}

function displayHistoricalMonthly(){ //display data for month
    let date = [];
    let open = [];
    let close = [];
    displayChart(getDataStockMonthly, date, open, close);
}

function displayHistoricalYearly(){ //displatys data for annual
    let date = [];
    let open = [];
    let close = [];

    displayChart(getDataStockYearly, date, open, close);
}

function displayArticles(){
    let newsContainer = document.querySelector('#newsHolder')
    newsContainer.innerHTML = ''; //Empty the current news displayerd when user clicks on button to get different news. 
    let author = [], description = [], publishedAt = [], title = [], url = []; //Initialize and declare empty arrays to hold information like author, deascription date publsihed, title and url
    getStockNews().then(response =>{ //Awaiting response to populate the arrays using a nested if statement with a chain of if else so everything gets to their proper housing.
        for(let i = 0; i < response.length; i++){
            for(let j = 0; j < response[i].length; j++){
                if(i === 0){
                    author.push(response[i][j]);
                }else if(i === 1){
                    publishedAt.push(response[i][j])
                }else if(i === 2){
                    description.push(response[i][j])
                }else if(i === 3){
                    title.push(response[i][j])
                }else if(i === 4){
                    url.push(response[i][j])
                }
            }
        }
        for(let i = 0; i < author.length; i++){
            let content = document.createElement('div');
            content.classList.add("article")
            content.classList.add("border")
            content.classList.add("border-2")
            content.classList.add("border-dark")
             if(author[i] === null){
                author[i] = 'Anonymous';
            }
            let year = publishedAt[i].split("-")[0]
            let month = publishedAt[i].split("-")[1]
            let day =  publishedAt[i].split("-")[2].split("T")[0]

            content.innerHTML = `
                    <h2 class = "article-title"><a class = "linkToNews" href="${url[i]}" target="_blank">${title[i]}</a></h2>
                    <h5 class = "article-author">Author: ${author[i]}</h5>
                    <p class = "lead article-description">${description[i]}</p>
                    <p class="article-publishAt"><small>Date Of Publication: ${day}-${month}-${year}</small></p>
            `
            newsContainer.appendChild(content);
        }
    })
}



function displayBalanceSheet(){
    tblBody = document.getElementById('results'); //Get table body
    tempRow = document.getElementById('fbTemplate'); //get the template
    tblBody.innerHTML = ''; //empty the contents of the table on each function call
    getBalanceSheet().then(response => { //Once we have the data from the getBalanceSheet we want to execute the following code.
        for(let i = 0; i < response.cashAndCashEquivalentsAtCarryingValue.length; i++){ //As long as length of the first array in the response object is less then i we want to go throw and assign different properties of the object to the different cells in the table
            tblRow = document.importNode(tempRow.content, true);
            rowCols = tblRow.querySelectorAll('td'); //get all of the td elements belonging to the template
            rowCols[0].textContent = `# ${i}`
            rowCols[1].textContent = USDFORMAT.format(response.cashAndCashEquivalentsAtCarryingValue[i]);
            rowCols[2].textContent = USDFORMAT.format(response.cashAndShortTermInvestments[i]);
            rowCols[3].textContent = USDFORMAT.format(response.commonStock[i]);
            rowCols[4].textContent = response.commonStockSharesOutstanding[i];
            rowCols[5].textContent = USDFORMAT.format(response.currentAccountsPayable[i]);
            rowCols[6].textContent = USDFORMAT.format(response.currentDebt[i]);
            rowCols[7].textContent = USDFORMAT.format(response.currentLongTermDebt[i]);
            rowCols[8].textContent = USDFORMAT.format(response.intangibleAssets[i]);
            rowCols[9].textContent = USDFORMAT.format(response.intangibleAssetsExcludingGoodwill[i]);
            rowCols[10].textContent = response.inventory[i];
            rowCols[11].textContent = USDFORMAT.format(response.investments[i]);
            rowCols[12].textContent = USDFORMAT.format(response.longTermDebt[i]);
            rowCols[13].textContent = USDFORMAT.format(response.longTermDebtNoncurrent[i]);
            rowCols[14].textContent = USDFORMAT.format(response.longTermInvestments[i]);
            rowCols[15].textContent = USDFORMAT.format(response.otherCurrentAssets[i]);
            rowCols[16].textContent = USDFORMAT.format(response.otherNonCurrentLiabilities[i]);
            rowCols[17].textContent = USDFORMAT.format(response.shortLongTermDebtTotal[i]);
            rowCols[18].textContent = USDFORMAT.format(response.shortTermInvestments[i]);
            rowCols[19].textContent = USDFORMAT.format(response.totalAssets[i]);
            rowCols[20].textContent = USDFORMAT.format(response.totalCurrentAssets[i]);
            rowCols[21].textContent = USDFORMAT.format(response.totalCurrentLiabilities[i]);
            rowCols[22].textContent = USDFORMAT.format(response.totalNonCurrentLiabilities[i]);
            rowCols[23].textContent = USDFORMAT.format(response.totalShareholderEquity[i]);
            tblBody.appendChild(tblRow) //Append all of the rows to the tableBody.

         }
    })    
}

function displayEPS(){
    tblBody = document.getElementById('results2')  //Get table body
    tempRow = document.getElementById('fbTemplate2');  //Get the template I made that contains the different columns
    tblBody.innerHTML = ''; //clear body 
    getEarnings().then(response=>{  //On the function response I want to populate the the rows and then append all of the rows to the table
        for(let i = 0; i < response.estimatedEPS.length; i++){
            tblRow = document.importNode(tempRow.content, true);
            rowCols = tblRow.querySelectorAll('td');
            rowCols[0].textContent = `# ${i}`;
            rowCols[1].textContent = response.estimatedEPS[i]
            rowCols[2].textContent = response.fiscalDateEnding[i]
            rowCols[3].textContent = response.reportedDate[i]
            rowCols[4].textContent = response.reportedEPS[i]
            rowCols[5].textContent = response.surprise[i]
            rowCols[6].textContent = response.surprisePercentage[i]
            tblBody.appendChild(tblRow)
        }
    })
}



document.getElementById('see_articles').addEventListener('click', function(){ //User has to click on see Articles button to see the information
    getStockNews();
    displayArticles();
    getEarningsUpcoming();
})

document.getElementById('all_time').addEventListener('click', function(){ //User has to click on See All time button to see the all time chart, 
    displayHistoricalData();
})

document.getElementById('weekly_time').addEventListener('click', function(){ //User has to click to see weekly stock
    getDataStockWeekly()
    displayHistoricalWeekly();
})

document.getElementById('see_semi_annual_balance_sheet').addEventListener('click', function(){ //User has to click see balance sheet button to see the balance sheet
    getBalanceSheet();
    displayBalanceSheet();
})    

document.getElementById('daily_time').addEventListener('click', function(){ //User has to click daily time so see daily information
    getDataStockDaily();
    displayHistoricalDaily();
})

document.getElementById('monthly_time').addEventListener('click', function(){ //User has to clicked monthly time to see monthly data on the stock
    getDataStockMonthly();
    displayHistoricalMonthly();
})

document.getElementById('yearly_time').addEventListener('click', function(){ //User has to click yearly time to see yearly on the stock
    getDataStockYearly();
    displayHistoricalYearly();
})

document.getElementById('see_eps_quarterly').addEventListener('click', function(){
    getEarnings();
    displayEPS();
})

function displayChart(funcName, date, open, close){ //Make and display the chart by taking in the arguements functionname date open and close
    funcName().then(response =>{ 
        for(let i = 0; i < response.length; i++){ //Sift through the response nested array to pull out the information and seperate it into their own arrays.
            for(let j = 0; j < response[i].length; j++){
                if(i === 0){
                    date.push(response[i][j])
                }else if(i === 1){
                    open.push(response[i][j])
                }else if(i === 2){
                    close.push(response[i][j])
                }
            }
        }
        let chartTitle = tickerLookUp();
        let chartHolder = document.getElementById('chartHolder');
        chartHolder.innerHTML = `<canvas id='myChart'></canvas>` //Creates a container for the chart
        let myChart1 = document.querySelector('#myChart').getContext('2d'); 
        chart1 = new Chart(myChart1, { 
            type: 'line',
            data:{
                labels: date, //Assign array of dates to be the labels  X axis
                datasets: [
                    {
                        backgroundColor: "rgba(255, 100, 255)",
                        label: `${chartTitle} All Time Data`,
                        data: open //assign array of open data to be the Labels Y axis
                    }
                ]
            }
        })
    })
}