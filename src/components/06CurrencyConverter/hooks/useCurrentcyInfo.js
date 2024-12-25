// import React, { useEffect, useState } from "react";

// const useCurrentcyInfo = (currency) => {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     fetch(
//       `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`
//     )
//       .then((res) => res.json())
//       .then((res) => setData(res[currency]));
//     console.log(data);
//   }, [currency]);

//   return data;
// };

// export default useCurrentcyInfo;

import React, { useEffect, useState } from "react";

const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`
        );
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result[currency]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currency]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return { data, error, loading };
};

export default useCurrencyInfo;
