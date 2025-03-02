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
            document.getElementById("result").innerHTML = 
                `📈 <b>${ticker}</b>: $${price} (${change}%)`;
        } else {
            document.getElementById("result").innerHTML = "❌ Invalid stock ticker.";
            return;
        }

        // Fetch stock statistics
        const statsResponse = await fetch(statsUrl, options);
        const statsData = await statsResponse.json();

        if (statsData) {
            let marketCap = statsData.price.marketCap ? statsData.price.marketCap.fmt : "N/A";
            let peRatio = statsData.defaultKeyStatistics.forwardPE ? statsData.defaultKeyStatistics.forwardPE.fmt : "N/A";
            let high52 = statsData.summaryDetail.fiftyTwoWeekHigh ? statsData.summaryDetail.fiftyTwoWeekHigh.fmt : "N/A";
            let low52 = statsData.summaryDetail.fiftyTwoWeekLow ? statsData.summaryDetail.fiftyTwoWeekLow.fmt : "N/A";
            
            document.getElementById("stats").innerHTML = `
                📊 <b>Market Cap:</b> ${marketCap} <br>
                🔄 <b>P/E Ratio:</b> ${peRatio} <br>
                📈 <b>52-Week High:</b> $${high52} <br>
                📉 <b>52-Week Low:</b> $${low52}
            `;
        } else {
            document.getElementById("stats").innerHTML = "❌ No statistics available.";
        }

    } catch (error) {
        console.error("Error fetching stock data:", error);
        document.getElementById("result").innerHTML = "❌ Could not fetch stock data.";
        document.getElementById("stats").innerHTML = "";
    }
}

