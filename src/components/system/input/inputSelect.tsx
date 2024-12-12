"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SortType } from "@/models/enums/sortType";

interface Props {
  selected: SortType;
  setSelected: (selected: SortType) => void;
}

export function InputSelect({ selected, setSelected }: Props) {
  return (
    <Select onValueChange={setSelected} value={selected}>
      <SelectTrigger className="w-[180px] rounded-md bg-neutral-white h-[44px] b1 opacity-hover">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={SortType.MOST_RECENT}>{SortType.MOST_RECENT}</SelectItem>
          <SelectItem value={SortType.OLDEST}>{SortType.OLDEST}</SelectItem>
          <SelectItem value={SortType.TITLE_A_Z}>{SortType.TITLE_A_Z}</SelectItem>
          <SelectItem value={SortType.TITLE_Z_A}>{SortType.TITLE_Z_A}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
