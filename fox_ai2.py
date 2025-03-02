import yfinance as yf
import requests

### ---------------------- FOX: FINANCIAL INTELLIGENCE ----------------------

class FoxFinancialAI:
    def __init__(self):
        """Initialize FOX AI with expanded investment categories and reasoning"""
        self.risk_factors = {
            "Russian Oil": {
                "risk": "⚠️ High Risk",
                "reason": "Ongoing war and international sanctions make this investment highly volatile and unpredictable."
            },
            "Cryptocurrency": {
                "risk": "⚠️ Moderate Risk",
                "reason": "Crypto markets are highly volatile, and regulatory crackdowns could impact prices."
            },
            "Tech Stocks": {
                "risk": "✅ Low Risk",
                "reason": "Technology companies show stable growth, but beware of market corrections."
            },
            "Real Estate": {
                "risk": "✅ Stable Investment",
                "reason": "Real estate offers long-term stability, but location and market cycles matter."
            },
            "AI Companies": {
                "risk": "✅ Promising Investment",
                "reason": "AI is shaping the future, but there are regulatory risks and market speculation."
            },
            "Green Energy": {
                "risk": "🌱 Ethical & Growing Investment",
                "reason": "Governments and corporations are pushing for sustainability, but upfront costs are high."
            },
            "Gold": {
                "risk": "🏆 Safe Haven Asset",
                "reason": "Gold remains stable during economic downturns but has slower long-term growth."
            },
            "Bonds": {
                "risk": "✅ Low Risk",
                "reason": "Bonds provide steady returns, but inflation can reduce real profits."
            },
            "Silver": {
                "risk": "⚠️ Moderate Risk",
                "reason": "Silver is influenced by industrial demand and inflation, making it more volatile than gold."
            },
            "Index Funds": {
                "risk": "✅ Low Risk",
                "reason": "Index funds track the market, offering diversification and lower volatility."
            }
        }

    def get_real_stock_price(self, ticker):
        """Fetch real-time stock price from Yahoo Finance"""
        try:
            stock = yf.Ticker(ticker)
            price = stock.history(period="1d")["Close"].iloc[-1]
            return "📈 Live price of {}: ${:.2f}".format(ticker, price)
        except Exception as e:
            return "❌ Could not fetch stock price for {}. Error: {}".format(ticker, e)

    def fetch_live_market_news(self):
        """Fetch real-time market news from NewsAPI"""
        API_KEY = "ba8186f17c2b4545869eebe25700a2db"  # Replace with your actual NewsAPI key
        url = "https://newsapi.org/v2/top-headlines?category=business&apiKey={}".format(API_KEY)
        
        try:
            response = requests.get(url)
            news_data = response.json()
            headlines = [article["title"] for article in news_data["articles"][:3]]
            return headlines
        except Exception as e:
            return ["❌ Could not fetch live news. Error: {}".format(e)]

    def investment_advice(self, investment_choice):
        """Provides AI-powered investment recommendations with reasoning"""
        if investment_choice in self.risk_factors:
            data = self.risk_factors[investment_choice]
            return "{} - {}".format(data["risk"], data["reason"])
        else:
            return "⚠️ No specific risk data found for '{}'. Proceed with due diligence.".format(investment_choice)

### ---------------------- MAIN PROGRAM ----------------------

if __name__ == "__main__":
    fox_ai = FoxFinancialAI()

    print("\n--- 📊 FOX FINANCIAL INTELLIGENCE AI ---")
    stock_ticker = input("Enter stock ticker (e.g., AAPL, TSLA, GOOGL, AMZN): ").upper()
    print(fox_ai.get_real_stock_price(stock_ticker))

    print("\n📢 Latest Market News:")
    for headline in fox_ai.fetch_live_market_news():
        print("- {}".format(headline))

    investment_choice = input("\n💰 What are you considering investing in? ")
    print("FOX Advice: {}".format(fox_ai.investment_advice(investment_choice)))
