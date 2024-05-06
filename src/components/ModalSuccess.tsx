import Modal from "react-modal";
import Image from "next/image";
import Button from "./Button";

interface Props {
  open: boolean;
  onCloseModal: () => void;
}

export default function ModalSuccess({ open, onCloseModal }: Props) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={open}
      onRequestClose={onCloseModal}
      style={{
        overlay: {
          backgroundColor: "rgba(143, 143, 143, 0.8)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        content: {
          padding: "40px",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
          border: "none",
          backgroundColor: "white",
          color: "black",
          maxWidth: "640px",
        },
      }}
    >
      <div className="flex flex-col">
        <Image
          src="/close.svg"
          alt="Close"
          width={12}
          height={12}
          className="cursor-pointer self-end"
          onClick={onCloseModal}
        />
        <div className="flex flex-col items-center">
          <Image
            src="/success.svg"
            alt="Success"
            width={105}
            height={110}
            className="md:mb-[55px] mb-[35px]"
          />
          <h3 className="text-center text-lg font-bold md:mb-[20px] mb-[30px]">
            Ya registramos tu inversión
          </h3>
          <p className="text-center mb-[30px]">
            Nuestro equipo estará validando el pago. En unos minutos, podrás ver
            el estado de la inversión en tus movimientos.
          </p>
          <div className="flex items-center gap-[32px]">
            <Button label="Salir" onClick={onCloseModal} type="secondary" />
            <Button
              label="Ver movimiento"
              onClick={onCloseModal}
              type="primary"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
