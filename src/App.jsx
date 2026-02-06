import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = Object.keys(rates);

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates[from] && rates[to]) {
      convert();
    }
  }, [amount, from, to, rates]);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await response.json();
      console.log(data.rates);
      setRates(data.rates);
    } catch (error) {
      alert("Failed to fetch rates");
    }
    setLoading(false);
  };

  const convert = () => {
    const converted = (amount / rates[from]) * rates[to];
    setResult(converted.toFixed(2));
    console.log(result);
  };

  const swapCurrencies = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 px-4">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Currency Converter
          </h2>

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* From & To */}
          <div className="flex items-center gap-3 mb-4">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>

            <button
              onClick={swapCurrencies}
              className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              ⇄
            </button>

            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              {currencies.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>

          {/* Result */}
          <div className="text-center mt-6">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              result && (
                <p className="text-xl font-semibold">
                  {amount} {from} ={" "}
                  <span className="text-indigo-600">
                    {result} {to}
                  </span>
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
