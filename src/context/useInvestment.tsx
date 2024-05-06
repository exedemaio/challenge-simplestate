"use client";
import React, { useState, useContext, createContext } from "react";

const investmentContext = createContext<any>({});

export function InvestmentProvider({ children }: any) {
  const investment = useInvestmentProvider();
  return (
    <investmentContext.Provider value={investment}>
      {children}
    </investmentContext.Provider>
  );
}

export const useInvestment = () => {
  return useContext(investmentContext);
};

const useInvestmentProvider = () => {
  const [investment, setInvestment] = useState<any>(null);
  const [listCurrency, setListCurrency] = useState<any[]>([
    { label: "Seleccionar", value: "" },
  ]);
  const [listTypeInvestment, setListTypeInvestment] = useState<any[]>([
    { label: "Seleccionar", value: "" },
  ]);

  const postInvestment = async ({ typeInvestment, currency, amount }: any) => {
    const result = await fetch("/api/investment", {
      method: "POST",
      body: JSON.stringify({
        model_id: typeInvestment,
        currency_id: currency,
        amount,
      }),
    });

    const data: any = await result.json();
    if (data.status === "success") {
      setInvestment(data.data);
    }
  };

  const getCurrencies = () => {
    fetch(`/api/currencies`)
      .then((res) => res.json())
      .then((results) => {
        let array = [{ label: "Seleccionar", value: "" }];

        for (const key in results.data) {
          array.push({ label: results.data[key], value: key });
        }
        setListCurrency(array);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getModels = () => {
    fetch(`/api/models`)
      .then((res) => res.json())
      .then((results) => {
        let array = [{ label: "Seleccionar", value: "" }];

        for (const key in results.data) {
          array.push({ label: results.data[key], value: key });
        }
        setListTypeInvestment(array);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    investment,
    getInvestment: postInvestment,
    listCurrency,
    listTypeInvestment,
    getCurrencies,
    getModels,
  };
};
