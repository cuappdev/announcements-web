interface Props {
  text: string;
  action: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ButtonSecondary2({ text, action, disabled = false, className }: Props) {
  return (
    <button className={`px-4 py-2 rounded-lg bg-red-100 ${className}`} onClick={action} disabled={disabled}>
      <p className="s2 text-red-600">{text}</p>
    </button>
  );
}
