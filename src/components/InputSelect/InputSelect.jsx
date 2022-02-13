import s from "./InputSelect.module.scss";

const InputSelect = (props) => {
  return (
    <div className={s.currencyContainer}>
      <div className={s.amountContainer}>
        <input
          className={s.amountInput}
          type="text"
          placeholder="Enter the amount"
          value={props.amount}
          onChange={(e) => props.onAmountChange(e.target.value)}
        />
      </div>
      <select
        className={s.currencySelect}
        value={props.currency}
        onChange={(e) => props.onCurrencyChange(e.target.value)}
      >
        {props.currencies.map((currency, idx) => (
          <option key={idx} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};
export default InputSelect;
