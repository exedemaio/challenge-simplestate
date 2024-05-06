interface Props {
  label: string;
  id: string;
  type?: "text" | "email" | "number";
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  id,
  type = "text",
  required,
  onChange,
  ...props
}: Props) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-normal leading-3 text-black"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type={type}
          className="block w-full rounded-md h-[40px] border-[1px] py-1.5 text-grey-700 border-grey-700 px-6 text-sm font-normal"
          required={required}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
}
