import { AppName } from "@/models/enums/appName";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import ButtonPrimary2 from "../system/button/buttonPrimary2";
import ButtonPrimary3 from "../system/button/buttonPrimary3";
import InputDatePicker from "../system/input/inputDatePicker";
import InputMultiSelect from "../system/input/inputMultiselect";

interface Props {
  initialDateRange: DateRange | undefined;
  initialApps: AppName[];
  onCancel: () => void;
  onApply: (newDateRange: DateRange | undefined, newApps: AppName[]) => void;
}

export default function PastFilter({ initialDateRange, initialApps, onCancel, onApply }: Props) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);
  const [apps, setApps] = useState<AppName[]>(initialApps);
  const [filtersReset, setFiltersReset] = useState<string>("");

  // Reset Filters
  const resetFilters = () => {
    setDateRange(undefined);
    setApps([]);

    filtersReset === "" ? setFiltersReset("reset") : setFiltersReset(""); // Force re-render
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="flex flex-col gap-4 p-4 rounded-md bg-neutral-white w-full mx-4 md:w-[400px]">
        <h5 className="text-neutral-800">Filters</h5>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <h6 className="text-neutral-500">Date</h6>
          <InputDatePicker key={filtersReset} value={dateRange} setDateRange={setDateRange} />
        </div>

        {/* Apps */}
        <div className="flex flex-col gap-2">
          <h6 className="text-neutral-500">Apps</h6>
          <InputMultiSelect
            key={filtersReset}
            value={apps}
            setValues={(apps) => setApps(apps.map((str) => AppName[str.toUpperCase() as keyof typeof AppName]))}
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-row justify-between items-center">
          <p className="label text-red-600 opacity-hover" onClick={resetFilters}>
            Reset Filters
          </p>
          <div className="flex flex-row gap-2">
            <ButtonPrimary3 text="Cancel" action={onCancel} className="py-2" textStyle="label" />
            <ButtonPrimary2 text="Apply" action={() => onApply(dateRange, apps)} className="py-2" textStyle="label" />
          </div>
        </div>
      </div>
    </div>
  );
}
