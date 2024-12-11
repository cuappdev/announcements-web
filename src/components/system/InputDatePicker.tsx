"use client";

import { DatePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, today } from "@internationalized/date";

interface Props {
  name: string;
  className?: string;
}

export function InputDatePicker({ name, className }: Props) {
  return (
    <DatePicker
      label={name}
      className={`text-neutral-800 w-full ${className}`}
      variant="bordered"
    />
  );
}
