async function getStockData() {
    let ticker = document.getElementById("stockTicker").value.toUpperCase().trim();
    
    if (!ticker) {
        alert("Please enter a stock ticker!");
        return;
    }

    const apiKey = "8a5a6d83aemshc1932fb3028c609p117effjsn769029e7fd22"; // Replace with your actual API key

    // Fetch stock price
    const priceUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?symbols=${ticker}&region=US`;
    const statsUrl = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v4/get-statistics?symbols=${ticker}&region=US`;

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
    };

    try {
        // Fetch stock price
        const priceResponse = await fetch(priceUrl, options);
        const priceData = await priceResponse.json();

        if (priceData.quoteResponse && priceData.quoteResponse.result.length > 0) {
            let stock = priceData.quoteResponse.result[0];
            let price = stock.regularMarketPrice;
            let change = stock.regularMarketChangePercent.toFixed(2);
            
            let fiftyLow = stock.fiftyTwoWeekLow.toFixed(2);
            let fiftyHigh = stock.fiftyTwoWeekHigh.toFixed(2);
            let fiftyAvg = stock.fiftyDayAverage.toFixed(2);
            
            document.getElementById("result").innerHTML = 
                ` 
                <b>Stock:</b> ${ticker} <br>
                💲 <b>Price:</b> $${price} (${change}%) <br>
                <b>50-Day Moving Avg:</b> $${fiftyAvg}
                <b>50-Day High </b> $${fiftyHigh}
                <b>50-Day Low </b> $${fiftyLow}                
                `;
        } else {
            document.getElementById("result").innerHTML = "❌ Invalid stock ticker.";
            return;
        }

        
    } catch (error) {
        console.error("Error fetching stock data:", error);
        document.getElementById("result").innerHTML = "❌ Could not fetch stock data.";
        document.getElementById("stats").innerHTML = "";
    }
}

