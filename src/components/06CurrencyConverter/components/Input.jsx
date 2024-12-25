// import React from "react";

// const Input = ({
//   label,
//   amount,
//   onAmountChange,
//   onCurrencyChange,
//   currencyOptions = [],
//   selectCurrency = "usd",
//   amountDisable = false,
//   currencyDisable = false,
//   className = "",
// }) => {
//   return (
//     <>
//       <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
//         <div className="w-1/2">
//           <label className="text-black/40 mb-2 inline-block">{label}</label>
//           <input
//             className="outline-none rounded-lg px-2 w-full bg-gray-100 py-1.5"
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) =>
//               onAmountChange && onAmountChange(Number(e.target.value))
//             }
//             disabled={amountDisable}
//           />
//         </div>
//         <div className="w-1/2 flex flex-wrap justify-end text-right">
//           <p className="text-black/40 mb-2 w-full">Currency Type</p>
//           <select
//             className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
//             value={selectCurrency}
//             onChange={(e) =>
//               onCurrencyChange && onCurrencyChange(e.target.value)
//             }
//             disabled={currencyDisable}
//           >
//             {currencyOptions.map((currency) => {
//               return (
//                 <option key={currency} value={currency}>
//                   {currency}
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Input;
import React from "react";
import PropTypes from "prop-types";

const Input = ({
  label,
  amount,
  onAmountChange = () => {},
  onCurrencyChange = () => {},
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) => {
  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label className="text-black/40 mb-2 inline-block">{label}</label>
        <input
          className="outline-none rounded-lg px-2 w-full bg-gray-100 py-1.5"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          disabled={amountDisable}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  currencyOptions: PropTypes.arrayOf(PropTypes.string),
  selectCurrency: PropTypes.string,
  amountDisable: PropTypes.bool,
  currencyDisable: PropTypes.bool,
  className: PropTypes.string,
};

export default React.memo(Input);
