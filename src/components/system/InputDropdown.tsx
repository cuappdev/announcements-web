"use client";

import CheckIcon from "@/icons/CheckIcon";
import ChevronDownIcon from "@/icons/ChevronDownIcon";
import { AppName } from "@/models/AppName";
import {
  Field,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Checkbox } from "@headlessui/react";
import { useState } from "react";

interface Props {
  name: string;
  placeholder: string;
  options: AppName[];
  onChange: (apps: AppName[]) => void; // Change handler
  className?: string; // Optional styling
}

export function InputDropdown({
  name,
  placeholder,
  options,
  onChange,
  className = "",
}: Props) {
  const [selectedApps, setSelectedApps] = useState<AppName[]>([]); // Internal state for selected apps

  const toggleAppSelection = (app: AppName) => {
    const updatedApps = selectedApps.includes(app)
      ? selectedApps.filter((selected) => selected !== app)
      : [...selectedApps, app];

    setSelectedApps(updatedApps); // Update internal state
    onChange(updatedApps); // Call the parent onChange with the updated value
  };

  return (
    <Field className={`flex flex-col items-start gap-2 w-full ${className}`}>
      <h6 className="text-neutral-800 self-stretch">{name}</h6>
      <Listbox value={selectedApps} onChange={setSelectedApps} multiple>
        {({ open }) => (
          <>
            <ListboxButton
              className={`flex items-center self-stretch py-3 px-4 rounded-md 
              ${
                open
                  ? "border-[2px] border-other-highlight bg-other-offWhite text-neutral-400 rounded-bl-[0px] rounded-br-[0px]"
                  : "border-[1px] border-other-stroke bg-neutral-white text-neutral-300"
              } 
              focus:outline-other-highlight gap-2`}
            >
              <div className="w-full flex items-center gap-2 flex-1 flex-wrap">
                {selectedApps.length > 0
                  ? selectedApps.map((app) => (
                      <div
                        key={app}
                        className="b1 flex h-[28px] p-2 justify-center items-center rounded-md border-other-stroke border-[1px] text-neutral-400"
                      >
                        {app}
                      </div>
                    ))
                  : placeholder}
              </div>
              <ChevronDownIcon
                className={`w-[20px] h-[20px] ${
                  open ? "stroke-neutral-700" : "stroke-neutral-400"
                }`}
              />
            </ListboxButton>
            <ListboxOptions className="bg-other-offWhite px-4 pb-3 rounded-bl-md rounded-br-md w-full relative top-[-10px] border-[2px] border-other-highlight border-t-0">
              {options.map((option, index) => (
                <ListboxOption
                  key={option}
                  value={option}
                  className={`flex justify-between items-center gap-4 self-stretch py-3 px-0 w-full ${
                    index !== options.length - 1
                      ? "border-b-[1px] border-other-stroke"
                      : ""
                  }`}
                >
                  {option}
                  <Checkbox
                    checked={selectedApps.includes(option)}
                    onChange={() => toggleAppSelection(option)}
                    className="flex h-[20px] w-[20px] rounded-sm border justify-center items-center border-other-stroke bg-neutral-white data-[checked]:border-blue-500"
                  >
                    {selectedApps.includes(option) && (
                      <CheckIcon className="w-[15px] h-[15px] fill-blue-500" />
                    )}
                  </Checkbox>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </>
        )}
      </Listbox>
    </Field>
  );
}
