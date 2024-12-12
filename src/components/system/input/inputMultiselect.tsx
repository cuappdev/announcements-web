"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useCallback, useEffect, useMemo, useState } from "react";

const options = [
  { value: "eatery", label: "Eatery" },
  { value: "transit", label: "Transit" },
  { value: "resell", label: "Resell" },
  { value: "coursegrab", label: "CourseGrab" },
  { value: "volume", label: "Volume" },
  { value: "uplift", label: "Uplift" },
];

interface Props {
  value: string[];
  setApps: (apps: string[]) => void;
}

export default function InputMultiSelect({ value, setApps }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(value);

  const toggleOption = useCallback((value: string) => {
    setSelectedValues((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    );
  }, []);

  const selectedLabels = useMemo(
    () => selectedValues.map((value) => options.find((opt) => opt.value === value)?.label || value),
    [selectedValues]
  );

  useEffect(() => {
    setApps(selectedValues);
  }, [selectedValues]);

  return (
    <div className="flex flex-col gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex flex-1 w-full justify-between min-h-[48px] shadow-none font-normal"
          >
            {selectedLabels.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedLabels.map((label) => (
                  <Badge
                    key={label}
                    variant="secondary"
                    className="px-3 py-1"
                    onClick={() => toggleOption(options.find((opt) => opt.label === label)?.value || "")}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            ) : (
              "Select apps..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandList />
            <CommandInput placeholder="Search apps..." />
            <CommandEmpty>No apps found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} onSelect={() => toggleOption(option.value)}>
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedValues.includes(option.value) ? "opacity-100" : "opacity-0")}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
