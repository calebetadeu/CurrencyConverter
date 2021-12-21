import React from "react";

type CurrencyProps={
  amount: number
  currency: string
  currencies:string[]
  onAmountChange:(ev)=>void
  onCurrencyChange:(ev)=>void
}

function ConverterInput(props:CurrencyProps) {
  return (
    <div className="group">
      <input type="text" value={props.amount} onChange={ev=>props.onAmountChange(ev.target.value)} />
      <select value={props.currency} onChange={ev=>props.onCurrencyChange(ev.target.value)} >
        {props.currencies.map((currency) => (
          <option key={currency} value={currency}>
            {" "}
            {currency}{" "}
          </option>
        ))}
      </select>
    </div>
  );
}


export default ConverterInput;
