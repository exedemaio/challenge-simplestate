interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Card({ children, style }: Props) {
  return (
    <div style={style} className="bg-white md:p-12 p-6 rounded-2xl w-full">
      {children}
    </div>
  );
}
