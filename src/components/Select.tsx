interface Props {
  label: string;
  id: string;
  options: { label: string; value: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ label, id, options, onChange }: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-normal mb-2">
        {label}
      </label>
      <select
        id="select1"
        className="w-full h-[40px] px-4 py-2 border border-gray-700 rounded-md text-grey-700 text-sm font-normal"
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
