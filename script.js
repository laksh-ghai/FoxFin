async function getStockPrice() {
    let ticker = document.getElementById("stockTicker").value.toUpperCase().trim();
    
    if (!ticker) {
        alert("Please enter a stock ticker!");
        return;
    }

    const apiKey = "YOUR_RAPIDAPI_KEY"; // Replace with your actual API key
    const url = `https://yh-finance.p.rapidapi.com/market/v2/get-quotes?symbols=${ticker}&region=US`;

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "yh-finance.p.rapidapi.com"
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.quoteResponse && data.quoteResponse.result.length > 0) {
            let price = data.quoteResponse.result[0].regularMarketPrice;
            document.getElementById("result").innerText = `📈 ${ticker}: $${price}`;
        } else {
            document.getElementById("result").innerText = "❌ Invalid stock ticker.";
        }
    } catch (error) {
        console.error("Error fetching stock price:", error);
        document.getElementById("result").innerText = "❌ Could not fetch stock price.";
    }
}
