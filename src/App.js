import "./App.scss";
import { useEffect, useState } from "react";
import Axios from "axios";
import InputSelect from "./components/InputSelect/InputSelect";

const App = () => {
  const [amount1, setAmount1] = useState(null);
  const [amount2, setAmount2] = useState(null);
  const [currency1, setCurrency1] = useState("uah");
  const [currency2, setCurrency2] = useState("usd");
  const [usd, setUSD] = useState(0);
  const [eur, setEUR] = useState(0);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/uah.json`
    ).then((res) => {
      const info = res.data["uah"];
      setRates(info);
      setUSD(convertToUah(info["usd"]));
      setEUR(convertToUah(info["eur"]));
    });
  }, []);

  const format = (number) => {
    return number.toFixed(2);
  };
  const onAmount1Change = (amount1) => {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  };
  const onAmount2Change = (amount2) => {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  };
  const onCurrency1Change = (currency1) => {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  };
  const onCurrency2Change = (currency2) => {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  };
  const convertToUah = (rate) => {
    return format(1 / rate);
  };
  return (
    <div className="appContainer">
      <div className="header">
        <h1>Currency converter</h1>
        <div className="headerHryvnia">
          <h3>Hryvnia exchange rates</h3>
          <div className="headerRates">
            <span>USD = {usd}</span>
            <span>EUR = {eur}</span>
          </div>
        </div>
      </div>
      <div className="main">
        <InputSelect
          onAmountChange={onAmount1Change}
          onCurrencyChange={onCurrency1Change}
          currencies={Object.keys(rates)}
          amount={amount1}
          currency={currency1}
        />
        <InputSelect
          onAmountChange={onAmount2Change}
          onCurrencyChange={onCurrency2Change}
          currencies={Object.keys(rates)}
          amount={amount2}
          currency={currency2}
        />
      </div>
    </div>
  );
};

export default App;
