interface Props {
  label: string;
  value: string;
}

export default function SummaryLabel({ label, value }: Props) {
  return (
    <div className="flex justify-between mb-[14px]">
      <span className="text-sm font-normal text-grey-700">
        {label}: <span className="font-semibold">{value}</span>
      </span>
    </div>
  );
}
