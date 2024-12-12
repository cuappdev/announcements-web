"use client";

import { Input } from "@/components/ui/input";
import SearchIcon from "@/icons/searchIcon";
import { ChangeEvent } from "react";

interface Props {
  text: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputSearch({ text, placeholder, onChange }: Props) {
  return (
    <div className="relative flex items-center md:w-[320px] lg:w-[400px]">
      <SearchIcon className="w-[16px] h-[16px] fill-neutral-300 absolute left-4" />
      <Input
        value={text}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className="pl-11 pr-4 py-3 border border-other-stroke rounded-md w-full bg-neutral-white"
      />
    </div>
  );
}
