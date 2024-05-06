"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";
import SummaryLabel from "@/components/SummaryLabel";
import { useInvestment } from "@/context/useInvestment";
import getValueByKey from "@/utils/getValueByKey";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [showSummary, setShowSummary] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [typeInvestment, setTypeInvestment] = useState("");
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");

  const {
    investment,
    getInvestment,
    listCurrency,
    listTypeInvestment,
    getCurrencies,
    getModels,
  } = useInvestment();

  const handleChangeTypeInvestment = (e: any) => {
    setTypeInvestment(e.target.value);
  };

  const handleChangeCurrency = (e: any) => {
    setCurrency(e.target.value);
  };

  const handleChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!investment) {
        await getInvestment({ typeInvestment, currency, amount });
        setShowSummary(true);
      } else {
        router.push("/nueva-inversion/resumen");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrencies();
    getModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeInvestment && currency && amount) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [typeInvestment, currency, amount]);

  return (
    <div className="w-full mx-auto h-full">
      <Card style={{ marginBottom: "24px" }}>
        <div className="flex md:flex-row md:gap-[0] gap-6 flex-col justify-between">
          <div className="md:w-[350px]">
            <Select
              label="Tipo de inversion*"
              id="select1"
              onChange={handleChangeTypeInvestment}
              options={listTypeInvestment}
            />
            <a
              href="#"
              className="underline decoration-solid text-xs fond-normal italic mb"
            >
              Ver mas sobre tipos de inversión
            </a>
          </div>
          <div className="md:w-[350px]">
            <Select
              label="Moneda*"
              id="select1"
              onChange={handleChangeCurrency}
              options={listCurrency}
            />
          </div>
        </div>
        <div className="md:w-[350px] w-full mt-8">
          <Input
            id="amount"
            label="Monto a invertir*"
            type="number"
            onChange={handleChangeAmount}
          />
        </div>
      </Card>

      {showSummary && (
        <Card>
          <div className="grid md:grid-cols-2 grid-cols-1 ">
            <SummaryLabel
              label="Total de la inversión"
              value={`${getValueByKey(listCurrency, investment.currency_id)} ${
                investment.amount
              }`}
            />
            <SummaryLabel
              label="Ganancia anual estimada"
              value={`${getValueByKey(listCurrency, investment.currency_id)} ${
                investment.profitability_amount
              }`}
            />
          </div>
          <hr className="border-1 border-dashed border-grey-300 mb-2" />
          <div className="grid md:grid-cols-2 grid-cols-1">
            <SummaryLabel label="Tipo de inversión" value={typeInvestment} />
            <SummaryLabel
              label="Tasa anual"
              value={`${investment.profitability}%`}
            />
            <SummaryLabel
              label="Tiempo de inversión"
              value={`${investment.mont_term} meses`}
            />
            <SummaryLabel label="Podes retirarte" value={investment.parking} />
            <SummaryLabel
              label="Recibirás al final del plazo"
              value={`${getValueByKey(listCurrency, investment.currency_id)} ${
                investment.profitability_amount + investment.amount
              }`}
            />
            <SummaryLabel
              label="Cuándo cobras las ganancias"
              value={investment.payment}
            />
          </div>
        </Card>
      )}

      <div className="md:mt-[60px] mt-[45px] flex md:justify-end justify-start">
        <Button
          label="Continuar"
          onClick={handleSubmit}
          type={disabled ? "disabled" : "primary"}
        />
      </div>
    </div>
  );
};

export default Page;
