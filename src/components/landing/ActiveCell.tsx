"use client";

import AppIcon from "@/icons/AppIcon";
import EditIcon from "@/icons/EditIcon";
import TertiaryButton from "../shared/TertiaryButton";
import { Announcement } from "@/models/Announcement";
import { dateInRange, formatDate } from "@/utils/utils";
import { useEffect, useState } from "react";
import LiveIndicator from "../shared/LiveIndicator";

interface Props {
  announcement: Announcement;
}

export default function ActiveCell({ announcement }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col p-6 items-start md:items-end md:flex-row justify-center gap-6 md:gap-8 self-stretch bg-neutral-white rounded-lg border border-other-stroke relative">
      <img
        src={announcement.imageUrl}
        className="h-[265px] md:w-[108px] md:h-[108px] self-stretch rounded-lg object-cover bg-center"
      />
      <div className="flex flex-col items-start gap-4 self-stretch md:justify-between md:w-full">
        <div className="flex items-start gap-6 self-stretch w-full md:justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="self-stretch text-neutral-800">
              {announcement.title}
            </h4>
            <p className="b1 self-stretch text-neutral-600">
              {" "}
              {formatDate(announcement.startDate)} -{" "}
              {formatDate(announcement.endDate)}{" "}
            </p>
          </div>
          <TertiaryButton
            text="Edit"
            action={() => console.log("Button clicked")}
            className="max-md:hidden"
          />
        </div>
        <div className="flex h-[32px] items-center gap-2">
          {announcement.apps.map((app) => (
            <AppIcon appName={app} className="rounded-sm w-[32px] h-[32px]" />
          ))}
        </div>
        <TertiaryButton
          text="Edit"
          action={() => console.log("Button clicked")}
          className="md:hidden"
        />
      </div>
      {dateInRange(
        currentDate,
        announcement.startDate,
        announcement.endDate
      ) ? (
        <LiveIndicator />
      ) : null}
    </div>
  );
}
