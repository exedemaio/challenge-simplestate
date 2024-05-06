"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useDropzone } from "react-dropzone";
import SummaryLabel from "@/components/SummaryLabel";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Checkbox from "@/components/Checkbox";
import ModalSuccess from "@/components/ModalSuccess";
import { useInvestment } from "@/context/useInvestment";
import getValueByKey from "@/utils/getValueByKey";
import { useRouter } from "next/navigation";

const Page = () => {
  const { investment, listCurrency } = useInvestment();
  const [disabled, setDisabled] = useState(true);
  const [checked, setChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [payment, setPayment] = useState<any>(null);
  const router = useRouter();
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  const handleSubmit = async () => {
    const result = await fetch("/api/storeInvestment", {
      method: "POST",
    });

    const data: any = await result.json();
    if (data.status === "success") {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (!investment) {
      router.push("/nueva-inversion");
    }
  }, [investment, router]);

  const getPayment = async () => {
    fetch(`/api/payment`)
      .then((res) => res.json())
      .then((results) => {
        setPayment(results.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checked && acceptedFiles.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [checked, acceptedFiles]);

  const files = acceptedFiles.map((file: any) => (
    <li
      key={file.path}
      className="rounded bg-primary/50 max-w-fit px-3 flex justify-center items-center text-[10px] leading-4 min-w-[80px] flex justify-between items-center mb-2"
    >
      {file.path}
      <Image
        src="/close.svg"
        alt="Close"
        width="5"
        height="5"
        className="cursor-pointer"
        onClick={() => console.log("Remove file")}
      />
    </li>
  ));

  return (
    <div className="w-full mx-auto h-full">
      <Card>
        <div className="grid md:grid-cols-2 grid-cols-1 md:mb-[48px] mb-[30px]">
          <h3 className="font-bold text-lg">
            Forma de pago: Transferencia bancaria
          </h3>
          <div className="rounded-lg bg-[#E2E2FE] w-fit px-3 flex justify-center items-center md:mt-0 mt-5">
            <span className="md:text-[16px] text-sm">
              Monto a pagar{" "}
              <span className="font-bold">{`${getValueByKey(
                listCurrency,
                investment?.currency_id
              )} ${investment?.amount}`}</span>
            </span>
          </div>
        </div>
        <div className="md:block mb-[17px] hidden">
          <span className="font-bold text-md">Datos para transferencia</span>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 md:mb-[50px] mb-[35px]">
          <SummaryLabel label="Banco" value={payment?.bank} />
          <SummaryLabel label="CUIT" value={payment?.cuit} />
          <SummaryLabel label="Tipo de cuenta" value={payment?.account_type} />
          <SummaryLabel
            label="Numero de cuenta"
            value={payment?.account_number}
          />
          <SummaryLabel label="Razon social" value={payment?.name} />
          <SummaryLabel label="CBU" value={payment?.cbu} />
        </div>
        <div className="mb-[17px]">
          <span className="font-bold text-md">
            Adjuntar comprobante de pago
          </span>
        </div>
        <section>
          <div
            {...getRootProps({ className: "dropzone" })}
            className="border-[1px] border-dashed border-grey-500 mb-2 flex flex-col items-center justify-center h-[112px] w-full"
          >
            <input {...getInputProps()} />
            <Image src="/attach.svg" alt="Attach" width="17" height="30" />
            <p className="font-normal text-black text-sm">
              {"Arrastra la imagen o adjuntala aqui"}
            </p>
          </div>
          <aside>
            <ul>{files}</ul>
          </aside>
        </section>
      </Card>
      <div className="mt-[18px]">
        <Checkbox
          onChange={(e) => setChecked(e.target.checked)}
          checked={checked}
          label={
            <span className="text-sm italic fond-normal">
              Leí y acepto{" "}
              <a href="#" className="underline decoration-solid">
                Términos y condiciones*
              </a>
            </span>
          }
          id="tos"
          value="tos"
        />
      </div>

      <div className="md:mt-[60px] mt-[45px] flex md:justify-end justify-start">
        <Button
          label="Finalizar"
          onClick={handleSubmit}
          type={disabled ? "disabled" : "primary"}
        />
      </div>
      <ModalSuccess open={openModal} onCloseModal={() => setOpenModal(false)} />
    </div>
  );
};

export default Page;
