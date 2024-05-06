import React from "react";

interface Props {
  label: string | React.ReactNode;
  id: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  label,
  id,
  value,
  checked,
  onChange,
}: Props) {
  return (
    <label className="flex items-center">
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        id={id}
        value={value}
        className="appearance-none w-4 h-4 border-[1px] border-grey-900 rounded-sm bg-white checked:bg-primary checked:border-0 mr-3"
      />{" "}
      {label}
    </label>
  );
}
