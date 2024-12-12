import { Input } from "@/components/ui/input";

interface Props {
  name: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputText({ name, placeholder, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h6 className="text-neutral-800">{name}</h6>
      <Input value={value} onChange={onChange} placeholder={placeholder} className="" />
    </div>
  );
}
