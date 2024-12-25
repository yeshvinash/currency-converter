// import React, { useState } from "react";
// import { Input } from "./components";
// import useCurrentcyInfo from "./hooks/useCurrentcyInfo";

// const CustomHooks = () => {
//   const [amount, setAmount] = useState(0);
//   const [from, setFrom] = useState("usd");
//   const [to, setTo] = useState("inr");
//   const [convertedAmount, setConvertedAmount] = useState("");

//   const currencyInfo = useCurrentcyInfo(from);
//   const options = Object.keys(currencyInfo);

//   const swap = () => {
//     setFrom(to);
//     setTo(from);
//     setConvertedAmount(amount);
//     setAmount(convertedAmount);
//   };

//   const covert = () => {
//     setConvertedAmount(amount * currencyInfo[to]);
//   };

//   return (
//     <div
//       className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
//       style={{
//         backgroundImage: `url('https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
//       }}
//     >
//       <div className="w-full">
//         <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               covert();
//             }}
//           >
//             <div className="w-full mb-1">
//               <Input
//                 label="From"
//                 amount={amount}
//                 currencyOptions={options}
//                 onCurrencyChange={(currency) => setAmount(amount)}
//                 selectCurrency={from}
//                 onAmountChange={(amount) => setAmount(amount)}
//               />
//             </div>
//             <div className="relative w-full h-0.5">
//               <button
//                 type="button"
//                 className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
//                 onClick={swap}
//               >
//                 swap
//               </button>
//             </div>
//             <div className="w-full mt-1 mb-4">
//               <Input
//                 label="To"
//                 amount={convertedAmount}
//                 currencyOptions={options}
//                 onAmountChange={(currency) => setTo(currency)}
//                 selectCurrency={from}
//                 amountDisable
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
//             >
//               Convert {from.toUpperCase()} to {to.toUpperCase()}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomHooks;

import React, { useState } from "react";
import Input from "./components/Input";
import useCurrencyInfo from "./hooks/useCurrentcyInfo.js";

const CustomHooks = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: currencyInfo, error, loading } = useCurrencyInfo(from);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];

  const swap = () => {
    setFrom((prevFrom) => {
      const newFrom = to;
      setTo(prevFrom);
      return newFrom;
    });
    setAmount((prevAmount) => {
      setConvertedAmount(prevAmount);
      return convertedAmount;
    });
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    } else {
      setConvertedAmount(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    convert();
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-1">
            <Input
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={setFrom}
              selectCurrency={from}
              onAmountChange={setAmount}
            />
          </div>
          <div className="relative w-full h-0.5">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mt-1 mb-4">
            <Input
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={setTo}
              selectCurrency={to}
              amountDisable
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            disabled={loading || error}
          >
            {loading
              ? "Loading..."
              : `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CustomHooks;
