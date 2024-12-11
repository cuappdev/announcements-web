interface Props {
  text: string;
  action: () => void;
}

export default function ButtonSecondary2({ text, action }: Props) {
  return (
    <button className="px-4 py-2 rounded-lg bg-red-100" onClick={action}>
      <p className="s2 text-red-600">{text}</p>
    </button>
  );
}
