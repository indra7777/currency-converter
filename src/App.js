import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [baseAmount, setBaseAmount] = useState(1);
  const [targetAmount, setTargetAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[targetCurrency];
        if (rate) {
          setExchangeRate(rate);
          setTargetAmount((baseAmount * rate).toFixed(2));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [baseCurrency, targetCurrency, baseAmount]);

  const handleBaseCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
  };

  const handleBaseAmountChange = (e) => {
    setBaseAmount(e.target.value);
  };

  const handleSwapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="converter-container">
        <div className="input-container">
          <input
            type="number"
            value={baseAmount}
            onChange={handleBaseAmountChange}
          />
          <select
            value={baseCurrency}
            onChange={handleBaseCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="INR">INR</option>
            <option value="BRL">BRL</option>
            <option value="ZAR">ZAR</option>
            <option value="RUB">RUB</option>
            <option value="NZD">NZD</option>
            <option value="SEK">SEK</option>
            <option value="NOK">NOK</option>
            <option value="SGD">SGD</option>
          </select>
        </div>
        <div className="swap-container">
          <button onClick={handleSwapCurrencies}>&#8595;&#8593;</button>
        </div>
        <div className="input-container">
          <input type="text" value={targetAmount} readOnly />
          <select
            value={targetCurrency}
            onChange={handleTargetCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="INR">INR</option>
            <option value="BRL">BRL</option>
            <option value="ZAR">ZAR</option>
            <option value="RUB">RUB</option>
            <option value="NZD">NZD</option>
            <option value="SEK">SEK</option>
            <option value="NOK">NOK</option>
            <option value="SGD">SGD</option>
          </select>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && exchangeRate === 0 && <p>Error fetching exchange rate</p>}
    </div>
  );
}

export default App;
