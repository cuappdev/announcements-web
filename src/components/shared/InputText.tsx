import { Field, Input } from "@headlessui/react";

interface Props {
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for changes
}

export function InputText({ name, placeholder, onChange }: Props) {
  return (
    <Field className="flex flex-col items-start gap-2 w-full">
      <h6 className="text-neutral-800 self-stretch">{name}</h6>
      <Input
        onChange={onChange}
        placeholder={placeholder}
        className="flex items-start self-stretch py-3 px-4 rounded-md border-[1px] border-other-stroke bg-neutral-white focus:outline-other-highlight"
      />
    </Field>
  );
}
