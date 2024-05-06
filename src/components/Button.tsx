interface Props {
  label: string;
  type: "primary" | "secondary" | "disabled";
  className?: string;
  onClick: () => void;
}

export default function Button({ label, type, className, onClick }: Props) {
  return (
    <button
      disabled={type === "disabled" ? true : false}
      onClick={onClick}
      className={`flex justify-center rounded-3xl py-1.5 text-sm leading-6 font-medium min-w-[200px] ${
        type === "disabled"
          ? "bg-grey-300 border-[1px] border-grey-300"
          : type === "secondary"
          ? "bg-white border-[1px] border-grey-900"
          : "bg-primary border-[1px] border-primary"
      } ${className}`}
    >
      {label}
    </button>
  );
}
